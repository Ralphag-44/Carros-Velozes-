class Button
{   constructor(x, y, width, height, text)
    {   this.x = x;
        this.y = y;
        if(width == "")
        {   this.width = canvas.width*.2;
        }
        else
        {   this.width = width;   
        }
        if(height == "")
        {   this.height = canvas.height*.13;
        }
        else
        {   this.height = height;
        }
        this.text = text;
        this.selected = false;
    }
    draw()
    {   context.fillStyle = this.selected ? "rgba(255, 0, 0, .3)" : "red";
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.selected ? "rgba(255, 255, 255, .3)" : "white";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = (canvas.width+canvas.height)/75+"px Times New Roman";
        if(this.text != "SOM")
        {   context.fillText(this.text, this.x+this.width/2, this.y+this.height/2);
        }
    }
    clicked(){console.log("Em desenvolvimento!")}
}

class SwitchRoomButton extends Button
{   constructor(x, y, width, height, text, roomToGo)
    {   super(x, y, width, height, text);
        this.roomToGo = roomToGo;
    }
    clicked()
    {   buttonsCanSwitch = 0;
        switch(this.roomToGo)
        {   case loop:
                clearInterval(timer);
                timer = setInterval(this.roomToGo, 1000/FPS);
                document.getElementById("style").textContent = "* { margin: 0px; overflow: hidden;}"
                players = new Cars(carsSet.slice(0, playersQuantity));
                entities = players.list.concat([])
                sounds = new Sounds();
                time = new TimeController();
                cameras = [];
                for(let i = 0; (i < players.list.length); i++)
                {   cameras.push(new Camera(i))
                }
            break;
            case "equipaments":
                buttons = [
                    new SwitchButton(canvas.width*.025, canvas.height*.1, "", "", "PLAYER 1"),
                    new SwitchButton(canvas.width*.275, canvas.height*.1, "", "", "PLAYER 2"),
                    new SwitchButton(canvas.width*.525, canvas.height*.1, "", "", "PLAYER 3"),
                    new SwitchButton(canvas.width*.775, canvas.height*.1, "", "", "PLAYER 4"),
                    new SwitchRoomButton(canvas.width*.4, canvas.height*.83, "", "", "VOLTAR", "menu")
                ];
            break;
            case "configurations":
                buttons = [
                new SoundButton(canvas.width*.75, canvas.height*.5-canvas.height*.2, "", ""), 
                new SwitchRoomButton(canvas.width*.75, canvas.height*.5, "", "", "CONTROLES", "controls"),
                new SwitchRoomButton(canvas.width*.75, canvas.height*.5+canvas.height*.2, "", "", "VOLTAR", "menu")
                ];
            break;
            case "controls":
                buttons = [
                new SwitchControlButton(canvas.width*.4, canvas.height*.12, "", "", "W"),
                new SwitchControlButton(canvas.width*.4, canvas.height*.27, "", "", "S"), 
                new SwitchControlButton(canvas.width*.4, canvas.height*.42, "", "", "D"),
                new SwitchControlButton(canvas.width*.4, canvas.height*.57, "", "", "A"),
                new SwitchControlButton(canvas.width*.4, canvas.height*.72, "", "", "E"),
                new SwitchControlButton(canvas.width*.4, canvas.height*.87, "", "", "Q"),
            
                new SwitchControlButton(canvas.width*.55, canvas.height*.12, "", "", "W"),
                new SwitchControlButton(canvas.width*.55, canvas.height*.27, "", "", "S"), 
                new SwitchControlButton(canvas.width*.55, canvas.height*.42, "", "", "D"),
                new SwitchControlButton(canvas.width*.55, canvas.height*.57, "", "", "A"),
                new SwitchControlButton(canvas.width*.55, canvas.height*.72, "", "", "E"),  
                new SwitchControlButton(canvas.width*.55, canvas.height*.87, "", "", "Q"),

                new SwitchControlButton(canvas.width*.7, canvas.height*.12, "", "", "W"),
                new SwitchControlButton(canvas.width*.7, canvas.height*.27, "", "", "S"), 
                new SwitchControlButton(canvas.width*.7, canvas.height*.42, "", "", "D"),
                new SwitchControlButton(canvas.width*.7, canvas.height*.57, "", "", "A"),
                new SwitchControlButton(canvas.width*.7, canvas.height*.72, "", "", "E"),
                new SwitchControlButton(canvas.width*.7, canvas.height*.87, "", "", "Q"),

                new SwitchControlButton(canvas.width*.85, canvas.height*.12, "", "", "W"),
                new SwitchControlButton(canvas.width*.85, canvas.height*.27, "", "", "S"), 
                new SwitchControlButton(canvas.width*.85, canvas.height*.42, "", "", "D"),
                new SwitchControlButton(canvas.width*.85, canvas.height*.57, "", "", "A"),
                new SwitchControlButton(canvas.width*.85, canvas.height*.72, "", "", "E"),
                new SwitchControlButton(canvas.width*.85, canvas.height*.87, "", "", "Q"),

                new SwitchRoomButton(canvas.width*.05, canvas.height*.05, "", "","VOLTAR","configurations")
            ];
            for(let i = 0; (i < buttons.length-1); i++)
            {   let local = Math.trunc(i/6);
                switch(i%6)
                {   case 0:
                        buttons[i].text = String.fromCharCode(carsKeys[local].up);
                    break;
                    case 1:
                        buttons[i].text = String.fromCharCode(carsKeys[local].down);
                    break;
                    case 2:
                        buttons[i].text = String.fromCharCode(carsKeys[local].left);
                    break;
                    case 3:
                        buttons[i].text = String.fromCharCode(carsKeys[local].right);
                    break;
                    case 4:
                        buttons[i].text = String.fromCharCode(carsKeys[local].frontShoot);
                    break;
                    case 5:
                        buttons[i].text = String.fromCharCode(carsKeys[local].backShoot);
                    break;
                }

            }
            break;
            case "menu":
                buttons = [
                new SwitchRoomButton(innerWidth - innerWidth*.25, innerHeight/2-canvas.height*.3, "", "", "JOGAR", loop), 
                new PlayersButton(innerWidth - innerWidth*.25, innerHeight/2-canvas.height*.12, "", ""), 
                new SwitchRoomButton(innerWidth - innerWidth*.25, innerHeight/2+canvas.height*.06, "", "", "EQUIPAMENTOS", "equipaments"), 
                new SwitchRoomButton(innerWidth - innerWidth*.25, innerHeight/2+canvas.height*.25, "", "", "CONFIGURAÇÕES", "configurations")
                ];
            break;
        }
        MenuOptions = 0;
    }
}
class PlayersButton extends Button
{   constructor(x, y, width, height)
    {   super(x, y, width, height, "2 PLAYERS");
    }
    draw()
    {   super.draw();
        this.text = playersQuantity + " PLAYERS";
    }
    clicked(quantity)
    {   if(quantity != undefined)
        {   playersQuantity -= 2;
        }
        if(quantity == 1)
        {   playersQuantity = (playersQuantity+1)%3;
        }
        if(quantity == -1)
        {   playersQuantity = (playersQuantity+2)%3;
        }
        if(quantity != undefined)
        {   playersQuantity += 2;
        }
    }
}
class SoundButton extends Button
{   constructor(x, y, width, height)
    {   super(x, y, height, width, "SOM");
    }
    draw()
    {   super.draw();
        context.fillText(this.text, this.x+96, this.y+this.height/2);
        context.fillRect(this.x+canvas.width*.11, this.y+this.height/2-(canvas.height/41)/2, (canvas.width/12.8)*sound, canvas.height/41);
        context.beginPath();
        context.arc(this.x+canvas.width*.11+((canvas.width*.08)*sound), this.y+this.height/2, (canvas.height/41)*.6, 0, Math.PI*2);
        context.fill();
    }
    clicked(type)
    {   if(type == 0)
        {   //variavel de som vai ser sound até ter as variáveis certas
            sound = !Math.round(sound);
        }
        else
        {   if(type == -1)
            {   sound = (((sound*10)+10)%11)/10;
            }
            else
            {   if(type == 1)
                {   sound = (((sound*10)+1)%11)/10;
                }
            }
        }
    }
}
class SwitchControlButton extends Button
{   constructor(x, y, width, height, text)
    {   super(x, y, width, height, text);
        this.height = canvas.height*.1;
        this.width = canvas.width*.1;
    }
    clicked()
    {   switching = true;
       // console.log("clicou")
    }
}
class SetButton extends Button
{   constructor(x, y, width, height, id)
    {   super(x, y, width, height, "");
        this.id = id;
    }
    clicked()
    {   
    }
    draw()
    {   context.fillStyle = MenuOptions == this.id ? "rgba(0, 0, 0, .5)" : "rgba(0, 0, 0, 0)";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
class SwitchButton extends Button
{   constructor(x, y, width, height, text)
    {   super(x, y, width, height, text)
    }
    clicked()
    {   switching = !switching;
        if(switching)
        {   for(let i = 0; (i < buttons.length-1); i++)
            {   if(buttons[i].text == this.text)
                    CarOptions = i;
            }
            buttons.push(
                new SetButton(this.x, this.y+125, this.width, this.width+50, MenuOptions),
                new SwitchButton(this.x, this.y + this.width + 200, "", 60, "PRONTO")
            );
        }
        else
        {   buttons.splice(buttons.length-2);
        }
        console.log("entrou aq")
    }
    draw()
    {   super.draw()
        
    }
}