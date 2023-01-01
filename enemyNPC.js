var action = "Move";
	
$(document).ready(function(){
	$("#enemy").click(function(){
		console.log("Selected!");
		
	});
	
	const FPS = 200; //200
	var aniFrame = 0;
	let angle = 0;
	let enemyInst = document.getElementsByClassName("enemy-sprite");
	//console.log(enemyInst);
	let userInst = document.getElementById("user");
	
	let userData = document.querySelectorAll(".user-console");
		var user_detectBound = userInst.getBoundingClientRect();
		var userData_Dir = userData[0].value;
		var userData_x = userData[1].value;
		var userData_y = userData[2].value;
		
	function component(type, quad, pointer, width, height, x, y, xPos, yPos, collisionDect, hitDetect, destroyed, HIT_x, HIT_y, DEF_x, DEF_y, HP, MOV, AGI, SHLD, AGRO){
		this.type = type;
		this.quad = quad;
		this.pointer = pointer;
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.xPos = xPos;
		this.yPos = yPos;
		this.collisionDetect = collisionDect;
		this.hitDetect = hitDetect;
		this.destroyed = destroyed;
		this.HIT_x = HIT_x;
		this.HIT_y = HIT_y;
		this.DEF_x = DEF_x;
		this.DEF_y = DEF_y;
		this.HP = HP;
		this.MOV = MOV;
		this.AGI = AGI;
		this.SHLD = SHLD;
		this.AGRO = AGRO;
		
		this.AGRO_Reset = function(){
						this.HIT_x = 0;
						this.HIT_y = 0;
						this.AGRO = false;
						//#//console.log("AGRO? ", this.AGRO);
					};
					
		this.collisionDetect_Hit = function(inst, target){
			var detectBound_Left = parseInt(inst.x);
			var detectBound_Right = parseInt(inst.y + (inst.width));
			var detectBound_Top = parseInt(inst.y);
			var detectBound_Bottom = parseInt(inst.y + (inst.height));
			
			for(i=0; i < target.length; i++){
				const bound = target[i];
				
				var objectBound_vX = parseInt(target[i].HIT_x);
				var objectBound_vY = parseInt(target[i].HIT_y);
				

				if ((detectBound_Left > objectBound_vX) || (detectBound_Bottom < objectBound_vY) && (detectBound_Right < objectBound_vX) || (detectBound_Top > objectBound_vY)) {
					
					inst.hitDetect = false;
					//#//console.log(bound.quad);
					
				} else {
					inst.hitDetect = true;
					
					if(bound.ARGO !== false){
						let xPos = parseInt(bound.HIT_x);
						let yPos = parseInt(bound.HIT_y);
						
						
						
						var distance = Math.sqrt(((xPos - target[i].xPos)*(xPos - target[i].xPos)) + ((yPos - target[i].yPos)*(yPos - target[i].yPos)));

						var vX = bound.HIT_x - target[i].DEF_x;
						var vY = bound.HIT_y - target[i].DEF_y;

						var vx_Normal = vX / distance;
						var vy_Normal = vY / distance;
						
						let quad_vxNormal = Math.abs(vX);
						let quad_vyNormal = Math.abs(vY);
						
						let detectBound_xV = target[i].xPos;
						let detectBound_yV = target[i].yPos;
						
						
						if (inst.hitDetect) {
							def_Posture = document.getElementById("user-SHLD").value;
							//#//
							console.log("DEF?", def_Posture);
							if(def_Posture == "true"){
								//#//
								console.log(target[0]);
								//#//
								console.log(inst);
								//#//
								console.log(target[i].DEF_x, target[i].DEF_y);
								
								
								//#//
								console.log(target[i].DEF_x, target[i].DEF_y);
								if ((inst.DEF_x > objectBound_vX) || (inst.DEF_y < objectBound_vY) && (inst.DEF_x < objectBound_vX) || (inst.DEF_y > objectBound_vY)) {
									//#//
									console.log("BLOCK");
								} else {
									//#//
									console.log("SHLD?", target[i].SHLD);
									//#//
									console.log(inst.DEF_x, inst.DEF_y)
									inst.HP -= 0.5;
								}
							} else {
								if (inst.HP > 0) {
									//#//
									console.log("SHLD?", target[i].SHLD);
									inst.HP -= 1;
								} else {
									inst.HP -= 1;
								}
								
								//#//
								console.log("HIT! ", inst.HP);
								//#//
								console.log("Dead? ", inst.destroyed);
								if (inst.HP < 0) {
									inst.destroyed = true;
									//#//
									console.log("Dead? ", inst.destroyed);
									
									
								} else if (inst.destroyed != true){
									
									var direction = bound.quad;//document.getElementById(quad).value;
									//#//console.log(direction);
									
									if(parseInt(direction) === 1){
										target.x += 5;
										target.y -= 5;
									}
									if(parseInt(direction) === 2){
										target.x -= 5;
										target.y -= 5;
									}
									if(parseInt(direction) === 3){
										target.x -= 5;
										target.y += 5;
									}
									if(parseInt(direction) === 4){
										target.x += 5;
										target.y += 5;
									}
								}
							}
						}
					}
				}
			}
		};
		
		this.updatePosition = function(x_offset, y_offset){
			
			this.x += x_offset;
			this.y += y_offset;
			
			for(i=0; i < world_asset.length; i++){
				const collision = world_asset[i];
				var detectBound_xV = this.x;
				var detectBound_yV = this.y;
				
				//console.log(enemy);
				
				
				var objectBound_Left = parseInt(world_asset[i].x_offset);
				var objectBound_Right = parseInt(world_asset[i].x_offset) + parseInt(world_asset[i].bound_width);
				var objectBound_Top = parseInt(world_asset[i].y_offset);
				var objectBound_Bottom = parseInt(world_asset[i].y_offset) + parseInt(world_asset[i].bound_height);
				
				if ((detectBound_xV > objectBound_Right) || (detectBound_yV < objectBound_Top) || (detectBound_xV < objectBound_Left) || (detectBound_yV > objectBound_Bottom)) {
					//console.log(objectBound_Right, objectBound_Top, objectBound_Left, objectBound_Bottom);
					this.collisionDetect = false;
				} else {
					this.collisionDetect = true;
					let xPos = parseInt(world_asset[i].x_offset);
					let yPos = parseInt(world_asset[i].y_offset);
					
					var distance = Math.sqrt(((xPos - this.x)*(xPos - this.x)) + ((yPos - this.y)*(yPos - this.y)));
					
					var vX = xPos - this.x;
					var vY = yPos - this.y;
					
					var vx_Normal = vX / distance;
					var vy_Normal = vY / distance;
					
					let quad_vxNormal = Math.abs(vX);
					let quad_vyNormal = Math.abs(vY);
					
					// Adjust to conclude "Path-finding":
					if(((detectBound_xV > objectBound_Left) && (detectBound_xV < objectBound_Left + 1)) || ((detectBound_yV < objectBound_Bottom) && (detectBound_yV > objectBound_Bottom - 1))){
						if(quad_vxNormal > 0 && quad_vxNormal < 65){
							this.x -= vx_Normal;
							this.y += 3;
							
							if(quad_vyNormal > 0 && quad_vyNormal < 65){
								this.x -= 3;
								this.y += vy_Normal;
							}
						}
					} else if (((detectBound_xV < objectBound_Right && detectBound_xV > objectBound_Right - 1)) || ((detectBound_yV > objectBound_Top && detectBound_yV < objectBound_Top + 1))){
						if(quad_vxNormal > 0 && quad_vxNormal < 65){
							this.x += vx_Normal;
							this.y -= 3;
							
							if(quad_vyNormal > 0 && quad_vyNormal < 65){
								this.x += 3;
								this.y -= vy_Normal;
							}
						}
					}
				}
			}
			
			//Gameboard limit - update; COLLISION(?) .. current "emerge on opposite".
		
			if (this.x < 0) {
				this.x = 511;
			} else if (this.x > 511) {
				this.x = 0;
			}

			if (this.y < 0) {
				this.y = 511;
			} else if (this.y > 511) {
				this.y = 0;
			}
			
			console.log(this.pointer, this.collisionDetect);
		};
		
		this.updateAnimation = function(index, action){
			//var enemy = this;
			var ctrl = parseInt(this.quad);
			
			switch(ctrl){
				case 1:
					var enemyInst = document.getElementsByClassName("enemy-sprite");
					var sprite = enemyInst[index];
					sprite.setAttribute("xlink:href", "CHARACTER/GHOUL(I)_Male(" + action + ").gif");
					//#//console.log("!", enemy.AGRO);
					if(this.AGRO){
						this.HIT_x = parseInt(this.x + 45);
						this.HIT_y = parseInt(this.y + 25);
						//#//
						console.log(this.HIT_x, this.HIT_y);
						
					} else {
						//#//
						console.log("[...]?");
					}
					
					break;
					
				case 2:
					var enemyInst = document.getElementsByClassName("enemy-sprite");
					var sprite = enemyInst[index];
					sprite.setAttribute("xlink:href", "CHARACTER/GHOUL(II)_Male(" + action + ").gif");
					//#//console.log("!", enemy.AGRO);
					if(this.AGRO){
						this.HIT_x = parseInt(this.x + 20);
						this.HIT_y = parseInt(this.y + 25);
						//#//
						console.log(this.HIT_x, this.HIT_y);
						
					} else {
						//#//
						console.log("[...]?");
					}
					
					break;
					
				case 3:
					var enemyInst = document.getElementsByClassName("enemy-sprite");
					var sprite = enemyInst[index];
					sprite.setAttribute("xlink:href", "CHARACTER/GHOUL(III)_Male(" + action + ").gif");
					//#//console.log("!", enemy.AGRO);
					if(this.AGRO){
						this.HIT_x = parseInt(this.x + 16);
						this.HIT_y = parseInt(this.y + 48);
						//#//
						console.log(this.HIT_x, this.HIT_y);
						
					} else {
						//#//
						console.log("[...]?");
					}
					
					break;
					
				case 4:
					var enemyInst = document.getElementsByClassName("enemy-sprite");
					var sprite = enemyInst[index];
					sprite.setAttribute("xlink:href", "CHARACTER/GHOUL(IV)_Male(" + action + ").gif");
					//#//console.log("!", enemy.AGRO);
					if(this.AGRO){
						this.HIT_x = parseInt(this.x + 46);
						this.HIT_y = parseInt(this.y + 41);
						//#//
						console.log(this.HIT_x, this.HIT_y);
						
					} else {
						//#//
						console.log("[...]?");
					}
					
					break;
					
				/*default: 
					console.log("default");
					var enemyInst = document.getElementsByClassName("enemy-sprite");
					var sprite = enemyInst[index];
					sprite.setAttribute("xlink:href", "CHARACTER/GHOUL(II)_Male(ShldLow).gif");*/
			}		
		};
		
		this.init_Component = function(index){
			
			this.xPos = this.x + (this.width/2);
			this.yPos = this.y + (this.height/2);
			
			var sprite = enemyInst[index];
			npc_asset[index].pointer = index;
			//var idStr = (npc_asset[index].type).toString() + this.pointer;
			
			sprite.setAttribute("x", this.x);
			sprite.setAttribute("y", this.y);
		}
		
		this.refresh = function() {
			var enemy = this;
			var enemyInst = document.getElementsByClassName("enemy-sprite");
			var sprite = enemyInst[this.pointer];
			
			if (!this.destroyed) {
				let x = this.x - (this.width/2);
				let y = this.y - (this.height/2);
				let transform = `translate(${x}, ${y}) rotate(${angle} 32 32) `; //origin of instance

				sprite.setAttribute("transform", transform);
				this.xPos = x;
				this.yPos = y;
				
				
			} else {
				this.updateAnimation(this.pointer, "Dead");
				this.AGI = 0;
				this.AGRO = false;
				//npc_asset[this.pointer].type = "null";
				this.type = "null";
				if(this.destroyed){
					
					//Destroyed
				}
				
				clearInterval(this.dirFocus());
			}
			
		} 
			
		this.update_Action = function(MOV_x, MOV_y){
			let userData = document.querySelectorAll(".user-console");
		
			var user_detectBound = userInst.getBoundingClientRect();
			var userData_Dir = userData[0].value;
			var userData_x = userData[1].value;
			var userData_y = userData[2].value;
			
			var distance = Math.sqrt(((this.x - userData_x)*(this.x - userData_x)) + ((this.y - userData_y)*(this.y - userData_y)));
			if (distance < 18) {
				var RaN = Math.floor(Math.random() * 2);
				switch(RaN){
					case 0:
						
						if (this.quad == 1 || this.quad == 2){
							action = "ShldHigh";
							//#//
							console.log(action);
							this.updateAnimation(this.pointer, "ShldHigh");
							//#//this.AGRO_Reset();
						} else {
							action = "ShldLow";
							//#//console.log(action);
							this.updateAnimation(this.pointer, "ShldLow");
							//#//this.AGRO_Reset();
						}
						
						break;
					case 1:
						this.AGRO = true;
						action = "AtkHigh";
						//#//
						console.log(action);
						this.updateAnimation(this.pointer, "AtkHigh");
						//this.collisionDetect_Hit(character_asset[0], npc_asset[this.pointer]);
						this.collisionDetect_Hit(character_asset[0], npc_asset);
						
						
						
						if(character_asset[0].HP < 0){
							user.destroyed = true;
							userInst.setAttribute("xlink:href", "CHARACTER/HMN(IV)_Female(Dead).gif"); 
							//bug-fix -into- "GAME OVER!"
						}
						setTimeout(this.AGRO_Reset, FPS);
						break;
				}
			} else if (distance >= 18) {
				
				action = "Move";
				this.updateAnimation(this.pointer, "Move");
				//#//console.log(action);
				this.updatePosition(MOV_x, MOV_y);
				//console.log(npc_asset[0]);
				
			}
			
			this.refresh();
		};
			
		this.dirFocus = function(){
			
			let userData = document.querySelectorAll(".user-console");
		
			var user_detectBound = userInst.getBoundingClientRect();
			var userData_Dir = userData[0].value;
			var userData_x = userData[1].value;
			var userData_y = userData[2].value;
			if(this.type == "default"){
				if(userData_x > this.x && userData_y < this.y){ // -- Quad.I
					this.quad = 1;
					this.update_Action(this.MOV * this.AGI, -this.MOV * this.AGI);
				}
				
				if(userData_x < this.x && userData_y < this.y){ // -- Quad.II
					this.quad = 2;
					this.update_Action(-this.MOV * this.AGI, -this.MOV * this.AGI);
				}
				
				if(userData_x < this.x && userData_y > this.y){ // -- Quad.III
					this.quad = 3;
					this.update_Action(-this.MOV * this.AGI, this.MOV * this.AGI);
				}
				
				if(userData_x > this.x && userData_y > this.y){ // -- Quad.IV
					this.quad = 4;
					this.update_Action(this.MOV * this.AGI, this.MOV * this.AGI);
				}
			} else {
				//destroyed
			}
			
			//setInterval(this.dirFocus(), FPS * 6);
		};
	}
	
	for(iter=0; iter < enemyInst.length; iter++){ //type, quad, pointer, width, height, x, y, xPos, yPos, collisionDect, hitDetect, destroyed, HIT_x, HIT_y, DEF_x, DEF_y, HP, MOV, AGI, SHLD, AGRO
		var enemy_Std = new component("default", null, null, 64, 64, 0, 0, null, null, false, false, false, 0, 0, 0, 0, 3, 0.8, 5, false, false);
		npc_asset[iter] = enemy_Std;
		
	}
		
		npc_asset[0].init_Component(0);
		npc_asset[1].init_Component(1);
		npc_asset[2].init_Component(2);
		npc_asset[3].init_Component(3);
		npc_asset[4].init_Component(4);
		npc_asset[5].init_Component(5);
		npc_asset[6].init_Component(6);
		npc_asset[7].init_Component(7);
		npc_asset[8].init_Component(8);
		npc_asset[9].init_Component(9);
		npc_asset[10].init_Component(10);
		npc_asset[11].init_Component(11);
		npc_asset[12].init_Component(12);
		npc_asset[13].init_Component(13);
		npc_asset[14].init_Component(14);
		npc_asset[15].init_Component(15);
		npc_asset[16].init_Component(16);
		npc_asset[17].init_Component(17);
		
	
	function initialize(index){
		
		for(iter=0; iter < npc_asset.length; iter++){
			if(npc_asset[iter].type !== "null"){
				npc_asset[iter].dirFocus();
				console.log(npc_asset[iter]);
			} else {
				console.log(iter, ": dead");
			}
		}
	} setInterval(initialize, FPS * 6);
	//initialize();
	
	
});

