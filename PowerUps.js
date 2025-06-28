class PowerUp extends Entity {
    constructor(x, y, tamanho, cor) {
        // cria um retângulo centrado em (x,y)
        let [w, h] = [tamanho, tamanho];
        let points = [
        new Point(x - w/2, y - h/2),
        new Point(x + w/2, y - h/2),
        new Point(x + w/2, y + h/2),
        new Point(x - w/2, y + h/2),
        ];
        super(points);
        this.cor = cor;
    }

    update() {
    for (let i = 0; i < players.list.length; i++) {
        let jogador = players.list[i];
        if (this.collision(jogador.points)) {
        this.aplicarEm(jogador);
        entities.splice(entities.indexOf(this), 1);
        break;
        }
    }
    }

    draw(id) {
        if (!cameras[id].collide(this)) return;
        const p = this.points;
        context.beginPath();
        context.moveTo(p[0].x - cameras[id].x, p[0].y - cameras[id].y);
        for (let i = 1; i < p.length; i++)
        context.lineTo(p[i].x - cameras[id].x, p[i].y - cameras[id].y);
        context.closePath();
        context.fillStyle = this.cor;
        context.fill();
    }
  /*
    aplicarEm(player) {
        
    }
*/
    }


  class PowerUpVida extends PowerUp {
  constructor(x, y) {
    super(x, y, 30, "red");
    this.cura = 50;
  }

  aplicarEm(jogador) {
    jogador.life += this.cura;
    jogador.life = Math.min(jogador.life, jogador.lifeLimit);
  }
}


    class PowerUpTurbo extends PowerUp {
  constructor(x, y) {
    super(x, y, 30, "yellow");
    this.pot = 0.008;
    this.duracao = 160;
  }

  aplicarEm(jogador) {
    jogador.atrito += this.pot;
    jogador.power_vel = true;
    jogador.dur_pv = this.duracao;
  }
}

class PowerUpEscudo extends PowerUp {
  constructor(x, y) {
    super(x, y, 30, "rgba(68, 0, 255, 0.7)");
    this.duracao = 300;
  }

  aplicarEm(jogador) {
    jogador.escudoTempo = this.duracao;
  }
}

/*

entities.push(new PowerUpTurbo(250, 250));

entities.push(new PowerUpVida(400, 400));

entities.push(new PowerUpEscudo(550, 550));

entities.push(new Poca(800, 300, 40));

entities.push(new Caixa(800, 500, 50));

*/