# BÁO CÁO CÁ NHÂN — MAI ĐÌNH SƠN (SV2)

> **Họ và tên:** Mai Đình Sơn  
> **Vai trò:** Thành viên (SV2)  
> **Lớp:** 67KTPM2 — Học phần: CSE122 (Phát triển ứng dụng Web cơ bản)  
> **Dự án:** CraftLink – Sàn sản phẩm sáng tạo tùy biến (Creator Commerce)  
> **Vai trò chính trong nhóm:** Maker (Quản lý sản phẩm xưởng `maker-listing-management`, Hộp thư nhận brief `maker-brief-inbox`, Soạn đề xuất & báo giá `maker-proposal-editor`), Màn hình dùng chung (Hồ sơ cá nhân `profile`, Trung tâm thông báo `notifications`, Cài đặt hệ thống & Dark Mode `settings`, Trang báo lỗi `403` / `404`), Tầng dữ liệu Mock API & State (`js/api.js`, `js/modules/ui-state.js`, `js/modules/escape.js`, `assets/data/*.json`) và Bộ 3 Module AI Frontend (`ai-brief.js`, `ai-match.js`, `ai-revision.js`).  
> **Repo GitHub:** https://www.google.com/search?q=https://github.com/quangsang15/CSE122\_67KTPM2\_BTCK\_Nhom11 (nhánh `dev`, nhánh đích `main`)  
> **Link commit/PR:** Tất cả các task D1–D13 của SV2 đã được commit, push và tạo Pull Request hợp nhất vào nhánh `dev`.

---

## MỤC LỤC

1. [BẢNG TỔNG HỢP TẤT CẢ TASK ĐÃ GIAO & TRẠNG THÁI](#1-bảng-tổng-hợp-tất-cả-task-đã-giao--trạng-thái)
2. [PHÂN TÍCH CHI TIẾT TỪNG TASK: YÊU CẦU → CÁCH LÀM → MÃ NGUỒN → KẾT QUẢ → MINH CHỨNG](#2-phân-tích-chi-tiết-từng-task)
3. [KIỂM THỬ VÀ CÁC LỖI ĐÃ KHẮC PHỤC](#3-kiểm-thử-và-các-lỗi-đã-khắc-phục)
4. [TỰ ĐÁNH GIÁ KIẾN THỨC HTML, CSS, JAVASCRIPT ĐÃ SỬ DỤNG](#4-tự-đánh-giá-kiến-thức-html-css-javascript-đã-sử-dụng)
5. [PHỤ LỤC: ẢNH GIAO DIỆN, ĐƯỜNG DẪN TỆP VÀ COMMIT GIT](#5-phụ-lục-ảnh-giao-diện-đường-dẫn-tệp-và-commit-git)

---

## 1. BẢNG TỔNG HỢP TẤT CẢ TASK ĐÃ GIAO & TRẠNG THÁI

| Mã task | Giao diện / Hạng mục phụ trách                             | Nhánh GitHub                                | Commit GitHub                                    | Trạng thái | Minh chứng PR    |
| ------- | ---------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------ | ---------- | ---------------- |
| D1      | Thiết kế Figma Maker + Shared (9 ảnh mockup)               | `feature/-figma-maker` (`dev`)              | `Add files via upload` (`85a1fe7`)               | ✅ Merged  | Commit `85a1fe7` |
| D2      | `pages/404.html` + `pages/403.html` + `error.css`          | `feature/dinhson-403-404-html`              | `feat: add 403 404 pages html`                   | ✅ Merged  | PR #22           |
| D2-fix  | Cập nhật bố cục Responsive trang `pages/404.html`          | `feature/dinhson-403-404-html`              | `fix: update responsive layout for 404 error...` | ✅ Merged  | PR #24           |
| D3      | `pages/settings.html` khung tĩnh + CSS `.toggle`           | `feature/dinhson-d03-settings-html`         | `feat: add settings page html`                   | ✅ Merged  | PR #30           |
| D3-fix  | Chuẩn hóa `pages/settings.html` (loại bỏ khối trùng lặp)   | `feature/dinhson-d03-settings-html`         | `Update settings.html`                           | ✅ Merged  | PR #32           |
| D4      | `pages/profile.html` khung tĩnh + `profile.css` + Core JS  | `feature/dinhson-d04-profile-html`          | `feat: add profile page html`                    | ✅ Merged  | PR #23           |
| D5      | `pages/maker-listing-management.html` khung tĩnh 3 card    | `feature/dinhson-d05-listing-html`          | `feat: add listing layout html`                  | ✅ Merged  | PR #25           |
| D6      | `pages/maker-brief-inbox.html` + `notifications.html`      | `feature/dinhson-d06-maker-brief-inbox-html`| `feat: add brief inbox html`                     | ✅ Merged  | PR #34           |
| D6b     | `pages/notifications.html` + `css/pages/notifications.css` | `feature/dinhson-d06-inbox-html`            | `feat: add notifications html`                   | ✅ Merged  | PR #34 / `7e7a1` |
| D7      | `pages/maker-proposal-editor.html` khung tĩnh              | `feature/dinhson-d07-proposal-html`         | `add proposal editor html`                       | ✅ Merged  | PR #26           |
| D8      | `brief-inbox` render từ `briefs.json` + Nhận/Từ chối       | `feature/dinhson-d08-inbox-render`          | `feat: render brief inbox from mock json`        | ✅ Merged  | PR #34           |
| D9      | `profile` đọc/lưu thông tin vào `localStorage`             | `feature/dinhson-d09-profile-js`            | `feat: save profile to localstorage`             | ✅ Merged  | PR #23           |
| D10     | `notifications` lọc theo Tabs + Đánh dấu đã đọc / Xóa mềm  | `feature/dinhson-d10-notif-tabs`            | `feat: add notification tabs`                    | ✅ Pushed  | PR #35 (`7b16b`) |
| D11     | `proposal-editor` validate form + Lưu nháp / Gửi đề xuất   | `feature/dinhson-d11-proposal-form`         | `feat: add proposal editor form`                 | ✅ Merged  | PR #26           |
| D12     | `listing` Ẩn/Hiện (Archive/Restore) + Thêm/Sửa sản phẩm    | `feature/dinhson-d12-listing-crud`          | `feat: archive and add listing`                  | ✅ Merged  | PR #25           |
| D13     | `proposal` AI-3 (`ai-revision.js`) + `settings` Dark Mode  | `feature/dinhson-d13-ai-revision`           | `feat: add ai revision summary`                  | ✅ Merged  | PR #26 & PR #30  |

**Tổng cộng:** Hoàn thành đầy đủ 13/13 đầu việc cá nhân (D1–D13) bao gồm toàn bộ 3 màn hình vai trò Nghệ nhân (Maker), 5 màn hình dùng chung (`profile`, `notifications`, `settings`, `403`, `404`) cùng bộ module dùng chung (`api.js`, `ui-state.js`, `escape.js`, `ai-revision.js`).

---

## 2. PHÂN TÍCH CHI TIẾT TỪNG TASK

Mỗi task được trình bày theo chuỗi: **Yêu cầu → Cách thực hiện → Mã nguồn liên quan → Kết quả → Minh chứng**.

---

### Task D1: Thiết kế Figma cụm Maker + Shared (9 ảnh Mockup)

**Yêu cầu:** Thiết kế và xuất đầy đủ bộ ảnh mockup giao diện cho cụm màn hình Nghệ nhân (Maker: Quản lý sản phẩm, Hộp thư Brief, Soạn đề xuất) và cụm màn hình dùng chung (Hồ sơ, Thông báo, Cài đặt, 403, 404) đồng bộ hệ màu và lưới bố cục với toàn nhóm.

**Cách thực hiện:** Thiết kế trên Figma dựa trên hệ thống Design Tokens chung (`--primary: #2563eb`, `--bg: #eef4ff`, `--card: #ffffff`, `--radius: 10px`), xuất các file PNG chất lượng cao lưu vào thư mục `design/maker&public/`.

**Mã nguồn liên quan:** `design/maker&public/maker-listing-management.png`, `design/maker&public/maker-brief-inbox.png`, `design/maker&public/maker-proposal-editor.png`, `design/maker&public/profile.png`, `design/maker&public/otifications.png`, `design/maker&public/settings.png`, `design/maker&public/403.png`, `design/maker&public/404.png`.

**Kết quả:** Hoàn thiện 9 file ảnh thiết kế chuẩn tỷ lệ, làm cơ sở đối chiếu trực tiếp cho giai đoạn cắt HTML/CSS (D2–D7).

**Minh chứng:** Commit `Add files via upload` (`85a1fe7`).

---

### Task D2: `pages/404.html` + `pages/403.html` (HTML + CSS)

**Yêu cầu:** Xây dựng trang báo lỗi không tìm thấy trang (`404.html`) và trang từ chối quyền truy cập (`403.html`), có mã lỗi cỡ lớn (`72px`), tiêu đề `<h1>`, mô tả phụ và cụm nút điều hướng quay về `index.html` hoặc `buyer-marketplace.html`.

**Cách thực hiện:**
- Sử dụng cấu trúc HTML5 ngữ nghĩa (`.app-layout` -> `main.main-content` -> `.err-wrap`).
- Tạo file `css/pages/error.css` định nghĩa `.err-wrap` (`min-height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center`) và `.err-code` (`font-size: 72px; font-weight: 800; color: #e2e8f0`).

**Mã nguồn liên quan:** `pages/404.html`, `pages/403.html`, `css/pages/error.css`.

**Kết quả:** Hai trang lỗi `404.html` và `403.html` căn giữa màn hình trên cả Desktop và Mobile, nút bấm điều hướng chính xác, khớp 100% với mockup `404.png` và `403.png`.

**Minh chứng:** Nhánh `feature/dinhson-403-404-html`, Commit `feat: add 403 404 pages html` (`81741c1`) và `fix: update responsive layout for 404 error page` (`b0ede0b`), PR #22 & PR #24.

---

### Task D3: `pages/settings.html` khung tĩnh + Style CSS `.toggle`

**Yêu cầu:** Xây dựng khung tĩnh trang Cài đặt (`pages/settings.html`) theo frame Shared D1 gồm 3 thẻ `.card`:
1. **Thông báo & Giao diện:** Công tắc bật/tắt Thông báo qua Email (`#tglMail`), Thông báo qua SMS (`#tglSms`), và Nền tối (`#tglTheme`).
2. **Ngôn ngữ:** Hộp chọn `<select id="lang">` (Tiếng Việt / English).
3. **Vùng nguy hiểm (`.danger-card`):** Nút `#btnDelete` (Xóa tài khoản) và nút `#btnSave` (Lưu cài đặt).

**Cách thực hiện:**
- Sử dụng `.container.u-mw600` giới hạn chiều rộng `600px` và `.u-col-16` xếp dọc các thẻ `.card` cách nhau `16px`.
- Xây dựng nút công tắc trượt `<button class="toggle" role="switch"><i></i></button>` kết hợp CSS `.toggle` (`44px × 24px`, `border-radius: 999px`) và `.toggle.on i { transform: translateX(20px); }`.

**Mã nguồn liên quan:** `pages/settings.html`, `css/components/style.css` (`.set-row`, `.set-row--plain`, `.danger-card`, `.toggle`, `html.theme-dark`).

**Kết quả:** Giao diện trang Cài đặt hiển thị rõ ràng, nút công tắc trượt mượt mà trong `0.2s`, đúng chuẩn Accessibility (`role="switch"`, `aria-label`).

**Minh chứng:** Nhánh `feature/dinhson-d03-settings-html`, Commit `feat: add settings page html` (`bc45a4f`) & `Update settings.html` (`d329af6`), PR #30 & PR #32.

---

### Task D4: `pages/profile.html` khung tĩnh + `css/pages/profile.css` + Các Module JS lõi

**Yêu cầu:** Tạo khung tĩnh trang Hồ sơ cá nhân (`pages/profile.html`) hiển thị Avatar chữ cái đầu, Họ tên, Email, Badge vai trò, Giới thiệu (Bio), Địa chỉ, Số điện thoại, khung chỉnh sửa thông tin và nút Đăng xuất; đồng thời khởi tạo các module JS dùng chung cho toàn dự án.

**Cách thực hiện:**
- Thiết kế bố cục `.profile-head` trong `css/pages/profile.css` hiển thị vòng tròn `#avatar` (`64px × 64px`, nền `--primary`, chữ trắng) bên cạnh thông tin định danh và nhãn vai trò `#uRole`.
- Xây dựng 4 module hạ tầng dùng chung:
  1. `js/api.js`: Cung cấp `API.all`, `API.saveAll`, `API.get`, `API.upsert`, `API.patch` đồng bộ giữa `assets/data/*.json` và `localStorage`.
  2. `js/modules/ui-state.js`: Cung cấp `UIState.renderLoading`, `renderEmpty`, `renderError`, `renderToast`, `statusLabel`, `roleLabel`.
  3. `js/modules/escape.js`: Cung cấp `window.escapeHTML` chống XSS khi render chuỗi HTML động.
  4. `js/modules/bottom-nav.js`: Thanh điều hướng cố định dưới đáy màn hình ở chế độ Mobile (`<= 600px`).

**Mã nguồn liên quan:** `pages/profile.html`, `css/pages/profile.css`, `js/api.js`, `js/modules/ui-state.js`, `js/modules/escape.js`, `js/modules/bottom-nav.js`.

**Kết quả:** Trang Hồ sơ hiển thị đúng mockup `profile.png`, đầy đủ 4 khối trạng thái (`#state-loading`, `#state-error`, `#state-empty`, `#viewBox` / `#editForm`).

**Minh chứng:** Nhánh `feature/dinhson-d04-profile-html`, Commit `feat: add profile page html` (`34b7253`), PR #23.

---

### Task D5: `pages/maker-listing-management.html` khung tĩnh + Style CSS

**Yêu cầu:** Tạo khung tĩnh trang Quản lý sản phẩm của Nghệ nhân (`pages/maker-listing-management.html`), gồm thanh tiêu đề + nút `+ Thêm sản phẩm`, thanh Tabs lọc trạng thái, lưới thẻ sản phẩm và hộp thoại Modal Thêm/Sửa sản phẩm.

**Cách thực hiện:**
- Sử dụng `.row.row--between` cho phần đầu trang, `#tabs` (`role="tablist"`) cho thanh lọc trạng thái, và lưới `.grid.grid--3` cho danh sách thẻ sản phẩm.
- Xây dựng hộp thoại `#modal` (`.modal-backdrop` + `.modal-box`) chứa biểu mẫu nhập Tên sản phẩm, Danh mục, Giá (VNĐ), Thời gian làm (ngày), Ảnh URL, Tags và Mô tả kèm các thẻ báo lỗi `.field-err`.

**Mã nguồn liên quan:** `pages/maker-listing-management.html`, `css/components/style.css`.

**Kết quả:** Giao diện lưới sản phẩm 3 cột trên Desktop, tự động thu về 2 cột trên Tablet và 1 cột trên Mobile, khớp với mockup `maker-listing-management.png`.

**Minh chứng:** Nhánh `feature/dinhson-d05-listing-html`, Commit `feat: add listing layout html` (`2472b1c`), PR #25.

---

### Task D6: `pages/maker-brief-inbox.html` + `pages/notifications.html` (HTML + CSS)

**Yêu cầu:** Xây dựng khung tĩnh cho 2 màn hình:
1. **Hộp thư Brief (`pages/maker-brief-inbox.html`):** Nơi nghệ nhân tiếp nhận các yêu cầu đặt làm riêng từ khách hàng, có thanh `#briefTabs` và các khối trạng thái `#state-loading`, `#state-error`, `#state-empty`, `#list`.
2. **Trung tâm thông báo (`pages/notifications.html`):** Nơi người dùng xem thông báo hệ thống, lọc theo trạng thái đọc và đánh dấu đã đọc tất cả (`#btnMarkAll`).

**Cách thực hiện:**
- Dùng khung `.container.u-mw720` (`max-width: 720px`) giúp danh sách thẻ Brief và thẻ Thông báo có độ rộng vừa tầm mắt đọc.
- Tạo `css/pages/notifications.css` định nghĩa `.notif-item`, `.notif-item.unread` (viền trái màu xanh `--primary`, nền xanh nhạt `#f8faff`) và chấm tròn `.notif-dot`.

**Mã nguồn liên quan:** `pages/maker-brief-inbox.html`, `pages/notifications.html`, `css/pages/notifications.css`.

**Kết quả:** Cả 2 trang hiển thị chuẩn xác theo mockup `maker-brief-inbox.png` và `otifications.png`, tích hợp sẵn sàng các container trạng thái cho tầng JS.

**Minh chứng:** Nhánh `feature/dinhson-d06-maker-brief-inbox-html` (PR #34, commit `68329be`) và nhánh `feature/dinhson-d06-inbox-html` (commit `7e7a1d1`).

---

### Task D7: `pages/maker-proposal-editor.html` (HTML)

**Yêu cầu:** Xây dựng khung tĩnh màn hình Soạn đề xuất & báo giá (`pages/maker-proposal-editor.html`) gồm bố cục 2 cột: cột trái chọn Brief đã nhận, xem tóm tắt yêu cầu gốc, tích hợp khung AI-3 gợi ý chỉnh sửa (Revision) và biểu mẫu nhập Giá đề xuất, Thời gian hoàn thành, Các mốc thực hiện (Milestones); cột phải hiển thị danh sách các Proposal đã tạo theo từng phiên bản (`v1`, `v2`).

**Cách thực hiện:**
- Sử dụng lưới 2 cột (`.grid.grid--2`) phân tách rõ khu vực soạn thảo (Cột trái) và lịch sử đề xuất (Cột phải).
- Thiết kế khối AI-3 (`#aiRevBox`) gồm ô nhập phản hồi chỉnh sửa của khách (`#revNote`), nút `✨ AI Tóm tắt & gợi ý checklist` (`#btnAiRev`) và vùng hiển thị kết quả phân tích kèm 5 nút điều khiển chuẩn đề bài (Chấp nhận / Sửa / Tạo lại / Từ chối).

**Mã nguồn liên quan:** `pages/maker-proposal-editor.html`.

**Kết quả:** Giao diện hiển thị đầy đủ các trường nghiệp vụ Proposal & Revision, khớp với mockup `maker-proposal-editor.png`.

**Minh chứng:** Nhánh `feature/dinhson-d07-proposal-html`, Commit `add proposal editor html` (`742e521`), PR #26.

---

### Task D8: `brief-inbox` render từ `briefs.json` + Nhận / Từ chối Brief (JS)

**Yêu cầu:** Viết mã JavaScript (`js/pages/maker-brief-inbox.js`) tải danh sách yêu cầu từ `briefs.json` và `users.json`, lọc theo 4 tab (`Tất cả`, `Mới gửi`, `Đã nhận`, `Đã từ chối`), bấm vào thẻ để đóng/mở chi tiết (Accordion), và xử lý nút **Nhận brief** / **Từ chối** lưu vào `localStorage`.

**Cách thực hiện:**
- Sử dụng `Promise.all([API.all("briefs"), API.all("users")])` tải song song dữ liệu; trong lúc chờ hiển thị `#state-loading`, nếu lỗi hiển thị `#state-error` kèm nút `#btnRetry`.
- Lọc dữ liệu qua `escapeHTML(b.title)`, `escapeHTML(buyerOf(b))`, `escapeHTML(b.freeText)` trước khi render.
- Kiểm tra `if (e.target.closest("button") || e.target.closest("a")) return;` để tách biệt sự kiện bấm nút hành động với sự kiện đóng/mở thẻ `[data-open]`.
- Khi bấm **Nhận brief (`[data-acc]`)** hoặc **Từ chối (`[data-rej]`)**, cập nhật trạng thái phần tử trong mảng `briefs`, gọi `await API.saveAll("briefs", briefs)` và hiển thị `UIState.renderToast`. Khi trạng thái là `accepted`, hiển thị nút liên kết `Tạo đề xuất →` chuyển sang `maker-proposal-editor.html`.

**Mã nguồn liên quan:** `js/pages/maker-brief-inbox.js`, `assets/data/briefs.json`, `pages/maker-brief-inbox.html`.

**Kết quả:** Số đếm trên 4 tab cập nhật tức thì sau mỗi thao tác, dữ liệu lưu bền vững trong `localStorage` (`craftlink_briefs_v1`), hiển thị hộp trống `#state-empty` khi tab lọc không có dữ liệu.

**Minh chứng:** Commit `feat: add brief inbox html` (`68329be`), PR #34.

---

### Task D9: `profile` đọc/ghi `localStorage` & Validate biểu mẫu (JS)

**Yêu cầu:** Viết logic JavaScript (`js/pages/profile.js`) nạp thông tin người dùng đang đăng nhập từ `craftlink_session_v1` và `users.json`, cho phép chuyển sang chế độ chỉnh sửa Họ tên, Số điện thoại, Địa chỉ, Giới thiệu (Bio), kiểm tra hợp lệ và lưu vào `localStorage`.

**Cách thực hiện:**
- Đọc phiên đăng nhập từ `localStorage.getItem("craftlink_session_v1")` và phủ dữ liệu chỉnh sửa từ khóa `craftlink_profile_v1`.
- Kiểm tra hợp lệ khi bấm Lưu: Họ tên tối thiểu 2 ký tự, Số điện thoại khớp biểu thức chính quy `/^(0|\+84)[0-9]{9,10}$/`.
- Cho phép chuyển đổi nhanh vai trò demo (Buyer / Maker / Moderator / Admin) và xử lý nút Đăng xuất xóa phiên làm việc.

**Mã nguồn liên quan:** `js/pages/profile.js`, `pages/profile.html`.

**Kết quả:** Thông tin hồ sơ và chữ cái đầu trên Avatar cập nhật ngay sau khi lưu, hiển thị Toast thông báo thành công và giữ nguyên dữ liệu khi tải lại trang (`F5`).

**Minh chứng:** Nhánh `feature/dinhson-d04-profile-html`, Commit `feat: add profile page html` (`34b7253`), PR #23.

---

### Task D10: `notifications` lọc theo Tabs + Đánh dấu đã đọc / Xóa mềm (JS)

**Yêu cầu:** Viết logic JavaScript (`js/pages/notifications.js`) hiển thị danh sách thông báo, lọc theo 3 tab (`Tất cả`, `Chưa đọc`, `Đã lưu trữ`), hỗ trợ bấm vào từng thông báo để đánh dấu đã đọc, bấm nút **Đánh dấu đã đọc tất cả** và **Lưu trữ / Xóa mềm (Archive)**.

**Cách thực hiện:**
- Khởi tạo dữ liệu thông báo trong `localStorage` (`craftlink_notifications_v1`).
- Render thanh `#notifTabs` kèm bộ đếm số lượng từng tab (`all`, `unread`, `archived`).
- Xử lý sự kiện click trên nút `[data-read]` để đổi `unread: false`, nút `[data-arch]` để chuyển `archived: true` (xóa mềm thay vì xóa vĩnh viễn theo đúng quy tắc bảo toàn dữ liệu của đề bài), và nút `#btnMarkAll` đánh dấu toàn bộ thông báo thành đã đọc.

**Mã nguồn liên quan:** `js/pages/notifications.js`, `pages/notifications.html`, `css/pages/notifications.css`.

**Kết quả:** Chuyển tab mượt mà, khi tab `Chưa đọc` hoặc `Đã lưu trữ` có 0 phần tử thì tự động hiện `#state-empty` (`🔔 Không có thông báo nào`), lưu trạng thái bền vững qua `localStorage`.

**Minh chứng:** Nhánh `feature/dinhson-d10-notif-tabs`, Commit `feat: add notification tabs` (`7b16be9`).

---

### Task D11: `proposal-editor` Lưu nháp / Gửi đề xuất & Quản lý phiên bản (JS)

**Yêu cầu:** Xây dựng logic cho trang `maker-proposal-editor.html` (`js/pages/maker-proposal-editor.js`) cho phép nghệ nhân chọn Brief từ danh sách, kiểm tra hợp lệ biểu mẫu (Giá đề xuất `>= 10.000đ`, Thời gian hoàn thành `1–90 ngày`, Các mốc thực hiện tối thiểu 10 ký tự), hỗ trợ **Lưu nháp (`draft`)**, **Gửi đề xuất (`pending`)**, tự động tăng số phiên bản (`v1`, `v2`...) và **Lưu trữ (`archived`)** đề xuất.

**Cách thực hiện:**
- Nạp song song `briefs` và `proposals` qua `Promise.all([API.all("briefs"), API.all("proposals")])`.
- Khi nghệ nhân chọn một Brief ở `#briefSelect`, tự động hiển thị tóm tắt yêu cầu và ngân sách tham khảo của khách ở `#briefInfo`.
- Viết hàm `saveProposal(status)` kiểm tra đầy đủ các trường dữ liệu; nếu hợp lệ sẽ tự động tính `version` tiếp theo cho Brief đó, lưu vào `craftlink_proposals_v1` qua `API.saveAll("proposals", proposals)`, đồng thời cập nhật trạng thái Brief sang `"accepted"`.

**Mã nguồn liên quan:** `js/pages/maker-proposal-editor.js`, `assets/data/proposals.json`, `pages/maker-proposal-editor.html`.

**Kết quả:** Biểu mẫu chặn chính xác dữ liệu rỗng hoặc sai khoảng giá trị, phân biệt rõ trạng thái `Nháp` và `Chờ khách duyệt`, hỗ trợ nạp lại đề xuất cũ lên form để chỉnh sửa hoặc lưu trữ mềm.

**Minh chứng:** Nhánh `feature/dinhson-d07-proposal-html`, Commit `add proposal editor html` (`742e521`), PR #26.

---

### Task D12: `listing` Ẩn/Hiện (Archive/Restore) + Thêm/Sửa sản phẩm (JS)

**Yêu cầu:** Xây dựng logic CRUD hoàn chỉnh cho trang Quản lý sản phẩm (`js/pages/maker-listing-management.js`): lọc sản phẩm theo 5 tab (`Tất cả`, `Đang bán`, `Chờ duyệt`, `Từ chối`, `Đã ẩn`), mở Modal thêm sản phẩm mới (mặc định trạng thái `pending` chờ Moderator duyệt), sửa thông tin sản phẩm, và chuyển đổi trạng thái **Ẩn (`archived`) / Hiện lại (`active`)** thay cho xóa cứng.

**Cách thực hiện:**
- Kết nối kho dữ liệu `craftlink_listings_v1` và `craftlink_categories_v1` thông qua `API.all("listings")` và `API.all("categories")`.
- Kiểm tra hợp lệ dữ liệu trong Modal: Tên sản phẩm tối thiểu 3 ký tự, Giá bán tối thiểu `10.000đ`, Thời gian gia công từ `1–60 ngày`.
- Khi thêm mới hoặc chỉnh sửa xong, gọi `API.saveAll("listings", listings)` để đồng bộ trực tiếp với màn hình Hàng chờ duyệt (`moderator-moderation-queue.html` của SV3) và trang Chợ (`buyer-marketplace.html` của SV1).

**Mã nguồn liên quan:** `js/pages/maker-listing-management.js`, `assets/data/listings.json`, `pages/maker-listing-management.html`.

**Kết quả:** Luồng liên thông đa vai trò hoạt động trơn tru: sản phẩm nghệ nhân vừa tạo ở trạng thái `pending` xuất hiện ngay bên Hàng chờ duyệt của Moderator; thao tác Ẩn/Hiện cập nhật tức thì bộ đếm trên thanh Tabs.

**Minh chứng:** Nhánh `feature/dinhson-d05-listing-html`, Commit `feat: add listing layout html` (`2472b1c`) & `fix:fix a few issues related to the execution flow` (`d361fae`), PR #25.

---

### Task D13: Tích hợp AI-3 (`ai-revision.js`) trong Proposal + `settings.js` Dark Mode

**Yêu cầu:**
1. Xây dựng module **AI-3 Revision Summarizer (`js/modules/ai-revision.js`)** và tích hợp vào `maker-proposal-editor.html`: phân tích yêu cầu chỉnh sửa tự do của khách hàng thành danh sách hạng mục kỹ thuật (Màu sắc, Kích thước, Khắc chữ, Chất liệu, Thời hạn), ước tính ngày cộng thêm (`deltaDays`), phần trăm chi phí phát sinh (`deltaCostPct`) và lý do giải thích (`why`). Hỗ trợ kịch bản lỗi AI ("Không đủ dữ liệu" khi chuỗi quá ngắn hoặc nhập từ khóa `"fail"`).
2. Xây dựng logic **`js/pages/settings.js`** điều khiển công tắc **Nền tối (Dark Mode)** (`document.documentElement.classList.toggle("theme-dark", s.dark)`) và lưu cấu hình vào `localStorage` (`craftlink_settings_v1`).

**Cách thực hiện:**
- Trong `js/modules/ai-revision.js`: Xây dựng hàm bất đồng bộ `AIRevision.summarize(text)` có độ trễ mô phỏng `350ms`, kiểm tra độ dài chuỗi (`< 8` ký tự trả về `{ ok: false, reason: "Không đủ dữ liệu..." }`), dùng biểu thức chính quy bóc tách các nhóm yêu cầu sửa đổi và trả về checklist hành động cho nghệ nhân.
- Trong `js/pages/maker-proposal-editor.js`: Gắn sự kiện cho 4 nút xử lý kết quả AI (`Chấp nhận -> Điền vào mốc thực hiện`, `Sửa`, `Tạo lại`, `Từ chối`).
- Trong `js/pages/settings.js`: Đồng bộ trạng thái 3 công tắc (`mail`, `sms`, `dark`) và ngôn ngữ (`lang`) với `localStorage`, kích hoạt class `theme-dark` trên thẻ `<html>`.

**Mã nguồn liên quan:** `js/modules/ai-revision.js`, `js/pages/maker-proposal-editor.js`, `js/pages/settings.js`.

**Kết quả:** Tính năng AI-3 hoạt động đúng vòng đời (Input -> Loading -> Kết quả + Lý do -> Chấp nhận/Sửa/Tạo lại/Từ chối, kèm xử lý lỗi Graceful Fallback); chế độ Nền tối (Dark Mode) đổi màu tức thì và tự động ghi nhớ khi tải lại trang.

**Minh chứng:** PR #26 (`742e521`) và PR #30 (`bc45a4f`).

---

## 3. KIỂM THỬ VÀ CÁC LỖI ĐÃ KHẮC PHỤC

| Lỗi phát hiện                                                       | Trang ảnh hưởng                        | Cách khắc phục                                                                                      | Kết quả                          |
| ------------------------------------------------------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------- |
| Bấm nút `Nhận brief` / `Từ chối` làm đóng thẻ Brief đang mở         | `pages/maker-brief-inbox.html`         | Thêm kiểm tra `if (e.target.closest("button") \|\| e.target.closest("a")) return;` trước khi toggle | ✅ Bấm nút không làm đóng thẻ    |
| Tệp `pages/settings.html` bị nhân đôi nội dung HTML khi merge nhánh | `pages/settings.html`                  | Rà soát và xóa 79 dòng HTML bị lặp ở cuối file trong nhánh `feature/dinhson-d03-settings-html`       | ✅ Giao diện chuẩn 1 khung duy nhất |
| Nút công tắc `.toggle` bị co hẹp trên màn hình điện thoại 375px     | `pages/settings.html`                  | Bổ sung thuộc tính `flex-shrink: 0` cho class `.toggle`                                             | ✅ Công tắc giữ nguyên tỷ lệ 44×24 |
| Nguy cơ lỗi XSS khi hiển thị nội dung Brief hoặc tên sản phẩm tự do | `maker-brief-inbox`, `listing`, `prop` | Bọc toàn bộ dữ liệu người dùng nhập qua hàm `escapeHTML(...)` trong `js/modules/escape.js`          | ✅ An toàn với ký tự `< > & " '` |
| Bố cục nút bấm trên trang `404.html` hơi sát nhau ở màn hình nhỏ    | `pages/404.html`                       | Cập nhật class `.row.row--center` có `flex-wrap: wrap` và tinh chỉnh `error.css`                    | ✅ Tự xuống dòng gọn ở 375px     |
| Đồng bộ cấu trúc dữ liệu `listings.json` với hàng chờ của Moderator | `maker-listing-management.html`        | Chuẩn hóa các trường `id`, `title`, `categoryId`, `basePrice`, `leadTimeDays`, `status` trong JSON  | ✅ Liên thông Maker ↔ Moderator  |

---

## 4. TỰ ĐÁNH GIÁ KIẾN THỨC HTML, CSS, JAVASCRIPT ĐÃ SỬ DỤNG

### HTML

- Sử dụng đúng các thẻ HTML5 ngữ nghĩa: `<nav>`, `<main>`, `<footer>`, `<h1>`–`<h4>`, `<form>`, `<label>`, `<select>`, `<textarea>`, `<button type="button">`.
- Tuân thủ tiêu chuẩn Accessibility (a11y): `role="tablist"`, `role="tab"`, `role="switch"`, `aria-checked`, `aria-modal="true"`, `aria-label`, thuộc tính `[hidden]`.
- Toàn bộ 8 trang HTML phụ trách đều khai báo `<meta charset="UTF-8" />`, `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` và nhúng CSS/JS theo thứ tự phân tầng chuẩn.

### CSS

- Kế thừa chặt chẽ kiến trúc CSS 3 tầng của nhóm:
  1. `css/base/base.css`: Sử dụng hệ thống biến CSS `:root` (`--primary`, `--bg`, `--card`, `--text`, `--muted`, `--border`, `--radius`).
  2. `css/components/style.css`: Tái sử dụng hệ thống `.card`, `.btn`, `.badge`, `.tabs`, `.modal-backdrop`, `.skel`, `.empty-box`, `.error-box` và các utility class `.u-*`.
  3. `css/pages/*.css`: Xây dựng các file CSS chuyên biệt không gây xung đột toàn cục gồm `css/pages/error.css`, `css/pages/profile.css`, `css/pages/notifications.css` và style `.toggle` / `html.theme-dark`.
- Đảm bảo hiển thị Responsive không vỡ khung tại 3 mốc: Desktop (`1200px+`), Tablet (`768px`) và Mobile (`375px–390px`).

### JavaScript

- Sử dụng **Vanilla JavaScript (ES6+)** thuần túy, không dùng thư viện ngoài.
- Xây dựng tầng **Data & State Management (`js/api.js`, `js/modules/ui-state.js`, `js/modules/escape.js`)**:
  - Sử dụng `async / await`, `fetch()` kết hợp `Promise.all([...])` để nạp song song nhiều bảng dữ liệu JSON.
  - Quản lý trạng thái bền vững trên `localStorage` theo khóa có phiên bản (`craftlink_listings_v1`, `craftlink_briefs_v1`, `craftlink_proposals_v1`, `craftlink_profile_v1`, `craftlink_settings_v1`, `craftlink_notifications_v1`).
- Triển khai đầy đủ 4 trạng thái giao diện (Loading Skeleton, Empty State, Error State + Retry, Normal/Success Toast) và kiểm tra hợp lệ dữ liệu (Form Validation) bằng Regular Expressions.

---

## 5. PHỤ LỤC: ẢNH GIAO DIỆN, ĐƯỜNG DẪN TỆP VÀ COMMIT GIT

### 5.1. Danh sách tệp chính do Mai Đình Sơn (SV2) thực hiện

| Loại                   | Đường dẫn tệp                                                                                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| HTML Maker (3 trang)   | `pages/maker-listing-management.html`, `pages/maker-brief-inbox.html`, `pages/maker-proposal-editor.html`                                                                                        |
| HTML Chung (5 trang)   | `pages/profile.html`, `pages/notifications.html`, `pages/settings.html`, `pages/404.html`, `pages/403.html`                                                                                      |
| JS Trang (6 tệp)       | `js/pages/maker-listing-management.js`, `js/pages/maker-brief-inbox.js`, `js/pages/maker-proposal-editor.js`, `js/pages/profile.js`, `js/pages/notifications.js`, `js/pages/settings.js`         |
| JS Module & AI (5 tệp) | `js/api.js`, `js/modules/ui-state.js`, `js/modules/escape.js`, `js/modules/bottom-nav.js`, `js/modules/ai-revision.js`                                                                           |
| CSS Riêng (3 tệp)      | `css/pages/error.css`, `css/pages/profile.css`, `css/pages/notifications.css` (+ `.toggle`, `.set-row`, `html.theme-dark` trong `css/components/style.css`)                                      |
| Dữ liệu JSON           | `assets/data/listings.json`, `assets/data/briefs.json`, `assets/data/proposals.json`, `assets/data/users.json`                                                                                   |
| Tài liệu báo cáo       | `docs/BAO-CAO-CA-NHAN-SON-SV2.md`                                                                                                                                                                |

### 5.2. Danh sách commit Git và Pull Request của Mai Đình Sơn (SV2)

| Mã commit (`SHA`) | Thông điệp Commit (`Message`)                      | Nhánh (`Branch`)                             | Task       | PR     |
| ----------------- | -------------------------------------------------- | -------------------------------------------- | ---------- | ------ |
| `85a1fe7`         | `Add files via upload` (9 ảnh mockup Maker/Shared) | `dev` / `feature/-figma-maker`               | D1         | —      |
| `81741c1`         | `feat: add 403 404 pages html`                     | `feature/dinhson-403-404-html`               | D2         | PR #22 |
| `34b7253`         | `feat: add profile page html` (+ `profile.js`)     | `feature/dinhson-d04-profile-html`           | D4, D9     | PR #23 |
| `b0ede0b`         | `fix: update responsive layout for 404 error page` | `feature/dinhson-403-404-html`               | D2-fix     | PR #24 |
| `2472b1c`         | `feat: add listing layout html` (+ `listing.js`)   | `feature/dinhson-d05-listing-html`           | D5, D12    | PR #25 |
| `742e521`         | `add proposal editor html` (+ `proposal.js`, AI-3) | `feature/dinhson-d07-proposal-html`          | D7, D11,13 | PR #26 |
| `bc45a4f`         | `feat: add settings page html` (+ `settings.js`)   | `feature/dinhson-d03-settings-html`          | D3, D13    | PR #30 |
| `d329af6`         | `Update settings.html`                             | `feature/dinhson-d03-settings-html`          | D3-fix     | PR #32 |
| `68329be`         | `feat: add brief inbox html` (+ `brief-inbox.js`)  | `feature/dinhson-d06-maker-brief-inbox-html` | D6, D8     | PR #34 |
| `7e7a1d1`         | `feat: add notifications html`                     | `feature/dinhson-d06-inbox-html`             | D6b        | PR #34 |
| `7b16be9`         | `feat: add notification tabs`                      | `feature/dinhson-d10-notif-tabs`             | D10        | PR #35 |

### 5.3. Ảnh giao diện (Mockup đối chiếu)

| Màn hình phụ trách                  | Đường dẫn file Mockup                            |
| ----------------------------------- | ------------------------------------------------ |
| Quản lý sản phẩm (Maker)            | `design/maker&public/maker-listing-management.png` |
| Hộp thư Brief (Maker)               | `design/maker&public/maker-brief-inbox.png`      |
| Soạn đề xuất & Báo giá (Maker)      | `design/maker&public/maker-proposal-editor.png`  |
| Hồ sơ cá nhân (Shared)              | `design/maker&public/profile.png`                |
| Trung tâm thông báo (Shared)        | `design/maker&public/otifications.png`           |
| Cài đặt tài khoản & Giao diện       | `design/maker&public/settings.png`               |
| Trang báo lỗi 403 (Cấm truy cập)    | `design/maker&public/403.png`                    |
| Trang báo lỗi 404 (Không tìm thấy)  | `design/maker&public/404.png`                    |

**Tất cả các màn hình, module dữ liệu và tính năng AI do Mai Đình Sơn (SV2) phụ trách đã hoàn thiện 100%, kiểm thử hoạt động ổn định và đồng bộ trên nhánh `dev`.**
