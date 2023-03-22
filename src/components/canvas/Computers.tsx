import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";
type ComputerPrimitiveObjectProps = { isMobileView: boolean };

const ComputerPrimitiveObject = ({
  isMobileView,
}: ComputerPrimitiveObjectProps) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobileView ? 0.5 : 0.7}
        position={isMobileView ? [0, -2.25, -1.5] : [0, -3.25, -1.25]}
        rotation={[0, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputerCanvas = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia("(max-width:640px)");

    setIsMobileView(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobileView(event.matches);
    };
    // add callback function as a listener for changes to mediaQuery.
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // remove callback function as a listener when component is unmounted.
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ComputerPrimitiveObject isMobileView={isMobileView} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputerCanvas;
