## Installing PortMaster

[Download](https://github.com/PortsMaster/PortMaster-GUI/releases) the latest version of PortMaster.

- Install.PortMaster.sh - The base install of PortMaster.
- Install.Full.PortMaster.sh - The base install + all runtimes. (Recommended for offline devices)

### Via Script

To install PortMaster via a simple Installation Script download either the Install.PortMaster.sh or Install.Full.PortMaster.sh (with all Runtimes already included) from the link above and place it in the appropriate folder for your CFW. After that simply execute the .sh from your Ports folder.

| CFW          | Location               |
|--------------|------------------------|
| AmberElec    | /roms/ports/           |
| ArkOS        | /roms/tools/           |
| ROCKNIX      | /roms/ports/           |
| muOS         | /mnt/mmc/ROMS/Ports/   |
| Knulli       | /userdata/roms/ports   |
| JELOS        | /roms/ports/           |
| UnofficialOS | /roms/ports/           |


## Other CFW

For the other CFW it is as simple as:

- Unzip PortMaster.zip and copy `PortMaster/` directory and all its contents into directory listed above.
- **If you're using ArkOS**, you will need to move the `/roms(or roms2)/tools/PortMaster/PortMaster.sh` up one directory to `/roms(or roms2)/tools/PortMaster.sh`

## Upgrading PortMaster
There are 2 options on how-to upgrade:

### Via Application
1. Open PortMaster application on your device.
2. Click Options
3. Update PortMaster

### Via File copy
1. Use SSH or insert mSD card into your PC.
2. [Download PortMaster.zip](https://github.com/PortsMaster/PortMaster-GUI/releases)
3. (See locations in previous section) Remove previous `PortMaster` folder and unzip contents of downloaded archive to that location.
4. Start PortMaster. Verify that it is runnning new version - the `PM <version>` in the bottom would correspond to the version on the Release Download page.
