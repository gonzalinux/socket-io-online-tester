# 🔌 Socket.IO Online Tester

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-blue?style=for-the-badge)](https://gonzalinux.github.io/socket-io-online-tester/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE.txt)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-v4.8.1-black?style=for-the-badge&logo=socket.io)](https://socket.io/)

**A beautiful, modern web-based tool for testing Socket.IO connections, listening to events, and emitting messages in real-time.**

[🚀 **Try it Live**](https://gonzalinux.github.io/socket-io-online-tester/) | [📖 Features](#-features) | [🛠️ Usage](#️-usage) | [⚡ Quick Start](#-quick-start)

</div>

---

## ✨ Features

### 🔗 **Connection Management**
- Connect to any Socket.IO server with custom URLs
- Real-time connection status indicators
- **Socket ID display** for debugging and room management
- Auto-reconnection handling

### 👂 **Event Listening** 
- Add custom event listeners dynamically
- Built-in listeners for connection events
- **Message counter** for each event type
- **Newest-first ordering** with scrollable list
- Remove listeners with one click

### 📤 **Event Emission**
- Send events with custom names
- **JSON or plain text data** with toggle selector
- Real-time validation and error handling
- Clear, intuitive interface

### 💾 **Persistence & Sharing**
- **Message log persisted** in localStorage
- **URL-based listener sharing** via query parameters
- Share configurations with teammates instantly
- Cross-session state management

### 🎨 **Modern UI/UX**
- Beautiful gradient design
- Fully responsive (desktop & mobile)
- Real-time terminal-style message log
- **PWA support** - install as desktop app
- Dark theme message console

---

## 🌐 Live Demo

**Try it now:** [https://gonzalinux.github.io/socket-io-online-tester/](https://gonzalinux.github.io/socket-io-online-tester/)

No installation required! Works directly in your browser.

---

## 🛠️ Usage

### Basic Connection
1. Enter your Socket.IO server URL (defaults to `http://localhost:8080`)
2. Click **Connect** 
3. Watch the status indicator turn green and see your socket ID

### Adding Event Listeners
1. Type an event name (e.g., `message`, `notification`, `userJoined`)
2. Click **Add Listener**
3. Events appear at the top, with message counts
4. Remove custom listeners anytime

### Sending Events
1. Enter event name
2. Toggle **"Send as JSON"** if needed
3. Type your data (JSON object or plain text)
4. Click **Send Event**

### Sharing Configurations
- **URL sharing**: Add listeners, then share the URL - they'll be automatically loaded
- **Example**: `?listeners=message,notification,userJoined`

---

## ⚡ Quick Start

### For Testing Your Socket.IO Server

```bash
# 1. Start your Socket.IO server (example)
node server.js  # Running on localhost:8080

# 2. Open the tester
# Visit: https://gonzalinux.github.io/socket-io-online-tester/

# 3. Connect and test!
# - URL: http://localhost:8080
# - Add listeners for your events
# - Send test events to your server
```

### For Development

```bash
# Clone and run locally
git clone https://github.com/gonzalinux/socket-io-online-tester.git
cd socket-io-online-tester

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

---

## 🎯 Use Cases

- **🔧 Development**: Test Socket.IO servers during development
- **🐛 Debugging**: Monitor real-time events and room broadcasts  
- **📚 Learning**: Understand Socket.IO concepts hands-on
- **🚀 Demos**: Showcase real-time features to clients/teams
- **🔍 Troubleshooting**: Debug connection issues and event flows

---

## 🏗️ Technical Details

### Built With
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Real-time**: Socket.IO Client v4.8.1
- **Build**: Webpack 5 with dev/prod configurations
- **Styling**: Modern CSS (Grid, Flexbox, Custom Properties)
- **PWA**: Web App Manifest for installable experience

### Browser Support
- ✅ Modern browsers with ES6+ support
- ✅ Mobile responsive design
- ✅ PWA installable on desktop & mobile

### Key Features
- 📱 **Mobile-first** responsive design
- 🔄 **Real-time** event handling
- 💾 **Persistent** message history
- 🔗 **Shareable** listener configurations
- 🎨 **Modern** UI with glassmorphism effects

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Ideas for Contributions
- 🏠 **Room management**: Join/leave rooms explicitly
- 📊 **Analytics**: Connection stats and event metrics
- 🎛️ **Advanced options**: Custom headers, auth tokens
- 📋 **Export**: Save message logs to files
- 🌍 **i18n**: Multiple language support

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.

---

## 🙏 Acknowledgments

- [Socket.IO](https://socket.io/) for the amazing real-time library
- [HTML5 Boilerplate](https://html5boilerplate.com/) for the foundation
- The open-source community for inspiration and tools

---

<div align="center">

**Made with ❤️ by [gonzalinux](https://github.com/gonzalinux)**

⭐ **Star this repo** if you find it useful!

[🌐 **Live Demo**](https://gonzalinux.github.io/socket-io-online-tester/) • [🐛 **Report Bug**](https://github.com/gonzalinux/socket-io-online-tester/issues) • [💡 **Request Feature**](https://github.com/gonzalinux/socket-io-online-tester/issues)

</div>