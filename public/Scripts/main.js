document.addEventListener('DOMContentLoaded', function() {
    // Variable to hold the current node data when editing
    let currentNode = null;

    // Expose currentNode to the global scope
    window.currentNode = currentNode;

    // Function to handle the creation of a new node
    document.getElementById('nodeForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get the input values
        const name = document.getElementById('name').value;
        const industry = document.getElementById('industry').value;

        // Call the function to add a node with the provided name and industry
        if (typeof addNode === 'function') {
            const newNode = addNode(name, industry);

            // Check if newNode has valid properties
            if (newNode && newNode.name && newNode.industry) {
                // Store the newly created node's data for editing
                window.currentNode = newNode;

                // After creating the node, show the edit button and hide the create button
                document.getElementById('create-node-btn').style.display = 'none';
                document.getElementById('edit-node-btn').style.display = 'inline-block';
            } else {
                console.error('Invalid node data:', newNode);
            }
        } else {
            console.error('addNode function is not defined.');
        }

        // Hide the create modal
        closeCreateModal();

        // Clear the form
        document.getElementById('nodeForm').reset();
    });

    // Function to handle the editing of an existing node
    document.getElementById('editNodeForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get the input values from the edit modal
        const name = document.getElementById('editName').value;
        const industry = document.getElementById('editIndustry').value;

        if (window.currentNode) {
            // Update the current node's data
            window.currentNode.name = name;
            window.currentNode.industry = industry;

            // Ensure currentNode has a valid id
            if (!window.currentNode.id) {
                console.error("Current node has no ID:", window.currentNode);
                return;
            }

            // Call the function to update the node with new data
            if (typeof editNode === 'function') {
                editNode(window.currentNode);
            } else {
                console.error("editNode function not found.");
            }

            // Hide the edit modal
            closeEditModal();

            // Clear the form
            document.getElementById('editNodeForm').reset();
        } else {
            console.error("No node selected for editing.");
        }
    });

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
});
