class GeneralFunctions{
    constructor(){}

    genrateRandomNumber(min, max){
        let range = max-min;
        let randomNum = Math.floor(Math.random()*range);
        return min+randomNum;
    }
}

export default GeneralFunctions;