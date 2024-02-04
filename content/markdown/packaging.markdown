# Packaging Ports for PortMaster

## Index
- [Portname Requirements](#portname-requirements)
- [New Port Structure](#new-port-structure)
  - [port.json](#portjson)
  - [README.md](#readmemd)
  - [Screenshot](#screenshot)
  - [License File](#licensefile)
  - [The Launch Script (.sh)](#the-launchscript-sh)
  - [Examples](#examples)
- [Creating a Pull Request](#creating-a-pull-request)

**To release a Port on PortMaster we have some guidelines that need to be followed:**

### Portname requirements

The **portname** must start with either a lowercase letter (a-z) or a number (0-9).

You can then have a combination of lowercase letters (a-z), numbers (0-9), periods (.), or underscores (\_).

There is no limit on the length of the name, but keep it short.

This name must not clash with any other existing ports.

### New Port Structure:

Ports are now contained within the `port` top level directory, each port has its own sub-directory named after the port itself. Each port must adhere to the `portname` rules stated above. Each port must have a `port.json`, `screenshot.{jpg,png}`, `README.md`, a port script and a port directory. It may optionally include a `cover.{jpg,png}`.

The script should have capital letters (like `Port Name.sh`) and must end in `.sh`, the port directory should be the same as the containing directory. Some legacy ports have different names, new ports won't be accepted unless they follow the new convention.

Scripts and port directories must be unique across the whole project, checks will be run to ensure this is right.

A port directory might look like the following:

```
- portname/
  - port.json
  - README.md
  - screenshot.jpg
  - cover.jpg (Optional)
  - Port Name.sh
  - portname/
    - <portfiles here>
    - LICENSE Files
```

#### port.json

This is used by portmaster, this should include all the pertinent info for the port, [we have a handy port.json generator here](http://portmaster.games/port-json.html).

Example from 2048.

```json
{
    "version": 2,
    "name": "2048.zip",
    "items": [
        "2048.sh",
        "2048/"
    ],
    "items_opt": null,
    "attr": {
        "title": "2048",
        "desc": "The 2048 puzzle game",
        "inst": "Ready to run.",
        "genres": [
            "puzzle"
        ],
        "porter": [
            "Christian_Haitian"
        ],
        "image": {},
        "rtr": true,
        "runtime": null,
        "reqs": []
    }
}
```

#### README.md

This adds additional info for the port on the wiki, [we have a handy README.md generator here](http://portmaster.games/port-markdown.html).

Example:

```markdown
# Notes

Thanks to [Martin Törnqvist](https://gitlab.com/martin-tornqvist/ia) for this game.

Source: https://gitlab.com/martin-tornqvist/ia

## Controls

| Button | Action |
|--|--|
| Back | Inventory |
| Start | Map |
| D-pad/Right-Analog | Movement, navigation in menus |
| A | Select something in a menu, confirm action, etc. |
| B | Cancel/proceed |
| Back + A | Y (yes for answering questions in dialogs) |
| Back + B | N (no for answering questions in dialogs), make noise |
| Back + Y | Toggle lantern |
| Back + X | WAIT five turns, or until something happens |
| X | Melee attack adjacent monster (useful for diagonals) |
| Y | Swap weapons |
| L1 | Cast spell |
| L2 | Throw item |
| L3 | LOOK, VIEW descriptions of things on the map |
| R1 | Fire ranged weapon |
| R2 | Reload ranged weapon |
| R3 | CHARACTER information |
| Right_Analog_Up | Pickup item |
| Right_Analog_Right | KICK or strike objects, or DESTROY CORPSES |
| Right_Analog_Down | DISARM trap |
| Right_Analog_Left | CLOSE DOOR, or jam closed door |

## Compile

```shell 
git clone https://gitlab.com/martin-tornqvist/ia
cd ia
./build-release.sh
```
#### Screenshot
For use in the PortMaster GUI aswell as for the Wiki we need a screenshot of the gameplay or main function of the Port.
A title screenshot would not show actual content of the port.
The screenshot has to be at least 640x480 in dimensions and format can either be .jpg or .png
For naming its portname.screenshot.png

For convinient use we also have a screenshot tool for making screenshots on your device.
https://github.com/Cebion/Portmaster_builds/releases/download/1.0/screenshot.rar

You can use these scripts to capture either screenshots or videos on your device. Depending on your device you might need to adjust the width and height values.


  
#### Licensefile 
Please add licensefiles for all sources and assets you used.

For example:

- game project open source file (if it's an open source game)
- gptokeyb license file
- sdl1.2 compat license file
- gl4es license file
- box86 / box64 license files

#### The Launchscript .sh

The script should have capital letters (like `Port Name.sh`) and must end in `.sh`, the port directory should be the same as the containing directory. Some legacy ports have different names, new ports won't be accepted unless they follow the new convention.

Below we pick apart a launchscript  and explain what each function does:

```
# Below we assign the source of the control folder (which is the PortMaster folder) based on the distro:
#!/bin/bash

if [ -d "/opt/system/Tools/PortMaster/" ]; then
  controlfolder="/opt/system/Tools/PortMaster"  # Location for ArkOS which is mapped from /roms/tools or /roms2/tools for devices that support 2 sd cards and have them in use.
elif [ -d "/opt/tools/PortMaster/" ]; then # Location for TheRA
  controlfolder="/opt/tools/PortMaster"
else
  controlfolder="/roms/ports/PortMaster" # Location for 351Elec/AmberElec, JelOS, uOS and RetroOZ
fi

source $controlfolder/control.txt # We source the control.txt file contents here
# The $ESUDO, $directory, $param_device and necessary sdl configuration controller configurations will be sourced from the control.txt file shown [here]

# With device_info we can get dynamic device information like resolution, cpu, cfw etc.
source $controlfolder/device_info.txt


get_controls # We pull the controller configs from the get_controls function from the control.txt file here

# We switch to the port's directory location below & set the variable for easier handling below

GAMEDIR=/$directory/ports/portfolder/
cd $GAMEDIR

# Log the execution of the script
exec > >(tee "$GAMEDIR/log.txt") 2>&1

# Some ports like to create save files or settings files in the user's home folder or other locations.  
# You can either use XDG variables to redirect the Ports to our gamefolder if the port supports it:
CONFDIR="$GAMEDIR/conf/"

# Ensure the conf directory exists
mkdir -p "$GAMEDIR/conf"

# Set the XDG environment variables for config & savefiles
export XDG_CONFIG_HOME="$CONFDIR"
export XDG_DATA_HOME="$CONFDIR"

or 

# Use symlinks to reroute that to a location within the ports folder so the data stays with the port 
# installation for easy backup and portability.

$ESUDO rm -rf ~/.portfolder
ln -sfv /$directory/ports/portname/conf/.portfolder ~/

# Make sure uinput is accessible so we can make use of the gptokeyb controls.  351Elec/AmberElec, uOS and JelOS always runs in root, naughty naughty.  
# The other distros don't so the $ESUDO variable provides the sudo or not dependant on the OS this script is run from.
$ESUDO chmod 666 /dev/uinput


# We launch gptokeyb using this $GPTOKEYB variable as it will take care of sourcing the executable from the central location,
# assign the appropriate exit hotkey dependent on the device (ex. select + start for most devices and minus + start for the 
# rgb10) and assign the appropriate method for killing an executable dependent on the OS the port is run from.
# With -c we assign a custom mapping file else gptokeyb will only run as a tool to kill the process.
# For $ANALOGSTICKS we have the ability to supply multiple gptk files to support 1 and 2 analogue stick devices in different ways.
# For a proper documentation how gptokeyb works: LINK
$GPTOKEYB "portexecutable" -c "./portname.gptk.$ANALOGSTICKS" &


# Now we launch the port's executable and provide the location of specific libraries in may need along with the appropriate
# controller configuration if it recognizes SDL controller input


### Port specific additional libraries should be included within the port's directory in a separate subfolder named libs.
They can be loaded at runtime using `export LD_LIBRARY_PATH` or using `LD_LIBRARY_PATH=` on the same line as the executable as long as it's before it. \

export LD_LIBRARY_PATH="$GAMEDIR/libs:$LD_LIBRARY_PATH"

# Provide appropriate controller configuration if it recognizes SDL controller input
export SDL_GAMECONTROLLERCONFIG="$sdl_controllerconfig" 

./portexecutable Launch the executable

# Although you can kill most of the ports (if not all of the ports) via a hotkey, the user may choose to exit gracefully.
# That's fine but let's make sure gptokeyb is killed so we don't get ghost inputs or worse yet, 
# launch it again and have 2 or more of them running.
$ESUDO kill -9 $(pidof gptokeyb)

# The line below is helpful for ArkOS, RetroOZ, and TheRA as some of these ports tend to cause the 
# global hotkeys (like brightness and volume control) to stop working after exiting the port for some reason.
$ESUDO systemctl restart oga_events &

# Finally we clean up the terminal screen just for neatness sake as some people care about this.
printf "\033c" > /dev/tty0

```

### Examples: 

#### Basic Launchscript
for open source ports with no specific engines and use of gp2keyb for controls and some needed libraries

```
#!/bin/bash

if [ -d "/opt/system/Tools/PortMaster/" ]; then
  controlfolder="/opt/system/Tools/PortMaster"
elif [ -d "/opt/tools/PortMaster/" ]; then
  controlfolder="/opt/tools/PortMaster"
else
  controlfolder="/roms/ports/PortMaster"
fi

source $controlfolder/control.txt
source $controlfolder/device_info.txt

get_controls

GAMEDIR=/$directory/ports/portfolder/
cd $GAMEDIR

exec > >(tee "$GAMEDIR/log.txt") 2>&1

export SDL_GAMECONTROLLERCONFIG="$sdl_controllerconfig"
export LD_LIBRARY_PATH="$GAMEDIR/libs:$LD_LIBRARY_PATH"

$ESUDO chmod 666 /dev/uinput
$GPTOKEYB "portexecutable" -c "./portname.gptk" &
./portexecutable

$ESUDO kill -9 $(pidof gptokeyb)
$ESUDO systemctl restart oga_events &
printf "\033c" > /dev/tty0
```

### Godot Game Example Launchscript

```

#!/bin/bash

if [ -d "/opt/system/Tools/PortMaster/" ]; then
  controlfolder="/opt/system/Tools/PortMaster"
elif [ -d "/opt/tools/PortMaster/" ]; then
  controlfolder="/opt/tools/PortMaster"
else
  controlfolder="/roms/ports/PortMaster"
fi

source $controlfolder/control.txt
source $controlfolder/device_info.txt

get_controls

GAMEDIR=/$directory/ports/portfolder/
CONFDIR="$GAMEDIR/conf/"

exec > >(tee "$GAMEDIR/log.txt") 2>&1

# Ensure the conf directory exists
mkdir -p "$GAMEDIR/conf"

# Set the XDG environment variables for config & savefiles
export XDG_CONFIG_HOME="$CONFDIR"
export XDG_DATA_HOME="$CONFDIR"

cd $GAMEDIR

runtime="frt_3.2.3"
if [ ! -f "$controlfolder/libs/${runtime}.squashfs" ]; then
  # Check for runtime if not downloaded via PM
  if [ ! -f "$controlfolder/harbourmaster" ]; then
    echo "This port requires the latest PortMaster to run, please go to https://portmaster.games/ for more info." > /dev/tty0
    sleep 5
    exit 1
  fi

  $ESUDO $controlfolder/harbourmaster --quiet --no-check runtime_check "${runtime}.squashfs"
fi

# Setup Godot
godot_dir="$HOME/godot"
godot_file="$controlfolder/libs/${runtime}.squashfs"
$ESUDO mkdir -p "$godot_dir"
$ESUDO umount "$godot_file" || true
$ESUDO mount "$godot_file" "$godot_dir"
PATH="$godot_dir:$PATH"

# By default FRT sets Select as a Force Quit Hotkey, with this we disable that.
export FRT_NO_EXIT_SHORTCUTS=FRT_NO_EXIT_SHORTCUTS # 

export SDL_GAMECONTROLLERCONFIG="$sdl_controllerconfig"

$ESUDO chmod 666 /dev/uinput
$GPTOKEYB "$runtime" -c "./godot.gptk" &
"$runtime" --main-pack "gamename.pck"

$ESUDO umount "$godot_dir"
$ESUDO kill -9 $(pidof gptokeyb)
$ESUDO systemctl restart oga_events &
printf "\033c" > /dev/tty0
```

### Love2d Example Launchscript

```
#!/bin/bash

if [ -d "/opt/system/Tools/PortMaster/" ]; then
  controlfolder="/opt/system/Tools/PortMaster"
elif [ -d "/opt/tools/PortMaster/" ]; then
  controlfolder="/opt/tools/PortMaster"
else
  controlfolder="/roms/ports/PortMaster"
fi

source $controlfolder/control.txt
source $controlfolder/device_info.txt

get_controls

GAMEDIR=/$directory/ports/portfolder
cd $GAMEDIR

exec > >(tee "$GAMEDIR/log.txt") 2>&1

export LD_LIBRARY_PATH="$GAMEDIR/libs:$LD_LIBRARY_PATH"

$ESUDO chmod 666 /dev/uinput

$GPTOKEYB "love" -c "./love.gptk" &
./love portname
$ESUDO kill -9 $(pidof gptokeyb)
$ESUDO systemctl restart oga_events &
printf "\033c" > /dev/tty0
```

### Gamemaker Studio gmloader Example Launchscript

```
#!/bin/bash
# Below we assign the source of the control folder (which is the PortMaster folder) based on the distro:
if [ -d "/opt/system/Tools/PortMaster/" ]; then
  controlfolder="/opt/system/Tools/PortMaster"
elif [ -d "/opt/tools/PortMaster/" ]; then
  controlfolder="/opt/tools/PortMaster"
else
  controlfolder="/roms/ports/PortMaster"
fi

# We source the control.txt file contents here
# The $ESUDO, $directory, $param_device and necessary 
# Sdl configuration controller configurations will be sourced from the control.txt
source $controlfolder/control.txt

# With device_info we can get dynamic device information like resolution, cpu, cfw etc.
source $controlfolder/device_info.txt


# We pull the controller configs from the get_controls function from the control.txt file here
get_controls

# We check on emuelec based CFWs the OS_NAME 
[ -f "/etc/os-release" ] && source "/etc/os-release"

GAMEDIR=/$directory/ports/blastius

# We log the execution of the script into log.txt
exec > >(tee "$GAMEDIR/log.txt") 2>&1

# Jelos has a Pipewire Implentation and gmloader needs the Pipewireplugin folder for sound to work
if [ "$OS_NAME" == "JELOS" ]; then
  export SPA_PLUGIN_DIR="/usr/lib32/spa-0.2"
  export PIPEWIRE_MODULE_DIR="/usr/lib32/pipewire-0.3/"
fi


# Port specific additional libraries should be included within the port's directory in a separate subfolder named libs.
# Prioritize the armhf libs to avoid conflicts with aarch64
export LD_LIBRARY_PATH="/usr/lib32:$GAMEDIR/libs:$GAMEDIR/utils/libs:$LD_LIBRARY_PATH"
export GMLOADER_DEPTH_DISABLE=1
export GMLOADER_SAVEDIR="$GAMEDIR/gamedata/"

cd $GAMEDIR

# If "gamedata/data.win" exists and its size is 3,389,976 bytes, apply the xdelta3 patch
if [ -f "./gamedata/data.win" ]; then
    file_size=$(ls -l "./gamedata/data.win" | awk '{print $5}')
    if [ "$file_size" -eq 3389976 ]; then
        $ESUDO ./utils/xdelta3 -d -s gamedata/data.win -f ./patch.xdelta gamedata/data.win
    fi
fi

# Check for file existence before trying to manipulate them:
[ -f "./gamedata/data.win" ] && mv gamedata/data.win gamedata/game.droid
[ -f "./gamedata/game.win" ] && mv gamedata/game.win gamedata/game.droid

# Make sure uinput is accessible so we can make use of the gptokeyb controls
$ESUDO chmod 666 /dev/uinput

$GPTOKEYB "gmloader" -c ./blastius.gptk &

$ESUDO chmod +x "$GAMEDIR/gmloader"

./gmloader blastius.apk

$ESUDO kill -9 $(pidof gptokeyb)
$ESUDO systemctl restart oga_events &
printf "\033c" > /dev/tty0

```


### Creating a Pull Request

With this you can now go ahead to make a Pull Request on our main Portmaster Repo (if you tested the Port for all major cfws / devices of course) 

To submit your game to PortMaster you need to create a fork of the current main PortMaster Repo 
https://github.com/PortsMaster/PortMaster-New

After forking the repo, go into the settings for the fork and disable github actions for your fork.

Afterwards you can clone the repo, and you should run the newly made `tools/prepare_repo.sh` from the root of repo. This will download the latest files from the release system.

```bash
tools/prepare_repo.sh
```
From there you can create a new directory in `ports/` for your new port, be sure to check the below `New Port Structure` section to make sure your port has all the required files.

After your port has been added and you are ready to submit it, you can run the `build_release.py` script to check if your port adheres to the port standards.

```bash
python3 tools/build_release.py --do-check
```
This will check your port to make sure it has all the required files, and will warn of any issues.

If you add a file that is larger than 90+ MB, you will have to run the script `tools/build_data.py`. It will split the file into 50mb chunks suitable for committing to github. If you edit the large-file just rerun the above script and it will update the chunks. This also adds the file to `.gitginore` in the ports directory so that the large file will not be committed to the repo.

From there you can do a PR and it will be checked again, portmaster crew members will double check it once again.

You can use the build_release.py to build the zips of any ports that have changed.

```bash
python3 tools/build_release.py
```
