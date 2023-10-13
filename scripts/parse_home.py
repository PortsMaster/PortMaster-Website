#!/usr/bin/env python3

import json
import os
import pathlib

from pathlib import Path
from difflib import SequenceMatcher as SM


current_info = {}
current_key = None
output = []

with open('Home.md', 'r') as fh:
    for line in fh:
        line = line.rstrip()
        if line.endswith(' \\'):
            line = line[:-2]

        if line.startswith('### '):
            current_info = {
                'name': None,
                'title': line.split(' ', 1)[1]
                }
            output.append(current_info)
            current_key = None
            continue

        elif line.startswith('Instructions:'):
            current_key = 'instructions'
            if line == 'Instructions:':
                line = ''

            current_info[current_key] = line.split(' ', 1)[-1].strip()

        elif line.startswith('Notes:'):
            current_key = 'notes'
            if line == 'Notes:':
                line = ''

            current_info[current_key] = line.split(' ', 1)[-1].strip()

        elif current_key is not None:
            if current_info[current_key].strip() == '':
                current_info[current_key] = line.rstrip()

            else:
                current_info[current_key] += '\n' + line.rstrip()

        elif line.strip() != '':
            print(f"{current_info['title']}: {line}")


all_ports = {}

with open('ports.json', 'r') as fh:
    ports = json.load(fh)['ports']
    for port_name, port_info in ports.items():
        port_title = port_info['attr']['title']
        all_ports[port_name] = port_title


# Overrides
all_ports['moonlight.zip'] = "Moonlight Nvidia Gamestreaming App"
all_ports['hexen2.zip'] = "Hexen 2/Hexen 2 - Portal of Praevus"

def find_best(title, ports, min_score=1.0):
    best_name = None
    best_score = min_score
    shit_score = 0
    shit_name = None

    for port_name in ports:
        score = SM(None, ports[port_name].lower(), title.lower()).ratio()
        if score > best_score:
            best_score = score
            best_name = port_name

        if score > shit_score:
            shit_score = score
            shit_name = port_name

    if best_name is None:
        print(f"{shit_score}: {shit_name}")
        print(f"     {title}")

    else:
        del ports[best_name]

    return best_name

for i in range(1, 6):
    for current_info in output:
        if current_info['name'] is not None:
            continue

        current_info['name'] = find_best(current_info['title'], all_ports, 1.0 - (i * 0.1))
        if current_info['name'] is None and '(' in current_info['title']:
            current_info['name'] = find_best(current_info['title'].split('(', 1)[0], all_ports, 1.0 - (i * 0.1))

print(json.dumps(all_ports, indent=4))

print(json.dumps(output, indent=4))



