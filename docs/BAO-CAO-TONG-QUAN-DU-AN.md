# BÁO CÁO TỔNG QUAN DỰ ÁN CRAFTLINK (CSE122)

> **Học phần:** Phát triển ứng dụng Web cơ bản (CSE122)  
> **Đề tài:** CraftLink – Sàn thương mại điện tử kết nối sản phẩm thủ công & sáng tạo tùy biến (Creator Commerce)  
> **Lớp:** 67KTPM2 – Nhóm: 11  
> **Nhóm sinh viên thực hiện:** 3 thành viên
>
> - **Nguyễn Quang Sáng (Trưởng nhóm):** Phụ trách Admin, Moderator, Đăng ký Seller, Kiến trúc CSS toàn cục, Auth Guard, Tích hợp & Phát hành.
> - **Ngô Quốc Huy:** Phụ trách Buyer (Marketplace, Orders, Custom Brief) & Auth Flow (Login, Register).
> - **Mai Đình Sơn:** Phụ trách Maker (Listing Management, Brief Inbox, Proposal Editor), Profile & Trải nghiệm AI.  
>   **Phiên bản hệ thống:** MVP v1.0

---

## MỤC LỤC TỔNG QUAN

1. [GIỚI THIỆU ĐỀ TÀI & BỐI CẢNH DỰ ÁN](#1-giới-thiệu-đề-tài--bối-cảnh-dự-án)
   - 1.1. Bối cảnh thực tế & Tính cấp thiết
   - 1.2. Phát biểu vấn đề (Problem Statements)
   - 1.3. Mục tiêu giải pháp của CraftLink (Objectives)
2. [CÁC VAI TRÒ & LUỒNG NGHIỆP VỤ ĐẦY ĐỦ (END-TO-END FLOWS)](#2-các-vai-trò--luồng-nghiệp-vụ-đầy-đủ-end-to-end-flows)
   - 2.1. Ma trận 4 vai trò (Buyer, Maker, Moderator, Admin)
   - 2.2. Luồng nghiệp vụ tương tác chéo cốt lõi
3. [KIẾN TRÚC KỸ THUẬT & TỔ CHỨC MÃ NGUỒN FRONTEND](#3-kiến-trúc-kỹ-thuật--tổ-chức-mã-nguồn-frontend)
   - 3.1. Phân tầng CSS 3 lớp (Base - Components - Pages)
   - 3.2. Mô hình Module hóa JavaScript & Quản trị State dữ liệu
   - 3.3. Cơ chế Auth Guard & Phân quyền phía Client
   - 3.4. Mô phỏng trải nghiệm AI (AI-Powered Features)
4. [TỔ CHỨC LÀM VIỆC NHÓM & QUY TRÌNH PHÁT TRIỂN PHẦN MỀM](#4-tổ-chức-làm-việc-nhóm--quy-trình-phát-triển-phần-mềm)
   - 4.1. Phân công nhiệm vụ chi tiết theo vai trò
   - 4.2. Quy trình Git Flow (1 Task = 1 Feature Branch = 1 Pull Request)
   - 4.3. Bảng kiểm kê 22 màn hình & Nguyên tắc minh chứng (OBS + Commit)
5. [TỔNG KẾT & ĐÁNH GIÁ MỨC ĐỘ HOÀN THIỆN ĐỒ ÁN](#5-tổng-kết--đánh-giá-mức-độ-hoàn-thiện-đồ-án)

---

## 1. GIỚI THIỆU ĐỀ TÀI & BỐI CẢNH DỰ ÁN

### 1.1. Bối cảnh thực tế & Tính cấp thiết

Thị trường đồ thủ công mỹ nghệ, quà tặng cá nhân hóa và sản phẩm sáng tạo tại Việt Nam có tiềm năng rất lớn. Tuy nhiên, các sàn thương mại điện tử truyền thống (Shopee, Lazada, TikTok Shop) chỉ tối ưu cho các sản phẩm công nghiệp sản xuất hàng loạt với thông số cố định: chọn phân loại -> bấm mua ngay -> giao hàng.

Đối với sản phẩm thủ công / handmade / đặt làm riêng:

- Người mua muốn thay đổi kích thước, khắc tên, phối màu, lựa chọn chất liệu.
- Quá trình này đòi hỏi **vòng trao đổi yêu cầu (Briefing)**, thương lượng giải pháp và báo giá (**Proposal**), cũng như duyệt các bản phác thảo chỉnh sửa (**Revision**).

### 1.2. Phát biểu vấn đề (Problem Statements)

- **P1 (Khách hàng):** Khó diễn đạt ý tưởng và yêu cầu kỹ thuật cá nhân hóa cho nghệ nhân; sợ bị báo giá chênh lệch hoặc thành phẩm không như kỳ vọng.
- **P2 (Nghệ nhân / Thợ thủ công):** Nhận brief khách hàng qua tin nhắn mạng xã hội rời rạc, dễ thất lạc yêu cầu, tốn nhiều thời gian tư vấn giải thích quy chuẩn gia công.
- **P3 (Vòng đời đơn hàng tùy biến):** Thiếu một quy trình chuẩn hóa từ khâu: Gửi brief -> Báo giá/Kế hoạch -> Tạm ứng/Thanh toán -> Cập nhật tiến độ gia công -> Giao hàng.
- **P4 (Vận hành & Uy tín nền tảng):** Nguy cơ hàng giả, hàng nhái mẫu mã từ internet, hình ảnh stock lừa dối khách hàng, và việc giải quyết các khiếu nại tranh chấp phát sinh giữa người mua và người bán.

### 1.3. Mục tiêu giải pháp của CraftLink (Objectives)

- **O1:** Xây dựng một nền tảng Web Frontend nguyên mẫu hoàn chỉnh (22 màn hình), mô phỏng trọn vẹn luồng giao dịch sản phẩm tùy biến.
- **O2:** Tách biệt rõ ràng 4 nhóm vai trò nghiệp vụ với giao diện và quyền hạn chuyên biệt.
- **O3:** Thao tác CRUD thực chất gắn liền với trạng thái nghiệp vụ (State Machine) thay vì bảng nhập liệu đơn thuần.
- **O4:** Tích hợp 3 điểm chạm AI Frontend (Soạn brief thông minh, Gợi ý ghép nối nghệ nhân phù hợp, Hỗ trợ xử lý yêu cầu chỉnh sửa).
- **O5:** Tuân thủ tiêu chuẩn kỹ thuật công nghiệp: Thiết kế theo chuẩn Figma, CSS phân tầng không xung đột, Responsive từ Mobile 390px đến Desktop 1440px.

---

## 2. CÁC VAI TRÒ & LUỒNG NGHIỆP VỤ ĐẦY ĐỦ (END-TO-END FLOWS)

### 2.1. Ma trận 4 vai trò

```
+-----------------------------------------------------------------------------------+
|                                  CRAFTLINK ECOSYSTEM                              |
+-------------------------+-------------------------+-------------------------------+
| VAI TRÒ                 | MÀN HÌNH CHÍNH          | TRÁCH NHIỆM & NGHIỆP VỤ CHÍNH |
+-------------------------+-------------------------+-------------------------------+
| 1. Khách hàng (Buyer)   | - buyer-marketplace     | - Khám phá sản phẩm độc bản   |
|                         | - buyer-custom-brief    | - Tạo yêu cầu tùy biến (Brief)|
|                         | - buyer-orders          | - Theo dõi tiến độ đơn hàng   |
+-------------------------+-------------------------+-------------------------------+
| 2. Nghệ nhân (Maker)    | - maker-listing-mgmt    | - Quản lý sản phẩm & tồn kho  |
|                         | - maker-brief-inbox     | - Nhận brief khách, gửi báo giá|
|                         | - maker-proposal-editor | - Phản hồi chỉnh sửa (Revision)|
+-------------------------+-------------------------+-------------------------------+
| 3. Kiểm duyệt (Mod)     | - moderator-queue       | - Kiểm duyệt listing mới đăng |
|                         | - moderator-report-cntr | - Xử lý báo cáo gian lận/hàng|
|                         | - moderator-guidelines  | - Quản lý quy chuẩn nội dung  |
+-------------------------+-------------------------+-------------------------------+
| 4. Quản trị viên (Admin)| - admin-dashboard       | - Theo dõi doanh thu & KPI sàn|
|                         | - admin-category-mgmt   | - Phân loại danh mục/taxonomy |
|                         | - admin-user-mgmt       | - Quản trị & khóa tài khoản   |
+-------------------------+-------------------------+-------------------------------+
```

### 2.2. Luồng nghiệp vụ tương tác chéo cốt lõi (Cross-Role Flows)

#### Luồng 1: Vòng đời sản phẩm từ đăng bán đến lên sàn

```
[Maker] Tạo Listing mới
  → Status: 'pending' (Lưu trữ listings.json / LocalStorage)
    → [Moderator] Nhận thông báo trong Hàng chờ duyệt (moderation-queue)
      → Xem xét nội dung & ảnh đối chiếu với Quy chuẩn (content-guidelines)
        → DUYỆT: Listing chuyển status: 'active' → Xuất hiện trên Sàn (buyer-marketplace)
        → TỪ CHỐI: Listing chuyển status: 'rejected' + lý do vi phạm.
```

#### Luồng 2: Quy trình đặt hàng tùy biến (Custom Order Lifecycle)

```
[Buyer] Gửi yêu cầu tùy biến (buyer-custom-brief) [AI Hỗ trợ chuẩn hóa brief]
  → Status: 'brief_submitted'
    → [Maker] Nhận Brief trong Hộp thư (brief-inbox) [AI Đánh giá tính khả thi]
      → [Maker] Soạn đề xuất & báo giá (proposal-editor) → Status: 'proposal_sent'
        → [Buyer] Xem báo giá: Chấp thuận & Thanh toán → Status: 'in_making'
          → [Maker] Cập nhật hình ảnh thành phẩm hoàn thiện
            → [Buyer] Yêu cầu chỉnh sửa hoặc Xác nhận nhận hàng → Đơn hàng 'completed'.
```

#### Luồng 3: Kiểm soát gian lận & Xử lý phản ánh

```
[Buyer / Người dùng] Gửi khiếu nại sản phẩm/cửa hàng
  → [Moderator] Tiếp nhận trong Trung tâm báo cáo (report-center)
    → Chuyển trạng thái 'handling' → Xác minh chứng cứ
      → Nếu phát hiện vi phạm nghiêm trọng: Chuyển yêu cầu khóa tài khoản sang [Admin]
        → [Admin] Khóa tài khoản trong admin-user-management (Khóa Maker gian lận)
          → Báo cáo chuyển sang trạng thái 'done'.
```

---

## 3. KIẾN TRÚC KỸ THUẬT & TỔ CHỨC MÃ NGUỒN FRONTEND

### 3.1. Phân tầng CSS 3 lớp (3-Layer Architecture)

Nhóm giải quyết triệt để vấn đề "xung đột style khi làm việc nhóm" bằng kiến trúc 3 tầng:

1. **Tầng 1 - `css/base/base.css`:**
   - Chứa toàn bộ Design Tokens thông qua biến CSS `:root` (`--primary`, `--bg`, `--card`, `--text`, `--muted`, `--border`, `--radius`, `--shadow`).
   - Thiết lập CSS Reset toàn cục (`box-sizing: border-box`, `[hidden] { display: none !important }`, cấu hình typography font-sans).
2. **Tầng 2 - `css/components/style.css` (Style dùng chung đã chuẩn hóa):**
   - Chứa 100% các thành phần UI dùng chung trong toàn bộ 22 trang: hệ thống nút bấm (`.btn--*`), thẻ badge đa trạng thái (`.badge--*`), bảng biểu (`.table`), modal, tabs, toasts thông báo, utilities spacing (`.u-mb16`, `.u-flex1`...), responsive breakpoints (1024px, 900px, 600px mobile).
   - Đảm bảo các thành viên chỉ import file này mà không lo bị lệch màu hay thiếu component.
3. **Tầng 3 - `css/pages/<trang>.css` (Style riêng biệt):**
   - Chỉ được tạo khi trang đó có bố cục đặc thù (vd: `dashboard.css`, `seller.css`, `queue.css`). Tuyệt đối không viết đè lên component chung.

### 3.2. Mô hình Module hóa JavaScript & Quản trị State dữ liệu

- **Dữ liệu hạt nhân (Seed Data):** Hệ thống mock API thông qua các tệp JSON tĩnh trong `assets/data/` (`listings.json`, `categories.json`, `users.json`, `reports.json`, `orders.json`, `briefs.json`).
- **Lưu trữ trạng thái (Client State):**
  - Mọi thao tác CRUD được đọc và ghi bền vững qua `localStorage` theo tiền tố version hóa: `craftlink_<entity>_v1` (vd: `craftlink_categories_v1`, `craftlink_session_v1`).
  - Thiết kế hàm Fallback: Nếu `localStorage` chưa có dữ liệu, tự động nạp từ `assets/data/*.json` và cache vào `localStorage`.
- **Cơ chế Phản ứng Đa tab (Multi-tab Synchronization):**
  - Sử dụng sự kiện `window.addEventListener("storage", ...)` trên Dashboard: Khi Quản trị viên duyệt bài hoặc khóa user ở tab này, tab Dashboard tự động tính toán lại KPI theo thời gian thực mà không cần F5.

### 3.3. Cơ chế Auth Guard & Phân quyền phía Client

Tệp module `js/modules/guard.js` đóng gói đối tượng `window.Guard`:

- `Guard.role()`: Đọc và giải mã vai trò hiện tại từ session đăng nhập.
- `Guard.require(...allowedRoles)`:
  - Nếu chưa đăng nhập -> Tự động chuyển hướng về `login.html`.
  - Nếu đăng nhập nhưng sai vai trò (vd: Buyer cố tình gõ URL vào `admin-dashboard.html`) -> Chuyển hướng ngay lập tức về trang cấm quyền `403.html`.
  - Ngăn chặn lỗi bảo mật cơ bản phía Frontend bằng cách chặn đứng thực thi script trang.

### 3.4. Mô phỏng trải nghiệm AI (AI-Powered Features)

Dự án tích hợp 3 tính năng AI mô phỏng ở Frontend (tuân thủ tiêu chuẩn đề tài):

1. **AI Brief Assistant (`ai-brief.js`):** Tự động phân tích câu văn tự nhiên của khách hàng (vd: _"cần lọ hoa gốm men rạn cao 30cm tặng tân gia"_) để bóc tách thành các thuộc tính kỹ thuật có cấu trúc (Kích thước, Chất liệu, Ngân sách, Dịp tặng).
2. **AI Maker Matching (`ai-match.js`):** Thuật toán tính điểm khớp (Match Score) dựa trên danh mục sản phẩm, đánh giá và công suất khả dụng của nghệ nhân để gợi ý thợ phù hợp nhất cho brief.
3. **AI Revision Helper (`ai-revision.js`):** Tóm tắt các phản hồi thay đổi của khách hàng, gợi ý phương án điều chỉnh công thức gia công và chi phí ước tính.

---

## 4. TỔ CHỨC LÀM VIỆC NHÓM & QUY TRÌNH PHÁT TRIỂN PHẦN MỀM

### 4.1. Phân công nhiệm vụ chi tiết theo vai trò

Nhóm gồm 3 sinh viên, thực hiện nghiêm ngặt nguyên tắc **1 sinh viên phụ trách trọn vẹn luồng màn hình của mình (từ Mockup -> HTML -> CSS -> JS -> Data -> Responsive -> Video OBS minh chứng)**:

- **Ngô Quốc Huy (SV1):**
  - Đảm nhiệm toàn bộ luồng Khách hàng (Buyer): `pages/buyer-marketplace.html` (Khám phá & Gợi ý nghệ nhân AI-2), `pages/buyer-custom-brief.html` (Tạo brief tùy biến AI-1), `pages/buyer-orders.html` (Theo dõi đơn hàng & Hiệu chỉnh AI-3).
  - Đảm nhiệm cụm màn hình xác thực & khởi đầu: `index.html` (Trang chủ), `pages/login.html` (Đăng nhập), `pages/register.html` (Đăng ký), `pages/forgot-password.html` (Quên mật khẩu).
  - Trách nhiệm chéo: Đảm bảo khả năng tiếp cận (a11y), tính nhất quán thiết kế và responsive cho cụm màn hình phụ trách.

- **Mai Đình Sơn (SV2):**
  - Đảm nhiệm toàn bộ luồng Nghệ nhân (Maker): `pages/maker-listing-management.html` (Quản lý sản phẩm xưởng), `pages/maker-brief-inbox.html` (Hộp thư nhận brief), `pages/maker-proposal-editor.html` (Soạn đề xuất & báo giá AI-3).
  - Đảm nhiệm cụm màn hình tiện ích & tài khoản chung: `pages/profile.html` (Hồ sơ cá nhân), `pages/notifications.html` (Trung tâm thông báo), `pages/settings.html` (Cài đặt hệ thống), `pages/404.html` (Trang báo lỗi điều hướng).
  - Trách nhiệm chéo: Phụ trách cấu trúc dữ liệu JSON hạt nhân và các module lõi AI (`ai-brief.js`, `ai-match.js`, `ai-revision.js`).

- **Nguyễn Quang Sáng (SV3 - Trưởng nhóm):**
  - Đảm nhiệm luồng Kiểm duyệt (Moderator): `pages/moderator-moderation-queue.html` (Hàng chờ duyệt sản phẩm, duyệt hàng loạt), `pages/moderator-report-center.html` (Trung tâm xử lý khiếu nại báo cáo), `pages/moderator-content-guidelines.html` (Quản lý bảng quy chuẩn nội dung).
  - Đảm nhiệm luồng Quản trị sàn (Admin): `pages/admin-platform-dashboard.html` (Bảng điều khiển KPI & doanh thu, bắt sự kiện đa tab), `pages/admin-category-management.html` (Quản lý taxonomy, sinh slug SEO, lưu trữ/khôi phục), `pages/admin-user-management.html` (Quản lý tài khoản, chặn khóa Admin).
  - Đảm nhiệm mở gian hàng: `pages/seller-register.html` (Quy trình 3 bước, validate form, thanh toán demo nâng quyền Maker) và `pages/403.html` (Trang cấm quyền truy cập).
  - Trách nhiệm chéo Leader: Kiến trúc CSS 3 tầng (`base.css`, `components/style.css`), chuẩn hóa Responsive Mobile 390px (`bottom-nav`), module `guard.js`, kiểm thử, rà soát code và merge toàn bộ Pull Request.

### 4.2. Quy trình Git Flow chuẩn công nghiệp

- Nhóm áp dụng quy tắc nhánh độc lập:
  - `main`: Nhánh ổn định, chỉ chứa bản phát hành chính thức (`release: v1.0-mvp`).
  - `dev`: Nhánh tích hợp chính.
  - Các nhánh tính năng theo định dạng: `feature/<tên-sv>-<mã-task>-<tên-chức-năng>`.
- **Nguyên tắc Commit & Pull Request:**
  - 1 Task = 1 Nhánh = Commit có thông điệp rõ ràng theo chuẩn Conventional Commits (`feat:`, `style:`, `fix:`, `refactor:`).
  - Không commit trực tiếp lên `dev` hay `main`. Mọi thay đổi đều phải tạo Pull Request (PR) trên GitHub, được Trưởng nhóm (Sáng) rà soát mã nguồn (code review) trước khi merge.
  - Nhóm đã hoàn thành xuất sắc hơn 20 Pull Request tuần tự, minh chứng cho quá trình phát triển bền bỉ, trung thực, không sao chép nguyên khối.

### 4.2. Bảng kiểm kê màn hình & Nguyên tắc minh chứng

- Mỗi màn hình đều được đối chiếu chặt chẽ với bản thiết kế Figma:
  - Pha HTML/CSS: Giao diện tĩnh bám sát mockup, chuẩn từng pixel, hỗ trợ 3 breakpoint (Desktop 1200px+, Tablet 768px, Mobile 390px).
  - Pha JavaScript: Gắn mã logic tương tác thực tế, kiểm soát đầy đủ 4 trạng thái: Loading, Success/Normal, Empty State, Error State.
- Mỗi màn hình đều đi kèm video minh chứng OBS trực tiếp quay lại quá trình code và demo tính năng.

---

## 5. TỔNG KẾT & ĐÁNH GIÁ MỨC ĐỘ HOÀN THIỆN ĐỒ ÁN

- **Số lượng màn hình hoàn thành:** 22/22 màn hình đạt 100% yêu cầu.
- **Mức độ bao phủ trạng thái (State Coverage):** Đạt 100% ở tất cả các trang chính (Loading, Empty, Normal/Active, Error).
- **Tính thẩm mỹ & Trải nghiệm người dùng:** Giao diện thiết kế chỉn chu, hiện đại, màu sắc trang nhã, tương thích đa thiết bị.
- **Tính thực tế:** Đề tài đã giải quyết được trọn vẹn bài toán thương mại điện tử tùy biến cho sản phẩm thủ công sáng tạo, thể hiện tư duy kiến trúc phần mềm mạch lạc và kỹ năng làm việc nhóm xuất sắc.
