'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Pill, Search, Activity, Box, Sparkles, GraduationCap, Calculator } from 'lucide-react';

export default function NavBar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Trang Chủ', href: '/', icon: Sparkles },
    { name: 'Tra Cứu Dược Chất', href: '/search', icon: Search },
    { name: 'Đồ Thị Polypharmacy', href: '/polypharmacy', icon: Activity },
    { name: 'Mô Phỏng 3D', href: '/simulation', icon: Box },
    { name: 'Công Cụ Y Khoa & AI', href: '/tools', icon: Calculator },
    { name: 'Luyện Tập Quiz', href: '/quiz', icon: GraduationCap },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 border-b border-slate-800 backdrop-blur-lg shadow-lg">
      <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 text-slate-950 font-bold shadow-md shadow-cyan-950 group-hover:scale-105 transition-transform">
            <Pill className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Pharmacy Study
            </span>
            <span className="text-[10px] text-cyan-400/80 font-medium tracking-widest uppercase">
              Nền Tảng Dược Lý Học
            </span>
          </div>
        </Link>

        {/* Navigation items */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-950'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
