# Using Docker with PortMaster.

The docker file and supporting images are aimed at helping to support compiling ports to use with Portmaster as per the [PM Build Guide](https://portmaster.games/build-environments.html)

## How to use the image

### 32-bit ARM

Download the prebuilt image and run the Docker container using:

```bash
docker pull monkeyx/retro_builder:arm32
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
docker run --privileged -it --platform=linux/armhf --name builder32 monkeyx/retro_builder:arm32 bash
```

### 64-bit ARM

Download the prebuilt image and run the Docker container using:

```bash
docker pull monkeyx/retro_builder:arm64
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
docker run --privileged -it --platform=linux/arm64 --name builder64 monkeyx/retro_builder:arm64 bash
```

### 64-bit X86_64

Download the prebuilt image and run the Docker container using:

```bash
docker pull monkeyx/retro_builder:x86_64
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
docker run --privileged -it --platform=linux/amd64 --name builderx86_64 monkeyx/retro_builder:x86_64 bash
```

## Copy files from Container to Host

Ensure the relevant docker container is running 

```bash
docker container start builder32
docker container start builder64
docker container start builderx86_64
```
Copy the files

docker cp <containerId>:/file/path/within/container /host/path/target
docker cp <Name>:/file/path/within/container /host/path/target

Example
```bash
docker cp builder32:/root/file .
```

## How to build the image

### 32-bit ARM

Execute the following on your machine:

```bash
git clone https://github.com/monkeyx-net/retro_builder_docker.git
cd retro_builder_docker
docker build . --platform linux/arm/v7 -t monkeyx/retro_builder:arm32
```

### 64-bit ARM

Execute the following on your machine:

```bash
git clone https://github.com/monkeyx-net/retro_builder_docker.git
cd retro_builder_docker
docker build . --platform linux/arm64 -t monkeyx/retro_builder:arm64
```

### 64-bit x86_64

Execute the following on your machine:

```bash
git clone https://github.com/monkeyx-net/retro_builder_docker.git
cd retro_builder_docker
docker build . --platform linux/amd64 -t monkeyx/retro_builder:x86_64
```
