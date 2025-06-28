class Hud
{   constructor(player)
    {   this.player = players.list[player];
        this.playerId = player;
        this.velocityIndicator = new Image();
        this.velocityLine = new Image();
        this.velocityIndicator.src = "imgs/hud/veloci_grade.png";
        this.velocityLine.src = "imgs/hud/velo_indic.png";
    }
    draw()
    {   context.font = `${30/(playersQuantity > 2 ? playersQuantity/2 : 1)}px Arial`;
        context.globalAlpha = .5;
        if(playersQuantity < 4)
        {   context.fillStyle = "black";
            context.fillRect(0, 0, cameras[0].width, 120);
            context.drawImage(this.velocityIndicator, 10/(playersQuantity > 2 ? playersQuantity/2 : 1), -15, 150, 150);
            context.fillStyle = "white";
            context.fillText(`VOLTAS: ${this.player.lap} / ${totalLaps}`, cameras[0].width-110/(playersQuantity > 2 ? playersQuantity/2 : 1), 60);
            context.drawImage(this.velocityLine, 6/(playersQuantity > 2 ? playersQuantity/2 : 1), -14, 150, 150);
            context.fillStyle = "white";
            context.fillText(`VIDA: ${Math.trunc(this.player.life)} / ${this.player.lifeLimit}`, 300/(playersQuantity > 2 ? 1.25 : 1), 50)
            if(this.player.life > 0)
            {   context.fillStyle = "red";
                context.fillRect(200/(playersQuantity > 2 ? 1.15 : 1), 70, ((200*this.player.life)/this.player.lifeLimit)/(playersQuantity > 2 ? playersQuantity/2 : 1), 20);
            }
        }
        else
        {   context.fillStyle = "black";
            context.fillRect(0, 0, 120, cameras[0].height);
            context.drawImage(this.velocityIndicator, -15, -15, 150, 150);
            context.fillStyle = "white";
            context.fillText(`VOLTAS: ${this.player.lap} / ${totalLaps}`, 62, 150);
            context.drawImage(this.velocityLine, -19, -14, 150, 150);
            context.fillStyle = "white";
            context.fillText(`VIDA: ${Math.trunc(this.player.life)} / ${this.player.lifeLimit}`, 62, 200)
            if(this.player.life > 0)
            {   context.fillStyle = "red";
                context.fillRect(10, 215, ((200*this.player.life)/this.player.lifeLimit)/(playersQuantity > 2 ? playersQuantity/2 : 1), 20);
            }
        }
        
    }
}