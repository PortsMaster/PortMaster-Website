## What is PortMaster?

**PortMaster** is a simple GUI tool designed to facilitate the downloading and installation of game ports for linux handheld devices. 

One of the goals of PortMaster is to not install or upgrade any existing OS libraries for any ports. Any of the ports that need a particular non-standard library are maintained within the ports' folder and made available specifically to that port during execution.

Through the volunteer contributions of the mighty **Port Navigators**, most of the the ports available through PortMaster have been configured to launch with proper controls for the various devices that are supported.

## What Devices are supported? ## 

(Currently Outdated)
The full list of supported devices can be found [here](https://portmaster.games/supported-devices.html)

## How can I install PortMaster? 
A guide to install Portmaster can be found [here](https://portmaster.games/installation.html)

## Do I have to use PortMaster to install ports?

For the best experience you should download and install the Port trough the PortMaster Application. This ensures that the installed Port has the correct permissions aswell as the correct metadata. 

If you have a device without wifi you can simply go to the PortMaster repo, [https://portmaster.games/games.html](https://portmaster.games/games.html), find the title of the port you want, download it and copy the zip file into the PortMaster Autoinstall folder. Then you just run the PortMaster Application and PortMaster will install the Port for you.

Here are the locations for the autoinstall folder for the 

- **AmberELEC, ROCKNIX, uOS, Jelos** ```/roms/ports/PortMaster/autoinstall/```
- **muOS** ```/mmc/MUOS/PortMaster/autoinstall/```
- **ArkOS** ```/roms/tools/PortMaster/autoinstall/```
- **Knulli** ```/userdata/system/.local/share/PortMaster/autoinstall```

If that does not work you can also unzip the contents of the port into the ports folders of each cfw, note that this may break the port and ports may no longer start.

- **AmberELEC, ROCKNIX, uOS, Jelos** ```/roms/ports/```
- **muOS** ```/mmc/ports/ for the folders and /mnt/mmc/ROMS/Ports/ for the .sh files```
- **ArkOS** ```/roms/tools/PortMaster/autoinstall/```
- **Knulli** ```/userdata/system/.local/share/PortMaster/autoinstall```


## How do I get more info about the ports in PortMaster like the sources used and additional asset needs if applicable?

You can find all Ports with included instructions on the [PortMaster Wiki](https://portmaster.games/games.html)

## If there are updates to Ports, how will that work?

Just run PortMaster and reinstall the port. You can also unzip the associated `.zip` for the port you want and unzip the contents of it to the ports folder. This should install the latest port related files if they've been updated in PortMaster. In most cases, it should not impact any existing game data you had to provide or existing saves unless the updated port made changes to the port backend that impacts previous saves.

## How can I help add ports to PortMaster?

See our Contribute section on https://portmaster.games/
If you have any questions about the process not detailed in the documentation feel free to reach out on our Discord Server.

## How can I run my Port via ssh to troubleshoot any starting issues?

Download Putty:
https://the.earth.li/~sgtatham/putty/latest/w64/putty.exe

- Start Putty
- Enter your Device IP
- Open
- Enter your ssh credentials

-- Amberelec: root / amberelec
--  ArkOS    : ark / ark 
--  Jelos    : root / check under system settings
- enter:
```
cd /roms/ports/
./WhateveryourgameIsCalled.sh
```
You can then mark the output with your mouse and with ctrl + c / ctrl + v paste it into the ports-help channel on discord.

