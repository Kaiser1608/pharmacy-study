'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_DRUGS, Drug } from '@/data/mockDrugs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Pill, ShieldAlert, ArrowRight, Activity } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(MOCK_DRUGS.map((d) => d.category)))];

  const filteredDrugs = MOCK_DRUGS.filter((drug) => {
    const matchesSearch =
      drug.name.toLowerCase().includes(query.toLowerCase()) ||
      drug.brandNames.some((b) => b.toLowerCase().includes(query.toLowerCase())) ||
      drug.category.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || drug.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
        <Badge variant="outline" className="px-3.5 py-1 border-cyan-500/40 text-cyan-300 bg-cyan-950/40 text-xs font-semibold uppercase tracking-wider">
          Tra Cứu Y Khoa & Tương Tác Thuốc
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-slate-50">
          Cơ Sở Dữ Liệu Dược Lý Sinh Học
        </h1>
        <p className="text-slate-300 text-lg">
          Tìm kiếm thông tin dược chất, cơ chế hoạt động, liều dùng và mô phỏng tương tác thuốc đa tầng.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-md mb-10 shadow-2xl space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Nhập tên thuốc (Digoxin, Warfarin...), tên thương mại, hoặc nhóm dược lý..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 bg-slate-950 border-slate-600 text-slate-50 placeholder:text-slate-400 h-13 text-lg rounded-xl focus-visible:ring-cyan-400 focus-visible:border-cyan-400"
          />
        </div>

        {/* Category badges */}
        <div className="flex flex-wrap gap-2 pt-2 items-center">
          <span className="text-xs font-semibold text-slate-300 mr-2 uppercase tracking-wider">Phân loại:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-lg border font-medium transition-all ${
                categoryFilter === cat
                  ? 'bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-950'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Drug Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrugs.map((drug: Drug) => (
          <Card
            key={drug.id}
            className="bg-slate-900 border-slate-700/80 hover:border-cyan-500/60 transition-all hover:shadow-xl hover:shadow-cyan-950/30 flex flex-col justify-between"
          >
            <CardHeader className="pb-3 border-b border-slate-800/80">
              <div className="flex items-start justify-between">
                <div>
                  <Badge className="bg-cyan-950 text-cyan-300 border-cyan-700/60 mb-2 font-medium">
                    {drug.category}
                  </Badge>
                  <CardTitle className="text-2xl text-slate-50 flex items-center gap-2">
                    <Pill className="h-5 w-5 text-cyan-400" />
                    {drug.name}
                  </CardTitle>
                </div>
              </div>
              <CardDescription className="text-slate-400 text-xs font-medium">
                Biệt dược: <span className="text-slate-200">{drug.brandNames.join(', ')}</span>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 flex-1 pt-4">
              <p className="text-sm text-slate-200 line-clamp-3 leading-relaxed">
                {drug.description}
              </p>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider block">Cơ chế hoạt động</span>
                <p className="text-xs text-slate-300 line-clamp-2">{drug.mechanism}</p>
              </div>

              {drug.interactions.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-rose-300 bg-rose-950/40 border border-rose-800/60 p-2.5 rounded-xl font-medium">
                  <ShieldAlert className="h-4 w-4 shrink-0 text-rose-400" />
                  <span>Có {drug.interactions.length} cảnh báo tương tác thuốc nghiêm trọng</span>
                </div>
              )}
            </CardContent>

            <CardFooter className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <Link href={`/drug/${drug.id}`} className="w-full">
                <Button className="w-full bg-slate-800 hover:bg-cyan-600 text-slate-100 hover:text-white border border-slate-600 hover:border-cyan-400 transition-all flex items-center justify-center gap-2 font-semibold">
                  <span>Chi Tiết Dược Lý</span>
                  <ArrowRight className="h-4 w-4 text-cyan-400" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredDrugs.length === 0 && (
        <div className="text-center py-16 bg-slate-900/60 border border-dashed border-slate-700 rounded-2xl">
          <Pill className="h-12 w-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-200">Không tìm thấy thuốc nào</h3>
          <p className="text-slate-400 text-sm mt-1">Thử tìm kiếm với từ khóa khác như "Digoxin", "Warfarin", hoặc "Amiodarone".</p>
        </div>
      )}
    </div>
  );
}
