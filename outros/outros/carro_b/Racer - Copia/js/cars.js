class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    translate(dx, dy) {
        this.x += dx;
        this.y += dy;
    };

    rotate(angle) {
        angle *= Math.PI / 180;
        const x = this.x;
        const y = this.y;
        this.x = Math.cos(angle) * x - Math.sin(angle) * y;
        this.y = Math.sin(angle) * x + Math.cos(angle) * y;
    };
};



class Shape {
    constructor(points, img) {
        this.points = points;
        this.img = new Image();
        this.img.src = img;
    };

    translate(dx, dy) {
        for (let point of this.points) {
            point.translate(dx, dy);
        };
    };

    rotate(angle) {
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
        for (let i = 0; (i < this.points.length); i++) {
            center.x += this.points[i].x;
            center.y += this.points[i].y;
        };
        center.x /= this.points.length;
        center.y /= this.points.length;
        return center;
    };

    draw() {
        this.tireWearDraw();
        context.save();
        context.translate(this.center().x, this.center().y);
        context.rotate((this.angle * Math.PI / 180));
        context.drawImage(this.img, -this.getWidth() / 2, -this.getHeight() / 2, this.getWidth(), this.getHeight());
        context.restore();

        if (markers) {
            let center = this.center();
            context.lineWidth = 5;
            context.beginPath();
            context.moveTo(center.x, center.y);
            context.lineTo(center.x + (this.speed.vectorX * 7), center.y + (this.speed.vectorY * 7));
            context.strokeStyle = "red";
            context.stroke();
            context.lineWidth = 1;
        };
    };

    getWidth() {
        let dx = this.points[1].x - this.points[0].x;
        let dy = this.points[1].y - this.points[0].y;
        return Math.hypot(dx, dy);
    };

    getHeight() {
        let dx = this.points[3].x - this.points[0].x;
        let dy = this.points[3].y - this.points[0].y;
        return Math.hypot(dx, dy);
    };
};

class PlayerCar extends Shape {
    constructor(x, y, index, img) {
        super([
            new Point(x, y),
            new Point(x + 50, y),
            new Point(x + 50, y + 25),
            new Point(x, y + 25)
        ], img);
        this.angle = 0;
        this.index = index;
        this.speed = {
            vectorX: 0,
            vectorY: 0,
            vectorHypot() {
                return Math.hypot(this.vectorX, this.vectorY);
            }
        };
        this.speedLimit = 15;
        this.turnFactor = 0.7;
        this.friction = 0.97;
        this.acceleration = 0.5;
        this.direction = 0;
        this.tireWear = [[], []];
        this.lastCheckpoint = 0;
        this.savedPositions = [];

        this.lap = 0;
        this.finished = false;
        this.time = 0;
    };

    update() {
        this.checkLapLines();
        let beforeAngle = this.angle;
        if (this.lap < laps) {
            this.move();
            this.time += 1 / FPS;
        } else {
            this.finished = true;
            this.speed.vectorX *= this.friction;
            this.speed.vectorY *= this.friction;
            this.speed.vectorHypot();
        };
        this.translate(this.speed.vectorX, this.speed.vectorY);
        for (let i = 0; i < entities.length; i++) {
            if (this.collide(entities[i]) && (i != this.index)) {
                this.translate(-this.speed.vectorX, -this.speed.vectorY);
                this.rotate(beforeAngle-this.angle);
                this.speed.vectorX = 0;
                this.speed.vectorY = 0;
                this.speed.vectorHypot();
                break;
            };
        };

        if (!timeManager.acting) {
            if (Math.abs(this.speed.vectorHypot()) > 0.8) { //evita que crie borracha de pneu parado
                for (let i = 0; i < this.points.length; i += 3) {
                    this.tireWear[+!!i].push(new TireWear(this.points[i].x, this.points[i].y));
                };
            };
        };
        this.savePosition();
    };

    savePosition() {
        let config = {
            points: [],
            angle: this.angle,
            speed: {
                vectorX: this.speed.vectorX,
                vectorY: this.speed.vectorY
            },
            tireWear: [[], []],
            lastCheckpoint: this.lastCheckpoint,
            lap: this.lap,
            finished: this.finished,
            time: this.time
        };
        for (let i = 0; i < this.points.length; i++) {
            config.points.push({
                x: this.points[i].x,
                y: this.points[i].y
            });
        };
        for (let i = 0; i < this.tireWear.length; i++) {
            for (let j = 0; j < this.tireWear[i].length; j++) {
                config.tireWear[i].push({
                    x: this.tireWear[i][j].x,
                    y: this.tireWear[i][j].y,
                    time: this.tireWear[i][j].time
                });
            };
        };
        this.savedPositions.unshift(config);
        // console.log(this.savedPositions)
    };

    tireWearDraw() {
        context.lineWidth = 4;
        for (let i = 0; i < this.tireWear.length; i++) {
            for (let j = 0; j < this.tireWear[i].length - 1; j++) {
                context.beginPath();
                context.moveTo(this.tireWear[i][j].x, this.tireWear[i][j].y);
                context.lineTo(this.tireWear[i][j + 1].x, this.tireWear[i][j + 1].y);
                context.strokeStyle = `rgba(0, 0, 0, ${(this.tireWear[i][j].time / 100)})`;
                context.stroke();

                this.tireWear[i][j].time -= 1;
                if (this.tireWear[i][j].time <= 0) {
                    this.tireWear[i].splice(j, 1);
                    j--;
                };
            };
        };
        context.lineWidth = 1;
    };

    checkLapLines() {
        for (let i = 0; i < lapLines.length; i++) {
            if (this.collide(lapLines[i])) {
                if (i == (this.lastCheckpoint + 1) % lapLines.length) {
                    this.lastCheckpoint = i;
                    if (this.lastCheckpoint == 0) {
                        this.lap++;
                    };
                };
            };
        };
    };

    gas(dir) {
        if (this.speed.vectorHypot() <= this.speedLimit) {
            this.speed.vectorX += Math.cos(this.angle * Math.PI / 180) * dir;
            this.speed.vectorY += Math.sin(this.angle * Math.PI / 180) * dir;
        } else {
            this.speed.vectorX = Math.sign(this.speed.vectorX) * this.speedLimit;
            this.speed.vectorY = Math.sign(this.speed.vectorY) * this.speedLimit;
        };
    };

    move() {
        if (keys[grips[this.index].up]) {
            this.gas(this.acceleration);
            this.direction = 1;
        };
        if (keys[grips[this.index].down]) {
            this.gas(-this.acceleration);
            this.direction = -1;
        };
        if (Math.abs(this.speed.vectorX + this.speed.vectorY) > 0.2) {
            if (keys[grips[this.index].left]) {
                this.rotate(-this.turnFactor * this.speed.vectorHypot() * this.direction);
            };
            if (keys[grips[this.index].right]) {
                this.rotate(this.turnFactor * this.speed.vectorHypot() * this.direction);
            };
        };
        
        this.speed.vectorX *= this.friction;
        this.speed.vectorY *= this.friction;
    };

    collide(entity) {
        for (let i = 0; i < this.points.length; i++) {
            let [p1, p2] = [this.points[i], this.points[(i + 1) % this.points.length]];
            for (let j = 0; j < entity.points.length; j++) {
                let [p3, p4] = [entity.points[j], entity.points[(j + (j + 1 != entity.points.length))]];
                let uA = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / ((p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y));
                let uB = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / ((p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y));
                if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) { //pra nao dar return na primeira vez
                    return true;
                };
            };
        };
        return false;
    };
};

class TireWear {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.time = 80;
    };
};