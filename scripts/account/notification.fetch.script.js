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

// Function to show the side panel with message details
function showMessageDetails(messageId) {
    const message = notificationData.find(item => item.id === messageId);
    const sidePanel = document.getElementById("message-side-panel");
    sidePanel.innerHTML = `
    <div class="panel-content">
        <button class="close-button" onclick="hideSidePanel()">Go Back</button>
        <div class="message-details-side">
            <div class="message-header">
                <div class="sidebar-profile-picture">
                    <img src="${requestURL + "content/static?ApiKey=" + getCookie("swpKey") + "&key=" + message.profilePicture}" alt="Profile Picture">
                </div>
                <div class="message-info">
                    <h3>${message.message}</h3>
                    <p class="message-author">From: ${message.author}</p>
                    <p class="message-time">${message.time}</p>
                </div>
            </div>
            <div class="message-content">
                <p>${message.content}</p>
            </div>
            <div class="bottom-toolbar">
                <button class="action-button"><i class="fas fa-trash"></i> Delete</button>
                <button class="action-button"><i class="far fa-comment"></i> Comment</button>
                <button class="action-button"><i class="fas fa-share"></i> Share</button>
            </div>  
        </div>
    </div>
    `;
    sidePanel.classList.add("show");
}


// Function to hide the side panel
function hideSidePanel() {
    const sidePanel = document.getElementById("message-side-panel");
    sidePanel.classList.remove("show");
}



// Sample JSON data for notification messages
const notificationData = [
    
    {
        id: 2,
        message: "Your account has been upgraded to premium.",
        author: "Billing Department",
        time: "12:30 PM",
        badge: "Important",
        content: "Congratulations! You now have access to premium features. Enjoy!",
        profilePicture: "billing"
    },
    {
        id: 1,
        message: "Welcome to the SwapiX Team",
        author: "SwapiX Admin",
        time: "Yesterday",
        badge: "Important",
        content: "Thank you for joining our team! We are excited to have you on board.",
        profilePicture: "admin"
    },
    // Add more notification objects as needed
    {
        id: 3,
        message: "Your account password has been changed.",
        author: "Security Team",
        time: "10:00 AM",
        badge: "Normal",
        content: "For security reasons, your account password has been changed. If you didn't request this change, please contact support immediately.",
        profilePicture: "square"
    },
    // Add more notification objects as needed
    {
        id: 4,
        message: "New feature: Dark mode now available!",
        author: "Development Team",
        time: "2 days ago",
        badge: "Normal",
        content: "We've added dark mode to our platform. Check it out in the settings menu!",
        profilePicture: "devteam"
    },
    // Add more notification objects as needed
    {
        id: 5,
        message: "Your subscription has been renewed.",
        author: "Billing Department",
        time: "Last week",
        badge: "Normal",
        content: "Your subscription has been automatically renewed for another month. Thank you for your continued support!",
        profilePicture: "billing"
    },
    // Add more notification objects as needed
];