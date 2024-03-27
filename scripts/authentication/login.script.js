document.addEventListener('DOMContentLoaded', async function() {

    if(getCookie("swpKey") != null && getCookie("profileID") != null){
        window.location.href = "/pages/account/"
    }
    else{
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