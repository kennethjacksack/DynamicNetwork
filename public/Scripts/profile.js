document.addEventListener('DOMContentLoaded', () => {
    const editGraphButton = document.getElementById('edit-graph-button');

    if (editGraphButton) {
        editGraphButton.addEventListener('click', () => {
            // Redirect to GraphEdit.html
            window.location.href = 'GraphEdit.html';
        });
    }
});
