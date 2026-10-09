'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MOCK_DRUGS } from '@/data/mockDrugs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pill, ShieldAlert, ArrowLeft, Activity, Box, Info } from 'lucide-react';

export default function DrugDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const drugId = resolvedParams.id;
  const drug = MOCK_DRUGS.find((d) => d.id.toLowerCase() === drugId.toLowerCase());

  if (!drug) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-xl">
        <Pill className="h-16 w-16 text-slate-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Thuốc không tồn tại</h1>
        <p className="text-slate-400 mb-6">Dược chất bạn tìm kiếm không có trong cơ sở dữ liệu thử nghiệm.</p>
        <Link href="/search">
          <Button variant="outline" className="border-slate-700 text-slate-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại Tra cứu
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between">
        <Link href="/search">
          <Button variant="ghost" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/60">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Trở về Danh mục Tra cứu
          </Button>
        </Link>
        <div className="flex gap-3">
          <Link href="/polypharmacy">
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>Phân Tích Tương Tác Polypharmacy</span>
            </Button>
          </Link>
          <Link href="/simulation">
            <Button variant="outline" className="border-cyan-500/40 text-cyan-400 hover:bg-cyan-950/30 flex items-center gap-2">
              <Box className="h-4 w-4" />
              <span>Xem Mô Phỏng 3D</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Overview Card */}
      <Card className="bg-slate-900/60 border-slate-800 shadow-2xl overflow-hidden backdrop-blur-md">
        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 p-8 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Badge className="bg-emerald-900/60 text-emerald-300 border-emerald-700/50 text-sm py-1 px-3">
              {drug.category}
            </Badge>
            {drug.structure3D && (
              <Badge variant="outline" className="border-slate-700 text-slate-400 text-xs">
                Công thức: {drug.structure3D.formula}
              </Badge>
            )}
          </div>
          <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            <Pill className="h-9 w-9 text-emerald-400" />
            {drug.name}
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Biệt dược phổ biến: <span className="text-slate-200 font-medium">{drug.brandNames.join(', ')}</span>
          </p>
        </div>

        <CardContent className="p-8 space-y-8">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-slate-200 mb-2 flex items-center gap-2">
              <Info className="h-5 w-5 text-emerald-400" />
              Mô Tả & Chỉ Định
            </h3>
            <p className="text-slate-300 leading-relaxed text-base bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
              {drug.description}
            </p>
          </div>

          {/* Grid details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950/40 p-5 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Cơ Chế Tác Dụng</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{drug.mechanism}</p>
            </div>
            <div className="bg-slate-950/40 p-5 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Liều Dùng Tham Khảo</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{drug.dosage}</p>
            </div>
          </div>

          {/* Side Effects */}
          <div>
            <h3 className="text-lg font-semibold text-slate-200 mb-3">Tác Dụng Không Mong Muốn (Side Effects)</h3>
            <div className="flex flex-wrap gap-2">
              {drug.sideEffects.map((se, idx) => (
                <Badge key={idx} variant="secondary" className="bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1 text-sm">
                  {se}
                </Badge>
              ))}
            </div>
          </div>

          {/* Drug Interactions */}
          <div>
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-400" />
              Cảnh Báo Tương Tác Thuốc Quan Trọng
            </h3>

            {drug.interactions.length > 0 ? (
              <div className="space-y-4">
                {drug.interactions.map((inter, idx) => (
                  <div
                    key={idx}
                    className="bg-amber-950/10 border border-amber-900/40 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-200">{drug.name}</span>
                        <span className="text-slate-500">+</span>
                        <Link href={`/drug/${inter.targetDrugId}`} className="font-bold text-emerald-400 hover:underline">
                          {inter.targetDrugName}
                        </Link>
                        <Badge
                          className={`ml-2 text-xs ${
                            inter.severity === 'Severe'
                              ? 'bg-rose-950 text-rose-300 border-rose-800'
                              : 'bg-amber-950 text-amber-300 border-amber-800'
                          }`}
                        >
                          {inter.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-300">{inter.description}</p>
                    </div>
                    <Link href={`/polypharmacy?drugs=${drug.id},${inter.targetDrugId}`}>
                      <Button size="sm" variant="outline" className="border-amber-700/60 text-amber-300 hover:bg-amber-950/40 whitespace-nowrap">
                        Xem Đồ Thị Tương Tác
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic bg-slate-950/30 p-4 rounded-xl border border-slate-800">
                Chưa ghi nhận tương tác thuốc mức độ nghiêm trọng trong cơ sở dữ liệu mẫu.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
