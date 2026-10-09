'use client';

import React, { useState } from 'react';
import { MOCK_QUIZZES, QuizQuestion } from '@/data/mockQuizzes';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, ArrowRight, BookOpen } from 'lucide-react';

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuiz: QuizQuestion = MOCK_QUIZZES[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    if (selectedOption === currentQuiz.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < MOCK_QUIZZES.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      {/* Page Title Header */}
      <div className="text-center space-y-3">
        <Badge variant="outline" className="border-cyan-500/40 text-cyan-300 bg-cyan-950/40 text-xs font-semibold uppercase tracking-wider">
          Góc Luyện Tập Sinh Viên Y Dược
        </Badge>
        <h1 className="text-4xl font-extrabold text-slate-50 tracking-tight">Trắc Nghiệm Dược Lý Lâm Sàng</h1>
        <p className="text-slate-300 text-sm">
          Kiểm tra kiến thức về phân loại thuốc, cơ chế tác dụng, chỉ số xét nghiệm và tương tác dược lý.
        </p>
      </div>

      {!isFinished ? (
        <Card className="bg-slate-900 border-slate-700/80 shadow-2xl backdrop-blur-md overflow-hidden">
          {/* Progress Bar Header */}
          <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-cyan-400" />
              <span className="text-slate-200 font-semibold text-sm">
                Câu hỏi {currentIndex + 1} / {MOCK_QUIZZES.length}
              </span>
            </div>
            <Badge className="bg-cyan-950 text-cyan-300 border-cyan-800">
              {currentQuiz.category}
            </Badge>
          </div>

          <CardContent className="p-6 md:p-8 space-y-6">
            {/* Question title */}
            <h2 className="text-xl md:text-2xl font-bold text-slate-100 leading-snug">
              {currentQuiz.question}
            </h2>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuiz.options.map((option, idx) => {
                let optionStyle = 'bg-slate-950/80 border-slate-700 text-slate-200 hover:border-slate-500';

                if (selectedOption === idx) {
                  optionStyle = 'bg-cyan-950/60 border-cyan-400 text-cyan-200 font-semibold';
                }

                if (isAnswered) {
                  if (idx === currentQuiz.correctAnswer) {
                    optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                  } else if (selectedOption === idx && idx !== currentQuiz.correctAnswer) {
                    optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                  }
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 border border-slate-700">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm md:text-base">{option}</span>
                    </div>

                    {isAnswered && idx === currentQuiz.correctAnswer && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && selectedOption === idx && idx !== currentQuiz.correctAnswer && (
                      <XCircle className="h-5 w-5 text-rose-400 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Explanation box after answer */}
            {isAnswered && (
              <div className="bg-slate-950 p-5 rounded-xl border border-cyan-800/60 space-y-2 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                  <BookOpen className="h-4 w-4" />
                  <span>Giải Thích Chuyên Môn Y Khoa:</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentQuiz.explanation}
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter className="p-6 bg-slate-950/40 border-t border-slate-800 flex justify-end gap-3">
            {!isAnswered ? (
              <Button
                disabled={selectedOption === null}
                onClick={handleSubmitAnswer}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-6"
              >
                Xác Nhận Đáp Án
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-2 px-6"
              >
                <span>{currentIndex + 1 < MOCK_QUIZZES.length ? 'Câu Tiếp Theo' : 'Xem Kết Quả'}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      ) : (
        /* Result Card */
        <Card className="bg-slate-900 border-slate-700/80 shadow-2xl p-8 text-center space-y-6 max-w-xl mx-auto">
          <div className="p-4 bg-cyan-950/60 border border-cyan-500/40 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
            <Award className="h-10 w-10 text-cyan-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-100">Hoàn Thành Bài Trắc Nghiệm!</h2>
            <p className="text-slate-400 text-sm">Kết quả của bạn đã được đánh giá theo chuẩn Dược lý Lâm sàng.</p>
          </div>

          <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Điểm số đạt được</span>
            <p className="text-4xl font-extrabold text-emerald-400">
              {score} / {MOCK_QUIZZES.length}
            </p>
            <p className="text-xs text-slate-400">
              Tỷ lệ chính xác: {Math.round((score / MOCK_QUIZZES.length) * 100)}%
            </p>
          </div>

          <Button
            onClick={handleRestart}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold flex items-center justify-center gap-2 py-3"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Làm Lai Bài Trắc Nghiệm</span>
          </Button>
        </Card>
      )}
    </div>
  );
}
