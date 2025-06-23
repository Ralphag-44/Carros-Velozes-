class Car extends Entity {
    constructor(points, img, index) {
        super(points, img);
        this.angle = 0;

        this.frontWeaponsIndex = 0;
        this.frontWeaponsCount = 0;
        this.frontWeaponsDelay = 6 * FPS / 30; //delay ajustavel por causa do numero de updates dependendo do fps

        this.index = this.index;
    };

    update() {
        this.updateWeapon();
        this.move();
        for (let i = 0; i < this.frontWeapons.length; i++) {
            this.frontWeapons[i].update();
        };
    };

    updateWeapon() {
        this.frontWeaponsCount++;
        if (keys[81] && this.frontWeaponsCount > this.frontWeaponsDelay) {
            this.frontWeaponsIndex = (this.frontWeaponsIndex + 1) % this.frontWeapons.length;
            console.log(this.frontWeaponsIndex)
            this.frontWeaponsCount = 0;
        };
        if (keys[69] && this.frontWeapons[this.frontWeaponsIndex].canFire()) {
            this.frontWeapons[this.frontWeaponsIndex].fire();
        };
    };

    move() {
        if (keys[87]) {
            let dx = Math.cos(this.angle * Math.PI / 180) * 10;
            let dy = Math.sin(this.angle * Math.PI / 180) * 10;
            this.translate(dx, dy)
        };
        if (keys[83]) {
            let dx = -Math.cos(this.angle * Math.PI / 180) * 10;
            let dy = -Math.sin(this.angle * Math.PI / 180) * 10;
            this.translate(dx, dy)
        };
        if (keys[65]) {
            this.rotate(-3);
        };

        if (keys[68]) {
            this.rotate(3);
        };
    };

    draw() {
        super.draw();
        for (let i = 0; i < this.frontWeapons.length; i++) {
            this.frontWeapons[i].draw();
        };
    };

    rotate(angle) {
        super.rotate(angle);

        // Rotaciona as armas junto;
        for (let i = 0; i < this.frontWeapons.length; i++) {
            this.frontWeapons[i].rotate(angle);
        };
    };

    translate(dx, dy) {
        for (let i = 0; (i < this.points.length); i++) {
            this.points[i].translate(dx, dy);
        };

        // Translata?? as armas junto;
        for (let i = 0; i < this.frontWeapons.length; i++) {
            this.frontWeapons[i].translate(dx, dy);
        };
    };
};







class Viper extends Car {
    constructor(points, index) {
        super(points, "cars/viper", index);
        this.life = 100;
        this.frontWeapons =
            [
                new MachineGun(this),
            ];
    }
}
class Challenger extends Car {
    constructor(points, index) {
        super(points, "cars/challenger", index);
        this.life = 225;
        this.frontWeapons =
            [
                new ShotGun(this),
            ];
    }
}
class Ranger extends Car {
    constructor(points, index) {
        super(points, "cars/ranger", index);
        this.life = 275;
        this.frontWeapons =
            [
                new MissileLauncher(this),
            ];
    }
}
class Vanderlei extends Car {
    constructor(points, index) {
        super(points, "cars/vanderlei", index);
        this.life = 375;
        this.frontWeapons =
            [
                new ShotGun(this),
            ];
    }
}