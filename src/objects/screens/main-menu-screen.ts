import { Scene } from 'phaser'
import { Screen } from './screen'
import { Button } from '../../ui-objects/button'
import { Panel } from '../../ui-objects/panel'
import { SoundManager } from '../../managers/sound-manager'

export class MainMenuScreen extends Screen {
    private background: Phaser.GameObjects.Image
    private title: Phaser.GameObjects.BitmapText
    private playButton: Button
    private settingsButton: Button
    private particles: Phaser.GameObjects.Particles.ParticleEmitter
    public constructor(scene: Scene) {
        super(scene)
        this.create()
    }

    protected create(): void {
        SoundManager.getInstance().playMenuMusic()
        this.createBackground()
        this.createButtons()
    }
    public update(time: number, delta: number): void {}
    private createButtons() {
        this.playButton = new Button({
            scene: this.scene,
            x: this.scene.sys.canvas.width / 2,
            y: this.scene.sys.canvas.height * 0.5,
            texture: 'normal_button',
            hoverTexture: 'hover_button',
            onButtonClicked: () => {
                SoundManager.getInstance().playIngameMusic()
                this.manager.startGame()
                this.manager.transitionToMainGameScreen()
            },
        })
        this.playButton.addText({
            x: 0,
            y: 0,
            text: 'PLAY',
            tint: 0x000000,
            size: 20,
        })

        this.settingsButton = new Button({
            scene: this.scene,
            x: this.scene.sys.canvas.width / 2,
            y: this.scene.sys.canvas.height * 0.65,
            texture: 'normal_button',
            hoverTexture: 'hover_button',
            onButtonClicked: () => {
                this.manager.transitionToSettingsScreen()
            },
        })
        this.settingsButton.addText({
            x: 0,
            y: 0,
            text: 'SETTINGS',
            size: 20,
            tint: 0x000000,
        })
        this.add(this.playButton)
        this.add(this.settingsButton)
    }
    private createBackground() {
        this.background = this.scene.add
            .image(this.scene.sys.canvas.width / 2, this.scene.sys.canvas.height / 2, 'background')
            .setInteractive()
        this.title = this.scene.add
            .bitmapText(
                this.scene.sys.canvas.width / 2,
                this.scene.sys.canvas.height * 0.3,
                'font',
                'KING OF TANK',
                50
            )
            .setOrigin(0.5)
            .setTint(0x59a800)
        this.particles = this.scene.add.particles(
            this.scene.sys.canvas.width / 2,
            this.scene.sys.canvas.height * 0.3,
            'flares',
            {
                frame: ['white'],
                color: [0xfe5500, 0xfe0f00],
                colorEase: 'quad.out',
                x: { min: -200, max: 200 },
                lifespan: 1200,
                angle: { min: -100, max: -80 },
                scale: { start: 1, end: 0, ease: 'sine.out' },
                speed: 100,
                quantity: 10,
                blendMode: 'SCREEN',
            }
        )
        this.add(this.background)
        this.add(this.particles)
        this.add(this.title)
    }
}
