import * as THREE from 'three'
import { useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, OrbitControls, OrthographicCamera } from '@react-three/drei'
import Room from './Room-AO5-Draco'
import './App.css'


function App() {
  const [isActive, setIsActive] = useState(true)

  const handlePointerOver = () => {
    setIsActive(true);
  };

  const handlePointerOut = () => {
 setIsActive(false);
  };


  const CameraSetup = () => {
    const vec = new THREE.Vector3()

    useFrame((state) => {
      const step = 0.1
      const x = 5
      const y = 5
      const z = 5

      state.camera.position.lerp(vec.set(x, y, z), step)
      state.camera.lookAt(0, 0, 0)
      state.camera.updateProjectionMatrix()
    })

    return null
  }

  return (
    <Canvas shadows style={{width: '100vw', height: '100vh'}}>
      <color attach='background' args={['#77B6C9']} />
      <OrthographicCamera makeDefault zoom={100}/>
      <OrbitControls /> 
      <CameraSetup />
      <ambientLight intensity={2} />
      <Room position={[0,-2,0]} isActive={isActive} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} /> 
    </Canvas>
  )
}

export default App
