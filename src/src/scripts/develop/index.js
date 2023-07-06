const openMenu = () => {
    $('.header__burger').toggleClass("header__burger-open");
    $('.header__menu-mob').toggleClass('header__menu-show');
    $('.header__container').toggleClass('header__open');
    $('.header__drop').removeClass('header__drop-open');
    $('.header__submenu').removeClass('header__submenu-open');
    $('body').toggleClass('hidden');
};


const validateForm = (form, func) => {
    form.on("submit", function (e) {
        e.preventDefault();
    });

    $.validator.addMethod("goodName", function (value, element) {
        return this.optional(element) || /^[аА-яЯіІєЄїЇґҐa-zA-Z0-9._-]{2,30}$/i.test(value);
    }, "Enter correct name");

    $.validator.addMethod("goodEmail", function (value, element) {
        return this.optional(element) || /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,62}$/i.test(value);
    }, "Enter correct phone email");

    $.validator.addMethod("goodPhone", function (value, element) {
        // return this.optional(element) || /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/i.test(value);
        return this.optional(element) || /^[+]*[0-9]{10,14}$/g.test(value);
    }, "Enter correct phone number");

    form.validate({
        rules: {
            name: {
                required: true,
                goodName: true
            },

            phone: {
                required: true,
                goodPhone: true

            },
            email: {
                required: true,
                goodEmail: true,
                email: true
            },
        },
        messages: {
            name: {
                required: "This field is required",
                minlength: "Name can't be shorter than 2 letter",
                maxLength: "Name can't be longer than 25 letter"
            },
            phone: {
                required: "This field is required",
                phone: "Enter correct phone number"
            },
            email: {
                required: "This field is required",
                email: "Enter valid email"
            },
        },
        submitHandler: function () {
            func();
            form[0].reset();
        }
    });
};

// create ajax
function ajaxSend(date, url, func) {
    $.ajax({
        url: url,
        data: date,
        method: 'POST',
        success: function (data) {
            func(data);
        },
        error: function (error) {},
        complete: function () {}
    });

}

// send form
function sendForm(form, url, func) {
    form = form.serialize();
    ajaxSend(form, url, func);
}



const gallery = new Swiper('.main__gallery-swiper', {
    slidesPerView: 1,
    spaceBetween: 1,
    centeredSlides: true,
    loop: true,
});

const review = new Swiper(".review__slider", {
    slidesPerView: 3,
    spaceBetween: 50,
    loop: true,

    navigation: {
        nextEl: ".swiper-button-next_review",
        prevEl: ".swiper-button-prev_review"
    },
    pagination: {
        el: '.review__pagination',
        clickable: true,
    },
    breakpoints: {
        '0': {
            slidesPerView: 1,
            spaceBetween: 20
        },
        '666': {
            slidesPerView: 3,
            spaceBetween: 40
        }
    }
});


function mobChange(){
    if (window.innerWidth <= 666) {
        const service = new Swiper(".service__slider", {
            slidesPerView: 1.25,
            spaceBetween: 18,
            loop: true,

            pagination: {
                el: '.service__pagination',
                clickable: true,
            },
        });

        const procedure = new Swiper(".procedure__slider", {
            slidesPerView: 1.25,
            spaceBetween: 18,
            loop: true,

            pagination: {
                el: '.procedure__pagination',
                clickable: true,
            },
        });
        let serviceView = $('.service__view')
        $('.service .section__subtitle').after(serviceView)
    }
}


function counter() {
    $(window).scroll(function() {
        let counted = 0;
        let oTop = $('#counter').offset().top - window.innerHeight;
        if (counted == 0 && $(window).scrollTop() > oTop) {
            $('.achievement__counter').each(function() {
                let $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                        countNum: countTo
                    },
                    {

                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                        }

                    });
            });
            counted = 1;
        }

    });
}

$(document).ready(function(){
    counter();
    mobChange();
    $('.section__select').select2({});
    $('.header__burger').on('click', openMenu);

});




$(window).load(function(){
    let formConsultation = $('.consultation__form'),
        modalConsultation = $(".modal__consultation");
    validateForm(formConsultation, function () {
        sendForm(formConsultation, '/wp-admin/admin-ajax.php');
        // toogleModalWithoutClick(modalSchool);
    });

});

$(window).resize(function(){

});