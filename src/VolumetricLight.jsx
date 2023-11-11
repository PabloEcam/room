import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { LayerMaterial, Depth, Noise } from 'lamina';
import * as THREE from 'three';

function VolumetricLight() {




    return (
        <>
            <ambientLight intensity={2} ref={lightRef} />
            <mesh ref={meshRef} rotation={[0, 0, -Math.PI / 4]} position={[-1, -1.15, 0.5]}>
                <boxGeometry args={[4, 0.5, 1.25]} />
                <LayerMaterial>
                    <Depth colorA="white" colorB="black" alpha={1} mode="normal" />
                    <Noise mapping="local" type="white" scale={10} colorA="white" colorB="black" alpha={0.5} mode="subtract" />
                </LayerMaterial>
            </mesh>
        
        </>
    );
}

export default VolumetricLight;
