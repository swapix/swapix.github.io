
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('viewMoreBtn').addEventListener('click', function() {
        window.location.href = '/pages/features/';
    });

    document.addEventListener("DOMContentLoaded", function() {
        // Get all subscription buttons
        var subscriptionButtons = document.querySelectorAll(".subscription-btn");
    
        // Add click event listener to each subscription button
        subscriptionButtons.forEach(function(button) {
            button.addEventListener("click", function() {
                // Get the ID of the popup associated with the button
                var popupId = button.getAttribute("data-popup");
                var popup = document.getElementById(popupId);
    
                // Display the popup
                popup.style.display = "block";
    
                // Add click event listener to close button
                var closeButtons = popup.querySelectorAll(".close-popup");
                closeButtons.forEach(function(closeButton) {
                    closeButton.addEventListener("click", function() {
                        // Hide the popup when close button is clicked
                        popup.style.display = "none";
                    });
                });
            });
        });
    });
    

    $(document).ready(function() {
        // Add animation classes to the hero content and SVG elements
        $('.hero-content').addClass('animate__animated animate__fadeInDown');
        $('.svg-animation').addClass('animate__animated animate__fadeInRight');

        // After 2 seconds, remove the animation classes
        setTimeout(function() {
            $('.hero-content').removeClass('animate__animated animate__fadeInDown');
            $('.svg-animation').removeClass('animate__animated animate__fadeInRight');
        }, 2000);
    });
});

