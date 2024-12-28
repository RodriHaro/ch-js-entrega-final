$(document).ready(function(){
    
    // Funcion para el movimiento de la barra de navegacion
    $(".nav-link").click(function(){
        $('html,body').animate({ scrollTop: $(this.hash).offset().top-80 }, 1400);
        return false;
    });

    $(window).scroll(function(){
        ($(window).scrollTop() >= 110) ? (
            $('.nav-bar').addClass('scrolled')
        ) : (
            $('.nav-bar').removeClass('scrolled')
        );
    });
    
    // Barra de navegacion acorde a la posicion del scroll
    $(window).scroll(function(){
        if ($(window).scrollTop() >= $('#contacto').offset().top - $(window).height()/2 ) {
            $('.nav-link').removeClass('active');
            $('#contactoLink').addClass('active');
        } else if ($(window).scrollTop() >= $('#armazones').offset().top - $(window).height()/2 ) {
            $('.nav-link').removeClass('active');
            $('#armazonesLink').addClass('active');
        } else if ($(window).scrollTop() >= $('#lentesDeSol').offset().top - $(window).height()/2 ) {
            $('.nav-link').removeClass('active');
            $('#lentesDeSolLink').addClass('active');
        } else if ($(window).scrollTop() >= $('#topSection').offset().top - $(window).height()/2 ) {
            $('.nav-link').removeClass('active');
            $('#topLink').addClass('active');
        }
    });
    
});