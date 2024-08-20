// Function to show the create modal
function showCreateModal() {
    document.getElementById('modal').style.display = 'block';
}

// Function to hide the create modal
function closeCreateModal() {
    document.getElementById('modal').style.display = 'none';
}

// Function to show the edit modal
function showEditModal() {
    document.getElementById('editModal').style.display = 'block';
}

// Function to hide the edit modal
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Ensure functions are accessible globally
window.showCreateModal = showCreateModal;
window.closeCreateModal = closeCreateModal;
window.showEditModal = showEditModal;
window.closeEditModal = closeEditModal;

// Event listener for the "Create Node" button
document.getElementById('create-node-btn').addEventListener('click', showCreateModal);

// Event listener for the "Edit Node" button
document.getElementById('edit-node-btn').addEventListener('click', function() {
    if (window.currentNode) {
        // Pre-fill the edit form with the current node's data
        document.getElementById('editName').value = window.currentNode.name;
        document.getElementById('editIndustry').value = window.currentNode.industry;

        showEditModal();
    } else {
        console.error("No node selected for editing.");
    }
});

// Event listener for closing the create modal
document.getElementById('closeModal').addEventListener('click', closeCreateModal);

// Event listener for closing the edit modal
document.getElementById('closeEditModal').addEventListener('click', closeEditModal);
