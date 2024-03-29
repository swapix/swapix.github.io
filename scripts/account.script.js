const requestURL = "https://mutual-loved-filly.ngrok-free.app/api/v1/";
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("content-type", "application/json");
const requestOptions = {
            method: "GET",
            headers: myHeaders,
            header: myHeaders,
            redirect: "follow"
          };

document.addEventListener('DOMContentLoaded',async function() {
    closeDialog()

    if(getCookie("swpKey") == null || getCookie("profileID") == null){
        window.location.href = "/pages/login/"
    }

    if(getCookie("swpCacherSpeedEnhancer") == "true"){
        document.getElementById("account-name").innerText = getCookie("__swp_cgb_account-name");
        document.getElementById("account-email").innerText = getCookie("__swp_cgb_account-email");
        document.getElementById("account-table-email").innerText = getCookie("__swp_cgb_account-email")
        document.getElementById("account-table-username").innerText = "@" + getCookie("__swp_cgb_account-username");
        document.getElementById("account-table-civilname").innerText = getCookie("__swp_cgb_account-civilname");
        document.getElementById("account-table-resident").innerText = getCookie("__swp_cgb_account-resident");
        document.getElementById("account-table-telephone").innerText = getCookie("__swp_cgb_account-telephone");
        document.getElementById("account-table-twofa").innerText = getCookie("__swp_cgb_account-twofa");
        document.getElementById("account-greeting").innerText = "Hey, " + getCookie("__swp_cgb_account-name"); 

        await fetch(requestURL + "content/profiles?ApiKey=" +getCookie("swpKey") + "&traderID=" + getCookie("profileID") , requestOptions)
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
            showError(error);
            console.error(error);
        });
        await generateNotificationRows(notificationData);

        setTimeout(() => {
            document.body.classList.add('loaded');
            setTimeout(() => {
                document.body.classList.add('loaded-hidden');
                showRelevantPage();
            }, 500);
        }, 1000);
    }
    else{
        setCookie("swpCacherSpeedEnhancer","false"); 
        

       

        await fetch(requestURL + "trader/" + getCookie("profileID") + "?apiKey=" + getCookie("swpKey"), requestOptions)
        .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              showError();
              throw new Error("Login failed: " + response.body);
            }
          })
        .then(data => {

            setCookie("__swp_cgb_account-name", data.firstName);
            setCookie("__swp_cgb_account-email", data.email);
            setCookie("__swp_cgb_account-username", data.userName);
            setCookie("__swp_cgb_account-civilname", data.firstName + " " + data.lastName);
            setCookie("__swp_cgb_account-resident", data.location);
            setCookie("__swp_cgb_account-telephone", data.phoneNumber ?? "N/A");
            setCookie("__swp_cgb_account-twofa",data.twoFactorEnabled ?? "N/A")
            document.getElementById("account-name").innerText = "" + data.firstName;
            document.getElementById("account-email").innerText = "" + data.email;
            document.getElementById("account-table-email").innerText = "" + data.email;
            document.getElementById("account-table-username").innerText = "@" + data.userName;
            document.getElementById("account-table-civilname").innerText = "" + data.firstName + " " + data.lastName;
            document.getElementById("account-table-resident").innerText = "" + data.location;
            document.getElementById("account-table-telephone").innerText = "" + data.phoneNumber ?? "N/A";
            document.getElementById("account-table-twofa").innerText = data.twoFactorEnabled ?? "N/A";
            document.getElementById("account-greeting").innerText = "Hey, " + data.firstName ; 
        })
        .catch(error => {
            showError(error);
            console.error(error);
        }); 
        
        await fetch(requestURL + "content/profiles?ApiKey=" +getCookie("swpKey") + "&traderID=" + getCookie("profileID") , requestOptions)
        .then(response => {
            if (response.ok) {
              return response;
            } else {
              throw new Error("Login failed: " + response.body);
            }
          })
        .then(data => {
            const imageManager = new ImageManager();
            const imageUrl = requestURL + "content/profiles?ApiKey=" +getCookie("swpKey") + "&traderID=" + getCookie("profileID");
            const imageKey = "profilePic?=" + getCookie("profileID");
            imageManager.saveImage(imageKey, imageUrl);
            imageManager.getImage(imageKey).then(url => {
                console.log("Retrieved image URL:", url);
            });
            document.getElementById("account-picture").src = requestURL + "content/profiles?ApiKey=" +getCookie("swpKey") + "&traderID=" + getCookie("profileID");
        })
        .catch(error => {
            showError(error);
            console.error(error);
        });
        generateNotificationRows(notificationData);

        setTimeout(() => {
            document.body.classList.add('loaded');
            setTimeout(() => {
                document.body.classList.add('loaded-hidden');
                showRelevantPage();
            }, 500);
        }, 2000);
    }
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

function showError(ex) {
    const errorContainer = document.getElementById("error-container");
    errorContainer.style.display = "block";
    const errorContainerex = document.getElementById("error-container-ex");
    errorContainerex.innerText = ex.Message;
}

function showRelevantPage(){
    const qm = new QueryManager();
    switch(qm.getParam("action")){
        case "sub":
            showSection('subscriptions');
            break;
        case "direct":
            showSection('notifications');
            break;
        case "broker":
            showSection('integrations');
            break;
        case "settings":
            showSection('settings');
            break;
        default:
            showSection('profile');
    }
}