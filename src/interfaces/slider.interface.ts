export interface ISliderConstructor {
    scene: Phaser.Scene
    x: number
    y: number
    width: number
    max: number
    value: number
    text: string
    onDragging: (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => void
}