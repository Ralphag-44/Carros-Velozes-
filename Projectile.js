class Projectiles {
    constructor() {
        this.list = [];
    }

    update() {
        for (let i = 0; i < this.list.length; i++) {
            let hit = false;
            this.list[i].update();

            for (let j = 0; j < players.list.length; j++) {
                if ((players.list[j].index != this.list[i].own)) {
                    
                }
                console.log(this.list[i])
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
            
            if (hit) {
                entities.splice(entities.indexOf(this.list[i]), 1)
                this.list.splice(i, 1);
                i--;    
            }
        }
    }

    draw(id) {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].draw(id);
        }
    }
}

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
        this.width = 3;
        this.height = 10;
    };

    draw(id) {
        if(cameras[id].collide(this))
        {   context.beginPath();
            context.moveTo(this.points[0].x-cameras[id].x, this.points[0].y-cameras[id].y);
            context.lineTo(this.points[1].x-cameras[id].x, this.points[1].y-cameras[id].y);
            context.lineWidth = 3;
            context.strokeStyle = "#e6c619";
            context.stroke();
        }
    }
};

class ShotGunBullet extends Projectile {
    constructor(origin, angle) {
        super([new Point(origin.x + 10 * Math.cos(angle * Math.PI / 180), origin.y + 10 * Math.sin(angle * Math.PI / 180)), new Point(origin.x, origin.y)], "", angle);
        this.velocity = 25;
        this.damage = 20;
        this.width = 5;
        this.height = 10;
    };

    draw(id) {
        if(cameras[id].collide(this))
        {   context.beginPath();
            context.moveTo(this.points[0].x-cameras[id].x, this.points[0].y-cameras[id].y);
            context.lineTo(this.points[1].x-cameras[id].x, this.points[1].y-cameras[id].y);
            context.lineWidth = 5;
            context.strokeStyle = "red";
            context.stroke();
        }
    }
};


class RifleBullet extends Projectile {
    constructor(origin, angle) {
        super([new Point(origin.x + 10 * Math.cos(angle * Math.PI / 180), origin.y + 10 * Math.sin(angle * Math.PI / 180)), new Point(origin.x, origin.y)], "", angle);
        this.velocity = 25;
        this.damage = 50;
        this.width = 5;
        this.height = 10;
    };

    draw(id) {
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        context.lineTo(this.points[1].x, this.points[1].y);
        context.lineWidth = 5;
        context.strokeStyle = "red";
        context.stroke();
    }
};

class MissileBullet extends Projectile {
    constructor(origin, angle) {
        super(
            [
                new Point(origin[0].x, origin[0].y),
                new Point(origin[1].x, origin[1].y),
                new Point(origin[2].x, origin[2].y),
                new Point(origin[3].x, origin[3].y),
            ],
            "guns/missil", angle);
        this.velocity = 0;
        this.acceleration = 2
        this.damage = 99;
    };

    update() {
        this.velocity += this.acceleration;

        let dx = Math.cos(this.angle * Math.PI / 180) * this.velocity;
        let dy = Math.sin(this.angle * Math.PI / 180) * this.velocity;
        this.translate(dx, dy);
    };
};

