class Car extends Entity {
    constructor(points, img) {
        super(points, img);
        this.angle = 0;
        this.frontWeapons =
            [
                new MachineGun(this),
                new ShotGun(this),
                new MissileLauncher(this),
            ];
    }

    update() {
        this.move();
        for (let i = 0; i < this.frontWeapons.length; i++) {
            this.frontWeapons[i].update();
        }
    }

    move() {
        if (keys[87]) {
            this.translate(10, 10)
        }
        if (keys[65]) {
            this.rotate(3);
        }

        if (keys[68]) {
            this.rotate(-3);
        }
    }

    draw() {
        super.draw();
        // for (let i = 0; i < this.points.length; i++) {
        //     context.fillStyle = 'red';
        //     context.beginPath();
        //     context.arc(this.points[i].x, this.points[i].y, 4, 0, 2 * Math.PI);
        //     context.fill();
        // }

        for (let i = 0; i < this.frontWeapons.length; i++) {
            this.frontWeapons[i].draw();
        }
    }

    rotate(angle) {
        super.rotate(angle);

        // Rotaciona as armas junto;
        for (let i = 0; i < this.frontWeapons.length; i++) {
            this.frontWeapons[i].rotate(angle);
        };
    }
    translate(dx, dy) {
        for (let i = 0; (i < this.points.length); i++) {
            this.points[i].translate(dx, dy);
        }

        // Translata?? as armas junto;
        for (let i = 0; i < this.frontWeapons.length; i++) {
            for (let j = 0; j < this.frontWeapons[i].points.length; j++) {
                this.frontWeapons[i].points[j].translate(dx, dy);
            };
        };
    }
}