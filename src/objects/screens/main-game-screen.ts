import { Scene } from "phaser";
import { Screen } from "./screen";
import { Button } from "../../ui-objects/button";
import { DataManager, State } from "../../managers/data-manager";

export class MainGameScreen extends Screen {
    private pauseButton: Button
    private enemiesLeftText: Phaser.GameObjects.Text
    public constructor(scene: Scene) {
        super(scene)
        this.create()
    }
    public create(): void {
        
        this.pauseButton = new Button({
            scene: this.scene,
            x: this.scene.sys.canvas.width - 50,
            y: 50,
            texture: 'pause_normal_button',
            hoverTexture: 'pause_hover_button',
            onButtonClicked: () => {
                this.manager.pauseGame()
                this.manager.transitionToPauseGameScreen()
            }
        })
        this.pauseButton.setScale(0.7)
        this.enemiesLeftText = this.scene.add.text(20, 20, 'Enemies left: ', {fontSize: '30px', color: 'white', fontStyle: 'bold'})
        this.add(this.pauseButton)
        this.add(this.enemiesLeftText)
    }

    public update(time: number, delta: number): void {
        if (DataManager.getInstance().getState() == State.LOSE) {
            DataManager.getInstance().setState(State.PAUSE_LOSE)
            this.manager.pauseGame()
            this.manager.transitionToEndGameScreen()
        }
        else if (DataManager.getInstance().getState() == State.WIN) {
            DataManager.getInstance().setState(State.PAUSE_WIN)
            this.manager.pauseGame()
            this.manager.transitionToEndGameScreen()
        }
        this.enemiesLeftText.setText('Enemies left: ' + DataManager.getInstance().getEnemiesLeft().toString())
    }
}