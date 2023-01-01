//#//De-Bugging - [remove] comments to print values to console
$(document).ready(function(){
	$("#user").click(function(){
		console.log("Selected!");
		
	});
	
	console.log(npc_asset);
	const FPS = 200;
	let angle = 0;
	let userInst = document.getElementById("user");
	let data_xPos = document.getElementById("user-xPos");
	let data_yPos = document.getElementById("user-yPos");
	
	//var mesh = document.getElementById("mesh");
	//var ctx = mesh.getContext("2d");
	
	let user = {
		type: "player",
		quad: document.getElementById("user-Quadrant").value,
		width: 64,
		height: 64,
		x: null,
		y: null,
		xPos: null,
		yPos: null,
		collisionDetect: false,
		hitDetect: false,
		destroyed: false,
		
		HIT_x: 0,
		HIT_y: 0,
		
		DEF_x: 0,
		DEF_y: 0,
		//Stats & Attr.
		HP: 3,
		MOV: 0.3,
		AGI: 5,
		EVA: ["8", "16", "18", "21", "30"], //subtract bounding x.width/y.height while blocking - !NOT IMPLEMENTED
		SHLD: "inst",
		SHLD_Reset: function(){
						this.DEF_x = 0;
						this.DEF_y = 0;
						user.SHLD = false;
					},
		AGRO: false,
		AGRO_Reset: function(){
						user.HIT_x = 0;
						user.HIT_y = 0;
						user.AGRO = false;
					},
		collisionDetect_Hit: function(inst, target){
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
							//#//console.log("DEF?", def_Posture);
							if(def_Posture == "true"){
								//#//console.log(target[0]);
								//#//console.log(inst);
								//#//console.log(inst[i].DEF_x, inst[i].DEF_y);
								
								
								//#//console.log(target[i].DEF_x, target[i].DEF_y);
								if ((inst.DEF_x > objectBound_vX) || (inst.DEF_y < objectBound_vY) && (inst.DEF_x < objectBound_vX) || (inst.DEF_y > objectBound_vY)) {
									//#//console.log("BLOCK");
								} else {
									//#//console.log("SHLD?", target[i].SHLD);
									//#//console.log(inst.DEF_x, inst.DEF_y)
									inst.HP -= 0.5;
								}
							} else {
								if (inst.length > 0) {
									//#//console.log("SHLD?", inst[i].SHLD);
									inst.HP -= 1;
								} else {
									inst.HP -= 1;
								}
								
								//#//console.log("HIT! ", inst.HP);
								//#//console.log("Dead? ", inst.destroyed);
								if (inst.HP < 0) {
									inst.destroyed = true;
									//#//console.log("Dead? ", inst.destroyed);
									
									
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
		},
	}
	
	character_asset[0] = user;
	
	function updateAnimation(action){
		var inst_Dir = document.getElementById("user-Quadrant");
		var ctrl = parseInt(inst_Dir.value);
		switch(ctrl){
			case 1:
				userInst.setAttribute("xlink:href", "CHARACTER/HMN(I)_Female(" + action +  ").gif");
				break;
			case 2:
				userInst.setAttribute("xlink:href", "CHARACTER/HMN(II)_Female(" + action +  ").gif");
				break;
			case 3:
				userInst.setAttribute("xlink:href", "CHARACTER/HMN(III)_Female(" + action +  ").gif");
				break;
			case 4:
				userInst.setAttribute("xlink:href", "CHARACTER/HMN(IV)_Female(" + action +  ").gif");
				break;
		}
	}
	
	function collisionDetect_Obj(asset){
		for(i=0; i < asset.length; i++){
			const bound = asset[i];
			if(bound.type == "default"){
				let xPos = parseInt(bound.x);
				let yPos = parseInt(bound.y);

				var index = document.getElementById("collision-index");
				if (user.y > bound.y){
					index.setAttribute("xlink:href", "#user");
				} else if (user.y < bound.y){
					index.setAttribute("xlink:href", "#enemy");
				}
			}
		}
	};

	function updatePosition(x_offset, y_offset) {
		/* Cavalry - !NOT IMPLEMENTED
		let rad = angle * (Math.PI/180);
		user.x += (Math.sin(rad) * offset);
		user.y -= (Math.cos(rad) * offset);
		*/
		
		user.x += x_offset;
		user.y += y_offset;
		
		data_xPos.setAttribute("value", user.x);
		data_yPos.setAttribute("value", user.y);
		
		for(i=0; i < world_asset.length; i++){
			const collision = world_asset[i];
			
			var detectBound_xV = user.x;
			var detectBound_yV = user.y;
			
			var objectBound_Left = parseInt(world_asset[i].x_offset);
			var objectBound_Right = parseInt(world_asset[i].x_offset) + parseInt(world_asset[i].bound_width);
			var objectBound_Top = parseInt(world_asset[i].y_offset);
			var objectBound_Bottom = parseInt(world_asset[i].y_offset) + parseInt(world_asset[i].bound_height);
			
			if ((detectBound_xV > objectBound_Right) || (detectBound_yV < objectBound_Top) || (detectBound_xV < objectBound_Left) || (detectBound_yV > objectBound_Bottom)) {
				
				user.collisionDetect = false;
				
			} else {
				user.collisionDetect = true;
				let xPos = parseInt(collision.x_offset);
				let yPos = parseInt(collision.y_offset);
				
				var distance = Math.sqrt(((xPos - user.x)*(xPos - user.x)) + ((yPos - user.y)*(yPos - user.y)));
				
				
				
				var vX = xPos - user.x;
				var vY = yPos - user.y;
				
				var vx_Normal = vX / distance;
				var vy_Normal = vY / distance;
				
				let quad_vxNormal = Math.abs(vX);
				let quad_vyNormal = Math.abs(vY);
				
				// Adjust to conclude "Path-finding":
				if(((detectBound_xV > objectBound_Left) && (detectBound_xV < objectBound_Left + 1)) || ((detectBound_yV < objectBound_Bottom) && (detectBound_yV > objectBound_Bottom - 1))){
					if(quad_vxNormal > 0 && quad_vxNormal < 65){
						user.x -= vx_Normal;
						user.y += 3;
						
						if(quad_vyNormal > 0 && quad_vyNormal < 65){
							user.x -= 3;
							user.y += vy_Normal;
						}
					}
				} else if (((detectBound_xV < objectBound_Right && detectBound_xV > objectBound_Right - 1)) || ((detectBound_yV > objectBound_Top && detectBound_yV < objectBound_Top + 1))){
					if(quad_vxNormal > 0 && quad_vxNormal < 65){
						user.x += vx_Normal;
						user.y -= 3;
						if(quad_vyNormal > 0 && quad_vyNormal < 65){
							user.x += 3;
							user.y -= vy_Normal;
						}
					}
				}
			}
		}

		if (user.x < 0) {
			user.x = 511;
		} else if (user.x > 511) {
			user.x = 0;
		}

		if (user.y < 0) {
			user.y = 511;
		} else if (user.y > 511) {
			user.y = 0;
		}
	}
	
	function refresh() {
		if (!user.destroyed) {
			let x = user.x - (user.width/2);
			let y = user.y - (user.height/2);
			let transform = `translate(${x}, ${y}) rotate(${angle} 32 32) `; //origin of instance

			userInst.setAttribute("transform", transform);
			user.xPos = x;
			user.yPos = y;
			
			user.AGRO_Reset();
			user.SHLD_Reset();
			collisionDetect_Obj(npc_asset);
			
		} else if (user.HP < 0) {
			user.destroyed == true;
			updateAnimation("Dead");
		}
	} refresh();
	
	window.addEventListener("keydown", (event) => {
		if (event.defaultPrevented) {
			return;
		}
	
	
		if(!user.destroyed){
			
			var inst_Dir = document.getElementById("user-Quadrant");
			var ctrl = parseInt(inst_Dir.value);
			
			if(event.shiftKey){
				
				user.SHLD = true;
					updateAnimation("Idle");
					user.MOV = user.MOV * 0.5;
					
				switch(event.code) {
					
					/* change-direction */
					
					case "ArrowUp":
						if(user.SHLD){
							userInst.setAttribute("xlink:href", "CHARACTER/HMN(I)_Female(ShldHigh).gif");
							inst_Dir.setAttribute("value", 1);
							user.MOV = user.MOV * 0.1;
						} break;
					case "ArrowLeft":
						if(user.SHLD){
							userInst.setAttribute("xlink:href", "CHARACTER/HMN(II)_Female(ShldHigh).gif");
							inst_Dir.setAttribute("value", 2);
							user.MOV = user.MOV * 0.1;
							user.DEF_x = 22;
							user.DEF_y = 24;
							
							//#//console.log("SHLD? ", user.SHLD, user.DEF_x, user.DEF_y);
							
						} break;
					case "ArrowDown":
						if(user.SHLD){
							userInst.setAttribute("xlink:href", "CHARACTER/HMN(III)_Female(ShldLow).gif");
							inst_Dir.setAttribute("value", 3);
							user.MOV = user.MOV * 0.1;
						} break;
					case "ArrowRight":
						if(user.SHLD){
							userInst.setAttribute("xlink:href", "CHARACTER/HMN(IV)_Female(ShldLow).gif");
							inst_Dir.setAttribute("value", 4);
							user.MOV = user.MOV * 0.1;
							user.DEF_x = 29;
							user.DEF_y = 40;
							//#//console.log("SHLD? ", user.SHLD, user.DEF_x, user.DEF_y);
				
							
						} break;
					
					/* move-strafe */
					case "KeyW":
						updatePosition(0, -user.MOV);
						break;
					case "KeyA":
						updatePosition(-user.MOV, 0);
						break;
					case "KeyS":
						updatePosition(0, user.MOV);
						break;
					case "KeyD":
						updatePosition(user.MOV, 0);
						break;	
				};
				
				user.SHLD = true;
				document.getElementById("user-SHLD").value = user.SHLD;
				 
			} else if (!event.shiftKey) {
				
				switch(event.code) {
					
					
					/* change-direction */
					case "ArrowUp":
						user.SHLD = false;
						if(!user.SHLD){
							userInst.setAttribute("xlink:href", "CHARACTER/HMN(I)_Female(Move).gif");
							inst_Dir.setAttribute("value", 1);
							user.MOV = 0.3;
							
						} break;
					case "ArrowLeft":
						user.SHLD = false;
						if(!user.SHLD){
							userInst.setAttribute("xlink:href", "CHARACTER/HMN(II)_Female(Move).gif");
							inst_Dir.setAttribute("value", 2);
							user.MOV = 0.3;
							
						} break;
					case "ArrowDown":
						user.SHLD = false;
						
						if(!user.SHLD){
							userInst.setAttribute("xlink:href", "CHARACTER/HMN(III)_Female(Move).gif");
							inst_Dir.setAttribute("value", 3);
							user.MOV = 0.3;
							
						} break;
					case "ArrowRight":
						user.SHLD = false;
						
						if(!user.SHLD){
							userInst.setAttribute("xlink:href", "CHARACTER/HMN(IV)_Female(Move).gif");
							inst_Dir.setAttribute("value", 4);
							user.MOV = 0.3;
							
						} break;
					
					/* attack-direction */
					case "Space":
					user.SHLD = false;
					user.AGRO = true;
					
					
					switch(ctrl){
						case 1: 
							userInst.setAttribute("xlink:href", "CHARACTER/HMN(I)_Female(AtkHigh).gif");
							user.HIT_x = parseInt(user.x + 45);
							user.HIT_y = parseInt(user.y + 25);
							user.MOV = user.MOV * 0.1;
							
							
							
							break;
						case 2:
							userInst.setAttribute("xlink:href", "CHARACTER/HMN(II)_Female(AtkHigh).gif");
							user.HIT_x = parseInt(user.x + 20);
							user.HIT_y = parseInt(user.y + 25);
							//#//console.log(user.HIT_y, user.HIT_y);
							user.MOV = user.MOV * 0.1;
							
							
							break;
						case 3:
							userInst.setAttribute("xlink:href", "CHARACTER/HMN(III)_Female(AtkHigh).gif");
							
							user.HIT_x = parseInt(user.x + 16);
							user.HIT_y = parseInt(user.y + 48);
							//#//console.log(user.HIT_y, user.HIT_y);
							user.MOV = user.MOV * 0.1;
							
		
							break;
						case 4:
							userInst.setAttribute("xlink:href", "CHARACTER/HMN(IV)_Female(AtkHigh).gif");
							
							user.HIT_x = parseInt(user.x + 46);
							user.HIT_y = parseInt(user.y + 41);
							//#//console.log(user.HIT_y, user.HIT_y);
							user.MOV = user.MOV * 0.1;
							
						
							break;
					}; 
					
					user.collisionDetect_Hit(npc_asset[0], character_asset);
					user.collisionDetect_Hit(npc_asset[1], character_asset);
					user.collisionDetect_Hit(npc_asset[2], character_asset);
					user.collisionDetect_Hit(npc_asset[3], character_asset);
					user.collisionDetect_Hit(npc_asset[4], character_asset);
					user.collisionDetect_Hit(npc_asset[5], character_asset);
					user.collisionDetect_Hit(npc_asset[6], character_asset);
					user.collisionDetect_Hit(npc_asset[7], character_asset);
					user.collisionDetect_Hit(npc_asset[8], character_asset);
					user.collisionDetect_Hit(npc_asset[9], character_asset);
					user.collisionDetect_Hit(npc_asset[10], character_asset);
					user.collisionDetect_Hit(npc_asset[11], character_asset);
					user.collisionDetect_Hit(npc_asset[12], character_asset);
					user.collisionDetect_Hit(npc_asset[13], character_asset);
					user.collisionDetect_Hit(npc_asset[14], character_asset);
					user.collisionDetect_Hit(npc_asset[15], character_asset);
					user.collisionDetect_Hit(npc_asset[16], character_asset);
					user.collisionDetect_Hit(npc_asset[17], character_asset);
					setTimeout(user.AGRO_Reset, FPS);
					
					
					
					break;
					/* move-towards */
					case "KeyW": // .. Forward
					switch(ctrl){
						case 1: 
							updatePosition(user.MOV, -user.MOV);
							break;
						case 2:
							updatePosition(-user.MOV, -user.MOV);
							break;
						case 3:
							updatePosition(-user.MOV, user.MOV);
							break;
						case 4:
							updatePosition(user.MOV, user.MOV);
							break;
					};
						
					break;
					  
					case "KeyA":
					switch(ctrl){
						case 1:
							updatePosition(-user.MOV, -user.MOV);
							break;
						case 2:
							updatePosition(-user.MOV, user.MOV);
							break;
						case 3:
							updatePosition(-user.MOV, -user.MOV);
							break;
						case 4:
							updatePosition(-user.MOV, user.MOV);
							break;
						};
						
					break;
					
					case "KeyS":
					switch(ctrl){
						case 1:
							updatePosition(-user.MOV, user.MOV);
							break;
						case 2:
							updatePosition(user.MOV, user.MOV);
							break;
						case 3:
							updatePosition(user.MOV, -user.MOV);
							break;
						case 4:
							updatePosition(-user.MOV, -user.MOV);
							break;
					};
						
					  break;
					  
					case "KeyD":
					switch(ctrl){
						case 1:
							updatePosition(user.MOV, user.MOV);
							break;
						case 2:
							updatePosition(user.MOV, -user.MOV);
							break;
						case 3:
							updatePosition(user.MOV, user.MOV);
							break;
						case 4:
							updatePosition(user.MOV, -user.MOV);
							break;
					};
				}	
			}
			
			document.getElementById("user-SHLD").value = user.SHLD;
				
		} else {
			updateAnimation("Dead");
			event.preventDefault();
		}
		refresh();
		

		if (event.code !== "Tab"){
			event.preventDefault();
		}
		
		character_asset[0] = user;
		//#//console.log(character_asset[0]);
	}, false);
});

