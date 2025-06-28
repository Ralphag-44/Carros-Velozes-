class Camera
{   constructor(follow)
    {   this.follow = players.list[follow];
        if(players.list.length > 3)
        {   this.width = canvas.width/2;
            this.height = canvas.height/2;
            this.canvasY = this.height*Math.trunc(follow/2);
            this.canvasX = this.width*(follow%2);
            this.shakeIntensityP = 30;
            this.shakeTime = 0;
            this.shakeIntensity = 30;
        }
        else
        {   this.width = canvas.width/players.list.length;
            this.height = canvas.height;
            this.canvasY = 0;
            this.canvasX = this.width*follow;
        }
        this.id = follow;
    }
    collide(obj) {
        let obj_center = obj.center();
        // return (
        //     obj_center.x - obj.width / 2 >= this.x &&
        //     obj_center.x + obj.width / 2 <= this.x + this.width &&
        //     obj_center.y - obj.height / 2 >= this.y &&
        //     obj_center.y + obj.height / 2 <= this.y + this.height
        // );

        return !(
            this.x > obj_center.x +obj.width/2 ||
            this.x + this.width < obj_center.x - obj.width/2 ||
            this.y > obj_center.y +obj.height/2 ||
            this.y + this.height < obj_center.y - obj.height/2
        );
    }
    draw()
    {   
        context.fillStyle = "green"
        context.fillRect(this.canvasX, this.canvasY, this.width, this.height)
        context.drawImage(world.pista, this.x, this.y, this.width, this.height, this.canvasX, this.canvasY, this.width, this.height) 
        // eu to aq seu viado é que eu desativei o mic pra ficar numa posicao melhor na poltrona

        

        context.save();
        context.translate(this.canvasX, this.canvasY);
        
        for(let i = 0; i < entities.length; i++)
        {   //context.clip()
            // console.log(i, entities[i])
            if(this.collide(entities[i]))
            {   entities[i].draw(this.id);
                // if(entities[i].img.src.includes("imgs/guns/tnt.png"))
                    // console.log(entities[i])
            }
        }
        context.restore();
        context.strokeStyle = "black";
        context.lineWidth = 3;
        context.strokeRect(this.canvasX, this.canvasY, this.width-2, this.height-2);
    }
    update()
    {   let follow_center = this.follow.center();
        this.x = (follow_center.x + this.follow.width / 2)  - this.width / 2;
        this.y = (follow_center.y + this.follow.height / 2) - this.height / 2;
        if(this.x < 0)
        {   this.x = 0;
        }
        else
        {   if(this.x+this.width > world.width)
            {   this.x = world.width-this.width;   
            }
        }
        if(this.y < 0)
        {   this.y = 0;
        }
        else
        {   if(this.y+this.height > world.height)
            {   this.y = world.height-this.height;   
            }
        }
        if(this.shakeTime > 0)
        {   this.y += Math.trunc(Math.random()*(this.shakeIntensity*2+1))-this.shakeIntensity;
            this.x += Math.trunc(Math.random()*(this.shakeIntensity*2+1))-this.shakeIntensity;
            this.shakeIntensity -= this.shakeIntensityP/(20);
            this.shakeTime--;
        }
        else
        {   this.shakeIntensity = this.shakeIntensityP;
        }
    }
}