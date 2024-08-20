document.addEventListener("DOMContentLoaded", function() {
    const chatMessages = document.getElementById("chat-messages");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");

    // Function to add a message to the chat box
    function addMessage(content, isUser = true) {
        const messageElement = document.createElement("div");
        messageElement.className = `thread-message ${isUser ? "user" : "system"}`;  // Use 'thread-message' class
        messageElement.textContent = content;
        chatMessages.appendChild(messageElement);

        // Scroll to the bottom of the chat box
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Event listener for sending a message
    sendButton.addEventListener("click", function() {
        const messageContent = messageInput.value.trim();  // Get the typed message
        if (messageContent) {
            addMessage(messageContent);  // Add the user's message to the chat
            messageInput.value = "";  // Clear the input field
            messageInput.focus();  // Keep the input field focused for more typing

            // Simulate a system response (you can customize this part)
            setTimeout(() => addMessage("This is a simulated system response.", false), 1000);
        }
    });

    // Allow pressing 'Enter' to send a message
    messageInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();  // Prevent the default form submission
            sendButton.click();  // Trigger the send button click event
        }
    });
});
