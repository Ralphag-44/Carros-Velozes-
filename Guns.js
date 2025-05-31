class Gun extends Entity {
    constructor(points, owner, img) {
        super(points, img);
        this.bullets = [];
        this.angle = owner.angle;
        this.owner = owner;
        this.rechargeCount = 0;

    };

    update() {
        
        this.rechargeCount++;
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].update();
        };
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].draw();
        }
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
};

class MachineGun extends Gun {
    constructor(owner) {
        let points = [
            new Point(owner.points[0].x - 20 * Math.sin(owner.angle * Math.PI / 180), owner.points[0].y + -20 * Math.cos(owner.angle * Math.PI / 180)),
            new Point(owner.points[1].x - 20 * Math.sin(owner.angle * Math.PI / 180), owner.points[1].y + -20 * Math.cos(owner.angle * Math.PI / 180)),
            new Point(owner.points[1].x, owner.points[1].y),
            new Point(owner.points[0].x, owner.points[0].y),
        ];
        super(points, owner, "guns/machinegun");
    };

    fire() {
        sounds.cloneAudio(sounds.machinegun);
        this.bullets.push(new MachineGunBullet(this.shootOrigin, this.angle));
    };
};

class ShotGun extends Gun {
    constructor(owner) {
        let points = [
            new Point(owner.points[3].x - 20 * Math.sin(owner.angle * Math.PI / 180), owner.points[3].y + 20 * Math.cos(owner.angle * Math.PI / 180)),
            new Point(owner.points[2].x - 20 * Math.sin(owner.angle * Math.PI / 180), owner.points[2].y + 20 * Math.cos(owner.angle * Math.PI / 180)),
            new Point(owner.points[2].x, owner.points[2].y),
            new Point(owner.points[3].x, owner.points[3].y),
        ];
        super(points, owner, "guns/shotgun");
        this.dispersion = 35; //angulo de dispersao
    };

    fire() {
        sounds.cloneAudio(sounds.shotgun);
        this.bullets.push(new ShotGunBullet(this.shootOrigin, this.angle-this.dispersion));
        this.bullets.push(new ShotGunBullet(this.shootOrigin, this.angle));
        this.bullets.push(new ShotGunBullet(this.shootOrigin, this.angle+this.dispersion));
    };
};
class MissileLauncher extends Gun {
    constructor(owner) {
        let points = [
            new Point(owner.points[0].x - 20 * Math.sin(owner.angle * Math.PI / 180), owner.points[0].y + 25 * Math.cos(owner.angle * Math.PI / 180)),
            new Point(owner.points[1].x + 20 * Math.sin(owner.angle * Math.PI / 180), owner.points[1].y + 25 * Math.cos(owner.angle * Math.PI / 180)),
            new Point(owner.points[1].x + 20 * Math.sin(owner.angle * Math.PI / 180), owner.points[1].y),
            new Point(owner.points[0].x - 20 * Math.sin(owner.angle * Math.PI / 180), owner.points[0].y),
        ];
        super(points, owner, "guns/missil");
    };

    fire() {
        this.bullets.push(new MissileBullet());
    };
};