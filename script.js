/**
 * Digital Literacy Campaign Chatbot UI
 * Front-end implementation for a Dialogflow-powered chatbot
 */

// DOM Elements
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const typingIndicator = document.getElementById('typing-indicator');

// Chatbot State
const chatbotState = {
  isOpen: false,
  messages: [],
  isTyping: false
};

// Event Listeners
chatToggle.addEventListener('click', toggleChat);
chatClose.addEventListener('click', closeChat);
chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Initialize the chatbot
initChatbot();

/**
 * Initialize the chatbot
 */
function initChatbot() {
  // Set up any initial state or configurations
  console.log('Chatbot initialized');
}

/**
 * Toggle the chat window open/closed
 */
function toggleChat() {
  chatbotState.isOpen = !chatbotState.isOpen;
  
  if (chatbotState.isOpen) {
    openChat();
  } else {
    closeChat();
  }
}

/**
 * Open the chat window and show welcome message if it's the first time
 */
function openChat() {
  chatbotState.isOpen = true;
  chatWindow.classList.remove('hidden');
  chatInput.focus();
  
  // Show welcome message if this is the first time opening
  if (chatbotState.messages.length === 0) {
    setTimeout(() => {
      showTypingIndicator();
      
      setTimeout(() => {
        hideTypingIndicator();
        addBotMessage('Hello! Welcome to the Digital Literacy Campaign. How can I help you today?');
      }, 1500);
    }, 500);
  }
}

/**
 * Close the chat window
 */
function closeChat() {
  chatbotState.isOpen = false;
  chatWindow.classList.add('hidden');
}

/**
 * Send a user message
 */
function sendMessage() {
  const userMessage = chatInput.value.trim();
  
  if (userMessage === '') {
    return;
  }
  
  // Add user message to the chat
  addUserMessage(userMessage);
  
  // Clear input
  chatInput.value = '';
  
  // Show typing indicator
  showTypingIndicator();
  
  // Generate bot response (with simulated delay)
  setTimeout(() => {
    generateBotResponse(userMessage);
  }, 1000 + Math.random() * 1000);
}

/**
 * Generate a bot response based on the user message
 * @param {string} userMessage - The message from the user
 */
function generateBotResponse(userMessage) {
  // Simple keyword-based response system (placeholder for Dialogflow)
  const lowercaseMessage = userMessage.toLowerCase();
  let botResponse = '';
  
  if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
    botResponse = 'Hello there! How can I assist you with digital literacy today?';
  } else if (lowercaseMessage.includes('digital literacy')) {
    botResponse = 'Digital literacy refers to the skills and knowledge required to use digital devices and navigate online information effectively and safely.';
  } else if (lowercaseMessage.includes('course') || lowercaseMessage.includes('learn')) {
    botResponse = 'We offer various courses on digital skills including basic computer skills, internet safety, online research, and social media literacy. Which topic interests you most?';
  } else if (lowercaseMessage.includes('privacy') || lowercaseMessage.includes('security')) {
    botResponse = 'Online privacy and security are crucial. Some basic tips include using strong passwords, enabling two-factor authentication, being careful about sharing personal information, and keeping your software updated.';
  } else if (lowercaseMessage.includes('fake news') || lowercaseMessage.includes('misinformation')) {
    botResponse = 'To identify misinformation, verify the source, check multiple reliable sources, look for citations, be skeptical of sensational claims, and use fact-checking websites.';
  } else if (lowercaseMessage.includes('thank')) {
    botResponse = 'You\'re welcome! Is there anything else I can help you with?';
  } else if (lowercaseMessage.includes('bye') || lowercaseMessage.includes('goodbye')) {
    botResponse = 'Goodbye! Feel free to return if you have more questions about digital literacy.';
  } else {
    botResponse = 'That\'s an interesting question about digital literacy. Would you like to know more about our courses, online safety, or fact-checking techniques?';
  }
  
  // Hide typing indicator and add bot message
  hideTypingIndicator();
  addBotMessage(botResponse);
}

/**
 * Add a user message to the chat
 * @param {string} message - The message from the user
 */
function addUserMessage(message) {
  const messageObj = {
    id: Date.now().toString(),
    type: 'user',
    text: message,
    timestamp: new Date()
  };
  
  chatbotState.messages.push(messageObj);
  renderMessage(messageObj);
  scrollToBottom();
}

/**
 * Add a bot message to the chat
 * @param {string} message - The message from the bot
 */
function addBotMessage(message) {
  const messageObj = {
    id: Date.now().toString(),
    type: 'bot',
    text: message,
    timestamp: new Date()
  };
  
  chatbotState.messages.push(messageObj);
  renderMessage(messageObj);
  scrollToBottom();
}

/**
 * Render a message in the chat window
 * @param {Object} messageObj - The message object
 */
function renderMessage(messageObj) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', messageObj.type);
  
  const messageText = document.createElement('div');
  messageText.classList.add('message-text');
  messageText.textContent = messageObj.text;
  
  const messageTime = document.createElement('span');
  messageTime.classList.add('message-time');
  messageTime.textContent = formatTimestamp(messageObj.timestamp);
  
  messageElement.appendChild(messageText);
  messageElement.appendChild(messageTime);
  
  chatMessages.appendChild(messageElement);
}

/**
 * Format a timestamp to a readable time string
 * @param {Date} date - The timestamp to format
 * @returns {string} The formatted time string
 */
function formatTimestamp(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Show the typing indicator
 */
function showTypingIndicator() {
  chatbotState.isTyping = true;
  typingIndicator.classList.remove('hidden');
  scrollToBottom();
}

/**
 * Hide the typing indicator
 */
function hideTypingIndicator() {
  chatbotState.isTyping = false;
  typingIndicator.classList.add('hidden');
}

/**
 * Scroll the chat messages to the bottom
 */
function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}