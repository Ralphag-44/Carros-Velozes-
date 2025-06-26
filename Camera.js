class Camera
{   constructor(following)
    {   this.following = following;
        if(players.list.length > 3)
        {   this.width = canvas.width/2;
            this.height = canvas.height/2;
            this.canvasY = Math.trunc(this.height*following/2);
        }
        else
        {   this.width = canvas.width/players.list.length;
            this.height = canvas.height;
            this.canvasY = 0;
        }
        this.x = 0;
        this.y = 0;
        this.shakeTime = 0;
        this.shakeIntensityP = 30;
        this.shakeIntensity = 30;
        this.canvasX = this.width*following;
    }
    update()
    {   let player = players.list[this.following];
        let playerCenter = player.center();
        this.x = (playerCenter.x + player.width / 2)  - canvas.width / 2;
        this.y = (playerCenter.y + player.height / 2) - canvas.height / 2;
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
    draw()
    {   context.drawImage(world.pista, this.x, this.y, this.width, this.height, this.canvasX, this.canvasY, this.width, this.height);
    }
    shake()
    {   this.shakeTime = 20;
    }
}