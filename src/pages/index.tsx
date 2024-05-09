import { Fragment, ReactElement, useEffect, useState, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from "@react-three/drei";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import RootLayout from '@/layouts/root-layout';

let Snowfall:any;
if (typeof window !== 'undefined') {
  Snowfall = require('react-snowfall').default;
}

const Model = ({ position, setPosition }:any) => {
  const gltf = useLoader(GLTFLoader, "./pika_poly.glb");
  const myMesh = useRef<any>();

  useFrame(() => {
    if (myMesh.current) {
      myMesh.current.position.x = position.x;
      myMesh.current.position.y = position.y;
    }
  });

  return <primitive object={gltf.scene} scale={1} ref={myMesh} />;
};

const Home = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (event : any) => {
      switch (event.key) {
        case 'w': setPosition(pos => ({ ...pos, y: pos.y + 0.1 })); break;
        case 's': setPosition(pos => ({ ...pos, y: pos.y - 0.1 })); break;
        case 'a': setPosition(pos => ({ ...pos, x: pos.x - 0.1 })); break;
        case 'd': setPosition(pos => ({ ...pos, x: pos.x + 0.1 })); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Fragment>
      <div className='flex flex-col items-center justify-center w-screen h-screen'>
        <h1 className='font-extrabold'>{"Hello I'm Thammanun"}</h1>
        <div className='h-screen w-screen'>
          <Snowfall />
          <Canvas camera={{ fov: 30 }}>
            <ambientLight intensity={1} />
            <pointLight position={[0, 0.5, -1]} distance={1} intensity={2} />
            <directionalLight position={[-10, 10, 5]} intensity={2} />
            <directionalLight position={[-10, -10, 0]} intensity={1} />
            <Model position={position} setPosition={setPosition} />
            <OrbitControls />
          </Canvas>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;

Home.getLayout = (page: ReactElement) => (
  <Fragment>
    <RootLayout>{page}</RootLayout>
  </Fragment>
);
