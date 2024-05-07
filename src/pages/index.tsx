import { Fragment, ReactElement, useEffect, useState , useRef} from 'react'
import RootLayout from '@/layouts/root-layout';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head';
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useTranslation, Trans } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Button } from '@nextui-org/react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
// import { OrbitControls, Box } from "@react-three/drei";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

let Snowfall: any;
if (typeof window !== 'undefined') {
  Snowfall = require('react-snowfall').default;
}

type Props = {}

const Model = () => {
  const gltf = useLoader(GLTFLoader, "./ModelChar.glb");
  const myMesh = useRef<any>();

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    if (myMesh.current) {
      myMesh.current.rotation.y = a;
    }
  });

  return (
    <>
      <primitive object={gltf.scene} scale={1} ref={myMesh}/>
    </>
  );
};

const Home = (props: Props, _props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Fragment>
      <Head>
        <title>TopThammanun - Home</title>
        <meta
          name="description"
          content="Welcome to TopThammanun's personal website. Explore the world of Thammanun through various projects and content."
        />
        <meta
          name="keywords"
          content="TopThammanun, Thammanun, personal website, projects, React, Next.js"
        />
      </Head>
      <div className="flex flex-col flex-wrap items-center justify-center w-screen h-screen text-center">
      <Canvas camera={{ fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0.5, -1]} distance={1} intensity={2} />
        <directionalLight position={[-10, 10, 5]} intensity={2} lookAt={() => {[0,0,0]}} />
        <directionalLight position={[-10, -10, 0]} intensity={1} lookAt={() => {[0,0,0]}} />
        <Model/>
        <OrbitControls />
      </Canvas>
    </div>
    </Fragment >
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
    ])),
  },
})

export default Home

Home.getLayout = (page: ReactElement) => {
  return (
    <Fragment>
      <RootLayout>
        {page}
      </RootLayout>
    </Fragment>
  );
};