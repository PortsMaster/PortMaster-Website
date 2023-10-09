import os
import cmarkgfm

path = os.path.join("content","markdown")
for file in os.listdir(path):
    with open(os.path.join(path,file), "r", encoding="utf-8") as input_file:
        text = input_file.read()
        #markdown_html = markdown.markdown(text,extensions=['tables','fenced_code','markdown_checklist.extension','mdx_truly_sane_lists'])
        markdown_html = cmarkgfm.github_flavored_markdown_to_html(text)
        html_file = file.replace(".markdown",".html")
        page = open(os.path.join("website",html_file), "r")
        new_page = page.read().replace("{markdown}",markdown_html)
        f = open(os.path.join("docs",html_file), "w")
        f.write(new_page)
        f.close()