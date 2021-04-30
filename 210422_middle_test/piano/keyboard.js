var Rainbow = [];

Rainbow[0] = 'rgb(249,56,34)';
Rainbow[1] = 'rgb(251,110,69)';
Rainbow[2] = 'rgb(255,232,0)';
Rainbow[3] = 'rgb(10,255,71)';
Rainbow[4] = 'rgb(0,177,210)';
Rainbow[5] = 'rgb(0,108,169)';
Rainbow[6] = 'rgb(119,88, 179)';

var ChocoTree = [];

ChocoTree[0] = 'rgb(78, 13, 2)';
ChocoTree[1] = 'rgb(97, 15, 6)';
ChocoTree[2] = 'rgb(108, 58, 2)';
ChocoTree[3] = 'rgb(154, 144, 34)';
ChocoTree[4] = 'rgb(174, 189, 0)';

var Mint = [];

Mint[0] = 'rgb(89, 226, 255)';
Mint[1] = 'rgb(138, 224, 243)';
Mint[2] = 'rgb(205, 251, 255)';
Mint[3] = 'rgb(184, 249, 177)';
Mint[4] = 'rgb(41, 119, 159)';
Mint[5] = 'rgb(21, 61, 82)';

var color_list = [];

color_list[0] = Rainbow;
color_list[1] = ChocoTree;
color_list[2] = Mint;

var color_list_for_sub = [];

color_list_for_sub[0] = 'Rainbow';
color_list_for_sub[1] = 'ChocoTree';
color_list_for_sub[2] = 'Mint';

$(document).keydown(function(event) {
    changeBackground(event.keyCode, "white");
    var audio = new Audio('/octave/' + event.keyCode + '.ogg');

    audio.play();

    light(event.keyCode);
});
$(document).keyup(function(event) {
    changeBackground(event.keyCode, "none");
});

function changeBackground(id, color) {
    document.getElementById(id).style.background = color;
}

function light(keyCode) {
    var key = document.getElementById(keyCode);

    const newDiv = document.createElement('div');

    newDiv.style.position = 'absolute';

    document.body.appendChild(newDiv);

    var y = $(key).offset().top;
    var x = $(key).offset().left;
    var width = $(key).width() / 2;
    var height = $(key).height() / 2;

    x += width;
    y += height;

    newDiv.style.top = y + 'px';
    newDiv.style.left = x + 'px';
    newDiv.style.zIndex = -999;

    newDiv.classList.remove('effect');

    void newDiv.offsetWidth;

    document.documentElement.style.setProperty('--effect_color', color_list[k][Math.floor(Math.random() * color_list[k].length)]);

    newDiv.classList.add("effect");

    setTimeout(function() {
        newDiv.remove();
    }, 700);
}