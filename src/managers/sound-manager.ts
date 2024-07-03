import { Scene, Sound } from "phaser";
import { DataManager } from "./data-manager";

export class SoundManager {
    private static instance: SoundManager
    private shootSound: Phaser.Sound.HTML5AudioSound
    private hitSound: Phaser.Sound.HTML5AudioSound
    private ingameMusic: Phaser.Sound.HTML5AudioSound
    private victoryMusic: Phaser.Sound.HTML5AudioSound
    private menuMusic: Phaser.Sound.HTML5AudioSound
    private enemyShootSound: Phaser.Sound.HTML5AudioSound
    private buttonClickSound: Phaser.Sound.HTML5AudioSound
    private buttonHoverSound: Phaser.Sound.HTML5AudioSound
    private wallHitSound: Phaser.Sound.HTML5AudioSound
    private enemyHitSound: Phaser.Sound.HTML5AudioSound
    private constructor() {

    }
    public static getInstance(): SoundManager {
        if (!SoundManager.instance) {
            SoundManager.instance = new SoundManager()
        }
        return SoundManager.instance
    }
    public initGameScene(scene: Scene): void {
        if (this.ingameMusic !== undefined) return
        this.ingameMusic = scene.sound.add('ingame_music') as Phaser.Sound.HTML5AudioSound
        this.shootSound = scene.sound.add('shoot_sound') as Phaser.Sound.HTML5AudioSound
        this.enemyShootSound = scene.sound.add('enemy_shoot_sound') as Phaser.Sound.HTML5AudioSound
        this.wallHitSound = scene.sound.add('wall_hit_sound') as Phaser.Sound.HTML5AudioSound
        this.enemyHitSound = scene.sound.add('enemy_hit_sound') as Phaser.Sound.HTML5AudioSound
    }
    public initMenuScene(scene: Scene): void {
        if (this.menuMusic === undefined) this.menuMusic = scene.sound.add('menu_music') as Phaser.Sound.HTML5AudioSound
        this.victoryMusic = scene.sound.add('victory_music') as Phaser.Sound.HTML5AudioSound
        this.buttonClickSound = scene.sound.add('button_click_sound') as Phaser.Sound.HTML5AudioSound
        this.buttonHoverSound = scene.sound.add('button_hover_sound') as Phaser.Sound.HTML5AudioSound
    }
    public stopAllMusic(): void {
        if (!this.menuMusic.isPaused) {
            this.menuMusic.pause()
        }
        if (!this.victoryMusic.isPaused) {
            this.victoryMusic.pause()
        }
        if (!this.ingameMusic.isPaused) {
            this.ingameMusic.pause()
        }
    }
    public playIngameMusic(): void {
        this.stopAllMusic()
        this.ingameMusic.play({
            loop: true,
            volume: DataManager.getInstance().getMusic()
        })
        
    }
    public playMenuMusic() {
        this.stopAllMusic()
        this.menuMusic.play({
            loop: true,
            seek: 23,
            volume: DataManager.getInstance().getMusic()
        })
        
    }
    public playVictoryMusic() {
        this.stopAllMusic()
        this.victoryMusic.play({
            volume: DataManager.getInstance().getMusic()
        })
    }
    public setSoundVolume(soundVolume: number) {
        this.shootSound.setVolume(soundVolume)
        this.enemyShootSound.setVolume(soundVolume)
        this.wallHitSound.setVolume(soundVolume)
        this.enemyHitSound.setVolume(soundVolume)
    }
    public playWallHitSound() {
        this.wallHitSound.play({
            seek: 0.1
        })
    }
    public playEnemyHitSound() {
        this.enemyHitSound.play({
            seek: 0.1
        })
    }
    public playButtonClickSound() {
        this.buttonClickSound.play({
            seek: 0.41
        })
    }
    public playButtonHoverSound() {
        this.buttonHoverSound.play({
            seek: 0.65
        })
    }
    public setMusicVolume(musicVolume: number) {
        this.ingameMusic.setVolume(musicVolume)
        this.menuMusic.setVolume(musicVolume)
        this.victoryMusic.setVolume(musicVolume)
    }
    public setHudVolume(hudVolume: number) {
        this.buttonClickSound.setVolume(hudVolume)
        this.buttonHoverSound.setVolume(hudVolume)
    }
    public playShootSound(): void {
        this.shootSound.play()
    }
    public playEnemyShootSound(): void {
        // this.enemyShootSound.play()
    }
    public playHitSound(): void {
        this.hitSound.play()
    }
}