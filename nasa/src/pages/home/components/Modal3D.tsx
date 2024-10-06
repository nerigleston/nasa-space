import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { Planet } from "../types";
import { Line } from "@react-three/drei";

const generateEllipsePoints = (a: number, b: number, segments: number) => {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * 2 * Math.PI;
    const x = a * Math.cos(theta);
    const y = b * Math.sin(theta);
    points.push(new THREE.Vector3(x, y, 0));
  }
  return points;
};

const EllipseOrbit: React.FC<{
  a: number;
  b: number;
  segments: number;
  rotation: [number, number, number];
}> = ({ a, b, segments, rotation }) => {
  const points = generateEllipsePoints(a, b, segments);

  return (
    <Line points={points} rotation={rotation}>
      <lineBasicMaterial attach="material" color="white" />
    </Line>
  );
};

const PlanetMesh: React.FC<{ planet: Planet; orbitRadius: number }> = ({
  planet,
  orbitRadius,
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [angle, setAngle] = useState(0);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      setAngle((prev) => prev + 0.01);
      const x = orbitRadius * Math.cos(angle);
      const z = orbitRadius * Math.sin(angle);
      meshRef.current.position.set(x, 0, z);
    }
  });

  const planetScaleFactor = 0.04;
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[planet.pl_rade * planetScaleFactor, 32, 32]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

const StarMesh: React.FC<{ starRadius: number }> = ({ starRadius }) => {
  const starScaleFactor = 1.0;
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[starRadius * starScaleFactor, 32, 32]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
};

const Planet3D: React.FC<{ planet: Planet }> = ({ planet }) => {
  const orbitRadius = planet.pl_imppar + planet.pl_rade + planet.st_rad;

  return (
    <Canvas style={{ background: "black" }}>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />{" "}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <StarMesh starRadius={planet.st_rad} />
      <EllipseOrbit
        a={orbitRadius}
        b={orbitRadius}
        segments={64}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <PlanetMesh planet={planet} orbitRadius={orbitRadius} />
      <OrbitControls />
    </Canvas>
  );
};

export default Planet3D;
