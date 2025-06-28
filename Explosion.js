class Explosions {
    constructor() {
        this.list = [];
    }
    update() {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].update();
            if (this.list[i].currentSprite == 6) {
                for (let i2 = 0; (i2 < entities.length); i2++) {
                    let center = entities[i2].center();
                    let bCenter = this.list[i].center();
                    if (center.x == bCenter.x && center.y == bCenter.y) {
                        entities.splice(i2, 1);
                        i2 = entities.length;
                    }
                }
                
                this.list.splice(i, 1);
                i--;
            }
        }
    }
}

class Explosion extends Entity {
    constructor(x, y, width, height) {
        let points = [
            new Point(x, y),
            new Point(x + width, y),
            new Point(x + width, y + height),
            new Point(x, y + height)
        ]
        super(points, "");
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.frames = 0;
        this.currentSprite = 0;

        this.sprite1 = new Image();
        this.sprite2 = new Image();
        this.sprite3 = new Image();
        this.sprite4 = new Image();
        this.sprite5 = new Image();
        this.sprite6 = new Image();
        this.sprite1.src = "imgs/explosions/sprite1.png";
        this.sprite2.src = "imgs/explosions/sprite2.png";
        this.sprite3.src = "imgs/explosions/sprite3.png";
        this.sprite4.src = "imgs/explosions/sprite4.png";
        this.sprite5.src = "imgs/explosions/sprite5.png";
        this.sprite6.src = "imgs/explosions/sprite6.png";
    }

    update() {
        this.y += 2;
        this.frames++;
        if (this.frames == FPS / 5) {
            this.currentSprite++;
            this.frames = 0;
        }


        switch (this.currentSprite) {
            case 0:
                this.img = this.sprite1;
                break;
            case 1:
                this.img = this.sprite2;
                break;
            case 2:
                this.img = this.sprite3;
                break;
            case 3:
                this.img = this.sprite4;
                break;
            case 4:
                this.img = this.sprite5;
                break;
            case 5:
                this.img = this.sprite6;
                break;
        }

    }
}

class Smoke {
    constructor(x, y, width, height, intense) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.intense = intense;
        this.img = new Image();
        this.sprite1 = new Image();
        this.sprite2 = new Image();
        this.sprite3 = new Image();
        this.frames = 0;
        this.currentSprite = 0;

        this.sprite4 = new Image();
        this.sprite5 = new Image();
        this.sprite6 = new Image();
        switch (this.intense) {
            case -1:
                this.sprite1.src = "";
                this.sprite2.src = "";
                this.sprite3.src = "";
                this.sprite4.src = "";
                this.sprite5.src = "";
                this.sprite6.src = "";
                break;
            case 0:
                this.sprite1.src = "smoke/fumasa/sprite1";
                this.sprite2.src = "smoke/fumasa/sprite2";
                this.sprite3.src = "smoke/fumasa/sprite3";
                this.sprite4.src = "smoke/fumasa/sprite4";
                this.sprite5.src = "smoke/fumasa/sprite5";
                this.sprite6.src = "smoke/fumasa/sprite6";
                break;
            case 1:
                this.sprite1.src = "smoke/fumasacinzona/sprite1";
                this.sprite2.src = "smoke/fumasacinzona/sprite2";
                this.sprite3.src = "smoke/fumasacinzona/sprite3";
                this.sprite4.src = "smoke/fumasacinzona/sprite4";
                this.sprite5.src = "smoke/fumasacinzona/sprite5";
                this.sprite6.src = "smoke/fumasacinzona/sprite6";
                break;
            case 2:
                this.sprite1.src = "smoke/fumasapreta/sprite1";
                this.sprite2.src = "smoke/fumasapreta/sprite2";
                this.sprite3.src = "smoke/fumasapreta/sprite3";
                this.sprite4.src = "smoke/fumasapreta/sprite4";
                this.sprite5.src = "smoke/fumasapreta/sprite5";
                this.sprite6.src = "smoke/fumasapreta/sprite6";
                break;
        }
    }

    update(x, y) {
        this.x = x;
        this.y = y;
        this.frames++;
        if (this.frames == FPS / 3) {
            this.currentSprite++;
            this.frames = 0;
        }

        if (this.currentSprite > 5) {
            this.currentSprite = 0;
        }
        switch (this.currentSprite) {
            case 0:
                this.img = this.sprite1;
                break;
            case 1:
                this.img = this.sprite2;
                break;
            case 2:
                this.img = this.sprite3;
                break;
            case 3:
                this.img = this.sprite4;
                break;
            case 4:
                this.img = this.sprite5;
                break;
            case 5:
                this.img = this.sprite6;
                break;
        }

        context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}