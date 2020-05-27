var width   = window.innerWidth;
var height  = window.innerHeight;
var size    = window.innerWidth;
var density = 60;
var speed   = 10;


//Инициализация сцены
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1200);
camera.position.set(0, -100, 60);
camera.lookAt(0, 100, 50);

var scene = new THREE.Scene();
scene.background = new THREE.Color(0x22122d);


//Инициализация материалов
var terrain_m = new THREE.MeshBasicMaterial({
	color: 0x3e3385,
	wireframe: true
});

//Инициализация объектов
var pSize = size/(density-1);
var terrain_g = new THREE.Geometry();
for(var y=0; y<density; y++)
	for(var x=0; x<density; x++){
		terrain_g.vertices.push(new THREE.Vector3(x*pSize, y*pSize, 0));
	}
for(var y=0; y<density-1; y++)
	for(var x=0; x<density-1; x++){
		terrain_g.faces.push(new THREE.Face3(x+(y+1)*density, x+1+y*density, x+y*density));
	}
for(var y=1; y<density; y++)
	for(var x=1; x<density; x++){
		terrain_g.faces.push(new THREE.Face3(x+(y-1)*density, x-1+y*density, x+y*density));
	}

var terrain = new THREE.Mesh(terrain_g, terrain_m);
terrain.drawMode = THREE.TrianglesDrawMode;
terrain.position.set(-size*0.5, -size*0.5, 0);

scene.add(terrain);

var nowTime;
var deltaTime = 0;
var offset = 0;
function update(time){
	deltaTime = time-nowTime;
	nowTime = time;
	offset += speed*deltaTime*0.01;
	if(offset > density){
		offset -= pSize;
		/*for(var x=0; x<density; x++){
			terrain_g.vertices.unshift(new THREE.Vector3(x*pCount, y*pCount, 0));
		}
		for(var x=0; x<density; x++) terrain_g.vertices.pop();*/
		//terrain.geometry.verticesNeedUpdate=true;	
	}
	terrain.position.y = -250 -offset;	
	renderer.render(scene, camera);
	requestAnimationFrame(update);
}
nowTime = performance.now();
requestAnimationFrame(update);

window.onresize = function() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	width  = window.innerWidth;
	height = window.innerHeight;
}