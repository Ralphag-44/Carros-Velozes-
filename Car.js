class Cars {
    constructor() {
        this.list = [
            new Viper(
                [
                    new Point(100, 100),
                    new Point(200, 100),
                    new Point(200, 150),
                    new Point(100, 150),
                ], 0
            ),
            new Test(
                [
                    new Point(500, 100),
                    new Point(600, 100),
                    new Point(600, 150),
                    new Point(500, 150),
                ], 1
            )
        ];
    };

    update() {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].update();
            if (this.list[i].life <= 0) {
                this.list.splice(i, 1);
                //new Explosion()
            }
        }
    };

    draw() {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].draw();
        }
    };
}

class Car extends Entity {
    constructor(points, img, index) {
        super(points, img);
        this.angle = 0;
        this.index = index;
    };

    update() {
        this.updateWeapon();
        this.move();
        this.frontWeapon.update();
    };

    updateWeapon() {
        if (keys[69] && this.frontWeapon.canFire() && this.index == 0) {
            this.frontWeapon.fire();
        };
    };

    move() {
        if (keys[carsKeys[this.index].up]) {
            let dx = Math.cos(this.angle * Math.PI / 180) * 10;
            let dy = Math.sin(this.angle * Math.PI / 180) * 10;
            this.translate(dx, dy)
        };
        if (keys[carsKeys[this.index].down]) {
            let dx = -Math.cos(this.angle * Math.PI / 180) * 10;
            let dy = -Math.sin(this.angle * Math.PI / 180) * 10;
            this.translate(dx, dy)
        };
        if (keys[carsKeys[this.index].left]) {
            this.rotate(-3);
        };

        if (keys[carsKeys[this.index].right]) {
            this.rotate(3);
        };
    };

    draw() {
        super.draw();
        this.frontWeapon.draw();
    };

    rotate(angle) {
        super.rotate(angle);

        // Rotaciona as armas junto;
        this.frontWeapon.rotate(angle);
    };

    translate(dx, dy) {
        for (let i = 0; (i < this.points.length); i++) {
            this.points[i].translate(dx, dy);
        };

        // Translata?? as armas junto;
            this.frontWeapon.translate(dx, dy);
    };
};







class Viper extends Car {
    constructor(points, index) {
        super(points, "cars/viper", index);
        this.life = 100;
        this.frontWeapon = new MachineGun(this);
            
    }
}
class Challenger extends Car {
    constructor(points, index) {
        super(points, "cars/challenger", index);
        this.life = 225;
        this.frontWeapon = new ShotGun(this);
    }
}
class Ranger extends Car {
    constructor(points, index) {
        super(points, "cars/ranger", index);
        this.life = 275;
        this.frontWeapon = new MissileLauncher(this);
    }
}
class Vanderlei extends Car {
    constructor(points, index) {
        super(points, "cars/vanderlei", index);
        this.life = 375;
        this.frontWeapon = new ShotGun(this);
    }
}

class Test extends Car {
    constructor(points, index) {
        super(points, "cars/model-of-a-russian-monitor-novgorod-round-ship-c-1873-in-the-international-maritime-museum-in-hafencity-hamburg-germany-2TC9M4Y", index);
        this.life = 1;
        this.frontWeapon = new ShotGun(this);
    }
}