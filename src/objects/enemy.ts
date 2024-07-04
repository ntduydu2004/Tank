import { Bullet } from './bullet'
import { IImageConstructor } from '../interfaces/image.interface'
import { DataManager } from '../managers/data-manager'
import { SoundManager } from '../managers/sound-manager'

export class Enemy extends Phaser.GameObjects.Image {
    body: Phaser.Physics.Arcade.Body

    // variables
    private health: number
    private virtualHealth: number
    private lastBeingShot: number
    private lastShoot: number
    private speed: number

    // children
    private barrel: Phaser.GameObjects.Image
    private lifeBar: Phaser.GameObjects.Graphics
    private virtualLifeBar: Phaser.GameObjects.Graphics

    // game objects
    private bullets: Phaser.GameObjects.Group

    public getBarrel(): Phaser.GameObjects.Image {
        return this.barrel
    }

    public getBullets(): Phaser.GameObjects.Group {
        return this.bullets
    }

    constructor(aParams: IImageConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame)

        this.initContainer()
        this.scene.add.existing(this)
    }

    private initContainer() {
        // variables
        this.health = 1
        this.virtualHealth = 1
        this.lastBeingShot = 0
        this.lastShoot = 0
        this.speed = 100

        // image
        this.setDepth(0)

        this.barrel = this.scene.add.image(0, 0, 'barrelRed')
        this.barrel.setOrigin(0.5, 1)
        this.barrel.setDepth(1)

        this.virtualLifeBar = this.scene.add.graphics()
        this.lifeBar = this.scene.add.graphics()
        this.redrawVirtualLifeBar()
        this.redrawLifebar()

        // game objects
        this.bullets = this.scene.add.group({
            /*classType: Bullet,*/
            active: true,
            maxSize: 10,
            runChildUpdate: true,
        })

        // tweens
        this.scene.tweens.add({
            targets: this,
            props: { y: this.y - 200 },
            delay: 0,
            duration: 2000,
            ease: 'Linear',
            easeParams: null,
            hold: 0,
            repeat: -1,
            repeatDelay: 0,
            yoyo: true,
        })

        // physics
        this.scene.physics.world.enable(this)
    }

    update(time: number, delta: number): void {
        if (this.active) {
            this.handleVirtualHealth(time, delta)
            this.barrel.x = this.x
            this.barrel.y = this.y
            this.lifeBar.x = this.x
            this.lifeBar.y = this.y
            this.virtualLifeBar.x = this.x
            this.virtualLifeBar.y = this.y
            this.handleShooting()
        } else {
            this.destroy()
            this.barrel.destroy()
            this.lifeBar.destroy()
            this.virtualLifeBar.destroy()
        }
    }
    private handleVirtualHealth(time: number, delta: number): void {
        if (this.scene.time.now > this.lastBeingShot && this.virtualHealth > this.health) {
            // console.log(this.scene.time.now, this.lastBeingShot, this.virtualHealth, this.health)
            if (this.virtualHealth - 0.002 * delta < this.health) {
                this.virtualHealth = this.health
            }
            else {
                this.virtualHealth -= 0.002 * delta
            }
            this.redrawVirtualLifeBar()
        }
    }
    private redrawVirtualLifeBar(): void {
        this.virtualLifeBar.clear()
        this.virtualLifeBar.fillStyle(0xebeb00, 1)
        this.virtualLifeBar.fillRect(-this.width / 2, this.height / 2, this.width * this.virtualHealth, 15)
        this.virtualLifeBar.setDepth(1)
    }
    private handleShooting(): void {
        if (this.scene.time.now > this.lastShoot) {
            if (this.bullets.getLength() < 10) {
                SoundManager.getInstance().playEnemyShootSound()
                this.bullets.add(
                    new Bullet({
                        scene: this.scene,
                        rotation: this.barrel.rotation,
                        x: this.barrel.x,
                        y: this.barrel.y,
                        texture: 'bulletRed',
                    })
                )

                this.lastShoot = this.scene.time.now + 400
            }
        }
    }

    private redrawLifebar(): void {
        this.lifeBar.clear()
        this.lifeBar.fillStyle(0xe66a28, 1)
        this.lifeBar.fillRect(-this.width / 2, this.height / 2, this.width * this.health, 15)
        this.lifeBar.lineStyle(2, 0xffffff)
        this.lifeBar.strokeRect(-this.width / 2, this.height / 2, this.width, 15)
        this.lifeBar.setDepth(1)
    }

    public updateHealth(): void {
        if (this.health > 0) {
            this.health -= 0.05
            this.lastBeingShot = this.scene.time.now + 1000
            this.redrawLifebar()
        } else {
            DataManager.getInstance().addStreak()
            this.virtualHealth = 0
            this.health = 0
            this.active = false
        }
    }
}
