class Track {
    constructor(points) {
        this.points = points;
    }

    draw() {
        for (let i = 0; i < this.points.length; i++) {
            context.beginPath();
            context.arc(this.points[i].x, this.points[i].y, 3, 0, Math.PI * 2, false);
            context.fillStyle = 'red';
            context.fill();

            context.beginPath();
            context.moveTo(this.points[i].x, this.points[i].y);
            context.lineTo(this.points[(i + (i + 1 != this.points.length))].x, this.points[(i + (i + 1 != this.points.length))].y);
            context.strokeStyle = "red";
            context.stroke();
        }
    }
}

class LapLine {
    constructor(points) {
        this.points = points;
    }

    draw() {
        for (let i = 0; i < this.points.length; i++) {
            context.beginPath();
            context.arc(this.points[i].x, this.points[i].y, 3, 0, Math.PI * 2, false);
            context.fillStyle = 'blue';
            context.fill();
        }
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        context.lineTo(this.points[1].x, this.points[1].y);
        context.strokeStyle = "blue";
        context.stroke();
    }
}