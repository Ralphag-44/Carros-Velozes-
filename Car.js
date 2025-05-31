class Car extends Entity {
    constructor(points, img, index) {
        super(points, img);
        this.angle = 0;
        this.frontWeapons =
            [
                new MachineGun(this),
                new ShotGun(this),
                new MissileLauncher(this),
            ];
        this.frontWeaponsIndex = 0;
        this.frontWeaponsCount = 0;
        this.frontWeaponsDelay = 6 * FPS / 30; //delay ajustavel por causa do numero de updates dependendo do fps


        this.index = this.index;
    };

    update() {
        this.changeWeapon();
        this.move();
        for (let i = 0; i < this.frontWeapons.length; i++) {
            this.frontWeapons[i].update();
        };
    };

    changeWeapon() {
        this.frontWeaponsCount++;
        if (keys[81] && this.frontWeaponsCount > this.frontWeaponsDelay) {
            this.frontWeaponsIndex = (this.frontWeaponsIndex + 1) % this.frontWeapons.length;
            console.log(this.frontWeaponsIndex)
            this.frontWeaponsCount = 0;
        };
        if (keys[69] && this.frontWeapons[this.frontWeaponsIndex].ammo > 0 && this.frontWeapons[this.frontWeaponsIndex].coolDownCount == 0) {
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
            for (let j = 0; j < this.frontWeapons[i].points.length; j++) {
                this.frontWeapons[i].points[j].translate(dx, dy);
            };
        };
    };
};