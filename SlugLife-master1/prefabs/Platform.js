class Platform extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue) {
        super (scene, x, y, texture, frame);
        scene.add.existing(this);
        this.newBarrier = true;  
    }

preload(){
    

}
create(){
    this.atEnd = false;
}

update(){
        // override physics sprite update()
        super.update();

        // add new barrier when existing barrier hits around 1/4 of the screen travelled 
        this.x -= game.settings.platformSpeed;;
        if(this.newBarrier && this.x < centerX+300) {


            this.newBarrier = false;
            // call parent scene method from this context
            this.scene.addPlatform();
        }

        // destroy platform if it reaches the left edge of the screen
        if(this.x < -this.width-150) {//-150 to account for the time it takes for the whole platform to go off screen
            this.destroy();
        }
    }



}