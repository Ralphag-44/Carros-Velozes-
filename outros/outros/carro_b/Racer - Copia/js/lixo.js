let colidiu = players[i].collide();
if (colidiu == -1 || colidiu === 3) {
    if (keys[grips[i].up]) {
        players[i].gas(0.125);
    } else {
        if (!keys[grips[i].down] && (players[i].speed.vectorHypot > 0)) {
            players[i].gas(-0.125);
        }
    }
    let dx = Math.cos(players[i].angle * Math.PI / 180) * players[i].speed.vectorX;
    let dy = -Math.sin(players[i].angle * Math.PI / 180) * players[i].speed.vectorY;
    players[i].translate(dx, dy);

}
if (colidiu == -1 || colidiu === 1) {
    if (keys[grips[i].down]) {
        players[i].gas(-0.125);
    } else {
        if (!keys[grips[i].up] && (players[i].speed.vectorHypot > 0)) {
            players[i].gas(0.125);
        }
    }
    let dx = Math.cos(players[i].angle * Math.PI / 180) * players[i].speed.vectorX;
    let dy = Math.sin(players[i].angle * Math.PI / 180) * players[i].speed.vectorY;
    players[i].translate(dx, dy);

}
if (colidiu == -1) {
    if ((keys[grips[i].left] || keys[grips[i].right]) && players[i].speed != 0) {
        players[i].rotate(Math.hypot(players[i].speed.vectorX, players[i].speed.vectorY) * (keys[grips[i].left] ? -1 : 1));
    }
}







this.move()
let temp = this.clone();
temp.move();
temp.translate(temp.speed.vectorX, temp.speed.vectorY);

let colidiu = false;
for (let i = 0; i < entities.length && !colidiu; i++) {
    if (temp.collide(entities[i])) {
        this.speed.vectorX = 0;
        this.speed.vectorY = 0;
        colidiu = true;
    }
}
if (!colidiu) {
    this.translate(this.speed.vectorX, this.speed.vectorY);
}



clone() {
    let tempCar = new PlayerCar(this.x, this.y, null, "");
    tempCar.angle = this.angle;
    tempCar.speed = {
        vectorX: this.vectorX,
        vectorY: this.vectorY,
        vectorHypot: Math.hypot(this.vectorX, this.vectorY)
    };
    return tempCar;
}