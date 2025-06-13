// Socket.IO Tester - Global Variables
let socket = null;
let activeListeners = new Map();
let listenerOrder = []; // Track insertion order for custom listeners
let messageLog = [];

// Storage keys
const STORAGE_KEYS = {
  MESSAGES: 'socketio-tester-messages',
  LISTENERS: 'socketio-tester-listeners'
};

// DOM Elements
let socketUrlInput, connectBtn, disconnectBtn, connectionStatus;
let eventNameInput, addListenerBtn, activeListenersList;
let emitEventNameInput, emitDataInput, emitBtn, dataIsJsonCheckbox;
let messagesLog, clearMessagesBtn;

// Initialize the application
function init() {
  initializeElements();
  attachEventListeners();
  loadFromStorage();
  loadListenersFromURL();
  addBuiltInListeners();
}

function initializeElements() {
  socketUrlInput = document.getElementById('socket-url');
  connectBtn = document.getElementById('connect-btn');
  disconnectBtn = document.getElementById('disconnect-btn');
  connectionStatus = document.getElementById('connection-status');
  
  eventNameInput = document.getElementById('event-name');
  addListenerBtn = document.getElementById('add-listener-btn');
  activeListenersList = document.getElementById('active-listeners');
  
  emitEventNameInput = document.getElementById('emit-event-name');
  emitDataInput = document.getElementById('emit-data');
  emitBtn = document.getElementById('emit-btn');
  dataIsJsonCheckbox = document.getElementById('data-is-json');
  
  messagesLog = document.getElementById('messages-log');
  clearMessagesBtn = document.getElementById('clear-messages-btn');
}

function attachEventListeners() {
  connectBtn.addEventListener('click', connect);
  disconnectBtn.addEventListener('click', disconnect);
  
  addListenerBtn.addEventListener('click', addListener);
  eventNameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addListener();
  });
  
  emitBtn.addEventListener('click', emitEvent);
  emitEventNameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) emitEvent();
  });
  
  clearMessagesBtn.addEventListener('click', clearMessages);
  
  socketUrlInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') connect();
  });
  
  dataIsJsonCheckbox.addEventListener('change', function() {
    updateDataPlaceholder();
  });
}

function updateDataPlaceholder() {
  if (dataIsJsonCheckbox.checked) {
    emitDataInput.placeholder = '{"message": "Hello World"}';
  } else {
    emitDataInput.placeholder = 'Hello World';
  }
}

// Storage and URL management functions
function loadFromStorage() {
  try {
    const savedMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    if (savedMessages) {
      messageLog = JSON.parse(savedMessages);
      renderAllMessages();
    }
  } catch (error) {
    console.error('Error loading messages from storage:', error);
  }
}

function saveMessagesToStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messageLog));
  } catch (error) {
    console.error('Error saving messages to storage:', error);
  }
}

function loadListenersFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const listenersParam = urlParams.get('listeners');
  
  if (listenersParam) {
    try {
      const listenerNames = listenersParam.split(',').map(name => name.trim()).filter(name => name);
      listenerNames.forEach(function(eventName) {
        if (!activeListeners.has(eventName) && eventName !== 'connect' && eventName !== 'disconnect' && eventName !== 'connect_error') {
          activeListeners.set(eventName, { count: 0, isBuiltIn: false });
          listenerOrder.push(eventName);
        }
      });
      updateListenersList();
    } catch (error) {
      console.error('Error loading listeners from URL:', error);
    }
  }
}

function updateURLWithListeners() {
  const customListeners = [];
  activeListeners.forEach(function(listenerInfo, eventName) {
    if (!listenerInfo.isBuiltIn) {
      customListeners.push(eventName);
    }
  });
  
  const url = new URL(window.location);
  if (customListeners.length > 0) {
    url.searchParams.set('listeners', customListeners.join(','));
  } else {
    url.searchParams.delete('listeners');
  }
  
  window.history.replaceState({}, '', url);
}

function addBuiltInListeners() {
  addBuiltInListener('connect');
  addBuiltInListener('disconnect');
  addBuiltInListener('connect_error');
}

function addBuiltInListener(eventName) {
  if (!activeListeners.has(eventName)) {
    activeListeners.set(eventName, { count: 0, isBuiltIn: true });
    updateListenersList();
  }
}

function connect() {
  const url = socketUrlInput.value.trim() || 'http://localhost:8080';
  
  if (socket) {
    disconnect();
  }

  updateConnectionStatus('connecting');
  logMessage('system', 'Connecting to ' + url);

  try {
    socket = io(url);
    attachSocketListeners();
  } catch (error) {
    logMessage('error', 'Connection failed: ' + error.message);
    updateConnectionStatus('disconnected');
  }
}

function disconnect() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
  updateConnectionStatus('disconnected');
  logMessage('system', 'Disconnected from server');
}

function attachSocketListeners() {
  if (!socket) return;

  // Handle connection status events
  socket.on('connect', function() {
    updateConnectionStatus('connected');
  });
  
  socket.on('disconnect', function() {
    updateConnectionStatus('disconnected');
  });
  
  socket.on('connect_error', function(error) {
    updateConnectionStatus('disconnected');
  });

  // Attach all other listeners
  activeListeners.forEach(function(listenerInfo, eventName) {
    socket.on(eventName, function(data) {
      listenerInfo.count++;
      updateListenersList();
      logMessage(eventName, data);
    });
  });
}

function updateConnectionStatus(status) {
  connectionStatus.className = 'status-indicator ' + status;
  connectionStatus.textContent = status.charAt(0).toUpperCase() + status.slice(1);
  
  connectBtn.disabled = status === 'connected' || status === 'connecting';
  disconnectBtn.disabled = status === 'disconnected';
}

function addListener() {
  const eventName = eventNameInput.value.trim();
  
  if (!eventName) {
    alert('Please enter an event name');
    return;
  }

  if (activeListeners.has(eventName)) {
    alert('Listener for "' + eventName + '" already exists');
    return;
  }

  activeListeners.set(eventName, { count: 0, isBuiltIn: false });
  listenerOrder.unshift(eventName); // Add to beginning for newest-first ordering
  
  if (socket) {
    socket.on(eventName, function(data) {
      const listenerInfo = activeListeners.get(eventName);
      if (listenerInfo) {
        listenerInfo.count++;
        updateListenersList();
      }
      logMessage(eventName, data);
    });
  }

  updateListenersList();
  updateURLWithListeners();
  eventNameInput.value = '';
  logMessage('system', 'Added listener for "' + eventName + '"');
}

function removeListener(eventName) {
  if (activeListeners.has(eventName)) {
    const listenerInfo = activeListeners.get(eventName);
    
    if (listenerInfo.isBuiltIn) {
      alert('Cannot remove built-in listeners');
      return;
    }

    activeListeners.delete(eventName);
    listenerOrder = listenerOrder.filter(name => name !== eventName);
    
    if (socket) {
      socket.off(eventName);
    }
    
    updateListenersList();
    updateURLWithListeners();
    logMessage('system', 'Removed listener for "' + eventName + '"');
  }
}

function updateListenersList() {
  activeListenersList.innerHTML = '';
  
  // Create ordered list: custom listeners first (in order), then built-in listeners
  const orderedListeners = [];
  
  // Add custom listeners in order (newest first)
  listenerOrder.forEach(function(eventName) {
    if (activeListeners.has(eventName)) {
      orderedListeners.push([eventName, activeListeners.get(eventName)]);
    }
  });
  
  // Add built-in listeners
  activeListeners.forEach(function(listenerInfo, eventName) {
    if (listenerInfo.isBuiltIn) {
      orderedListeners.push([eventName, listenerInfo]);
    }
  });
  
  orderedListeners.forEach(function([eventName, listenerInfo]) {
    const li = document.createElement('li');
    li.className = 'listener-item';
    
    const nameSpan = document.createElement('span');
    nameSpan.className = 'listener-name';
    nameSpan.textContent = eventName;
    
    const rightSection = document.createElement('div');
    rightSection.style.display = 'flex';
    rightSection.style.alignItems = 'center';
    
    const countSpan = document.createElement('span');
    countSpan.className = 'listener-count';
    countSpan.textContent = listenerInfo.count.toString();
    
    rightSection.appendChild(countSpan);
    
    if (!listenerInfo.isBuiltIn) {
      const removeBtn = document.createElement('button');
      removeBtn.className = 'btn btn-danger';
      removeBtn.style.padding = '4px 8px';
      removeBtn.style.fontSize = '12px';
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', function() {
        removeListener(eventName);
      });
      rightSection.appendChild(removeBtn);
    }
    
    li.appendChild(nameSpan);
    li.appendChild(rightSection);
    activeListenersList.appendChild(li);
  });
}

function emitEvent() {
  if (!socket || !socket.connected) {
    alert('Not connected to server');
    return;
  }

  const eventName = emitEventNameInput.value.trim();
  const dataText = emitDataInput.value.trim();
  
  if (!eventName) {
    alert('Please enter an event name');
    return;
  }

  let data;
  if (dataText) {
    if (dataIsJsonCheckbox.checked) {
      try {
        data = JSON.parse(dataText);
      } catch (error) {
        alert('Invalid JSON data: ' + error.message);
        return;
      }
    } else {
      data = dataText;
    }
  } else {
    data = null;
  }

  socket.emit(eventName, data);
  logMessage('emit', { event: eventName, data: data });
  
  emitEventNameInput.value = '';
  emitDataInput.value = '';
}

function logMessage(type, data) {
  const timestamp = new Date().toLocaleTimeString();
  const message = {
    timestamp: timestamp,
    type: type,
    data: data
  };
  
  messageLog.push(message);
  renderNewMessage(message);
  saveMessagesToStorage();
}

function renderAllMessages() {
  messagesLog.innerHTML = '';
  // Render messages in reverse order (newest first)
  for (let i = messageLog.length - 1; i >= 0; i--) {
    renderMessage(messageLog[i]);
  }
}

function renderNewMessage(message) {
  // Insert new message at the top
  const messageDiv = createMessageElement(message);
  messagesLog.insertBefore(messageDiv, messagesLog.firstChild);
}

function renderMessage(message) {
  const messageDiv = createMessageElement(message);
  messagesLog.appendChild(messageDiv);
}

function createMessageElement(message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message-item';
  
  const timestampDiv = document.createElement('div');
  timestampDiv.className = 'message-timestamp';
  timestampDiv.textContent = message.timestamp;
  
  const eventDiv = document.createElement('div');
  eventDiv.className = 'message-event ' + getMessageClass(message.type);
  
  if (message.type === 'emit') {
    eventDiv.textContent = 'EMIT: ' + message.data.event;
  } else if (message.type === 'system') {
    eventDiv.textContent = 'SYSTEM';
  } else if (message.type === 'error') {
    eventDiv.textContent = 'ERROR';
  } else {
    eventDiv.textContent = 'EVENT: ' + message.type;
  }
  
  const dataDiv = document.createElement('div');
  dataDiv.className = 'message-data ' + getMessageClass(message.type);
  
  if (message.type === 'emit') {
    dataDiv.textContent = JSON.stringify(message.data.data, null, 2);
  } else if (typeof message.data === 'object') {
    dataDiv.textContent = JSON.stringify(message.data, null, 2);
  } else {
    dataDiv.textContent = message.data;
  }
  
  messageDiv.appendChild(timestampDiv);
  messageDiv.appendChild(eventDiv);
  messageDiv.appendChild(dataDiv);
  
  return messageDiv;
}

function getMessageClass(type) {
  if (type === 'system') return 'message-system';
  if (type === 'error' || type === 'connect_error') return 'message-error';
  return '';
}

function clearMessages() {
  messageLog = [];
  messagesLog.innerHTML = '';
  localStorage.removeItem(STORAGE_KEYS.MESSAGES);
  logMessage('system', 'Messages cleared');
}

// Initialize when DOM is ready
init();