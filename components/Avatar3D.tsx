import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useHelper, Float } from '@react-three/drei';
import * as THREE from 'three';
import { HealthData } from '../types';
import { Activity, Heart, Scale, Zap } from 'lucide-react';

// Manually declare JSX intrinsic elements for React Three Fiber to fix TypeScript errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      group: any;
      capsuleGeometry: any;
      sphereGeometry: any;
      cylinderGeometry: any;
      boxGeometry: any;
      planeGeometry: any;
      meshStandardMaterial: any;
      fog: any;
      ambientLight: any;
      directionalLight: any;
      spotLight: any;
    }
  }
}

interface Avatar3DProps {
  data: HealthData;
}

// Reusable Label Component for inside the 3D scene
const DataLabel = ({ 
  position, 
  value, 
  unit, 
  label, 
  icon: Icon,
  color = "text-white"
}: { 
  position: [number, number, number], 
  value: string | number, 
  unit?: string, 
  label: string, 
  icon?: any,
  color?: string
}) => {
  return (
    <Html position={position} center distanceFactor={10} zIndexRange={[100, 0]}>
      <div className={`flex flex-col items-center justify-center p-2 rounded-xl backdrop-blur-md bg-black/60 border border-white/10 shadow-lg min-w-[100px] transition-all hover:scale-110 cursor-default group`}>
        <div className="flex items-center gap-1 mb-1 opacity-70 group-hover:opacity-100 transition-opacity">
          {Icon && <Icon size={14} className={color} />}
          <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-300">{label}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className={`text-xl font-bold ${color}`}>{value}</span>
          <span className="text-xs text-gray-400">{unit}</span>
        </div>
        <div className="w-1 h-4 bg-white/20 absolute -bottom-4 left-1/2 -translate-x-1/2"></div>
      </div>
    </Html>
  );
};

const BodyPart = ({ position, args, color = "#4b5563" }: { position: [number, number, number], args: any, color?: string }) => {
  return (
    <mesh position={position} castShadow receiveShadow>
      <capsuleGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
    </mesh>
  );
};

const Joint = ({ position }: { position: [number, number, number] }) => (
  <mesh position={position} castShadow>
    <sphereGeometry args={[0.16, 16, 16]} />
    <meshStandardMaterial color="#374151" roughness={0.5} metalness={0.5} />
  </mesh>
);

const Mannequin = ({ data }: { data: HealthData }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
        // Subtle breathing animation
        groupRef.current.position.y = -1 + Math.sin(state.clock.elapsedTime) * 0.05;
        // Slow rotation
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const weight = data["sensor.withings_gewicht"];
  const muscle = data["sensor.withings_muskelmasse"];
  const heart = data["sensor.withings_herzschlag"];
  const steps = data["sensor.withings_schritte_heute"];

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* HEAD */}
      <mesh position={[0, 2.7, 0]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#6b7280" roughness={0.2} metalness={0.7} />
      </mesh>
      
      {/* NECK */}
      <mesh position={[0, 2.35, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.3, 16]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>

      {/* TORSO - UPPER */}
      <mesh position={[0, 2.0, 0]} castShadow>
         <boxGeometry args={[0.7, 0.6, 0.35]} />
         <meshStandardMaterial color="#374151" roughness={0.3} metalness={0.6} />
      </mesh>
      
      {/* TORSO - LOWER (Abs) */}
      <mesh position={[0, 1.5, 0]} castShadow>
         <cylinderGeometry args={[0.28, 0.25, 0.6, 16]} />
         <meshStandardMaterial color="#4b5563" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* ARMS */}
      <BodyPart position={[-0.5, 1.8, 0]} args={[0.1, 0.5, 4, 16]} /> {/* L Upper Arm */}
      <Joint position={[-0.5, 1.4, 0]} />
      <BodyPart position={[-0.55, 1.0, 0.1]} args={[0.09, 0.5, 4, 16]} /> {/* L Forearm */}
      
      <BodyPart position={[0.5, 1.8, 0]} args={[0.1, 0.5, 4, 16]} /> {/* R Upper Arm */}
      <Joint position={[0.5, 1.4, 0]} />
      <BodyPart position={[0.55, 1.0, 0.1]} args={[0.09, 0.5, 4, 16]} /> {/* R Forearm */}

      {/* PELVIS */}
      <mesh position={[0, 1.1, 0]}>
         <cylinderGeometry args={[0.26, 0.28, 0.3]} />
         <meshStandardMaterial color="#374151" />
      </mesh>

      {/* LEGS */}
      <Joint position={[-0.25, 1.0, 0]} />
      <BodyPart position={[-0.25, 0.5, 0]} args={[0.12, 0.8, 4, 16]} /> {/* L Thigh */}
      <Joint position={[-0.25, 0.0, 0]} />
      <BodyPart position={[-0.25, -0.6, 0]} args={[0.1, 0.8, 4, 16]} /> {/* L Shin */}

      <Joint position={[0.25, 1.0, 0]} />
      <BodyPart position={[-0.25, 0.5, 0]} args={[0.12, 0.8, 4, 16]} />
      <BodyPart position={[0.25, 0.5, 0]} args={[0.12, 0.8, 4, 16]} /> {/* R Thigh */}
      <Joint position={[0.25, 0.0, 0]} />
      <BodyPart position={[0.25, -0.6, 0]} args={[0.1, 0.8, 4, 16]} /> {/* R Shin */}


      {/* 3D LABELS */}
      
      {/* Heart Label (Chest) */}
      <DataLabel 
        position={[0.8, 2.2, 0]} 
        value={heart?.state} 
        unit={heart?.attributes?.unit_of_measurement}
        label="Heart Rate"
        icon={Heart}
        color="text-red-400"
      />

      {/* Weight Label (Core) */}
      <DataLabel 
        position={[-0.9, 1.5, 0]} 
        value={weight?.state} 
        unit={weight?.attributes?.unit_of_measurement}
        label="Current Weight"
        icon={Scale}
        color="text-blue-400"
      />

      {/* Muscle Label (Arm) */}
      <DataLabel 
        position={[0.8, 1.2, 0]} 
        value={muscle?.state} 
        unit={muscle?.attributes?.unit_of_measurement}
        label="Muscle Mass"
        icon={Zap}
        color="text-yellow-400"
      />

      {/* Steps Label (Legs) */}
      <DataLabel 
        position={[-0.6, -0.5, 0.5]} 
        value={steps?.state} 
        unit={steps?.attributes?.unit_of_measurement}
        label="Steps Today"
        icon={Activity}
        color="text-green-400"
      />

    </group>
  );
};

export const Avatar3D: React.FC<Avatar3DProps> = ({ data }) => {
  return (
    <div className="w-full h-full min-h-[500px] relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
      <div className="absolute top-4 left-4 z-10">
        <h2 className="text-white/80 font-bold text-lg uppercase tracking-widest">Body Composition</h2>
        <p className="text-white/40 text-xs">Interactive 3D View</p>
      </div>
      
      <Canvas shadows camera={{ position: [0, 1, 5.5], fov: 45 }}>
        <fog attach="fog" args={['#111827', 5, 15]} />
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={1024}
        />
        <spotLight position={[-5, 5, 5]} intensity={0.5} color="#3b82f6" />
        <spotLight position={[5, -5, 5]} intensity={0.5} color="#10b981" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
           <Mannequin data={data} />
        </Float>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#111827" roughness={0.8} metalness={0.2} />
        </mesh>

        <OrbitControls 
          enableZoom={false} 
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 1.5}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};