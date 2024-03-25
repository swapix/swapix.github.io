const requestURL = "https://mutual-loved-filly.ngrok-free.app/api/v1/";

document.addEventListener('DOMContentLoaded', function() {

    if(getCookie("swpKey") == null || getCookie("profileID") == null){
        window.location.href = "/pages/login/"
    }

    closeDialog()
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
            document.getElementById("account-table-email").innerText = "" + data.email;
            document.getElementById("account-table-username").innerText = "@" + data.userName;
            document.getElementById("account-table-civilname").innerText = "" + data.firstName + " " + data.lastName;
            document.getElementById("account-greeting").innerText = "Hey, " + data.firstName ; 
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
    
        setTimeout(() => {
            document.body.classList.add('loaded');
            setTimeout(() => {
                document.body.classList.add('loaded-hidden');
                showSection('profile');
            }, 500);
        }, 2000);
    });

function toggleContent(id) {
    var content = document.getElementById(id).getElementsByClassName('content')[0];
    content.classList.toggle('collapsed');
}

function logoutFromMain(){
    deleteCookie("swpKey")
    deleteCookie("profileID")
    window.location.href = "/"
}
function openDialog(field) {
    var dialog = document.getElementById('edit-dialog');
    var overlay = document.getElementById('modal-overlay');
    dialog.style.display = 'block';
    overlay.style.display = 'block';
}

function closeDialog() {
    var dialog = document.getElementById('edit-dialog');
    var overlay = document.getElementById('modal-overlay');
    dialog.style.display = 'none';
    overlay.style.display = 'none';
}
