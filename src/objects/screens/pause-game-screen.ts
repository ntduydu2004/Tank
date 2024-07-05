import { Scene } from 'phaser'
import { Screen } from './screen'
import { Panel } from '../../ui-objects/panel'
import { Button } from '../../ui-objects/button'
import { DataManager } from '../../managers/data-manager'
import { SoundManager } from '../../managers/sound-manager'

export class PauseGameScreen extends Screen {
    private background: Phaser.GameObjects.Rectangle
    private panel: Panel
    private resumeButton: Button
    private restartButton: Button
    private settingsButton: Button
    private homeButton: Button
    public constructor(scene: Scene) {
        super(scene)
        this.create()
    }

    public create(): void {
        this.createBackground()
        this.createButtons()
        this.background.setScale(0)
        this.panel.setScale(0)
        this.settingsButton.setScale(0)
        this.scene.add.tween({
            targets: [this.background, this.panel, this.settingsButton],
            scale: 1,
            ease: 'back.out',
            duration: 300,
        })
    }
    public update(time: number, delta: number): void {
        console.log(10)
    }
    private createButtons(): void {
        this.restartButton = new Button({
            scene: this.scene,
            x: -150,
            y: 30,
            texture: 'restart_normal_button',
            hoverTexture: 'restart_hover_button',
            onButtonClicked: () => {
                this.settingsButton.disableInteractive()
                this.homeButton.disableInteractive()
                this.restartButton.disableInteractive()
                this.resumeButton.disableInteractive()
                this.scene.cameras.main.fadeOut(500)
                let callback = () => {
                    this.scene.cameras.main.off(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, callback)
                    this.scene.cameras.main.fadeIn(1000)
                    SoundManager.getInstance().playIngameMusic()
                    this.manager.startGame()
                    this.manager.transitionToLastScreenInstantly()
                }
                this.scene.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, callback)
            },
        })
        this.resumeButton = new Button({
            scene: this.scene,
            x: 0,
            y: 30,
            texture: 'resume_normal_button',
            hoverTexture: 'resume_hover_button',
            onButtonClicked: () => {
                this.scene.add.tween({
                    targets: [this.background, this.panel, this.settingsButton],
                    scale: 0,
                    ease: 'back.in',
                    duration: 300,
                    onComplete: () => {
                        this.manager.resumeGame()
                        this.manager.transitionToLastScreenInstantly()
                    },
                })
            },
        }).setScale(1.2)
        this.settingsButton = new Button({
            scene: this.scene,
            x: 50,
            y: 50,
            texture: 'settings_normal_button',
            hoverTexture: 'settings_hover_button',
            onButtonClicked: () => {
                this.settingsButton.disableInteractive()
                this.homeButton.disableInteractive()
                this.restartButton.disableInteractive()
                this.resumeButton.disableInteractive()
                this.scene.time.delayedCall(550, () => {
                    this.settingsButton.setInteractive()
                    this.homeButton.setInteractive()
                    this.restartButton.setInteractive()
                    this.resumeButton.setInteractive()
                })
                this.manager.transitionToSettingsScreen()
            },
        })
        this.homeButton = new Button({
            scene: this.scene,
            x: 150,
            y: 30,
            texture: 'home_normal_button',
            hoverTexture: 'home_hover_button',
            onButtonClicked: () => {
                this.settingsButton.disableInteractive()
                this.homeButton.disableInteractive()
                this.restartButton.disableInteractive()
                this.resumeButton.disableInteractive()
                this.scene.cameras.main.fadeOut(200)
                this.manager.transitionToMainMenuScreen()
            },
        })
        this.panel = new Panel({
            scene: this.scene,
            x: this.scene.sys.canvas.width / 2,
            y: this.scene.sys.canvas.height / 2,
            texture: 'medium_panel',
            buttons: [this.restartButton, this.resumeButton, this.homeButton],
        })
        this.panel.addText({
            x: 0,
            y: -70,
            text: 'PAUSE',
            size: 40,
            tint: 0xffffff,
        })
        this.add(this.panel)
        this.add(this.settingsButton)
    }
    private createBackground(): void {
        this.background = this.scene.add
            .rectangle(
                this.scene.sys.canvas.width / 2,
                this.scene.sys.canvas.height / 2,
                this.scene.sys.canvas.width,
                this.scene.sys.canvas.height,
                0x000000
            )
            .setAlpha(0.5)
        this.add(this.background)
    }
}
