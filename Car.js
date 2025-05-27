class Car extends Entity
{   constructor(points, img)
    {   
        super(points, img);
        this.angle = 0;
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
}
