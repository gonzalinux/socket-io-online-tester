# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm start` - Start development server with webpack-dev-server, opens browser automatically
- `npm run build` - Build production bundle to `dist/` directory

## Architecture Overview

This is a frontend web application built with Webpack and HTML5 Boilerplate. The project uses a simple structure:

- **Entry point**: `js/app.js` (currently empty)
- **Build system**: Webpack with separate dev/prod configurations
- **Development**: Uses webpack-dev-server with hot reload and live reload
- **Production**: Bundles to `dist/` with HTML generation and asset copying

### Build Configuration

- `webpack.common.js` - Shared configuration with entry point and output settings
- `webpack.config.dev.js` - Development configuration with dev server and source maps
- `webpack.config.prod.js` - Production configuration with HTML generation and asset copying via plugins

### Asset Structure

- Static assets (CSS, images, vendor JS) are copied to `dist/` during production build
- HTML5 Boilerplate provides the base styling in `css/style.css`
- `js/vendor/` directory exists for third-party libraries

## Project Status

The project appears to be in initial setup phase - the main `js/app.js` file is empty and HTML contains placeholder content.