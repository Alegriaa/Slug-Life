class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }
/*

Platforms do not have physics hooked up yet but they ARE all in a ground named platformGroup and groundGroup

*/
    preload(){
        this.load.image('redbottle', './assets/redbottle.png');
        this.load.image('platform', './assets/platform.png');//placeholder image 
        this.load.image('platform1', './assets/platform1.png');//placeholder image 
        this.load.image('platform2', './assets/platform2.png');//placeholder image 
        this.load.image('platform3', './assets/platform3.png');//placeholder image 
        this.load.image('background1', './assets/background.png');//placeholder image 
        this.load.image('backgroundFront', './assets/backgroundFront.png');//placeholder image 
        this.load.image('redAnimation', './assets/redAnimation.png');
    }
    create() {
        let playConfig = {
            fontFamily: 'Impact', // changed the font
            fontSize: '28px',

            color: '#00FF00',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0


        }
        this.add.text(centerX, centerY - textSpacer * 4, 'SLUG LIFE PLAY SCENE 2', playConfig).setOrigin(0.5);


        this.ACCELERATION = 1500;
        this.MAX_X_VEL = 500;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.DRAG = 600;    // DRAG < ACCELERATION = icy slide
        this.MAX_JUMPS = 1; // change for double/triple/etc. jumps 🤾‍
        this.JUMP_VELOCITY = -700;
        
        
       

        cursors = this.input.keyboard.createCursorKeys();

        this.background1 = this.add.tileSprite(0,0, 960, 640,'background1').setOrigin(0,0);
        this.backgroundFront = this.add.tileSprite(0,0, 960, 640,'backgroundFront').setOrigin(0,0);

        this.virus = new Virus(this, centerX, 0, 'virus');

      // this.virus.body.gravity.y = 2600;
        //this.virus.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        //this.virus.setCollideWorldBounds(true);
        



         
      

        //platforms spawn on the top half of the screen and the ground objects spawn on the bottom half
        this.platformGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        
        this.groundGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        this.powerupGroup = this.add.group({
            runChildUpdate: true
        })
        
        this.platformClock = this.time.delayedCall(700, () => { //delay call to spawn second platform
            this.addPlatform();
         }, null, this);
         this.groundClock = this.time.delayedCall(2500, () => { //delay call to spawn extra ground
         }, null, this); 
         
        this.ground1 = this.physics.add.sprite(100, 500, 'platform').setScale(15, .5).setOrigin(0, 0);//spawn starting platform
        //this.ground1.setImmovable();

        this.addGround();

         
        

        


//       //  this.ground = this.add.group();
// for (let i = 0; i < game.config.width; i += tileSize){
//       this.ground = this.physics.add.sprite(centerX, this.game.config.height * .95, 'ground');
//       //this.ground.displayWidth = this.game.config.width * 1.1;
//       //this.ground.setCollideWorldBounds(true);
//       this.ground.setCollideWorldBounds(true);

//      // this.ground.setImmovable();
// }


        //this.ground.setCollideWorldBounds(true);


        this.physics.add.collider(this.virus, this.ground)



      //  this.ground.setImmovable();
        this.physics.add.collider(this.virus, this.ground1);
        this.physics.add.collider(this.virus, this.ground);
        this.physics.add.collider(this.virus, this.platformGroup);
        this.physics.add.collider(this.virus, this.groundGroup);
        this.physics.add.collider(this.virus, this.powerupGroup);
        
        
       
        //this.groundGroup.setAll('body.immovable', true);
        //this.platformGroup.setAll('body.immovable', true);
          this.powerupTest = new Powerup(this, 500, 500, 'redbottle',0);
          this.powerupGroup.add(this.powerupTest);
       
          this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 5, first: 0}),
            frameRate: 30
        });
       

        //this.physics.arcade.collide(this.virus, this.powerupGroup, function(a,b){ console.log('collided');}, null);

        }
    

        
addPlatform() {

    this.skinDesider = Math.floor(Math.random() * 3) + 1; //picks a random number between 1-3, uses this number to pick a skin for the platform
    this.heightDesider =  (Math.floor(Math.random() * 300) + 100);//picks a random number between 100-300 for the height
    
    // create new platforms according to the height and skin parameters
    if(this.skinDesider == 1){
        this.platform =  new Platform(this, 1200, this.heightDesider, 'platform', 0).setScale(5, 0.5);
        //this.powerupAdd = new Powerup(this, 1200, this.heightDesider1-30, 'redbottle',0);
        
    } else if (this.skinDesider == 2){

        this.platform =  new Platform(this, 1200, this.heightDesider, 'platform1', 0).setScale(5, 0.5); 
    } else {
        this.platform =  new Platform(this, 1200, this.heightDesider, 'platform2', 0).setScale(5, 0.5);
    }
        
    this.platformGroup.add(this.platform); // add it to existing group
    //this.platformsPhysics.add(this.platform);
}

addGround() {

    this.skinDesider1 = (Math.floor(Math.random() * 3) + 1);//picks a random number between 1-3, uses this number to pick a skin for the ground
    this.heightDesider1 =  (Math.floor(Math.random() * 150) + 1) +400  ;//picks a random number between 400-550 for the height. idk why i had to code it like this it wasnt working the normal way

    // create new barrier according to the height and skin parameters
    if(this.skinDesider1 == 1){
        this.ground =  new Ground(this, 1200, this.heightDesider1, 'platform', 0).setScale(5, 0.5);
        this.powerupAdd = new Powerup(this, 1200, this.heightDesider1-30, 'redbottle',0);
        this.powerupGroup.add(this.powerupAdd);
    } else if (this.skinDesider1 == 2){

        this.ground =  new Ground(this, 1200, this.heightDesider1, 'platform1', 0).setScale(5, 0.5); 
    } else {
        this.ground =  new Ground(this, 1200, this.heightDesider1, 'platform2', 0).setScale(5, 0.5);

    }
    
    this.groundGroup.add(this.ground);  // add it to existing group
    //this.groundPhysics.add(this.platform);
}


    update() {
        
      
        this.background1.tilePositionX += .2;
        this.backgroundFront.tilePositionX += .4;
        this.ground1.x-= 6;
        //this.powerupGroup.body.x -=4;
        if (!this.virus.isDestroyed) {

            if(this.virus.body.touching.down) {
                this.jumps = this.MAX_JUMPS;
                this.jumping = false;
            } 

            if (this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 150)) {
                this.virus.body.velocity.y = this.JUMP_VELOCITY;
                this.virus.jumping = true;

            }
            if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
                this.jumps--;
                this.jumping = false;
            }
        }
       
      
    }

    destroyP(a,b){
        console.log('destroy');
    }



}
let textSpacer = 64;


