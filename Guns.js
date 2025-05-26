class Gun extends Entity {
    constructor(points, owner, img) {
        super(points, img);
        this.bullets = [];
        this.angle = owner.angle;
        this.owner = owner;
        console.log(owner)
    };

    update() {
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].update();
        };
    };

    rotate(angle) {
        let center = this.owner.center();
        this.translate(-center.x, -center.y);
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].rotate(angle);
        };
        this.translate(center.x, center.y);
        this.angle = (this.angle + angle + 360) % 360;
    };

    // draw() {
        // for (let i = 0; i < this.points.length; i++) {
        //     context.fillStyle = 'black';
        //     context.beginPath();
        //     context.arc(this.points[i].x, this.points[i].y, 4, 0, 2 * Math.PI);
        //     context.fill();
        // };
    // };
};

class MachineGun extends Gun {
    constructor(owner) {
        let points = [
            new Point(owner.points[0].x-20 * Math.sin(owner.angle * Math.PI / 180), owner.points[0].y + -20 * Math.cos(owner.angle * Math.PI / 180)),
            new Point(owner.points[1].x-20 * Math.sin(owner.angle * Math.PI / 180), owner.points[1].y + -20 * Math.cos(owner.angle * Math.PI / 180)),
            new Point(owner.points[1].x, owner.points[1].y),
            new Point(owner.points[0].x, owner.points[0].y),
        ];
        super(points, owner, "guns/machinegun");

    };

    fire() {
        this.bullets.push(new MachineGunBullet());
    };
};

class ShotGun extends Gun {
    constructor(owner) {
        let points = [
            new Point(owner.points[3].x-20 * Math.sin(owner.angle * Math.PI / 180), owner.points[3].y + 20 * Math.cos(owner.angle * Math.PI / 180)),
            new Point(owner.points[2].x-20 * Math.sin(owner.angle * Math.PI / 180), owner.points[2].y + 20 * Math.cos(owner.angle * Math.PI / 180)),
            new Point(owner.points[2].x, owner.points[2].y),
            new Point(owner.points[3].x, owner.points[3].y),
        ];
        super(points, owner, "guns/shotgun");
        this.dispersion = 35; //angulo de dispersao
    };

    fire() {
        this.bullets.push(new ShotGunBullet());
        this.bullets.push(new ShotGunBullet());
        this.bullets.push(new ShotGunBullet());
    };
};
class MissileLauncher extends Gun {
    constructor(owner) {
        let points = [
            new Point(owner.points[0].x -20 * Math.sin(owner.angle * Math.PI / 180), owner.points[0].y + 25 * Math.cos(owner.angle * Math.PI / 180)),
            new Point(owner.points[1].x +20 * Math.sin(owner.angle * Math.PI / 180), owner.points[1].y + 25 * Math.cos(owner.angle * Math.PI / 180)),
            new Point(owner.points[1].x +20 * Math.sin(owner.angle * Math.PI / 180), owner.points[1].y),
            new Point(owner.points[0].x -20 * Math.sin(owner.angle * Math.PI / 180), owner.points[0].y),
        ];
        super(points, owner, "guns/missil");
    };

    fire() {
        this.bullets.push(new MissileBullet());
    };
};