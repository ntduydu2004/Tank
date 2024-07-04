import { Player } from '../objects/player'
import { Enemy } from '../objects/enemy'
import { Obstacle } from '../objects/obstacles/obstacle'
import { Bullet } from '../objects/bullet'
import { GameObjects } from 'phaser'
import { ScreenManager } from '../managers/screen-manager'
import { DataManager, State } from '../managers/data-manager'
import { SoundManager } from '../managers/sound-manager'

export class GameScene extends Phaser.Scene {
    private screenManager: ScreenManager
    private map: Phaser.Tilemaps.Tilemap
    private tileset: Phaser.Tilemaps.Tileset
    private layer: Phaser.Tilemaps.TilemapLayer

    private player: Player
    private enemies: Phaser.GameObjects.Group
    private obstacles: Phaser.GameObjects.Group

    private isWinning: boolean
    private target: Phaser.Math.Vector2
    private minimap: Phaser.Cameras.Scene2D.Camera
    constructor() {
        super({
            key: 'GameScene',
        })
    }

    init(data: ScreenManager): void {
        this.input.setDefaultCursor('url(./assets/hud/Aim.cur), pointer')
        this.screenManager = data
        this.screenManager.setGameScene(this)
        SoundManager.getInstance().initGameScene(this)
        DataManager.getInstance().init()
    }
    preload() {
        DataManager.getInstance().loadSoundVolume()
    }
    create(): void {
        this.input.setTopOnly(true)
        this.cameras.main.setZoom(0.6)
        // create tilemap from tiled JSON
        this.map = this.make.tilemap({ key: 'levelMap' })
        this.isWinning = false
        this.tileset = this.map.addTilesetImage('tiles') as Phaser.Tilemaps.Tileset
        this.layer = this.map.createLayer(
            'tileLayer',
            this.tileset,
            0,
            0
        ) as Phaser.Tilemaps.TilemapLayer
        this.layer.setCollisionByProperty({ collide: true })

        this.obstacles = this.add.group({
            classType: Obstacle,
            runChildUpdate: true,
        })

        this.enemies = this.add.group({
            classType: Enemy,
        })
        this.convertObjects()
        DataManager.getInstance().setEnemiesNumber(this.enemies.getChildren().length)
        DataManager.getInstance().reset()
        // collider layer and obstacles
        this.physics.add.collider(this.player, this.layer)
        this.physics.add.collider(this.player, this.obstacles)

        // collider for bullets
        this.physics.add.collider(this.player.getBullets(), this.layer, this.bulletHitLayer)

        this.physics.add.collider(this.player.getBullets(), this.obstacles, this.bulletHitObstacles)
        this.enemies.getChildren().forEach((enemy: GameObjects.GameObject) => {
            this.physics.add.overlap(this.player.getBullets(), enemy, this.playerBulletHitEnemy)
            this.physics.add.overlap(
                (enemy as Enemy).getBullets(),
                this.player,
                this.enemyBulletHitPlayer
            )

            this.physics.add.collider(
                (enemy as Enemy).getBullets(),
                this.obstacles,
                this.bulletHitObstacles
            )
            this.physics.add.collider(
                (enemy as Enemy).getBullets(),
                this.layer,
                this.bulletHitLayer
            )
        }, this)
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05)
        const zoom = Math.min(200 / this.map.widthInPixels, 200 / this.map.heightInPixels)
        this.minimap = this.cameras
            .add(this.sys.canvas.width - 200, this.sys.canvas.height - 200, 200, 200)
            .setZoom(zoom)
            .setBackgroundColor(0x000000)
            .setOrigin(0.5)
            .setScroll(0, -100)
            .startFollow(this.player)
            .setBounds(0, -50 / zoom / 2, this.map.widthInPixels, this.map.heightInPixels)
    }

    update(time: number, delta: number): void {
        this.player.update(time, delta)

        this.enemies.getChildren().forEach((enemy: GameObjects.GameObject) => {
            ;(enemy as Enemy).update(time, delta)
            if (this.player.active && enemy.active) {
                var angle = Phaser.Math.Angle.Between(
                    (enemy as Enemy).body.x,
                    (enemy as Enemy).body.y,
                    this.player.body.x,
                    this.player.body.y
                )

                ;(enemy as Enemy).getBarrel().angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG
            }
        }, this)
        if (this.enemies.getChildren().length == 0 && !this.isWinning) {
            this.isWinning = true
            SoundManager.getInstance().playVictoryMusic()
            this.time.delayedCall(1000, () => {
                DataManager.getInstance().saveScore()
                DataManager.getInstance().setState(State.WIN)
            })
        }
    }

    private convertObjects(): void {
        // find the object layer in the tilemap named 'objects'Tilemaps
        const objects = (this.map.getObjectLayer('objects') as Phaser.Tilemaps.ObjectLayer).objects

        objects.forEach((object) => {
            if (object.type === 'player') {
                this.player = new Player({
                    scene: this,
                    x: object.x!,
                    y: object.y!,
                    texture: 'tankBlue',
                })
            } else if (object.type === 'enemy') {
                let enemy = new Enemy({
                    scene: this,
                    x: object.x!,
                    y: object.y!,
                    texture: 'tankRed',
                })

                this.enemies.add(enemy)
            } else {
                let obstacle = new Obstacle({
                    scene: this,
                    x: object.x!,
                    y: object.y! - 40,
                    texture: object.type,
                })

                this.obstacles.add(obstacle)
            }
        })
    }

    private bulletHitLayer = (
        bullet: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
    ) => {
        if (this.player.getBullets().contains(bullet as GameObjects.GameObject)) {
            SoundManager.getInstance().playWallHitSound()
        }
        bullet.destroy()
    }

    private bulletHitObstacles = (
        bullet: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
    ) => {
        bullet.destroy()
    }

    private enemyBulletHitPlayer = (
        bullet: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody,
        player: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
    ) => {
        bullet.destroy()
        ;(player as Player).updateHealth()
    }

    private playerBulletHitEnemy = (
        bullet: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody,
        enemy: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
    ) => {
        bullet.destroy()
        SoundManager.getInstance().playEnemyHitSound()
        ;(enemy as Enemy).updateHealth()
    }
}
