import { Scene } from 'phaser'
import { MainMenuScreen } from '../objects/screens/main-menu-screen'
import { Screen } from '../objects/screens/screen'
import { MainGameScreen } from '../objects/screens/main-game-screen'
import { EndGameScreen } from '../objects/screens/end-game-screen'
import { SettingsScreen } from '../objects/screens/settings-screen'
import { PauseGameScreen } from '../objects/screens/pause-game-screen'
import { SoundManager } from './sound-manager'

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
    public transitionToLastScreenInstantly() {
        console.log(this.currentScreen)
        this.currentScreen.destroy()
        this.screenStack.pop()
        this.currentScreen = this.screenStack[this.screenStack.length - 1]
        this.currentScreen.setPosition(0)
        this.currentScreen.enableButtons()
    }
    public transitionToLastScreen() {
        this.screenStack.pop()
        let oldScreen = this.currentScreen
        this.currentScreen = this.screenStack[this.screenStack.length - 1]
        this.currentScreen.setPosition(0)
        this.menuScene.add.tween({
            targets: oldScreen,
            duration: 500,
            x: 1000,
            ease: 'back.in',
            onComplete: () => {
                this.currentScreen.enableButtons()
                oldScreen.destroy()
            }
        })
    }
    public transitionToPauseGameScreen() {
        this.transitionTo(new PauseGameScreen(this.menuScene))
    }
    public transitionToSettingsScreen() {
        let screen = new SettingsScreen(this.menuScene)
        screen.setManager(this)
        screen.setPosition(1000, 0)
        screen.disableButtons()
        this.menuScene.add.tween({
            targets: screen,
            duration: 500,
            ease: 'back.out',
            x: 0,
            onComplete: () => {
                if (this.screenStack.length > 0) {
                    let oldScreen = this.currentScreen
                    oldScreen.setPosition(1000)
                }
                screen.enableButtons()
                this.currentScreen = screen
                this.screenStack.push(this.currentScreen)
            }
        })
        
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
            this.menuScene.tweens.killAll()
            let callback = () => {
                this.menuScene.cameras.main.off(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, callback)
                SoundManager.getInstance().playMenuMusic()
                while (this.screenStack.length > 1) {
                    let screen = this.screenStack.pop()!
                    screen.destroy()
                }
                this.currentScreen = this.screenStack[0]
                this.currentScreen.setPosition(0)
                this.currentScreen.enableButtons()
                this.menuScene.cameras.main.fadeIn(200)
                console.log('fade in')
                
            }
            this.menuScene.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, callback)
            
        }
    }
    public getCurrentScreen() {
        return this.currentScreen
    }
    private transitionTo(screen: Screen) {
        if (this.screenStack.length > 0) {
            this.currentScreen.setPosition(1000)
        }
        this.currentScreen = screen
        this.currentScreen.setManager(this)
        this.screenStack.push(this.currentScreen)
        console.log(this.currentScreen)
    }
}
