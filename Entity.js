class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };
    rotate(angle) {
        angle *= Math.PI / 180;
        let x = Math.cos(angle) * this.x - Math.sin(angle) * this.y;
        let y = Math.sin(angle) * this.x + Math.cos(angle) * this.y;
        this.x = x;
        this.y = y;
    };
    translate(dx, dy) {
        this.x += dx;
        this.y += dy;
    };
};

class Entity {
    constructor(points, img) {
        this.points = points;
        this.img = new Image();
        this.img.src = img ? `imgs/${img}.png` : "";
        if (this.points.length > 3) {
            this.width = Math.hypot(this.points[1].x - this.points[0].x, this.points[1].y - this.points[0].y);
            this.height = Math.hypot(this.points[3].x - this.points[0].x, this.points[3].y - this.points[0].y);
        };
    };

    draw(id) {
        context.save();
        context.beginPath();
        context.rect(0, 0, cameras[id].width, cameras[id].height);
        context.clip();
        let translate = {x: this.center().x -cameras[id]?.x, y: this.center().y -cameras[id]?.y}
        context.translate(translate.x, translate.y);
        context.rotate((this.angle * Math.PI / 180));

        // let cutX = (this.center().x-this.width/2)-cameras[id].x;
        // let cutY = (this.center().y-this.height/2)-cameras[id].y;
        // let sx = cutX < 0 ? -cutX : 0
        // let sy = cutY < 0 ? -cutY : 0;
        // let sw = this.width - sx;
        // let sh = this.height - sy;
        // context.drawImage(this.img, sx, sy, sw, sh, -this.width/2+sx, -this.height/2+sh, sw, sh)

        context.drawImage(this.img, -this.width/2, -this.height/2, this.width, this.height)
        
        context.restore();
    };

    translate(dx, dy) {
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].translate(dx, dy)
        };
    };

    rotate(angle) {
        if(this.img.src.includes("fire.png"))
        {    console.log("chamou", angle)
        }
        let center = this.center();
        this.translate(-center.x, -center.y);
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].rotate(angle);
        };
        this.translate(center.x, center.y);
        this.angle = (this.angle + angle + 360) % 360;
    };

    center() {
        let center = new Point(0, 0);
        for (let i = 0; i < this.points.length; i++) {
            center.x += this.points[i].x;
            center.y += this.points[i].y;
        }
        center.x /= this.points.length;
        center.y /= this.points.length;
        return center;
    };

    collision(entity) {
        let colidiu = false;
        for (let i = 0; (i < this.points.length) && (!colidiu); i++) {
            let x1 = this.points[i].x;
            let y1 = this.points[i].y;
            let x2 = this.points[(i + 1) % this.points.length].x;
            let y2 = this.points[(i + 1) % this.points.length].y;
            for (let i2 = 0; (i2 < entity.length) && (!colidiu); i2++) {
                let x3 = entity[i2].x;
                let y3 = entity[i2].y;
                let x4 = entity[(i2 + 1) % entity.length].x;
                let y4 = entity[(i2 + 1) % entity.length].y;
                let denominador = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
                if (denominador != 0) {
                    let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominador;
                    let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominador;
                    colidiu = (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1);
                };
            };
        };
        return colidiu;
    };
};