const key_maps = {
    "\\\"": "Unmapped",
    "a": "A",
    "b": "B",
    "c": "C",
    "d": "D",
    "e": "E",
    "f": "F",
    "g": "G",
    "h": "H",
    "i": "I",
    "j": "J",
    "k": "K",
    "l": "L",
    "m": "M",
    "n": "N",
    "o": "O",
    "p": "P",
    "q": "Q",
    "r": "R",
    "s": "S",
    "t": "T",
    "u": "U",
    "v": "V",
    "w": "W",
    "x": "X",
    "y": "Y",
    "z": "Z",
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "+": "+",
    "-": "-",
    "enter": "Enter",
    "space": "space",
    "home": "Home",
    "up": "Up",
    "down": "Down",
    "left": "Left",
    "right": "Right",
    "esc": "Escape",
    "mouse_left": "Mouse Left",
    "mouse_right": "Mouse Right",
    "mouse_movement_up": "Mouse Movement Up",
    "mouse_movement_down": "Mouse Movement Down",
    "mouse_movement_left": "Mouse Movement Left",
    "mouse_movement_right": "Mouse Movement Right",
    "end": "End",
    "shift": "Shift",
    "leftshift": "Left Shift",
    "rightshift": "Right shift",
    "ctrl": "Control",
    "leftctrl": "Left Control",
    "rightctrl": "Right Control",
    "alt": "Alt",
    "leftalt": "Left Alt",
    "rightalt": "Right Alt",
    "backspace": "Backspace",
    "pageup": "Page Up",
    "pagedown": "Page Down",
    "insert": "Insert",
    "delete": "Delete",
    "capslock": "Capslock",
    "tab": "Tab",
    "pause": "Pause",
    "menu": "Menu",
    "f1": "F1",
    "f2": "F2",
    "f3": "F3",
    "f3": "F4",
    "f5": "F5",
    "f6": "F6",
    "f7": "F7",
    "f8": "F8",
    "f9": "F9",
    "f10": "F10",
    "@": "@",
    "#": "#",
    "%": "%",
    "&": "&",
    "*": "*",
    "(": "(",
    ")": ")",
    "!": "!",
    "\"":"\"",
    "'": "'",
    ":": ":",
    ";": ";",
    "/": "/",
    "?": "?",
    ".": ".",
    ",": ",",
    "~": "~",
    "`": "`",
    "|": "|",
    "{": "{",
    "}": "}",
    "$": "$",
    "^": "^",
    "_": "_",
    "=": "=",
    "[": "[",
    "]": "]",
    "\\": "\\",
    "<": "<",
    ">": ">"
};

var back_button = document.getElementById("back_button");
var start_button = document.getElementById("start_button");
var a_button = document.getElementById("a_button");
var b_button = document.getElementById("b_button");
var x_button = document.getElementById("x_button");
var y_button = document.getElementById("y_button");
var l1_button = document.getElementById("l1_button");
var l2_button = document.getElementById("l2_button");
var r1_button = document.getElementById("r1_button");
var r2_button = document.getElementById("r2_button");
var dpad_up = document.getElementById("dpad_up");
var dpad_down = document.getElementById("dpad_down");
var dpad_left = document.getElementById("dpad_left");
var dpad_right = document.getElementById("dpad_right");
var lstick_up = document.getElementById("lstick_up");
var lstick_down = document.getElementById("lstick_down");
var lstick_left = document.getElementById("lstick_left");
var lstick_right = document.getElementById("lstick_right");
var rstick_up = document.getElementById("rstick_up");
var rstick_down = document.getElementById("rstick_down");
var rstick_left = document.getElementById("rstick_left");
var rstick_right = document.getElementById("rstick_right");

Object.keys(key_maps).forEach(function (key) {
    var back_button_opt = document.createElement('option');
    back_button_opt.value = key;
    back_button_opt.innerHTML = key_maps[key];
    back_button.appendChild(back_button_opt);

    var start_button_opt = document.createElement('option');
    start_button_opt.value = key;
    start_button_opt.innerHTML = key_maps[key];
    start_button.appendChild(start_button_opt);

    var a_button_opt = document.createElement('option');
    a_button_opt.value = key;
    a_button_opt.innerHTML = key_maps[key];
    a_button.appendChild(a_button_opt);

    var b_button_opt = document.createElement('option');
    b_button_opt.value = key;
    b_button_opt.innerHTML = key_maps[key];
    b_button.appendChild(b_button_opt);

    var x_button_opt = document.createElement('option');
    x_button_opt.value = key;
    x_button_opt.innerHTML = key_maps[key];
    x_button.appendChild(x_button_opt);

    var y_button_opt = document.createElement('option');
    y_button_opt.value = key;
    y_button_opt.innerHTML = key_maps[key];
    y_button.appendChild(y_button_opt);

    var l1_button_opt = document.createElement('option');
    l1_button_opt.value = key;
    l1_button_opt.innerHTML = key_maps[key];
    l1_button.appendChild(l1_button_opt);

    var l2_button_opt = document.createElement('option');
    l2_button_opt.value = key;
    l2_button_opt.innerHTML = key_maps[key];
    l2_button.appendChild(l2_button_opt);

    var r1_button_opt = document.createElement('option');
    r1_button_opt.value = key;
    r1_button_opt.innerHTML = key_maps[key];
    r1_button.appendChild(r1_button_opt);

    var r2_button_opt = document.createElement('option');
    r2_button_opt.value = key;
    r2_button_opt.innerHTML = key_maps[key];
    r2_button.appendChild(r2_button_opt);

    var dpad_up_opt = document.createElement('option');
    dpad_up_opt.value = key;
    dpad_up_opt.innerHTML = key_maps[key];
    dpad_up.appendChild(dpad_up_opt);

    var dpad_down_opt = document.createElement('option');
    dpad_down_opt.value = key;
    dpad_down_opt.innerHTML = key_maps[key];
    dpad_down.appendChild(dpad_down_opt);

    var dpad_left_opt = document.createElement('option');
    dpad_left_opt.value = key;
    dpad_left_opt.innerHTML = key_maps[key];
    dpad_left.appendChild(dpad_left_opt);

    var dpad_right_opt = document.createElement('option');
    dpad_right_opt.value = key;
    dpad_right_opt.innerHTML = key_maps[key];
    dpad_right.appendChild(dpad_right_opt);

    var lstick_up_opt = document.createElement('option');
    lstick_up_opt.value = key;
    lstick_up_opt.innerHTML = key_maps[key];
    lstick_up.appendChild(lstick_up_opt);

    var lstick_down_opt = document.createElement('option');
    lstick_down_opt.value = key;
    lstick_down_opt.innerHTML = key_maps[key];
    lstick_down.appendChild(lstick_down_opt);

    var lstick_left_opt = document.createElement('option');
    lstick_left_opt.value = key;
    lstick_left_opt.innerHTML = key_maps[key];
    lstick_left.appendChild(lstick_left_opt);

    var lstick_right_opt = document.createElement('option');
    lstick_right_opt.value = key;
    lstick_right_opt.innerHTML = key_maps[key];
    lstick_right.appendChild(lstick_right_opt);

    var rstick_up_opt = document.createElement('option');
    rstick_up_opt.value = key;
    rstick_up_opt.innerHTML = key_maps[key];
    rstick_up.appendChild(rstick_up_opt);

    var rstick_down_opt = document.createElement('option');
    rstick_down_opt.value = key;
    rstick_down_opt.innerHTML = key_maps[key];
    rstick_down.appendChild(rstick_down_opt);

    var rstick_left_opt = document.createElement('option');
    rstick_left_opt.value = key;
    rstick_left_opt.innerHTML = key_maps[key];
    rstick_left.appendChild(rstick_left_opt);

    var rstick_right_opt = document.createElement('option');
    rstick_right_opt.value = key;
    rstick_right_opt.innerHTML = key_maps[key];
    rstick_right.appendChild(rstick_right_opt);
});

back_button.value = "enter";
start_button.value = "esc";
a_button.value = "enter";
b_button.value = "enter";
x_button.value = "enter";
y_button.value = "enter";
l1_button.value = "\\\"";
l2_button.value = "\\\"";
r1_button.value = "\\\"";
r2_button.value = "\\\"";
dpad_up.value = "up";
dpad_down.value = "down";
dpad_left.value = "left";
dpad_right.value = "right"
lstick_up.value = "up";
lstick_down.value = "down";
lstick_left.value = "left";
lstick_right.value = "right";
rstick_up.value = "\\\"";
rstick_down.value = "\\\"";
rstick_left.value = "\\\"";
rstick_right.value = "\\\"";

function readContent() {
    var content = "";
    content = content + "back = " + document.getElementById("back_button").value + "\n";
    content = content + "start = " + document.getElementById("start_button").value + "\n";
    content = content + "\n";
    content = content + "a = " + document.getElementById("a_button").value + "\n";
    content = content + "b = " + document.getElementById("b_button").value + "\n";
    content = content + "x = " + document.getElementById("x_button").value + "\n";
    content = content + "y = " + document.getElementById("y_button").value + "\n";
    content = content + "\n";
    content = content + "l1 = " + document.getElementById("l1_button").value + "\n";
    content = content + "l2 = " + document.getElementById("l2_button").value + "\n";
    content = content + "\n";
    content = content + "r1 = " + document.getElementById("r1_button").value + "\n";
    content = content + "r2 = " + document.getElementById("r2_button").value + "\n";
    content = content + "\n";
    content = content + "up = " + document.getElementById("dpad_up").value + "\n";
    content = content + "down = " + document.getElementById("dpad_down").value + "\n";
    content = content + "left = " + document.getElementById("dpad_left").value + "\n";
    content = content + "right = " + document.getElementById("dpad_right").value + "\n";
    content = content + "\n";
    content = content + "left_analog_up = " + document.getElementById("lstick_up").value + "\n";
    content = content + "left_analog_down = " + document.getElementById("lstick_down").value + "\n";
    content = content + "left_analog_left = " + document.getElementById("lstick_left").value + "\n";
    content = content + "left_analog_right = " + document.getElementById("lstick_right").value + "\n";
    content = content + "\n";
    content = content + "right_analog_up = " + document.getElementById("rstick_up").value + "\n";
    content = content + "right_analog_down = " + document.getElementById("rstick_down").value + "\n";
    content = content + "right_analog_left = " + document.getElementById("rstick_left").value + "\n";
    content = content + "right_analog_right = " + document.getElementById("rstick_right").value + "\n";
    document.getElementById("gptk").textContent = content;

}