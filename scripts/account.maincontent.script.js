function showSection(id) {
    // Hide all sections
    var sections = document.querySelectorAll('.section');
    sections.forEach(function(section) {
        section.classList.remove('active');
    });

    // Show the specified section
    var sectionToShow = document.getElementById(id);
    sectionToShow.classList.add('active');
}

function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var mainContent = document.getElementById('main-content');

    if (sidebar.style.left === "-250px") {
        sidebar.style.left = "0";
        mainContent.style.paddingLeft = "0";
    } else {
        sidebar.style.left = "-250px";
        mainContent.style.paddingLeft = "250px";
    }
}