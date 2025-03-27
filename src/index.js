import './assets/scss/main.scss';
import './assets/fonts/lato/lato.scss';
import './assets/fonts/raleway/raleway.scss';
import html from "./index.html";


let $document = $(document),
    $jQuery = jQuery(document);

window.addEventListener('scroll', () => {
    const navMenu = document.getElementById('nav');
    if (window.innerWidth > 992) {
        if (window.pageYOffset > 100) {
            navMenu.classList.add('active');
        } else {
            navMenu.classList.remove('active');
        }
    }
});

const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');
const navDarkBg = document.getElementById('navDarkBg');
const navClose = document.getElementById('navClose');

burger.onclick = () => {
    navMenu.classList.add('active');
    navDarkBg.classList.add('active');
}
navClose.onclick = () => {
    navMenu.classList.remove('active');
    navDarkBg.classList.remove('active');
}
navDarkBg.onclick = () => {
    navMenu.classList.remove('active');
    navDarkBg.classList.remove('active');
}

const urlProtocol = window.location.protocol;
const urlHost = window.location.host;
const urlIndex = urlProtocol + '//' + urlHost + '/index.html';
const urlPlaceAnOrder = urlProtocol + '//' + urlHost + '/place-an-order.html';

let desktopAddressFile = window.location.pathname;
let desktopAddress = desktopAddressFile.substring(0, desktopAddressFile.lastIndexOf('/'));
let desktopAddressIndex = desktopAddressFile.substring(0, desktopAddressFile.lastIndexOf('/')) + '/index.html';
let desktopAddressPlaceAnOrder = desktopAddressFile.substring(0, desktopAddressFile.lastIndexOf('/')) + '/place-an-order.html';

if(
    urlIndex.indexOf(window.location.pathname) >= 0 || 
    urlPlaceAnOrder.indexOf(window.location.pathname) >= 0 || 
    desktopAddressIndex.indexOf(window.location.pathname) >= 0 || 
    desktopAddressPlaceAnOrder.indexOf(window.location.pathname) >= 0
) {
    const rangeWrap = document.getElementById('rangeWrap');
    const range = document.getElementById('range');
    const output = document.getElementById('output');
    const onRangeInput = () => {
        const value = range.value;
        output.innerText = value + '%';
        const min = range.min;
        const max = range.max;
        const valuePercent = `${100 - ((max - value) / (max - min) * 100)}`;
        rangeWrap.style.setProperty('--valuePercent', valuePercent + '%');
    };
    onRangeInput();
    range.addEventListener('input', onRangeInput);
}

const linkPage = document.querySelectorAll('.nav__link');
const currentPage = window.location.href;
for (let i = 0; linkPage.length > i; i++) {
    if(currentPage == linkPage[i]) {
        linkPage[i].className = 'active';
    }
}

const currentYear = document.getElementById('currentYear');
currentYear.innerHTML = new Date().getFullYear();


$('#uploadedFile').change(function() {
    if ($(this).val() != '') $(this).prev().text('Выбрано файлов: ' + $(this)[0].files.length);
    else $(this).prev().text('Прикрепить файл');
});

// Задаем стиль селекту
$(".select").each(function () {
    const _this = $(this),
        selectOption = _this.find("option"),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(":selected"),
        duration = 250; // длительность анимации

    _this.hide();
    _this.wrap("<div class='select'></div>");
    $("<div>", {
        class: "select__new mainForm_required",
        text: _this.children("option:disabled").text()
    }).insertAfter(_this);

    const selectHead = _this.next(".select__new");
    $("<div>", {
        class: "select__newList"
    }).insertAfter(selectHead);

    const selectList = selectHead.next(".select__newList");
    for (let i = 1; i < selectOptionLength; i++) {
        $("<div>", {
            class: "select__newItem",
            html: $("<span>", {
                text: selectOption.eq(i).text()
            })
        })
            .attr("data-value", selectOption.eq(i).val())
            .appendTo(selectList);
    }

    const selectItem = selectList.find(".select__newItem");
    selectList.slideUp(0);
    selectHead.on("click", function () {
        if (!$(this).hasClass("on")) {
            $(this).addClass("on");
            selectList.slideDown(duration);

            selectItem.on("click", function () {
                let chooseItem = $(this).data("value");

                $("select").val(chooseItem).attr("selected", "selected");
                selectHead.text($(this).find("span").text());

                selectList.slideUp(duration);
                selectHead.removeClass("on");
            });

        } else {
            $(this).removeClass("on");
            selectList.slideUp(duration);
        }
    });
});


$jQuery.ready(function($) {
    let $modalWindowOfThanks = $('#modalWindowOfThanks'),
        $mainForm = $("form.mainForm");

    $document.bind('click touch', function(e){
        let $target = $(e.target);
        let $closest = $target.closest($modalWindowOfThanks);
        if($closest.length)return;
        $modalWindowOfThanks.removeClass('open');
    });
    $modalWindowOfThanks.find('.modalClose').bind('click touch', function(e){
        e.preventDefault();
        e.stopPropagation();
        $modalWindowOfThanks.removeClass('open');
        return false;
    });

    let $mainFormSelectEl = $('#mainForm [name=mainFormSelect]');
    $mainFormSelectEl.on('select', function() {
        $mainFormSelectEl.removeClass('errorValue');
    });
    let $emailEl = $('#mainForm [name=email]');
    $emailEl.on('input', function() {
        $emailEl.removeClass('errorValue');
    });
    let $nameEl = $('#mainForm [name=name]');
    $nameEl.on('input', function() {
        $nameEl.removeClass('errorValue');
    });
    let $rangeEl = $('#mainForm [name=range]');
    $rangeEl.on('input', function() {
        $rangeEl.removeClass('errorValue');
    });

    $mainForm.submit(function(e) {
        let base_url = window.location.origin,
        	myThis = $(this),
            field = [];
        e.preventDefault();
        e.stopPropagation();

        $modalWindowOfThanks.addClass('open');
        let $response = $modalWindowOfThanks.find('.responseText');
        $response.text('Не все поля заполнены');

        let formData = new FormData();

        //присоединяем наш файл
        jQuery.each($('#uploadedFile')[0].files, function(i, file) {
            formData.append('file_' + i, file);
        });

        //присоединяем остальные поля
        let mainFormSelect = $mainFormSelectEl.val();
        if(!mainFormSelect) {
            $mainFormSelectEl.addClass('errorValue');
        }
        let email = $emailEl.val();
        if(!email) {
            $emailEl.addClass('errorValue');
        }
        let name = $nameEl.val();
        if(!name) {
            $nameEl.addClass('errorValue');
        }
        let range = $rangeEl.val();
        if(!range) {
            $rangeEl.addClass('errorValue');
        }

        if(!mainFormSelect || !email || !name || !range) {
            return;
        }

        formData.append('mainFormSelect', mainFormSelect);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('range', range);

        $.ajax({
            type: "POST",
            url: base_url + "/../../mail/feedback.php",
            // dataType : "json",
            cache: false,
            contentType: false,
            processData: false,
            data: formData //указываем что отправляем
            //data: $(this).serialize()
        }).done(function(responseText) {
            //alert(text);
            let response = {};
            try{
                response = JSON.parse(responseText);
            } catch(ex) {
                console.warn(ex);
            }
            /*console.log('responseText', responseText, response);*/
            $response.html(response.message);

            if (!response.success) return;

            setTimeout(function() {
                //let magnificPopup = $.magnificPopup.instance;
                //magnificPopup.close();
                myThis.trigger("reset");
                $modalWindowOfThanks.removeClass("modalCall_active"); return false;
            }, 250);
        });
        document.querySelector('form').reset();
        return false;
    });
});