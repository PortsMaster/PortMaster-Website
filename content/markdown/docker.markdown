# Using Docker with PortMaster.

The docker file and supporting images are aimed at helping to support compiling ports to use with Portmaster as per the [PM Build Guide](https://portmaster.games/build-environments.html) The image contains all the recommended tools and libararies in the build environment guide.

## How to use the image

### 64-bit ARM

Download the prebuilt image and run the Docker container:

```bash
docker pull --platform=linux/arm64 ghcr.io/monkeyx-net/portmaster-build-templates/portmaster-builder:aarch64-latest
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
docker run -it --name builder_aarch64  -v "$(pwd)":/workspace --platform=linux/arm64 ghcr.io/monkeyx-net/portmaster-build-templates/portmaster-builder:aarch64-latest
```

### 64-bit X86_64

Download the prebuilt image and run the Docker container:

```bash
docker pull --platform=linux/arm64 ghcr.io/monkeyx-net/portmaster-build-templates/portmaster-builder:x86_64-latest
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
docker run -it --name builder_aarch64  -v "$(pwd)":/workspace --platform=linux/arm64 ghcr.io/monkeyx-net/portmaster-build-templates/portmaster-builder:x86_64-latest
```

## Copy files from Container to Host

Ensure the relevant docker container is running 

```bash
docker container start builder32
docker container start builder64
docker container start builderx86_64
```
The -v argument opens the Docker workspace folder in the folder you run docker from. Which means that workspace folder is on the host machine.
