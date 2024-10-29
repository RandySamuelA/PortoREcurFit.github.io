  
    const removeFriendList = document.getElementById('remove-friend-list');
    const contactsList = document.getElementById('contacts');
    const addContactForm = document.getElementById('add-contact-form');
    const newContactInput = document.getElementById('new-contact-input');
    const lastMessages = {};
    const allMessages = {};
    const friendList = document.getElementById('friend-list');
    const trainerList=document.getElementById('trainer-list');

    function addContact(event) {
      event.preventDefault(); 
      const newContactName = newContactInput.value;
      if (newContactName) {
        const newContact = document.createElement('li');
        newContact.innerHTML = `
          <div class="contact-info">
            <span class="contact-name">${newContactName}</span>
            <span class="last-message">No messages</span>
            <span class="timestamp"></span>
          </div>
        `;
        newContact.onclick = function () {
          const contactIndex = Array.from(contactsList.children).indexOf(newContact);
          selectContact(contactIndex);
        };
        contactsList.appendChild(newContact);

        const newFriend = document.createElement('li');
        newFriend.innerHTML = `
          <div class="friend-info">
            <span class="friend-name">${newContactName}</span>
          </div>
         `;
        friendList.appendChild(newFriend);
        
        const removeFriendItem = document.createElement('li');
        removeFriendItem.innerHTML = `
          <div class="friend-info1">
            <span class="friend-name1">${newContactName}</span>
            <button class="remove-button" onclick="removeFriend(this.parentNode)">Remove</button>
          </div>
        `;
        removeFriendList.appendChild(removeFriendItem);


        
        newContactInput.value = ''; 
      }
    }

    addContactForm.addEventListener('submit', addContact);

    function selectContact(contactIndex) {
      const contactList = document.getElementById('contact-list');
      const chatContainer = document.getElementById('chat-container');

      contactList.style.display = 'block';
      chatContainer.style.display = 'block';

      showChat(contactIndex);
    }

    function showChat(contactIndex) {
  const contactName = contactsList.children[contactIndex].querySelector('.contact-name').textContent;
  document.querySelector('header h3').textContent = contactName;

  const messageBox = document.getElementById('message-box');
  messageBox.innerHTML = '';

  const messages = allMessages[contactName];
  if (messages) {
    messages.forEach(message => {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', message.sender === 'You' ? 'sent' : 'received');

      const messageContent = document.createElement('div');
      messageContent.classList.add('message-content');
      messageContent.textContent = message.content;

      const timestamp = document.createElement('span');
      timestamp.classList.add('timestamp');
      timestamp.textContent = `Sent at: ${message.timestamp}`;

      messageElement.appendChild(messageContent);
      messageElement.appendChild(timestamp);
      messageBox.appendChild(messageElement);
    });
  }

  messageBox.scrollTop = messageBox.scrollHeight;
}


    const messageBox = document.getElementById('message-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
function sendMessage() {
  const message = messageInput.value;
  if (message.trim() !== '') {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'sent');

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');

    const messageText = document.createElement('span');
    messageText.classList.add('text');
    messageText.textContent = message;

    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    timestamp.textContent = timeString;

    messageContent.appendChild(messageText);
    messageElement.appendChild(messageContent);
    messageElement.appendChild(timestamp);
    messageBox.appendChild(messageElement);

    messageInput.value = '';
    messageBox.scrollTop = messageBox.scrollHeight;

    const contactName = document.querySelector('header h3').textContent;
    lastMessages[contactName] = message;

    if (!allMessages[contactName]) {
      allMessages[contactName] = [];
    }
    allMessages[contactName].push({ sender: 'You', content: message, timestamp: timeString });

    const contactElement = Array.from(contactsList.children).find(contact => {
      const contactNameElement = contact.querySelector('.contact-name');
      const trainerNameElement = contact.querySelector('.trainer-name');
      return contactNameElement?.textContent === contactName || trainerNameElement?.textContent === contactName;
    });

    if (contactElement) {
      contactElement.querySelector('.last-message').textContent = message;
      contactElement.querySelector('.timestamp').textContent = timeString;
    } else {
    
      const trainerContactElement = Array.from(trainerList.children).find(contact => {
        const trainerNameElement = contact.querySelector('.trainer-name');
        return trainerNameElement?.textContent === contactName;
      });

      if (trainerContactElement) {
        trainerContactElement.querySelector('.last-message').textContent = message;
        trainerContactElement.querySelector('.timestamp').textContent = timeString;
      }
    }
  }
}




    const menuButton = document.querySelector('.menu-button');
const menuOverlay = document.querySelector('.menu-overlay');

menuButton.addEventListener('click', toggleMenu);


function toggleMenu() {
  menuOverlay.style.display = menuOverlay.style.display === 'block' ? 'none' : 'block';
}
function addd(){
  const comtactList=document.getElementById('contact-list');
  const chatContainer = document.getElementById('chat-container');
  const remo=document.getElementById('remove-friend-section');
  const addFriendSection=document.getElementById('add-friend-section');
  addFriendSection.style.display = 'block';
  comtactList.style.display = 'none';
  chatContainer.style.display = 'none';
  remo.style.display='none';
 
  
}
function removee(){
  const comtactList=document.getElementById('contact-list');
  const remo=document.getElementById('remove-friend-section');

  const chatContainer = document.getElementById('chat-container');
  
  const addFriendSection=document.getElementById('add-friend-section');
  
  addFriendSection.style.display = 'none';
  comtactList.style.display = 'none';
  chatContainer.style.display = 'none';
  remo.style.display='block';
  
}
function chatt(){
  const comtactList=document.getElementById('contact-list');
  const remo=document.getElementById('remove-friend-section');
  const addFriendSection=document.getElementById('add-friend-section');
  
  addFriendSection.style.display = 'none';
  comtactList.style.display = 'block';
  remo.style.display='none';
  
  
}
function removeFriend(friendElement) {
  const friendName = friendElement.querySelector('.friend-name1').innerText;
  if (confirm(`Are you sure you want to remove ${friendName}?`)) {
    friendElement.parentNode.remove();

   
    const contactsList = document.getElementById('contacts');
    const contactItems = contactsList.querySelectorAll('li');
    contactItems.forEach((contactItem) => {
      const contactName = contactItem.querySelector('.contact-name').innerText;
      if (contactName === friendName) {
        contactItem.remove();
      }
    });
    
    const friendList = document.getElementById('friend-list');
    const friendItems = friendList.querySelectorAll('li');
    friendItems.forEach((friendItem) => {
      const friendNameInList = friendItem.querySelector('.friend-name').innerText;
      if (friendNameInList === friendName) {
        friendItem.remove();
      }
    });
  }
}
function selectContact1(contactIndex1) {
      const trainer = document.getElementById('trainer');
      const chatContainer = document.getElementById('chat-container');

      
      trainer.style.display = 'block';
      chatContainer.style.display = 'block';

      
      showChat1(contactIndex1);
    }

function showChat1(contactIndex1) {
  
  const trainerName = trainerList.children[contactIndex1].querySelector('.trainer-name').textContent;
  document.querySelector('header h3').textContent = trainerName;

  const messageBox = document.getElementById('message-box');
  messageBox.innerHTML = '';

  const messages = allMessages[trainerName];
  if (messages) {
    messages.forEach(message => {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', message.sender === 'You' ? 'sent' : 'received');

      const messageContent = document.createElement('div');
      messageContent.classList.add('message-content');
      messageContent.textContent = message.content;

      const timestamp = document.createElement('span');
      timestamp.classList.add('timestamp');
      timestamp.textContent = `Sent at: ${message.timestamp}`;

      messageElement.appendChild(messageContent);
      messageElement.appendChild(timestamp);
      messageBox.appendChild(messageElement);
    });
  }

  messageBox.scrollTop = messageBox.scrollHeight;
}



