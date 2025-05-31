class Car extends Entity
{   constructor(points, img, id)
    {   
        super(points, img);
        this.angle = 0;
        this.id = id;
        this.camera = new Camera(this.x, this.y, canvas.width/4, canvas.height/4, 2, 2, id);
    }
    draw()
    {   context.drawImage(this.img, this.points[0].x, this.points[0].y, this.points[1].x-this.points[0].x, this.points[2].y-this.points[0].y);
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        for(let i = 1; (i < this.points.length); i++)
        {   context.lineTo(this.points[i].x, this.points[i].y);
        }
        context.closePath();
        context.stroke();
    }
    update()
    {   
    }
    rotate(angle)
    {   this.angle += angle;
        for(let i = 0; (i < this.points.length); i++)
        {   this.points[i].rotate(angle);
        }
    }
    translate(dx, dy)
    {   for(let i = 0; (i < this.points.length); i++)
        {   this.points[i].translate(dx, dy);
        }
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
}
