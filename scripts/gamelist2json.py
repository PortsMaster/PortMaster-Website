import json
import xmltodict
import requests

response = requests.get("https://raw.githubusercontent.com/PortsMaster/PortMaster-Info/main/ports.json")

existing_ports = response.json()["ports"]

ports = []

with open("gamelist.xml",encoding="utf-8") as xml_file:
    xml_dict = xmltodict.parse(xml_file.read())	


    for existing_port in existing_ports:
        matched = False
        for game in xml_dict["gameList"]["game"]:
            if game["path"].replace("./","") in existing_ports[existing_port]["items"]:
                for item in existing_ports[existing_port]["items"]:
                    if ".sh" in item:
                        port = {}
                        port["name"] = game["name"]
                        port["launcher"] = item.replace("./","")
                        port["description"] = ""
                        port["releasedate"] = ""
                        port["developer"] = ""
                        port["publisher"] = ""
                        port["players"] = ""
                        port["genre"] = ""
                        port["rating"] = ""

                        if "description" in game:
                            port["description"] = game["desc"]
                        if "releasedate" in game:
                            port["releasedate"] = game["releasedate"].replace("T000000","")
                        if "developer" in game:
                            port["developer"] = game["developer"]
                        if "publisher" in game:
                            port["publisher"] = game["publisher"]
                        if "players" in game:
                            port["players"] = game["players"]
                        if "genre" in game:
                            port["genre"] = game["genre"]
                        ports.append(port)
                        matched = True
        if not matched:
            for item in existing_ports[existing_port]["items"]:
                if ".sh" in item:
                    port = {}
                    port["name"] = existing_ports[existing_port]["attr"]["title"]
                    port["launcher"] = item.replace("./","")
                    port["description"] = existing_ports[existing_port]["attr"]["desc"]
                    port["releasedate"] = ""
                    port["developer"] = ""
                    port["publisher"] = ""
                    port["players"] = ""
                    port["genre"] = existing_ports[existing_port]["attr"]["genres"][0]
                    port["rating"] = ""
                    ports.append(port)
    print(json.dumps(ports, indent=2))

                    
                        