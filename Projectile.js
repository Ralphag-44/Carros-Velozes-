class Projectile extends Entity
{   constructor(points, img, angle)
    {   super(points, img);
        this.angle = angle;
    };

    update(){
        let dx = Math.cos(this.angle*Math.PI/180)*this.velocity;
        let dy = Math.sin(this.angle*Math.PI/180)*this.velocity;
        this.translate(dx, dy);
    };
};

class MachineGunBullet extends Projectile{
    constructor(owner){
        super();
        this.velocity = 10;
        this.damage = 2;
    };
};

class MissileBullet extends Projectile{
    constructor(){
        super();
        this.velocity = 5;
        this.damage = 99;
    };
};

class ShotGunBullet extends Projectile{
    constructor(points){
        super();
        this.velocity = 7;
        this.damage = 20;
    };
};