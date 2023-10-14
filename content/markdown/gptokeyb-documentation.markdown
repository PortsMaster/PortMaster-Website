# gptokeyb

Gamepad to Keyboard/mouse/xbox360(gamepad) emulator

Based on code by: [Kris Henriksen](https://github.com/krishenriksen/AnberPorts/tree/master/AnberPorts-Joystick) and fake Xbox code from: https://github.com/Emanem/js2xbox   
Modified to use SDL2 by: [Nikolai Wuttke](https://github.com/lethal-guitar) & [Shanti Gilbert](https://github.com/shantigilbert) for https://github.com/EmuELEC/EmuELEC
Interactive text entry added by [Robin Duxfield](https://github.com/romadu)

List of keycode values start here: 

## Build

    mkdir build
    cd build
    cmake ..
    cmake --build .
    strip gptokeyb

## Use
gptokeyb provides a kill switch for an application and mapping of gamepad buttons to keys and/or mouse. It also provides an xbox360-compatible controller mode.

### Environment Variable
`SDL_GAMECONTROLLERCONFIG_FILE` must be set so the gamepad buttons are properly assigned within gptokeyb, e.g. `SDL_GAMECONTROLLERCONFIG_FILE="./gamecontrollerdb.txt"`
`SDL_GAMECONTROLLERCONFIG_FILE` is automatically set in Emuelec

`export HOTKEY` sets the button used as hotkey. `BACK` button is automatically selected as hotkey, unless overridden by `HOTKEY` environment variable

`export TEXTINPUT="my name"` assigns text as preset for input so that `my name` is automatically entered, once triggered

`export PCKILLMODE="Y"` indicates that `ALT+F4` should be sent to close the app before kill mode is processed, which can be used on Linux pcs

### Command Line Options
`xbox360` selects xbox360 joystick mode

`textinput` select interactive text input mode (see below)

`-c <config_file_path_and_name.gptk>` specifies button mapping for keyboard and mouse functions, e.g. `-c "./app.gptk"`

`-c` as the **last** of the command line options specifies that the default button mapping file should be used, which is `/emuelec/configs/gptokeyb/default.gptk`

`-1 <application name>` or

`-k <application name>` provides the name of the application that will be closed by pressing **start** and **select** together

`-sudokill` indicates that `sudo kill -9 <application name>` will be used to close the application instead of `killall <application name>`

### Keyboard Mapping Options
The config file that specifies button mapping for keyboard and mouse functions takes the form of `%s = %s` which is `gamepad button` = `keyboard key`. Any comment lines beginning with `#` are ignored. Deadzone values are used for analog sticks and triggers, and may be device specific. `mouse_scale` affects the speed of mouse movement, with a larger value causing slower movement. `mouse_scale = 8192` generally works well for RK3326 devices. `gamepad button = \"` can be used to unassign a button.

The `keyboard key` values must be in lowercase and simple text strings are translated into key codes, for example `enter` means `KEY_ENTER`

Default mappings are:
```back = esc
start = enter
guide = enter

a = x
b = z
x = c
y = a

l1 = rightshift
l2 = home
l3 = mouse_right

r1 = leftshift
r2 = end
r3 = mouse_left

up = up
down = down
left = left
right = right

left_analog_up = w
left_analog_down = s
left_analog_left = a
left_analog_right = d

right_analog_up = end
right_analog_down = home
right_analog_left = left
right_analog_right = right

# Old deadzone code
deadzone_y = 2100
deadzone_x = 1900
mouse_scale = 512
mouse_delay = 16

# New deadzone code, this will overwrite the above deadzone code behaviour
# Choices of: axial, radial, scaled_radial, sloped_axial, sloped_scaled_axial, hybrid
deadzone_mode = scaled_radial
deadzone = 2000
deadzone_scale = 8
deadzone_delay = 16 ## An alias for mouse delay
```

#### Mouse slow

You can additionally slow the cursors speed temporarily by defining a button as `mouse_slow`. The rate at which is slows is controlled by `mouse_slow_scale`.

```
l1 = mouse_slow

mouse_slow_scale = 50 # 50%
```

The scale is proportional, so 75 will run the mouse at 75% of the mouse movement. So for example 7 becomes 5 with `mouse_slow_scale = 75`.

#### Mouse control via Analog stick

The mouse can be controlled via the analog sticks, either the left or the right if the device has one.

```
left_analog_up = mouse_movement_up
# the rest of these do nothing:
left_analog_down = mouse_movement_down
left_analog_left = mouse_movement_left
left_analog_right = mouse_movement_right

```

You can only have the left or right analog stick set as mouse movement at one time. If both are set, it will default to the left stick.

You can control the behaviour of the analog stick and the deadzones, we have several different deadzone scaling modes which we used the implementation of from here: https://github.com/Minimuino/thumbstick-deadzones

The variable `deadzone` is the minimum amount the stick needs to move before it registers, `deadzone_scale` is the amount the mouse will move at the sticks maximum. `deadzone_delay` / `mouse_delay` is the delay between moving the mouse measured in milliseconds.

```
# Choices of: axial, radial, scaled_radial, sloped_axial, sloped_scaled_axial, hybrid
deadzone_mode = scaled_radial
deadzone = 2000
deadzone_scale = 8
deadzone_delay = 16 ## An alias for mouse delay
```

#### Dpad as mouse control

You can control the mouse with the dpad, keeping with the normal configuration code, and the mouse movement rate is adjusted by setting `dpad_mouse_step`. The above `mouse_slow` keybinding works in conjunction with the mouse control as dpad, and you can still control the mouse via an analog stick.

```
up = mouse_movement_up

dpad_mouse_step = 7
```

**Note:** Enabling mouse control via dpad will disable all keybindings on the dpad.

#### Hotkey + Button for additional Key Assignments
An additional 8 keys can be assigned through Hotkey combinations for `a`, `b`, `x`, `y`, `l1`, `l2`, `r1`, `r2` buttons. Hotkey+button assignments are specified by adding `_hk` for the appropriate button (see default mappings below). The keys can use the same `Alt`, `Ctrl` or `Shift` modifiers by including a separate line that indicates `add_alt`, `add_ctrl` or `add_shift` respectively. 

The following example assigns `ALT+F4` to the combination of `hotkey` plus `A` button.
```
a_hk = f4
a_hk = add_alt
```

Default mappings are:
```
a_hk = enter
b_hk = esc
x_hk = c
y_hk = a
l1_hk = esc
l2_hk = home
r1_hk = enter
r2_hk = end
```

#### Key Modifiers
Sometimes key presses require a combination of `Alt`, `Ctrl` or `Shift` plus the key. These combinations can be specified by adding a separate line that indicates `add_alt`, `add_ctrl` or `add_shift` respectively. Modified keys can '''not''' be repeated at present. 

The following example assigns `CTRL+X` to the `A` button.
```
a = x
a = add_ctrl
```

#### Key Repeat
A simple keyboard key repeat function has been added that emulates automatic repeat of a keyboard key, once it has been held for at least an initial `delay`, at a regular `interval`. Key repeat works for one key at a time only (the first key that is pressed and held is repeated, and holding another key will not cause that to repeat, unless the first key is released). Key repeat has not been set up to work for analog triggers (L2/R2) at the moment.

The default delay and interval are based on SDL1.2 standard and can be adjusted with `repeat_delay = ` and `repeat_interval = `
```SDL_DEFAULT_REPEAT_DELAY 500
SDL_DEFAULT_REPEAT_INTERVAL 30
```

Key repeat is configured by adding `gamepad_button = repeat` as a separate line, in addition to the line `gamepad_button = keyboard key`. The following assigns arrow keys with key repeat to the gamepad d-pad and left analog stick.
```

up = up
up = repeat
down = down
down = repeat
left = left
left = repeat
right = right
right = repeat
left_analog_up = up
left_analog_up = repeat
left_analog_down = down
left_analog_down = repeat
left_analog_left = left
left_analog_left = repeat
left_analog_right = right
left_analog_right = repeat
```

### Text Entry Options
Text entry is possible, either by sending a preset (e.g. to enter your name to begin a game) or via an interactive input mode that's similar to entry of initials for a high score table 

Text entry options are enabled by environment variable settings
```
export TEXTINPUTPRESET="My Name"         # defines preset text to insert
export TEXTINPUTINTERACTIVE="Y"        # enables interactive text input mode
export TEXTINPUTNOAUTOCAPITALS="Y"     # disables automatic capitalisation of first letter of words in interactive text input mode
export TEXTINPUTADDEXTRASYMBOLS="Y"    # enables additional symbols for interactive text input
```

Interactive input mode is also enabled by command line option `"textinput"`

#### Preset Text Input
Text Entry preset mode is enabled by `TEXTINPUTPRESET` environment variable whereby a name preset can be easily entered whenever a game displays a text prompt. When Text Entry is triggered with `START+D-PAD LEFT`, the preset text is entered as a series of key strokes.

Text Entry preset mode also assigns `START+A` to send `ENTER`.

CONTROLS
`START+D-PAD LEFT` to send preset
`START+D-PAD RIGHT` to send `ENTER`

#### Interactive Text Input
Interactive Text Entry mode is enabled by launching GPtoKEYB with command line option `"textinput"` or by environment variable `TEXTINPUTINTERACTIVE="Y"` , and is triggered with `START+D-PAD DOWN`. Once activated, Interactive Text Entry mode works similarly to entering initials for game highscores, with `D-PAD UP/DOWN` switching between letters for the currently selected character, `D-PAD RIGHT` moving to next character, `D-PAD LEFT` deleting and moving back one character, `SELECT/HOTKEY` cancelling interactive text entry, and `START` to confirm and exit interactive text entry. `A` sends `ENTER KEY` in interactive text entry mode and exits interactive text entry.

##### Interactive Input Mode Controls
```
START+D-PAD DOWN to activate
once activated
D-PAD UP = previous letter
D-PAD DOWN = next letter
D-PAD RIGHT = next character
D-PAD LEFT = delete and move back one character
L1 = jump back 13 letters for current character
R1 = jump forward 13 letters for current character
A = send ENTER key and exit mode
SELECT/HOTKEY = cancel and exit mode (deletes all characters)
START = confirm and exit mode (also sends ENTER key)
```

##### Capitals
By default Interactive Text Entry mode will start with `A` as the first letter and immediately after a space, and `a` otherwise, unless environment variable `TEXTINPUTNOAUTOCAPITALS="Y"` is set, whereby all letters will start as `a`.

##### Symbols
By default Interactive Text Entry mode includes only a limited number of symbols "[space] . , - _ ( )", and a full set of symbols is included with environment variable `TEXTINPUTADDEXTRASYMBOLS="Y"`.

##### Exiting mode
Interactive Text Entry relies on the game providing a text prompt and sends key strokes to add and change characters, so it is only useful in these situations. Interactive Text Entry is automatically exited when either `SELECT`, `HOTKEY`, `START` or `A` are pressed, to minimise issues by accidentally triggering this mode.
