#!/usr/bin/env bash
# Interactively add a device entry to devices.json

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEVICES_JSON="$SCRIPT_DIR/../devices.json"

# ── colours ──────────────────────────────────────────────────────────────────
BOLD='\033[1m'
CYAN='\033[1;36m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
RED='\033[1;31m'
RESET='\033[0m'

header()  { echo -e "\n${CYAN}${BOLD}$*${RESET}"; }
prompt()  { echo -e "${YELLOW}$*${RESET}"; }
success() { echo -e "${GREEN}$*${RESET}"; }
error()   { echo -e "${RED}$*${RESET}"; }

# ── helpers ───────────────────────────────────────────────────────────────────
pick_from_list() {
    # pick_from_list "label" item1 item2 ... itemN
    # Sets PICK_RESULT to the chosen value
    local label="$1"; shift
    local items=("$@")
    local last=$(( ${#items[@]} ))
    prompt "$label"
    local i=1
    for item in "${items[@]}"; do
        echo -e "  ${BOLD}$i)${RESET} $item"
        (( i++ ))
    done
    echo -e "  ${BOLD}$i)${RESET} Custom…"
    while true; do
        read -rp "  Choice [1-$i]: " choice
        if [[ "$choice" =~ ^[0-9]+$ ]] && (( choice >= 1 && choice <= i )); then
            if (( choice == i )); then
                read -rp "  Enter custom value: " PICK_RESULT
            else
                PICK_RESULT="${items[$((choice-1))]}"
            fi
            return
        fi
        error "  Please enter a number between 1 and $i."
    done
}

multiselect_firmware() {
    # Sets FIRMWARE_RESULT to a comma-separated list
    local -a options=("ArkOS" "ArkOS (Wummle)" "dArkOS" "AmberELEC" "ROCKNIX" "muOS" "Knulli" "uOS/UnofficialOS")
    local -a selected=()

    prompt "Select supported firmwares (enter numbers, space-separated, e.g. '1 3 5'):"
    local i=1
    for fw in "${options[@]}"; do
        echo -e "  ${BOLD}$i)${RESET} $fw"
        (( i++ ))
    done
    echo -e "  ${BOLD}$i)${RESET} Custom (type it manually)"

    local last=$i
    while true; do
        read -rp "  Choices: " -a choices
        if [[ ${#choices[@]} -eq 0 ]]; then
            error "  Please select at least one firmware."
            continue
        fi
        local valid=true
        for c in "${choices[@]}"; do
            if ! [[ "$c" =~ ^[0-9]+$ ]] || (( c < 1 || c > last )); then
                error "  Invalid choice: $c. Must be 1–$last."
                valid=false
                break
            fi
        done
        $valid || continue

        selected=()
        for c in "${choices[@]}"; do
            if (( c == last )); then
                read -rp "  Enter custom firmware name: " custom_fw
                selected+=("$custom_fw")
            else
                selected+=("${options[$((c-1))]}")
            fi
        done
        break
    done

    # Join with comma
    local IFS=','
    FIRMWARE_RESULT="${selected[*]}"
}

# ── main ─────────────────────────────────────────────────────────────────────
echo -e "\n${CYAN}${BOLD}╔══════════════════════════════════════╗${RESET}"
echo -e "${CYAN}${BOLD}║   PortMaster — Add Device            ║${RESET}"
echo -e "${CYAN}${BOLD}╚══════════════════════════════════════╝${RESET}"
echo -e "Editing: ${BOLD}$DEVICES_JSON${RESET}"

# 1. Device name
header "Device Name"
prompt "Enter the device name (e.g. RG353 M/V, RGB30):"
read -rp "  Name: " DEVICE_NAME
if [[ -z "$DEVICE_NAME" ]]; then
    error "Device name cannot be empty."; exit 1
fi

# 2. Manufacturer
header "Manufacturer"
pick_from_list "Select manufacturer:" "Anbernic" "Powkiddy" "Retroid" "Miyoo" "AYANEO" "GPD"
MANUFACTURER="$PICK_RESULT"

# 3. Resolution
header "Resolution"
pick_from_list "Select screen resolution (width*height):" \
    "640*480" "480*320" "854*480" "720*480" "1280*720" "1920*1080" \
    "720*720" "960*544" "1920*1152"
RESOLUTION="$PICK_RESULT"

# 4. Aspect ratio — derive suggestion from resolution
IFS='*' read -r W H <<< "$RESOLUTION"
if [[ "$W" =~ ^[0-9]+$ && "$H" =~ ^[0-9]+$ ]]; then
    GCD=$(python3 -c "import math; print(math.gcd($W,$H))")
    SUGGESTED_RATIO="$(( W/GCD )):$(( H/GCD ))"
else
    SUGGESTED_RATIO=""
fi

header "Aspect Ratio"
if [[ -n "$SUGGESTED_RATIO" ]]; then
    echo -e "  Detected from resolution: ${BOLD}$SUGGESTED_RATIO${RESET}"
    read -rp "  Press Enter to accept, or type a different ratio: " AR_INPUT
    ASPECT_RATIO="${AR_INPUT:-$SUGGESTED_RATIO}"
else
    pick_from_list "Select aspect ratio:" "4:3" "3:2" "16:9" "1:1" "15:8" "5:3"
    ASPECT_RATIO="$PICK_RESULT"
fi

# 5. Firmware
header "Supported Firmwares"
multiselect_firmware
FIRMWARE="$FIRMWARE_RESULT"

# 6. Notes
header "Notes"
prompt "Any notes? (leave blank for none, or describe aspect ratio quirks etc.):"
read -rp "  Notes: " NOTES

# ── preview ───────────────────────────────────────────────────────────────────
echo ""
echo -e "${CYAN}${BOLD}── Preview ────────────────────────────────${RESET}"
echo -e "  Device       : ${BOLD}$DEVICE_NAME${RESET}"
echo -e "  Manufacturer : ${BOLD}$MANUFACTURER${RESET}"
echo -e "  Resolution   : ${BOLD}$RESOLUTION${RESET}"
echo -e "  Aspect Ratio : ${BOLD}$ASPECT_RATIO${RESET}"
echo -e "  Firmware     : ${BOLD}$FIRMWARE${RESET}"
echo -e "  Notes        : ${BOLD}${NOTES:-(none)}${RESET}"
echo -e "${CYAN}${BOLD}───────────────────────────────────────────${RESET}"
echo ""
read -rp "Add this device? [Y/n]: " CONFIRM
CONFIRM="${CONFIRM:-Y}"
if [[ ! "$CONFIRM" =~ ^[Yy]$ ]]; then
    echo "Aborted."; exit 0
fi

# ── write to devices.json ─────────────────────────────────────────────────────
python3 - <<PYEOF
import json, sys

path = "$DEVICES_JSON"
with open(path, "r", encoding="utf-8") as f:
    devices = json.load(f)

new_device = {
    "device": "$DEVICE_NAME",
    "manufacturer": "$MANUFACTURER",
    "resolution": "$RESOLUTION",
    "aspect ratio": "$ASPECT_RATIO",
    "firmware": "$FIRMWARE",
    "notes": "$NOTES"
}

# Check for duplicates
for d in devices:
    if d["device"].strip().lower() == new_device["device"].strip().lower():
        print(f"WARNING: A device named '{d['device']}' already exists in devices.json.")
        print("Aborting to avoid duplicates.")
        sys.exit(1)

devices.append(new_device)

with open(path, "w", encoding="utf-8") as f:
    json.dump(devices, f, indent=2, ensure_ascii=False)
    f.write("\n")

print(f"SUCCESS: '{new_device['device']}' added to devices.json.")
PYEOF
