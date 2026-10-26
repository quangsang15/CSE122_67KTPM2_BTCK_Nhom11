# BÁO CÁO CÁ NHÂN — NGUYỄN QUẢNG SÁNG (TRƯỚNG NHÓM)

> **Họ và tên:** Nguyễn Quang Sáng  
> **Vai trò:** Trưởng nhóm  
> **Lớp:** 67KTPM2 — Học phần: CSE122 (Phát triển ứng dụng Web cơ bản)  
> **Dự án:** CraftLink – Sàn sản phẩm sáng tạo tùy biến (Creator Commerce)  
> **Vai trò chính trong nhóm:** Moderator (Duyệt nội dung, Báo cáo, Hướng dẫn nội dung), Admin (Quản lý danh mục, Quản lý người dùng, Bảng điều khiển), Mở gian hàng (Seller Register), Kiến trúc CSS toàn cục, Auth Guard, Tích hợp & phát hành.  
> **Repo GitHub:** https://github.com/quangsang15/CSE122_67KTPM2_BTCK_Nhom11 (nhánh `dev`, nhánh đích `main`)  
> **Link commit/PR:** Tất cả đã commit, push và merge vào `dev`.

---

## MỤC LỤC

1. [BẢNG TỔNG HỢP TẤT CẢ TASK ĐÃ GIAO & TRẠNG THÁI](#1-bảng-tổng-hợp-tất-cả-task-đã-giao--trạng-thái)
2. [PHÂN TÍCH CHI TIẾT TỪNG TASK: YÊU CẦU → CÁCH LÀM → MÃ NGUỒN → KẾT QUẢ → MINH CHỨNG](#2-phân-tích-chi-tiết-từng-task-yêu-cầu-cách-làm-mã-nguồn-kết-quả-minh-chứng)
3. [KIỂM THỬ VÀ CÁC LỖI ĐÃ KHẮC PHỤC](#3-kiểm-thử-và-các-lỗi-đã-khắc-phục)
4. [TỰ ĐÁNH GIÁ KIẾN THỨC HTML, CSS, JAVASCRIPT](#4-tự-đánh-giá-kiến-thức-html-css-javascript)
5. [PHỤ LỤC: ẢNH GIAO DIỆN, ĐƯỜNG DẪN TỆP VÀ COMMIT GIT](#5-phụ-lục-ảnh-giao-diệu-đường-dẫn-tệp-và-commit-git)

---

## 1. BẢNG TỔNG HỢP TẤT CẢ TASK ĐÃ GIAO & TRẠNG THÁI

| Mã task | Giao diện phụ trách                                   | Nhánh GitHub                               | Commit GitHub                                     | Trạng thái | Minh chứng PR |
| ------- | ----------------------------------------------------- | ------------------------------------------ | ------------------------------------------------- | ---------- | ------------- |
| D1      | Init repo + board + figma-link                        | `feature/quangsang-d01-board-figma`        | `docs: init board and dev branch`                 | ✅ Merged  | PR #1         |
| D2      | `moderator-content-guidelines.html`                   | `feature/quangsang-d02-guidelines-html`    | `feat: add guidelines page html`                  | ✅ Merged  | PR #2         |
| D3      | `moderator-report-center.html`                        | `feature/quangsang-d03-reports-html`       | `feat: add report center html`                    | ✅ Merged  | PR #3         |
| D4      | `admin-category-management.html`                      | `feature/quangsang-d04-category-html`      | `feat: add category page html`                    | ✅ Merged  | PR #4         |
| D5      | `moderator-moderation-queue.html`                     | `feature/quangsang-d05-queue-html`         | `feat: add moderation queue html`                 | ✅ Merged  | PR #5         |
| D6      | `admin-user-management.html` + `seller-register.html` | `feature/quangsang-d06-users-html`         | `feat: add user page html`                        | ✅ Merged  | PR #6         |
| D6      | `seller-register.html`                                | `feature/quangsang-d06-seller-html`        | `feat: add seller register html`                  | ✅ Merged  | PR #7         |
| —       | Split CSS 3 tầng + footer                             | `chores/quangsang-global-admin-allpage`    | `chore: update footer copyright...`               | ✅ Merged  | PR #8         |
| D7      | `admin-platform-dashboard.html`                       | `feature/quangsang-d07-dashboard-html`     | `feat: add dashboard page html`                   | ✅ Merged  | PR #9         |
| —       | Fix cấu trúc + responsive bottom-nav                  | `fix/quangsang-admin-structure-responsive` | `fix: correct admin page structure...`            | ✅ Merged  | PR #11        |
| D8      | Queue render từ mock JSON                             | `feature/quangsang-d08-queue-render`       | `feat: render queue from mock json`               | ✅ Merged  | PR #12        |
| D9      | Report filter open/handling/done                      | `feature/quangsang-d09-report-filter`      | `feat: add report status filter`                  | ✅ Merged  | PR #13        |
| D10     | User Khóa/Mở, cấm khóa Admin                          | `feature/quangsang-d10-user-lock`          | `feat: lock unlock user account`                  | ✅ Merged  | PR #14        |
| D11     | Dashboard đếm số liệu + `?fail=1`                     | `feature/quangsang-d11-dashboard-stats`    | `feat: add responsive dashboard layout`           | ✅ Merged  | PR #15        |
| D12     | Queue duyệt/từ chối/bulk + seller validate            | `feature/quangsang-d12-moderate-seller`    | `feat: approve listings and validate seller form` | ✅ Merged  | PR #16        |
| D13     | Auth Guard login/403                                  | `feature/quangsang-d13-auth-guard`         | `feat: add role guard and 403 redirect`           | ✅ Merged  | PR #17        |
| D13a    | Category CRUD + Archive                               | `feature/quangsang-d13a-category-crud`     | `feat: add category crud with archive`            | ✅ Merged  | PR #18        |
| D13b    | Guidelines CRUD JS                                    | `feature/quangsang-d13b-guidelines-crud`   | `feat: add guidelines crud js`                    | ✅ Merged  | PR #19        |
| —       | Fix CSS utils + toast                                 | `feature/quangsang-fix-css-utils`          | `style: add missing css utilities`                | ✅ Merged  | PR #20        |
| —       | Docs readme + báo cáo                                 | `docs/add-readme-introduce`                | `docs: add readme.md and baocao`                  | ✅ Merged  | PR #21        |

**Tổng cộng:** 17 PR đã merge vào `dev`, 0 PR chưa merge, 0 task bị bỏ sót. Tất cả công việc cá nhân của Sáng (D1–D13 + fix + docs) đã hoàn tất và tích hợp vào nhánh `dev`.

---

## 2. PHÂN TÍCH CHI TIẾT TỪNG TASK

Mỗi task được trình bày theo chuỗi: **Yêu cầu → Cách thực hiện → Mã nguồn liên quan → Kết quả → Minh chứng**.

---

### Task D1: Init repo + board + figma-link

**Yêu cầu:** Khởi tạo repo GitHub, tạo nhánh `dev`, bảng kiểm kê màn hình (Trello/Notion 5 cột), khóa link Figma, tạo 8 frame trắng cho Sitemap/Flow.

**Mã nguồn liên quan:** `design/figma-link.txt`, board Trello (link trong board).

**Kết quả:** Repo đã có sẵn nhánh `dev`, 8 frame Figma đã duyệt, đủ điều kiện sang D2.

**Minh chứng:** Commit `docs: init board and dev branch`, PR #1.

---

### Task D2: `moderator-content-guidelines.html` (HTML)

**Yêu cầu:** Tạo khung tĩnh trang Hướng dẫn nội dung (Moderator), bao gồm danh sách quy chuẩn, modal thêm/sửa, modal xóa.

**Mã nguồn liên quan:** `pages/moderator-content-guidelines.html`, `css/pages/guidelines.css`.

**Kết quả:** Trang hiển thị đúng 3 card hướng dẫn, có `state-empty` với `id` + `hidden`, đúng mockup `content-guide.png`.

**Minh chứng:** Commit `feat: add guidelines page html`, PR #2.

---

### Task D3: `moderator-report-center.html` (HTML)

**Yêu cầu:** Tạo khung tĩnh trang Trung tâm báo cáo (Moderator), có filter + table 3 cột rỗng + badge mẫu.

**Mã nguồn liên quan:** `pages/moderator-report-center.html`, `css/pages/reports.css`.

**Kết quả:** Trang hiển thị đúng 3 cột (Mã, Sản phẩm, Trạng thái), badge mẫu, đúng mockup `report-center.png`.

**Minh chứng:** Commit `feat: add report center html`, PR #3.

---

### Task D4: `admin-category-management.html` (HTML)

**Yêu cầu:** Tạo khung tĩnh trang Quản lý danh mục (Admin), có list nhóm hàng, nút Thêm, nút Archive mẫu.

**Mã nguồn liên quan:** `pages/admin-category-management.html`, `css/pages/category.css` (nếu có).

**Kết quả:** Trang hiển thị đúng danh sách nhóm hàng, nút Archive mẫu, đúng mockup `admin-category.png`.

**Minh chứng:** Commit `feat: add category page html`, PR #4.

---

### Task D5: `moderator-moderation-queue.html` (HTML)

**Yêu cầu:** Tạo khung tĩnh trang Hàng chờ duyệt (Moderator), filter + 2 hàng mẫu + checkbox bulk mẫu (chưa logic).

**Mã nguồn liên quan:** `pages/moderator-moderation-queue.html`, `css/pages/queue.css`.

**Kết quả:** Trang hiển thị đúng 3 hàng mẫu (LST-01, LST-02, LST-03), badge `badge--pending`, đúng mockup `queue.png`.

**Minh chứng:** Commit `feat: add moderation queue html`, PR #5.

---

### Task D6: `admin-user-management.html` + `seller-register.html` (HTML)

**Yêu cầu:** Tạo khung tĩnh trang Quản lý người dùng (Admin) + trang Đăng ký gian hàng (Seller).

**Mã nguồn liên quan:** `pages/admin-user-management.html`, `css/pages/users.css`, `pages/seller-register.html`, `css/pages/seller.css`.

**Kết quả:** 2 trang hiển thị đúng, đúng mockup `user-management.png` và `seller-register.png`.

**Minh chứng:** Commit `feat: add user page html`, PR #6; Commit `feat: add seller register html`, PR #7.

---

### Task D7: `admin-platform-dashboard.html` (HTML)

**Yêu cầu:** Tạo khung tĩnh trang Bảng điều khiển (Admin), 3–4 thẻ số liệu cứng + skeleton mẫu.

**Mã nguồn liên quan:** `pages/admin-platform-dashboard.html`, `css/pages/dashboard.css`.

**Kết quả:** Trang hiển thị đúng 4 thẻ số liệu cứng, skeleton mẫu, đúng mockup `admin-dashboard.png`.

**Minh chứng:** Commit `feat: add dashboard page html`, PR #9.

---

### Task D8: Queue render từ mock JSON

**Yêu cầu:** Render hàng chờ duyệt từ `listings.json` + badge theo trạng thái.

**Mã nguồn liên quan:** `assets/data/listings.json`, `js/pages/moderator-moderation-queue.js`, `pages/moderator-moderation-queue.html` (thêm `<script>`).

**Kết quả:** Tabs đếm chính xác, badge đúng, bulk select hoạt động, bulk approve cập nhật số lượng, localStorage lưu trạng thái.

**Minh chứng:** Commit `feat: render queue from mock json`, PR #12.

---

### Task D9: Report filter open/handling/done

**Yêu cầu:** Lọc báo cáo theo trạng thái Mở / Đang xử lý / Xong.

**Mã nguồn liên quan:** `assets/data/reports.json`, `js/pages/moderator-report-center.js`, `pages/moderator-report-center.html`.

**Kết quả:** Tabs đếm chính xác, badge đúng, nút Xử lý/Đóng báo cáo thay trạng thái, localStorage lưu.

**Minh chứng:** Commit `feat: add report status filter`, PR #13.

---

### Task D10: User Khóa/Mở, cấm khóa Admin

**Yêu cầu:** Quản lý tài khoản: Khóa/Mở tài khoản, tuyệt đối không cho phép khóa Admin.

**Mã nguồn liên quan:** `assets/data/users.json`, `js/pages/admin-user-management.js`, `pages/admin-user-management.html`.

**Kết quả:** Nút Admin bị disabled, toast lỗi khi click, localStorage lưu trạng thái khóa/mở.

**Minh chứng:** Commit `feat: lock unlock user account`, PR #14.

---

### Task D11: Dashboard đếm số liệu + `?fail=1`

**Yêu cầu:** Bảng điều khiển đếm số liệu từ JSON, hỗ trợ demo lỗi `?fail=1`.

**Mã nguồn liên quan:** `assets/data/orders.json`, `assets/data/briefs.json`, `assets/data/proposals.json`, `js/pages/admin-platform-dashboard.js`, `pages/admin-platform-dashboard.html`.

**Kết quả:** Tabs/badge đúng, biểu đồ vẽ đúng, `?fail=1` hiển thị lỗi, `btnRetry` load lại, multi-tab reactive hoạt động.

**Minh chứng:** Commit `feat: add responsive dashboard layout`, PR #15.

---

### Task D12: Queue duyệt/từ chối/bulk + seller validate

**Yêu cầu:** Duyệt/từ chối hàng loạt + validate form đăng ký gian hàng.

**Mã nguồn liên quan:** `js/pages/seller-register.js`, `pages/seller-register.html` (thêm `<script>`), `js/pages/moderator-moderation-queue.js` (cập nhật bulk).

**Kết quả:** Validation lỗi hiển thị đúng, flow thành công hiển thị "Đăng ký thành công!", bulk approve cập nhật đúng số lượng.

**Minh chứng:** Commit `feat: approve listings and validate seller form`, PR #16.

---

### Task D13: Auth Guard login/403

**Yêu cầu:** Kiểm soát truy cập client-side: chưa đăng nhập → login, sai vai trò → 403.

**Mã nguồn liên quan:** `js/modules/guard.js`, `pages/403.html`.

**Kết quả:** Chặn truy cập trái phép, redirect đúng, toast lỗi.

**Minh chứng:** Commit `feat: add role guard and 403 redirect`, PR #17.

---

### Task D13a: Category CRUD + Archive

**Yêu cầu:** CRUD danh mục, thay xóa bằng Archive (soft delete).

**Mã nguồn liên quan:** `js/pages/admin-category-management.js`, `pages/admin-category-management.html`.

**Kết quả:** CRUD hoạt động, Archive, slug đúng.

**Minh chứng:** Commit `feat: add category crud with archive`, PR #18.

---

### Task D13b: Guidelines CRUD JS

**Yêu cầu:** CRUD hướng dẫn nội dung.

**Mã nguồn liên quan:** `js/pages/moderator-content-guidelines.js`, `pages/moderator-content-guidelines.html`.

**Kết quả:** CRUD hoạt động, zero-state hiển thị đúng.

**Minh chứng:** Commit `feat: add guidelines crud js`, PR #19.

---

### Task Fix CSS utils + toast

**Yêu cầu:** Bổ sung class CSS thiếu và module toast.

**Mã nguồn liên quan:** `css/components/style.css`.

**Kết quả:** Không còn class Missing, toast hiển thị đúng trạng thái khi người dùng bấm nút.

**Minh chứng:** Commit `style: add missing css utilities`, PR #20.

---

### Task Docs: Readme + báo cáo

**Yêu cầu:** Tạo giới thiệu dự án và báo cáo.

**Mã nguồn liên quan:** `docs/BAO-CAO-CA-NHAN-SANG-SV3.md`, `docs/BAO-CAO-TONG-QUAN-DU-AN.md`.

**Kết quả:** Tài liệu đầy đủ, đúng mẫu BTL-11.

**Minh chứng:** Commit `docs: add readme.md and baocao`, PR #21.

---

## 3. KIỂM THỬ VÀ CÁC LỖI ĐÃ KHẮC PHỤC

| Lỗi phát hiện                                            | Trang ảnh hưởng                       | Cách khắc phục                                                | Kết quả                |
| -------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------- | ---------------------- |
| Thiếu `[hidden] { display:none !important }`             | Modal hiển thị dù có `hidden`         | Thêm rule `[hidden]` trong `style.css`                        | ✅ Modal ẩn đúng       |
| Thiếu `.u-fw500`                                         | HTML dùng class không có trong CSS    | Thêm utility vào `components/style.css`                       | ✅ Class tồn tại       |
| `.tabs` thiếu `overflow-x:auto`                          | Tabs vỡ dòng ở mobile                 | Thêm `overflow-x:auto` + `.tab white-space:nowrap`            | ✅ Tabs không vỡ       |
| `.btn-sm` trong CSS vs `btn--sm` trong HTML              | Nút to sai cỡ                         | Quy ước modifier 2 gạch, grep toàn repo                       | ✅ Nhất quán           |
| `responsive.css` thiếu `.plans`                          | 3 thẻ gói cắt mất ở mobile            | Thêm `.plans` vào breakpoint                                  | ✅ 3 thẻ hiển thị đủ   |
| `dashboard` không render dữ liệu động                    | Con số không đổi khi duyệt ở tab khác | Thêm `window.addEventListener("storage", ...)`                | ✅ Re-render real-time |
| `dashboard` hiển thị lỗi `Cannot set properties of null` | Thiếu `id="stats"`, `id="revBars"`... | Thêm `id` vào thẻ HTML, thay `#catBars` thành container trống | ✅ Render đúng         |
| `listings.json` của Sáng vs Sơn trùng tên                | Xung đột file                         | Sáng tự tạo `listings.json` riêng, không đụng file Sơn        | ✅ Không xung đột      |

---

## 4. TỰ ĐÁNH GIÁ KIẾN THỨC HTML, CSS, JAVASCRIPT ĐÃ SỬ DỤNG

### HTML

- Ngữ nghĩa: `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<table>`, `<form>`, `<input>`, `<button>`, `<modal>`.
- Accessibility: `aria-label`, `role="tablist"`, `role="tab"`, `aria-modal`, `hidden`.
- Tất cả trang có `<meta charset="UTF-8">`, `<meta name="viewport">`, link CSS/JS đúng đường dẫn.

### CSS

- Phân tầng 3 lớp: `base.css` (tokens + reset), `components/style.css` (components dùng chung), `pages/<trang>.css` (style riêng).
- Quy ước class: Modifier 2 gạch (`.btn--primary`), Utility 1 gạch tiền tố `u-` (`.u-mb16`).
- Responsive: breakpoints 1024px / 900px / 600px, mobile 390px, bottom-nav.
- Không có comment trong code.

### JavaScript

- Thuần JS, không framework.
- Module hóa: `guard.js`, `escape module trong file`.
- Page JS: `moderator-moderation-queue.js`, `moderator-report-center.js`, `admin-user-management.js`, `admin-platform-dashboard.js`, `seller-register.js`, `admin-category-management.js`, `moderator-content-guidelines.js`.
- Xử lý sự kiện: click, change, input, storage (multi-tab reactive).
- LocalStorage: `craftlink_listings_v1`, `craftlink_reports_v1`, `craftlink_users_v1`, `craftlink_session_v1`, `craftlink_seller_v1`.
- Fetch JSON: `../assets/data/listings.json`, `reports.json`, `users.json`, `orders.json`, `briefs.json`, `proposals.json`.
- Validate: email, phone `/^0\d{9}$/`, tên, địa chỉ.

---

## 5. PHỤ LỤC: ẢNH GIAO DIỆN, ĐƯỜNG DẪN TỆP VÀ COMMIT GIT

### 5.1. Danh sách tệp chính do Sáng thực hiện

| Loại            | Đường dẫn                                                                                                                                                                                                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HTML (7 trang)  | `pages/moderator-content-guidelines.html`, `pages/moderator-report-center.html`, `pages/admin-category-management.html`, `pages/moderator-moderation-queue.html`, `pages/admin-user-management.html`, `pages/seller-register.html`, `pages/admin-platform-dashboard.html`        |
| JS (7 trang)    | `js/pages/moderator-content-guidelines.js`, `js/pages/moderator-report-center.js`, `js/pages/admin-category-management.js`, `js/pages/moderator-moderation-queue.js`, `js/pages/admin-user-management.js`, `js/pages/seller-register.js`, `js/pages/admin-platform-dashboard.js` |
| CSS (per trang) | `css/pages/guidelines.css`, `css/pages/reports.css`, `css/pages/category.css`, `css/pages/queue.css`, `css/pages/users.css`, `css/pages/seller.css`, `css/pages/dashboard.css`                                                                                                   |
| CSS chung       | `css/base/base.css`, `css/components/style.css`                                                                                                                                                                                                                                  |
| JSON data       | `assets/data/listings.json`, `assets/data/reports.json`, `assets/data/users.json`, `assets/data/orders.json`, `assets/data/briefs.json`, `assets/data/proposals.json`                                                                                                            |
| Module chung    | `js/modules/guard.js`                                                                                                                                                                                                                                                            |
| HTML lỗi        | `pages/403.html`                                                                                                                                                                                                                                                                 |
| Tài liệu        | `docs/BAO-CAO-CA-NHAN-SANG-SV3.md`, `docs/BAO-CAO-TONG-QUAN-DU-AN.md`,                                                                                                                                                                                                           |

### 5.2. Danh sách commit Git (mã nhánh + message)

| Mã commit                                                                  | Nhánh                                      | Message | PR  |
| -------------------------------------------------------------------------- | ------------------------------------------ | ------- | --- |
| `docs: init board and dev branch`                                          | `feature/quangsang-d01-board-figma`        | D1      | #1  |
| `feat: add guidelines page html`                                           | `feature/quangsang-d02-guidelines-html`    | D2      | #2  |
| `feat: add report center html`                                             | `feature/quangsang-d03-reports-html`       | D3      | #3  |
| `feat: add category page html`                                             | `feature/quangsang-d04-category-html`      | D4      | #4  |
| `feat: add moderation queue html`                                          | `feature/quangsang-d05-queue-html`         | D5      | #5  |
| `feat: add user page html`                                                 | `feature/quangsang-d06-users-html`         | D6      | #6  |
| `feat: add seller register html`                                           | `feature/quangsang-d06-seller-html`        | D6      | #7  |
| `chore: update footer copyright...` + `refactor: split css...`             | `chores/quangsang-global-admin-allpage`    | —       | #8  |
| `feat: add dashboard page html`                                            | `feature/quangsang-d07-dashboard-html`     | D7      | #9  |
| `fix: correct admin page structure...` + `style: add mobile bottom nav...` | `fix/quangsang-admin-structure-responsive` | —       | #11 |
| `feat: render queue from mock json`                                        | `feature/quangsang-d08-queue-render`       | D8      | #12 |
| `feat: add report status filter`                                           | `feature/quangsang-d09-report-filter`      | D9      | #13 |
| `feat: lock unlock user account`                                           | `feature/quangsang-d10-user-lock`          | D10     | #14 |
| `feat: add responsive dashboard layout`                                    | `feature/quangsang-d11-dashboard-stats`    | D11     | #15 |
| `feat: approve listings and validate seller form`                          | `feature/quangsang-d12-moderate-seller`    | D12     | #16 |
| `feat: add role guard and 403 redirect`                                    | `feature/quangsang-d13-auth-guard`         | D13     | #17 |
| `feat: add category crud with archive`                                     | `feature/quangsang-d13a-category-crud`     | D13a    | #18 |
| `feat: add guidelines crud js`                                             | `feature/quangsang-d13b-guidelines-crud`   | D13b    | #19 |
| `style: add missing css utilities`                                         | `feature/quangsang-fix-css-utils`          | Fix     | #20 |
| `docs: add readme.md and baocao`                                           | `docs/add-readme-introduce`                | Docs    | #21 |

### 5.3. Ảnh giao diện (mockup)

| Màn hình           | File mockup                          |
| ------------------ | ------------------------------------ |
| Hướng dẫn nội dung | `design/mockups/content-guide.png`   |
| Trung tâm báo cáo  | `design/mockups/report-center.png`   |
| Quản lý danh mục   | `design/mockups/admin-category.png`  |
| Hàng chờ duyệt     | `design/mockups/queue.png`           |
| Quản lý người dùng | `design/mockups/user-management.png` |
| Bảng điều khiển    | `design/mockups/admin-dashboard.png` |
| Đăng ký gian hàng  | `design/mockups/seller-register.png` |

**Tất cả commit đã push lên `origin/dev` và merge vào `dev`. `dev` đang up-to-date với `origin/dev`, working tree clean.**

---
