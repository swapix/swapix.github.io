document.addEventListener('DOMContentLoaded', async function() {

    if(getCookie("swpKey") != null && getCookie("profileID") != null){
        window.location.href = "/pages/account/"
    }

    document.getElementById("loginForm").addEventListener("submit", async function(event) {
        event.preventDefault();
        
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
    
        var raw =  {
            userName: username,
            password: password
        };

        const dataBlob = new Blob([JSON.stringify(raw)], {
            type: "application/json"
       });
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("content-type", "application/json");
        const requestOptions = {
            method: "POST",
            content: "application/json",
            headers: myHeaders,
            header: myHeaders,
            body: JSON.stringify(raw),
            redirect: "follow"
          };

          await fetch("https://mutual-loved-filly.ngrok-free.app/api/v1/auth/login", requestOptions)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Login failed: " + response.body);
            }
          })
          .then(data => {
            document.getElementById("message").innerText = "Login successful!";
            console.log(data);
            setCookie("swpKey",data.apiKey,)
            setCookie("profileID",data.userId,)
            setCookie("swpDefault","1");
            setCookie("__b__a_version","b")
            window.location.href = "/pages/account/"
          })
          .catch(error => {
            document.getElementById("message").innerText = error;
            console.error(error);
          });
        });
});
