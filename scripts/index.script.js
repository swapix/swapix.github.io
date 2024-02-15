
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("subscription-button-free").addEventListener('click',function(){
        window.location.href = '/pages/login/';
    });
    document.getElementById("subscription-button-basic").addEventListener('click',function(){
        window.location.href = '/pages/login/?=basic';
    });
    document.getElementById("subscription-button-premium").addEventListener('click',function(){
        window.location.href = '/pages/login/?=premium';
    });
    document.getElementById('viewMoreBtn').addEventListener('click', function() {
        window.location.href = '/pages/features/';
    });
    

    $(document).ready(function() {
        $('.hero-content').addClass('animate__animated animate__fadeInDown');
        $('.svg-animation').addClass('animate__animated animate__fadeInRight');

        // After 2 seconds, remove the animation classes
        setTimeout(function() {
            $('.hero-content').removeClass('animate__animated animate__fadeInDown');
            $('.svg-animation').removeClass('animate__animated animate__fadeInRight');
        }, 2000);
    });
});

