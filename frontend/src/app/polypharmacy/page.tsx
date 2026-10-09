'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { MOCK_DRUGS, Drug } from '@/data/mockDrugs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Pill, ShieldAlert, RefreshCw } from 'lucide-react';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  category: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  severity: string;
  description: string;
}

export default function PolypharmacyPage() {
  const [selectedDrugIds, setSelectedDrugIds] = useState<string[]>(['digoxin', 'amiodarone', 'warfarin']);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const toggleDrug = (id: string) => {
    setSelectedDrugIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (!svgRef.current) return;

    // Filter drugs and construct graph nodes & links
    const activeDrugs = MOCK_DRUGS.filter((d) => selectedDrugIds.includes(d.id));

    const nodes: Node[] = activeDrugs.map((d) => ({
      id: d.id,
      name: d.name,
      category: d.category,
    }));

    const links: Link[] = [];
    const activeIds = new Set(activeDrugs.map((d) => d.id));

    activeDrugs.forEach((drug) => {
      drug.interactions.forEach((inter) => {
        if (activeIds.has(inter.targetDrugId)) {
          // Avoid duplicate bidirectional links in simple rendering
          const exists = links.some(
            (l) =>
              (l.source === drug.id && l.target === inter.targetDrugId) ||
              (l.source === inter.targetDrugId && l.target === drug.id)
          );
          if (!exists) {
            links.push({
              source: drug.id,
              target: inter.targetDrugId,
              severity: inter.severity,
              description: inter.description,
            });
          }
        }
      });
    });

    // Clear previous SVG contents
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 450;

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    if (nodes.length === 0) return;

    // Simulation setup
    const simulation = d3
      .forceSimulation<Node>(nodes)
      .force(
        'link',
        d3
          .forceLink<Node, Link>(links)
          .id((d) => d.id)
          .distance(180)
      )
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Render links (lines)
    const linkGroup = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', (d) => (d.severity === 'Severe' ? '#ef4444' : '#f59e0b'))
      .attr('stroke-width', 3)
      .attr('stroke-dasharray', (d) => (d.severity === 'Severe' ? '0' : '4'));

    // Render link label hover
    const linkText = svg
      .append('g')
      .selectAll('text')
      .data(links)
      .enter()
      .append('text')
      .text((d) => d.severity)
      .attr('fill', '#94a3b8')
      .attr('font-size', '10px')
      .attr('text-anchor', 'middle');

    // Render nodes (circles)
    const nodeGroup = svg
      .append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .call(
        d3
          .drag<SVGGElement, Node>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    nodeGroup
      .append('circle')
      .attr('r', 24)
      .attr('fill', '#059669')
      .attr('stroke', '#10b981')
      .attr('stroke-width', 3)
      .attr('class', 'cursor-pointer hover:scale-110 transition-transform');

    nodeGroup
      .append('text')
      .text((d) => d.name)
      .attr('dy', 40)
      .attr('text-anchor', 'middle')
      .attr('fill', '#f8fafc')
      .attr('font-size', '13px')
      .attr('font-weight', '600');

    // Update positions on tick
    simulation.on('tick', () => {
      linkGroup
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      linkText
        .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
        .attr('y', (d: any) => (d.source.y + d.target.y) / 2 - 6);

      nodeGroup.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });
  }, [selectedDrugIds]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-950/20">
          Phân Tích Đa Dược (Polypharmacy)
        </Badge>
        <h1 className="text-4xl font-extrabold text-slate-100">Đồ Thị Tương Tác Thuốc D3.js</h1>
        <p className="text-slate-400 text-sm">
          Chọn danh sách thuốc cần kê đơn đồng thời để kiểm tra mạng lưới tương tác chéo và mức độ cảnh báo độc tính.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Selection Sidebar */}
        <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-lg text-slate-100 flex items-center gap-2">
              <Pill className="h-5 w-5 text-emerald-400" />
              Chọn Danh Sách Thuốc
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Đánh dấu các thuốc bạn muốn phân tích tương tác mạng lưới.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {MOCK_DRUGS.map((drug) => {
              const isChecked = selectedDrugIds.includes(drug.id);
              return (
                <div
                  key={drug.id}
                  onClick={() => toggleDrug(drug.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-emerald-950/40 border-emerald-500/60 text-slate-100'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className="font-semibold text-sm">{drug.name}</p>
                    <p className="text-xs text-slate-500">{drug.category}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="h-4 w-4 rounded accent-emerald-500"
                  />
                </div>
              );
            })}

            <Button
              variant="outline"
              onClick={() => setSelectedDrugIds(['digoxin', 'amiodarone', 'warfarin', 'furosemide'])}
              className="w-full mt-4 border-slate-700 text-slate-300 hover:bg-slate-800 flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Tải Mẫu Đa Thuốc Tim Mạch</span>
            </Button>
          </CardContent>
        </Card>

        {/* D3 Graph Viewer */}
        <Card className="lg:col-span-2 bg-slate-900/60 border-slate-800 backdrop-blur-md overflow-hidden flex flex-col">
          <CardHeader className="border-b border-slate-800 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-slate-100 flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-400" />
                Mô Hình Mạng Lưới Tương Tác
              </CardTitle>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span> Nghiêm trọng (Severe)
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span> Trung bình (Moderate)
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-1 flex items-center justify-center bg-slate-950/50 min-h-[450px]">
            {selectedDrugIds.length > 0 ? (
              <svg ref={svgRef} className="w-full h-full max-h-[450px]" />
            ) : (
              <div className="text-center text-slate-500">
                <ShieldAlert className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>Hãy chọn ít nhất 1 thuốc để hiển thị đồ thị.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
