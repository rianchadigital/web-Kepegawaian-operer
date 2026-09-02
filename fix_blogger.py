import re
import xml.etree.ElementTree as ET

def make_blogger_xml(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        html = f.read()

    bool_attrs = ['required', 'checked', 'disabled', 'readonly', 'selected', 'multiple', 'autofocus', 'novalidate', 'async', 'defer']
    void_tags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']

    # 1. Extract <style> and <script> contents so tag regex won't touch JS/CSS operators like < or >
    style_blocks = []
    script_blocks = []

    def save_style(m):
        attrs = m.group(1)
        content = m.group(2)
        placeholder = f"___STYLE_BLOCK_{len(style_blocks)}___"
        style_blocks.append((attrs, content))
        return placeholder

    def save_script(m):
        attrs = m.group(1)
        content = m.group(2)
        placeholder = f"___SCRIPT_BLOCK_{len(script_blocks)}___"
        script_blocks.append((attrs, content))
        return placeholder

    text = re.sub(r'<style([^>]*)>(.*?)</style>', save_style, html, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r'<script([^>]*)>(.*?)</script>', save_script, text, flags=re.DOTALL | re.IGNORECASE)

    # 2. Process HTML tags (void tags self-closing & boolean attributes)
    tag_pattern = re.compile(r'</?[a-zA-Z0-9:-]+(?:\s+[^"\'>]+|"[^"]*"|\'[^\']*\')*>', re.DOTALL)

    def process_tags(text_input):
        def repl(m):
            t = m.group(0)
            if t.startswith('</') or t.startswith('<!--') or t.startswith('<!DOCTYPE') or t.startswith('<?'):
                return t
            
            match_name = re.match(r'<([a-zA-Z0-9:-]+)', t)
            if not match_name:
                return t
            tagname = match_name.group(1).lower()
            
            if tagname in void_tags:
                body = t[1:-1].rstrip()
                if body.endswith('/'):
                    body = body[:-1].rstrip()
                for attr in bool_attrs:
                    body = re.sub(r'(\s)' + attr + r'([\s/]|$)', r'\1' + attr + r'="' + attr + r'"\2', body)
                body = re.sub(r'(\s)crossorigin([\s/]|$)', r'\1crossorigin="anonymous"\2', body)
                return '<' + body + ' />'
            else:
                body = t[1:-1]
                for attr in bool_attrs:
                    body = re.sub(r'(\s)' + attr + r'([\s/]|$)', r'\1' + attr + r'="' + attr + r'"\2', body)
                body = re.sub(r'(\s)crossorigin([\s/]|$)', r'\1crossorigin="anonymous"\2', body)
                return '<' + body + '>'

        return tag_pattern.sub(repl, text_input)

    text = process_tags(text)

    # 3. Escape ampersands in HTML text / attributes that aren't valid entities
    text = re.sub(r'&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)', '&amp;', text)

    # 4. Re-insert <style> blocks wrapped in CDATA
    for idx, (attrs, content) in enumerate(style_blocks):
        placeholder = f"___STYLE_BLOCK_{idx}___"
        if content.strip():
            cdata_content = f"<style{attrs}>/*<![CDATA[*/\n{content}\n/*]]>*/</style>"
        else:
            cdata_content = f"<style{attrs}></style>"
        text = text.replace(placeholder, cdata_content)

    # 5. Re-insert <script> blocks wrapped in CDATA
    for idx, (attrs, content) in enumerate(script_blocks):
        placeholder = f"___SCRIPT_BLOCK_{idx}___"
        if content.strip():
            # escape any occurrence of ]]> inside CDATA if needed or handle clean
            clean_content = content.replace(']]>', ']]]]><![CDATA[>')
            cdata_content = f"<script{attrs}>//<![CDATA[\n{clean_content}\n//]]></script>"
        else:
            cdata_content = f"<script{attrs}></script>"
        text = text.replace(placeholder, cdata_content)

    # 6. Add Blogger XML root headers & namespaces
    blogger_html_tag = """<html b:css='false' b:defaultmagic='true' b:layoutsUrl='http://www.google.com/layouts' b:responsive='true' b:version='2' class='v2' expr:dir='data:blog.languageDirection' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>"""
    text = re.sub(r'<html[^>]*>', blogger_html_tag, text, flags=re.IGNORECASE)

    # Wrap body contents with Blogger section and widget if not present
    if '<b:section' not in text:
        text = text.replace('<body>', '<body>\n<b:section id="main" class="main">\n<b:widget id="Blog1" locked="true" title="Blog Posts" type="Blog" version="1">\n<b:includable id="main">')
        text = text.replace('</body>', '</b:includable>\n</b:widget>\n</b:section>\n</body>')

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(text)

    # Test parse
    try:
        ET.fromstring(text)
        print("Blogger XML validation: SUCCESS!")
    except Exception as e:
        print("Blogger XML validation Error:", e)
        lines = text.splitlines()
        m = re.search(r'line (\d+)', str(e))
        if m:
            l = int(m.group(1))
            print("Line:", l)
            for i in range(max(0, l-5), min(len(lines), l+5)):
                print(f"{i+1}: {lines[i]}")

if __name__ == '__main__':
    make_blogger_xml('index.html', 'blogger-theme.xml')
