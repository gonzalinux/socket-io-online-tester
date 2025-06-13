# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a static web application - no build process required:
- Open `index.html` directly in browser for local testing
- Use local web server for CORS testing: `python -m http.server 8000` or `npx serve`
- Deploy by copying files to web server or GitHub Pages
- Live version: https://gonzalinux.github.io/socket-io-online-tester/

## Architecture Overview

**Static Frontend Application** - Pure HTML/CSS/JavaScript Socket.IO client tester deployed to GitHub Pages at: https://gonzalinux.github.io/socket-io-online-tester/

### Core Structure
- **Single-page application** with vanilla JavaScript (no frameworks)
- **Socket.IO v4.8.1** client loaded via CDN
- **Procedural JavaScript** with global variables and functions (not classes)
- **Event-driven architecture** for real-time Socket.IO communication

### Key Components

**Connection Management (`js/app.js:71-110`)**
- `connect()` - Establishes Socket.IO connection
- `attachSocketListeners()` - Sets up event handlers for connection events
- `updateConnectionStatus()` - Updates UI connection indicators
- `updateSocketId()` / `hideSocketId()` - Shows/hides socket ID for debugging

**Event System (`js/app.js:233-290`)**
- `activeListeners` Map - Tracks added event listeners with message counts
- `listenerOrder` array - Maintains newest-first display order for custom listeners  
- `addListener()` - Dynamically adds event listeners to both UI and socket
- Built-in listeners for `connect`, `disconnect`, `connect_error` events

**Message System (`js/app.js:374-448`)**
- `logMessage()` - Adds messages to both log array and DOM (newest first)
- `messageLog` array - In-memory message storage
- `renderNewMessage()` - Inserts new messages at top of log
- `renderAllMessages()` - Renders saved messages on page load

**Persistence (`js/app.js:80-138`)**
- **localStorage** - Message log persistence across sessions
- **URL query params** - Event listener sharing via `?listeners=event1,event2`
- `loadFromStorage()` / `saveMessagesToStorage()` - Message persistence
- `loadListenersFromURL()` / `updateURLWithListeners()` - URL-based configuration

### Data Flow
1. User connects to Socket.IO server
2. Add event listeners dynamically (stored in URL params)
3. Receive events → increment counters → log messages (newest first)
4. Send events with JSON/text toggle
5. Messages persist in localStorage, listeners in URL for sharing

### UI Layout
- **Connection section** - Full width with URL input, connect/disconnect buttons, status, socket ID
- **Event management** - Two columns: listeners (left) + send events (right)  
- **Message log** - Full width terminal-style display with newest messages on top
- **Responsive design** - CSS Grid with mobile-first approach

### Key Features
- **Socket ID Display** - Shows current socket ID for debugging room assignments
- **JSON/Text Toggle** - Send events as JSON objects or plain text strings
- **Message Persistence** - All messages saved to localStorage across sessions
- **URL Configuration Sharing** - Share listener setups via URL query parameters
- **Newest-First Ordering** - Messages and listeners display with most recent on top
- **Scrollable Lists** - Event listeners list becomes scrollable after 5 items

### Troubleshooting Notes
Most connection failures are CORS-related. Socket.IO servers need `cors: { origin: "*" }` to allow connections from GitHub Pages domain.

### Code Style Notes
- Uses **procedural JavaScript** with global variables (not classes or modules)
- **Defer attribute** on script tag ensures DOM is loaded before JS execution
- **Event delegation** pattern for dynamic UI elements
- **CSS Grid** for responsive layout with mobile-first approach