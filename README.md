# CraftLink — Sàn sản phẩm sáng tạo tùy biến (BTL-11, CSE122)

> **Học phần:** PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN – CSE122  
> **Nhóm thực hiện:** Nhóm 11 – Lớp 67KTPM2  
> **Thực thi:** Frontend thuần (`HTML semantic` + `CSS thuần 3 tầng` + `JS thuần const/let/IIFE`), dữ liệu hạt nhân `mock JSON` + lớp phủ lưu trữ `LocalStorage`, mô phỏng 3 trải nghiệm AI ở Frontend qua `mockAI` (độ trễ 800–1500ms, tỷ lệ lỗi 10%).

---

## 1. Khởi chạy & Trải nghiệm nhanh

Chạy máy chủ tĩnh cục bộ bằng lệnh:

```bash
npx serve .
```

hoặc mở `index.html` bằng tiện ích **Live Server** trên VSCode.

### Thông tin kiểm thử đa vai trò (Demo Roles):

Truy cập `pages/login.html` và sử dụng các tài khoản mẫu dưới đây (mật khẩu bất kỳ $\ge 6$ ký tự):

- **Khách hàng (Buyer):** `buyer@demo.vn` (hoặc `buyer@craftlink.vn`)
- **Nghệ nhân (Maker):** `maker@demo.vn` (hoặc `maker@craftlink.vn`)
- **Kiểm duyệt viên (Moderator):** `mod@demo.vn` (hoặc `mod@craftlink.vn`)
- **Quản trị viên (Admin):** `admin@demo.vn` (hoặc `admin@craftlink.vn`)

### Điểm nhấn trải nghiệm:

- **Trang chủ (`index.html`):** Hero gradient + thống kê sàn (Stats) + thanh cuộn danh mục (Pills) + nghệ nhân tiêu biểu (Featured Makers) + nút kêu gọi mở gian hàng (CTA). Dữ liệu tải động trực tiếp từ `assets/data/*.json`. Tìm kiếm và lọc theo danh mục hoạt động thực tế.
- **Kiểm tra phân quyền Client (Auth Guard):** Đăng nhập quyền `buyer`, sau đó gõ URL vào trang quản trị `pages/admin-platform-dashboard.html` -> Hệ thống tự động chặn và chuyển hướng về trang cấm quyền `pages/403.html`.
- **Kiểm thử xử lý lỗi (?fail=1):** Thêm tham số `?fail=1` trên URL để kiểm tra giao diện xử lý lỗi và nút Thử lại:
  - `pages/buyer-orders.html?fail=1`
  - `pages/admin-platform-dashboard.html?fail=1`

---

## 2. Bối cảnh & Phát biểu vấn đề (Theo project-proposal)

Sản phẩm thủ công và sáng tạo cần nhiều vòng trao đổi yêu cầu ($\text{Brief} \rightarrow \text{Proposal} \rightarrow \text{Revision} \rightarrow \text{Đơn hàng}$), nhưng các sàn thương mại điện tử thông thường chỉ tối ưu cho sản phẩm cố định (đăng hàng, chốt giá, giao hàng).

- **P1 (Khách hàng):** Khó diễn đạt yêu cầu tùy biến (màu, kích thước, chất liệu, ngân sách, hạn chót rời rạc).
- **P2 (Nghệ nhân):** Nhận brief rời rạc qua tin nhắn mạng xã hội, phải hỏi lại nhiều vòng, dễ sót ý.
- **P3 (Vòng đời đơn):** Khó theo dõi vòng proposal/revision (phiên bản chồng chéo, không rõ đầu việc nào đã chốt).
- **P4 (Vận hành sàn):** Nền tảng cần công cụ kiểm duyệt listing vi phạm và xử lý báo cáo, phản ánh của người dùng.

---

## 3. Cấu trúc thư mục dự án

```text
cse122-craftlink/
├── README.md               # Tài liệu giới thiệu & Hướng dẫn sử dụng
├── index.html              # Trang chủ sàn CraftLink
├── docs/                   # Hồ sơ tài liệu & Thuyết minh đồ án
│   ├── BTL-11_craftlink.md # Báo cáo học phần CSE122 chuẩn mực
│   ├── screen-list.md      # Bảng kiểm kê 22 màn hình + ma trận trạng thái (State coverage)
│   ├── team-assignment.md  # Phân công nhiệm vụ & Trách nhiệm chéo 3 thành viên
│   ├── BAO-CAO-TONG-QUAN-VA-VAN-DAP-BTL.md # Báo cáo tổng hợp
│   └── BAO-CAO-CA-NHAN-SANG.md         # Báo cáo cá nhân chi tiết của Sáng
├── design/                 # Hồ sơ thiết kế Figma
│   ├── figma-link.txt      # Nguồn tham khảo + Ghi chú chuyển đổi
│   └── mockups/            # PNG mockup Figma duyệt (Bằng chứng thiết kế chuẩn)
├── assets/
│   └── data/               # Dữ liệu hạt nhân (8 JSON: listings, briefs, proposals, orders, revisions, categories, users, reports)
├── css/
│   ├── base/
│   │   └── base.css        # Tokens (:root), CSS Reset (*, [hidden]), Typography nền tảng
│   ├── components/
│   │   └── style.css       # UI Components dùng chung (top-nav, bottom-nav, card, badge, tabs, modal, toasts...)
│   └── pages/              # CSS chuyên biệt từng trang (dashboard, queue, reports, seller, users...)
├── js/
│   ├── api.js              # Mock API client (all, saveAll, mockAI độ trễ 800-1500ms)
│   ├── modules/            # Modules chức năng dùng chung
│   │   ├── guard.js        # Auth Guard & Role checker (chặn URL chuyển hướng 403/login)
│   │   ├── ui-state.js     # Trình quản lý trạng thái render UI (loading, empty, error, toast)
│   │   ├── escape.js       # Xử lý escapeHTML chống XSS
│   │   ├── bottom-nav.js   # Module điều hướng đáy cho thiết bị di động
│   │   ├── ai-brief.js     # AI-1: Phân tích & Bóc tách Brief ý tưởng
│   │   ├── ai-match.js     # AI-2: Gợi ý nghệ nhân phù hợp (Style & Capacity Matcher)
│   │   └── ai-revision.js  # AI-3: Tóm tắt yêu cầu hiệu chỉnh & Đề xuất phương án
│   └── pages/              # JS nghiệp vụ từng trang (IIFE độc lập, LocalStorage bền bỉ)
└── pages/                  # 21 trang chức năng theo vai trò và dùng chung
```

---

## 4. Danh sách 22 màn hình & Phân công nhiệm vụ (Theo screen-list & roles-and-features)

Nguyên tắc: Mỗi thành viên chịu trách nhiệm trọn vẹn luồng màn hình của mình từ Mockup $\rightarrow$ HTML $\rightarrow$ CSS $\rightarrow$ JS $\rightarrow$ Data $\rightarrow$ Responsive $\rightarrow$ Video OBS.

### 4.1. Nhánh Khách hàng (Buyer) — SV1 (Huy)

- `pages/buyer-marketplace.html`: Dạo chợ, duyệt listing, lọc category/giá (Read + AI-2 Style Matcher).
- `pages/buyer-custom-brief.html`: Tạo brief tùy biến tự do hoặc theo mẫu (Create/Read/Update + AI-1 Brief Builder).
- `pages/buyer-orders.html`: Xem danh sách đơn, theo dõi tiến độ, xem revision, hủy đơn (C/R/U/D Hủy + AI-3 Revision Summarizer).
- Các trang xác thực & khởi đầu: `index.html` (Trang chủ), `pages/login.html` (Đăng nhập), `pages/register.html` (Đăng ký), `pages/forgot-password.html` (Quên mật khẩu).

### 4.2. Nhánh Nghệ nhân (Maker) — SV2 (Sơn)

- `pages/maker-listing-management.html`: Quản lý sản phẩm xưởng, tạo mới, chỉnh sửa, lưu trữ (Create/Read/Update/Archive).
- `pages/maker-brief-inbox.html`: Hộp thư tiếp nhận brief khách hàng, xem phân tích AI-1 đính kèm, nhận/từ chối (Read/Update).
- `pages/maker-proposal-editor.html`: Soạn báo giá và giải pháp kỹ thuật theo version gửi duyệt (Create/Read/Update/Archive + AI-3 gợi ý chi phí).
- Các trang tài khoản & tiện ích: `pages/profile.html` (Hồ sơ), `pages/notifications.html` (Thông báo), `pages/settings.html` (Cài đặt), `pages/404.html` (Trang không tìm thấy).

### 4.3. Nhánh Quản trị (Admin) & Kiểm duyệt (Moderator) — SV3 (Sáng - Trưởng nhóm)

- `pages/admin-platform-dashboard.html`: Tổng hợp số liệu brief/order/revision, biểu đồ doanh thu theo danh mục, bắt sự kiện đa tab real-time (Read + Insight tổng hợp).
- `pages/admin-category-management.html`: Quản lý danh mục ngành hàng, tự sinh slug SEO, liên kết số lượng listing, lưu trữ/khôi phục (Create/Read/Update/Archive).
- `pages/admin-user-management.html`: Quản lý tài khoản, lọc vai trò, tìm kiếm, khóa/mở khóa tài khoản, chặn khóa tài khoản Admin (Create/Read/Update/Disable).
- `pages/moderator-moderation-queue.html`: Hàng chờ duyệt sản phẩm mới, lọc tab, duyệt/từ chối đơn lẻ, duyệt hàng loạt qua checkbox (Read/Update).
- `pages/moderator-report-center.html`: Tiếp nhận và xử lý báo cáo khiếu nại qua máy trạng thái 3 bước (Create/Read/Update).
- `pages/moderator-content-guidelines.html`: Bảng quy chuẩn nội dung và hình ảnh sản phẩm (Create/Read/Update/Delete).
- `pages/seller-register.html`: Đăng ký gian hàng Maker 3 bước, validate form, giả lập thanh toán nâng quyền tài khoản (Create/Read).
- `pages/403.html`: Màn hình thông báo cấm quyền truy cập khi vi phạm Auth Guard.
- **Trách nhiệm chéo Leader:** Chuẩn hóa CSS 3 tầng (`base.css`, `components/style.css`), thiết kế Responsive Mobile 390px (`bottom-nav`), xây dựng `guard.js`, rà soát và merge toàn bộ Pull Request.

---

## 5. Đặc tả kỹ thuật & Trải nghiệm nghiệp vụ cốt lõi

1. **Phân tầng CSS 3 lớp:** Loại bỏ 100% tình trạng ghi đè hoặc xung đột style giữa các thành viên. Mọi thành viên chỉ cần liên kết `base.css` + `components/style.css` là có đầy đủ bộ nhận diện, màu sắc, typography và linh kiện dùng chung.
2. **Quản trị State & Dữ liệu bền vững:** Dữ liệu khởi tạo từ các file JSON trong `assets/data/`, sau đó được đồng bộ và lưu trữ bền bỉ trong `localStorage` theo khóa định danh `craftlink_*_v1`. Mọi thao tác CRUD đều có hiệu lực tức thì và duy trì sau khi tải lại trang.
3. **Đồng bộ thời gian thực đa cửa sổ (Multi-tab Sync):** Dashboard tự động cập nhật số liệu và vẽ lại biểu đồ khi Moderator hoặc Admin thao tác ở cửa sổ khác nhờ cơ chế bắt sự kiện `window.addEventListener("storage", ...)`.
4. **Trải nghiệm di động chuẩn mực (Mobile 390px):** Trên màn hình nhỏ ($\le 600\text{px}$), hệ thống tự động ẩn menu đầu trang và kích hoạt thanh điều hướng đáy cố định (**Bottom Navigation**) hỗ trợ vùng bấm ngón cái (Thumb Zone), đảm bảo độ rộng màn hình luôn đạt chuẩn `docScrollW == innerWidth` (tràn ngang $0\text{px}$).
5. **Mô phỏng 3 tính năng AI:**
   - **AI-1 (Brief Builder):** Tự động bóc tách đoạn văn tự do của khách hàng thành các thuộc tính kỹ thuật có cấu trúc (chất liệu, kích thước, ngân sách, deadline).
   - **AI-2 (Style Matcher):** Tính điểm phù hợp giữa yêu cầu của khách hàng với năng lực và phong cách của xưởng thủ công.
   - **AI-3 (Revision Summarizer):** Tóm tắt các yêu cầu chỉnh sửa của khách và đề xuất giải pháp kỹ thuật kèm dự toán chi phí.
