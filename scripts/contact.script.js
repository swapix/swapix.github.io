document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the form submission
    document.querySelector('form').addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();
        
        // Get the form data
        var formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Send a fetch request
        fetch('https://api.email.com/post', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function(data) {
            // Handle the successful response
            console.log(data); // Log the response to the console
            alert('Email sent successfully!'); // Show a success message to the user
            // Optionally, you can reset the form after successful submission
            document.querySelector('form').reset();
        })
        .catch(function(error) {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
            alert('An error occurred. Please try again later.'); // Show an error message to the user
        });
    });
});