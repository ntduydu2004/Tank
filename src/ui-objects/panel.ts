import { IPanelConstructor } from "../interfaces/panel.interface";
import { ITextConstructor } from "../interfaces/text.interface";
import { Button } from "./button";

export class Panel extends Phaser.GameObjects.Container {
    private buttons: Button[]
    private background: Phaser.GameObjects.Image
    public constructor(params: IPanelConstructor) {
        super(params.scene, params.x, params.y)
        this.scene.add.existing(this)
        this.background = this.scene.add.image(0, 0, params.texture)
        this.buttons = []
        this.add(this.background)
        if (params.buttons) {
            this.buttons = params.buttons
            this.add(this.buttons)
        }
    }

    public addText(params: ITextConstructor) {
        const text = this.scene.add.bitmapText(params.x, params.y, 'font', params.text, params.size).setOrigin(0.5).setTint(params.tint)
        this.add(text)
    }

    public addTextObject(text: Phaser.GameObjects.Text) {
        this.add(text)
    }
}