document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
    
        var requestData = {
            userName: username,
            password: password
        };
    
        fetch('https://k0b32llp-7230.euw.devtunnels.ms/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => {
            if (response.ok) {
                document.getElementById("message").innerText = "Login successful!";
            } else {
                response.json().then(data => {
                    document.getElementById("message").innerText = "Login failed: " + data.message;
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});