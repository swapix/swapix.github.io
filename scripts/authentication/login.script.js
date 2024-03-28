const usingRecentUser = false;
const recentUserName = "";


document.addEventListener('DOMContentLoaded', async function() {
    if(getCookie("swpKey") != null && getCookie("profileID") != null)
    {
      if(new QueryManager().getParam("action") == "login")
      {
        if(new QueryManager().getParam("key") == "webApp"){
          window.location.href = "https://app.swapix.fun/?action=login&usr=" + getCookie("profileID") + "&key=" + getCookie("swpKey");
        }
      }
      else{
        window.location.href = "/pages/account/" + new QueryManager().getQueryString();
      }
    }
    else{
      if(getCookie("__swp_cgb_account-username") !== null){
        document.getElementById("previously-used-account").style.display = "block";
        document.getElementById("recent-username").innerHTML = "<strong>Username:</strong> " + getCookie("__swp_cgb_account-username");
        document.getElementById("recent-email").innerHTML = "<strong>Email:</strong> " + getCookie("__swp_cgb_account-email");
      }
      
      setTimeout(() => {
        document.body.classList.add('loaded');
        setTimeout(() => {
            document.body.classList.add('loaded-hidden');
        }, 500);
    }, 1000);
    }

    document.getElementById("logIn").addEventListener("click", async function(event) {
        event.preventDefault();
        
        var username = document.getElementById("username-login").value;
        var password = document.getElementById("password-login").value;
    
        var raw =  {
            userName: username,
            password: password
        };

        if(usingRecentUser){
          raw.userName = getCookie("__swp_cgb_account-username");
        }

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
            showError("login", "Login successful!");
            console.log(data);
            setCookie("swpKey",data.apiKey,)
            setCookie("profileID",data.userId,)
            setCookie("swpDefault","1");
            setCookie("__b__a_version","b")

            if(qm.getParam("action") == "login")
            {
              if(qm.getParam("key") == "webApp"){
                window.location.href = "https://app.swapix.fun/?action=login&usr=" + getCookie("profileID") + "&key=" + getCookie("swpKey");
              }
            }else{
              window.location.href = "/pages/account/" + new QueryManager().getQueryString();
            }
            
          })
          .catch(error => {
            showError("login",error);
            console.error(error);
          });
        });

//------------------------------------------------------------------------------------------------------------

        document.getElementById("form-signup").addEventListener("submit", async function(event) {
          event.preventDefault();
          
          var username = getUsernameAsString();
          var password = document.getElementById("password-signup").value;
          var email = document.getElementById("email").value;

          var lastandFirstName = splitString(username);


          if(splitString(lastandFirstName) == null)
          {
            showError("signup","Civilname isnt correct. (Format Exception)");
          }
          else{
              var raw =  {
                username: generateRandomUsername(lastandFirstName.firstPart),
                firstName: lastandFirstName.firstPart,
                lastName: lastandFirstName.secondPart,
                email: email,
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
    
              await fetch("https://mutual-loved-filly.ngrok-free.app/api/v1/trader", requestOptions)
              .then(response => {
                if (response.ok) {
                  return response.json();
                } else {
                  console.log(response);
                  showError("signup", response.title);
                  throw new Error("Sign Up failed: " + response.body.title);
                }
              })
              .then(data => {

                document.getElementById("message").innerText = "Sign Up successfull!";

                try{
                  console.log(data);
                  login(raw.username ,raw.password);
                }
                catch(ex){
                  showError("signup",ex.message)
                }
                
              })
              .catch(error => {
                showError("signup",error);
                console.error(error);
              });
            }
            
          });
});

async function login(username, password)
{
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
            showError("login", "Login successful!");
            console.log(data);
            setCookie("swpKey",data.apiKey,)
            setCookie("profileID",data.userId,)
            setCookie("swpDefault","1");
            setCookie("__b__a_version","b")
            window.location.href = "/pages/account/" + new QueryManager().getQueryString();
          })
          .catch(error => {
            showError("login",error);
            console.error(error);
          });
}

function showError(where, content) {
  switch(where){
    case "signup":
      document.getElementById("message-signup").innerText = content;
      setTimeout(() => 
      {
        document.getElementById("message-signup").innerText = "";
      },1500);
    break;
    case "login":
      document.getElementById("message").innerText = content;
      setTimeout(() => 
      {
        document.getElementById("message").innerText = "";
      },1500);
    break;
  }
}

function getUsernameAsString() {
  const usernameInput = document.getElementById("username-signup");
  if (usernameInput && usernameInput.value) {
      const usernameString = String(usernameInput.value);
      return usernameString;
  } else {
      console.error('Input element or value not found');
      return '';
  }
}

function deletePreUsedAccount(){
  document.getElementById("previously-used-account").style.display = "none";
  deleteCookie("__swp_cgb_account-username");
}

function SetUserName(){
  document.getElementById("login-username-section").style.display = "none";
  document.getElementById("delete-pre-used-account").style.display = "none";
  document.getElementById("previously-used-account").style.background = "#dfe8ff";
  document.getElementById("username-login").value = getCookie("__swp_cgb_account-username")
  usingRecentUser  = true;
}