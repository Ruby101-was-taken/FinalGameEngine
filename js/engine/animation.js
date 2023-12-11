class GameAnimation{
    constructor(frames, speed = 5){
        this.frames = frames;
        this.frame = 0;
        this.speed = speed;
    }

    updateAnimation(deltaTime, bonusNum=0){
        this.frame+=(deltaTime*this.speed)+bonusNum;
        if(this.frame >= this.frames.length){
            this.frame=0;
        }
        
        return this.frames[Math.floor(this.frame)];
    }
}

export default GameAnimation;