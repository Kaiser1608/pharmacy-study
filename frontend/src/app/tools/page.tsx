'use client';

import React, { useState } from 'react';
import { MOCK_DRUGS } from '@/data/mockDrugs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Bot, Send, Sparkles, AlertTriangle } from 'lucide-react';

export default function ClinicalToolsPage() {
  // --- Dosage Calculator State ---
  const [weight, setWeight] = useState<number>(60);
  const [selectedDrugId, setSelectedDrugId] = useState<string>('digoxin');
  const [renalFunction, setRenalFunction] = useState<'normal' | 'impaired'>('normal');

  const drug = MOCK_DRUGS.find((d) => d.id === selectedDrugId) || MOCK_DRUGS[0];

  // Simple dosage logic calculation demo
  const calculatedDose = React.useMemo(() => {
    let base = weight * 0.0035; // mg/kg standard approximation for demo
    if (drug.id === 'warfarin') base = weight * 0.05;
    if (drug.id === 'amiodarone') base = 200;
    if (renalFunction === 'impaired') base *= 0.5;
    return base.toFixed(2);
  }, [weight, selectedDrugId, renalFunction, drug]);

  // --- AI Chatbot State ---
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    {
      sender: 'ai',
      text: 'Xin chào! Tôi là Trợ Lý Y Khoa AI (PharmaBot). Tôi có thể giúp bạn giải đáp các thắc mắc về cơ chế dược lý, tương tác thuốc DDI, hoặc gợi ý nguyên tắc kê đơn an toàn.',
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputMsg('');

    // Generate response mock logic
    setTimeout(() => {
      let aiResponse = 'Vấn đề chuyên môn này cần tham khảo chỉ định bác sĩ lâm sàng.';
      const lower = userText.toLowerCase();

      if (lower.includes('digoxin') || lower.includes('amiodarone')) {
        aiResponse =
          '⚠️ **Cảnh báo lâm sàng**: Amiodarone làm tăng nồng độ Digoxin trong huyết tương từ 70% - 100% do giảm độ thanh thải qua thận và P-glycoprotein. Khuyến cáo giảm 50% liều Digoxin và theo dõi nồng độ digoxin máu định kỳ.';
      } else if (lower.includes('warfarin')) {
        aiResponse =
          '🩸 **Lưu ý Warfarin**: Cần kiểm tra chỉ số INR mục tiêu (thường từ 2.0 - 3.0). Tránh phối hợp với NSAIDs/Aspirin do tăng nguy cơ xuất huyết tiêu hóa.';
      } else if (lower.includes('liều') || lower.includes('chỉnh liều')) {
        aiResponse =
          '⚕️ **Nguyên tắc tính liều**: Bệnh nhân suy thận (eGFR nhỏ hơn 30 mL/min) cần hiệu chỉnh giảm liều hoặc kéo dài khoảng cách giữa các lần dùng thuốc.';
      } else {
        aiResponse = `Hệ thống ghi nhận câu hỏi về: "${userText}". Dựa trên cơ sở dữ liệu Y Khoa, bạn nên kiểm tra kỹ các thông số dược động học (ADME) và chỉ số xét nghiệm liên quan.`;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 600);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="outline" className="border-cyan-500/40 text-cyan-300 bg-cyan-950/40 text-xs font-semibold uppercase tracking-wider">
          Công Cụ Lâm Sàng & Trợ Lý Y Khoa AI
        </Badge>
        <h1 className="text-4xl font-extrabold text-slate-50 tracking-tight">
          Máy Tính Liều Dùng & Pharma AI Chatbot
        </h1>
        <p className="text-slate-300 text-sm">
          Hỗ trợ tính toán liều dùng tham khảo theo cân nặng/chức năng thận và tương tác trực tiếp với AI chuyên ngành Y Dược.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Clinical Dosage Calculator */}
        <Card className="bg-slate-900 border-slate-700/80 shadow-2xl backdrop-blur-md flex flex-col justify-between">
          <CardHeader className="border-b border-slate-800 pb-4">
            <CardTitle className="text-xl text-slate-100 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-cyan-400" />
              Máy Tính Liều Dùng Thuốc Theo Thể Trạng
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Tính toán liều lượng khuyến cáo dựa trên cân nặng và chức năng lọc của thận.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-5 flex-1">
            {/* Select Drug */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Chọn Dược Chất Kê Đơn:
              </label>
              <select
                value={selectedDrugId}
                onChange={(e) => setSelectedDrugId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl p-3 text-sm focus:border-cyan-400 focus:outline-none"
              >
                {MOCK_DRUGS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Weight Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Cân Nặng Bệnh Nhân (kg):
              </label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                min={10}
                max={200}
                className="bg-slate-950 border-slate-700 text-slate-100 text-base"
              />
            </div>

            {/* Renal Function */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Chức Năng Thận (Renal Status):
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRenalFunction('normal')}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                    renalFunction === 'normal'
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-200'
                      : 'bg-slate-950 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  Bình Thường (eGFR &ge; 60)
                </button>
                <button
                  type="button"
                  onClick={() => setRenalFunction('impaired')}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                    renalFunction === 'impaired'
                      ? 'bg-amber-950 border-amber-500 text-amber-200'
                      : 'bg-slate-950 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  Suy Thận (eGFR &lt; 30)
                </button>
              </div>
            </div>

            {/* Calculated Result Box */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-500/40 space-y-2 shadow-inner">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Kết Quả Liều Khuyến Cáo Tham Khảo:
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-emerald-400">{calculatedDose}</span>
                <span className="text-sm text-slate-300 font-semibold">mg / ngày</span>
              </div>
              <p className="text-xs text-slate-400 border-t border-slate-800/80 pt-2">
                {renalFunction === 'impaired' && (
                  <span className="text-amber-400 flex items-center gap-1 font-medium">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Đã giảm 50% liều dùng do suy giảm chức năng thận.
                  </span>
                )}
                Liều cơ bản theo hồ sơ nhà sản xuất: {drug.dosage}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pharmacy AI Assistant Chatbot */}
        <Card className="bg-slate-900 border-slate-700/80 shadow-2xl backdrop-blur-md flex flex-col h-[520px]">
          <CardHeader className="border-b border-slate-800 pb-3">
            <CardTitle className="text-xl text-slate-100 flex items-center gap-2">
              <Bot className="h-5 w-5 text-cyan-400" />
              Trợ Lý Y Khoa AI (PharmaBot)
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Hỏi đáp trực tiếp về cơ chế dược lý, tương tác DDI và lưu ý lâm sàng.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-4 flex-1 overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center shrink-0">
                    <Sparkles className="h-4 w-4 text-cyan-400" />
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl text-sm max-w-[80%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-cyan-600 text-white font-medium rounded-br-none'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </CardContent>

          {/* Chat input form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
            <Input
              type="text"
              placeholder="Nhập câu hỏi (Ví dụ: Tương tác giữa Digoxin và Amiodarone...)"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="bg-slate-900 border-slate-700 text-slate-100 text-sm"
            />
            <Button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
