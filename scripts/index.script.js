const requestURL = "https://mutual-loved-filly.ngrok-free.app/api/v1/";
document.addEventListener('DOMContentLoaded', async function() {
    allConsentGranted();
    if(getCookie("swpKey") != null && getCookie("profileID") != null){
        document.body.classList.remove('loaded-hidden');
        document.body.classList.remove('loaded');

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("content-type", "application/json");
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            header: myHeaders,
            redirect: "follow"
          };

       

        await fetch(requestURL + "trader/" + getCookie("profileID") + "?apiKey=" + getCookie("swpKey"), requestOptions)
        .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Login failed: " + response.body);
            }
          })
        .then(data => {
            const loginButton = document.getElementById("header-account-button");
            loginButton.href = "/pages/account/"
            loginButton.innerText = "My Account"

            const actionButtonJoin = document.getElementById("hero-actionbutton-join");
            actionButtonJoin.innerText = "Be your Best!"
            actionButtonJoin.href = "https://app.swapix.fun/?action=login&usr=" + getCookie("profileID") + "&key=" + getCookie("swpKey");
            
            document.getElementById("hero-big-description").innerText = "You are a part of something big lets build something great together."

            document.getElementById("hero-welcome-big").innerHTML = "Welcome, <span class=\"swapix-text\" id=\"hero-animated-text\">"+ data.firstName + " " + data.lastName +"<span>";
            
        })
        .catch(error => {
            console.error(error);
        }); 

        setTimeout(() => {
            document.body.classList.add('loaded');
            setTimeout(() => {
                document.body.classList.add('loaded-hidden');
            }, 500);
        }, 1000);
    }

    document.getElementById("lite-sub-button").addEventListener('click',function(){
        window.location.href = '/pages/v2/auth/';
    });
    document.getElementById("basic-sub-button").addEventListener('click',function(){
        window.location.href = '/pages/v2/auth/?referal=subscriptions-home&action=sub&key=basic';
    });
    document.getElementById("premium-sub-button").addEventListener('click',function(){
        window.location.href = '/pages/v2/auth/?referal=subscriptions-home&action=sub&key=premium';
    });
    document.getElementById('viewMoreBtn').addEventListener('click', function() {
        window.location.href = '/pages/features/';
    });
    

    $(document).ready(function() {
        $('.hero-content').addClass('animate__animated animate__fadeInDown');
        $('.svg-animation').addClass('animate__animated animate__fadeInRight');

        setTimeout(function() {
            $('.hero-content').removeClass('animate__animated animate__fadeInDown');
            $('.svg-animation').removeClass('animate__animated animate__fadeInRight');
        }, 2000);
    });
});


