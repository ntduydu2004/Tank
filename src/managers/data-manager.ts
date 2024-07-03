import { SoundManager } from './sound-manager'

export enum State {
    NONE,
    WIN,
    PAUSE_WIN,
    LOSE,
    PAUSE_LOSE,
}
export class DataManager {
    private score: number
    private highScore: number
    private state: number

    // main game
    private killStreak: number
    private healthLeft: number
    private enemiesNumber: number
    // settings
    private soundVolume: number
    private musicVolume: number
    private hudVolume: number
    private loaded: boolean

    private static instance: DataManager

    private constructor() {
        this.loaded = false
    }
    public static getInstance(): DataManager {
        if (!DataManager.instance) {
            DataManager.instance = new DataManager()
        }
        return DataManager.instance
    }

    public init() {
        if (this.loaded) return
        this.loaded = true
        let item = localStorage.getItem('soundVolume')
        if (!item) {
            this.soundVolume = 0.08
        } else {
            this.soundVolume = JSON.parse(item)
        }

        item = localStorage.getItem('musicVolume')
        if (!item) {
            this.musicVolume = 0.05
        } else {
            this.musicVolume = JSON.parse(item)
        }
        item = localStorage.getItem('hudVolume')
        if (!item) {
            this.hudVolume = 0.45
        } else {
            this.hudVolume = JSON.parse(item)
        }

        item = localStorage.getItem('highScore')
        if (!item) {
            this.highScore = 0
        } else {
            this.highScore = JSON.parse(item)
        }
        this.reset()
    }
    public setEnemiesNumber(enemies: number) {
        this.enemiesNumber = enemies
    }
    public getEnemiesLeft() {
        return this.enemiesNumber - this.killStreak
    }
    public loadHudVolume() {
        SoundManager.getInstance().setHudVolume(this.hudVolume)
    }
    public loadSoundVolume() {
        SoundManager.getInstance().setSoundVolume(this.soundVolume)
    }
    public setHealthLeft(health: number) {
        this.healthLeft = health
    }
    public addStreak() {
        this.killStreak++
    }
    public saveScore() {
        console.log(this.killStreak, this.healthLeft)
        this.score = this.killStreak * 200 + this.healthLeft * 50
        console.log(this.score)
        this.highScore = Math.max(this.highScore, this.score)
        localStorage.setItem('highScore', JSON.stringify(this.highScore))
    }
    public getScore(): number {
        return this.score
    }

    public getHighScore(): number {
        return this.highScore
    }
    public setSound(soundVolume: number) {
        this.soundVolume = soundVolume
        SoundManager.getInstance().setSoundVolume(soundVolume)
        localStorage.setItem('soundVolume', JSON.stringify(soundVolume))
    }
    public getSound() {
        return this.soundVolume
    }

    public setMusic(musicVolume: number) {
        this.musicVolume = musicVolume
        SoundManager.getInstance().setMusicVolume(musicVolume)
        localStorage.setItem('musicVolume', JSON.stringify(musicVolume))
    }
    public getMusic() {
        return this.musicVolume
    }
    public setHud(hudVolume: number) {
        this.hudVolume = hudVolume
        SoundManager.getInstance().setHudVolume(hudVolume)
        localStorage.setItem('hudVolume', JSON.stringify(hudVolume))
    }
    public getHud() {
        return this.hudVolume
    }
    public reset() {
        this.score = 0
        this.state = State.NONE
        this.healthLeft = 1
        this.killStreak = 0
    }
    public getState() {
        return this.state
    }

    public setState(state: State) {
        this.state = state
    }
}
