class Obs extends Entity {
  constructor(points) {
    super(points);
  }

  update() {
    for (let i = 0; i < players.list.length; i++) {
      let carro = players.list[i];
      if ( this.collision(carro.hitbox) ) {
        this.afetar(carro);
      }
    }
  }

}


class Poca extends Obs {
  constructor(x, y, raio = 40) {
    let pts = [
      new Point(x - raio, y - raio),
      new Point(x + raio, y - raio),
      new Point(x + raio, y + raio),
      new Point(x - raio, y + raio),
    ];
    super(pts);
    this.cx = x;
    this.cy = y;
    this.raio = raio;
    this.reducao = 0.03;  // quanto diminui da derrapagem
  }

  // colisão mais precisa por círculo
  collision(hitbox) {
    for (let i = 0; i < hitbox.length; i++) {
      const dx = hitbox[i].x - this.cx;
      const dy = hitbox[i].y - this.cy;
      if (Math.hypot(dx, dy) < this.raio) {
        return true;
      }
    }
    return false;
  }

  afetar(carro) {
    // diminui derrapagem (derrapa mais)
    carro.derrapagem = Math.max(0, carro.derrapagem - this.reducao);
  }

  draw(id) {
    if (!cameras[id].collide(this)) return;
    context.beginPath();
    context.arc(
      this.cx - cameras[id].x,
      this.cy - cameras[id].y,
      this.raio,
      0,
      2 * Math.PI
    );
    context.fillStyle = "rgba(173, 216, 230, 0.6)"; // azul claro semi‑transparente
    context.fill();
  }
}


// 2) Caixote: quadrado marrom claro que aplica giro forte
class Caixa extends Obs {
  constructor(x, y, tamanho = 50) {
    const h = tamanho / 2;
    const pts = [
      new Point(x - h, y - h),
      new Point(x + h, y - h),
      new Point(x + h, y + h),
      new Point(x - h, y + h),
    ];
    super(pts);
    this.giroForca = 20;  // graus de giro imediato
  }

  afetar(carro) {
    // gira o carro imediatamente
    carro.derra_coli = this.giroForca
  }

  draw(id) {
    if (!cameras[id].collide(this)) return;
    const p = this.points;
    context.beginPath();
    context.moveTo(p[0].x - cameras[id].x, p[0].y - cameras[id].y);
    for (let i = 1; i < p.length; i++) {
      context.lineTo(p[i].x - cameras[id].x, p[i].y - cameras[id].y);
    }
    context.closePath();
    context.fillStyle = "#D2B48C"; // marrom claro (tan)
    context.fill();
  }
}



// exemplo
//entities.push(new Poca(400, 300, 40));
//entities.push(new Caixa(600, 500, 50));