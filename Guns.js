class Gun extends Entity {
    constructor(points, owner, img) {
        super(points, img);
        this.bullets = [];
        this.angle = owner.angle;
        this.owner = owner;

        this.rechargeCount = 0;
        this.coolDownCount = 0;

        this.isWarm = false;
        this.maxWarm = 0;
        this.minWarm = 0;
        this.warmCount = 0;
    };

    update() {
        if (this.ammo == 0 && ++this.rechargeCount == this.rechargeTime) {
            this.ammo = this.baseAmmo;
            this.rechargeCount = 0;
        };

        if (this.coolDownCount > 0 && ++this.coolDownCount >= this.coolDownTime) { //caso o cooldown chegou no limite, zera ele e libera pra atirar
            this.coolDownCount = 0;
        };

        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].update();
        };
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].draw();
        };

        this.updateWarm();
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

    canFire() {
        return (this.ammo > 0 && this.coolDownCount == 0 && !this.isWarm);
    };

    fireCounters() {
        this.ammo--;
        this.coolDownCount++;
        this.warmCount++;
    };

    updateWarm() {
        if (this.warmCount > 0) {
            this.warmCount--;
        };

        if (this.warmCount >= this.maxWarm) {
            this.isWarm = true;
        };

        if (this.warmCount <= this.minWarm) {
            this.isWarm = false;
        };

        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
            context.lineTo(this.points[i].x, this.points[i].y);
        }
        context.closePath();
        context.fillStyle = `rgba(255, 0, 0, ${this.warmCount / this.maxWarm})`;
        context.fill();
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
        this.sounds = {
            fire: function () {
                new Audio("sounds/machinegun.mp3").play();
            },
        };

        this.ammo = 400; //400 padrao
        this.baseAmmo = this.ammo;
        this.rechargeTime = 210; //tics

        this.coolDownTime = 3; //tics

        this.maxWarm = 100;
        this.minWarm = 10;
        this.warmStep = 5;
    };

    fire() {

        this.shootOrigin = {
            x: (this.points[1].x + this.points[2].x) / 2,
            y: (this.points[1].y + this.points[2].y) / 2
        };
        this.sounds.fire();
        this.bullets.push(new MachineGunBullet(this.shootOrigin, this.angle));

        this.fireCounters();

        this.warmCount += this.warmStep;
    };

    update() {
        super.update()
        console.log(this.isWarm, "count:", this.warmCount)
    }
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
        this.sounds = {
            fire: function () {
                new Audio("sounds/shotgun.mp3").play();
            },
        };

        this.dispersion = 15; //angulo de dispersao
        this.ammo = 30; // 30 padrao
        this.baseAmmo = this.ammo;
        this.rechargeTime = 270; //tics

        this.coolDownTime = 35; //tics

        this.maxWarm = 50;
        this.minWarm = 10;
        this.warmStep = 50;

    };

    fire() {
        this.shootOrigin = {
            x: (this.points[1].x + this.points[2].x) / 2,
            y: (this.points[1].y + this.points[2].y) / 2
        };
        this.sounds.fire();
        this.bullets.push(new ShotGunBullet(this.shootOrigin, this.angle - this.dispersion));
        this.bullets.push(new ShotGunBullet(this.shootOrigin, this.angle));
        this.bullets.push(new ShotGunBullet(this.shootOrigin, this.angle + this.dispersion));

        this.fireCounters();
        this.warmCount += this.warmStep;
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
        this.sounds = {
            fire: function () {
                new Audio("sounds/missile.mp3").play();
            },
        };

        this.ammo = 1; //400 padrao
        this.baseAmmo = this.ammo;
        this.rechargeTime = 30; //tics

        this.coolDownTime = 0; //tics
    };

    fire() {
        this.shootOrigin = this.points;
        this.sounds.fire();
        this.bullets.push(new MissileBullet(this.shootOrigin, this.angle));

        this.ammo--;
        this.coolDownCount++;
    };
};