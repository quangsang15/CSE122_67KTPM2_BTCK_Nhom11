# BÁO CÁO CÁ NHÂN — SÁNG (LEADER)

> **Họ và tên:** Nguyễn Quang Sáng  
> **Vai trò:** Trưởng nhóm  
> **Lớp:** 67KTPM2 – Học phần: CSE122 (Phát triển ứng dụng Web cơ bản)  
> **Dự án:** CraftLink – Sàn sản phẩm sáng tạo tùy biến  
> **Trách nhiệm chính:**
>
> 1. Trực tiếp phát triển trọn gói 7 màn hình: Admin (3 trang), Moderator (3 trang), Mở gian hàng Seller (1 trang).
> 2. Thiết kế kiến trúc CSS 3 tầng dùng chung toàn dự án (`base.css`, `components/style.css`).
> 3. Xây dựng phân quyền Auth Guard (`guard.js`) & trang lỗi cấm quyền `403.html`.
> 4. Quản trị tích hợp hệ thống, Review Pull Request, giải quyết xung đột mã nguồn & Phát hành phiên bản.

---

## MỤC LỤC CHI TIẾT

1. [DANH MỤC CÔNG VIỆC ĐÃ HOÀN THÀNH & MINH CHỨNG GIT/OBS](#1-danh-mục-công-việc-đã-hoàn-thành--minh-chứng-gitobs)
   - 1.1. Bảng tổng hợp 7 màn hình phụ trách
   - 1.2. Các đóng góp kiến trúc toàn cục (Global Architecture)
2. [CHI TIẾT KỸ THUẬT TỪNG MÀN HÌNH DO SÁNG THỰC HIỆN](#2-chi-tiết-kỹ-thuật-từng-màn-hình-do-sáng-thực-hiện)
   - 2.1. Màn hình 1: `admin-platform-dashboard.html` (Bảng điều khiển sàn)
   - 2.2. Màn hình 2: `admin-category-management.html` (Quản lý danh mục & Lưu trữ)
   - 2.3. Màn hình 3: `admin-user-management.html` (Quản lý tài khoản & Khóa/Mở khóa)
   - 2.4. Màn hình 4: `moderator-moderation-queue.html` (Hàng chờ duyệt sản phẩm & Duyệt hàng loạt)
   - 2.5. Màn hình 5: `moderator-report-center.html` (Trung tâm xử lý khiếu nại báo cáo)
   - 2.6. Màn hình 6: `moderator-content-guidelines.html` (Quản lý hướng dẫn nội dung CRUD)
   - 2.7. Màn hình 7: `seller-register.html` (Đăng ký mở gian hàng Maker đa bước)
3. [KIẾN TRÚC HỆ THỐNG TOÀN CỤC DO LEADER THIẾT LẬP](#3-kiến-trúc-hệ-thống-toàn-cục-do-leader-thiết-lập)
   - 3.1. Thiết kế phân tầng CSS 3 lớp giải quyết xung đột nhóm
   - 3.2. Chuẩn hóa Responsive Mobile 390px & Bottom Navigation
   - 3.3. Module Auth Guard (`guard.js`)
4. [KỊCH BẢN VẤN ĐÁP TRỰC DIỆN DÀNH RIÊNG CHO SÁNG (DEFENSE CHEAT-SHEET)](#4-kịch-bản-vấn-đáp-trực-diện-dành-riêng-cho-sáng-defense-cheat-sheet)
   - Câu hỏi vai trò Leader & Phân chia công việc
   - Câu hỏi chuyên sâu về Dashboard & Tính toán dữ liệu
   - Câu hỏi về Thuật toán & Quản trị trạng thái (Queue, Category, Users)
   - Câu hỏi về Responsive & Kiến trúc CSS
   - Câu hỏi tình huống phản biện hóc búa từ Giảng viên
5. [TỰ ĐÁNH GIÁ ĐIỂM SỐ & MINH CHỨNG](#5-tự-đánh-giá-điểm-số--minh-chứng)

---

## 1. DANH MỤC CÔNG VIỆC ĐÃ HOÀN THÀNH & MINH CHỨNG GIT/OBS

### 1.1. Bảng tổng hợp 7 màn hình phụ trách

| STT | Màn hình               | Tệp HTML / JS / CSS                                                                                          | Vai trò | Chức năng chính                                                                                                  | Trạng thái Git / PR                                  |
| :-: | :--------------------- | :----------------------------------------------------------------------------------------------------------- | :-----: | :--------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------- |
|  1  | **Dashboard**          | `pages/admin-platform-dashboard.html`<br>`js/pages/admin-platform-dashboard.js`<br>`css/pages/dashboard.css` |  Admin  | Tổng hợp KPI, vẽ biểu đồ doanh thu theo danh mục, bắt sự kiện đa tab real-time, test lỗi `?fail=1`.              | PR #9 (HTML)<br>PR #15 (JS)                          |
|  2  | **Quản lý danh mục**   | `pages/admin-category-management.html`<br>`js/pages/admin-category-management.js`                            |  Admin  | CRUD danh mục, tự sinh slug chuẩn SEO, đếm số lượng listing liên kết, Lưu trữ / Khôi phục danh mục.              | PR #18 (Full CRUD)                                   |
|  3  | **Quản lý người dùng** | `pages/admin-user-management.html`<br>`js/pages/admin-user-management.js`<br>`css/pages/users.css`           |  Admin  | Lọc tabs vai trò, tìm kiếm theo tên/email, Khóa/Mở khóa tài khoản có modal xác nhận, chặn khóa Admin.            | PR #6 (HTML)<br>PR #14 (JS)                          |
|  4  | **Hàng chờ duyệt**     | `pages/moderator-moderation-queue.html`<br>`js/pages/moderator-moderation-queue.js`<br>`css/pages/queue.css` |   Mod   | Lọc tabs theo trạng thái, Duyệt / Từ chối từng sản phẩm, Checkbox chọn hàng loạt (Bulk Actions).                 | PR #5 (HTML)<br>PR #12 (Render)<br>PR #16 (Moderate) |
|  5  | **Trung tâm báo cáo**  | `pages/moderator-report-center.html`<br>`js/pages/moderator-report-center.js`<br>`css/pages/reports.css`     |   Mod   | Phân luồng báo cáo theo 4 tab, quy trình đổi trạng thái nghiệp vụ từ Mới -> Đang xử lý -> Hoàn tất.              | PR #3 (HTML)<br>PR #13 (JS)                          |
|  6  | **Hướng dẫn nội dung** | `pages/moderator-content-guidelines.html`<br>`js/pages/moderator-content-guidelines.js`                      |   Mod   | Quản lý quy chuẩn sản phẩm, Form thêm/sửa, modal xác nhận xóa, toggle hiển thị box rỗng khi hết dữ liệu.         | PR #19 (Full CRUD)                                   |
|  7  | **Đăng ký Seller**     | `pages/seller-register.html`<br>`js/pages/seller-register.js`<br>`css/pages/seller.css`                      | Seller  | Form 3 bước (Thông tin -> Gói -> Thanh toán), validate số điện thoại/email, giả lập thanh toán nâng quyền Maker. | PR #7 (HTML)<br>PR #16 (Validate/Pay)                |

### 1.2. Các đóng góp kiến trúc toàn cục (Global Architecture)

- **Tổ chức hệ thống CSS 3 tầng (`PR #8`):** `base.css` (tokens), `components/style.css` (89+ UI components dùng chung), `pages/*.css` (style riêng).
- **Phát triển và chuẩn hóa Responsive Mobile 390px (`PR #10`, `PR #11`):** Thiết kế thanh điều hướng cố định đáy trang (`.bottom-nav`) cho toàn bộ các trang Admin/Mod/Seller, tự động ẩn header Desktop, tối ưu hiển thị không bị tràn ngang ở mọi kích thước màn hình.
- **Xây dựng module kiểm soát truy cập Client-side (`PR #17`):** Hoàn thiện `Guard.require()` kiểm tra quyền hạn trước khi tải trang, tự động redirect `login.html` và xây dựng trang cấm quyền `pages/403.html`.
- **Chuẩn hóa hệ thống thông báo Toast & Utilities (`PR #20`):** Định nghĩa `#ui-toast` đa trạng thái (`.toast--success`, `.toast--error`), các utilities `.u-fs12`, `.u-mono`, `.col-w40`, phân biệt màu sắc nút bấm `.btn--archive`, `.btn--outline-success`.

---

## 2. CHI TIẾT KỸ THUẬT TỪNG MÀN HÌNH DO SÁNG THỰC HIỆN

### 2.1. `admin-platform-dashboard.html` (Bảng điều khiển sàn)

- **Đặc điểm kỹ thuật nổi bật:**
  - Tổng hợp dữ liệu đa nguồn từ các mảng: `orders`, `listings`, `users`.
  - Tính toán các chỉ số kinh doanh chính xác: Tổng doanh thu (VNĐ), Tổng đơn hàng, Số thợ thủ công đang hoạt động, Tỷ lệ duyệt listing thành công (%).
  - Biểu đồ phân bổ doanh thu theo danh mục: Tính tỷ lệ phần trăm động và vẽ thanh biểu đồ (`width: X%`) bằng JavaScript thuần.
  - **Cơ chế Phản ứng Đa tab (Multi-tab Reactive):** Lắng nghe sự kiện `storage`. Khi tài khoản Moderator duyệt thêm bài hoặc Admin khóa tài khoản ở cửa sổ khác, Dashboard tự động tính toán lại mà không cần tải lại trang.
  - **Kiểm thử xử lý lỗi (Resilience Testing):** Hỗ trợ cờ tham số `?fail=1` trên URL để kiểm tra khả năng phục hồi lỗi của giao diện: khi gặp sự cố, hiển thị hộp lỗi màu đỏ `#state-error` kèm nút `Thử lại (btnRetry)` thay vì bị crash ứng dụng.

### 2.2. `admin-category-management.html` (Quản lý danh mục & Lưu trữ)

- **Đặc điểm kỹ thuật nổi bật:**
  - **Hàm sinh Slug chuẩn SEO:** Tự động loại bỏ dấu tiếng Việt chuẩn Unicode NFD, chuyển ký tự thường và thay khoảng trắng bằng dấu gạch ngang (ví dụ: _"Đồ gốm sứ Bát Tràng"_ -> `do-gom-su-bat-trang`).
  - **Liên kết chéo dữ liệu (Data Integrity):** Tính toán số lượng sản phẩm đang hoạt động (`active`) tương ứng với từng danh mục từ bảng `listings`.
  - **Tính năng Soft Delete (Lưu trữ / Khôi phục):** Thay vì xóa hẳn làm mất dữ liệu sản phẩm của các Maker, danh mục được chuyển trạng thái `archived: true/false`.
  - Nút bấm trực quan: Khi hoạt động có nút `Lưu trữ` (.btn--archive viền muted); khi đã lưu trữ có nút `Khôi phục` (.btn--outline-success viền xanh lá) kèm badge phân biệt rõ ràng.

### 2.3. `admin-user-management.html` (Quản lý tài khoản)

- **Đặc điểm kỹ thuật nổi bật:**
  - Hệ thống Tabs lọc theo vai trò: Tất cả, Khách hàng (Buyer), Nghệ nhân (Maker), Moderator kèm số lượng đếm động trên nhãn tab.
  - Tìm kiếm thời gian thực (Real-time Filter) theo tên hoặc email.
  - **Nguyên tắc nghiệp vụ quan trọng (Business Rule):** Tuyệt đối **không cho phép khóa tài khoản Admin**. Khi người dùng cố tình click nút khóa tại tài khoản Admin, hệ thống vô hiệu hóa nút bấm và kích hoạt Toast cảnh báo lỗi đỏ: _"Không thể khóa tài khoản Admin!"_.
  - Modal xác nhận hành động nguy hiểm: Có modal xác nhận trước khi thực hiện thao tác khóa để tránh click nhầm.

### 2.4. `moderator-moderation-queue.html` (Hàng chờ duyệt sản phẩm)

- **Đặc điểm kỹ thuật nổi bật:**
  - Phân luồng 3 tab: Chờ duyệt (`pending`), Đã duyệt (`active`), Đã từ chối (`rejected`).
  - Tương tác duyệt đơn lẻ: Mỗi sản phẩm chờ duyệt có 2 nút độc lập `Duyệt` (.btn--primary xanh) và `Từ chối` (.btn--danger đỏ).
  - **Thao tác hàng loạt (Bulk Actions):** Sử dụng cấu trúc dữ liệu `Set` trong JavaScript để quản lý danh sách ID được chọn qua checkbox. Khi tích chọn từ 1 sản phẩm trở lên, thanh công cụ hàng loạt tự động trượt ra với nút _"Duyệt đã chọn (X)"_, cho phép duyệt cùng lúc nhiều sản phẩm chỉ với 1 cú click.

### 2.5. `moderator-report-center.html` (Trung tâm xử lý khiếu nại báo cáo)

- **Đặc điểm kỹ thuật nổi bật:**
  - Quản lý quy trình trạng thái báo cáo (State Transition):
    `open` (Báo cáo mới gửi) -> `handling` (Đang thẩm định chứng cứ) -> `done` (Đã xử lý xong/Đóng báo cáo).
  - Giao diện linh hoạt: Tại trạng thái `open` hiển thị nút `Xử lý`; tại `handling` hiển thị nút `Đóng báo cáo`; tại `done` tự động ẩn nút và hiển thị tag `✅ Đã xong`.
  - Cập nhật số lượng báo cáo tồn đọng trên tiêu đề phụ giúp kiểm duyệt viên nắm bắt khối lượng công việc tức thì.

### 2.6. `moderator-content-guidelines.html` (Quản lý hướng dẫn nội dung)

- **Đặc điểm kỹ thuật nổi bật:**
  - Hoàn thiện trọn vẹn chu trình CRUD dữ liệu (Create, Read, Update, Delete) độc lập.
  - Validate form chặt chẽ: Kiểm tra trường bắt buộc, hiển thị thông báo lỗi `#formErr` ngay trong modal.
  - Modal xác nhận xóa hai bước đảm bảo an toàn dữ liệu.
  - **Xử lý trạng thái rỗng tự động (Zero-state UX):** Khi người dùng xóa hết các hướng dẫn, thẻ danh sách `#list` tự động ẩn và kích hoạt khối rỗng `#state-empty` với icon 📋 và dòng hướng dẫn thân thiện.

### 2.7. `seller-register.html` (Đăng ký mở gian hàng Maker đa bước)

- **Đặc điểm kỹ thuật nổi bật:**
  - Thiết kế quy trình đăng ký 3 bước chuẩn thương mại điện tử (Multi-step Form):
    `Bước 1: Thông tin gian hàng` -> `Bước 2: Lựa chọn gói dịch vụ` -> `Bước 3: Xác nhận & Thanh toán`.
  - Kiểm tra hợp lệ dữ liệu (Form Validation) bằng biểu thức chính quy (Regex): Validate định dạng số điện thoại Việt Nam (10 chữ số bắt đầu bằng 0), định dạng email chuẩn.
  - Giả lập cổng thanh toán: Hiệu ứng chờ xử lý (Spinner animation ~1.2s), sau khi thanh toán thành công tự động nâng quyền tài khoản trong `craftlink_session_v1` thành `maker` và cập nhật danh sách người dùng.

---

## 3. KIẾN TRÚC HỆ THỐNG TOÀN CỤC DO LEADER THIẾT LẬP

### 3.1. Phân tầng CSS 3 lớp giải quyết xung đột nhóm

Để tránh tình trạng 3 người cùng sửa một file CSS gây ra xung đột khi merge Git, Sáng đã thiết lập cấu trúc 3 tầng:

1. `css/base/base.css`: Định nghĩa toàn bộ tokens `:root` (màu sắc, kích thước, bo góc, bóng đổ) và reset CSS.
2. `css/components/style.css`: File thành phần chung chứa hơn 89 components chuẩn hóa (nút bấm, badge, bảng, card, modal, tabs, toasts, media...). Huy và Sơn chỉ việc dùng mà không cần viết lại.
3. `css/pages/<trang>.css`: Style đặc thù riêng cho từng màn hình.

### 3.2. Chuẩn hóa Responsive Mobile 390px & Bottom Navigation

- Kiểm thử hiển thị khắt khe qua Chrome DevTools Protocol (CDP) tại kích thước điện thoại 390x844px.
- Thiết lập quy tắc media query `@media (max-width: 600px)`:
  - Ẩn thanh `.top-nav` desktop để giải phóng không gian màn hình.
  - Kích hoạt thanh `.bottom-nav` cố định ở đáy màn hình với 5 mục quản trị chính kèm icon FontAwesome dễ bấm.
  - Thêm `padding-bottom: 68px` cho layout để nội dung không bị thanh điều hướng che lấp.
  - Đảm bảo 100% trang không bị lỗi tràn thanh cuộn ngang (`docScrollW == innerWidth`).

### 3.3. Module Auth Guard (`guard.js`)

Đóng gói logic phân quyền phía Client:

```javascript
Guard.require("moderator", "admin");
```

- Tự động lấy vai trò người dùng từ session đăng nhập.
- Nếu chưa đăng nhập: Chuyển hướng ngay về `login.html`.
- Nếu sai vai trò: Chuyển hướng về trang lỗi `403.html` và ném ngoại lệ ngắt toàn bộ script phía sau.

---

## 4. KỊCH BẢN VẤN ĐÁP TRỰC DIỆN DÀNH RIÊNG CHO SÁNG (DEFENSE CHEAT-SHEET)

### Nhóm câu hỏi 1: Về vai trò Trưởng nhóm & Quản lý tiến độ

**Q1: Với vai trò Trưởng nhóm, bạn đã tổ chức quy trình làm việc và phân công nhiệm vụ như thế nào để đảm bảo dự án kịp tiến độ 22 màn hình?**

> **Trả lời:** Em đã thiết lập tài liệu phân công nhiệm vụ (`team-assignment.md`) và kế hoạch 21 ngày chi tiết trước khi gõ bất kỳ dòng code nào. Em chia 22 màn hình thành 3 luồng độc lập gắn với 3 thành viên: Huy làm Buyer & Auth, Sơn làm Maker & AI, và em làm Admin, Moderator, Seller cùng kiến trúc nền tảng. Em áp dụng quy tắc Git nghiêm ngặt: Mỗi màn hình là một feature branch độc lập, code HTML/CSS trước rồi mới đến JS. Tất cả các nhánh của nhóm đều phải tạo Pull Request để em review mã nguồn, chạy kiểm thử tự động rồi mới merge vào nhánh `dev`. Nhờ kiểm soát tốt quy trình, nhóm đã merge hơn 20 PR sạch sẽ mà không gặp bất kỳ xung đột code nào.

**Q2: Nếu trong quá trình làm việc, một thành viên bị chậm tiến độ hoặc nộp code lỗi thì bạn xử lý ra sao?**

> **Trả lời:** Với vai trò Leader, em chủ động xây dựng sẵn toàn bộ nền tảng dùng chung (Design tokens, CSS Components, Mock data JSON và Auth Guard) để các bạn không bị chặn (blocked). Khi review Pull Request, nếu phát hiện class CSS chưa chuẩn hoặc thiếu trạng thái rỗng/lỗi, em yêu cầu bạn sửa lại trên chính branch đó trước khi merge. Đối với những phần lõi dùng chung (như data mẫu listings, categories hay toast thông báo), em chủ động viết trước để hỗ trợ đồng đội bám sát đúng tiến độ chung của nhóm.

---

### Nhóm câu hỏi 2: Về Kỹ thuật Dashboard & Tính toán dữ liệu

**Q3: Trên trang Dashboard, bạn tính toán các chỉ số KPI và vẽ biểu đồ doanh thu như thế nào?**

> **Trả lời:** Em viết hàm `calculateKPIs()` tổng hợp dữ liệu từ 3 nguồn trong `localStorage`:
>
> - Doanh thu: Duyệt qua mảng `orders`, tính tổng số tiền của các đơn hàng có trạng thái thanh toán thành công.
> - Đơn hàng: Đếm tổng số bản ghi trong bảng `orders`.
> - Thợ thủ công: Lọc mảng `users` có vai trò là `maker` và trạng thái `active`.
> - Tỷ lệ duyệt: Lấy số listing đã duyệt (`active`) chia cho tổng số listing đã thẩm định (`active` + `rejected`) nhân 100%.
>   Đối với biểu đồ doanh thu danh mục, em tính tổng doanh thu theo từng ngành hàng, tìm giá trị lớn nhất (max) làm mốc 100%, sau đó tính toán tỷ lệ phần trăm tương đối của từng danh mục và gán động vào thuộc tính CSS `style.width = percentage + '%'` của các thanh bar.

**Q4: Cơ chế "phản ứng đa tab" trên Dashboard hoạt động như thế nào? Hãy chỉ ra đoạn code đó.**

> **Trả lời:** Em sử dụng sự kiện `storage` chuẩn của Web API:
>
> ```javascript
> window.addEventListener("storage", (event) => {
>   if (
>     event.key === "craftlink_listings_v1" ||
>     event.key === "craftlink_orders_v1" ||
>     event.key === "craftlink_users_v1"
>   ) {
>     loadDataAndRender();
>   }
> });
> ```
>
> Khi Moderator duyệt bài ở tab Hàng chờ duyệt, hàm `localStorage.setItem("craftlink_listings_v1", ...)` được kích hoạt. Trình duyệt sẽ phát sự kiện `storage` sang tất cả các tab khác cùng domain. Tab Dashboard bắt được sự kiện này, lập tức gọi hàm đọc lại dữ liệu mới và re-render toàn bộ số liệu trên màn hình trong vòng chưa tới 50ms mà không cần người dùng phải bấm F5.

---

### Nhóm câu hỏi 3: Về Thuật toán & Quản trị trạng thái (CRUD, Queue, User)

**Q5: Tại sao trong trang Category bạn không cho phép Xóa vĩnh viễn (Hard Delete) mà lại làm chức năng Lưu trữ (Archive)?**

> **Trả lời:** Đây là bài toán toàn vẹn dữ liệu trong thương mại điện tử (Data Integrity). Một danh mục như "Đồ gốm sứ" có thể đang liên kết với hàng chục sản phẩm của các nghệ nhân khác nhau. Nếu Admin bấm xóa vĩnh viễn danh mục đó khỏi cơ sở dữ liệu, toàn bộ các sản phẩm liên quan sẽ bị lỗi mồ côi (orphaned data), gây sập trang chi tiết hoặc vỡ giao diện Marketplace. Do đó, giải pháp chuyên nghiệp là sử dụng **Soft Delete (Lưu trữ)**: Đánh dấu `archived: true`, danh mục sẽ ẩn khỏi menu tạo mới của Maker nhưng các sản phẩm cũ vẫn hiển thị bình thường. Nút bấm cũng được em thiết kế linh hoạt cho phép "Khôi phục" lại bất cứ lúc nào.

**Q6: Làm sao bạn hiện thực được chức năng duyệt hàng loạt (Bulk Approve) trên trang Moderation Queue?**

> **Trả lời:**
>
> - Em sử dụng một đối tượng `Set` trong JS (`const selectedIds = new Set();`) để lưu trữ ID của các hàng được người dùng tích chọn. Việc dùng `Set` giúp kiểm tra sự tồn tại và thêm/xóa ID đạt độ phức tạp $O(1)$.
> - Khi checkbox ở tiêu đề được tích, em duyệt qua toàn bộ checkbox con và thêm tất cả ID vào `Set`.
> - Mỗi khi `Set` thay đổi, em gọi hàm `updateBulkBar()`: Nếu `selectedIds.size > 0`, thanh công cụ nổi ở đáy bảng sẽ được kích hoạt, hiển thị nút _"Duyệt đã chọn (" + selectedIds.size + ")"_.
> - Khi bấm nút duyệt hàng loạt, em cập nhật trạng thái của tất cả listing có ID trong `Set` thành `active`, lưu vào `localStorage` và cập nhật lại giao diện.

**Q7: Tại sao bạn phải chặn tuyệt đối việc khóa tài khoản Admin trên trang User Management?**

> **Trả lời:** Đây là nguyên tắc bảo vệ quyền tối cao của hệ thống (Privilege Protection). Nếu hệ thống cho phép khóa Admin, một Quản trị viên bất cẩn có thể tự khóa tài khoản của chính mình hoặc khóa tài khoản của các quản trị viên khác, dẫn đến tình trạng hệ thống bị "mồ côi quản trị" (Orphaned System) mà không ai có thể đăng nhập vào để mở khóa lại được. Do đó, trong hàm render, em đặt điều kiện: Nếu `user.role === 'admin'`, nút bấm sẽ bị vô hiệu hóa (`disabled`) và nếu có can thiệp DOM để click, hệ thống vẫn chặn ở tầng logic JS và kích hoạt Toast lỗi đỏ từ chối hành động.

---

### Nhóm câu hỏi 4: Về Kiến trúc CSS & Responsive

**Q8: Bạn đã tổ chức Responsive trên thiết bị di động như thế nào để đảm bảo không bị vỡ giao diện?**

> **Trả lời:** Em sử dụng chiến lược Mobile Optimization thông qua media query:
>
> 1. Đo kiểm và tối ưu chuẩn kích thước 390x844px (kích thước tiêu chuẩn của iPhone).
> 2. Đưa các bảng dữ liệu phức tạp vào container `.table-wrap` có `overflow-x: auto` để bảng cuộn ngang mượt mà mà không làm méo mó các phần tử khác trên trang.
> 3. Tự động chuyển đổi các thẻ linh động (`.row`, `.page-header-row`, `.grid-2`) thành dạng cột dọc (`flex-direction: column`) trên màn hình nhỏ.
> 4. Chuyển đổi thanh điều hướng: Ẩn `.top-nav` và hiện `.bottom-nav` cố định đáy với khoảng đệm an toàn `padding-bottom: 68px`.
>    Toàn bộ 7 trang em làm đều được chạy kiểm thử tự động qua script CDP với kết quả `docScrollW == innerWidth` (chính xác 390px, tràn ngang 0px).

---

## 5. TỰ ĐÁNH GIÁ ĐIỂM SỐ & MINH CHỨNG

- **Mức độ hoàn thành khối lượng:** 100% (7/7 màn hình tự tay thiết kế và lập trình, không sao chép).
- **Chất lượng mã nguồn:** Tuân thủ quy chuẩn Clean Code, đặt tên biến rõ ràng, module hóa độc lập, không có comment thừa trong mã phát hành.
- **Minh chứng Git:** 20+ Pull Request liên tục, minh chứng cho toàn bộ hành trình từ phân tích, tạo khung HTML/CSS, bổ sung logic JS đến tối ưu hóa giao diện.
- **Điểm đề xuất:** **9.5 - 10 / 10** cho toàn bộ phần công việc của SV3 (Sáng).
