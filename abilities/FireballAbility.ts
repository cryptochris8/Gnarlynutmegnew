import type { Ability } from './Ability';
import type { ItemAbilityOptions } from './itemTypes';
import { type Vector3Like, type Entity, Audio } from 'hytopia';
import SoccerPlayerEntity from '../entities/SoccerPlayerEntity';
import { isArcadeMode } from '../state/gameModes';

/**
 * Fireball Ability
 * Launches an explosive fireball projectile
 */
export class FireballAbility implements Ability {
    constructor(private options: ItemAbilityOptions) {}

    getIcon(): string {
        return this.options.icon;
    }

    use(origin: Vector3Like, direction: Vector3Like, source: Entity): void {
        // SAFETY CHECK: Only work in arcade mode
        if (!isArcadeMode()) {
            console.log("🎮 FIREBALL: Blocked - not in arcade mode");
            return;
        }

        if (!source.world || !(source instanceof SoccerPlayerEntity)) return;

        console.log(`🔥 FIREBALL: ${source.player.username} launching fireball!`);

        // Get the arcade enhancement manager from the world
        const arcadeManager = (source.world as any)._arcadeManager;
        if (!arcadeManager) {
            console.error("❌ FIREBALL: Arcade manager not found!");
            return;
        }

        // Activate fireball through the arcade manager
        const success = arcadeManager.activatePowerUp(source.player.username, 'fireball');

        if (success) {
            console.log(`✅ FIREBALL: Successfully launched for ${source.player.username}`);
        } else {
            console.error(`❌ FIREBALL: Failed to activate for ${source.player.username}`);
        }

        // Remove ability after use
        source.abilityHolder.removeAbility();
        source.abilityHolder.hideAbilityUI(source.player);
    }
}