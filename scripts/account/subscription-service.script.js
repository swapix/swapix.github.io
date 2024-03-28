
function GetSubscriptionName(type)
{
    switch(type) {
        case 0:  return 'Lite';
        case 1:  return 'Essential';
        case 2:  return 'Premium';
    }
}

function GetSubscriptioDescription(type)
{
    switch(type) {
        case 0:  return 'Welcome to SwapiX!';
        case 1:  return 'Youre Toolset for incredible SwapiX Time.';
        case 2:  return 'The industry leading Tools right at youre fingertips!';
    }
}

async function SetSubscriptionState()
{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("content-type", "application/json");
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        header: myHeaders,
        redirect: "follow"
      };

    await fetch(requestURL + "auth/subscriptions?ApiKey=" + getCookie("swpKey") + "&TraderID=" + getCookie("profileID"), requestOptions)
        .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              showError();
              throw new Error("Subscription Chech failed." + response.body);
            }
          })
        .then(data => {
            setCookie("__swp_cgb_sub-type", data.type);
            setCookie("__swp_cgb_sub_date", data.expirationDate);
            setCookie("__swp_cgb_sub_int", data.interval);

            document.getElementById("subcon-subscirption-name").innerText = GetSubscriptionName(data.type);
            document.getElementById("subcon-subscirption-description").innerText = GetSubscriptioDescription(data.type)
            
        })
        .catch(error => {
            showError(error);
            console.error(error);
        }); 
}