import os
import shutil
import requests

import cmarkgfm
from bs4 import BeautifulSoup

r = requests.get("https://raw.githubusercontent.com/PortsMaster/gptokeyb/main/README.md", allow_redirects=True)
open(os.path.join("content","markdown","gptokeyb-documentation.markdown"), 'wb').write(r.content)

shutil.copytree(os.path.join("website","css"),os.path.join("docs","css"),dirs_exist_ok=True)
shutil.copytree(os.path.join("website","js"),os.path.join("docs","js"),dirs_exist_ok=True)

navbar_html = open(os.path.join("website","navbar.html"), "r", encoding="utf-8").read()

for file in os.listdir("website"):
    if ".html" in file and "navbar.html" not in file:
        webpage = open(os.path.join("website",file), "r", encoding="utf-8").read()
        if os.path.isfile(os.path.join("content","markdown",file.replace(".html",".markdown"))):
            markdown_text = open(os.path.join("content","markdown",file.replace(".html",".markdown")), "r", encoding="utf-8").read()
            markdown_html = cmarkgfm.github_flavored_markdown_to_html(markdown_text)
            webpage = webpage.replace("{markdown}",markdown_html).replace("<table>",'<table class="table table-bordered">')

        webpage = BeautifulSoup(webpage.replace("{navbar}",navbar_html), 'html.parser').prettify()
        f = open(os.path.join("docs",file), "w", encoding="utf-8")
        f.write(webpage)
        f.close()