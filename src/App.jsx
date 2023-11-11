import * as THREE from 'three'
import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, SpotLight, SpotLightShadow, useDepthBuffer} from '@react-three/drei'
import Room from './Room-AO5-Draco'
import './App.css'
import VolumetricLight2 from './VolumetricLight2'

function App() {
  const [isActive, setIsActive] = useState(true)



  const handlePointerOver = () => {
    setIsActive(true);
  };

  const handlePointerOut = () => {
 setIsActive(true);
  };


  const CameraSetup = () => {
    const vec = new THREE.Vector3()

    useFrame((state) => {
      const step = 0.1
      const x = 5
      const y = 3
      const z = 5

      state.camera.position.lerp(vec.set(x, y, z), step)
      state.camera.lookAt(0, 0, 0)
      state.camera.updateProjectionMatrix()
    })

    return null
  }

  return (
    <Canvas  shadows style={{width: '100vw', height: '100vh'}}  dpr={[1, 2]}>
      <color attach='background' args={['#77B6C9']} />
       <OrthographicCamera makeDefault zoom={100}/>
      <OrbitControls /> 
      <CameraSetup />   
       <ambientLight intensity={1.2} />
      <Room position={[0,-2,0]} isActive={isActive} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} /> 
    <PreLuz /> 
    </Canvas>
  )
}

export default App

function Luz({buffer}){
  const spotTarget = useRef()

  const fragmentShader = `
  void main() {
    float distance = gl_FragCoord.z; 
    float attenuation = 1.0 - clamp(distance / 10.0, 0.0, 1.0); 
    gl_FragColor = vec4(attenuation, attenuation, attenuation, 1.0);
  }`;

  return  (<>
  <SpotLight 
    position={[-2.3,-0.247,0.45]} 
    target={spotTarget.current}
    scale={[1,0.7,1]}
    castShadow
    color='Khaki'
    distance={5} 
    attenuation={5}
    intensity={0.5}
    penumbra={0.5}
    angle={0.2}
    anglePower={6}
    radiusTop={0.8} 
    radiusBottom={0.8} 
    opacity={0.99}
    // shadow={THREE.SpotLightShadow}
  /*   depthBuffer={buffer} */
  />
  <mesh position={[0,-1,0.5]} ref={spotTarget} />
  </>)
}

function PreLuz(){
  const buffer = useDepthBuffer({ frames: Infinity });
  return(<Luz buffer={buffer} />)
}