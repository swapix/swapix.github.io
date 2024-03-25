const requestURL = "https://mutual-loved-filly.ngrok-free.app/api/v1/";

document.addEventListener('DOMContentLoaded', function() {

    if(getCookie("swpKey") == null || getCookie("profileID") == null){
        window.location.href = "/pages/login/"
    }

    
    const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("content-type", "application/json");
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            header: myHeaders,
            redirect: "follow"
          };

       

        fetch(requestURL + "trader/" + getCookie("profileID") + "?apiKey=" + getCookie("swpKey"), requestOptions)
        .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Login failed: " + response.body);
            }
          })
        .then(data => {
            document.getElementById("account-name").innerText = "" + data.firstName;
            document.getElementById("account-email").innerText = "" + data.email;
            document.getElementById("account-status").innerText = "" + data.bio;
        })
        .catch(error => {
            console.error(error);
        }); 
        
        fetch(requestURL + "content/profiles?ApiKey=" +getCookie("swpKey") + "&traderID=" + getCookie("profileID") , requestOptions)
        .then(response => {
            if (response.ok) {
              return response;
            } else {
              throw new Error("Login failed: " + response.body);
            }
          })
        .then(data => {
            document.getElementById("account-picture").src = requestURL + "content/profiles?ApiKey=" +getCookie("swpKey") + "&traderID=" + getCookie("profileID");
        })
        .catch(error => {
            console.error(error);
        });
});

function toggleContent(id) {
    var content = document.getElementById(id).getElementsByClassName('content')[0];
    content.classList.toggle('collapsed');
}