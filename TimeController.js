class Time {
    constructor(r) {
        // this.points = [];
        // for(let i = 0; (i < r.points.length); i++)
        // {   this.points.push(new Point(r.points[i].x, r.points[i].y))
        // }
        // this.weapons = [];
        // switch(carsSet[r.index]) {
        //     case 0:
        //         this.weapons = [new MachineGun(r), new FlameThrower(r)];
        //     break;
        //     case 1:
        //         this.weapons = [new ShotGun(r), new Saw(r)];
        //     break;
        //     case 2:
        //         this.weapons = [new Rifle(r), new PEM(r)];
        //     break;
        //     case 3:
        //         this.weapons = [new MissileLauncher(r), new MineLauncher(r)];
        //     break;
        // }
        this.angle = r.angle;
        this.life = r.life;
        this.center = r.center();
        
        this.bullets = [];

        for (let i = 0; i < r.weapons.length; i++) 
        {   if(r.weapons[i]?.bullets && r.weapons[i].bullets.list.length > 0)
            {   let Bullets = [];
                let list = r.weapons[i].bullets.list;

                for (let i2 = 0; i2 < list.length; i2++) 
                {   let points = [];

                    for (let i3 = 0; i3 <list[i2].points.length; i3++) 
                    {   points.push({
                            x:list[i2].points[i3].x,
                            y:list[i2].points[i3].y
                        });
                    }
                    Bullets.push({
                        points: points,
                        angle: list[i2].angle,
                        velocity: list[i2].velocity ? list[i2].velocity : 0
                    });
                }
                this.bullets.push(Bullets);
            }
            
        }
    }
}

class TimeController
{   constructor()
    {   this.carsPositions = [];
        this.replays = [];
        for(let i = 0; (i < players.list.length); i++)
        {   this.carsPositions.push([]);   
            this.replays.push([]);   
        }
        this.replayScale = 1.4;
        this.replaying = false;
    }
    update()
    {   if(!this.replaying)
        {   for(let i = 0; (i < players.list.length); i++)
            {   let ref = players.list[i];
                this.carsPositions[i].push(new Time(ref))
            }
        }
        else
        {   for(let i = 0; (i < players.list.length); i++)
            {   let ref = players.list[i];
                let last = this.carsPositions[i].length - 1;

                // for (let i2 = 0; i2 < ref.points.length; i2++)
                // {   ref.points[i2].x = this.carsPositions[i][last].points[i2].x;
                //     ref.points[i2].y = this.carsPositions[i][last].points[i2].y;
                // }
                ref.translate(this.carsPositions[i][last].center.x-ref.center().x, this.carsPositions[i][last].center.y-ref.center().y);
               
                ref.rotate(this.carsPositions[i][last].angle-ref.angle);
                ref.life = this.carsPositions[i][last].life;
                for (let i2 = 0; i2 < ref.weapons.length; i2++) 
                {   if (ref.weapons[i2]?.bullets && this.carsPositions[i][last].bullets[i2]) 
                    {   for (let i3 = 0; i3 < this.carsPositions[i][last].bullets[i2].length; i3++) 
                        {   ref.weapons[i2].bullets.list[i3].translate(
                                this.carsPositions[i][last].bullets[i2][i3].points[0].x - ref.weapons[i2].bullets.list[i3].points[0].x,
                                this.carsPositions[i][last].bullets[i2][i3].points[0].y - ref.weapons[i2].bullets.list[i3].points[0].y
                            );
                            ref.weapons[i2].bullets.list[i3].angle = this.carsPositions[i][last].bullets[i2][i3].angle;
                            ref.weapons[i2].bullets.list[i3].velocity = this.carsPositions[i][last].bullets[i2][i3].velocity;
                        }
                    }
                }
                //ref.weapons = this.carsPositions[i][last].weapons;
                // for (let i = 0; i < ref.weapons.length; i++) 
                // {   ref.weapons[i].update();
                // }
                

                this.carsPositions[i].splice(last, 1);     
            }
            let finalizado = 0;
            for(let i = 0; (i < this.carsPositions.length); i++)
            {   finalizado += this.carsPositions[i][0] == undefined;
                if(finalizado == this.carsPositions.length)
                {   this.replaying = false
                }
            }
        }
    }
}