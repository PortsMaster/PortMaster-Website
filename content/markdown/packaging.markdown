# Packaging ports for PortMaster
**To release a Port on PortMaster we have some guidelines that need to be followed:**

## Port Zip Structure
- [portname.zip/](#)
  - [portname/](#)
    - [README (optional)](#)
    - [portname.port.json](#)
    - [licensefile](#)
    - [gamename.gptk (If needed)](#)
    - [libs/ (If needed)](#)
    - [gamedata/](#)
  - [PortScript.sh](#)

## PortMaster Repo Structure
- [PortMaster/](#)
  - [images/](#)
    - [portname.screenshot.png](#)
  - [markdown/](#)
    - [portname.md](#)
  - [portname.zip](#)


## The Launchscript .sh
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


get_controls # We pull the controller configs from the get_controls function from the control.txt file here

# We switch to the port's directory location below & set the variable for easier handling below

GAMEDIR=/$directory/ports/portfolder/
cd $GAMEDIR

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
LD_LIBRARY_PATH="$PWD/libs:$LD_LIBRARY_PATH"

SDL_GAMECONTROLLERCONFIG="$sdl_controllerconfig" # Provide appropriate controller configuration if it recognizes SDL controller input
./portexecutable 2>&1 | tee -a ./log.txt # Launch the executable and write a log to log.txt

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

## Examples: 
### Basic Launchscript for open source ports with no specific engines and use of gp2keyb for controls and some needed libraries

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

get_controls

GAMEDIR=/$directory/ports/portfolder/
cd $GAMEDIR

$ESUDO chmod 666 /dev/uinput
$GPTOKEYB "portexecutable" -c "./portname.gptk" &
LD_LIBRARY_PATH="$PWD/libs:$LD_LIBRARY_PATH" SDL_GAMECONTROLLERCONFIG="$sdl_controllerconfig" ./portexecutable 2>&1 | tee -a ./log.txt

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

get_controls

GAMEDIR=/$directory/ports/portfolder/
CONFDIR="$GAMEDIR/conf/"

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

export FRT_NO_EXIT_SHORTCUTS=FRT_NO_EXIT_SHORTCUTS # By default FRT sets Select as a Force Quit Hotkey, with this we disable that.

$ESUDO chmod 666 /dev/uinput
$GPTOKEYB "$runtime" -c "./godot.gptk" &
SDL_GAMECONTROLLERCONFIG="$sdl_controllerconfig"
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

get_controls

GAMEDIR=/$directory/ports/portfolder
cd $GAMEDIR

export LD_LIBRARY_PATH="$PWD/libs:$LD_LIBRARY_PATH"

$ESUDO chmod 666 /dev/uinput

$GPTOKEYB "love" -c "./love.gptk" &
./love portname 2>&1 | tee $GAMEDIR/log.txt
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

## The README
The Readme provides some basic information about the Port such as:

- Portname
- Source
- Porter
- Description
- Compile instructions
- Controls

Example:

```
Abombniball (https://www.portmaster.games) 
=========================

Original version by:
http://akawaka.csn.ul.ie/abombniball.php3

Portmaster Version: 	

- Cebion https://github.com/Cebion
	
Description 
===========
The objective of Abombniball is to defuse all the explosives on each level.
As a ball, this would normally be a simple task,
however each level is filled with traps and devious puzzles placed there by
...oh...lets say "Dr. Y-Front", your arch-nemesis (he's very evil).
These traps take the form of special tiles which disappear or do other nasty things.

To compile:
===========

git clone git@github.com:Cebion/Abombniball.git
cd Abombniball
./configure
make
 
Controls:
=============

DPAD		= Move
```

## Port.json
The Port.json contains all metadata on ports that our GUI and Wiki needs to properly display and install Ports.
You can use following Port JSON Generator to generate a port.json file for you (https://portmaster.games/port-json.html)

Following Info needs to be added:
- Port Title
- Zip File Name
- Script Name
- Directory Name
- Genres
- Porter 
- Description
- Instructions what files or directions are needed to make the port work
- Runtime

  
## Licensefile 
Please add licensefiles for all sources and assets you used.

For example:

- game project open source file (if it's an open source game)
- gptokeyb license file
- sdl1.2 compat license file
- gl4es license file
- box86 / box64 license files

## Portname.md
This acts as a readme and for the Wiki Entry on our website.
Please add the thank you notes from the original developers as well as how the game was compiled and any additional information likes controls.

You can view the markdown before submitting it here: https://portmaster.games/port-markdown.html

[Example](https://raw.githubusercontent.com/PortsMaster/PortMaster-Website/main/content/markdown/example.md)

## Screenshot
For each port, we include a screeshot for use in the PortMaster GUI and the online catalogue page. This must:
* Show gameplay or the main function of the port -- not just the title screen.
* Use a 4:3 aspect ratio with minimum resolution of 640×480.
* Capture letterboxing or pillarboxing if that is how the game displays on a 4:3 handheld screen.
Save this file as `screenshot.png`

After putting all these files in one place please zip these files using regular zip.

With this you can now go ahead to make a Pull Request on our main Portmaster Repo (if you tested the Port for all major cfws / devices of course) 

## Creating a Pull Request
To submit your game to PortMaster you need to create a fork of the current main PortMaster Repo (https://github.com/christianhaitian/PortMaster)

Following Requierements need to be added:
- Tested your game on all major CFWs (AmberELEC, ArkOS, JELOS)
- Tested all major resolutions (480x320, 640x,480 and higher res like 1280x720)
For testing we have a dedicated testing section in our Discord called testing-n-dev (https://discord.com/channels/1122861252088172575/1122885073507733625)
- Have your port in following structure:

```
   Port Zip Structure
- [portname.zip/](#)
  - [portname/](#)
    - [README (optional)](#)
    - [portname.port.json](#)
    - [licensefile](#)
    - [gamename.gptk (If needed)](#)
    - [libs/ (If needed)](#)
    - [gamedata/](#)
  - [PortScript.sh](#)

 PortMaster Repo Structure
- [PortMaster/](#)
  - [images/](#)
    - [portname.screenshot.png](#)
  - [markdown/](#)
    - [portname.md](#)
  - [portname.zip](#)
```


After that your port will be reviewed by one of the crew members.

