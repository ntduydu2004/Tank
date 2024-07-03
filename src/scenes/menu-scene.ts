import { DataManager } from "../managers/data-manager"
import { ScreenManager } from "../managers/screen-manager"
import { SoundManager } from "../managers/sound-manager"

export class MenuScene extends Phaser.Scene {
    public screenManager: ScreenManager

    constructor() {
        super({
            key: 'MenuScene',
        })
    }
    init() {
        SoundManager.getInstance().initMenuScene(this)
        DataManager.getInstance().init()
    }
    preload() {
        DataManager.getInstance().loadHudVolume()
    }
    create(data: ScreenManager): void {
        this.input.setTopOnly(true)
        this.scene.bringToTop()
        this.screenManager = data
        this.screenManager.setMenuScene(this)
        this.screenManager.transitionToMainMenuScreen()
        this.screenManager.pauseGame()
    }
    update(time: number, delta: number) {
        this.screenManager.update(time, delta)
    }
}
