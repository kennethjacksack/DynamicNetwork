document.addEventListener('DOMContentLoaded', () => {
    // Get references to the sidebar container and toggle button
    const sidebarContainer = document.querySelector('.sidebar-container');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');

    // Set initial state to collapsed
    sidebarContainer.classList.add('collapsed');

    // Add an event listener to the toggle button
    sidebarToggleBtn.addEventListener('click', () => {
        // Toggle the 'collapsed' class on the sidebar container
        console.log('Sidebar toggle button clicked');
        if (sidebarContainer.classList.contains('collapsed')) {
            sidebarContainer.classList.remove('collapsed');
            sidebarContainer.classList.add('expanded');
        } else {
            sidebarContainer.classList.remove('expanded');
            sidebarContainer.classList.add('collapsed');
        }
    });
});
