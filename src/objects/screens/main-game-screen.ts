import { Scene } from 'phaser'
import { Screen } from './screen'
import { Button } from '../../ui-objects/button'
import { DataManager, State } from '../../managers/data-manager'

export class MainGameScreen extends Screen {
    private pauseButton: Button
    private enemiesLeftText: Phaser.GameObjects.Text
    private background: Phaser.GameObjects.Rectangle
    private lowHealthTween: Phaser.Tweens.Tween
    private gameEnded: boolean
    public constructor(scene: Scene) {
        super(scene)
        this.create()
    }
    public create(): void {
        this.gameEnded = false
        this.pauseButton = new Button({
            scene: this.scene,
            x: this.scene.sys.canvas.width - 50,
            y: 50,
            texture: 'pause_normal_button',
            hoverTexture: 'pause_hover_button',
            onButtonClicked: () => {
                this.manager.pauseGame()
                this.manager.transitionToPauseGameScreen()
            },
        })
        this.pauseButton.setScale(0.7)
        this.enemiesLeftText = this.scene.add.text(20, 20, 'Enemies left: ', {
            fontSize: '30px',
            color: 'white',
            fontStyle: 'bold',
        })
        this.background = this.scene.add
            .rectangle(
                this.scene.sys.canvas.width / 2,
                this.scene.sys.canvas.height / 2,
                this.scene.sys.canvas.width,
                this.scene.sys.canvas.height,
                0xff0000
            )
            .setAlpha(0)
        this.lowHealthTween = this.scene.add
            .tween({
                targets: this.background,
                alpha: 0.3,
                duration: 1000,
                yoyo: true,
                repeat: -1,
            })
            .pause()
        this.add(this.background)
        this.add(this.pauseButton)
        this.add(this.enemiesLeftText)
    }

    public update(time: number, delta: number): void {
        if (this.lowHealthTween === undefined || this.lowHealthTween.isDestroyed()) {
            this.lowHealthTween = this.scene.add
                .tween({
                    targets: this.background,
                    alpha: 0.3,
                    duration: 1000,
                    yoyo: true,
                    repeat: -1,
                })
                .pause()
        }
        if (DataManager.getInstance().getState() == State.LOSE) {
            this.gameEnded = true
            this.lowHealthTween.pause()
            DataManager.getInstance().setState(State.PAUSE_LOSE)
            this.manager.pauseGame()
            this.manager.transitionToEndGameScreen()
        } else if (DataManager.getInstance().getState() == State.WIN) {
            this.gameEnded = true
            this.lowHealthTween.pause()
            DataManager.getInstance().setState(State.PAUSE_WIN)
            this.manager.pauseGame()
            this.manager.transitionToEndGameScreen()
        } else {
            this.gameEnded = false
        }
        this.enemiesLeftText.setText(
            'Enemies left: ' + DataManager.getInstance().getEnemiesLeft().toString()
        )
        if (DataManager.getInstance().getHealthLeft() <= 0.2 && !this.gameEnded) {
            if (this.lowHealthTween.isPaused()) {
                this.background.setAlpha(0)
                this.lowHealthTween.restart()
            }
        } else {
            this.background.setAlpha(0)
        }
    }
}
