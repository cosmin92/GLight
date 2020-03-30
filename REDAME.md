# gLight
### Final project for interctive graphics
> gLight is a WebGL library to build simple and complete 3D scenes

### Usage
To use the library just include the dist/gLight.js script in the HTML document
```html
<script type="text/javascript" src="gLight.js"></script>
```
Then initialize the library using the following code

```javascript
 window.addEventListener("load", main);

 function main() {
    let canvas = document.getElementById("glCanvas");
    GLIGHT.initialize(canvas);
    
    <!-- build your scene here  -->
    
  }
```

### Examples
##### Simple scene
```javascript
 window.addEventListener("load", main);

 let renderer;

 function main() {
    let canvas = document.getElementById("glCanvas");
    GLIGHT.initialize(canvas);
    
    let scene = new GLIGHT.Scene();
    
    let box = new GLIGHT.Mesh(new GLIGHT.Box(2,3,2), new GLIGHT.PhongMaterial());
    scene.add(box);
    box.texture = new GLIGHT.Texture("url/of/the/image");
    
    box.rotate.y = 45;
    box.translate.set(0, 1, 0);
    
    let directionalLight = new GLIGHT.DirectionalLight(new GLIGHT.Color(255,0,0,255));
    scene.add(directionalLight);
    
    renderer = new GLIGHT.Renderer(scene);
    renderLoop();
  }
  
  function renderLoop(){
    renderer.render();
    requestAnimationFrame(renderLoop);
  }
  
```
##### Animation
```javascript
 window.addEventListener("load", main);

 function main() {
    let canvas = document.getElementById("glCanvas");
    GLIGHT.initialize(canvas);
    
    let scene = new GLIGHT.Scene();
    
    let box = new GLIGHT.Mesh(new GLIGHT.Box(2,3,2), new GLIGHT.PhongMaterial());
    scene.add(box);
    box.texture = new GLIGHT.Texture("url/of/the/image");
    box.rotate.y = 45;
    
    // Add keyframes
    let postTrack = new GLIGHT.PositionTrack(box);
  
    box.translate.set(-3, 0, 0);
    posTrack.addKeyframe(0, GLIGHT.EASE.IN_OUT_ELASTIC);
    
    box.translate.set(3, 0, 0);
    posTrack.addKeyframe(0, GLIGHT.EASE.IN_OUT_ELASTIC);
    
    let directionalLight = new GLIGHT.DirectionalLight(new GLIGHT.Color(255,0,0,255));
    scene.add(directionalLight);
    
    let renderer = new GLIGHT.Renderer(scene);
    
    // Animation
    let animation = new GLIGHT.AnimationClip(renderer);
    animation.add(posTrack);
    animation.loop();
    animation.start();
  }
 
```
#### Classes
**•	EASE
•	INTERPOLATION
•	Color
•	Vector3
•	Vector4
•	Matrix4
•	LineGeometry
•	PlaneGeometry
•	BoxGeometry
•	SphereGeometry
•	PerspectiveCamera
•	OrthographicCamera
•	Scene
•	Mesh
•	Group
•	LambertMaterial
•	PhongMaterial
•	Texture
•	TextureCube
•	DirectionalLight
•	PointLight
•	Renderer
•	AnimationClip
•	PivotTrack
•	PositionsTrack
•	RotationsTrack
•	ScalesTrack**


