import json
import mdutils


with open("home.json",encoding="utf-8") as home:
    home_json = json.loads(home.read())
    for port in home_json:
        f = open(port["name"].replace(".zip",".md"), "w",encoding="utf-8")
        f.writelines("## Credits")
        f.writelines("\n\n")
        if "notes" in port:
            f.writelines(port["notes"])
            f.writelines("\n\n")
        f.close()