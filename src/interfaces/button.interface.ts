export interface IButtonConstructor {
    scene: Phaser.Scene
    x: number
    y: number
    texture: string
    hoverTexture: string
    onButtonClicked: () => void
}
