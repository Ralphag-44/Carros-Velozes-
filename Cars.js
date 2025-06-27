class Cars {
    constructor() {
        this.list = [

            new Viper(4, 150, 125, 100, 50, 0), 
            new Challenger(4, 550, 125, 100, 50, 1),
            new Vanderlei(4, 150, 300, 100, 50, 2),
            new Ranger(4, 550, 300, 100, 50, 3)
        ];
    }

    update() {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].update();
            if (this.list[i].life <= 0) {
                this.list.splice(i, 1);
                //new Explosion()
            }
        }

        let tempList = [...this.list];

        for (let i = 0; i < tempList.length;) {
            for (let j = 1; j < tempList.length; j++) {
                let a = tempList[i];
                let b = tempList[j];
               let data = a.collision(b);
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
           }
        }
    };

    draw() {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].draw_debug();
        }
    }
}

class Viper extends Car {
    constructor(n_p, cx, cy, width, height, index) {
        super(n_p, cx, cy, width, height, "cars/viper", index, null);
        this.life = 100;
        this.frontWeapon = new MachineGun(this);
    }
}

class Challenger extends Car {
    constructor(n_p, cx, cy, width, height, index) {
        super(n_p, cx, cy, width, height, "cars/challenger", index, null);
        this.life = 225;
        this.frontWeapon = new ShotGun(this);
    }
}

class Ranger extends Car {
    constructor(n_p, cx, cy, width, height, index) {
        super(n_p, cx, cy, width, height, "cars/ranger", index, null);
        this.life = 275;
        this.frontWeapon = new MissileLauncher(this);
    }
}

class Vanderlei extends Car {
    constructor(n_p, cx, cy, width, height, index) {
        super(n_p, cx, cy, width, height, "cars/vanderlei", index, null);
        this.life = 375;
        this.frontWeapon = new ShotGun(this);
    }
}

class Test extends Car {
    constructor(n_p, cx, cy, width, height, index) {
        super(
            n_p,
            cx,
            cy,
            width,
            height,
            "cars/model-of-a-russian-monitor-novgorod-round-ship-c-1873-in-the-international-maritime-museum-in-hafencity-hamburg-germany-2TC9M4Y",
            index,
            null
        );
        this.life = 1;
        this.frontWeapon = new ShotGun(this);
    }
}
