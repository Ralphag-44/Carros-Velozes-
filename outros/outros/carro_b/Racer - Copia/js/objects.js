class Object {
    constructor(x, y, width, height, img) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.src = img;
    }

    draw() {
        context.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

class Objects {
    constructor() {
        this.objects = [
            new Object(0.03*innerWidth, 0.2*innerHeight, 0.1*innerWidth, 0.35*innerHeight, "imgs/tree/pinheiro.png"),
            new Object(0.36*innerWidth, 0.174*innerHeight, 0.16*innerWidth, 0.35*innerHeight, "imgs/tree/carvalho.png")
        ];
    }

    draw() {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].draw();
        }
    }
}