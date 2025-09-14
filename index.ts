// Gnarly Nutmeg Soccer Game - Stable Full Features
import { startServer, Audio, PlayerEntity, PlayerEvent, PlayerCameraMode } from "hytopia";
import worldMap from "./assets/maps/soccer.json" with { type: "json" };

// Core imports - only what actually works
import createSoccerBall from "./utils/ball";
import SoccerPlayerEntity from "./entities/SoccerPlayerEntity";
import { SAFE_SPAWN_Y } from "./state/gameConfig";

console.log("🎮 Starting Gnarly Nutmeg Soccer Server...");

startServer((world) => {
    try {
        console.log("🏟️ Loading soccer stadium...");
        world.loadMap(worldMap);
        console.log("✅ Soccer map loaded");
        
        // Set up enhanced lighting for the stadium (if available)
        try {
            if (world.environment?.setAmbientLightColor) {
                world.environment.setAmbientLightColor("#FFFFFF");
                world.environment.setAmbientLightIntensity(0.8);
                world.environment.setDirectionalLightColor("#FFE4B5");
                world.environment.setDirectionalLightIntensity(1.2);
                world.environment.setFogColor("#E6F3FF");
                world.environment.setFogDensity(0.0015);
                console.log("✅ Enhanced lighting applied");
            } else {
                console.log("⚠️ Environment lighting API not available in this SDK version");
            }
        } catch (error) {
            console.warn("⚠️ Failed to set environment lighting:", error.message);
        }
        
        // Create the soccer ball
        const soccerBall = createSoccerBall(world);
        console.log("⚽ Soccer ball created");
        
        // Initialize audio
        const menuMusic = new Audio({
            uri: "audio/music/Ian Post - 8 Bit Samba - No FX.mp3",
            loop: true,
            volume: 0.3,
        });
        
        const arcadeMusic = new Audio({
            uri: "audio/music/always-win.mp3",
            loop: true,
            volume: 0.3,
        });
        
        const fifaMusic = new Audio({
            uri: "audio/music/Vettore - Silk.mp3",
            loop: true,
            volume: 0.3,
        });
        
        // Start menu music
        menuMusic.play(world);
        console.log("🎵 Music started");
        
        // Track players and scores
        const playerEntities = new Map();
        let score = { red: 0, blue: 0 };
        let gameActive = false;
        let currentMode = "pickup";
        
        // Handle player join - with UI loading (try different event names)
        console.log("🔧 Setting up player join handler...");
        
        // Try the more common event name first
        world.on(PlayerEvent.JOINED_WORLD, ({ player }) => {
            try {
                console.log(`⚽ Player joined: ${player.username}`);
                
                // Load the UI first - using simple test UI to avoid React errors
                try {
                    player.ui.load('ui/test-simple.html');
                    console.log(`🔧 Simple test UI loaded for ${player.username}`);
                } catch (uiError) {
                    console.error(`❌ Failed to load UI for ${player.username}:`, uiError);
                    // Fallback: try the original UI
                    try {
                        player.ui.load('ui/index.html');
                        console.log(`🔧 Fallback UI loaded for ${player.username}`);
                    } catch (fallbackError) {
                        console.error(`❌ Both UI loads failed for ${player.username}:`, fallbackError);
                    }
                }
                
                // Set up UI event handler for this player
                player.ui.onData = (data: any) => {
                    console.log(`📨 UI message from ${player.username}:`, data.type);
                    
                    // Handle team selection
                    if (data.type === "team-selected") {
                        console.log(`⚽ ${player.username} selected ${data.team} team`);
                        world.chatManager.sendPlayerMessage(player, `🎯 You joined the ${data.team} team!`);
                        
                        // Could add team assignment logic here
                        // For now, just acknowledge the selection
                        return;
                    }
                    
                    // Handle game mode selection
                    if (data.type === "select-game-mode") {
                        console.log(`🎮 ${player.username} selected ${data.mode} mode`);
                        currentMode = data.mode;
                        world.chatManager.sendBroadcastMessage(`🎮 Game mode changed to ${data.mode}!`, 'blue');
                        return;
                    }
                    
                    // Handle other UI events
                    console.log(`📝 Unhandled UI event: ${data.type}`);
                };
                
                // Create player entity with soccer controls
                const playerEntity = new SoccerPlayerEntity(player);
                const spawnPos = { 
                    x: Math.random() * 20 - 10, 
                    y: SAFE_SPAWN_Y || 5, 
                    z: Math.random() * 20 - 10 
                };
                playerEntity.spawn(world, spawnPos);
                playerEntities.set(player.id, playerEntity);
                
                // Setup camera
                player.camera.setAttachedToEntity(playerEntity);
                player.camera.setMode(PlayerCameraMode.THIRD_PERSON);
                
                // Send welcome messages
                world.chatManager.sendPlayerMessage(player, "⚽ Welcome to Gnarly Nutmeg Soccer!");
                world.chatManager.sendPlayerMessage(player, "💬 Type /help for commands");
                world.chatManager.sendPlayerMessage(player, `🎮 Current mode: ${currentMode}`);
            } catch (error) {
                console.error("Error handling player join:", error);
            }
        });
        
        // Handle player leave
        world.on(PlayerEvent.LEAVE, ({ player }) => {
            try {
                console.log(`👋 Player left: ${player.username}`);
                
                const playerEntity = playerEntities.get(player.id);
                if (playerEntity) {
                    playerEntity.despawn();
                    playerEntities.delete(player.id);
                }
            } catch (error) {
                console.error("Error handling player leave:", error);
            }
        });
        
        // Chat command handler - simplified
        world.chatManager.on("message", ({ player, message }) => {
            try {
                if (!message.startsWith("/")) return;
                
                const [command, ...args] = message.slice(1).split(" ");
                
                switch (command.toLowerCase()) {
                    case "help":
                        const commands = [
                            "⚽ === Gnarly Nutmeg Commands ===",
                            "/start - Start match",
                            "/stop - Stop match",
                            "/score - Show score",
                            "/reset - Reset score",
                            "/mode <fifa|arcade|tournament> - Change mode",
                            "/help - Show this help"
                        ];
                        commands.forEach(cmd => {
                            world.chatManager.sendPlayerMessage(player, cmd);
                        });
                        break;
                        
                    case "start":
                        gameActive = true;
                        world.chatManager.sendBroadcastMessage("⚽ Game started!", 'green');
                        break;
                        
                    case "stop":
                        gameActive = false;
                        world.chatManager.sendBroadcastMessage("⏹️ Game stopped!", 'red');
                        break;
                        
                    case "score":
                        world.chatManager.sendPlayerMessage(player, `⚽ Score: Red ${score.red} - ${score.blue} Blue`);
                        break;
                        
                    case "reset":
                        score = { red: 0, blue: 0 };
                        world.chatManager.sendBroadcastMessage("📊 Score reset!", 'yellow');
                        break;
                        
                    case "mode":
                        const mode = args[0]?.toLowerCase();
                        if (mode === "fifa" || mode === "arcade" || mode === "tournament") {
                            currentMode = mode;
                            
                            // Switch music based on mode
                            menuMusic.stop();
                            arcadeMusic.stop();
                            fifaMusic.stop();
                            
                            if (mode === "fifa") {
                                fifaMusic.play(world);
                                world.chatManager.sendBroadcastMessage("🎮 FIFA Mode activated!", 'blue');
                            } else if (mode === "arcade") {
                                arcadeMusic.play(world);
                                world.chatManager.sendBroadcastMessage("🎮 Arcade Mode activated!", 'purple');
                            } else if (mode === "tournament") {
                                arcadeMusic.play(world);
                                world.chatManager.sendBroadcastMessage("🏆 Tournament Mode activated!", 'gold');
                            }
                        } else {
                            world.chatManager.sendPlayerMessage(player, "📋 Modes: fifa, arcade, tournament");
                        }
                        break;
                        
                    default:
                        world.chatManager.sendPlayerMessage(player, "❌ Unknown command. Type /help");
                }
            } catch (error) {
                console.error("Error handling chat command:", error);
                world.chatManager.sendPlayerMessage(player, "❌ Error processing command");
            }
        });
        
        console.log("✅ Gnarly Nutmeg Soccer server started successfully!");
        
    } catch (error) {
        console.error("❌ Failed to start server:", error);
    }
});