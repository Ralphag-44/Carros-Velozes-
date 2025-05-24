class Point
{   constructor(x, y)
    {   this.x = x;
        this.y = y;
    }
    rotate(angle)
    {   angle *= Math.PI/180;
        let x = Math.cos(angle)*this.x-Math.sin(angle)*this.y;
        let y = Math.sin(angle)*this.x+Math.cos(angle)*this.y;
        this.x = x;
        this.y = y;
    }
    translate(dx, dy)
    {   this.x += dx;
        this.y += dy;
    }
}
class Entity 
{   constructor(points, img)
    {   this.points = points;
        this.img = new Image();
        this.img.src = `imgs/${img}.png`;
    }
    draw()
    {   context.drawImage(this.img, this.points[0].x, this.points[0].y)
    }
    collision(entity)
    {   let colidiu = false;
        for(let i = 0; (i < this.points.length) && (!colidiu); i++)
        {   let x1 = this.points[i].x;
            let y1 = this.points[i].y;
            let x2 = this.points[(i+1)%this.points.length].x;
            let y2 = this.points[(i+1)%this.points.length].y;
            for(let i2 = 0; (i2 < entity.length) && (!colidiu); i2++)
            {   let x3 = entity[i2].x;
                let y3 = entity[i2].y;
                let x4 = entity[(i2+1)%entity.length].x;
                let y4 = entity[(i2+1)%entity.length].y;
                let denominador = ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1))
                if(denominador != 0)
                {   let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / denominador;
                    let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / denominador;
                    colidiu = (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1);
                }
            }
        }
        return colidiu;
    }
}