const profilePictureDialog = {
    open: function() {
        const overlay = document.getElementById('profile-picture-overlay');
        const dialog = document.getElementById('profile-picture-dialog');
        overlay.style.display = 'block';
        dialog.style.display = 'block';
    },

    close: function() {
        const overlay = document.getElementById('profile-picture-overlay');
        const dialog = document.getElementById('profile-picture-dialog');
        overlay.style.display = 'none';
        dialog.style.display = 'none';
    },

    save: function() {
        // Add logic to save the profile picture
        // After saving, close the dialog
        this.close();
    },

    cancel: function() {
        // Add logic to cancel the profile picture change
        // After canceling, close the dialog
        this.close();
    }
};

const profilePictureDragDrop = {
    dragOver: function(e) {
        e.preventDefault();
        const container = document.getElementById('profile-picture-drag-drop-container');
        container.classList.add('dragover');
    },

    dragLeave: function(e) {
        e.preventDefault();
        const container = document.getElementById('profile-picture-drag-drop-container');
        container.classList.remove('dragover');
    },

    drop: function(e) {
        e.preventDefault();
        const container = document.getElementById('profile-picture-drag-drop-container');
        container.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        this.previewFile(file);
    },

    fileInputChanged: function() {
        const fileInput = document.getElementById('profile-picture-file-input');
        const file = fileInput.files[0];
        this.previewFile(file);
    },

    previewFile: function(file) {
        const reader = new FileReader();
        reader.onload = function() {
            const previewImage = document.getElementById('profile-picture-preview');
            previewImage.src = reader.result;
            previewImage.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
};
