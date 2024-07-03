import { Scene } from 'phaser'
import { ScreenManager } from '../../managers/screen-manager'

export abstract class Screen extends Phaser.GameObjects.Container {
    protected manager: ScreenManager
    public constructor(scene: Scene) {
        super(scene, 0, 0)
        this.scene.add.existing(this)
        this.setSize(2 * this.scene.sys.canvas.width, 2 * this.scene.sys.canvas.height)
        this.setDepth(1)
    }
    public setManager(manager: ScreenManager) {
        this.manager = manager
    }
    protected abstract create(): void
    public abstract update(time: number, delta: number): void
}
