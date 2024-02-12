$(document).ready(function(){
    $('.slick-carousel').slick({
        infinite: true,
        slidesToShow: 3, // Adjust as needed for responsiveness
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000, // Adjust speed as needed
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('viewMoreBtn').addEventListener('click', function() {
        window.location.href = '/pages/features/';
    });
});
