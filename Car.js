class Cars {
    constructor() {
        this.list = [
            new Ranger(
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
            ),
            new Vanderlei(
                [
                    new Point(100, 500),
                    new Point(200, 500),
                    new Point(200, 550),
                    new Point(100, 550),
                ], 2
            ),
            new Ranger(
                [
                    new Point(100, 500),
                    new Point(200, 500),
                    new Point(200, 550),
                    new Point(100, 550),
                ], 3
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
        for (let i = 0; i < this.weapons.length; i++) {
            this.weapons[i].update();
            if (this.weapons[i].life <= 0) {
                this.weapons.splice(i, 1)
                i--;
            }
        }
    };

    updateWeapon() {
        if (keys[carsKeys[this.index].frontShoot] && this.weapons[0]?.canFire()) {
            this.weapons[0].fire();
        };
        if (keys[carsKeys[this.index].backShoot] && this.weapons[1]?.canActivate()) {
            this.weapons[1].active = true; // pra pegar no update de cada um separado
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

    draw(id) {
        super.draw(id);
        for (let i = 0; i < this.weapons.length; i++) {
            this.weapons[i].draw(id);
        }
        context.fillStyle = "red"
        context.fillText(Math.trunc(this.life*100)/100, this.points[0].x-cameras[id].x, this.points[0].y-cameras[id].y)
    };

    rotate(angle) {
        super.rotate(angle);
        for (let i = 0; i < this.weapons.length; i++) {
            this.weapons[i].rotate(angle);
        }
    };

    translate(dx, dy) {
        for (let i = 0; (i < this.points.length); i++) {
            this.points[i].translate(dx, dy);
        };
        for (let i = 0; i < this.weapons.length; i++) {
            this.weapons[i].translate(dx, dy);
        };
    };
};







class Viper extends Car {
    constructor(points, index) {
        super(points, "cars/viper", index);
        this.life = 100;
        this.weapons = [
            new MachineGun(this),
            new FlameThrower(this)
        ];
    }
}
class Challenger extends Car {
    constructor(points, index) {
        super(points, "cars/challenger", index);
        this.life = 225;
        this.weapons = [
            new ShotGun(this),
            new Saw(this)
        ];
    }
}
class Ranger extends Car {
    constructor(points, index) {
        super(points, "cars/ranger", index);
        this.life = 275;
        this.weapons = [
            new Rifle(this),
            new PEM(this)
        ];
    }
}
class Vanderlei extends Car {
    constructor(points, index) {
        super(points, "cars/vanderlei", index);
        this.life = 375;
        this.weapons = [
            new MissileLauncher(this),
            new MineLauncher(this)
        ]
    }
}

class Test extends Car {
    constructor(points, index) {
        super(points, "cars/model-of-a-russian-monitor-novgorod-round-ship-c-1873-in-the-international-maritime-museum-in-hafencity-hamburg-germany-2TC9M4Y", index);
        this.life = 1000;
        this.weapons = [
            new ShotGun(this)
        ];
    }
}