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
class Car
{   constructor(img, x, y, name)
    {   this.width = 40*canvas.width/1440;
        this.height = 20*canvas.height/767;
        this.x = x*canvas.width/1440;
        this.y = y*canvas.height/767;
        this.img = new Image();
        this.img.src = img;
        this.points = [new Point(this.x, this.y), new Point(this.x+this.width, this.y), new Point(this.x+this.width, this.y+this.height), new Point(this.x, this.y+this.height)];
        //speed
        this.name = name;
        this.speed = 0;
        this.speedL = canvas.width/1440;
        this.acc = this.speedL/20;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.drag = .95;
        //angle
        this.angle = 180;
        this.particulasLeft = [];
        this.particulasRight = [];
        this.particulas = [];

        this.lap = 1;
        this.number = 0;
    }
    draw()
        {   if(this.particulas.length > 0)
            {   this.drawParticulas();
            }
        
        

        let center = this.center();
        context.save();
        context.translate(center.x, center.y);
        context.rotate(this.angle*Math.PI/180);
        context.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
        context.restore();
        if(collisionsS)
        {   context.strokeStyle = "red";
            context.beginPath();
            context.moveTo(this.points[0].x, this.points[0].y)
            for(let i = 1; (i < this.points.length); i++)
            {   context.lineTo(this.points[i].x, this.points[i].y)
            }
            context.closePath();
            context.stroke();
            let center = this.center();
            context.strokeStyle = 'blue';
            context.lineWidth = 5;
            context.beginPath();
            context.moveTo(center.x, center.y);
            context.lineTo(center.x + this.xVelocity * 5, center.y + this.yVelocity * 5);
            context.stroke();
            context.lineWidth = 1;
        
        }
        
    }
    drawParticulas()
    {   context.strokeStyle = "black";
        context.lineWidth = 5;
        context.beginPath();
        context.moveTo(this.particulasLeft[0].x, this.particulasLeft[0].y)
        for(let i = 1; (i < this.particulasLeft.length); i++)
        {   context.lineTo(this.particulasLeft[i].x, this.particulasLeft[i].y);
        }
        context.moveTo(this.particulasRight[0].x, this.particulasRight[0].y)
        for(let i = 1; (i < this.particulasRight.length); i++)
        {   context.lineTo(this.particulasRight[i].x, this.particulasRight[i].y);
        }
        context.stroke();
        context.lineWidth = 1;
    }
    update()
    {   if(this.speed < -this.speedL/2)
        {   this.speed = -this.speedL/2;
        }
        else
        {   if(this.speed > this.speedL)
            {   this.speed = this.speedL;
            }
        }

        if(this.moving)
        {   this.xVelocity += Math.cos(this.angle*Math.PI/180) * this.speed;
            this.yVelocity += Math.sin(this.angle*Math.PI/180) * this.speed;
        }
        else
        {   this.xVelocity -= Math.sign(this.xVelocity)*this.acc;
            this.xVelocity -= Math.sign(this.yVelocity)*this.acc;
            this.speed -= Math.sign(this.speed)*this.acc/5;
            if(Math.trunc(this.xVelocity * 10) == 0 && Math.trunc(this.yVelocity * 10) == 0)
            {   this.xVelocity = 0;
                this.yVelocity = 0;
                this.speed = 0;
            }
        }

        if(Math.abs(this.xVelocity) > this.speedL*12)
        {   this.xVelocity = this.speedL*12*Math.sign(this.xVelocity)
        }
        if(Math.abs(this.yVelocity) > this.speedL*12)
        {   this.yVelocity = this.speedL*12*Math.sign(this.yVelocity)
        }
        this.translate(this.xVelocity, this.yVelocity);
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        if(this.collision(road.roadPe) || this.collision(road.roadPi) || this.collision(road.roadPi2))
        {    this.translate(-this.xVelocity, -this.yVelocity);
            this.x -= this.xVelocity;
            this.y -= this.yVelocity;
            this.xVelocity = 0;
            this.yVelocity = 0;
            this.speed = 0;
        }
        this.xVelocity *= this.drag;
        this.yVelocity *= this.drag;
        

        for(let i = 0; (i < this.particulas.length); i++)
        {   this.particulas[i].update();
            if(this.particulas[i].timer <= 0)
            {   this.particulas.splice(i, 1);
                this.particulasLeft.splice(i, 1);
                this.particulasRight.splice(i, 1);
                i--;
            }
        }
        if(this.speed != 0)
        {   this.particulasLeft.push(new Particle(this.points[1].x, this.points[1].y, 2));
            this.particulasRight.push(new Particle(this.points[2].x, this.points[2].y, 2));
            this.particulas = this.particulasLeft.concat(this.particulasRight);
        }
        
    }
    translate(dx, dy)
    {   for(let i = 0; (i < this.points.length); i++)
        {   this.points[i].translate(dx, dy)
        }
    }
    rotate(angle)
    {   
        if(!(this.collision(road.roadPe) || this.collision(road.roadPi) || this.collision(road.roadPi)))
        {   this.angle += angle;
            let center = this.center();
            this.translate(-center.x, -center.y);
            for(let i = 0; (i < this.points.length); i++)
            {   this.points[i].rotate(angle)
            }
            this.translate(center.x, center.y);
            if(this.collision(road.roadPe) || this.collision(road.roadPi) || this.collision(road.roadPi2))
            {   this.angle -= angle;
                this.translate(-center.x, -center.y);
                for(let i = 0; (i < this.points.length); i++)
                {   this.points[i].rotate(-angle)
                }
                this.translate(center.x, center.y);
            }
        }
        // let center = this.center();
        // this.translate(-center.x, -center.y);
        // for(let i = 0; (i < this.points.length); i++)
        // {   this.points[i].rotate(angle)
        // }
        // this.translate(center.x, center.y);
        // if(this.collision(road.roadPe) || this.collision(road.roadPi) || this.collision(road.roadPi))
        // {   center = this.center();
        //     this.translate(-center.x, -center.y);
        //     for(let i = 0; (i < this.points.length); i++)
        //     {   this.points[i].rotate(-angle)
        //     }
        //     this.translate(center.x, center.y);[
        //     return 
        // }
        //  this.angle += angle * Math.PI/180;
    }
    center()
    {   let center = new Point(0, 0);
        for(let i = 0; (i < this.points.length); i++)
        {   center.x += this.points[i].x;
            center.y += this.points[i].y;
        }
        center.x /= this.points.length;
        center.y /= this.points.length;
        return center; 
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
class Particle
{   constructor(x, y, radius)
    {   this.x = x;
        this.y = y;
        this.radius = radius;
        this.timer = 30;
    }
    update()
    {   this.timer--;
    }
}


class BotCar extends Car
{   constructor(img, x, y, name)
    {   super(img, x, y, name)
    }
    update()
    {   super.update();
        let center = this.center();
        let lineLength = this.lineDistances();
        if(collisionsS)
        {   context.strokeStyle = "orange";
            context.lineWidth = 5;
            for(let i2 = -45, i = 0; (i2 <= 45); i2+=22.5, i++)
            {   let xdir = Math.cos((this.angle+i2)*Math.PI/180);
                let ydir = Math.sin((this.angle+i2)*Math.PI/180);
                context.beginPath();
                context.moveTo(center.x, center.y);
                context.lineTo((lineLength[i]*xdir)+center.x, (lineLength[i]*ydir)+center.y);
                context.closePath();
                context.stroke();
            }        
            context.lineWidth = 1;
        }
    }
    actions()
    {   
    }
    lineDistances()
    {   let center = this.center();
        let distances = [];
        let i = 0;
        for(let l = -45; (l <= 45); l+=22.5)
        {   for(let collided = false; (!collided) && (i < canvas.width); i++)
            {   let xdir = Math.cos((this.angle+l)*Math.PI/180);
                let ydir = Math.sin((this.angle+l)*Math.PI/180);
                let xMove = center.x+xdir*i;
                let yMove = center.y+ydir*i;
                collided = this.lineCollision(road.roadPe, new Point(xMove, yMove)) || this.lineCollision(road.roadPi, new Point(xMove, yMove)) || this.lineCollision(road.roadPi2, new Point(xMove, yMove));
                for(let i2 = 0; (i2 < car.length); i2++)
                {   if(this.name != car[i2].name)
                    {   collided = collided || this.lineCollision(car[i2].points, new Point(xMove, yMove));
                    }
                }
            }
            distances.push(i);
            i = 0;
        }
        return distances;
    }
    lineCollision(entity, point)
    {   let collided = false;
        for(let i = 0; (i < entity.length) && (!collided) && (i < canvas.width); i++)
        {   let d1 = Math.hypot(entity[i].x-point.x, entity[i].y-point.y);
            let d2 = Math.hypot(entity[(i+1)%entity.length].x-point.x, entity[(i+1)%entity.length].y-point.y);
            let lineLength = Math.hypot(entity[i].x-entity[(i+1)%entity.length].x, entity[i].y-entity[(i+1)%entity.length].y);
            let buffer = .3;
            collided = (((d1 + d2) >= (lineLength-buffer)) && ((d1+d2) <= (lineLength+buffer)));
        }
        return collided;
    }
}