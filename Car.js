class Car extends Entity {
    constructor(points, img, index) {
        super(points, img);
        this.index = index;
        this.lap = 0;
        this.points[4] = {
        x: (this.points[0].x + this.points[1].x + this.points[2].x + this.points[3].x) / 4,
        y: (this.points[0].y + this.points[1].y + this.points[2].y + this.points[3].y) / 4
        };
        this.angle = 0;
		this.velocidade = 0;
		this.aceleracao = 0.7;
		this.max_v = 3;
		this.derrapagem = 0.14;
		this.direcao = 0;
		this.direcao_alvo = 0;
		this.hitbox = JSON.parse(JSON.stringify(this.points));
		this.back_up_angle = this.angle;
		this.remanc = 0;

		this.velocidadeGiro = 0;
		this.aceleracaoGiro = 0.04;
		this.maxVelocidadeGiro = 2;
		this.atritoGiro = 0.94;

		this.derra_coli = 0;
		this.derra_mudanca_dir = 0.5;

		this.anguloDerrapagemAlvo = 0;
		this.anguloDerrapagemAtual = 0;
		this.suavizador_derra = 0.15;

		this.mark = {};
        this.mark.lines = [[JSON.parse(JSON.stringify(this.points))]];
        this.mark.intens = [1];
		this.mark_time = 0;
    };

    update() {

        this.updateWeapon();
        this.mov_control();
		this.mov_aplic();
		this.aplicarGiro();
		this.translate();

        this.hitbox[4] = {
        x: (this.hitbox[0].x + this.hitbox[1].x + this.hitbox[2].x + this.hitbox[3].x) / 4,
        y: (this.hitbox[0].y + this.hitbox[1].y + this.hitbox[2].y + this.hitbox[3].y) / 4
        };

        
        for (let i = 0; i < this.weapons.length; i++) {
            this.weapons[i].update();
            if (this.weapons[i].life <= 0) {
                this.weapons.splice(i, 1)
                i--;
            }
        }

        
    };


	mov_control() {
		if(keys[carsKeys[this.index].up]) {
			this.velocidade += this.aceleracao - this.velocidade / 80;
			this.remanc = 0;
		} else if(keys[carsKeys[this.index].down]) {
			this.velocidade -= this.aceleracao / 1.1 + this.velocidade / 100;
			this.remanc = 1;
		}

		if(keys[carsKeys[this.index].left]) {
			this.velocidadeGiro -= this.aceleracaoGiro;
		} else if(keys[carsKeys[this.index].right]) {
			this.velocidadeGiro += this.aceleracaoGiro;
		} else {
			this.velocidadeGiro *= this.atritoGiro;
		}
	}


	mov_aplic() {
		if(this.derrapagem <= 0.132) {
			this.derrapagem += 0.008;
		}

		this.aceleracao =
			0.15 +
			Math.abs(this.velocidade) * 0.027 -
			parseInt((0.02 + Math.abs(this.velocidade) * 0.015) / this.max_v) *
			this.max_v;

		let derra_ajst = (this.derrapagem + Math.abs(this.derrapagem)) / 2;

        this.direcao_alvo = this.angle * (Math.PI / 180);

		let maximo =
			((this.direcao_alvo - this.direcao + Math.PI * 3) % (2 * Math.PI)) -
			Math.PI;

		let excesso =
			(Math.abs(maximo) -
				Math.PI / 2 +
				Math.abs(Math.abs(maximo) - Math.PI / 2)) /
			Math.PI;

		// transfiro uma parte da velocidade para giro
		let transfer_fat = 0.03;
		let rotacaoExtra =
			Math.sign(maximo) * this.velocidade * excesso * transfer_fat;

		this.velocidade -= Math.abs(rotacaoExtra);

		this.velocidadeGiro += rotacaoExtra;

		this.direcao += maximo * (derra_ajst - Math.abs(this.velocidade) / 240);

		this.lat_dot_1 = {
			x: (this.hitbox[1].x + this.hitbox[2].x) / 2,
			y: (this.hitbox[1].y + this.hitbox[2].y) / 2,
		};
		this.dot_forc = {
			x: this.hitbox[4].x + Math.cos(this.direcao) * 15 * this.velocidade,
			y: this.hitbox[4].y + Math.sin(this.direcao) * 15 * this.velocidade,
		};

		let ang_mov_1 = this.ang_vet(this.lat_dot_1, this.hitbox[4], this.dot_forc);
		let ang_mov_2 = 90 + (90 - ang_mov_1);

		// Efeito do carro perder TraÇão em mudanÇa brusca de direcao
		if(
			(this.remanc == 0 && this.velocidade < 0) ||
			(this.remanc == 1 && this.velocidade > 0)
		) {
			if(ang_mov_1 > ang_mov_2) {
				let ind = (0.01 * (65 - ang_mov_2) * Math.abs(this.velocidade)) / 10;
				// Define derrapagem alvo
				this.anguloDerrapagemAlvo = -this.derra_mudanca_dir * ind * this.velocidade;
			} else {
				let ind = (0.01 * (65 - ang_mov_1) * Math.abs(this.velocidade)) / 10;
				// Define o ALVO da derrapagem
				this.anguloDerrapagemAlvo =
					this.derra_mudanca_dir * ind * this.velocidade;
			}
		} else {
			this.anguloDerrapagemAlvo = 0;
		}

		this.anguloDerrapagemAtual +=
			(this.anguloDerrapagemAlvo +
				this.derra_coli -
				this.anguloDerrapagemAtual) *
			this.suavizador_derra;

		this.derra_coli *= 0.95;

		this.velocidade *= this.atrito;

		if(this.power_vel)
		{
		  this.dur_pv--
		  	console.log(this.dur_pv)
		  if(this.dur_pv == 0)
		  {
			this.power_vel = false 
			this.atrito -= 0.008

		  }
		}
		
		this.floor_mark()

	}

	aplicarGiro() {
		this.velocidadeGiro = Math.max(
			-this.maxVelocidadeGiro,
			Math.min(this.maxVelocidadeGiro, this.velocidadeGiro)
		);

		let angulo_rot =
			(this.velocidadeGiro * this.velocidade) / this.max_v +
			this.anguloDerrapagemAtual;
		if(Math.abs(angulo_rot) > 0.001) {
			this.angle += angulo_rot;
			this.rotate(angulo_rot);
		}
	}

	rotate(ang) {
        for (let i = 0; i < this.weapons.length; i++) {
        this.weapons[i].rotate(ang);

        }

		let rad = ang * (Math.PI / 180);
		let cos = Math.cos(rad);
		let sin = Math.sin(rad);
		for(let i = 0; i < this.hitbox.length; i++) {
			let p_rot_x = this.hitbox[i].x - this.hitbox[4].x;
			let p_rot_y = this.hitbox[i].y - this.hitbox[4].y;
			let rot_x = p_rot_x * cos - p_rot_y * sin;
			let rot_y = p_rot_x * sin + p_rot_y * cos;
			this.hitbox[i].x = rot_x + this.hitbox[4].x;
			this.hitbox[i].y =   rot_y + this.hitbox[4].y;
		}
	}

	translate() {
		for(let i = 0; i < this.hitbox.length; i++) {
			this.hitbox[i].x += Math.cos(this.direcao) * this.velocidade;
			this.hitbox[i].y += Math.sin(this.direcao) * this.velocidade;
            
		}
        let dx =  Math.cos(this.direcao) * this.velocidade;
        let dy = Math.sin(this.direcao) * this.velocidade;
         for (let i = 0; i < this.weapons.length; i++) {
            this.weapons[i].translate(dx, dy);
        };
	}

	floor_mark() {

	this.mark.lines = this.mark.lines.slice(0, length - 1).concat([this.mark.lines[this.mark.lines.length - 1].concat([JSON.parse(JSON.stringify(this.points))])]);
	this.mark.lines.push([JSON.parse(JSON.stringify(this.points))]);
   	this.mark.intens.push(Math.min(1,(Math.abs(this.direcao_alvo - this.direcao))));


   	for(let i = 0; i < this.mark.intens.length; i++) {
   		this.mark.intens[i] -= 0.02

   		if(this.mark.intens[i] <= 0) {
   			this.mark.lines.splice(i, 1)
   			this.mark.intens.splice(i, 1)

   		}
   	}
   }


	ang_vet(pa, pb, pc) {
		let bax = pa.x - pb.x;
		let bay = pa.y - pb.y;
		let bcx = pc.x - pb.x;
		let bcy = pc.y - pb.y;
		let ponto = bax * bcx + bay * bcy;
		let mag_a = Math.hypot(bax, bay);
		let mag_b = Math.hypot(bcx, bcy);
		return (Math.acos(ponto / (mag_a * mag_b)) * 180) / Math.PI;
	}

	coli_aux(x1, y1, x2, y2, x3, y3, x4, y4) {
		let uA =
			((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
			((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
		let uB =
			((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
			((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
		return uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1;
	}

	coli_aplic(data) {
		this.hitbox = JSON.parse(JSON.stringify(this.points));
		this.angle = this.back_up_angle;
             for(let j = 0; j < this.weapons.length; j++)
             {  
                if(this.weapons[j].points.join("")==this.weapons[j].save.join("")){console.log("Erro")}
                else{console.log(1)}
                this.weapons[j].points = [...this.weapons[j].save];

             }
		let detectores = [{
				inc: 1,
				fim: 2,
				quant: 9
         },
			{
				inc: 3,
				fim: 0,
				quant: 9
         },
			{
				inc: 2,
				fim: 3,
				quant: 4
         },
			{
				inc: 0,
				fim: 1,
				quant: 4
         },
      ];

		let seg_reta = data[4];
		let pontos_coli = [];

		for(let d = 0; d < detectores.length; d++) {
			let det = detectores[d];
			let pontoA = this.points[det.inc];
			let pontoB = this.points[det.fim];

			for(let i = 1; i <= det.quant; i++) {
				let t = i / (det.quant + 1);
				let x1 = pontoA.x + (pontoB.x - pontoA.x) * t;
				let y1 = pontoA.y + (pontoB.y - pontoA.y) * t;

				let dx = pontoB.y - pontoA.y;
				let dy = -(pontoB.x - pontoA.x);
				let comprimento = Math.hypot(dx, dy);
				dx = (dx / comprimento) * 3 ;
				dy = (dy / comprimento) * 3;

				let x2 = x1 + dx;
				let y2 = y1 + dy;

				let colidiu = this.coli_aux(
					x1,
					y1,
					x2,
					y2,
					seg_reta[0].x,
					seg_reta[0].y,
					seg_reta[1].x,
					seg_reta[1].y
				);

				if(colidiu) {
					pontos_coli.push({
						x: (x1 + x2) / 2,
						y: (y1 + y2) / 2
					});
				}
			}
		}

		let ajuste = [135, 225, 315, 45];
		for(let v = 0; v < 4; v++) {
			let vertice = this.points[v];
			let anguloGlobal = this.angle + ajuste[v];
			let rad = anguloGlobal * (Math.PI / 180);

			let x1 = vertice.x;
			let y1 = vertice.y;
			let x2 = x1 + Math.cos(rad) * 5;
			let y2 = y1 + Math.sin(rad) * 5;

			let colidiu = this.coli_aux(
				x1,
				y1,
				x2,
				y2,
				seg_reta[0].x,
				seg_reta[0].y,
				seg_reta[1].x,
				seg_reta[1].y
			);

			if(colidiu) {
				pontos_coli.push({
					x: (x1 + x2) / 2,
					y: (y1 + y2) / 2
				});
			}
		}

		if(pontos_coli.length) {
			let somaX = 0,
				somaY = 0;
			for(let j = 0; j < pontos_coli.length; j++) {
				somaX += pontos_coli[j].x;
				somaY += pontos_coli[j].y;
			}
			let mediaX = somaX / pontos_coli.length;
			let mediaY = somaY / pontos_coli.length;
			data[1] = {
				x: mediaX,
				y: mediaY
			};
		}

		// Drift e reflexão inline
		let ang_1 = this.ang_vet(data[1], this.points[4], {
			x: (this.points[0].x + this.points[1].x) / 2,
			y: (this.points[0].y + this.points[1].y) / 2,
		});
		let ang_2 = 180 - ang_1;
		let ponto_medio_2 = {
			x: (this.points[2].x + this.points[1].x + this.points[4].x) / 3,
			y: (this.points[2].y + this.points[1].y + this.points[4].y) / 3,
		};
		let ponto_medio_1 = {
			x: (this.points[0].x + this.points[3].x + this.points[4].x) / 3,
			y: (this.points[0].y + this.points[3].y + this.points[4].y) / 3,
		};
		let dist_1 = Math.hypot(
			ponto_medio_1.x - data[1].x,
			ponto_medio_1.y - data[1].y
		);
		let dist_2 = Math.hypot(
			ponto_medio_2.x - data[1].x,
			ponto_medio_2.y - data[1].y
		);
        let forc_giro = 0
        if(data[6]){ forc_giro = Math.abs(this.velocidade)+1};
		if(
			(ang_1 < ang_2 && dist_1 > dist_2) ||
			(ang_1 > ang_2 && dist_1 < dist_2)
		) {
			    this.derra_coli =
				(forc_giro - (Math.abs(ang_2 - 45) * -forc_giro) / 45) *
				(Math.abs(this.velocidade) / 14);
		} else if (
            (ang_1 < ang_2 && dist_1 < dist_2) ||
            (ang_1 > ang_2 && dist_1 > dist_2)
            ) {
			this.derra_coli =
				(forc_giro - (Math.abs(ang_1 - 45) * -forc_giro) / 45) *
				-1 *
				(Math.abs(this.velocidade) / 14);
		}
		if(Math.abs(this.velocidade) < 1) {
			this.derra_coli = 0;
		}

        if(ang_1 < ang_2 && dist_1 > dist_2){console.log("caso_1")}
        if(ang_1 > ang_2 && dist_1 < dist_2){console.log("caso_2")}
        if(ang_1 < ang_2 && dist_1 < dist_2){console.log("caso_3")}
        if(ang_1 > ang_2 && dist_1 > dist_2){console.log("caso_4")}

		let semi_dist = [
         data[1].x - this.points[4].x,
         data[1].y - this.points[4].y,
      ];
		let dot_1 = {
			x: this.points[4].x - semi_dist[0],
			y: this.points[4].y - semi_dist[1],
		};
		let magnitude = Math.hypot(data[1].x - dot_1.x, data[1].y - dot_1.y);
		let dot_2 = {
			x: this.points[4].x + (magnitude / 2) * Math.cos(this.direcao),
			y: this.points[4].y + (magnitude / 2) * Math.sin(this.direcao),
		};


		let reflec_angle = this.ang_vet(dot_1, this.points[4], dot_2) * (Math.PI / 180);
		let v1_x = dot_2.x - this.points.x;
		let v1_y = dot_2.y - this.points.y;
		let v2_x = dot_1.x - this.points.x;
		let v2_y = dot_1.y - this.points.y;
		let prod_vet = v1_x * v2_y - v1_y * v2_x;
		let potencia =0.5 +((Math.abs(reflec_angle - Math.PI * 0.85) +(reflec_angle - Math.PI * 0.85)) /2) *1.061;
        if(data[6]){Math.max(0.2,potencia-data[7])}
		let sentido = prod_vet > 0 ? -1 : 1;
		this.direcao = this.direcao + reflec_angle * sentido * potencia;
		this.derrapagem = 0.12 - this.velocidade / 100;
		this.velocidade *= 1 - reflec_angle * 0.127;
	}


    updateWeapon() {
        if (keys[carsKeys[this.index].frontShoot] && this.weapons[0]?.canFire()) {
            this.weapons[0].fire();
        };
        if (keys[carsKeys[this.index].backShoot] && this.weapons[1]?.canActivate()) {
            this.weapons[1].active = true; // pra pegar no update de cada um separado
        };
    };


    draw(id) {
	let actual_marks = this.mark.lines.slice(0, length - 1).concat([this.mark.lines[this.mark.lines.length - 1].concat([this.points])])
   	context.lineWidth = 11
   	for(let i = 0; i < actual_marks.length; i++) {
   		for(let j = 0; j < 4; j++) {
   			if(j == 0 || j == 3) {
   				context.strokeStyle = `rgba(40,40,40,${this.mark.intens[i]})`
   				context.beginPath()
   				context.moveTo(actual_marks[i][0][j].x - cameras[id].x, actual_marks[i][0][j].y - cameras[id].y)
   				context.lineTo(actual_marks[i][1][j].x - cameras[id].x, actual_marks[i][1][j].y - cameras[id].y)
   				context.stroke()
   			}

   		}

   	}


	super.draw(id);
    if(debug){super.draw_debug(id);}
	        for (let i = 0; i < this.weapons.length; i++) {
            this.weapons[i].draw(id);
        }

			if(this.escudoTempo)
		{
		context.beginPath();
		context.arc(
		this.points[4].x - cameras[id].x,
		this.points[4].y - cameras[id].y,
		50, 0, 2*Math.PI
		);
		context.fillStyle = "rgba(68, 0, 255,0.35)";
		context.fill();

		this.escudoTempo--
	}
		}
    };

