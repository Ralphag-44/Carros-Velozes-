class Cars {
    constructor(create) {
        this.list = [];
        for(let i = 0; (i < create.length); i++)
        {   switch(create[i])
            {   case 0:
                {   this.list.push( new Viper(
                    [
                        new Point(3000, 2650+(100*i)),
                        new Point(3100, 2650+(100*i)),
                        new Point(3100, 2700+(100*i)),
                        new Point(3000, 2700+(100*i)),
                    ], i
                    ));
                }
                break;
                case 1:
                {   this.list.push( new Challenger(
                    [
                        new Point(3000, 2650+(100*i)),
                        new Point(3100, 2650+(100*i)),
                        new Point(3100, 2700+(100*i)),
                        new Point(3000, 2700+(100*i)),
                    ], i
                    ));
                }
                break;
                case 2:
                {   this.list.push( new Ranger(
                    [
                        new Point(3000, 2650+(100*i)),
                        new Point(3100, 2650+(100*i)),
                        new Point(3100, 2700+(100*i)),
                        new Point(3000, 2700+(100*i)),
                    ], i
                    ));
                }
                break;
                case 3:
                {   this.list.push( new Vanderlei(
                    [
                        new Point(3000, 2650+(100*i)),
                        new Point(3100, 2650+(100*i)),
                        new Point(3100, 2700+(100*i)),
                        new Point(3000, 2700+(100*i)),
                    ], i
                    ));
                }
                break;
            }
        }
    };

    update() {
        for (let i = 0; i < this.list.length; i++) 
        {   this.list[i].update();
            if (this.list[i].life <= 0) 
            {   let kabum = new Explosion(this.list[i].center().x - 75, this.list[i].center().y - 75, 150, 150)
                explosions.list.push(kabum);
                entities.push(kabum)
                sounds.explosion();
                for (let i2 = 0; (i2 < entities.length); i2++) 
                {   let center = entities[i2].center();
                    let bCenter = this.list[i].center();
                    if (center.x == bCenter.x && center.y == bCenter.y) 
                    {   entities.splice(i2, 1);
                        i2 = entities.length;
                    }
                }
                this.list.splice(i, 1);
                i--;
            }
        }
        
        let tempList = [...this.list];

        for (let i = 0; i < tempList.length;) {
            for (let j = 1; j < tempList.length; j++) {
                let a = tempList[i];
                let b = tempList[j];
               let data = a.collision_c(b);
            if (data[0]) {
                let med_v = (a.velocidade + b.velocidade)/2.1
                data[6] = true;

                data[7] = Math.abs(b.velocidade/(med_v*2.1))
                b.velocidade = med_v;
                b.coli_aplic(data);
                data[4] = data[5];
                data[7] = Math.abs(a.velocidade/(med_v*2.1))
                a.velocidade = med_v;
                a.coli_aplic(data);

            }
            }
            tempList.shift();
        }
        for(let i = 0; i<this.list.length; i++)
        {
           if(this.list[i].hitbox.join("") == this.list[i].points.join(""))
           {
             this.list[i].points = JSON.parse(JSON.stringify(this.list[i].hitbox));

             this.list[i].back_up_angle = this.list[i].angle;

             for(let j = 0; j < this.list[i].weapons.length; j++)
             {
                 this.list[i].weapons[j].save = [...this.list[i].weapons[j].points]

             }
           }
        }   

    };
}



class Viper extends Car {
    constructor(points, index) {
        super(points, "cars/viper", index);
        this.life = 100;
        this.lifeLimit = this.life;
        this.weapons = [
            new MachineGun(this),
            new FlameThrower(this)
        ];
        this.atrito = 0.978;
    }
}
class Challenger extends Car {
    constructor(points, index) {
        super(points, "cars/challenger", index);
        this.life = 225;
        this.lifeLimit = this.life;
        this.weapons = [
            new ShotGun(this),
            new Saw(this)
        ];
        this.atrito = 0.975;
    }
}
class Ranger extends Car {
    constructor(points, index) {
        super(points, "cars/ranger", index);
        this.life = 275;
        this.lifeLimit = this.life;
        this.weapons = [
            new Rifle(this),
            new PEM(this)
        ];
        this.atrito = 0.972;
    }
}
class Vanderlei extends Car {
    constructor(points, index) {
        super(points, "cars/vanderlei", index);
        this.life = 375;
        this.lifeLimit = this.life;
        this.weapons = [
            new MissileLauncher(this),
            new MineLauncher(this)
        ];
        this.atrito = 0.969;

    }
}

class Test extends Car {
    constructor(points, index) {
        super(points, "cars/model-of-a-russian-monitor-novgorod-round-ship-c-1873-in-the-international-maritime-museum-in-hafencity-hamburg-germany-2TC9M4Y", index);
        this.life = 1000;
        this.lifeLimit = this.life;
        this.weapons = [
            new ShotGun(this)
        ];
    }
}