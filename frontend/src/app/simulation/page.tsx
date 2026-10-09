'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { MOCK_DRUGS } from '@/data/mockDrugs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Box, RotateCcw, Info } from 'lucide-react';

function MoleculeModel({ drugId }: { drugId: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Core Atom */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial color="#10b981" roughness={0.2} metalness={0.8} />
        <Html distanceFactor={10}>
          <div className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 text-xs px-2 py-1 rounded backdrop-blur whitespace-nowrap shadow-lg">
            Trung Tâm Hoạt Tính
          </div>
        </Html>
      </mesh>

      {/* Outer Atoms & Bonds */}
      {[
        { pos: [2.2, 1.2, 0], color: '#ef4444', label: 'Oxy' },
        { pos: [-2.2, -1.2, 0], color: '#3b82f6', label: 'Nito' },
        { pos: [0, 2.4, 1.5], color: '#f59e0b', label: 'Gốc Hydroxyl' },
        { pos: [0, -2.4, -1.5], color: '#ec4899', label: 'Vòng Thơm' },
      ].map((atom, idx) => (
        <group key={idx}>
          {/* Cylinder Bond */}
          <mesh position={[atom.pos[0] / 2, atom.pos[1] / 2, atom.pos[2] / 2]}>
            <cylinderGeometry args={[0.12, 0.12, 2.2, 16]} />
            <meshStandardMaterial color="#64748b" metalness={0.5} />
          </mesh>
          {/* Outer Sphere Atom */}
          <mesh position={atom.pos as [number, number, number]}>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshStandardMaterial color={atom.color} roughness={0.3} metalness={0.6} />
            <Html distanceFactor={10}>
              <div className="bg-slate-900/90 text-slate-200 border border-slate-700 text-[10px] px-1.5 py-0.5 rounded backdrop-blur">
                {atom.label}
              </div>
            </Html>
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function SimulationPage() {
  const [selectedDrugId, setSelectedDrugId] = useState<string>('digoxin');
  const drug = MOCK_DRUGS.find((d) => d.id === selectedDrugId) || MOCK_DRUGS[0];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-950/20">
          Không Gian Mô Phỏng 3D
        </Badge>
        <h1 className="text-4xl font-extrabold text-slate-100">Cấu Trúc Phân Tử Thuốc (Three.js)</h1>
        <p className="text-slate-400 text-sm">
          Xoay, phóng to/thu nhỏ mô hình không gian 3D tương tác để quan sát trung tâm hoạt tính và các liên kết hóa học.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Drug Selector */}
        <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-lg text-slate-100 flex items-center gap-2">
              <Box className="h-5 w-5 text-cyan-400" />
              Chọn Dược Chất
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {MOCK_DRUGS.map((d) => (
              <Button
                key={d.id}
                variant={d.id === selectedDrugId ? 'default' : 'outline'}
                onClick={() => setSelectedDrugId(d.id)}
                className={`w-full justify-start text-left font-medium ${
                  d.id === selectedDrugId
                    ? 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-400'
                    : 'border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {d.name}
              </Button>
            ))}

            <div className="mt-6 p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <Info className="h-4 w-4" />
                <span>Thông Số Phân Tử</span>
              </div>
              <p className="text-slate-300">Công thức: <span className="font-mono text-cyan-300">{drug.structure3D?.formula || 'N/A'}</span></p>
              <p className="text-slate-300">Phân tử lượng: <span className="font-mono text-slate-400">{drug.structure3D?.molecularWeight || 'N/A'}</span></p>
              <p className="text-slate-300">PubChem CID: <span className="font-mono text-slate-400">{drug.structure3D?.pubchemCid || 'N/A'}</span></p>
            </div>
          </CardContent>
        </Card>

        {/* 3D Canvas */}
        <Card className="lg:col-span-3 bg-slate-950 border-slate-800 rounded-2xl overflow-hidden relative flex flex-col min-h-[500px]">
          <div className="absolute top-4 left-4 z-10 bg-slate-900/80 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs backdrop-blur flex items-center gap-2">
            <RotateCcw className="h-3.5 w-3.5 text-cyan-400 animate-spin" />
            <span>Xoay chuột trái để quan sát 360°, cuộn để Zoom</span>
          </div>

          <Canvas camera={{ position: [0, 0, 7], fov: 50 }} className="w-full h-full min-h-[500px]">
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} />
            <pointLight position={[-10, -10, -5]} intensity={0.8} color="#06b6d4" />
            <MoleculeModel drugId={selectedDrugId} />
            <OrbitControls enableZoom={true} autoRotate={false} />
          </Canvas>
        </Card>
      </div>
    </div>
  );
}
