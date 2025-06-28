class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };
    rotate(angle) {
        angle *= Math.PI / 180;
        let x = Math.cos(angle) * this.x - Math.sin(angle) * this.y;
        let y = Math.sin(angle) * this.x + Math.cos(angle) * this.y;
        this.x = x;
        this.y = y;
    };
    translate(dx, dy) {
        this.x += dx;
        this.y += dy;
    };
};

class Entity {
    constructor(points, img) {
        this.points = points;
        this.img = new Image();
        this.img.src = img ? `imgs/${img}.png` : "";
        if (this.points.length > 3) {
            this.width = Math.hypot(this.points[1].x - this.points[0].x, this.points[1].y - this.points[0].y);
            this.height = Math.hypot(this.points[3].x - this.points[0].x, this.points[3].y - this.points[0].y);
        };
    };

    draw(id) {
        context.save();
        context.beginPath();
        context.rect(0, 0, cameras[id].width, cameras[id].height);
        context.clip();
        let translate = {x: this.center().x -cameras[id]?.x, y: this.center().y -cameras[id]?.y}
        context.translate(translate.x, translate.y);
        context.rotate((this.angle * Math.PI / 180));

        // let cutX = (this.center().x-this.width/2)-cameras[id].x;
        // let cutY = (this.center().y-this.height/2)-cameras[id].y;
        // let sx = cutX < 0 ? -cutX : 0
        // let sy = cutY < 0 ? -cutY : 0;
        // let sw = this.width - sx;
        // let sh = this.height - sy;
        // context.drawImage(this.img, sx, sy, sw, sh, -this.width/2+sx, -this.height/2+sh, sw, sh)

        context.drawImage(this.img, -this.width/2, -this.height/2, this.width, this.height)
        
        context.restore();
    };

        draw_debug(id) {
        const cam = cameras[id];

        // Hitbox vermelha
        context.lineWidth = 2;
        context.strokeStyle = "red";
        context.beginPath();
        context.moveTo(this.points[0].x - cam.x, this.points[0].y - cam.y);
        for (let i = 1; i < this.points.length-1; i++) {
            context.lineTo(
            this.points[i].x - cam.x,
            this.points[i].y - cam.y
            );
        }
        context.closePath();
        context.stroke();


        // Direção atual (preto) e alvo (amarelo)
        const cx = this.points[4].x - cam.x;
        const cy = this.points[4].y - cam.y;

        context.lineWidth = 3;

        // velocidade
        context.strokeStyle = "black";
        context.beginPath();
        context.moveTo(cx, cy);
        context.lineTo(
            cx + Math.cos(this.direcao) * 6 * this.velocidade,
            cy + Math.sin(this.direcao) * 6 * this.velocidade
        );
        context.stroke();

        // direção alvo
        context.strokeStyle = "yellow";
        context.beginPath();
        context.moveTo(cx, cy);
        context.lineTo(
            cx + Math.cos(this.direcao_alvo) * 50,
            cy + Math.sin(this.direcao_alvo) * 50
        );
        context.stroke();


        // Pontos médios das arestas
        context.fillStyle = "black";
        let mid01x = ((this.points[1].x + this.points[0].x) / 2) - cam.x;
        let mid01y = ((this.points[1].y + this.points[0].y) / 2) - cam.y;
        context.beginPath();
        context.arc(mid01x, mid01y, 5, 0, 2 * Math.PI);
        context.fill();

        let mid23x = ((this.points[2].x + this.points[3].x) / 2) - cam.x;
        let mid23y = ((this.points[2].y + this.points[3].y) / 2) - cam.y;
        context.beginPath();
        context.arc(mid23x, mid23y, 5, 0, 2 * Math.PI);
        context.fill();


        // Linha 1 (azul)
        context.strokeStyle = "blue";
        context.beginPath();
        context.moveTo(mid01x, mid01y);
        context.lineTo(
            this.points[this.points.length - 1].x - cam.x,
            this.points[this.points.length - 1].y - cam.y
        );
        context.stroke();

        // Linha 2 (laranja)
        context.strokeStyle = "orange";
        context.beginPath();
        context.moveTo(mid23x, mid23y);
        context.lineTo(
            this.points[this.points.length - 1].x - cam.x,
            this.points[this.points.length - 1].y - cam.y
        );
        context.stroke();
        }

    translate(dx, dy) {
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].translate(dx, dy)
        };
    };

    rotate(angle) {
        if(this.img.src.includes("fire.png"))
        {   // console.log("chamou", angle)
        }
        let center = this.center();
        this.translate(-center.x, -center.y);
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].rotate(angle);
        };
        this.translate(center.x, center.y);
        this.angle = (this.angle + angle + 360) % 360;
    };

    center() {
        let center = new Point(0, 0);
        for (let i = 0; i < this.points.length; i++) {
            center.x += this.points[i].x;
            center.y += this.points[i].y;
        }
        center.x /= this.points.length;
        center.y /= this.points.length;
        return center;
    };

    collision(entity) {
        let colidiu = false;
        for (let i = 0; (i < this.points.length) && (!colidiu); i++) {
            let x1 = this.points[i].x;
            let y1 = this.points[i].y;
            let x2 = this.points[(i + 1) % this.points.length].x;
            let y2 = this.points[(i + 1) % this.points.length].y;
            //console.log(entity)
            for (let i2 = 0; (i2 < entity.length) && (!colidiu); i2++) {
                let x3 = entity[i2].x;
                let y3 = entity[i2].y;
                let x4 = entity[(i2 + 1) % entity.length].x;
                let y4 = entity[(i2 + 1) % entity.length].y;
                
                let denominador = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
                if (denominador != 0) {
                    let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominador;
                    let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominador;
                    colidiu = (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1);
                };
            };
        };
        return colidiu;
    };


        collision_c(entity)
    {   let colidiu = false;

        let fig_a = this.hitbox.slice(0, this.hitbox.length-1);
        let fig_b; 
        if((fig_b instanceof Car))
        {
             fig_b = entity.hitbox.slice(0, entity.hitbox.length-1);
        }
        else{
            if(entity?.points)
            {   fig_b = entity.points.slice(0, entity.points.length);
            }
            else
            {   fig_b = entity;
            }
        }

        for(let i = 0; (i < fig_a.length) && (!colidiu); i++)
        {   let x1 = fig_a[i].x;
            let y1 = fig_a[i].y;  
            let x2 = fig_a[(i+1)%fig_a.length].x;
            let y2 = fig_a[(i+1)%fig_a.length].y;
            for(let i2 = 0; (i2 < fig_b.length) && (!colidiu); i2++)
            {   let x3 = fig_b[i2].x;
                let y3 = fig_b[i2].y;
                let x4 = fig_b[(i2+1)%fig_b.length].x;
                let y4 = fig_b[(i2+1)%fig_b.length].y;
                let denominador = ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1))
                if(denominador != 0)
                {   let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / denominador;
                    let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / denominador;
                    colidiu = (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1);
                    if(colidiu){
                 
                    return [colidiu, {x:x1 + (uA * (x2-x1)),y:y1 + (uA * (y2-y1))}, i, (i+1)%fig_a.length, [{x:x1, y:y1}, {x:x2, y:y2}], [{x:x3, y:y3}, {x:x4, y:y4}]]
                        
                    }
                }
            }
        }
        return [colidiu];
    }
};

