class Hud {
    constructor() {
        this.sizeVelocimeter = 170;
        this.borderSpeedometer = 25
        this.speedometerImage = new Image()
        this.speedometerImage.src = "imgs/speedometer.png";

        this.inicialAngleSpeedometer = 223 * Math.PI / 180;
        this.endAngleSpeedometer = 130 * Math.PI / 180;
        this.rangeAngle = this.endAngleSpeedometer - this.inicialAngleSpeedometer;
        this.radiusSpeedometer = 85;
    }

    update() {
        context.fillStyle = "rgba(0, 0, 0, .4)";
        context.fillRect(innerWidth * .01, innerWidth * .01, 160, players.length * 90);
        for (let i = 0; i < players.length; i++) {
            txt(innerWidth * .02, 40 + (i * 90), `Player ${i + 1}`, 25, "#FFFFFF", "left");
            txt(innerWidth * .025, 65 + (i * 90), `-Volta: ${players[i].lap}`, 20, "#FFFFFF", "left");
            txt(innerWidth * .025, 85 + (i * 90), `-Tempo: ${(Math.trunc(players[i].time*100))/100}s`, 20, "#FFFFFF", "left");
            this.velocimeter(i);
        }
    }

    velocimeter(i) {
        context.fillStyle = "rgba(0, 0, 0, .7)";
        context.fillRect(i * (innerWidth - this.sizeVelocimeter - this.borderSpeedometer), innerHeight, this.sizeVelocimeter + this.borderSpeedometer, -this.sizeVelocimeter - this.borderSpeedometer);
        context.drawImage(this.speedometerImage, this.borderSpeedometer / 2 + (i * (innerWidth - this.sizeVelocimeter - this.borderSpeedometer)), innerHeight - this.sizeVelocimeter, this.sizeVelocimeter, this.sizeVelocimeter);

        let center = this.centerSpeedometer(i);

        let percentage = players[i].speed.vectorHypot() / players[i].speedLimit;
        let angle = this.inicialAngleSpeedometer+(this.rangeAngle*percentage);

        let targetPointer = {
            x: center.x + (Math.cos(angle)*this.radiusSpeedometer),
            y: center.y + (-Math.sin(angle)*this.radiusSpeedometer),
        }

        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(center.x, center.y);
        context.lineTo(targetPointer.x, targetPointer.y);
        context.strokeStyle = "red";
        context.stroke();
        context.lineWidth = 1;
    }

    centerSpeedometer(i) {
        return {
            x: (this.borderSpeedometer/2+this.sizeVelocimeter/2)+i*(innerWidth-this.borderSpeedometer-this.sizeVelocimeter),
            y: innerHeight - (this.borderSpeedometer / 2 + this.sizeVelocimeter / 2)
        };
    }
}