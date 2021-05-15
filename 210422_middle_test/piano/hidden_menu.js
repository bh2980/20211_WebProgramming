var animation = [];
animation[0] = 'Glow';
animation[1] = 'None'
animation[2] = 'Circle';

j = 0;

function changeEffect() {
    document.getElementById('effect_subscrip').innerHTML = animation[j];

    document.documentElement.style.setProperty('--animation_name', animation[j]);
    j++;

    if (j == animation.length) j = 0;

    light(72);
}

k = 0;

function changeColor() {
    k++;
    if (k == color_list.length) k = 0;
    document.getElementById('color_subscrip').innerHTML = color_list_for_sub[k];
}

//menu check 확인 후 text 색 변경 + 레이아웃 불러오기
function check(id) {
    var checkid = document.getElementById(id);
    var main = document.getElementById('main_lay');
    var arrow = document.getElementById('arrow_lay');
    var numpad = document.getElementById('numpad_lay');

    if ($(checkid).prop("checked")) {
        document.getElementById(id + 'label').style.opacity = 0.5;
        //checkid 비활성화

        if (id == 'acarrow') {
            //arrow를 비활성화 했다면
            arrow.style.display = 'none';
            layout[1] = 0;
        } else if (id == 'acnumpad') {
            //numpad 비활성화 했다면
            numpad.style.display = 'none';
            layout[2] = 0;
        } else {
            main.style.display = 'none';
            layout[0] = 0;
        }
    } else {
        document.getElementById(id + 'label').style.opacity = 1;
        //checkid 활성화

        if (id == 'acarrow') {
            //arrow를 비활성화 했다면
            arrow.style.display = 'block';
            layout[1] = 1;
        } else if (id == 'acnumpad') {
            //numpad 비활성화 했다면
            numpad.style.display = 'block';
            layout[2] = 1;
        } else {
            main.style.display = 'block';
            layout[0] = 1;
        }
    }

    var sum = 1 * layout[0] + 2 * layout[1] + 4 * layout[2];
    console.log(sum);
    switch (sum) {
        case 3:
            changelayout(3);
            break;
        case 5:
            changelayout(3);
            break;
        case 6:
            changelayout(2);
            break;
        case 7:
            changelayout(0);
            break;
        default:
            changelayout(1);
    }
}

//layout class 변경 함수
function changelayout(layout_num) {
    console.log('layout : ' + layout_num);
    var keyboard = document.getElementById('keyboard');

    switch (layout_num) {
        case 0: //all
            keyboard.classList.remove('keyboard_layout_all');
            keyboard.classList.remove('keyboard_layout_one');
            keyboard.classList.remove('keyboard_layout_main_other');
            keyboard.classList.remove('keyboard_layout_others');
            keyboard.classList.add('keyboard_layout_all');

            break;
        case 1: //one
            keyboard.classList.remove('keyboard_layout_all');
            keyboard.classList.remove('keyboard_layout_one');
            keyboard.classList.remove('keyboard_layout_main_other');
            keyboard.classList.remove('keyboard_layout_others');

            keyboard.classList.add('keyboard_layout_one');
            break;
        case 2: //others
            keyboard.classList.remove('keyboard_layout_all');
            keyboard.classList.remove('keyboard_layout_one');
            keyboard.classList.remove('keyboard_layout_main_other');
            keyboard.classList.remove('keyboard_layout_others');

            keyboard.classList.add('keyboard_layout_others');
            break;
        case 3: //main_others
            keyboard.classList.remove('keyboard_layout_all');
            keyboard.classList.remove('keyboard_layout_one');
            keyboard.classList.remove('keyboard_layout_main_other');
            keyboard.classList.remove('keyboard_layout_others');

            keyboard.classList.add('keyboard_layout_main_other');
            break;
    }
}

menuactive = 0;

function menu_click() {
    var menu_btn = document.getElementById('menu_button');
    var devinfo = document.getElementById('devinfo');
    var hidden = document.getElementById('hidden_menu');

    if (!menuactive) {
        menu_btn.style.transform = 'scale(7)';
        devinfo.style.backgroundColor = color_list[k][Math.floor(Math.random() * color_list[k].length)];
        devinfo.style.transform = 'scale(6)';
        devinfo.style.opacity = 0.9;
        menuactive++;
        setTimeout(function() {
            hidden.style.display = 'block';
        }, 100);
    } else {
        menu_btn.style.transform = 'scale(1)';
        devinfo.style.transform = 'scale(1)';
        setTimeout(function() {
            hidden.style.display = 'none';
        }, 50);
        menuactive--;
    }
}