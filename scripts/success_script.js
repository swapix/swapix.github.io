document.addEventListener('DOMContentLoaded', function() {
document.getElementById('professional-checkmark').style.display = 'block';
    console.log("Succeded Contacting!")
    setTimeout(function() {
    window.location.href = "/";
    }, 3000);
});

var professionalCheckbox = document.querySelector('#professional');
var professionalInput = document.querySelector('#professional-input');

if (localStorage.getItem('isProfessional') === null) {
    localStorage.setItem('isProfessional','false');
}
