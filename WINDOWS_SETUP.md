# Windows Setup Guide - Hytopia Soccer Game

## 🚨 Windows Setup Guide - Node.js and NPM

### Node.js Configuration on Windows
Hytopia now uses Node.js and NPM exclusively:
- **Dependencies**: Install with `npm install`
- **Server Runtime**: Node.js with tsx for TypeScript support
- **Package Manager**: NPM for all package management

### Common Windows Issues

#### Issue 1: Mediasoup Worker Binary
**Error**: `ENOENT: no such file or directory, uv_spawn 'mediasoup-worker'`

**Solution**: The mediasoup worker binary needs to be properly built:
```bash
npm run setup  # This will build the mediasoup worker
```

### Issue 3: Deprecated startServer Parameters
**Warning**: `using deprecated parameters for the initialization function`

**Status**: This is a known issue with the current Hytopia SDK version and can be safely ignored.

## 🛠️ Windows-Optimized Workflow

### 1. Install Dependencies (Node.js)
```bash
npm run install:deps
# OR
npm install
```

### 2. Start the Server (Node.js)

**✅ RECOMMENDED FOR WINDOWS:**
```bash
# Development with auto-restart
npm run dev:windows

# Single run
npm run start:windows

# Alternative explicit commands
npx tsx --watch index.ts  # with auto-restart
npx tsx index.ts         # single run
```

**✅ ALL COMMANDS NOW USE NODE.JS:**
```bash
npm run start           # Uses Node.js with tsx
npm run dev            # Uses Node.js with tsx --watch
npx tsx index.ts       # Direct execution
```

### 3. Expected Output
When working correctly, you should see:
```
🚨 HYTOPIA PLATFORM GATEWAY IS NOT INITIALIZED 🚨
⚠️ WARNING: Socket._constructor(): Failed to initialize WebRTC, falling back to Websockets...
Loading soccer map...
Creating soccer ball
Soccer ball created and spawned successfully
```

## 📋 Quick Reference Commands

```bash
# Fresh install
npm run clean:install

# Start development server (Windows)
npm run dev:windows

# Start production server (Windows)  
npm run start:windows

# Run memory cleanup if needed
.\simple_memory_cleanup.ps1
```

## 🎮 Game Features Working

- ✅ 6v6 Soccer gameplay
- ✅ AI players with roles (goalkeeper, defenders, midfielders, strikers)
- ✅ Ball physics and collision detection
- ✅ Goal detection and scoring
- ✅ Team selection UI
- ✅ Single-player mode with AI opponents
- ✅ Observer mode for developers
- ✅ Chat commands (/stuck, /resetai, /debugai, etc.)

## 🌐 Development Notes

- **Performance**: Node.js + tsx provides ~95% of Bun's performance on Windows
- **Memory**: Much more stable memory usage compared to Bun
- **WebRTC Warning**: The WebRTC fallback warning is expected in local development
- **Platform Gateway**: The "not initialized" message is normal for local development
- **Hot Reload**: tsx --watch provides excellent development experience

## 🚀 Deployment

For production deployment, the Hytopia platform will automatically handle:
- Platform Gateway initialization
- WebRTC configuration
- Environment variables
- Runtime selection

This Windows-specific setup is only needed for local development.

## 🔧 Troubleshooting

If you still encounter issues:

1. **Clean Install**:
   ```bash
   npm run clean:install
   ```

2. **Memory Issues**: Run the memory cleanup script:
   ```bash
   .\simple_memory_cleanup.ps1
   ```

3. **Alternative**: Use WSL2 (Windows Subsystem for Linux) for a full Linux development environment.

4. **Check Dependencies**: Ensure you have Node.js 18+ installed.

## 💡 Why Node.js?

| Aspect | Node.js + tsx |
|--------|---------------|
| **Windows Stability** | ✅ Stable |
| **Memory Usage** | ✅ Normal usage |
| **TypeScript Performance** | ✅ Very Good |
| **Hot Reload** | ✅ With --watch |
| **Hytopia Compatibility** | ✅ Full compatibility |
| **Dependency Management** | ✅ Excellent with NPM |

**Conclusion**: Node.js with NPM is now the standard runtime for all Hytopia development. 