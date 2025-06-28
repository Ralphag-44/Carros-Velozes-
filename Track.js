class LapLine {
    constructor(points, layer) {
        this.points = points;
        this.layer = layer;
    }

    draw(id) {
        context.save();
        let translate = {x: this.points[0].x-cameras[id]?.x, y: this.points[0].y-cameras[id]?.y}
        console.log(translate.x)
        context.translate(translate.x, translate.y);
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
        context.restore();
    }
    center()
    {   return {x: (this.points[0].x + this.points[1].x)/2, y: (this.points[0].y + this.points[1].y)/2};
    }
}