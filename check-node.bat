@echo off
echo ========================================
echo  Hytopia Soccer - Node.js Version Check
echo ========================================
echo.

echo Current Node.js version:
node --version
echo.

echo Current npm version:
npm --version
echo.

echo Checking Node.js compatibility...
for /f "tokens=1 delims=." %%a in ('node --version') do set NODE_MAJOR=%%a
set NODE_MAJOR=%NODE_MAJOR:~1%

if %NODE_MAJOR% GEQ 24 (
    echo ⚠️  WARNING: Node.js v%NODE_MAJOR%.x may have compatibility issues with mediasoup
    echo 💡 RECOMMENDED: Use Node.js 18.x or 20.x LTS for best stability
    echo.
    echo 🔧 The server will automatically force WebSocket fallback for Node.js 24+
    echo.
) else if %NODE_MAJOR% GEQ 22 (
    echo ⚠️  WARNING: Node.js v%NODE_MAJOR%.x may have some compatibility issues
    echo 💡 RECOMMENDED: Use Node.js 18.x or 20.x LTS for best stability
    echo.
) else if %NODE_MAJOR% GEQ 18 (
    echo ✅ Node.js v%NODE_MAJOR%.x should work well with mediasoup
    echo.
) else (
    echo ❌ Node.js v%NODE_MAJOR%.x is too old. Please upgrade to Node.js 18.x or 20.x LTS
    echo.
)

echo Available commands:
echo   npm run check:node    - Check Node.js version
echo   npm run start         - Start server with auto-configuration
echo   npm run start:force-websockets - Force WebSocket mode
echo.

echo ========================================
