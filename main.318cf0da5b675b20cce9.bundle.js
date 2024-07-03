(()=>{"use strict";var t,e={767:(t,e,s)=>{var i,a;s(440);class n extends Phaser.GameObjects.Container{constructor(t){super(t,0,0),this.scene.add.existing(this),this.setSize(2*this.scene.sys.canvas.width,2*this.scene.sys.canvas.height),this.setDepth(1)}setManager(t){this.manager=t}}!function(t){t[t.NONE=0]="NONE",t[t.WIN=1]="WIN",t[t.PAUSE_WIN=2]="PAUSE_WIN",t[t.LOSE=3]="LOSE",t[t.PAUSE_LOSE=4]="PAUSE_LOSE"}(i||(i={}));class h{constructor(){this.loaded=!1}static getInstance(){return h.instance||(h.instance=new h),h.instance}init(){if(this.loaded)return;this.loaded=!0;let t=localStorage.getItem("soundVolume");this.soundVolume=t?JSON.parse(t):.78,t=localStorage.getItem("musicVolume"),this.musicVolume=t?JSON.parse(t):.78,t=localStorage.getItem("hudVolume"),this.hudVolume=t?JSON.parse(t):.78,t=localStorage.getItem("highScore"),this.highScore=t?JSON.parse(t):0,this.reset()}setEnemiesNumber(t){this.enemiesNumber=t}getEnemiesLeft(){return this.enemiesNumber-this.killStreak}loadHudVolume(){r.getInstance().setHudVolume(this.hudVolume)}loadSoundVolume(){r.getInstance().setSoundVolume(this.soundVolume)}setHealthLeft(t){this.healthLeft=t}addStreak(){this.killStreak++}saveScore(){console.log(this.killStreak,this.healthLeft),this.score=200*this.killStreak+50*this.healthLeft,console.log(this.score),this.highScore=Math.max(this.highScore,this.score),localStorage.setItem("highScore",JSON.stringify(this.highScore))}getScore(){return this.score}getHighScore(){return this.highScore}setSound(t){this.soundVolume=t,r.getInstance().setSoundVolume(t),localStorage.setItem("soundVolume",JSON.stringify(t))}getSound(){return this.soundVolume}setMusic(t){this.musicVolume=t,r.getInstance().setMusicVolume(t),localStorage.setItem("musicVolume",JSON.stringify(t))}getMusic(){return this.musicVolume}setHud(t){this.hudVolume=t,r.getInstance().setHudVolume(t),localStorage.setItem("hudVolume",JSON.stringify(t))}getHud(){return this.hudVolume}reset(){this.score=0,this.state=i.NONE,this.healthLeft=1,this.killStreak=0}getState(){return this.state}setState(t){this.state=t}}class r{constructor(){}static getInstance(){return r.instance||(r.instance=new r),r.instance}initGameScene(t){void 0===this.ingameMusic&&(this.ingameMusic=t.sound.add("ingame_music"),this.shootSound=t.sound.add("shoot_sound"),this.enemyShootSound=t.sound.add("enemy_shoot_sound"),this.wallHitSound=t.sound.add("wall_hit_sound"),this.enemyHitSound=t.sound.add("enemy_hit_sound"))}initMenuScene(t){void 0===this.menuMusic&&(this.menuMusic=t.sound.add("menu_music")),this.victoryMusic=t.sound.add("victory_music"),this.buttonClickSound=t.sound.add("button_click_sound"),this.buttonHoverSound=t.sound.add("button_hover_sound")}stopAllMusic(){this.menuMusic.isPaused||this.menuMusic.pause(),this.victoryMusic.isPaused||this.victoryMusic.pause(),this.ingameMusic.isPaused||this.ingameMusic.pause()}playIngameMusic(){this.stopAllMusic(),this.ingameMusic.play({loop:!0,volume:h.getInstance().getMusic()})}playMenuMusic(){this.stopAllMusic(),this.menuMusic.play({loop:!0,seek:23,volume:h.getInstance().getMusic()})}playVictoryMusic(){this.stopAllMusic(),this.victoryMusic.play({volume:h.getInstance().getMusic()})}setSoundVolume(t){this.shootSound.setVolume(t),this.enemyShootSound.setVolume(t),this.wallHitSound.setVolume(t),this.enemyHitSound.setVolume(t)}playWallHitSound(){this.wallHitSound.play({seek:.1})}playEnemyHitSound(){this.enemyHitSound.play({seek:.1})}playButtonClickSound(){this.buttonClickSound.play({seek:.41})}playButtonHoverSound(){this.buttonHoverSound.play({seek:.65})}setMusicVolume(t){this.ingameMusic.setVolume(t),this.menuMusic.setVolume(t),this.victoryMusic.setVolume(t)}setHudVolume(t){this.buttonClickSound.setVolume(t),this.buttonHoverSound.setVolume(t)}playShootSound(){this.shootSound.play()}playEnemyShootSound(){}playHitSound(){this.hitSound.play()}}class o extends Phaser.GameObjects.Container{constructor(t){super(t.scene,t.x,t.y),this.scene.add.existing(this),this.background=this.scene.add.image(0,0,t.texture),this.setSize(this.background.width,this.background.height),this.setInteractive(),this.isOver=!1,this.on("pointerup",t.onButtonClicked),this.on("pointerup",(()=>{r.getInstance().playButtonClickSound()})),this.on("pointerdown",(()=>{this.setAlpha(.6)})),this.on("pointerover",(()=>{this.background.setTexture(t.hoverTexture),this.isOver||(this.isOver=!0,r.getInstance().playButtonHoverSound())})),this.on("pointerout",(()=>{this.setAlpha(1),this.background.setTexture(t.texture),this.isOver=!1})),this.add(this.background)}addText(t){this.text=this.scene.add.bitmapText(t.x,t.y,"font",t.text,t.size).setOrigin(.5).setTint(t.tint),this.add(this.text)}setText(t){this.text.text=t}}class c extends n{constructor(t){super(t),this.create()}create(){r.getInstance().playMenuMusic(),this.createBackground(),this.createButtons()}update(t,e){}createButtons(){this.playButton=new o({scene:this.scene,x:this.scene.sys.canvas.width/2,y:.5*this.scene.sys.canvas.height,texture:"normal_button",hoverTexture:"hover_button",onButtonClicked:()=>{r.getInstance().playIngameMusic(),this.manager.startGame(),this.manager.transitionToMainGameScreen()}}),this.playButton.addText({x:0,y:0,text:"PLAY",tint:0,size:20}),this.settingsButton=new o({scene:this.scene,x:this.scene.sys.canvas.width/2,y:.65*this.scene.sys.canvas.height,texture:"normal_button",hoverTexture:"hover_button",onButtonClicked:()=>{this.manager.transitionToSettingsScreen()}}),this.settingsButton.addText({x:0,y:0,text:"SETTINGS",size:20,tint:0}),this.add(this.playButton),this.add(this.settingsButton)}createBackground(){this.background=this.scene.add.image(this.scene.sys.canvas.width/2,this.scene.sys.canvas.height/2,"background").setInteractive(),this.title=this.scene.add.bitmapText(this.scene.sys.canvas.width/2,.3*this.scene.sys.canvas.height,"font","KING OF TANK",50).setOrigin(.5).setTint(5875712),this.particles=this.scene.add.particles(this.scene.sys.canvas.width/2,.3*this.scene.sys.canvas.height,"flares",{frame:["white"],color:[16667904,16649984],colorEase:"quad.out",x:{min:-200,max:200},lifespan:1200,angle:{min:-100,max:-80},scale:{start:1,end:0,ease:"sine.out"},speed:100,quantity:10,blendMode:"SCREEN"}),this.add(this.background),this.add(this.particles),this.add(this.title)}}class l extends n{constructor(t){super(t),this.create()}create(){this.pauseButton=new o({scene:this.scene,x:this.scene.sys.canvas.width-50,y:50,texture:"pause_normal_button",hoverTexture:"pause_hover_button",onButtonClicked:()=>{this.manager.pauseGame(),this.manager.transitionToPauseGameScreen()}}),this.pauseButton.setScale(.7),this.enemiesLeftText=this.scene.add.text(20,20,"Enemies left: ",{fontSize:"30px",color:"white",fontStyle:"bold"}),this.add(this.pauseButton),this.add(this.enemiesLeftText)}update(t,e){h.getInstance().getState()==i.LOSE?(h.getInstance().setState(i.PAUSE_LOSE),this.manager.pauseGame(),this.manager.transitionToEndGameScreen()):h.getInstance().getState()==i.WIN&&(h.getInstance().setState(i.PAUSE_WIN),this.manager.pauseGame(),this.manager.transitionToEndGameScreen()),this.enemiesLeftText.setText("Enemies left: "+h.getInstance().getEnemiesLeft().toString())}}class d extends Phaser.GameObjects.Container{constructor(t){super(t.scene,t.x,t.y),this.scene.add.existing(this),this.background=this.scene.add.image(0,0,t.texture),this.buttons=[],this.add(this.background),t.buttons&&(this.buttons=t.buttons,this.add(this.buttons))}addText(t){const e=this.scene.add.bitmapText(t.x,t.y,"font",t.text,t.size).setOrigin(.5).setTint(t.tint);this.add(e)}addTextObject(t){this.add(t)}}class u extends n{constructor(t){super(t),this.create()}create(){this.dataManager=h.getInstance(),this.createBackground(),this.createPanel(),this.victorySymbol.setScale(0),this.background.setScale(0),this.settingsButton.setScale(0),this.score=0,this.highScore=0,this.dataManager.getState()==i.PAUSE_LOSE?(this.panel.setScale(0),this.scene.add.tween({targets:[this.background,this.panel,this.settingsButton],scale:1,ease:"back.out",duration:300,onComplete:()=>{this.scene.tweens.addCounter({from:0,to:this.dataManager.getScore(),duration:2e3,ease:"linear",onUpdate:t=>{const e=Math.round(t.getValue());this.scoreText.setText(`Score: ${e}`)}}),this.scene.tweens.addCounter({from:0,to:this.dataManager.getHighScore(),duration:2e3,ease:"linear",onUpdate:t=>{const e=Math.round(t.getValue());this.highScoreText.setText(`High score: ${e}`)}})}})):(this.panel.setAlpha(0),this.scene.tweens.chain({targets:this.victorySymbol,tweens:[{scale:1,duration:300,ease:"back.out"},{delay:1e3,y:this.scene.sys.canvas.height/2-200,duration:500,scale:.4,ease:"power3",onComplete:()=>{this.particles.start()}},{targets:this.panel,alpha:1,ease:"linear",duration:1e3,onComplete:()=>{this.scene.tweens.addCounter({from:0,to:this.dataManager.getScore(),duration:2e3,ease:"linear",onUpdate:t=>{const e=Math.round(t.getValue());this.scoreText.setText(`Score: ${e}`)}}),this.scene.tweens.addCounter({from:0,to:this.dataManager.getHighScore(),duration:2e3,ease:"linear",onUpdate:t=>{const e=Math.round(t.getValue());this.highScoreText.setText(`High score: ${e}`)}})}}]}),this.scene.add.tween({targets:[this.background,this.settingsButton],scale:1,ease:"back.out",duration:300}))}update(t,e){}createPanel(){this.restartButton=new o({scene:this.scene,x:-150,y:100,texture:"restart_normal_button",hoverTexture:"restart_hover_button",onButtonClicked:()=>{this.scene.add.tween({targets:[this.background,this.panel,this.settingsButton],scale:0,ease:"back.in",duration:300,onComplete:()=>{this.scene.tweens.killAll(),r.getInstance().playIngameMusic(),this.manager.startGame(),this.manager.transitionToLastScreen()}})}}),this.settingsButton=new o({scene:this.scene,x:50,y:50,texture:"settings_normal_button",hoverTexture:"settings_hover_button",onButtonClicked:()=>{this.manager.transitionToSettingsScreen()}}),this.homeButton=new o({scene:this.scene,x:150,y:100,texture:"home_normal_button",hoverTexture:"home_hover_button",onButtonClicked:()=>{this.scene.tweens.killAll(),r.getInstance().playMenuMusic(),this.manager.transitionToMainMenuScreen()}}),this.panel=new d({scene:this.scene,x:this.scene.sys.canvas.width/2,y:this.scene.sys.canvas.height/2+100,texture:"big_panel",buttons:[this.restartButton,this.homeButton]}),this.panel.addText({x:0,y:-150,text:this.dataManager.getState()==i.PAUSE_LOSE?"DEFEAT":"VICTORY",size:40,tint:16777215}),this.scoreText=this.scene.add.text(-100,-80,"Score: 0",{color:"white",fontSize:"30px",fontStyle:"bold"}),this.highScoreText=this.scene.add.text(-190,-20,"High score: 0",{color:"white",fontSize:"30px",fontStyle:"bold"}),this.panel.addTextObject(this.scoreText),this.panel.addTextObject(this.highScoreText),this.add(this.panel),this.add(this.settingsButton)}createBackground(){this.background=this.scene.add.rectangle(this.scene.sys.canvas.width/2,this.scene.sys.canvas.height/2,this.scene.sys.canvas.width,this.scene.sys.canvas.height,0).setAlpha(.5),this.victorySymbol=this.scene.add.image(this.scene.sys.canvas.width/2,this.scene.sys.canvas.height/2,"victory_symbol"),this.particles=this.scene.add.particles(this.scene.sys.canvas.width/2,200,"flares",{frame:["white"],color:[16667904,16649984],x:{min:-50,max:50},colorEase:"quad.out",lifespan:2500,angle:{min:-110,max:-70},scale:{start:1,end:0,ease:"sine.out"},speed:100,quantity:4,emitting:!1,blendMode:"SCREEN"}),this.add(this.background),this.add(this.particles),this.add(this.victorySymbol)}}class g extends Phaser.GameObjects.Container{constructor(t){super(t.scene,t.x,t.y),this.sliderGraphics=this.scene.add.graphics(),this.sliderGraphics.lineStyle(1,16777215,1),this.sliderGraphics.lineBetween(0,0,t.width,0),this.text=this.scene.add.bitmapText(-100,0,"font",t.text,30).setTint(16777215).setOrigin(.5),this.value=this.scene.add.text(500,0,Math.floor(t.value).toString(),{color:"white",fontSize:"40px",fontStyle:"bold"}).setOrigin(.5),this.pointer=this.scene.add.circle(t.width*(t.value/t.max),0,10,65535),this.pointer.setInteractive({draggable:!0}),this.pointer.on("dragstart",(()=>{this.pointer.fillColor=16777215})),this.pointer.on("drag",((e,s,i)=>{s=Phaser.Math.Clamp(s,this.sliderGraphics.x,this.sliderGraphics.x+t.width),this.pointer.x=s,this.value.setText(Math.floor(s/t.width*t.max).toString())})),this.pointer.on("drag",t.onDragging),this.pointer.on("dragend",(()=>{this.pointer.fillColor=65535})),this.add(this.sliderGraphics),this.add(this.text),this.add(this.pointer),this.add(this.value)}registerDraggingEvents(){}}class y extends n{constructor(t){super(t),this.create()}create(){this.dataManager=h.getInstance(),this.createBackground(),this.createButtons(),this.createSliders()}update(t,e){}createSliders(){let t={scene:this.scene,x:this.scene.sys.canvas.width/2-200,y:200,text:"SOUND",width:450,max:100,value:100*this.dataManager.getSound(),onDragging:(e,s,i)=>{s=Phaser.Math.Clamp(s,0,t.width),this.dataManager.setSound(s/t.width)}};this.soundSlider=new g(t),t={scene:this.scene,x:this.scene.sys.canvas.width/2-200,y:400,text:"MUSIC",width:450,max:100,value:100*this.dataManager.getMusic(),onDragging:(e,s,i)=>{s=Phaser.Math.Clamp(s,0,t.width),this.dataManager.setMusic(s/t.width)}},this.musicSlider=new g(t),t={scene:this.scene,x:this.scene.sys.canvas.width/2-200,y:600,text:"HUD",width:450,max:100,value:100*this.dataManager.getHud(),onDragging:(e,s,i)=>{s=Phaser.Math.Clamp(s,0,t.width),this.dataManager.setHud(s/t.width)}},this.hudSlider=new g(t),this.add(this.soundSlider),this.add(this.musicSlider),this.add(this.hudSlider)}createButtons(){this.backButton=new o({scene:this.scene,x:50,y:50,texture:"back_normal_button",hoverTexture:"back_hover_button",onButtonClicked:()=>{this.manager.transitionToLastScreen()}}).setScale(.7),this.add(this.backButton)}createBackground(){this.background=this.scene.add.rectangle(this.scene.sys.canvas.width/2,this.scene.sys.canvas.height/2,this.scene.sys.canvas.width,this.scene.sys.canvas.height,3290945),this.add(this.background)}}class p extends n{constructor(t){super(t),this.create()}create(){this.createBackground(),this.createButtons(),this.background.setScale(0),this.panel.setScale(0),this.settingsButton.setScale(0),this.scene.add.tween({targets:[this.background,this.panel,this.settingsButton],scale:1,ease:"back.out",duration:300})}update(t,e){}createButtons(){this.restartButton=new o({scene:this.scene,x:-150,y:30,texture:"restart_normal_button",hoverTexture:"restart_hover_button",onButtonClicked:()=>{this.scene.add.tween({targets:[this.background,this.panel,this.settingsButton],scale:0,ease:"back.in",duration:300,onComplete:()=>{this.manager.startGame(),this.manager.transitionToLastScreen()}})}}),this.resumeButton=new o({scene:this.scene,x:0,y:30,texture:"resume_normal_button",hoverTexture:"resume_hover_button",onButtonClicked:()=>{this.scene.add.tween({targets:[this.background,this.panel,this.settingsButton],scale:0,ease:"back.in",duration:300,onComplete:()=>{this.manager.resumeGame(),this.manager.transitionToLastScreen()}})}}).setScale(1.2),this.settingsButton=new o({scene:this.scene,x:50,y:50,texture:"settings_normal_button",hoverTexture:"settings_hover_button",onButtonClicked:()=>{this.manager.transitionToSettingsScreen()}}),this.homeButton=new o({scene:this.scene,x:150,y:30,texture:"home_normal_button",hoverTexture:"home_hover_button",onButtonClicked:()=>{r.getInstance().playMenuMusic(),this.manager.transitionToMainMenuScreen()}}),this.panel=new d({scene:this.scene,x:this.scene.sys.canvas.width/2,y:this.scene.sys.canvas.height/2,texture:"medium_panel",buttons:[this.restartButton,this.resumeButton,this.homeButton]}),this.panel.addText({x:0,y:-70,text:"PAUSE",size:40,tint:16777215}),this.add(this.panel),this.add(this.settingsButton)}createBackground(){this.background=this.scene.add.rectangle(this.scene.sys.canvas.width/2,this.scene.sys.canvas.height/2,this.scene.sys.canvas.width,this.scene.sys.canvas.height,0).setAlpha(.5),this.add(this.background)}}class m{constructor(){this.screenStack=[]}setGameScene(t){this.gameScene=t}setMenuScene(t){this.menuScene=t}startGame(){this.gameScene.scene.restart()}resumeGame(){this.gameScene.scene.isPaused()&&this.gameScene.scene.resume()}pauseGame(){this.gameScene.scene.isPaused()||this.gameScene.scene.pause()}transitionToLastScreen(){this.screenStack.pop(),this.currentScreen.destroy(),this.currentScreen=this.screenStack[this.screenStack.length-1],this.currentScreen.setPosition(0)}transitionToPauseGameScreen(){this.transitionTo(new p(this.menuScene))}transitionToSettingsScreen(){this.transitionTo(new y(this.menuScene))}transitionToEndGameScreen(){this.transitionTo(new u(this.menuScene))}transitionToMainGameScreen(){this.transitionTo(new l(this.menuScene))}update(t,e){this.currentScreen.update(t,e)}transitionToMainMenuScreen(){if(0==this.screenStack.length)this.transitionTo(new c(this.menuScene));else{for(;this.screenStack.length>1;)this.screenStack.pop().destroy();this.currentScreen=this.screenStack[0],this.currentScreen.setPosition(0)}}transitionTo(t){this.screenStack.length>0&&this.currentScreen.setPosition(1e3),this.currentScreen=t,this.currentScreen.setManager(this),this.screenStack.push(this.currentScreen)}}class S extends Phaser.Scene{constructor(){super({key:"BootScene"})}preload(){this.cameras.main.setBackgroundColor(0),this.createLoadingGraphics(),this.load.on("progress",(t=>{this.progressBar.clear(),this.progressBar.fillStyle(8971347,1),this.progressBar.fillRect(this.cameras.main.width/4,this.cameras.main.height/2-16,this.cameras.main.width/2*t,16)}),this),this.load.on("complete",(()=>{this.progressBar.destroy(),this.loadingBar.destroy()}),this),this.load.pack("preload","./assets/pack.json","preload")}create(){let t=new m;this.scene.start("GameScene",t).start("MenuScene",t)}createLoadingGraphics(){this.loadingBar=this.add.graphics(),this.loadingBar.fillStyle(16777215,1),this.loadingBar.fillRect(this.cameras.main.width/4-2,this.cameras.main.height/2-18,this.cameras.main.width/2+4,20),this.progressBar=this.add.graphics()}}class b extends Phaser.GameObjects.Image{constructor(t){super(t.scene,t.x,t.y,t.texture),this.rotation=t.rotation,this.initImage(),this.scene.add.existing(this)}initImage(){this.bulletSpeed=1e3,this.setOrigin(.5,.5),this.setDepth(2),this.scene.physics.world.enable(this),this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2,this.bulletSpeed,this.body.velocity)}update(){}}!function(t){t[t.UP=-Math.PI]="UP",t[t.DOWN=0]="DOWN",t[t.RIGHT=-Math.PI/2]="RIGHT",t[t.LEFT=Math.PI/2]="LEFT",t[t.NONE=4*Math.PI]="NONE"}(a||(a={}));class x extends Phaser.GameObjects.Image{getBullets(){return this.bullets}constructor(t){super(t.scene,t.x,t.y,t.texture,t.frame),this.horizontalKeyDirection=a.NONE,this.verticalKeyDirection=a.NONE,this.initImage(),this.scene.add.existing(this)}initImage(){this.health=1,this.lastShoot=0,this.speed=300,this.setOrigin(.5,.5),this.setDepth(0),this.angle=180,this.barrel=this.scene.add.image(this.x,this.y,"barrelBlue"),this.barrel.setOrigin(.5,1),this.barrel.setDepth(1),this.barrel.angle=180,this.lifeBar=this.scene.add.graphics(),this.redrawLifebar(),this.bullets=this.scene.add.group({classType:b,active:!0,maxSize:10,runChildUpdate:!0}),this.keyDown=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),this.keyUp=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),this.keyLeft=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),this.keyRight=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),this.shootingKey=this.scene.input.activePointer,this.scene.physics.world.enable(this)}update(t,e){this.active?(this.handleInput(t,e),this.handleShooting(t,e),this.barrel.x=this.x,this.barrel.y=this.y,this.lifeBar.x=this.x,this.lifeBar.y=this.y):(this.destroy(),this.barrel.destroy(),this.lifeBar.destroy())}handleInput(t,e){let s=this.scene.cameras.main.getWorldPoint(this.shootingKey.x,this.shootingKey.y);this.barrel.rotation=-Phaser.Math.Angle.BetweenY(this.barrel.x,this.barrel.y,s.x,s.y)+Math.PI,this.keyUp.isDown||this.keyDown.isDown?this.keyUp.isDown&&this.keyDown.isDown?this.verticalKeyDirection=this.keyUp.timeDown<this.keyDown.timeDown?a.DOWN:a.UP:this.keyUp.isDown?this.verticalKeyDirection=a.UP:this.verticalKeyDirection=a.DOWN:this.verticalKeyDirection=a.NONE,this.keyLeft.isDown||this.keyRight.isDown?this.keyLeft.isDown&&this.keyRight.isDown?this.horizontalKeyDirection=this.keyLeft.timeDown<this.keyRight.timeDown?a.RIGHT:a.LEFT:this.keyLeft.isDown?this.horizontalKeyDirection=a.LEFT:this.horizontalKeyDirection=a.RIGHT:this.horizontalKeyDirection=a.NONE,this.horizontalKeyDirection==a.NONE&&(this.horizontalKeyDirection=this.verticalKeyDirection),this.verticalKeyDirection==a.NONE&&(this.verticalKeyDirection=this.horizontalKeyDirection),this.horizontalKeyDirection==a.NONE&&this.verticalKeyDirection==a.NONE?this.body.setVelocity(0):(Math.abs(this.horizontalKeyDirection-this.verticalKeyDirection)>Math.PI/2?this.rotateTo((this.horizontalKeyDirection+this.verticalKeyDirection)/2+Math.PI,e):this.rotateTo((this.horizontalKeyDirection+this.verticalKeyDirection)/2,e),this.scene.physics.velocityFromRotation(this.rotation+Math.PI/2,this.speed,this.body.velocity))}handleShooting(t,e){this.shootingKey.isDown&&this.scene.time.now>this.lastShoot&&(this.scene.cameras.main.shake(20,.005),this.scene.tweens.add({targets:this,props:{alpha:.8},delay:0,duration:5,ease:"Power1",easeParams:null,hold:0,repeat:0,repeatDelay:0,yoyo:!0,paused:!1}),this.bullets.getLength()<10&&(r.getInstance().playShootSound(),this.bullets.add(new b({scene:this.scene,rotation:this.barrel.rotation,x:this.barrel.x,y:this.barrel.y,texture:"bulletBlue"})),this.lastShoot=this.scene.time.now+80))}rotateTo(t,e){t>=2*Math.PI?t-=2*Math.PI:t<=-2*Math.PI&&(t+=2*Math.PI);let s=t-this.rotation,i=s>0?1:-1;Math.abs(s)>Math.PI&&(s=t-(this.rotation+2*i*Math.PI),i=s>0?1:-1),Math.abs(s)<=.02*e?this.rotation=t:this.rotation+=.02*i*e}redrawLifebar(){this.lifeBar.clear(),this.lifeBar.fillStyle(15100456,1),this.lifeBar.fillRect(-this.width/2,this.height/2,this.width*this.health,15),this.lifeBar.lineStyle(2,16777215),this.lifeBar.strokeRect(-this.width/2,this.height/2,this.width,15),this.lifeBar.setDepth(1)}updateHealth(){this.health>0?(this.health-=.05,h.getInstance().setHealthLeft(this.health),this.redrawLifebar()):(this.health=0,this.active=!1,h.getInstance().saveScore(),h.getInstance().setState(i.LOSE))}}class v extends Phaser.GameObjects.Image{getBarrel(){return this.barrel}getBullets(){return this.bullets}constructor(t){super(t.scene,t.x,t.y,t.texture,t.frame),this.initContainer(),this.scene.add.existing(this)}initContainer(){this.health=1,this.lastShoot=0,this.speed=100,this.setDepth(0),this.barrel=this.scene.add.image(0,0,"barrelRed"),this.barrel.setOrigin(.5,1),this.barrel.setDepth(1),this.lifeBar=this.scene.add.graphics(),this.redrawLifebar(),this.bullets=this.scene.add.group({active:!0,maxSize:10,runChildUpdate:!0}),this.scene.tweens.add({targets:this,props:{y:this.y-200},delay:0,duration:2e3,ease:"Linear",easeParams:null,hold:0,repeat:-1,repeatDelay:0,yoyo:!0}),this.scene.physics.world.enable(this)}update(){this.active?(this.barrel.x=this.x,this.barrel.y=this.y,this.lifeBar.x=this.x,this.lifeBar.y=this.y,this.handleShooting()):(this.destroy(),this.barrel.destroy(),this.lifeBar.destroy())}handleShooting(){this.scene.time.now>this.lastShoot&&this.bullets.getLength()<10&&(r.getInstance().playEnemyShootSound(),this.bullets.add(new b({scene:this.scene,rotation:this.barrel.rotation,x:this.barrel.x,y:this.barrel.y,texture:"bulletRed"})),this.lastShoot=this.scene.time.now+400)}redrawLifebar(){this.lifeBar.clear(),this.lifeBar.fillStyle(15100456,1),this.lifeBar.fillRect(-this.width/2,this.height/2,this.width*this.health,15),this.lifeBar.lineStyle(2,16777215),this.lifeBar.strokeRect(-this.width/2,this.height/2,this.width,15),this.lifeBar.setDepth(1)}updateHealth(){this.health>0?(this.health-=.05,this.redrawLifebar()):(h.getInstance().addStreak(),this.health=0,this.active=!1)}}class w extends Phaser.GameObjects.Image{constructor(t){super(t.scene,t.x,t.y,t.texture),this.initImage(),this.scene.add.existing(this)}initImage(){this.setOrigin(0,0),this.scene.physics.world.enable(this),this.body.setImmovable(!0)}update(){}}class k extends Phaser.Scene{constructor(){super({key:"GameScene"}),this.bulletHitLayer=t=>{this.player.getBullets().contains(t)&&r.getInstance().playWallHitSound(),t.destroy()},this.bulletHitObstacles=t=>{t.destroy()},this.enemyBulletHitPlayer=(t,e)=>{t.destroy(),e.updateHealth()},this.playerBulletHitEnemy=(t,e)=>{t.destroy(),r.getInstance().playEnemyHitSound(),e.updateHealth()}}init(t){this.input.setDefaultCursor("url(./assets/hud/Aim.cur), pointer"),this.screenManager=t,this.screenManager.setGameScene(this),r.getInstance().initGameScene(this),h.getInstance().init()}preload(){h.getInstance().loadSoundVolume()}create(){this.input.setTopOnly(!0),this.cameras.main.setZoom(.6),this.map=this.make.tilemap({key:"levelMap"}),this.isWinning=!1,this.tileset=this.map.addTilesetImage("tiles"),this.layer=this.map.createLayer("tileLayer",this.tileset,0,0),this.layer.setCollisionByProperty({collide:!0}),this.obstacles=this.add.group({classType:w,runChildUpdate:!0}),this.enemies=this.add.group({classType:v}),this.convertObjects(),h.getInstance().setEnemiesNumber(this.enemies.getChildren().length),h.getInstance().reset(),this.physics.add.collider(this.player,this.layer),this.physics.add.collider(this.player,this.obstacles),this.physics.add.collider(this.player.getBullets(),this.layer,this.bulletHitLayer),this.physics.add.collider(this.player.getBullets(),this.obstacles,this.bulletHitObstacles),this.enemies.getChildren().forEach((t=>{this.physics.add.overlap(this.player.getBullets(),t,this.playerBulletHitEnemy),this.physics.add.overlap(t.getBullets(),this.player,this.enemyBulletHitPlayer),this.physics.add.collider(t.getBullets(),this.obstacles,this.bulletHitObstacles),this.physics.add.collider(t.getBullets(),this.layer,this.bulletHitLayer)}),this),this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels),this.cameras.main.startFollow(this.player,!0,.05,.05);const t=Math.min(200/this.map.widthInPixels,200/this.map.heightInPixels);this.minimap=this.cameras.add(this.sys.canvas.width-200,this.sys.canvas.height-200,200,200).setZoom(t).setBackgroundColor(0).setOrigin(.5).setScroll(0,-100).startFollow(this.player).setBounds(0,-50/t/2,this.map.widthInPixels,this.map.heightInPixels)}update(t,e){this.player.update(t,e),this.enemies.getChildren().forEach((t=>{if(t.update(),this.player.active&&t.active){var e=Phaser.Math.Angle.Between(t.body.x,t.body.y,this.player.body.x,this.player.body.y);t.getBarrel().angle=(e+Math.PI/2)*Phaser.Math.RAD_TO_DEG}}),this),0!=this.enemies.getChildren().length||this.isWinning||(this.isWinning=!0,r.getInstance().playVictoryMusic(),this.time.delayedCall(1e3,(()=>{h.getInstance().saveScore(),h.getInstance().setState(i.WIN)})))}convertObjects(){this.map.getObjectLayer("objects").objects.forEach((t=>{if("player"===t.type)this.player=new x({scene:this,x:t.x,y:t.y,texture:"tankBlue"});else if("enemy"===t.type){let e=new v({scene:this,x:t.x,y:t.y,texture:"tankRed"});this.enemies.add(e)}else{let e=new w({scene:this,x:t.x,y:t.y-40,texture:t.type});this.obstacles.add(e)}}))}}class B extends Phaser.Scene{constructor(){super({key:"MenuScene"})}init(){r.getInstance().initMenuScene(this),h.getInstance().init()}preload(){h.getInstance().loadHudVolume()}create(t){this.input.setTopOnly(!0),this.scene.bringToTop(),this.screenManager=t,this.screenManager.setMenuScene(this),this.screenManager.transitionToMainMenuScreen(),this.screenManager.pauseGame()}update(t,e){this.screenManager.update(t,e)}}const M={title:"Tank",url:"https://github.com/digitsensitive/phaser3-typescript",version:"0.0.1",type:Phaser.AUTO,parent:"game",scene:[S,B,k],input:{keyboard:!0},scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},zoom:.1,physics:{default:"arcade",arcade:{gravity:{x:0,y:0}}},backgroundColor:"#000000",render:{antialias:!0}};class I extends Phaser.Game{constructor(t){super(t)}}window.addEventListener("load",(()=>{new I(M)}))}},s={};function i(t){var a=s[t];if(void 0!==a)return a.exports;var n=s[t]={exports:{}};return e[t].call(n.exports,n,n.exports,i),n.exports}i.m=e,t=[],i.O=(e,s,a,n)=>{if(!s){var h=1/0;for(l=0;l<t.length;l++){for(var[s,a,n]=t[l],r=!0,o=0;o<s.length;o++)(!1&n||h>=n)&&Object.keys(i.O).every((t=>i.O[t](s[o])))?s.splice(o--,1):(r=!1,n<h&&(h=n));if(r){t.splice(l--,1);var c=a();void 0!==c&&(e=c)}}return e}n=n||0;for(var l=t.length;l>0&&t[l-1][2]>n;l--)t[l]=t[l-1];t[l]=[s,a,n]},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={792:0};i.O.j=e=>0===t[e];var e=(e,s)=>{var a,n,[h,r,o]=s,c=0;if(h.some((e=>0!==t[e]))){for(a in r)i.o(r,a)&&(i.m[a]=r[a]);if(o)var l=o(i)}for(e&&e(s);c<h.length;c++)n=h[c],i.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return i.O(l)},s=self.webpackChunktype_project_template=self.webpackChunktype_project_template||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))})();var a=i.O(void 0,[96],(()=>i(767)));a=i.O(a)})();