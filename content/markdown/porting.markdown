# Development and how to contribute

## What are Ports?

We have different types of games we support:

- Open Source Games from Repos like Github where we compile and package the game for PortMaster
- Open Source Engines made from scratch that work with original game assets
- Game Engines like GameMaker studio / Godot / Love2d that have compatible runners that need the original gamedata
- Linux Userspace x86 Emulator (Box86) that translate X86 Linux Games to arm.
- Linux Userspace x64 Emulators (Box64) that translate x64 Linux games to aarch64

Mind for 3/4/5 a LOT of hacking and tweaking might be needed.

## How do we compile our games for PortMaster?

Since PortMaster is platform independent and delivers their own dependencies we don't rely on the build mechanism of the CFWs out there.
Various Instructions for Build Environments can be found here: https://portmaster.games/build-environments.html

Once you have your software compiled it is recommeded you test your game directly on your device via ssh.
For testing you can stop Emulationstation to not clash with your Ports

AmberELEC, uOS, Jelos:  `systemctl stop emustation`
ArkOS				 :  `systemctl stop emulationstation`

For packaging use the Packaging Guide https://portmaster.games/packaging.html and of course other Ports as a reference.


## Restrictions & Tools:

The Chipsets we're working with unfortunately have some restrictions in terms of features.
So we can't just use any game, compile it and run it.

Most CFWs that support PortMaster don't have full OpenGL or Display Drivers: So no openGL and no x11 / weston.

Generally speaking Anbernic devices running a Rockchip SoC for example use the old 3.x Linux kernel with proprietary ARM drivers for Mali and not Panfrost. So only OpenGL ES is available for Linux.

There is a translation layer called Gl4es which has a partial support of openGL up to OpenGL 2.x

Tools we use:
- [OpenGL ES 2 support](#)
- [OpenGL 2.x through GL4ES](https://github.com/ptitSeb/gl4es)
- [Box86 (Linux Userspace x86 Emulator, targeted at ARM Linux devices)](https://github.com/ptitSeb/box86)
- [Box64 (Linux Userspace x86_64 Emulator, targeted at ARM64 Linux devices)](https://github.com/ptitSeb/box64)
- [gptokeyb for keyboard/mouse/joystick mapping using a control file](https://github.com/PortsMaster/gptokeyb)
- [No Vulkan, No X11, No display manager at all so KMS/DRM or output via SDL2 it is](#)
- [SDL1.2 through sdl1.2compat](https://github.com/libsdl-org/sdl12-compat)
- [Gamemaker Games Runner Research](https://github.com/JohnnyonFlame/yyg_fix/blob/master/RESEARCH.md)
- [Godot Games via FRT 2](https://github.com/efornara/frt/tree/2.0)
- [Love2d] Games via Love2d Engine (https://github.com/Cebion/love2d_aarch64)

## How to Package

[Packaging Instructions](https://github.com/christianhaitian/PortMaster/blob/main/docs/packaging.md)
For packaging use the Packaging Guide https://portmaster.games/packaging.html and of course other Ports as a reference.


## GL4ES

If a game uses OpenGL you have the ability to use GL4ES.

GL4ES is a library that provides OpenGL 2.x functionality for GLES2.0 accelerated Hardware (and of course also support OpenGL 1.5 function, sometimes better than when using GLES 1.1 backend) 
There is also support for GLES 1.1 Hardware, emulating OpenGL 1.5, and some OpenGL 2.x+ extensions.

Most function of OpenGL up to 1.5 are supported, with some notable exceptions:

Reading of Depth or Stencil buffer will not work
GL_FEEDBACK mode is not implemented
No Accum emulation
Some known general limitations:

GL_SELECT as some limitation in its implementation (for example, current Depth buffer or bounded texture are not taken into account, also custom vertex shader will not work here)
NPOT texture are supported, but not with GL_REPEAT / GL_MIRRORED, only GL_CLAMP will work properly (unless the GLES Hardware support NPOT)
Multiple Color attachment on Framebuffer are not supported
OcclusionQuery is implemented, but with a 0 bits precision
Probably many other things

If you want to use gl4es make sure to drop the `libGL.so.1` library into the libs folder in your port.

When using GL4ES you must also set the environment variables so that gl4es can work properly.
For our devices these are almost always:

```
export LIBGL_ES=2
export LIBGL_GL=21
export LIBGL_FB=4
```

To Compile GL4ES: 

```
git clone https://github.com/ptitSeb/gl4es.git
cd gl4es
cmake .. -DNOX11=ON -DGLX_STUBS=ON -DEGL_WRAPPER=ON -DGBM=ON
make
```
## QT5

You have the ability to use QT5 for our handheld devices by using the official eglfs plugin.
We provide QT5 libraries as a runtime since they are +150mb big.

To troubleshoot QT5 games you can use `export QT_DEBUG_PLUGINS=1`to get more detailed error output.

Following exports are needed to run the game
`QML2_IMPORT_PATH` showing to qt5/qml 
`QT_QPA_PLATFORM=eglfs` choosing the eglfs plugin for egl gles output
`QT_PLUGIN_PATH`showing to qt5/plugins. If you game uses a nonstandard plugin library you need to configure it on your buildhost with qmake and then copy the libraries over
`LD_LIBRARY_PATH` to qt5/libs 

To compile QT5 for aarch64
```
git clone git://code.qt.io/qt/qt5.git
cd qt5/
git checkout 5.15
./init-repository --module-subset=default
./configure -release -opengl es2 -eglfs -no-xcb -gbm -kms -shared -opensource -confirm-license -make libs -v
make
make install
```

For more information about EGLFS and Aarch64 see this article
https://wiki.qt.io/RaspberryPi2EGLFS

## QT6

You have the ability to use QT6 for our handheld devices by using the official eglfs plugin.
We provide QT6 libraries as a runtime since they are +150mb big.

To troubleshoot QT6 games you can use `export QT_DEBUG_PLUGINS=1`to get more detailed error output.

Following exports are needed to run the game
`QML2_IMPORT_PATH` showing to qt6/qml 
`QT_QPA_PLATFORM=eglfs` choosing the eglfs plugin for egl gles output
`QT_PLUGIN_PATH`showing to qt6/plugins. If you game uses a nonstandard plugin library you need to configure it on your buildhost with qmake and then copy the libraries over
`LD_LIBRARY_PATH` to qt6/libs 

To compile QT6 for aarch64
```
git clone git://code.qt.io/qt/qt5.git qt6
cd qt6/
git checkout 6.6
./init-repository --module-subset=default
mkdir qt6-build && cd qt6-build
./cmake with following variables
-DFEATURE_accessibility_atspi_bridge: BOOL=OFF -DFEATURE_androiddeployqt: BOOL=OFF -DFEATURE_egl_x11: BOOL=OFF -DFEATURE_eglfs_x11: BOOL=OFF -DFEATURE_opengl_desktop: BOOL=OFF
-DFEATURE_opengles2: BOOL=ON -DFEATURE_opengles3: BOOL=ON -DFEATURE_opengles31: BOOL=ON -DFEATURE_opengles32: BOOL=ON -DFEATURE_qt3d_vulkan: BOOL=OFF 
-DFEATURE_vkkhrdisplay: BOOL=OFF -DFEATURE_vulkan: BOOL=OFF -DFEATURE_wayland_vulkan_server_buffer: BOOL=OFF -DFEATURE_xcb_xlib: BOOL=OFF -DFEATURE_xkbcommon_x11: BOOL=OFF
make
make install
```

## GPTOKEYB

`gptokeyb` has the ability to act as a way to quit a game via start + select.
For this you call `gptokeyb` with the application name.

ie. `./gptokeyb "application"`

If you want to additionally set a custom config for example you can then set the `-c` switch to start `gptokeyb` in virtual keyboard mode.

ie `./gptokeyb "application" -c mykeymaps.gptk`

For the full GPTOKEYB Documentation https://portmaster.games/gptokeyb-documentation.html


## Java

AmberELEC / uOS / Jelos has JDK support already built in once you start a j2me game for the first time.
You can supply this also via Portmaster Runtimes
Note you also need a display backend for your java application. So just running a jar file without anything won't work.

As of yet we have no Port that uses these but in theory this could be interesting for LIBGDX

**Example**:

```
mkdir /storage/jdk
https://cdn.azul.com/zulu-embedded/bin/zulu11.48.21-ca-jdk11.0.11-linux_aarch64.tar.gz
tar xvfz zulu11.48.21-ca-jdk11.0.11-linux_aarch64.tar.gz
JAVA_HOME='/storage/jdk/zulu11.48.21-ca-jdk11.0.11-linux_aarch64'
export JAVA_HOME
PATH="$JAVA_HOME/bin:$PATH"
export PATH
/usr/bin/retroarch -L /tmp/cores/freej2me_libretro.so --config /storage/.config/retroarch/retroarch.cfg "/tmp/Doom RPG.jar"
```

## SDL 1.2 Compat

SDL 1.2 Compat is a translation library that translates SDL 1.2 calls to SDL 2 and works very well.
We have plenty of ports that work fantastic with it.

To compile:

```
git clone https://github.com/libsdl-org/sdl12-compat.git
mkdir build && cd build
cmake ..
make 
```

To use SDL 1.2 Compat you simply copy the resulting sdl 1.2 .so file into the ports libs folder.

The tool has some configuration options which may be of use in your port.

SDL12COMPAT_USE_GAME_CONTROLLERS: (checked during SDL_Init) Use SDL2's higher-level Game Controller API to expose joysticks instead of its lower-level joystick API. 
The benefit of this is that you can exert more control over arbitrary hardware (deadzones, button mapping, device name, etc), 
and button and axes layouts are consistent (what is physically located where an Xbox360's "A" button is will always be SDL 1.2 joystick button 0, "B" will be 1, etc). 
The downside is it might not expose all of a given piece of hardware's functionality, or simply not make sense in general...if you need to use a flight stick, for example,
 you should not use this hint. If there is no known game controller mapping for a joystick, and this hint is in use, it will not be listed as an availble device.
 
The Full Documentation can be found [here] https://github.com/libsdl-org/sdl12-compat
 

## Godot

Godot Games are played via a custom export template tailored to SBC devices without X11 based on KMS/DRM with SDL2 called FRT.
The FRT binaries are prebuilt for you and are already in the PortMaster Runtime Repository.

Limitations:
Also note that in my custom fork of FRT all joystick code is disabled because Godot preconfigures controls and SDL picks up these keys without any chance to remap them afterwards. See [https://github.com/Cebion/frt](https://github.com/Cebion/frt)

So all control is done via `gptokeyb`.


To build: (These are already present in the PortMaster Runtime Repo))

```
Download the godot editor version you need for the godot game.
You can find out the version by examining the .pck file with https://dmitriysalnikov.itch.io/godot-pck-explorer
wget https://downloads.tuxfamily.org/godotengine/3.5/godot-3.5-stable.tar.xz
tar xf godot-3.5-stable.tar.xz
cd godot-3.5-stable/platform
git clone https://github.com/Cebion/frt.git
cd ../
scons platform=frt tools=no target=release use_llvm=yes module_webm_enabled=no -j12
strip bin/godot.frt.opt.llvm
```


Then copy your binary to your game folder run it via:

Either a .PCK file:

```
./frt_100_332_arm64.bin --main-pack meteor.pck
```

Or via Folder:

```
/frt_3.2.3 --path godot-port-develop/
```

If you encounter an error like:

```
ERROR: Failed loading resource: res://gfx/UI.png. Make sure resources have been imported by opening the project in the editor at least once.
at: _load (core/io/resource_loader.cpp:271)
ERROR: res://scenes/gui.tscn:11 - Parse Error: [ext_resource] referenced nonexistent resource at: res://gfx/UI.png
```

Make sure the File is in the correct format.
For that import the project and reimport the file in the correct format.
For example sometimes a png file imported as a Texture causes problems and needs to be imported as an image.

Godot Editor -> Import Tab -> Filter for file in Filesystem -> Reimport As:


## LÖVE (Love2D)

Love2d games are playable trough the aarch64 Port of every major version of Love2D

To compile: 


### Löve 11.4

- Built using Ubuntu 20.04 LTS aarch64 chroot
```
wget https://github.com/love2d/love/releases/download/11.4/love-11.4-linux-src.tar.gz
tar xf love-11.4-linux-src.tar.gz
cd love-11.4/
./configure
make -j12
strip src/.libs/liblove-11.4.so
copy src/.libs/liblove-11.4.so device/libs
copy src/.libs/love device/
```

### Löve 0.10.2
- Built using Ubuntu 20.04 LTS aarch64 chroot
```
wget https://github.com/love2d/love/releases/download/0.10.2/love-0.10.2-linux-src.tar.gz
tar xf love-0.10.2-linux-src.tar.gz
cd love-0.10.2
./configure
make -j12
strip src/.libs/liblove.so.0
copy src/.libs/lliblove.so.0 device/libs
copy src/.libs/love device/
```

### Löve 0.9.2
- Built using Ubuntu 20.04 LTS aarch64 chroot
- Uses experimental love2d gles build
```
git clone https://github.com/Cebion/love_0.9.2_GLES.git
cd love_0.9.2_GLES
platform/unix/automagic
./configure
make CFLAGS="-Wno-format-overflow"
```

Requires the ENV variable LOVE_GRAPHICS_USE_OPENGLES=1 on launch

### Löve 0.8
- Built using Debian Stretch aarch64 chroot
- Needs boot.lua fixes to set fullscreen in the love binary before compiling
```
wget https://github.com/love2d/love/archive/refs/tags/0.8.0.tar.gz
tar xf 0.8.0.tar.gz
cd love_0.8.0
platform/unix/automagic
./configure
```
Edit src/scripts/boot.lua

Change:
```
		screen = {
			width = 800,
			height = 600,
			fullscreen = false,
			vsync = true,
			fsaa = 0,
		},
 ```
to 

```
		screen = {
			width = 640,
			height = 480,
			fullscreen = true,
			vsync = true,
			fsaa = 0,
		},
 ```
Afterwards 
```
cd src/scripts/
lua auto.lua boot
cd../../
make
```

### Löve 0.7.2
- Built using Debian Stretch aarch64 chroot
- Needs boot.lua fixes to set fullscreen in the love binary before compiling
```
wget https://github.com/love2d/love/archive/refs/tags/0.8.0.tar.gz
tar xf 0.8.0.tar.gz
cd love_0.8.0
platform/unix/automagic
./configure
```
Edit src/scripts/boot.lua

Change:
```
		screen = {
			width = 800,
			height = 600,
			fullscreen = false,
			vsync = true,
			fsaa = 0,
		},
 ```
to 

```
		screen = {
			width = 640,
			height = 480,
			fullscreen = true,
			vsync = true,
			fsaa = 0,
		},
 ```
Afterwards 
```
cd src/scripts/
lua auto.lua boot
cd../../
make
```

## Notes about missing cursor in KMS/DRM in Love
You can add a software cursor for that

KMS/DRM or FBDEV by default does not have a mouse cursor. 

Because of that we have to create a software cursor for each game. 
It's a simple process

Download a cursor 
example:
https://raw.githubusercontent.com/medeirosT/adwaita-2bit-cusors/main/left_ptr.png
  and place it in the game directory root.

Edit the main.lua 

1.  Edit the function love.load() and add
    -- Load your cursor image
    
``` cursorImage = love.graphics.newImage("left_ptr.png")```

 2. Hide the system cursor in the love.load() function: 
  
```love.mouse.setVisible(false) ```

3. Draw the custom cursor image in a new drawCursor function and call it at the end of the love.draw() function:

```
function drawCursor()
    local mouseX, mouseY = love.mouse.getPosition()
    love.graphics.draw(cursorImage, mouseX, mouseY)
end

function love.draw()
    -- Rest of the code

    -- Draw the custom cursor
    drawCursor()
end
```

4. Add cursor scaling to love.update()
 ```
 local xOffset = (love.graphics.getWidth() - simpleScale.getScale() * gw) / 2
  mx = (love.mouse.getX() - xOffset) / simpleScale.getScale()
  my = love.mouse.getY() / simpleScale.getScale()
```
 

## Box86

To compile: 

```
Coming soon 
```


## Box64

To compile:

```
Coming soon
```

## Mono

Coming Soon



## Problems you might encounter when compiling open source software:


### cannot guess build type:

```
wget 'http://git.savannah.gnu.org/gitweb/?p=config.git;a=blob_plain;f=config.guess;hb=HEAD' -O './config.guess' &&
wget 'http://git.savannah.gnu.org/gitweb/?p=config.git;a=blob_plain;f=config.sub;hb=HEAD' -O './config.sub'
```
