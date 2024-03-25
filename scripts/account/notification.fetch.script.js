function generateNotificationRows(data) {
    const notificationContainer = document.getElementById("notification-table");
    
    data.forEach(notification => {
        const notificationRow = document.createElement("div");
        notificationRow.classList.add("notification-row");
        notificationRow.setAttribute("onclick", `showMessageDetails(${notification.id})`);
        
        const notificationInfo = document.createElement("div");
        notificationInfo.classList.add("notification-info");
        
        const profileImg = document.createElement("img");
        profileImg.src = "/media/icons/logo.png";
        profileImg.alt = "Profile Picture";
        
        const messageDetails = document.createElement("div");
        messageDetails.classList.add("message-details");
        
        const messageHeader = document.createElement("h3");
        messageHeader.textContent = notification.message;
        
        const messageAuthor = document.createElement("p");
        messageAuthor.classList.add("message-author");
        messageAuthor.textContent = `From: ${notification.author}`;
        
        const notificationTime = document.createElement("div");
        notificationTime.classList.add("notification-time");
        notificationTime.innerHTML = `<p>${notification.time}</p>`;
        
        const notificationBadge = document.createElement("div");
        notificationBadge.classList.add("notification-badge");
        
        const badgeSpan = document.createElement("span");
        badgeSpan.classList.add("badge-" + notification.badge.toLowerCase());
        badgeSpan.textContent = notification.badge;
        
        notificationBadge.appendChild(badgeSpan);
        messageDetails.appendChild(messageHeader);
        messageDetails.appendChild(messageAuthor);
        notificationInfo.appendChild(profileImg);
        notificationInfo.appendChild(messageDetails);
        notificationRow.appendChild(notificationInfo);
        notificationRow.appendChild(notificationTime);
        notificationRow.appendChild(notificationBadge);
        
        notificationContainer.appendChild(notificationRow);
    });
}

function showMessageDetails(messageId) {
    const message = notificationData.find(item => item.id === messageId);
    const sidePanel = document.getElementById("message-side-panel");
    sidePanel.innerHTML = `
        <div class="message-details">
            <h3>${message.message}</h3>
            <p class="message-author">From: ${message.author}</p>
            <p class="message-time">${message.time}</p>
            <p class="message-content">${message.content}</p>
        </div>
    `;
    sidePanel.classList.add("show");
}

// Sample JSON data for notification messages
const notificationData = [
    
    {
        id: 2,
        message: "Your account has been upgraded to premium.",
        author: "Billing Department",
        time: "12:30 PM",
        badge: "Important",
        content: "Congratulations! You now have access to premium features. Enjoy!"
    },
    {
        id: 2,
        message: "Welcome to the SwapiX Team",
        author: "SwapiX Admin",
        time: "Yesterday",
        badge: "Important"
        ,
        content: "Thank you for joining our team! We are excited to have you on board."
    },
    // Add more notification objects as needed
];