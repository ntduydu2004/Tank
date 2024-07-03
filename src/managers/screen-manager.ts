import { Scene } from 'phaser'
import { MainMenuScreen } from '../objects/screens/main-menu-screen'
import { Screen } from '../objects/screens/screen'
import { MainGameScreen } from '../objects/screens/main-game-screen'
import { EndGameScreen } from '../objects/screens/end-game-screen'
import { SettingsScreen } from '../objects/screens/settings-screen'
import { PauseGameScreen } from '../objects/screens/pause-game-screen'

export class ScreenManager {
    private currentScreen: Screen
    private gameScene: Scene
    private menuScene: Scene
    private screenStack: Screen[]
    public constructor() {
        this.screenStack = []
    }
    public setGameScene(gameScene: Scene) {
        this.gameScene = gameScene
    }
    public setMenuScene(menuScene: Scene) {
        this.menuScene = menuScene
    }

    public startGame() {
        this.gameScene.scene.restart()
    }
    public resumeGame() {
        if (this.gameScene.scene.isPaused()) {
            this.gameScene.scene.resume()
        }
    }
    public pauseGame() {
        if (!this.gameScene.scene.isPaused()) {
            this.gameScene.scene.pause()
        }
    }
    public transitionToLastScreen() {
        this.screenStack.pop()
        this.currentScreen.destroy()
        this.currentScreen = this.screenStack[this.screenStack.length - 1]
        this.currentScreen.setPosition(0)
    }
    public transitionToPauseGameScreen() {
        this.transitionTo(new PauseGameScreen(this.menuScene))
    }
    public transitionToSettingsScreen() {
        this.transitionTo(new SettingsScreen(this.menuScene))
    }
    public transitionToEndGameScreen() {
        this.transitionTo(new EndGameScreen(this.menuScene))
    }
    public transitionToMainGameScreen() {
        this.transitionTo(new MainGameScreen(this.menuScene))
    }
    public update(time: number, delta: number) {
        this.currentScreen.update(time, delta)
    }
    public transitionToMainMenuScreen() {
        if (this.screenStack.length == 0) {
            this.transitionTo(new MainMenuScreen(this.menuScene))
        } else {
            while (this.screenStack.length > 1) {
                let screen = this.screenStack.pop()!
                screen.destroy()
            }
            this.currentScreen = this.screenStack[0]
            this.currentScreen.setPosition(0)
        }
    }
    private transitionTo(screen: Screen) {
        if (this.screenStack.length > 0) {
            this.currentScreen.setPosition(1000)
        }
        this.currentScreen = screen
        this.currentScreen.setManager(this)
        this.screenStack.push(this.currentScreen)
    }
}
