class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }
/*

Platforms do not have physics hooked up yet but they ARE all in a ground named platformGroup and groundGroup

*/
    preload(){

        this.load.image('platform', './assets/platform.png');//placeholder image 
        this.load.image('platform1', './assets/platform1.png');//placeholder image 
        this.load.image('platform2', './assets/platform2.png');//placeholder image 
        this.load.image('platform3', './assets/platform3.png');//placeholder image 
    
    
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
        //platforms spawn on the top half of the screen and the ground objects spawn on the bottom half
        this.platformGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        
        this.groundGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        this.platformsPhysics = this.add.physicsGroup();
        this.groundPhysics = this.add.physicsGroup();


        this.platformsPhysics.setAll('body.allowGravity', false);
        this.platformsPhysics.setAll('body.immovable', true);
        this.groundPhysics.setAll('body.allowGravity', false);
        this.groundPhysics.setAll('body.immovable', true);
        
        this.add.text(centerX, centerY, 'SLUG LIFE PLAY SCENE', playConfig).setOrigin(0.5);  
        
        this.platformClock = this.time.delayedCall(700, () => { //delay call to spawn second platform
            this.addPlatform();
         }, null, this);
         this.groundClock = this.time.delayedCall(2500, () => { //delay call to spawn extra ground
         }, null, this); 

        this.ground1 = new Ground(this, 100 , 500, 'platform', 0).setScale(15, .5).setOrigin(0, 0);//spawn starting platform
    }



        this.power = 0;
        this.add.text(centerX, centerY - textSpacer * 4, 'SLUG LIFE PLAY SCENE', playConfig).setOrigin(0.5);

        cursors = this.input.keyboard.createCursorKeys();

        this.virus = this.physics.add.sprite(centerX, 0, 'virus');
        this.virus.setGravityY(60);
        this.virus.setCollideWorldBounds(true);
        this.virus.setBounce(0.1);
        this.virus.setMaxVelocity(0, 100);
        this.virus.isDestroyed = false;
        this.virus.canJump = false;

        this.ground = this.physics.add.sprite(centerX, this.game.config.height * .95, 'ground');
        this.ground.displayWidth = this.game.config.width * 1.1;
        //this.ground.setCollideWorldBounds(true);

        this.ground.setImmovable();

        this.physics.add.collider(this.virus, this.ground);


addPlatform() {

    this.skinDesider = Math.floor(Math.random() * 3) + 1; //picks a random number between 1-3, uses this number to pick a skin for the platform
    this.heightDesider =  (Math.floor(Math.random() * 300) + 100);//picks a random number between 100-300 for the height
    
    // create new platforms according to the height and skin parameters
    if(this.skinDesider == 1){
        this.platform =  new Platform(this, 1200, this.heightDesider, 'platform', 0).setScale(5, 0.5);
    } else if (this.skinDesider == 2){

        this.platform =  new Platform(this, 1200, this.heightDesider, 'platform1', 0).setScale(5, 0.5); 
    } else {
        this.platform =  new Platform(this, 1200, this.heightDesider, 'platform2', 0).setScale(5, 0.5);
    }
        
    this.platformGroup.add(this.platform); // add it to existing group
    this.platformsPhysics.add(this.platform);
}

addGround() {

    this.skinDesider1 = (Math.floor(Math.random() * 3) + 1);//picks a random number between 1-3, uses this number to pick a skin for the ground
    this.heightDesider1 =  (Math.floor(Math.random() * 150) + 1) +400  ;//picks a random number between 400-550 for the height. idk why i had to code it like this it wasnt working the normal way

    // create new barrier according to the height and skin parameters
    if(this.skinDesider1 == 1){
        this.ground =  new Ground(this, 1200, this.heightDesider1, 'platform', 0).setScale(5, 0.5);
    } else if (this.skinDesider1 == 2){

        this.ground =  new Ground(this, 1200, this.heightDesider1, 'platform1', 0).setScale(5, 0.5); 
    } else {
        this.ground =  new Ground(this, 1200, this.heightDesider1, 'platform2', 0).setScale(5, 0.5);

    }
        
    this.groundGroup.add(this.ground);  // add it to existing group
    this.groundPhysics.add(this.platform);
}


    update() {
      this.ground1.update();

        if (!this.virus.isDestroyed) {

            if (!cursors.up.isDown && this.virus.body.touching.down) {
                this.virus.canJump = true;

            }
            if (cursors.up.isDown && this.virus.canJump && this.virus.body.touching.down) {

                this.virus.setVelocityY(-100);
            }
        }
    }


}
let textSpacer = 64;


