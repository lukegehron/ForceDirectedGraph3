
  //using timer as animation
  var speed = Date.now() * 0.00025;
  camera.position.x = Math.cos(speed) * 10;
  camera.position.z = Math.sin(speed) * 10;

  camera.lookAt(scene.position); //0,0,0
  renderer.render(scene, camera);
