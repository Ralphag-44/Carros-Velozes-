class Projectile extends Entity {
    constructor(points, img, angle) {
        super(points, img);
        this.angle = angle;
    };

    update() {
        let dx = Math.cos(this.angle * Math.PI / 180) * this.velocity;
        let dy = Math.sin(this.angle * Math.PI / 180) * this.velocity;
        this.translate(dx, dy);
    };
};

class MachineGunBullet extends Projectile {
    constructor(origin, angle) {
        super([new Point(origin.x + 10 * Math.cos(angle * Math.PI / 180), origin.y + 10 * Math.sin(angle * Math.PI / 180)), new Point(origin.x, origin.y)], "", angle);
        this.velocity = 40;
        this.damage = 2;
    };

    draw() {
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        context.lineTo(this.points[1].x, this.points[1].y);
        context.lineWidth = 3;
        context.strokeStyle = "#e6c619";
        context.stroke();
    }
};

class MissileBullet extends Projectile {
    constructor(origin, angle) {
        super();
        this.velocity = 5;
        this.damage = 99;
    };
};

class ShotGunBullet extends Projectile {
    constructor(origin, angle) {
        super([new Point(origin.x + 10 * Math.cos(angle * Math.PI / 180), origin.y + 10 * Math.sin(angle * Math.PI / 180)), new Point(origin.x, origin.y)], "", angle);
        this.velocity = 25;
        this.damage = 20;
    };

    draw() {
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        context.lineTo(this.points[1].x, this.points[1].y);
        context.lineWidth = 5;
        context.strokeStyle = "red";
        context.stroke();
    }
};