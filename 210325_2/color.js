//코드를 파일로 재사용

var Body = {
    setColor: function(color){
        //jQuery
        $('body').css('color', color);
        //document.querySelector('body').style.color = color;
    },

    setBackgroundColor: function(color){
        $('body').css('backgroundColor', color);

        //document.querySelector('body').style.backgroundColor = color;
    }
}


var Links = {
    setColor: function(color){
        //jQuery $
        $('a').css('color', color);
        //모든 a태그의 css.color를 변수 color로 설정하겠다.

        //Crtl + / 모두 주석

        // var alist = document.querySelectorAll('a');

        // var i=0;

        // while(i<alist.length){
        //     alist[i].style.color = color;
        //     i++;
        // }
    }
}

/*
함수로 만든 코드

function setLinkColor(color){
    var alist = document.querySelectorAll('a');

    var i=0;

    while(i<alist.length){
        alist[i].style.color = color;
        i++;
    }
}
*/

function nightDayHandler(self){
    //자바 스크립트에서 변수 작성

    if(self.value == 'night'){
        Body.setColor('white');
        Body.setBackgroundColor('black');
        self.value = 'day';

        //setLinkColor('pink');
        Links.setColor('pink');
    }
    else{
        Body.setColor('black');
        Body.setBackgroundColor('white');
        self.value = 'night'

        //setLinkColor('blue');
        Links.setColor('blue');
    }
}