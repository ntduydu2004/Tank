import { CANVAS } from 'phaser'
import { BootScene } from './scenes/boot-scene'
import { GameScene } from './scenes/game-scene'
import { MenuScene } from './scenes/menu-scene'

export const GameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Tank',
    url: 'https://github.com/digitsensitive/phaser3-typescript',
    version: '0.0.1',

    type: Phaser.AUTO,
    parent: 'game',
    scene: [BootScene, MenuScene, GameScene],
    input: {
        keyboard: true,
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    zoom: 0.1,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
        },
    },
    backgroundColor: '#000000',
    render: { antialias: true },
}
