const openMenu = () => {
    $('.header__burger').toggleClass("header__burger-open");
    $('.header').toggleClass("header__open");
    $('.header__menu-mob').toggleClass('header__menu-show');
    $('.header__container').toggleClass('header__open');
    $('.header__drop').removeClass('header__drop-open');
    $('.header__submenu').removeClass('header__submenu-open');
    $('body').toggleClass('hidden');
};



const showQuestion = () =>{
    $('.quiz__question').each(function (){
        let stepNumber = $(this).attr('data-number')
        $(this).find('.quiz__question-step').text(`step ${stepNumber}`)
    })

    $('.quiz__question:first-child').addClass('active')

    $('.quiz__button').each(function (){
        $(this).attr('disabled', true);
    })


    $('.quiz__question input').on('change', function () {
        if ($('.quiz__question input').is(':checked')) {
            let buttonNext= $(this).closest('.quiz__question').find('.quiz__button')
            buttonNext.attr('disabled', false);
        } else buttonNext.attr('disabled', true);
    });

    $('.quiz__button').click(function (){
        let activeQuestion = $('.quiz__question.active')
        activeQuestion.removeClass('active')
        activeQuestion.next('.quiz__question').addClass('active')
        })


}

const oneActive = (item,itemElem) =>{
    item.addClass('active');
    item.prevAll(itemElem).removeClass('active');
    item.nextAll(itemElem).removeClass('active');
}

const serviceActive = () => {
    $('.service__nav li').click(function () {
        const currentService = $(this)
        const currentId = currentService.attr("id")
        const serviceUrl = currentService.attr("data-url")

        oneActive(currentService,'li')
        $('.service__nav-read').attr('href',serviceUrl )

        $('.service__nav-desc li').each(function (){
            let desc = $(this).attr('data-desc')
            let ths = $(this)
            if(currentId == desc ){
                oneActive(ths,'li')
            }
        })
        $('.service__nav-img').each(function (){
            let img = $(this).attr('data-img')
            let ths = $(this)
            if(currentId == img){
                oneActive(ths,'.service__nav-img')
            }
        })
    });
};


function toogleModal(btn, modal) {
    btn.click(function () {
        modal.show();
        $('body').css('overflow', 'hidden');
        return false;
    });
    $('.modal__close').click(function () {
        $(this).closest(modal).hide();
        // resetForm();
        $('body').css('overflow', 'visible');
        return false;
    });
    $('.modal__quiz-return').click(function () {
        $(this).closest(modal).hide();
        $('body').css('overflow', 'visible');
        return false;
    });

    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            modal.hide();
            // resetForm();
            $('body').css('overflow', 'visible');
        }
    });
    modal.click(function (e) {
        if ($(e.target).closest('.modal__content').length == 0) {
            $(this).hide();
            // resetForm();
            $('body').css('overflow', 'visible');
        }
    });
}

const showReview = () => {
    $('.review__text span').click(function () {
        let reviewText = $(this).closest('p').text();
        let reviewName = $(this).closest('.review__text').find('.review__name h3').text();
        console.log('reviewName',reviewName)
        let currentReview = $(this).closest('p').text().substr(0, reviewText.length - 16);
        // let currentReview =  $(this).closest('p').text().substr(0, reviewText.length-13)///якщо без крапок

        $('.review__modal-swiper .review__text p').each(function (index) {

            let reviewCurrentName = $(this).closest('.review__text').find('.review__name h3').text()
            if ($(this).text().includes(currentReview) && reviewName===reviewCurrentName) {
                const reviewModal = new Swiper(".review__modal-swiper", {
                    initialSlide: index,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    navigation: {
                        nextEl: ".swiper-button-next_reviewModal",
                        prevEl: ".swiper-button-prev_reviewModal"
                    }
                });
            }
        });
    });
    toogleModal($('.review__text span'), $('.modal__review'));
};



// const validateForm = (form, func) => {
//     form.on("submit", function (e) {
//         e.preventDefault();
//     });
//
//     $.validator.addMethod("goodName", function (value, element) {
//         return this.optional(element) || /^[аА-яЯіІєЄїЇґҐa-zA-Z0-9._-]{2,30}$/i.test(value);
//     }, "Enter correct name");
//
//     $.validator.addMethod("goodAddress", function (value, element) {
//         return this.optional(element) || /^[аА-яЯіІєЄїЇґҐa-zA-Z0-9._-]{2,100}$/i.test(value);
//     }, "Enter correct address");
//
//
//     $.validator.addMethod("goodEmail", function (value, element) {
//         return this.optional(element) || /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,62}$/i.test(value);
//     }, "Enter correct phone email");
//
//     $.validator.addMethod("goodPhone", function (value, element) {
//         // return this.optional(element) || /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/i.test(value);
//         return this.optional(element) || /^[+]*[0-9]{10,14}$/g.test(value);
//     }, "Enter correct phone number");
//
//     form.validate({
//         rules: {
//             name: {
//                 required: true,
//                 goodName: true
//             },
//             address: {
//                 required: true,
//                 goodAddress: true
//             },
//
//             phone: {
//                 required: true,
//                 goodPhone: true
//
//             },
//             email: {
//                 required: true,
//                 goodEmail: true,
//                 email: true
//             },
//         },
//         messages: {
//             name: {
//                 required: "This field is required",
//                 minlength: "Name can't be shorter than 2 letter",
//                 maxLength: "Name can't be longer than 30 letter"
//             },
//             address: {
//                 required: "This field is required",
//                 minlength: "Address can't be shorter than 2 letter",
//                 maxLength: "Address can't be longer than 100 letter"
//             },
//             phone: {
//                 required: "This field is required",
//                 phone: "Enter correct phone number"
//             },
//             email: {
//                 required: "This field is required",
//                 email: "Enter valid email"
//             },
//         },
//         submitHandler: function () {
//             func();
//             form[0].reset();
//         }
//     });
// };
//
// // create ajax
// function ajaxSend(date, url, func) {
//     $.ajax({
//         url: url,
//         data: date,
//         method: 'POST',
//         success: function (data) {
//             func(data);
//         },
//         error: function (error) {},
//         complete: function () {}
//     });
//
// }
//
// // send form
// function sendForm(form, url, func) {
//     form = form.serialize();
//     ajaxSend(form, url, func);
// }
//


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

        let headerBook = $('.header__book')
        $('.header__menu-mob').append(headerBook)


        $('.header__drop').click(function () {
            $(this).toggleClass('header__drop-open');
            $('.header__submenu').toggleClass("header__submenu-open");
        });
    }
}


function counter() {
    // $(window).scroll(function() {
    //     let counted = 0;
    //     let oTop = $('#counter').offset().top - window.innerHeight;
    //     if (counted == 0 && $(window).scrollTop() > oTop) {
    //         $('.achievement__counter').each(function() {
    //             let $this = $(this),
    //                 countTo = $this.attr('data-count');
    //             $({
    //                 countNum: $this.text()
    //             }).animate({
    //                     countNum: countTo
    //                 },
    //                 {
    //
    //                     duration: 2000,
    //                     easing: 'swing',
    //                     step: function() {
    //                         $this.text(Math.floor(this.countNum));
    //                     },
    //                     complete: function() {
    //                         $this.text(this.countNum);
    //                     }
    //
    //                 });
    //         });
    //         counted = 1;
    //     }
    //
    // });
}


function takeCountryNumber() {
    const inputs = $("[data-phone]");

    inputs.each(function () {
        const input = $(this);
        const iti = window.intlTelInput(input[0], {
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
            initialCountry: "lu",
        });

        input.on("input", function () {
            const selectedCountryData = iti.getSelectedCountryData();
            let phoneNumber = $(this).val().trim();

            if (selectedCountryData.dialCode) {
                if (!phoneNumber.startsWith(selectedCountryData.dialCode)) {
                    phoneNumber = selectedCountryData.dialCode + phoneNumber;
                    $(this).val(phoneNumber);
                }
            }
        });
    });
}











function tabsYear() {

    $(".date__tab .tab").click(function () {
        $(".date__tab .tab").removeClass("active").eq($(this).index()).addClass("active");
        $(".date__tab-item").hide().eq($(this).index()).fadeIn();
        let currentYear = $(this).text()
        $('.date__currentYear').text(currentYear)

    }).eq(0).addClass("active");
    let currentYear = $(".date__tab .tab:first-child").text()
    $('.date__currentYear').text(currentYear)


}

function deleteSpace(){
    $('.date__img').each(function (){
        if($(this).find('img').length==0){
            $(this).remove()
        }
    })
}

const validateFormSubs = (form, func) => {
    form.on("submit", function (e) {
        e.preventDefault();
    });

    $.validator.addMethod("goodEmail", function (value, element) {
        return this.optional(element) || /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,62}$/i.test(value);
    }, "Enter correct phone email");


    form.validate({
        rules: {
            email: {
                required: true,
                goodEmail: true,
                email: true
            }
        },
        messages: {
            email: {
                required: "This field is required",
                email: "Please enter the correct email"
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



function toogleModalWithoutClick(modal, func) {
    modal.show();
    $('body').css('overflow', 'hidden');
    $('.modal__close').click(function () {
        $(this).closest(modal).hide();
        $('body').css('overflow', 'visible');
        func();
        return false;
    });
    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            modal.hide();
            $('body').css('overflow', 'visible');
            func();
        }
    });
    modal.click(function (e) {
        if ($(e.target).closest('.modal__content').length == 0) {
            $(this).hide();
            $('body').css('overflow', 'visible');
            func();
        }
    });
}























$(document).ready(function(){
    counter()
    mobChange()
    showReview()
    serviceActive()
    showQuestion()
    takeCountryNumber()
    $('.section__select').select2({})
    $('.header__burger').on('click', openMenu);
    tabsYear()
    deleteSpace()
});




$(window).load(function(){
    let formConsultation = $('.consultation__form'),
        modalConsultation = $(".modal__consultation");
    validate(formConsultation, function () {
        sendForm(formConsultation, '/wp-admin/admin-ajax.php');
        toogleModalWithoutClick(modalConsultation);
    });






    let formSubs = $('.subs__form')
    let modalSubs = $('.modal__subs')

    validateFormSubs(formSubs, function () {
        sendForm(formSubs, '/wp-admin/admin-ajax.php');
        toogleModalWithoutClick(modalSubs);
    });

});

$(window).resize(function(){

});


