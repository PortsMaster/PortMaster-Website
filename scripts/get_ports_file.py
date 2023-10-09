import requests

latest_release = requests.get("https://api.github.com/repos/PortsMaster/PortMaster-Releases/releases/latest")

for item in latest_release.json()["assets"]:
    if item["name"] == "ports.json":
        r = requests.get(item["browser_download_url"], allow_redirects=True)
        open(item["name"], 'wb').write(r.content)