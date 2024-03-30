
# How Do We Compile Our Games for PortMaster?

Since PortMaster is platform-independent and delivers its own dependencies, we don't rely on the build mechanism of the CFWs out there. To compile games for the AARCH64 architecture, you can do so in various ways.

## Methods for Compiling

### 1. AARCH64 chroot development VM by Christian

This is a Virtual Box VM with two chroot instances (AARCH64 & ARMHF).

**For More Info:** [Forum Post](https://forum.odroid.com/viewtopic.php?p=306185#p306185)

#### Getting Into Chroots:

- **For 32-bit Arm environment:**

  ```bash
  sudo chroot /mnt/data/armhf/
  ```
  or create an Arm32 shortcut on the desktop GUI and click on it.

- **For 64-bit Arm environment:**

  ```bash
  sudo chroot /mnt/data/arm64/
  ```
  or create an Arm64 shortcut on the desktop GUI and click on it.

#### Helpful Tools to Install:

```bash
apt -y install build-essential git wget libdrm-dev python3 python3-pip python3-setuptools python3-wheel ninja-build libopenal-dev premake4 autoconf libevdev-dev ffmpeg libsnappy-dev libboost-tools-dev magics++ libboost-thread-dev libboost-all-dev pkg-config zlib1g-dev libpng-dev libsdl2-dev clang cmake cmake-data libarchive13 libcurl4 libfreetype6-dev libjsoncpp1 librhash0 libuv1 mercurial mercurial-common libgbm-dev libsdl2-ttf-2.0-0 libsdl2-ttf-dev
```

### 2. WSL2 chroot

For more information, visit the [GitHub Repository](https://github.com/Cebion/Portmaster_builds).

#### Build Environment

##### Instructions to set it up:

- Install required packages on Ubuntu 20.04 LTS WSL 2:

  ```bash
  sudo apt install build-essential binfmt-support daemonize libarchive-tools qemu-system qemu-user qemu-user-static gcc-aarch64-linux-gnu g++-aarch64-linux-gnu
  ```

- Download 20.04 Focal server-cloudimg-arm64-wsl.rootfs.tar.gz from Ubuntu Cloud image. [Ubuntu Cloud Image](https://cloud-images.ubuntu.com/releases/)

- Extract the tarball in a folder:

  ```bash
  mkdir folder
  sudo bsdtar -xpf ubuntu-20.04-server-cloudimg-arm64-wsl.rootfs.tar.gz -C folder
  ```

- Copy qemu static binary into that folder:

  ```bash
  sudo cp /usr/bin/qemu-aarch64-static folder/usr/bin
  ```

- Start systemd with daemonize:

  ```bash
  sudo daemonize /usr/bin/unshare -fp --mount-proc /lib/systemd/systemd --system-unit=basic.target
  ```

- Check if AARCH64 binfmt entry is present:

  ```bash
  ls /proc/sys/fs/binfmt_misc/
  ```

- Mount and chroot into the environment:

  ```bash
  sudo mount -o bind /proc folder/proc
  sudo mount -o bind /dev folder/dev
  sudo chroot folder qemu-aarch64-static /bin/bash
  ```

- In the chroot, delete /etc/resolv.conf file and write a name server to it.

  ```bash
  rm /etc/resolv.conf
  echo "nameserver 8.8.8.8" > /etc/resolv.conf
  ```

- Exit chroot
  ```mkdir -p folder/tmp/.X11-unix```
- Create chroot.sh:

  ```bash
  #!/bin/bash
  
  sudo daemonize /usr/bin/unshare -fp --mount-proc /lib/systemd/systemd --system-unit=basic.target
  
  sudo mount -o bind /proc folder/proc
  sudo mount -o bind /dev folder/dev
  sudo mount -o bind /tmp/.X11-unix folder/tmp/.X11-unix
  xhost + local:
  sudo chroot folder qemu-aarch64-static /bin/bash
  ```

- Make the chroot.sh executable:

  ```bash
  chmod +x chroot.sh
  ```

- Chroot into the new environment:

  ```bash
  sudo ./chroot.sh
  ```

- Update & Upgrade the chroot:

  ```bash
  apt-get update && apt-get upgrade 
  ```

- Helpful development tools & libraries to have in the chroot:

  ```bash
  apt-get install --no-install-recommends build-essential git wget libdrm-dev python3 python3-pip python3-setuptools python3-wheel ninja-build libopenal-dev premake4 autoconf libevdev-dev ffmpeg libboost-tools-dev magics++ libboost-thread-dev libboost-all-dev pkg-config zlib1g-dev libsdl-mixer1.2-dev libsdl1.2-dev libsdl-gfx1.2-dev libsdl2-mixer-dev clang cmake cmake-data libarchive13 libcurl4 libfreetype6-dev librhash0 libuv1 mercurial mercurial-common libgbm-dev libsdl-image1.2-dev
  ```

- Install custom SDL2 Libraries for better compatibility:

  ```bash
  rm /usr/lib/aarch64-linux-gnu/libSDL2.* 
  rm -rf /usr/lib/aarch64-linux-gnu/libSDL2-2.0.so*
  
  wget https://github.com/libsdl-org/SDL/archive/refs/tags/release-2.26.2.tar.gz
  ./configure --prefix=/usr
  make -j8
  make install
  
  /sbin/ldconfig
  ```

### 3. Use Docker

As per [Docker Guide](#)

### 4. Create Your Own chroot

As per [this guide](https://github.com/christianhaitian/arkos/wiki/Building#to-create-debian-based-chroots-in-a-linux-environment).

### 5. Cross-Compiling Tools for AARCH64

With the arm64 SDL2 library, etc.
