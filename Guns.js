class Gun extends Entity {
    constructor(points, owner, img) {
        super(points, img);
        this.angle = owner.angle;
        this.owner = owner;
        this.bullets = new Projectiles(this.owner);

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

        this.bullets.update()
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

    translate(dx, dy) {
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].translate(dx, dy);
        };
    }

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

    draw(id) {
        super.draw(id);
        //this.bullets.draw(id);
    }
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

        this.ammo = 400; //400 padrao
        this.baseAmmo = this.ammo;
        this.rechargeTime = 210; //tics
        this.coolDownTime = 3; //tics

        this.maxWarm = 100;
        this.minWarm = 10;
        this.warmStep = 5;

        this.life = 140;
    };

    fire() {
        this.shootOrigin = {
            x: (this.points[1].x + this.points[2].x) / 2,
            y: (this.points[1].y + this.points[2].y) / 2
        };
        sounds.guns.machinegun();
        let bullet = new MachineGunBullet(this.shootOrigin, this.angle);
        this.bullets.list.push(bullet);
        entities = entities.concat(bullet);
        this.fireCounters();

        this.warmCount += this.warmStep;
    };
};

class ShotGun extends Gun {
    constructor(owner) {
        let points = [
            new Point(owner.points[0].x - 20 * Math.sin(owner.angle * Math.PI / 180), owner.points[0].y + -20 * Math.cos(owner.angle * Math.PI / 180)),
            new Point(owner.points[1].x - 20 * Math.sin(owner.angle * Math.PI / 180), owner.points[1].y + -20 * Math.cos(owner.angle * Math.PI / 180)),
            new Point(owner.points[1].x, owner.points[1].y),
            new Point(owner.points[0].x, owner.points[0].y),
        ];
        super(points, owner, "guns/shotgun");

        this.dispersion = 15; //angulo de dispersao
        this.bulletsPerShot = 3;
        this.ammo = 30; // 30 padrao
        this.baseAmmo = this.ammo;
        this.rechargeTime = 270; //tics

        this.coolDownTime = 35; //tics

        this.maxWarm = 50;
        this.minWarm = 10;
        this.warmStep = 50;

        this.life = 180;
    };

    fire() {
        this.shootOrigin = {
            x: (this.points[1].x + this.points[2].x) / 2,
            y: (this.points[1].y + this.points[2].y) / 2
        };
        sounds.guns.shotgun();

        for (let i = 0; i < this.bulletsPerShot; i++) {
            let bullet = new ShotGunBullet(this.shootOrigin, this.angle - (this.dispersion * (i - ((this.bulletsPerShot - 1) / 2))) / this.bulletsPerShot)
            this.bullets.list.push(bullet);
            entities = entities.concat(bullet);
        }

        this.fireCounters();
        this.warmCount += this.warmStep;
    };
};


class Rifle extends Gun {
    constructor(owner) {
        let points = [
            new Point(owner.points[0].x - 20 * Math.sin(owner.angle * Math.PI / 180), owner.points[0].y + -20 * Math.cos(owner.angle * Math.PI / 180)),
            new Point(owner.points[1].x - 20 * Math.sin(owner.angle * Math.PI / 180), owner.points[1].y + -20 * Math.cos(owner.angle * Math.PI / 180)),
            new Point(owner.points[1].x, owner.points[1].y),
            new Point(owner.points[0].x, owner.points[0].y),
        ];
        super(points, owner, "guns/rifle");

        this.ammo = 10; // 10 padrao
        this.baseAmmo = this.ammo;
        this.rechargeTime = 9 * FPS; //tics

        this.coolDownTime = 35; //tics

        this.maxWarm = 50;
        this.minWarm = 10;
        this.warmStep = 50;

        this.life = 180;
    };

    fire() {
        this.shootOrigin = {
            x: (this.points[1].x + this.points[2].x) / 2,
            y: (this.points[1].y + this.points[2].y) / 2
        };
        sounds.guns.rifle();

        let bullet = new RifleBullet(this.shootOrigin, this.angle);
        this.bullets.list.push(bullet);
        entities = entities.concat(bullet);

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
        super(points, owner, "guns/rocket");

        this.ammo = 1; //400 padrao
        this.baseAmmo = this.ammo;
        this.rechargeTime = 30 * 4; //tics
        this.coolDownTime = 0; //tics

        this.maxWarm = 50;
        this.minWarm = 10;
        this.warmStep = 50;

        this.life = 200;
    };

    fire() {
        this.shootOrigin = this.points;
        sounds.guns.missile();
        let bullet = new MissileBullet(this.shootOrigin, this.angle);
        this.bullets.list.push(bullet);
        entities = entities.concat(bullet);
        this.fireCounters();
        this.warmCount += this.warmStep;
    };
};







class SecondGun extends Entity {
    constructor(points, owner, img, activeCount) {
        super(points, img);
        this.owner = owner;
        this.angle = owner.angle;
        this.active = false;
        this.activeCount = activeCount*FPS;
        this.maxActiveCount = activeCount*FPS;
    }

    canActivate() {
        return !this.active;
    }

    rotate(angle) {
        let center = this.owner.center();
        this.translate(-center.x, -center.y);
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].rotate(angle);
        };
        this.translate(center.x, center.y);
        this.angle = (this.angle + angle + 360) % 360;
    };

    translate(dx, dy) {
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].translate(dx, dy);
        };
    }

    update(){
        this.activeCount -= this.activeCount > 0;
        this.active = this.activeCount > 0;
        if (this.activeCount == 0) {
            this.activeCount = this.maxActiveCount;
        }
    }
}



class Saw extends SecondGun {
    constructor(owner) {
        let points = [
            new Point(owner.points[3].x + 25, owner.points[3].y + 20),
            new Point(owner.points[2].x - 25, owner.points[2].y + 20),
            new Point(owner.points[2].x, owner.points[2].y + 7),
            new Point(owner.points[3].x, owner.points[3].y + 7),
        ];
        super(points, owner, "guns/serraparada", 7);
        this.damagePerSecond = 30;

        this.life = 120;
    }

    update() {
        if (this.active) {
            this.img.src = "imgs/guns/serramovimento.png";
            for (let i = 0; i < players.list.length; i++) {
                if (!(players.list[i] == this.owner)) {
                    if (this.collision(players.list[i].points)) {
                        players.list[i].life -= this.damagePerSecond / FPS;
                    }
                    for (let j = 0; j < players.list[i].weapons.length; j++) {
                        if (this.collision(players.list[i].weapons[j].points)) {
                            players.list[i].weapons[j].life -= this.damagePerSecond / FPS;
                        }
                    }
                }
            }
            super.update();
        } else {
            this.img.src = "imgs/guns/serraparada.png";
        }
    }
    
}

class FlameThrower extends SecondGun {
    constructor(owner) {
        let points = [
            new Point(owner.points[3].x + 5, owner.points[3].y + 20),
            new Point(owner.points[2].x - 5, owner.points[2].y + 20),
            new Point(owner.points[2].x, owner.points[2].y),
            new Point(owner.points[3].x, owner.points[3].y),
        ];
        super(points, owner, "guns/flamethrower", 5);
        this.damagePerSecond = 30;
        this.life = 100;
        
        this.flame = new Flame(this, this.owner);
    }
    
    update() {
        if (this.active) {
            for (let i = 0; i < players.list.length; i++) {
                if (!(players.list[i] == this.owner)) {
                    if (this.flame.collision(players.list[i].points)) {
                        players.list[i].life -= this.flame.damagePerSecond / FPS;
                    }
                    for (let j = 0; j < players.list[i].weapons.length; j++) {
                        if (this.flame.collision(players.list[i].weapons[j].points)) {
                            players.list[i].weapons[j].life -= this.flame.damagePerSecond / FPS;
                        }
                    }
                }
            }
            super.update();
        }
    }
    
    translate(dx, dy) {
        super.translate(dx, dy);
        this.flame.translate(dx, dy);
    }
    
    rotate(angle) {
        super.rotate(angle);
        this.flame.rotate(angle);
    }
    
    
    draw(id) {
        super.draw(id);
        if (this.active) {
            this.flame.draw(id);
        }
    }
}

class Flame extends Entity {
    constructor(owner, carOwner) {
        let points = [
            new Point(owner.points[1].x, owner.points[1].y),
            new Point(owner.points[1].x + 70, owner.points[1].y),
            new Point(owner.points[2].x + 70, owner.points[2].y),
            new Point(owner.points[2].x, owner.points[2].y),
        ]
        super(points, "guns/flame");
        this.damagePerSecond = 40;
        this.owner = owner;
        this.carOwner = carOwner;
        this.angle = carOwner.angle;
    }
    
    rotate(angle) {
        let center = this.carOwner.center();
        this.translate(-center.x, -center.y);
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].rotate(angle);
        };
        this.translate(center.x, center.y);
        this.angle = (this.angle + angle + 360) % 360;
    };
}

class PEM extends SecondGun {
    constructor(owner) {
        let points = [owner.center()];
        super(points, owner, "guns/pem", 6);
        this.radius = 150;
        this.width = this.radius*2;
        this.height = this.radius*2;
    }
    
    update() {
        if (this.active) {
            for (let i = 0; i < players.list.length; i++) {
                if (!(players.list[i] == this.owner)) {
                    if (this.collision(players.list[i].points)) {
                        keys[carsKeys[players.list[i].index].left] = false;
                        keys[carsKeys[players.list[i].index].right] = false;
                        keys[carsKeys[players.list[i].index].up] = false;
                        keys[carsKeys[players.list[i].index].down] = false;
                        // keys[carsKeys[players.list[i].index].frontShoot] = false;
                        // keys[carsKeys[players.list[i].index].backShoot] = false;
                    }
                }
            }
            super.update();
        }
    }
    
    draw(id) {
        if (this.active) {
            super.draw(id);
        }
    }
    
    collision(entity) {
        let colidiu = false
        for (let i = 0; i < entity.length && !colidiu; i++) {
            let distanceX = this.points[0].x - entity[i].x;
            let distanceY = this.points[0].y - entity[i].y;
            if (Math.hypot(distanceX, distanceY) < this.radius) {
                colidiu = true;
            }
        }
        return colidiu;
    };
}

class MineLauncher extends SecondGun {
    constructor(owner) {
        let points = [
            new Point(owner.points[3].x + 5, owner.points[3].y + 20),
            new Point(owner.points[2].x - 5, owner.points[2].y + 20),
            new Point(owner.points[2].x, owner.points[2].y),
            new Point(owner.points[3].x, owner.points[3].y),
        ];
        super(points, owner, "guns/minelauncher", 3);
        this.list = [];
    }
    
    update() {
        if (this.active) {
            this.spawMine();
            this.active = false;
            super.update();
        }
        
        
        for (let i = 0; i < this.list.length; i++) {
            let hit = false;

            for (let j = 0; j < players.list.length; j++) {
                if (players.list[j] != this.list[i].owner) {
                    if (this.list[i].collision(players.list[j].points)) {
                        players.list[j].life -= this.list[i].damage;
                        hit = true;
                        break;
                    } else {
                        for (let k = 0; k < players.list[j].weapons.length; k++) {
                            if (this.list[i].collision(players.list[j].weapons[k].points)) {
                                players.list[j].weapons[k].life -= this.list[i].damage;
                                hit = true;
                                break;
                            }
                        }
                    }
                    if (hit) break;
                }
            }
            
            if (hit) {
                console.log("kabum")
                entities.splice(entities.indexOf(this.list[i]), 1)
                this.list.splice(i, 1);
                i--;
            }
        }
    }
    
    spawMine() {
        let center = this.center();
        let mine = new Mine(center.x, center.y, 30, 30, this.owner);
        this.list.push(mine);
        console.log(entities)
        entities = entities.concat(mine);
        console.log(entities)
    }

    draw(id) {
        // for (let i = 0; i < this.list.length; i++) {
        //this.list[i].draw(id);
        // }
        super.draw(id);
    }
}

class Mine extends Entity {
    constructor(x, y, width, height, owner) {
        let points = [
            new Point(x - width / 2, y - height / 2),
            new Point(x + width / 2, y - height / 2),
            new Point(x + width / 2, y + height / 2),
            new Point(x - width / 2, y + height / 2),
        ];
        super(points, "guns/tnt");
        this.x = x;
        this.y = y;
        this.owner = owner;

        this.damage = 80;
        this.life = 20;
    }

}