import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Network, Box } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/40 flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Hệ thống Đào tạo Dược lâm sàng
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Nền tảng giáo dục tương tác tích hợp Đồ thị tri thức Tương tác thuốc (DDI)
                và Mô phỏng quy trình Dược 3D.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/search">
                <Button size="lg" className="h-11">Bắt đầu tra cứu</Button>
              </Link>
              <Link href="/polypharmacy">
                <Button variant="outline" size="lg" className="h-11">Phân tích đa thuốc</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Activity className="h-6 w-6 text-primary" />
                  Tra cứu DDI
                </CardTitle>
                <CardDescription>
                  Tra cứu chi tiết tương tác thuốc dựa trên chứng cứ y khoa.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Phân tích mức độ, cơ chế và nhận giải thích chuyên sâu cho mục đích giáo dục từ hệ thống cơ sở dữ liệu tích hợp.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Network className="h-6 w-6 text-primary" />
                  Knowledge Graph
                </CardTitle>
                <CardDescription>
                  Khám phá đồ thị tương tác đa thuốc.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Trực quan hoá mạng lưới tương tác (Polypharmacy) bằng D3.js, giúp sinh viên nhận diện các điểm rủi ro.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Box className="h-6 w-6 text-primary" />
                  Mô phỏng 3D
                </CardTitle>
                <CardDescription>
                  Môi trường thực hành ảo sinh động.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tương tác với các mô hình dược cụ qua WebGL/Three.js, đánh giá thao tác thực hành lâm sàng.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
