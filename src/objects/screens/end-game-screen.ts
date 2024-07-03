import { Scene, Sound } from "phaser";
import { Screen } from "./screen";
import { Panel } from "../../ui-objects/panel";
import { Button } from "../../ui-objects/button";
import { DataManager, State } from "../../managers/data-manager";
import { SoundManager } from "../../managers/sound-manager";

export class EndGameScreen extends Screen {
    private background: Phaser.GameObjects.Rectangle
    private panel: Panel
    private restartButton: Button
    private settingsButton: Button
    private homeButton: Button
    private dataManager: DataManager
    private scoreText: Phaser.GameObjects.Text
    private highScoreText: Phaser.GameObjects.Text
    private victorySymbol: Phaser.GameObjects.Image
    private particles: Phaser.GameObjects.Particles.ParticleEmitter
    private score: number
    private highScore: number
    public constructor(scene: Scene) {
        super(scene)
        this.create()
    }

    public create(): void {
        this.dataManager = DataManager.getInstance()
        this.createBackground()
        this.createPanel()
        this.victorySymbol.setScale(0)
        this.background.setScale(0)
        this.settingsButton.setScale(0)
        this.score = 0
        this.highScore = 0
        if (this.dataManager.getState() == State.PAUSE_LOSE) {
            this.panel.setScale(0)
            this.scene.add.tween({
                targets: [this.background, this.panel, this.settingsButton],
                scale: 1,
                ease: 'back.out',
                duration: 300,
                onComplete: () => {
                    this.scene.tweens.addCounter({
                        from: 0,
                        to: this.dataManager.getScore(),
                        duration: 2000,
                        ease: 'linear',
                        onUpdate: tween =>
                        {
                            const value = Math.round(tween.getValue());
                            this.scoreText.setText(`Score: ${value}`);
                        }
                    })
                    this.scene.tweens.addCounter({
                        from: 0,
                        to: this.dataManager.getHighScore(),
                        duration: 2000,
                        ease: 'linear',
                        onUpdate: tween =>
                        {
                            const value = Math.round(tween.getValue());
                            this.highScoreText.setText(`High score: ${value}`);
                        }
                    })
                    // this.dataManager.reset()
                }
            })
        }
        else {
            this.panel.setAlpha(0)
            this.scene.tweens.chain({
                targets: this.victorySymbol,
                tweens: [
                    {
                        scale: 1,
                        duration: 300,
                        ease: 'back.out',
                    },
                    {
                        delay: 1000,
                        y: this.scene.sys.canvas.height / 2 - 200,
                        duration: 500,
                        scale: 0.4,
                        ease: 'power3',
                        onComplete: () => {
                            this.particles.start()
                        }
                    },
                    {
                        targets: this.panel,
                        alpha: 1,
                        ease: 'linear',
                        duration: 1000,
                        onComplete: () => {
                            this.scene.tweens.addCounter({
                                from: 0,
                                to: this.dataManager.getScore(),
                                duration: 2000,
                                ease: 'linear',
                                onUpdate: tween =>
                                {
                                    const value = Math.round(tween.getValue());
                                    this.scoreText.setText(`Score: ${value}`);
                                }
                            })
                            this.scene.tweens.addCounter({
                                from: 0,
                                to: this.dataManager.getHighScore(),
                                duration: 2000,
                                ease: 'linear',
                                onUpdate: tween =>
                                {
                                    const value = Math.round(tween.getValue());
                                    this.highScoreText.setText(`High score: ${value}`);
                                }
                            })
                        }
                    },
                    
                ]
                
            })

            this.scene.add.tween({
                targets: [this.background, this.settingsButton],
                scale: 1,
                ease: 'back.out',
                duration: 300, 
            })
        }
        
    }
    public update(time: number, delta: number): void {
    }
    private createPanel(): void {
        this.restartButton = new Button({
            scene: this.scene,
            x: -150,
            y: 100,
            texture: 'restart_normal_button',
            hoverTexture: 'restart_hover_button',
            onButtonClicked: () => {
                this.scene.add.tween({
                    targets: [this.background, this.panel, this.settingsButton],
                    scale: 0,
                    ease: 'back.in',
                    duration: 300,
                    onComplete: () => {
                        this.scene.tweens.killAll()
                        SoundManager.getInstance().playIngameMusic()
                        this.manager.startGame()
                        this.manager.transitionToLastScreen()
                    }
                })
            }
        })
    
        this.settingsButton = new Button({
            scene: this.scene,
            x: 50,
            y: 50,
            texture: 'settings_normal_button',
            hoverTexture: 'settings_hover_button',
            onButtonClicked: () => {
                this.manager.transitionToSettingsScreen()
            } 
        })
        this.homeButton = new Button({
            scene: this.scene,
            x: 150,
            y: 100,
            texture: 'home_normal_button',
            hoverTexture: 'home_hover_button',
            onButtonClicked: () => {
                this.scene.tweens.killAll()
                SoundManager.getInstance().playMenuMusic()
                this.manager.transitionToMainMenuScreen()
            }
        })
        this.panel = new Panel({
            scene: this.scene,
            x: this.scene.sys.canvas.width / 2,
            y: this.scene.sys.canvas.height / 2 + 100,
            texture: 'big_panel',
            buttons: [
                this.restartButton,
                this.homeButton
            ]
        })
        this.panel.addText({
            x: 0,
            y: -150,
            text: this.dataManager.getState() == State.PAUSE_LOSE ? 'DEFEAT': 'VICTORY',
            size: 40,
            tint: 0xffffff
        })
        this.scoreText = this.scene.add.text(- 100, - 80, 'Score: 0', {color: 'white', fontSize: '30px', fontStyle: 'bold'})
        this.highScoreText = this.scene.add.text(- 190, - 20, 'High score: 0', {color: 'white', fontSize: '30px', fontStyle: 'bold'})
        this.panel.addTextObject(this.scoreText)
        this.panel.addTextObject(this.highScoreText)
        this.add(this.panel)
        this.add(this.settingsButton)
    }
    private createBackground(): void {
        this.background = this.scene.add.rectangle(this.scene.sys.canvas.width / 2, this.scene.sys.canvas.height / 2, this.scene.sys.canvas.width, this.scene.sys.canvas.height, 0x000000).setAlpha(0.5)
        this.victorySymbol = this.scene.add.image(this.scene.sys.canvas.width / 2, this.scene.sys.canvas.height / 2, 'victory_symbol')
        this.particles = this.scene.add.particles(this.scene.sys.canvas.width / 2, 200, 'flares', {
            frame: ['white'],
            color: [0xfe5500, 0xfe0f00],
            x: {min: -50, max: 50},
            colorEase: 'quad.out',
            lifespan: 2500,
            angle: { min: -110, max: -70 },
            scale: { start: 1, end: 0, ease: 'sine.out' },
            speed: 100,
            quantity: 4,
            emitting: false,
            blendMode: 'SCREEN',
        })
        this.add(this.background)
        this.add(this.particles)
        this.add(this.victorySymbol)
        
    }
}