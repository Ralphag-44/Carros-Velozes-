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

    

class Entity 
{   constructor(n_p, cx, cy, width, height, img)
    {   
        this.points = [];
        let ang = 360/n_p;
        for(let i = ang; i <= 360; i += ang)
        {  
           let rad = (i+45)*(Math.PI/180);
           let px = cx + Math.cos(rad)*(width/2);
           let py = cy + Math.sin(rad)*(height/2);
           this.points.push(new Point(px, py));

        } 
        this.points.push(new Point(cx, cy));

        this.img = new Image();
        this.img.src = `imgs/${img}.png`;
    }
    draw()
    {   context.drawImage(this.img, this.points[0].x, this.points[0].y)
    }
    
    draw_debug()
    {    
        context.lineWidth = 2;
        context.strokeStyle = "red";
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        for(let i = 1; i < this.points.length-1; i++)
        {
           context.lineTo(this.points[i].x, this.points[i].y);
        }
        context.closePath();
        context.stroke();

 
        context.lineWidth = 3;
                

                context.strokeStyle = "black"
                context.beginPath()
                context.moveTo(this.points[4].x, this.points[4].y)
                context.lineTo(this.points[4].x + Math.cos(this.direcao) * 6*this.velocidade, (this.points[4].y + Math.sin(this.direcao) * 6*this.velocidade))
                context.stroke()

                context.strokeStyle = "yellow"
                context.beginPath()
                context.moveTo(this.points[4].x, this.points[4].y)
                context.lineTo(this.points[4].x + Math.cos(this.direcao_alvo) * 50, (this.points[4].y + Math.sin(this.direcao_alvo) * 50))
                context.stroke()


                context.fillStyle = "black"
                context.beginPath();
                context.arc((this.points[1].x +this.points[2].x)/2, (this.points[1].y +this.points[2].y)/2, 5, 0, 2 * Math.PI);
                context.fill();

                                
                context.fillStyle = "black"
                context.beginPath();
                context.arc((this.points[0].x +this.points[3].x)/2, (this.points[0].y +this.points[3].y)/2, 5, 0, 2 * Math.PI);
                context.fill();

                //linha 1
                context.strokeStyle = "blue"
                context.beginPath()
                context.moveTo((this.points[1].x +this.points[2].x)/2, (this.points[1].y +this.points[2].y)/2)
                context.lineTo(this.points[this.points.length-1].x, this.points[this.points.length-1].y)
                context.stroke()

                //Linha 2
                context.strokeStyle = "orange"
                context.beginPath()
                context.moveTo((this.points[0].x +this.points[3].x)/2, (this.points[0].y +this.points[3].y)/2)
                context.lineTo(this.points[this.points.length-1].x, this.points[this.points.length-1].y)
                context.stroke()


    }
    collision(entity)
    {   let colidiu = false;

        let fig_a = this.hitbox.slice(0, this.hitbox.length-1);
        let fig_b = entity.hitbox.slice(0, entity.hitbox.length-1);

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
    
}
/* 
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

    draw() {
        context.save();
        context.translate(this.center().x, this.center().y);
        context.rotate((this.angle * Math.PI / 180));
        context.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
        context.restore();
    };

    translate(dx, dy) {
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].translate(dx, dy)
        };
    };

    rotate(angle) {
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
};
*/
