#!/bin/bash

# Below we assign the source of the control folder (which is the PortMaster folder) based on the distro:
if [ -d "/opt/system/Tools/PortMaster/" ]; then
  controlfolder="/opt/system/Tools/PortMaster" # Location for ArkOS which is mapped from /roms/tools or /roms2/tools for devices that support 2 sd cards and have them in use.
elif [ -d "/opt/tools/PortMaster/" ]; then
  controlfolder="/opt/tools/PortMaster" # Location for TheRA
else
  controlfolder="/roms/ports/PortMaster" # Location for 351Elec/AmberElec, JelOS, uOS and RetroOZ
fi

## We source external file contents here
# Import [$ESUDO, $directory, $param_device], & sdl control configs from control.txt
source $controlfolder/control.txt
# Import [$DISPLAY_WIDTH, $DISPLAY_HEIGHT, $DISPLAY_ORIENTATION, $CFW_NAME, $CFW_VERSION, $DEVICE_RAM, $DEVICE_NAME, $ANALOG_STICKS, $DEVICE_CPU] from device_info.txt
source $controlfolder/device_info.txt
# Import modules based on CFW
[ -f "$controlfolder/mod_${CFW_NAME}.txt" ] && source "$controlfolder/mod_${CFW_NAME}.txt"

# We pull the controller configs from the get_controls function from the control.txt file here
get_controls

# Declare any needed local variables here
GAMEDIR="/$directory/ports/PORTNAME"
#CONFDIR="$GAMEDIR/conf/"

## Declare exports here
# LD_LIBRARY_PATH is used for libs, both integrated into cfw and provided by the port
export LD_LIBRARY_PATH="$GAMEDIR/libs:/usr/lib"
# Uncomment this line if the port will use sdl controls, commonly preferred for flightsim and racing games
#export SDL_GAMECONTROLLERCONFIG="$sdl_controllerconfig" 

# Change the current directory here
cd $GAMEDIR

# With all the common setup out of the way, log the execution of the script
exec > >(tee "$GAMEDIR/log.txt") 2>&1

# Some ports like to create save files or settings files in the user's home folder or other locations.  
# Uncomment the below lines if you need to use a config or save directory.

# Ensure the conf directory exists
#mkdir -p "$GAMEDIR/conf"

#$ESUDO rm -rf ~/.portfolder
#ln -sfv /$directory/ports/portname/conf/.portfolder ~/

# Ensure we have permissions for ttyl and uinput, which is needed by gptokeyb.
$ESUDO chmod 666 /dev/uinput
#Using ttyl, we can output to the device screen, which means we can tell the user if the port will take a long time to load.
$ESUDO chmod 666 /dev/tty1
#$GPTOKEYB "$GAME" -c "$GAME.gptk" & 

# Run the game
./$GAME

# Kill gptokeyb so we don't have multiple instances running
$ESUDO kill -9 $(pidof gptokeyb)
# The line below is helpful for ArkOS, RetroOZ, and TheRA as some of these ports tend to cause the global hotkeys (like brightness and volume control) to stop working after exiting the port for some reason.
$ESUDO systemctl restart oga_events & 
# Clean up the terminal screen just for neatness sake as some people care about this.
printf "\033c" >> /dev/tty1
