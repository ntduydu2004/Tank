import { ISliderConstructor } from "../interfaces/slider.interface"

export class Slider extends Phaser.GameObjects.Container{
    private sliderGraphics: Phaser.GameObjects.Graphics
    private text: Phaser.GameObjects.BitmapText
    private value: Phaser.GameObjects.Text
    private pointer: Phaser.GameObjects.Arc
    public constructor(params: ISliderConstructor) {
        super(params.scene, params.x, params.y)
        this.sliderGraphics = this.scene.add.graphics()
        this.sliderGraphics.lineStyle(1, 0xffffff, 1)
        this.sliderGraphics.lineBetween(0, 0, params.width, 0)
        this.text = this.scene.add.bitmapText(-100, 0, 'font', params.text, 30).setTint(0xffffff).setOrigin(0.5)
        
        this.value = this.scene.add.text(500, 0, Math.floor(params.value).toString(), {
            color: 'white',
            fontSize: '40px',
            fontStyle: 'bold'
        }).setOrigin(0.5)
        this.pointer = this.scene.add.circle(params.width *(params.value / params.max), 0, 10, 0x00ffff)
        this.pointer.setInteractive({draggable: true})
        this.pointer.on('dragstart', () => {
            this.pointer.fillColor = 0xffffff
        })
        this.pointer.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            dragX = Phaser.Math.Clamp(dragX, this.sliderGraphics.x, this.sliderGraphics.x + params.width)
            this.pointer.x = dragX
            this.value.setText(Math.floor(dragX / params.width * params.max).toString())
        })
        this.pointer.on('drag', params.onDragging)
        this.pointer.on('dragend', () => {
            this.pointer.fillColor = 0x00ffff
        })
        this.add(this.sliderGraphics)
        this.add(this.text)
        this.add(this.pointer)
        this.add(this.value)
    }

    private registerDraggingEvents() {

    }
}