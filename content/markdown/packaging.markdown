# Packaging Ports for PortMaster

## Index
- [Portname Requirements](#portname-requirements)
- [New Port Structure](#new-port-structure)
  - [port.json](#portjson)
  - [README.md](#readmemd)
  - [Screenshot](#screenshot)
  - [Gameinfo.xml & Cover](#gameinfo-xml-cover)
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
  - gameinfo.xml
  - cover.jpg (Optional)
  - Port Name.sh
  - portname/
    - licenses/LICENSE Files
    - <portfiles here>
```

#### port.json

This is used by portmaster, this should include all the pertinent info for the port, [we have a handy port.json generator here](http://portmaster.games/port-json.html).
Make sure to select the correct architecture. If the game is using a runtime e.g. Godot/Mono/Java no arch needs to be entered.

Example from 2048.

```json
{
    "version": 2,
    "name": "2048.zip",
    "items": [
        "2048.sh",
        "2048"
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
        "reqs": [],
        "arch": [
            "aarch64",
            "armhf"
        ]
    }
}
```

#### README.md

This adds additional info for the port on the wiki, [we have a handy README.md generator here](http://portmaster.games/port-markdown.html).
Please always add a dedicated thank you note for the developer/creator. Without these people we would not be here. 

Example:

```markdown
## Notes
Thanks to the [Alien Blaster Team](https://www.schwardtnet.de/alienblaster/) for creating this game and making it available for free!
 
## Controls

| Button | Action |
|--|--| 
|A| Special Weapon|
|B| Main Weapon|
|X| Swap Weapon|
|Y| Spwap Special Weapon |
|R1| Key "1" |
 

## Compile

\`\`\`shell
wget http://www.schwardtnet.de/alienblaster/archives/alienblaster-1.1.0.tgz
cd alienblaster-1.1.0
make
\`\`\`
```

#### Screenshot
For use in the PortMaster GUI aswell as for the Wiki we need a screenshot of the gameplay or main function of the Port.
A title screenshot would not show actual content of the port.
The screenshot has to be at least 640x480 in dimensions and format can either be .jpg or .png
For naming its screenshot.png

For convinient use we also have a screenshot tool for making screenshots on your device.
https://github.com/Cebion/Portmaster_builds/releases/download/1.0/screenshot.rar

You can use these scripts to capture either screenshots or videos on your device. Depending on your device you might need to adjust the width and height values.

#### Gameinfo.xml & Cover

Portmaster installs Metadata including a cover to emulationstation upon a Port install.
For this we use a custom gameinfo.xml with all the data needed for Emulationstation and a cover file.

The Coverfile should always show gameplay in additon to other media like boxart or logo.
If no cover is used Portmaster will use the screenshot instead.

To edit existing metadata and to create a new gameinfo.xml file you can use following tool:
https://portmaster.games/metadata-editor.html

Here is the structure of a filled out gameinfo.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<gameList>
  <game>
    <path>./Angband.sh</path>
    <name>Angband</name>
    <desc>Angband is a free, single-player dungeon exploration game.

You play an adventurer seeking riches, fighting monsters, and preparing for a final battle with Morgoth, the Lord of Darkness.</desc>
    <releasedate>20230819T000000</releasedate>
    <developer>Angband Development Team</developer>
    <publisher>Angband Development Team</publisher>
    <genre>RPG</genre>
    <image>./angband/cover.png</image>
  </game>
</gameList>
```
  
#### Licensefile 
Please add licensefiles for all sources, libraries and assets you used into a licenses subfolder.

For example:

- game project open source file (if it's an open source game)
- gptokeyb license file
- sdl1.2 compat license file
- gl4es license file
- box86 / box64 license files
- .so libraries files

You often can find the libraries either in the source folder you compiled or in distributions under /usr/share/doc/package/copyright
#### The Launchscript .sh

The script should have capital letters (like `Port Name.sh`) and must end in `.sh`, the port directory should be the same as the containing directory. Some legacy ports have different names, new ports won't be accepted unless they follow the new convention.

Below we pick apart a launchscript  and explain what each function does:

```shell
# Below we assign the source of the control folder (which is the PortMaster folder) based on the distro:
#!/bin/bash

XDG_DATA_HOME=${XDG_DATA_HOME:-$HOME/.local/share}

if [ -d "/opt/system/Tools/PortMaster/" ]; then
  controlfolder="/opt/system/Tools/PortMaster"
elif [ -d "/opt/tools/PortMaster/" ]; then
  controlfolder="/opt/tools/PortMaster"
elif [ -d "$XDG_DATA_HOME/PortMaster/" ]; then
  controlfolder="$XDG_DATA_HOME/PortMaster"
else
  controlfolder="/roms/ports/PortMaster"
fi

source $controlfolder/control.txt # We source the control.txt file contents here
# The $ESUDO, $directory, $param_device and necessary sdl configuration controller configurations will be sourced from the control.txt file shown [here]

# If a Port is built for armhf architecture only (Need for Speed 2 for example) we set this flag so that some environment condition variables are set in the CFWs mod files.
# Example "https://github.com/PortsMaster/PortMaster-GUI/blob/main/PortMaster/mod_JELOS.txt"
export PORT_32BIT="Y" # If using a 32 bit port, else comment it out.

# We source custom mod files from the portmaster folder example mod_jelos.txt which containts pipewire fixes
[ -f "${controlfolder}/mod_${CFW_NAME}.txt" ] && source "${controlfolder}/mod_${CFW_NAME}.txt"

# We pull the controller configs like the correct SDL2 Gamecontrollerdb GUID from the get_controls function from the control.txt file here
get_controls

# We switch to the port's directory location below & set the variable for the gamedir and a configuration dir  easier handling below
GAMEDIR=/$directory/ports/portfolder/
CONFDIR="$GAMEDIR/conf/"

# Ensure the conf directory exists
mkdir -p "$GAMEDIR/conf"

# Switch to the game directory
cd $GAMEDIR

# Log the execution of the script, the script overwrites itself on each launch
> "$GAMEDIR/log.txt" && exec > >(tee "$GAMEDIR/log.txt") 2>&1

# Some ports like to create save files or settings files in the user's home folder or other locations. We map these config folders so we can either preconfigure games and or have the savefiles in one place. I
# You can either use XDG variables to redirect the Ports to our gamefolder if the port supports it:

# Set the XDG environment variables for config & savefiles
export XDG_DATA_HOME="$CONFDIR"

# OR  

# Use bind_directories to reroute that to a location within the ports folder.
bind_directories ~/.portfolder $GAMEDIR/conf/.portfolder 

# Port specific additional libraries should be included within the port's directory in a separate subfolder named libs.aarch64, libs.armhf or libs.x64
export LD_LIBRARY_PATH="$GAMEDIR/libs.${DEVICE_ARCH}:$LD_LIBRARY_PATH"

# Provide appropriate controller configuration if it recognizes SDL controller input
export SDL_GAMECONTROLLERCONFIG="$sdl_controllerconfig"

# If a port uses GL4ES (libgl.so.1) a folder named gl4es.aarch64 etc. needs to be created with the libgl.so.1 file in it. This makes sure that each cfw and device get the correct GL4ES export.
if [ -f "${controlfolder}/libgl_${CFW_NAME}.txt" ]; then 
  source "${controlfolder}/libgl_${CFW_NAME}.txt"
else
  source "${controlfolder}/libgl_default.txt"
fi

# We launch gptokeyb using this $GPTOKEYB variable as it will take care of sourcing the executable from the central location,
# assign the appropriate exit hotkey dependent on the device (ex. select + start for most devices and minus + start for the 
# rgb10) and assign the appropriate method for killing an executable dependent on the OS the port is run from.
# With -c we assign a custom mapping file else gptokeyb will only run as a tool to kill the process.
# For $ANALOGSTICKS we have the ability to supply multiple gptk files to support 1 and 2 analogue stick devices in different ways.
# For a proper documentation how gptokeyb works: [Link](https://github.com/PortsMaster/gptokeyb)
$GPTOKEYB "portexecutable.${DEVICE_ARCH}" -c "./portname.gptk.$ANALOGSTICKS" &

# Do some platform specific stuff right before the port is launched but after GPTOKEYB is run.
pm_platform_helper "$GAMEDIR/portexecutable.${DEVICE_ARCH}"

# Now we launch the port's executable with multiarch support. Make sure to rename your file according to the architecture you built for. E.g. portexecutable.aarch64
./portexecutable.${DEVICE_ARCH} Launch the executable

# Cleanup any running gptokeyb instances, and any platform specific stuff.
pm_finish

```

### Examples: 

#### Basic Launchscript
for open source ports with no specific engines and use of gp2keyb for controls and some needed libraries

```
#!/bin/bash

XDG_DATA_HOME=${XDG_DATA_HOME:-$HOME/.local/share}

if [ -d "/opt/system/Tools/PortMaster/" ]; then
  controlfolder="/opt/system/Tools/PortMaster"
elif [ -d "/opt/tools/PortMaster/" ]; then
  controlfolder="/opt/tools/PortMaster"
elif [ -d "$XDG_DATA_HOME/PortMaster/" ]; then
  controlfolder="$XDG_DATA_HOME/PortMaster"
else
  controlfolder="/roms/ports/PortMaster"
fi

source $controlfolder/control.txt

#export PORT_32BIT="Y" # If using a 32 bit port
[ -f "${controlfolder}/mod_${CFW_NAME}.txt" ] && source "${controlfolder}/mod_${CFW_NAME}.txt"

get_controls

GAMEDIR=/$directory/ports/portfolder/
CONFDIR="$GAMEDIR/conf/"

mkdir -p "$GAMEDIR/conf"

cd $GAMEDIR

> "$GAMEDIR/log.txt" && exec > >(tee "$GAMEDIR/log.txt") 2>&1

export XDG_DATA_HOME="$CONFDIR"
export LD_LIBRARY_PATH="$GAMEDIR/libs.${DEVICE_ARCH}:$LD_LIBRARY_PATH"
export SDL_GAMECONTROLLERCONFIG="$sdl_controllerconfig"
#export TEXTINPUTINTERACTIVE="Y"

# if XDG Path does not work
# Use bind_directories to reroute that to a location within the ports folder.
bind_directories ~/.portfolder $GAMEDIR/conf/.portfolder 

# If using gl4es
#if [ -f "${controlfolder}/libgl_${CFW_NAME}.txt" ]; then 
#  source "${controlfolder}/libgl_${CFW_NAME}.txt"
#else
#  source "${controlfolder}/libgl_default.txt"
#fi

$GPTOKEYB "portexecutable.${DEVICE_ARCH}" -c "./portname.gptk.$ANALOGSTICKS" &
pm_platform_helper "$GAMEDIR/portexecutable.${DEVICE_ARCH}"
./portexecutable.${DEVICE_ARCH}

pm_finish
```

### Godot Game Example Launchscript

```

#!/bin/bash

XDG_DATA_HOME=${XDG_DATA_HOME:-$HOME/.local/share}

if [ -d "/opt/system/Tools/PortMaster/" ]; then
  controlfolder="/opt/system/Tools/PortMaster"
elif [ -d "/opt/tools/PortMaster/" ]; then
  controlfolder="/opt/tools/PortMaster"
elif [ -d "$XDG_DATA_HOME/PortMaster/" ]; then
  controlfolder="$XDG_DATA_HOME/PortMaster"
else
  controlfolder="/roms/ports/PortMaster"
fi

source $controlfolder/control.txt

[ -f "${controlfolder}/mod_${CFW_NAME}.txt" ] && source "${controlfolder}/mod_${CFW_NAME}.txt"

get_controls

GAMEDIR=/$directory/ports/portfolder/
CONFDIR="$GAMEDIR/conf/"

> "$GAMEDIR/log.txt" && exec > >(tee "$GAMEDIR/log.txt") 2>&1

mkdir -p "$GAMEDIR/conf"
cd $GAMEDIR

# Set the XDG environment variables for config & savefiles
export XDG_DATA_HOME="$CONFDIR"
export SDL_GAMECONTROLLERCONFIG="$sdl_controllerconfig"

#  If XDG Path does not work
# Use _directories to reroute that to a location within the ports folder.
bind_directories ~/.portfolder $GAMEDIR/conf/.portfolder 

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
export FRT_NO_EXIT_SHORTCUTS=FRT_NO_EXIT_SHORTCUTS 


$GPTOKEYB "$runtime" -c "./godot.gptk" &
pm_platform_helper "$runtime"
"$runtime" $GODOT_OPTS --main-pack "gamename.pck"

$ESUDO umount "$godot_dir"
pm_finish
```

### Love2d Example Launchscript

```
#!/bin/bash

XDG_DATA_HOME=${XDG_DATA_HOME:-$HOME/.local/share}

if [ -d "/opt/system/Tools/PortMaster/" ]; then
  controlfolder="/opt/system/Tools/PortMaster"
elif [ -d "/opt/tools/PortMaster/" ]; then
  controlfolder="/opt/tools/PortMaster"
elif [ -d "$XDG_DATA_HOME/PortMaster/" ]; then
  controlfolder="$XDG_DATA_HOME/PortMaster"
else
  controlfolder="/roms/ports/PortMaster"
fi

source $controlfolder/control.txt
source $controlfolder/runtimes/"love_11.5"/love.txt

[ -f "${controlfolder}/mod_${CFW_NAME}.txt" ] && source "${controlfolder}/mod_${CFW_NAME}.txt"

get_controls

GAMEDIR=/$directory/ports/portfolder
CONFDIR="$GAMEDIR/conf/"

mkdir -p "$GAMEDIR/conf"
cd $GAMEDIR

> "$GAMEDIR/log.txt" && exec > >(tee "$GAMEDIR/log.txt") 2>&1

# Set the XDG environment variables for config & savefiles
export XDG_DATA_HOME="$CONFDIR"

#  If XDG Path does not work
# Use bind_directories to reroute that to a location within the ports folder.
bind_directories ~/.portfolder $GAMEDIR/conf/.portfolder 

export LD_LIBRARY_PATH="$GAMEDIR/libs.${DEVICE_ARCH}:$LD_LIBRARY_PATH"
export SDL_GAMECONTROLLERCONFIG="$sdl_controllerconfig"

# Run the love runtime
$GPTOKEYB "$LOVE_GPTK" &
pm_platform_helper "$LOVE_BINARY"
$LOVE_RUN "$GAMEDIR/lovegame"

pm_finish
```

### Gamemaker Studio gmloader Example Launchscript

```
#!/bin/bash

XDG_DATA_HOME=${XDG_DATA_HOME:-$HOME/.local/share}

if [ -d "/opt/system/Tools/PortMaster/" ]; then
  controlfolder="/opt/system/Tools/PortMaster"
elif [ -d "/opt/tools/PortMaster/" ]; then
  controlfolder="/opt/tools/PortMaster"
elif [ -d "$XDG_DATA_HOME/PortMaster/" ]; then
  controlfolder="$XDG_DATA_HOME/PortMaster"
else
  controlfolder="/roms/ports/PortMaster"
fi

source $controlfolder/control.txt

export PORT_32BIT="Y" # If using a 32 bit port
[ -f "${controlfolder}/mod_${CFW_NAME}.txt" ] && source "${controlfolder}/mod_${CFW_NAME}.txt"

get_controls

GAMEDIR=/$directory/ports/portfolder/
CONFDIR="$GAMEDIR/conf/"
mkdir -p "$GAMEDIR/conf"

cd $GAMEDIR
> "$GAMEDIR/log.txt" && exec > >(tee "$GAMEDIR/log.txt") 2>&1

export LD_LIBRARY_PATH="$GAMEDIR/libs.${DEVICE_ARCH}:$LD_LIBRARY_PATH"
export SDL_GAMECONTROLLERCONFIG="$sdl_controllerconfig"
$ESUDO chmod +x "$GAMEDIR/gmloader"

# if no .gptk file is used use $GPTOKEYB "gmloader" & 
$GPTOKEYB "gmloader" -c ./controls.gptk &
pm_platform_helper "gmloader"
./gmloader donor.apk

pm_finish
```

### Launchscript functions and error handling

Some games require installation or patches on first run. We can use functions inside shell to keep code organized. Use error handling inside functions to keep the launchscript stable.

Example:

```shell
# Functions
install() {
    echo "Performing first-run setup..." > $CUR_TTY
    # Purge unneeded files
    rm -rf assets/*.exe assets/*.dll assets/.gitkeep
    # Rename data.win
    echo "Moving game files..." > $CUR_TTY
    mv "./assets/data.win" "./game.droid" || return 1
    mv assets/* ./
    rmdir assets
    # Do localization fonts and xdelta patch if low ram
    if [ $DEVICE_RAM -lt 2 ]; then
        rm -rf "$GAMEDIR/localization_fonts.csv"
        mv patch/localization_fonts.csv ./
        find $GAMEDIR -type f -iname "*.ttf" ! -iname "Commodore Rounded v1-1.ttf" ! -iname "small_pixel.ttf" -delete
        apply_patch && rm -rf "$GAMEDIR/patch" # Only remove if function is successful
    fi
}

apply_patch() {
    echo "Applying patch..." > $CUR_TTY
    if [ -f "$controlfolder/xdelta3" ]; then
        error=$("$controlfolder/xdelta3" -d -s "$GAMEDIR/game.droid" "$GAMEDIR/patch/iosas.xdelta" "$GAMEDIR/game2.droid" 2>&1)
        if [ $? -eq 0 ]; then
            rm -rf "$GAMEDIR/game.droid"
            mv "$GAMEDIR/game2.droid" "$GAMEDIR/game.droid"
            echo "Patch applied successfully." > $CUR_TTY
        else
            echo "Failed to apply patch. Error: $error" > $CUR_TTY
            rm -f "$GAMEDIR/game2.droid"
            return 1
        fi
    else
        echo "Error: xdelta3 not found in $controlfolder. Try updating PortMaster." > $CUR_TTY
        return 1
    fi
}

if [ ! -f "$GAMEDIR/game.droid" ] && [ ! -f "$GAMEDIR/.installed" ]; then
    install && touch "$GAMEDIR/.installed" # Only touch if function is successful
fi
```

Several things to note here:

- The line for moving the game.droid file immediately returns `1` if it couldn't do it. This prevents the install function from proceeding if a critical task wasn't completed.
- The `apply_patch` function and `.csv` file are only used if the target device has less than 2GB of RAM, making use of the `$DEVICE_RAM` variable filled by `control.txt`.
- The `$GAMEDIR/patch` directory is only removed if the `apply_patch` function is successful, by using `&&`. This allows the user to correct any mistakes during the install process without having to reinstall the port.
- The `apply_patch` function itself is a nest of IF conditionals to assist with error checking. It returns `1` if it failed.
- The `installed` function is only run once if successful. If it was successfully completed, a `.installed` file is created, preventing future runs of the function.


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
