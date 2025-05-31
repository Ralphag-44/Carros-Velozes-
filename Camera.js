class Camera
{   constructor(x, y,width, height, xScale, yScale, following)
    {   this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xScale = xScale;
        this.yScale = yScale;        
        this.following = following;
    }    
    draw()
    {   context.drawImage(background, 0,0,canvas.width, canvas.height);
    }
    show(points)
    {   let onCamera = false;
        for(let i = 0; (i < points.length); i++)
        {   onCamera = (points[i].x >= this.x && points[i].x <= this.x+this.width)&&(points[i].y >= this.y && points[i].y <= this.y+this.height);
        }
        return onCamera;
    }
    update()
    {   let followingCenter = cars[this.following].center();
        this.x = followingCenter.x - this.width/2;
        this.y = followingCenter.y - this.height/2;
    }
}