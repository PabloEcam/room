import * as THREE from 'three'
import React, { useRef } from "react"
import { SpotLight, useDepthBuffer, useTexture } from "@react-three/drei"

function VolumetricLight2() {
    const targetRef = useRef();
    const buffer =  useDepthBuffer()

    return (
        <>
                 <mesh  ref={targetRef} position={[-0.8, -1, 0.2]} />
                 <pointLight  position={[-1.6, 0, -1.5]} color='white' intensity={10} shadow={THREE.PointLightShadow} castShadow/>
           
       {/*  <directionalLight intensity={1} position={[2, 5, 5]} color="blue"/> */}
         {/*    <SpotLight 
                rotation={[0, 0, -Math.PI / 4]} 
                position={[-3, 0, 0.5]}
                target={targetRef.current}
                castShadow 
                color='Khaki'
                distance={10}
                intensity={1}
                penumbra={1}
                angle={0.5}
                shadow-mapSize-width={1024} 
                shadow-mapSize-height={1024} 
                shadow-camera-near={0.5}
                shadow-camera-far={500}
                shadow-camera-fov={90}
                depthBuffer={buffer}
            />
 */}
            <mesh 
                castShadow 
                receiveShadow  
                position={[-1, 0, 0.5]} 
               
            >
                <boxGeometry args={[0.5, 5, 5]} />
                <meshStandardMaterial color="red" />  
            </mesh>

            <mesh  
                castShadow 
                receiveShadow 
                position={[0, -1, 0]} 
                rotation={[0,Math.PI/2,0]}
            >
                <planeGeometry args={[2, 2]}  />
                <meshStandardMaterial color="white" side={THREE.DoubleSide}/>
            </mesh>
            <mesh  
                castShadow 
                receiveShadow 
                position={[0.5, -1, 0]} 
                rotation={[0,Math.PI/2,0]}
            >
                <planeGeometry args={[2, 2]}  />
                <meshStandardMaterial color="white" side={THREE.DoubleSide}/>
            </mesh>

   
        </>
    )
}

export default VolumetricLight2 



/* import * as THREE from 'three'
import React, { useRef } from "react"
import { SpotLight, useDepthBuffer, useTexture, SpotLightShadow, MeshPortalMaterial } from "@react-three/drei"

function VolumetricLight2() {
    const ref = useRef()
    const depthBuffer = useDepthBuffer({ frames:1 })
    const texture = useTexture('./light.jpg')
    return(
        <>
         <SpotLight 
            rotation={[0, 0, -Math.PI / 4]} 
            position={[-3, 1, 0.5]}
            target={ref.current}
            radiusTop={1} 
            radiusBottom={1} 
            castShadow 
            color='Khaki'
            distance={20}
            intensity={2}
            penumbra={1}
             angle={0.35} 
             attenuation={8} 
             anglePower={8}
        
        > 
           {/*   <SpotLightShadow
                distance={0.4}
                alphaTest={0.5} 
                scale={0.5} 
                map={texture} 
                // shader={undefined}
                width={2048}
                height={2048}
                far={10}
                near={0.01}
                fov={90}
                bias={-0.0001}
                focus={1}
                radius={1}
                depthBuffer={depthBuffer}

             />   
        </SpotLight>
        <mesh castShadow receiveShadow  position={[-1, 0, 0.5]} ref={ref}>
            <boxGeometry args={[0.5, 1, 0.5]} />
            <meshPhongMaterial />  
        </mesh>
        <mesh  castShadow receiveShadow position={[0, -1, 0]} rotation={[0,Math.PI/2,0]} ref={ref}>
            <planeGeometry args={[2, 2]}  />
            <meshStandardMaterial color="white"  side={THREE.DoubleSide}/>
        </mesh>
        <mesh position={[-0.8, -1, 0.2]} ref={ref}/>
        </>
        )
}

export default VolumetricLight2 */