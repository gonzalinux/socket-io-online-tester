# 🔌 Socket.IO Online Tester

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌐_Try_It_Live-blue?style=for-the-badge)](https://gonzalinux.github.io/socket-io-online-tester/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE.txt)

**A web-based tool for testing Socket.IO connections in real-time**

**[🚀 Use it now →](https://gonzalinux.github.io/socket-io-online-tester/)**

</div>

## What it does

- Connect to any Socket.IO server
- Listen for events and see them in real-time
- Send events with JSON or plain text data
- View your socket ID for debugging
- Share listener configurations via URL

## Features

✅ **Real-time connection** with status indicators  
✅ **Event listeners** with message counts  
✅ **Send events** with JSON/text toggle  
✅ **Message log** with persistence  
✅ **Socket ID display** for debugging  
✅ **URL sharing** of listener configs  
✅ **Mobile responsive** design  

## How to use

1. Go to **[gonzalinux.github.io/socket-io-online-tester](https://gonzalinux.github.io/socket-io-online-tester/)**
2. Enter your Socket.IO server URL (e.g., `http://localhost:3000`)
3. Click **Connect**
4. Add event listeners and start testing!

## Troubleshooting

**Can't connect to your server?**

Most connection issues are caused by CORS (Cross-Origin Resource Sharing) restrictions. Your Socket.IO server needs to allow connections from the tester domain.

**Solution:** Configure your server to allow all origins:

```javascript
// Node.js Socket.IO server example
const io = require('socket.io')(server, {
  cors: {
    origin: "*",  // Allow all origins for testing
    methods: ["GET", "POST"]
  }
});
```

**Other common issues:**
- ❌ Server not running on the specified port
- ❌ Firewall blocking the connection  
- ❌ HTTPS tester trying to connect to HTTP server (use HTTP URL)
- ❌ Wrong server URL or port number

## Development

```bash
git clone https://github.com/gonzalinux/socket-io-online-tester.git
cd socket-io-online-tester
npm install
npm start  # Development server
npm run build  # Production build
```

## License

MIT - see [LICENSE.txt](LICENSE.txt)

---

Made by [gonzalinux](https://github.com/gonzalinux) with the help of [Claude Code](https://claude.ai/code) • ⭐ Star if useful!