import { Scene } from 'phaser'
import { Button } from '../ui-objects/button'

export interface IPanelConstructor {
    scene: Scene
    x: number
    y: number
    texture: string
    buttons?: Button[]
}
