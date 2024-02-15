document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
    
        var requestData = {
            userName: username,
            password: password
        };

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://mutual-loved-filly.ngrok-free.app/api/v1/auth/login", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    document.getElementById("message").innerText = "Login successful!";
                } else {
                    var response = JSON.parse(xhr.responseText);
                    document.getElementById("message").innerText = "Login failed: " + response.message;
                }
            }
        };
        try {
            window.location.href = "https://k0b32llp-7230.euw.devtunnels.ms/Identity/Account/login"
            xhr.send(JSON.stringify(requestData));
        } catch (error) {
            
        }
    });
});
