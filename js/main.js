class Player {
    constructor(){
        this.positionX = 20;
        this.positionY = 50;
        this.width = 20
        this.height = 20
    }
    moveUp(){
        this.positionY++;
        const playerElm = document.getElementById("player");
        playerElm.style.bottom = `${this.positionY}vh`;

        console.log ("moving up", this.positionY)
    }

    moveDown(){
        this.positionY--;
        const playerElm = document.getElementById("player");
        playerElm.style.bottom = `${this.positionY}vh`;
        console.log ("moving down", this.positionY)
    }
}

class Ball {
    constructor(){
        this.positionX = 50
        this.positionY = 50
        this.width = 1
        this.height = 2
        this.speedX = 2
        this.speedY = 2
        
    }
}

const player = new Player()

document.addEventListener("keydown", (e) =>{
if(e.code === 'ArrowUp'){
    player.moveUp();
}else if (e.code === 'ArrowDown'){
    player.moveDown();
}
});

