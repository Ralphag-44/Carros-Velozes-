class Button {
    constructor(x, y, width, height, text, index) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.index = index;
    }

    collide(entity) {
        return (entity.x + entity.width >= this.x &&
            entity.x <= this.x + this.width &&
            this.y + this.height >= entity.y &&
            this.y <= entity.y + entity.height);
    }

    update() {
        this.changeText();
        context.fillStyle = menuOptions == this.index ? "#FBA206" : "white";
        context.fillRect(this.x, this.y, this.width, canvas.height * .1);
        txt(this.x + this.width / 2, this.y + (canvas.height * .05), this.text, 35, 'black', "center");
    }

    changeText() {
        if (!((this.index - 4) < 0)) {
            switch (this.index) {
                case 4:
                    this.text = `Acelerar: ${String.fromCharCode(grips[0].up)}`
                    break;
                case 5:
                    this.text = `Ré / Freio: ${String.fromCharCode(grips[0].down)}`
                    break;
                case 6:
                    this.text = `Volante Esq.: ${String.fromCharCode(grips[0].left)}`
                    break;
                case 7:
                    this.text = `Volante Dir.: ${String.fromCharCode(grips[0].right)}`
                    break;

                case 8:
                    this.text = `Acelerar: ${grips[1].up}`
                    break;
                case 9:
                    this.text = `Ré / Freio: ${grips[1].down}`
                    break;
                case 10:
                    this.text = `Volante Esq.: ${grips[1].left}`
                    break;
                case 11:
                    this.text = `Volante Dir.: ${grips[1].right}`
                    break;
            }
        }
    }

    press() {
        switch (this.index) {
            case 0:
                clearInterval(timer);
                timer = setInterval(tickTack, 1000 / FPS);
                break;
            case 1:
                if (players.length == 1) {
                    players.push(new PlayerCar(770, 615, 1, "imgs/fuscazebra.png"));
                    entities.splice(1, 0, players[1]);
                    grips.push({
                        up: 38,
                        down: 40,
                        left: 37,
                        right: 39
                    })
                } else {
                    players.pop();
                    grips.pop();
                }
                this.text = `Players: ${players.length}`;
                break;
            case 2:
                break;
            case 3:
                clearInterval(timer);
                timer = setInterval(configuration, 1000 / FPS);
                break;
        }
    }
}


class Buttons {
    constructor(list) {
        this.list = [];
        for (let i = 0; i < list.length; i++) {
            this.list.push(list[i]);
        }

    }

    update() {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].update();
        }
    }
}