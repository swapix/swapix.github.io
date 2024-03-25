document.addEventListener('DOMContentLoaded', function() {
    
    document.querySelector('form').addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Get the form data
      var formData = {
        from: 'SwapiX Webside<postmaster@email.swapix.fun.mailgun.org>', // Replace with your domain email
        to: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        text: document.getElementById('message').value
      };
  
      // Mailgun API details
      const apiKey = '746bd08ca244052cdaa9aee21c58457c-2c441066-9a7e93b0'; // Replace with your actual API key
      const domain = 'email.swapix.fun.mailgun.org'; // Replace with your domain
  
      // Send a fetch request to Mailgun API
      fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Basic ${btoa(`api:${apiKey}`)}`
        }
      })
        .then(function(response) {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(function(data) {
          console.log(data); // Log the response to the console
          alert('Email sent successfully!'); // Show a success message to the user
          // Optionally, you can reset the form after successful submission
          document.querySelector('form').reset();
        })
        .catch(function(error) {
          console.error('There was a problem sending the email:', error);
          alert('An error occurred. Please try again later.'); // Show an error message to the user
        });
    });
  });

  window.onloadTurnstileCallback = function () {
    turnstile.render('contact-form', {
        sitekey: '0x4AAAAAAAVhRbrgJbIn7Soc',
        callback: function(token) {
            console.log(`Challenge Success ${token}`);
        },
    });
};
  