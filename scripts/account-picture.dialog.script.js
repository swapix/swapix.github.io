// Function to open the profile picture change dialog
function openProfilePictureDialog() {
    var dialog = document.getElementById('profilePictureDialog');
    var overlay = document.getElementById('modal-overlay');
    overlay.style.display = 'block';
    var overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    dialog.style.display = 'block';
}

// Function to close the profile picture change dialog
function cancelProfilePictureChange() {
    var dialog = document.getElementById('profilePictureDialog');
    var overlay = document.getElementById('modal-overlay');
    overlay.style.display = 'none';
    dialog.style.display = 'none';
    overlay.parentNode.removeChild(overlay);
}

// Function to preview the selected profile picture
function previewProfilePicture(event) {
    var previewContainer = document.getElementById('previewContainer');
    
    previewContainer.innerHTML = '';
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function() {
        var img = document.createElement('img');
        img.src = reader.result;
        img.style.maxWidth = '200px'; // Adjust preview image size as needed
        previewContainer.appendChild(img);
    }
    if (file) {
        reader.readAsDataURL(file);
    }
}

// Function to save the selected profile picture (dummy function)
function saveProfilePicture() {
    // Add your logic to save the selected profile picture here
    cancelProfilePictureChange();
}
