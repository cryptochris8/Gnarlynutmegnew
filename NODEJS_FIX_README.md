# 🔧 Node.js Compatibility Fix for Hytopia Soccer Game

## 🚨 **Current Issue**
Your server is crashing due to **Node.js v24.7.0** incompatibility with mediasoup (WebRTC library used by Hytopia).

**Error:** `InvalidStateError: Channel closed, pending request aborted [method:ROUTER_CREATE_WEBRTCTRANSPORT, id:3]`

## ✅ **Solutions**

### **Option 1: Downgrade Node.js (Recommended)**

#### **Using Node Version Manager (nvm-windows)**

1. **Download and Install nvm-windows:**
   ```
   Download from: https://github.com/coreybutler/nvm-windows/releases
   Install the latest nvm-setup.exe
   ```

2. **Open PowerShell/Command Prompt and run:**
   ```bash
   # Install Node.js 20.x LTS (recommended)
   nvm install 20.18.0
   nvm use 20.18.0

   # Verify installation
   node --version  # Should show v20.18.0
   npm --version
   ```

3. **Restart your terminal and test:**
   ```bash
   cd "F:\Hytopia-games\Gnarly-new"
   npm run start
   ```

#### **Alternative: Direct Node.js Installation**
1. Download Node.js 20.x LTS from: https://nodejs.org/
2. Uninstall current Node.js 24.x
3. Install Node.js 20.x
4. Restart your computer

### **Option 2: Force WebSocket Mode (Temporary)**

If you can't downgrade Node.js immediately, use this workaround:

```bash
# Run with forced WebSocket mode
npm run start:force-websockets

# Or set environment variables manually
set HYTOPIA_FORCE_WEBSOCKETS=1
set MEDIASOUP_IGNORE_STDERR=1
npm run start
```

## 🔍 **How to Verify the Fix**

### **Check Node.js Version:**
```bash
npm run check:node
# or
node --version
```

### **Test Server:**
```bash
npm run start
```

**Expected Output:**
- ✅ No WebRTC warnings
- ✅ Server starts successfully on port 8080
- ✅ No `InvalidStateError` crashes
- ✅ WebSocket fallback works properly

## 📊 **Compatibility Matrix**

| Node.js Version | Compatibility | Status |
|----------------|---------------|--------|
| 16.x | ⚠️ Limited | Not recommended |
| 18.x LTS | ✅ Good | Recommended |
| 20.x LTS | ✅ Excellent | **Highly Recommended** |
| 22.x | ⚠️ Issues | Use WebSocket fallback |
| 24.x | ❌ Broken | **Will crash** |

## 🛠️ **Additional Troubleshooting**

### **If Issues Persist:**

1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

2. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Check for conflicting processes:**
   ```bash
   # Kill any existing Node.js processes
   taskkill /f /im node.exe
   ```

4. **Use the diagnostic script:**
   ```bash
   .\check-node.bat
   ```

## 📞 **Support**

- **Hytopia Documentation:** https://docs.hytopia.com
- **Node.js Compatibility:** Check [Node.js release notes](https://nodejs.org/en/blog/release/)
- **Mediasoup Issues:** https://github.com/versatica/mediasoup/issues

## 🎯 **Quick Test**

After applying any fix, test with:
```bash
cd "F:\Hytopia-games\Gnarly-new"
npm run start
```

**Success Indicators:**
- ✅ Server starts without WebRTC errors
- ✅ "WebServer.start(): Server running on port 8080" appears
- ✅ No `InvalidStateError` messages
- ✅ Game loads in browser at `http://localhost:8080`

---

**Last Updated:** September 6, 2025
**Node.js Version:** 24.7.0 (Current - Problematic)
**Recommended:** Node.js 20.x LTS
