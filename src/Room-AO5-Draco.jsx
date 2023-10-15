import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import { SpotLight, TransformControls, useGLTF } from '@react-three/drei'

const setMaterialProperties = (ref, properties) => {
  if (ref && ref.current && ref.current.material) {
    const clonedMaterial = ref.current.material.clone();
    Object.assign(clonedMaterial, properties);
    ref.current.material = clonedMaterial;
    ref.current.material.needsUpdate = true;
  }
};

export default function Model({isActive = true, ...props}) {
  const { nodes, materials } = useGLTF('./room-AO5-Draco.glb')
  const refWalls = useRef()
  const refFloor = useRef()
  const refWallsFloor = useRef()
  const refPoster = useRef()
  const refTableTop = useRef()
  const refTableBottom = useRef()
  const refTableLegs = useRef()
  const refWindowFrame = useRef()
  const refShade = useRef()
  const refShadeDown = useRef()
  const refShadeUp = useRef()
  const refLowerGlass = useRef()
  const refUpperGlass = useRef()
  const refUpperWindow = useRef()
  const refLowerWindow = useRef()
  const refRabbitLamp = useRef()
  const refLampShade = useRef()
  const refLampLight = useRef()
  const refEmissivePlane = useRef();

  const texture = useLoader(TextureLoader, './poster1.jpg')

  useEffect(() => {
    if (isActive) {
      const refPropertiesMap = [
        { ref: refWalls, properties: { color: new THREE.Color('#948777') }},
        { ref: refFloor, properties: { color: new THREE.Color('#a26939') }},
        { ref: refWallsFloor, properties: { color: new THREE.Color('#a26939') }},
        { ref: refTableTop, properties: { color: new THREE.Color('#eee5d3') }},
        { ref: refTableBottom, properties: { color: new THREE.Color('#5e6173') }},
        { ref: refTableLegs, properties: { color: new THREE.Color('#5e6173') }},
        { ref: refLampShade, properties: { color: new THREE.Color('#aa2727') }},
        { ref: refRabbitLamp, properties: { color: new THREE.Color('#aa2727') }},
        { ref: refWindowFrame, properties: { color: new THREE.Color('#eee5d3') }},
        { ref: refShade, properties: { color: new THREE.Color('#aea084') }},
        { ref: refShadeDown, properties: { color: new THREE.Color('#7b6f58') }},
        { ref: refShadeUp, properties: { color: new THREE.Color('#7b6f58') }},
        { ref: refLowerGlass, properties: { transparent: true, opacity: 0.5 }},
        { ref: refUpperGlass, properties: { transparent: true, opacity: 0.5 }},
        { ref: refLowerWindow, properties: { transparent: false, opacity: 1 }},
        { ref: refUpperWindow, properties: { transparent: false, opacity: 1 }}
      ];
  
      refPropertiesMap.forEach(({ ref, properties }) => setMaterialProperties(ref, properties));

      if (refLampShade.current) {
        refLampShade.current.material.emissive = new THREE.Color('#aa2727');
        refLampShade.current.material.emissiveIntensity = 2
        refLampShade.current.material.needsUpdate = true;
      }
  
      if (refPoster.current) {
        texture.offset.set(0.02, -0.8);
        texture.repeat.set(2, 2);
        refPoster.current.scale.x = -1;
        refPoster.current.material.map = texture;
        refPoster.current.material.needsUpdate = true;
      }

      if (refLampLight.current) {
        refLampLight.current.intensity = 12;
      }

    } else {
      const refPropertiesMap = [
        { ref: refWalls, properties: { color: new THREE.Color('#f0e2bd') }},
        { ref: refFloor, properties: { color: new THREE.Color('#f0e2bd') }},
        { ref: refWallsFloor, properties: { color: new THREE.Color('#f0e2bd') }},
        { ref: refTableTop, properties: { color: new THREE.Color('#f0e2bd') }},
        { ref: refTableBottom, properties: { color: new THREE.Color('#f0e2bd') }},
        { ref: refTableLegs, properties: { color: new THREE.Color('#f0e2bd') }},
        { ref: refLampShade, properties: { color: new THREE.Color('#f0e2bd') }},
        { ref: refRabbitLamp, properties: { color: new THREE.Color('#f0e2bd') }},
        { ref: refWindowFrame, properties: { color: new THREE.Color('#f0e2bd') }},
        { ref: refShade, properties: { color: new THREE.Color('#f0e2bd') }},
        { ref: refShadeDown, properties: { color: new THREE.Color('#f0e2bd') }},
        { ref: refShadeUp, properties: { color: new THREE.Color('#f0e2bd') }},
        { ref: refLowerWindow, properties: { color: new THREE.Color('#f0e2bd') }},
        { ref: refLowerGlass, properties: { transparent: true, opacity: 0.5 }},
        { ref: refUpperGlass, properties: { transparent: true, opacity: 0.5 }},
        { ref: refLowerWindow, properties: { transparent: false, opacity: 1 }},
        { ref: refUpperWindow, properties: { transparent: false, opacity: 1 }}
      ];
      
      refPropertiesMap.forEach(({ ref, properties }) => setMaterialProperties(ref, properties));

      if (refLampShade.current) {
        refLampShade.current.material.emissive = new THREE.Color(0, 0, 0) // color negro significa sin emisión
        refLampShade.current.material.emissiveIntensity = 0
        refLampShade.current.material.needsUpdate = true
      }

      if (refPoster.current) {
        refPoster.current.material.map = null
        refPoster.current.material.color = new THREE.Color('#f0e2bd');
        refPoster.current.material.needsUpdate = true
      }

      if (refLampLight.current) {
        refLampLight.current.intensity = 0;
      }
    }
  
  }, [isActive]);

  return (
    <group {...props} dispose={null}>
    <pointLight  ref={refLampLight} intensity={12} position={[-0.318, 1.7, -1.317]} color='#FF0000'/>
 

{/*     <mesh ref={refEmissivePlane} position={[-2, 2.382, 0.535]} rotation={[0 , Math.PI / 2  , 0 ]}>
  <planeGeometry args={[1.5, 2.5]} /> 
  <meshStandardMaterial emissive={ new THREE.Color('#f0e2bd') } emissiveIntensity={10} /> 
</mesh> */}

 
{/*       <TransformControls><SpotLight 
        scale={15}
   
        castShadow 
        penumbra={1}
        distance={5} 
        angle={0.05} 
        attenuation={10} 
        anglePower={10} 
        position={[-2, 2.382, 0]}
        target={refFloor.current}
        color='#dad99b'
      /></TransformControls> */}

       <mesh ref={refWalls} castShadow receiveShadow geometry={nodes.Walls.geometry} material={materials.Basic} position={[-0.219, 1.781, -0.219]} />
      <mesh ref={refFloor} castShadow receiveShadow geometry={nodes.Floor.geometry} material={materials.BasicFloor} position={[0.117, 0.235, 0.117]} />
      <mesh ref={refWallsFloor} castShadow receiveShadow geometry={nodes.WallsFloor.geometry} material={materials.BasicWallsFloor} position={[-0.219, 1.781, -0.219]} />
      <mesh ref={refPoster} castShadow receiveShadow geometry={nodes.Poster.geometry} material={materials.PosterBasic} position={[0.501, 2.541, -1.751]} />
      <mesh ref={refTableTop} castShadow receiveShadow geometry={nodes.TableTop.geometry} material={materials.BasicTable} position={[0.353, 1.262, -1.093]} />
      <mesh ref={refTableBottom}castShadow receiveShadow geometry={nodes.TableBottom.geometry} material={materials.BasicTable} position={[1.03, 1.177, -1.093]} />
      <mesh castShadow receiveShadow geometry={nodes.Cylinder001.geometry} material={materials.BasicTable} position={[1.026, 0.829, -0.48]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh ref={refTableLegs} castShadow receiveShadow geometry={nodes.TableLegs.geometry} material={materials.BasicTable} position={[-0.687, 1.185, -0.56]} />
      <mesh castShadow receiveShadow geometry={nodes.Cylinder002.geometry} material={materials.BasicTable} position={[1.026, 1.059, -0.48]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Cylinder003.geometry} material={materials.BasicTable} position={[1.032, 0.6, -0.48]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.Cylinder004.geometry} material={materials.BasicTable} position={[1.032, 0.363, -0.48]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh ref={refWindowFrame} castShadow receiveShadow geometry={nodes.WindowFrame.geometry} material={materials.BasicWindow} position={[-1.88, 2.382, 0.535]} />
      <mesh ref={refUpperWindow} castShadow receiveShadow geometry={nodes.UpperWindow.geometry} material={materials.BasicWindow} position={[-2.072, 2.382, 0.535]} />
      <mesh ref={refLowerWindow} castShadow receiveShadow geometry={nodes.LowerWindow.geometry} material={materials.BasicWindow} position={[-2.136, 1.316, 0.535]} />
      <mesh ref={refShade} castShadow receiveShadow geometry={nodes.Shade.geometry} material={materials.BasicWindow} position={[-1.801, 2.382, 0.535]} />
      <mesh ref={refShadeDown} castShadow receiveShadow geometry={nodes.ShadeDown.geometry} material={materials.BasicWindow} position={[-1.801, 2.176, 0.535]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} />
      <mesh ref={refShadeUp} castShadow receiveShadow geometry={nodes.ShadeUp.geometry} material={materials.BasicWindow} position={[-1.801, 3.42, 0.535]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} />
      <mesh ref={refLowerGlass} castShadow receiveShadow geometry={nodes.LowerWindowGlass.geometry} material={materials.BasicWindow} position={[-2.136, 1.316, 0.535]} />
      <mesh ref={refUpperGlass} castShadow receiveShadow geometry={nodes.UpperWindowGlass.geometry} material={materials.BasicWindow} position={[-2.072, 2.382, 0.535]} />
      <mesh ref={refLampShade} castShadow receiveShadow geometry={nodes.LampShade.geometry} material={materials.BasicLamp} position={[-0.318, 1.907, -1.317]} rotation={[Math.PI / 2, 0, 0.623]} />
      <mesh castShadow receiveShadow geometry={nodes.LightBulb.geometry} material={materials.BasicLamp} position={[-0.318, 1.816, -1.318]} rotation={[Math.PI / 2, 0, 0.623]} />
      <mesh ref={refRabbitLamp}castShadow receiveShadow geometry={nodes.RabbitStraight.geometry} material={materials.BasicLamp} position={[-0.342, 1.493, -1.284]} rotation={[Math.PI / 2, 0, 0.623]} />
      <mesh castShadow receiveShadow geometry={nodes.Lamp.geometry} material={materials.BasicLamp} position={[-0.313, 1.716, -1.325]} rotation={[Math.PI / 2, 0, 0.623]} /> 
    </group>
  )
}

useGLTF.preload('./room-AO5-Draco.glb')
