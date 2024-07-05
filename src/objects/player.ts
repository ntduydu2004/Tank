import { Bullet } from './bullet'
import { IImageConstructor } from '../interfaces/image.interface'
import { DataManager, State } from '../managers/data-manager'
import { SoundManager } from '../managers/sound-manager'

export enum Direction {
    UP = -Math.PI,
    DOWN = 0,
    RIGHT = -Math.PI / 2,
    LEFT = Math.PI / 2,
    NONE = 4 * Math.PI,
}
export class Player extends Phaser.GameObjects.Image {
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
    private bloom: Phaser.FX.Bloom
    // game objects
    private bullets: Phaser.GameObjects.Group

    // input
    private keyUp: Phaser.Input.Keyboard.Key
    private keyDown: Phaser.Input.Keyboard.Key
    private keyLeft: Phaser.Input.Keyboard.Key
    private keyRight: Phaser.Input.Keyboard.Key
    private shootingKey: Phaser.Input.Pointer
    private horizontalKeyDirection: Direction = Direction.NONE
    private verticalKeyDirection: Direction = Direction.NONE

    // change direction tween
    public getBullets(): Phaser.GameObjects.Group {
        return this.bullets
    }

    constructor(aParams: IImageConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame)

        this.initImage()
        this.scene.add.existing(this)
    }

    private initImage() {
        // variables
        this.health = 1
        this.virtualHealth = 1
        this.lastBeingShot = 0
        this.lastShoot = 0
        this.speed = 300

        // image
        this.setOrigin(0.5, 0.5)
        this.setDepth(0)
        this.angle = 180

        this.barrel = this.scene.add.image(this.x, this.y, 'barrelBlue')
        this.barrel.setOrigin(0.5, 1)
        this.barrel.setDepth(1)
        this.barrel.angle = 180

        this.virtualLifeBar = this.scene.add.graphics()
        this.lifeBar = this.scene.add.graphics()
        this.redrawVirtualLifeBar()
        this.redrawLifebar()

        // game objects
        this.bullets = this.scene.add.group({
            classType: Bullet,
            active: true,
            maxSize: 10,
            runChildUpdate: true,
        })

        // input
        this.keyDown = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.keyUp = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.keyLeft = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keyRight = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.shootingKey = this.scene.input.activePointer

        // physics
        this.scene.physics.world.enable(this)
    }

    update(time: number, delta: number): void {
        if (this.active) {
            this.handleInput(time, delta)
            this.handleShooting(time, delta)
            this.handleVirtualHealth(time, delta)
            this.barrel.x = this.x
            this.barrel.y = this.y
            this.lifeBar.x = this.x
            this.lifeBar.y = this.y
            this.virtualLifeBar.x = this.x
            this.virtualLifeBar.y = this.y
        } else {
            this.destroy()
            this.barrel.destroy()
            this.lifeBar.destroy()
            this.virtualLifeBar.destroy()
        }
    }

    private handleInput(time: number, delta: number) {
        let worldPoint = this.scene.cameras.main.getWorldPoint(
            this.shootingKey.x,
            this.shootingKey.y
        )
        this.barrel.rotation =
            -Phaser.Math.Angle.BetweenY(this.barrel.x, this.barrel.y, worldPoint.x, worldPoint.y) +
            Math.PI
        if (!this.keyUp.isDown && !this.keyDown.isDown) {
            this.verticalKeyDirection = Direction.NONE
        } else if (this.keyUp.isDown && this.keyDown.isDown) {
            this.verticalKeyDirection =
                this.keyUp.timeDown < this.keyDown.timeDown ? Direction.DOWN : Direction.UP
        } else if (this.keyUp.isDown) {
            this.verticalKeyDirection = Direction.UP
        } else {
            this.verticalKeyDirection = Direction.DOWN
        }

        if (!this.keyLeft.isDown && !this.keyRight.isDown) {
            this.horizontalKeyDirection = Direction.NONE
        } else if (this.keyLeft.isDown && this.keyRight.isDown) {
            this.horizontalKeyDirection =
                this.keyLeft.timeDown < this.keyRight.timeDown ? Direction.RIGHT : Direction.LEFT
        } else if (this.keyLeft.isDown) {
            this.horizontalKeyDirection = Direction.LEFT
        } else {
            this.horizontalKeyDirection = Direction.RIGHT
        }
        if (this.horizontalKeyDirection == Direction.NONE) {
            this.horizontalKeyDirection = this.verticalKeyDirection
        }
        if (this.verticalKeyDirection == Direction.NONE) {
            this.verticalKeyDirection = this.horizontalKeyDirection
        }
        if (
            this.horizontalKeyDirection == Direction.NONE &&
            this.verticalKeyDirection == Direction.NONE
        ) {
            this.body.setVelocity(0)
        } else {
            if (Math.abs(this.horizontalKeyDirection - this.verticalKeyDirection) > Math.PI / 2) {
                this.rotateTo(
                    (this.horizontalKeyDirection + this.verticalKeyDirection) / 2 + Math.PI,
                    delta
                )
            } else {
                this.rotateTo((this.horizontalKeyDirection + this.verticalKeyDirection) / 2, delta)
            }

            this.scene.physics.velocityFromRotation(
                this.rotation + Math.PI / 2,
                this.speed,
                this.body.velocity
            )
        }
    }
    private handleVirtualHealth(time: number, delta: number): void {
        if (this.scene.time.now > this.lastBeingShot && this.virtualHealth > this.health) {
            if (this.virtualHealth - 0.002 * delta < this.health) {
                this.virtualHealth = this.health
            } else {
                this.virtualHealth -= 0.002 * delta
            }
            this.redrawVirtualLifeBar()
        }
    }
    private handleShooting(time: number, delta: number): void {
        if (this.shootingKey.isDown && this.scene.time.now > this.lastShoot) {
            this.scene.cameras.main.shake(20, 0.005)
            this.scene.tweens.add({
                targets: this,
                props: { alpha: 0.8 },
                delay: 0,
                duration: 5,
                ease: 'Power1',
                easeParams: null,
                hold: 0,
                repeat: 0,
                repeatDelay: 0,
                yoyo: true,
                paused: false,
            })

            SoundManager.getInstance().playShootSound()
            this.bullets.add(
                new Bullet({
                    scene: this.scene,
                    rotation: this.barrel.rotation,
                    x: this.barrel.x,
                    y: this.barrel.y,
                    texture: 'bulletBlue',
                })
            )

            this.lastShoot = this.scene.time.now + 100
        }
    }
    private rotateTo(rotation: number, deltaTime: number) {
        if (rotation >= 2 * Math.PI) {
            rotation -= 2 * Math.PI
        } else if (rotation <= -2 * Math.PI) {
            rotation += 2 * Math.PI
        }

        let delta = rotation - this.rotation
        let direction = delta > 0 ? 1 : -1
        if (Math.abs(delta) > Math.PI) {
            let newRotation = this.rotation + direction * 2 * Math.PI
            delta = rotation - newRotation
            direction = delta > 0 ? 1 : -1
        }
        if (Math.abs(delta) <= 0.02 * deltaTime) {
            this.rotation = rotation
        } else {
            this.rotation += direction * 0.02 * deltaTime
        }
    }
    private redrawLifebar(): void {
        this.lifeBar.clear()
        this.lifeBar.fillStyle(0x44a5df, 1)
        this.lifeBar.fillRect(-this.width / 2, this.height / 2, this.width * this.health, 15)
        this.lifeBar.lineStyle(2, 0xffffff)
        this.lifeBar.strokeRect(-this.width / 2, this.height / 2, this.width, 15)
        this.lifeBar.setDepth(1)
    }
    private redrawVirtualLifeBar(): void {
        this.virtualLifeBar.clear()
        this.virtualLifeBar.fillStyle(0xebeb00, 1)
        this.virtualLifeBar.fillRect(
            -this.width / 2,
            this.height / 2,
            this.width * this.virtualHealth,
            15
        )
        this.virtualLifeBar.setDepth(1)
    }
    public updateHealth(): void {
        if (this.health > 0.05) {
            this.health -= 0.05
            this.lastBeingShot = this.scene.time.now + 1000
            DataManager.getInstance().setHealthLeft(this.health)
            this.redrawLifebar()
        } else {
            this.virtualHealth = 0
            this.health = 0
            this.active = false
            DataManager.getInstance().saveScore()
            DataManager.getInstance().setState(State.LOSE)
        }
    }
}
