import { Scene } from "phaser"
import { IButtonConstructor } from "../interfaces/button.interface"
import { ITextConstructor } from "../interfaces/text.interface"
import { SoundManager } from "../managers/sound-manager"

export class Button extends Phaser.GameObjects.Container {
    private background: Phaser.GameObjects.Image
    private text: Phaser.GameObjects.BitmapText
    private icon: Phaser.GameObjects.Image
    private isOver: boolean
    public constructor(params: IButtonConstructor) {
        super(params.scene, params.x, params.y)
        this.scene.add.existing(this)
        this.background = this.scene.add.image(0, 0, params.texture)
        this.setSize(this.background.width, this.background.height)
        this.setInteractive()
        this.isOver = false
        this.on('pointerup', params.onButtonClicked)
        this.on('pointerup', () => {
            SoundManager.getInstance().playButtonClickSound()
        })
        this.on('pointerdown', () => {
            this.setAlpha(0.6)
        })
        this.on('pointerover', () => {
            this.background.setTexture(params.hoverTexture)
            if (!this.isOver) {
                this.isOver = true
                SoundManager.getInstance().playButtonHoverSound()
            }
        })
        this.on('pointerout', () => {
            this.setAlpha(1)
            this.background.setTexture(params.texture)
            this.isOver = false
        })
        this.add(this.background)
    }
    public addText(params: ITextConstructor) {
        this.text = this.scene.add.bitmapText(params.x, params.y, 'font', params.text, params.size).setOrigin(0.5).setTint(params.tint)
        this.add(this.text)
    }
    public setText(text: string) {
        this.text.text = text
    }
}