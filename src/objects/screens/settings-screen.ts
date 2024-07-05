import { Scene } from 'phaser'
import { Screen } from './screen'
import { Button } from '../../ui-objects/button'
import { DataManager } from '../../managers/data-manager'
import { Slider } from '../../ui-objects/slider'
import { ISliderConstructor } from '../../interfaces/slider.interface'

export class SettingsScreen extends Screen {
    private background: Phaser.GameObjects.Rectangle
    private backButton: Button
    private soundSlider: Slider
    private musicSlider: Slider
    private hudSlider: Slider
    private dataManager: DataManager
    public constructor(scene: Scene) {
        super(scene)
        this.create()
    }

    public create(): void {
        this.dataManager = DataManager.getInstance()
        this.createBackground()
        this.createButtons()
        this.createSliders()
    }
    public update(time: number, delta: number): void {}
    private createSliders() {
        let params: ISliderConstructor = {
            scene: this.scene,
            x: this.scene.sys.canvas.width / 2 - 200,
            y: 200,
            text: 'SOUND',
            width: 450,
            max: 100,
            value: this.dataManager.getSound() * 100,
            onDragging: (pointer, dragX, dragY) => {
                dragX = Phaser.Math.Clamp(dragX, 0, params.width)
                this.dataManager.setSound(dragX / params.width)
            },
        }
        this.soundSlider = new Slider(params)
        params = {
            scene: this.scene,
            x: this.scene.sys.canvas.width / 2 - 200,
            y: 400,
            text: 'MUSIC',
            width: 450,
            max: 100,
            value: this.dataManager.getMusic() * 100,
            onDragging: (pointer, dragX, dragY) => {
                dragX = Phaser.Math.Clamp(dragX, 0, params.width)
                this.dataManager.setMusic(dragX / params.width)
            },
        }
        this.musicSlider = new Slider(params)

        params = {
            scene: this.scene,
            x: this.scene.sys.canvas.width / 2 - 200,
            y: 600,
            text: 'HUD',
            width: 450,
            max: 100,
            value: this.dataManager.getHud() * 100,
            onDragging: (pointer, dragX, dragY) => {
                dragX = Phaser.Math.Clamp(dragX, 0, params.width)
                this.dataManager.setHud(dragX / params.width)
            },
        }
        this.hudSlider = new Slider(params)
        this.add(this.soundSlider)
        this.add(this.musicSlider)
        this.add(this.hudSlider)
    }
    private createButtons() {
        this.backButton = new Button({
            scene: this.scene,
            x: 50,
            y: 50,
            texture: 'back_normal_button',
            hoverTexture: 'back_hover_button',
            onButtonClicked: () => {
                this.disableButtons()
                this.manager.transitionToLastScreen()
            },
        }).setScale(0.7)
        this.add(this.backButton)
    }
    private createBackground() {
        this.background = this.scene.add.rectangle(
            this.scene.sys.canvas.width / 2,
            this.scene.sys.canvas.height / 2,
            this.scene.sys.canvas.width,
            this.scene.sys.canvas.height,
            0x323741
        )
        this.add(this.background)
    }
    public enableButtons(): void {
        this.backButton.setInteractive()
    }
    public disableButtons(): void {
        this.backButton.disableInteractive()
    }
}
