
# How Do We Compile Our Games for PortMaster?

Since PortMaster is platform-independent and delivers its own dependencies, we don't rely on the build mechanism of the CFWs out there. To compile games for the AARCH64 architecture, you can do so in various ways.

## Methods for Compiling

### 1. Use Docker

Multi Arch compilation with this [Docker Guide](https://portmaster.games/docker.html)

### 2. WSL2 Ubuntu 22.04 chroot

For more information, visit the [GitHub Repository](https://github.com/Cebion/Portmaster_builds).

#### Build Environment

##### Instructions to set it up:

Install required packages on Ubuntu 22.04 LTS WS2
```
sudo apt install \
build-essential \
binfmt-support \
daemonize \
libarchive-tools \
qemu-system \
qemu-user \
qemu-user-static \
gcc-aarch64-linux-gnu \
g++-aarch64-linux-gnu
```

- Download the jammy arm64 WSL rootfs from Ubuntu Cloud image.
```
wget https://cloud-images.ubuntu.com/wsl/jammy/current/ubuntu-jammy-wsl-arm64-ubuntu22.04lts.rootfs.tar.gz
```

- Extract the tarball in a folder:
```
mkdir folder
sudo bsdtar -xpf ubuntu-jammy-wsl-arm64-ubuntu22.04lts.rootfs.tar.gz -C folder
```

- Copy qemu static binary into that folder:
```
sudo cp /usr/bin/qemu-aarch64-static folder/usr/bin
```

- Start systemd with daemonize:
```
sudo daemonize \
/usr/bin/unshare -fp --mount-proc \
/lib/systemd/systemd --system-unit=basic.target
```

- Check if AARCH64 binfmt entry is present:
```
ls /proc/sys/fs/binfmt_misc/
```
- Mount and chroot into the environment:
```
sudo mount -o bind /proc folder/proc
sudo mount -o bind /dev folder/dev
sudo chroot folder qemu-aarch64-static /bin/bash
```
- In the chroot, delete /etc/resolv.conf file and write a name server to it.
```
rm /etc/resolv.conf
echo "nameserver 8.8.8.8" > /etc/resolv.conf
```
- Exit chroot
- mkdir -p folder/tmp/.X11-unix
  
- Create chroot.sh
```
#!/bin/bash
set -e
# Only start the namespace+systemd if one isn't already running
if ! pgrep -f "unshare -fp --mount-proc /lib/systemd/systemd --system-unit=basic.target" > /dev/null; then
    sudo daemonize \
    /usr/bin/unshare -fp --mount-proc \
    /lib/systemd/systemd --system-unit=basic.target
fi
# Only bind-mount if not already mounted
mountpoint -q folder/proc          || sudo mount -o bind /proc folder/proc
mountpoint -q folder/dev           || sudo mount -o bind /dev folder/dev
mountpoint -q folder/tmp/.X11-unix || sudo mount -o bind /tmp/.X11-unix folder/tmp/.X11-unix
xhost + local:
cleanup() {
    sudo umount folder/tmp/.X11-unix 2>/dev/null || true
    sudo umount folder/dev 2>/dev/null || true
    sudo umount folder/proc 2>/dev/null || true
}
trap cleanup EXIT
sudo chroot folder qemu-aarch64-static /bin/bash
```

- Make the chroot.sh executable
```
chmod +x chroot.sh
```

Chroot into the new environment
```
sudo ./chroot.sh
```

- Update & Upgrade the chroot
```
apt-get update && apt-get upgrade 
```

- Helpful development tools & libraries to have in the chroot
```
apt-get install --no-install-recommends build-essential git wget libdrm-dev python3 python3-pip python3-setuptools python3-wheel ninja-build libopenal-dev premake4 autoconf libevdev-dev ffmpeg libboost-tools-dev magics++ libboost-thread-dev libboost-all-dev pkg-config zlib1g-dev libsdl-mixer1.2-dev libsdl1.2-dev libsdl-gfx1.2-dev libsdl2-mixer-dev clang cmake cmake-data libarchive13 libcurl4 libfreetype6-dev librhash0 libuv1 mercurial mercurial-common libgbm-dev libsdl-image1.2-dev
```

- Install custom SDL2 Libraries for better compatibility
```
apt-get remove --purge -y libsdl2-2.0-0 libsdl2-dev
rm -f /usr/lib/aarch64-linux-gnu/libSDL2.*
rm -f /usr/lib/aarch64-linux-gnu/libSDL2-2.0.so*
```

Build and install 2.26.2 from source:

```
wget https://github.com/libsdl-org/SDL/archive/refs/tags/release-2.26.2.tar.gz
tar xfv release-2.26.2.tar.gz
cd SDL-release-2.26.2/
./configure --prefix=/usr
make -j8
make install
/sbin/ldconfig
```

Hold the packages so a later `apt-get install`/`upgrade` can't reinstall them
out from under the custom build:

```
apt-mark hold libsdl2-2.0-0 libsdl2-dev
```

### 3. Cross-Compiling Tools for AARCH64

With the arm64 SDL2 library, etc.
