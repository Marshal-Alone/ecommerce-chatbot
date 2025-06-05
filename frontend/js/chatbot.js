/**
 * E-Commerce Chatbot JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-btn');
    const resetButton = document.getElementById('reset-chat');
    const loadingOverlay = document.getElementById('loading-overlay');
    
    // Chat history for context
    let chatHistory = [];
    
    // Initialize the chat
    function initChat() {
        // Add welcome message
        const welcomeMessage = {
            sender: 'bot',
            text: "Hello! I'm E-Bot, your shopping assistant. How can I help you today?",
            timestamp: new Date()
        };
        
        displayMessage(welcomeMessage);
        chatHistory.push(welcomeMessage);
        
        // Focus on input field
        userInput.focus();
    }
    
    // Display a message in the chat area
    function displayMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${message.sender}-message`);
        
        // Format timestamp
        const formattedTime = formatTimestamp(message.timestamp);
        
        // Create message content
        messageElement.innerHTML = `
            <div class="message-content">${message.text}</div>
            <div class="message-timestamp">${formattedTime}</div>
        `;
        
        // Add to chat container
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom of chat
        scrollToBottom();
    }
    
    // Format timestamp to readable time
    function formatTimestamp(timestamp) {
        if (!(timestamp instanceof Date)) {
            timestamp = new Date(timestamp);
        }
        
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Scroll chat to bottom
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Send message to backend API
    async function sendMessage() {
        const text = userInput.value.trim();
        
        // Don't send empty messages
        if (!text) return;
        
        // Create user message object
        const userMessage = {
            sender: 'user',
            text: text,
            timestamp: new Date()
        };
        
        // Display user message
        displayMessage(userMessage);
        
        // Add to history
        chatHistory.push(userMessage);
        
        // Clear input field
        userInput.value = '';
        

        
        try {
            // Call API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: text,
                    history: chatHistory
                })
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            

            
            // Create bot message
            const botMessage = {
                sender: 'bot',
                text: data.message || "Sorry, I didn't understand that.",
                timestamp: new Date()
            };
            
            // Display bot message
            displayMessage(botMessage);
            
            // Add to history
            chatHistory.push(botMessage);
            
        } catch (error) {
            console.error('Error:', error);
            

            
            // Display error message
            const errorMessage = {
                sender: 'bot',
                text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
                timestamp: new Date()
            };
            
            displayMessage(errorMessage);
        }
    }
    

    
    // Reset the chat
    function resetChat() {
        // Clear chat history
        chatHistory = [];
        
        // Clear chat messages
        chatMessages.innerHTML = '';
        
        // Reinitialize chat
        initChat();
    }
    
    // Show loading overlay
    function showLoading() {
        loadingOverlay.classList.add('active');
    }
    
    // Hide loading overlay
    function hideLoading() {
        loadingOverlay.classList.remove('active');
    }
    
    // Event Listeners
    
    // Send button click
    sendButton.addEventListener('click', () => {
        sendMessage();
    });
    
    // Enter key in input field
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Reset button click
    resetButton.addEventListener('click', () => {
        resetChat();
    });
    
    // Initialize chat on page load
    initChat();
});
