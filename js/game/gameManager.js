import GameObject from "../engine/gameobject.js";


class GameManager extends GameObject{
    constructor(){
        super(0,0);
        this.stars = 0;
    }
    getStar(star){
        if(!star.collected){
            this.stars+=1;
            star.collected = true;
        }
    }

    reset(){
        this.stars = 0;
    }
}

export default GameManager;