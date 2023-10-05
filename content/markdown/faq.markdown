## What is PortMaster?

**PortMaster** is a simple GUI tool designed to facilitate the downloading and installation of game ports for linux handheld devices. 

One of the goals of PortMaster is to not install or upgrade any existing OS libraries for any ports. Any of the ports that need a particular non-standard library are maintained within the ports' folder and made available specifically to that port during execution.

Through the volunteer contributions of the mighty **Port Navigators**, most of the the ports available through PortMaster have been configured to launch with proper controls for the various devices that are supported.

## What Devices are supported? ## 

The full list of supported devices can be found here: 

## How can I install PortMaster? 
A Guide to install Portmaster can be found here:

## Do I have to use PortMaster to install ports?

You can simply go to the PortMaster repo [https://github.com/christianhaitian/PortMaster](https://github.com/christianhaitian/PortMaster) find the `.zip` of the port you want, download it and unzip the contents of it to the `/roms/ports` folder. You'll also need to copy the PortMaster folder to your `/roms/ports` folder. If you don't want the PortMaster folder to show up in your Ports menu in Emulationstation, just delete the PortMaster.sh file as it won't be needed if you don't plan to install or update your ports online via this tool.

Keep in mind that some games require Runtimes that can be downloaded from (Runtime Link)

For ArkOS on the RG351V & 353V/S/RG353P/S or RG351MP, if SD2 is being used for roms, unzip the port to the /roms2/ports folder instead and copy the PortMaster folder to the /roms2/tools location. A few additional ports are available on the large releases repo [https://github.com/PortsMaster/PortMaster-Releases/releases](https://github.com/PortsMaster/PortMaster-Releases/releases) due to their size (ex. SuperTux, Ur Quan Masters, and FreedroidRPG).

## How do I get more info about the ports in PortMaster like the sources used and additional asset needs if applicable?

You can find all Ports with included instructions on the PortMaster Wiki 
https://portmaster.games/wiki.html

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

  Amberelec: root / amberelec
  ArkOS    : ark / ark 
  Jelos    : root / check under system settings
- enter
```
cd /roms/ports/
./WhateveryourgameIsCalled.sh
```
You can then mark the output with your mouse and with ctrl + c / ctrl + v paste it into the ports-help channel on discord.

