# Palette Thiết Kế Màu Sắc Y Khoa & Dược Học (Pharmacy Study Color Plan)

## 🎨 1. Định Hướng Nghệ Thuật & Nguyên Tắc Tương Phản (Design Philosophy)

Hiện tại giao diện bị cảm giác **"bị chìm"** do sử dụng quá nhiều tông màu tối gần nhau (`slate-900`, `slate-950`, `emerald-950`). 

Để ứng dụng vừa thể hiện sự **chuyên nghiệp, đáng tin cậy của ngành Y - Dược (Clinical & Scientific)** vừa có **độ nổi bật và tương phản cao (High-Contrast Clean UI)**, chúng ta sẽ áp dụng hệ màu chủ đạo:

- **Primary Brand (Chủ đạo Y Dược):** **Teal / Medical Cyan** (`#0ea5e9` - `#0284c7` & `#0d9488`). Mang lại cảm giác khoa học y học hiện đại, tinh khiết, minh bạch.
- **Secondary / Accent (Dược Lý & Sinh Học):** **Emerald Green** (`#10b981`). Đại diện cho thảo dược, sinh học tế bào và sự sống.
- **Background & Card Surfaces (Bề mặt & Độ tương phản):** Chuyển từ nền xám tối chìm sang **Deep Navy Slate** (`#0f172a` / `#1e293b`) làm nền, kết hợp với các card sáng màu nhẹ hơn hoặc các mảng khung nổi bật viền rõ ràng (High-Contrast borders `#334155`), tạo độ sâu và phân tầng rõ rệt (Z-axis depth).
- **Functional Status Colors (Cảnh báo Y Khoa):**
  - 🚨 **Cảnh báo nguy hiểm (Severe Interaction):** Bright Crimson Red (`#ef4444` / `#f87171`)
  - ⚠️ **Cảnh báo trung bình (Moderate Interaction):** Clinical Amber/Orange (`#f59e0b` / `#fbbf24`)
  - ℹ️ **Thông tin chỉ định (Clinical Info):** Vivid Cyan Blue (`#38bdf8`)

---

## 🖌️ 2. Chi Tiết Palette Màu Sắc (Color Tokens)

| Vai Trò (Role) | Tên Màu Tailwind | Mã Hex | Ứng Dụng Trong Giao Diện |
| :--- | :--- | :--- | :--- |
| **Nền Nền Trang (Main BG)** | `bg-slate-950` / `#090d16` | `#090d16` | Nền tổng thể ứng dụng, rất sâu nhưng không chìm |
| **Bề Mặt Card (Card Surface)** | `bg-slate-900/90` | `#1e293b` | Thẻ thuốc, hộp công cụ, tạo mảng phân biệt rõ ràng |
| **Viền Phân Tầng (Border)** | `border-slate-700/60` | `#475569` | Viền các card, ô tìm kiếm giúp tách biệt với nền |
| **Màu Nhấn Chính (Primary)** | `cyan-500` / `teal-500` | `#06b6d4` | Button chính, Tiêu đề thương hiệu, Icon nổi bật |
| **Màu Nhấn Phụ (Secondary)**| `emerald-400` | `#34d399` | Tag phân loại thuốc, trạng thái an toàn, đồ thị D3 |
| **Văn Bản Chính (Text Primary)**| `text-slate-50` | `#f8fafc` | Tiêu đề lớn, chữ trên thẻ (Tương phản tối đa) |
| **Văn Bản Phụ (Text Muted)** | `text-slate-300` | `#cbd5e1` | Nội dung mô tả, cơ chế hoạt động |

---

## 🛠️ 3. Kế Hoạch Áp Dụng Cho Các Component

### A. Navigation Bar & Header
- Đổi từ tông tối nhạt sang nền `bg-slate-900/90 border-b border-slate-800`.
- Nổi bật Logo với hiệu ứng Gradient Y Dược: `from-cyan-400 to-emerald-400`.
- Các tab active chuyển sang nút có viền nổi `bg-cyan-500/10 text-cyan-400 border border-cyan-500/30`.

### B. Trang Tra Cứu (`/search`)
- Ô tìm kiếm nổi bật hẳn với viền `border-slate-600 focus:border-cyan-400` và icon `text-cyan-400`.
- Card thuốc: Nền `bg-slate-900`, viền `border-slate-800 hover:border-cyan-500/50`.
- Thêm hiệu ứng đổ bóng mờ (Glow Effect) khi hover: `hover:shadow-cyan-950/40`.

### C. Đồ Thị Tương Tác D3 (`/polypharmacy`)
- Đồ thị D3: Node đại diện cho thuốc có màu sáng rõ `cyan-400` với viền phát sáng `emerald-400`.
- Nút liên kết nguy cơ Severe dùng màu Đỏ Tươi (`#f87171`) với nét đứt/nét liền rõ ràng.

### D. Mô Phỏng 3D (`/simulation`)
- Đèn chiếu sáng trong Canvas 3D tăng cường độ (Intensity 1.5) để mô hình phân tử nổi bật sắc nét trên nền tối.

---

## 📋 4. Các Bước Thực Hiện Refactor Màu Sắc
1. Cập nhật `globals.css` định nghĩa các biến màu chuẩn Y Dược.
2. Cập nhật `NavBar.tsx` cho sắc nét, độ tương phản cao.
3. Cập nhật `search/page.tsx` và `drug/[id]/page.tsx`.
4. Cập nhật đồ thị D3 `polypharmacy/page.tsx` và 3D Canvas `simulation/page.tsx`.
