const chatBox = document.getElementById('chat-box');
const nameInput = document.getElementById('name-input');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Replace '192.168.1.100' with the IP address of the machine running the WebSocket server
// const socket = new WebSocket('ws://192.168.43.150:8080');
const socket = new WebSocket('ws://172.20.10.10:8080');

socket.onopen = () => {
    console.log('Connected to the server');
};

socket.onmessage = (event) => {
    const { name, message } = JSON.parse(event.data);
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${name}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
};

sendButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    if (name && message) {
        socket.send(JSON.stringify({ name, message }));
        messageInput.value = '';
    } else {
        alert('Please enter your name and a message.');
    }
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});
