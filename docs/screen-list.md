# Bảng kiểm kê màn hình — CraftLink (BTL-11)

> Lập từ mục 8 file BTL-11. Chưa code. Chờ giảng viên duyệt bảng + luồng + Figma trước khi triển khai.
> Nguyên tắc: nghiệp vụ đầy đủ > số lượng. 12 dòng dưới là nền tảng tối thiểu, sẽ bổ sung nếu luồng thiếu.

## 1. Khách hàng — SV1 phụ trách end-to-end (mock → HTML → CSS → JS → data → responsive → branch → PR → OBS)

| Vai trò    | Mục tiêu người dùng            | Nhiệm vụ                                 | Màn hình     | Tệp                             | CRUD / Trạng thái                                          | AI                                                                    | Phụ trách |
| ---------- | ------------------------------ | ---------------------------------------- | ------------ | ------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------- | --------- |
| Khách hàng | Tìm ý tưởng tùy biến phù hợp   | Duyệt marketplace, lọc theo category/giá | Marketplace  | `pages/buyer-marketplace.html`  | R / normal, loading, empty, error                          | AI-2 Style Matcher (gợi ý maker)                                      | Huy (SV1) |
| Khách hàng | Diễn đạt yêu cầu tùy biến (P1) | Tạo brief tự do → brief chuẩn            | Custom Brief | `pages/buyer-custom-brief.html` | C/R/U / normal, invalid, success, error + AI-fail          | AI-1 Brief Builder (text → brief + Chấp nhận/Sửa/Từ chối/Tạo lại/Lưu) | Huy (SV1) |
| Khách hàng | Theo dõi đơn tùy biến          | Xem/cập nhật/hủy đơn, xem revision       | Buyer Orders | `pages/buyer-orders.html`       | C/R/U/D(→Hủy/Archive) / pending, revision, done, cancelled | AI-3 Revision Summarizer (tóm tắt sửa)                                | Huy (SV1) |

Trách nhiệm chéo SV1: hệ thống thiết kế / điều hướng / khả năng tiếp cận + responsive phần mình.

## 2. Người sáng tạo — SV2 phụ trách end-to-end + JS/data chung

| Vai trò        | Mục tiêu người dùng                | Nhiệm vụ                              | Màn hình           | Tệp                                   | CRUD / Trạng thái                                      | AI                                       | Phụ trách |
| -------------- | ---------------------------------- | ------------------------------------- | ------------------ | ------------------------------------- | ------------------------------------------------------ | ---------------------------------------- | --------- |
| Người sáng tạo | Bán được listing tùy biến          | Tạo/sửa/ẩn listing                    | Listing Management | `pages/maker-listing-management.html` | R (+C/U/Archive trong trang) / normal, empty, disabled | — (dùng kết quả AI-2 để gắn tag phù hợp) | Sơn (SV2) |
| Người sáng tạo | Nhận brief không rời rạc (P2)      | Xem inbox brief, nhận/từ chối         | Brief Inbox        | `pages/maker-brief-inbox.html`        | C/R/U / pending, accepted, rejected                    | AI-1 output hiển thị kèm brief gốc       | Sơn (SV2) |
| Người sáng tạo | Giữ vòng proposal/revision rõ (P3) | Soạn proposal theo version, gửi duyệt | Proposal Editor    | `pages/maker-proposal-editor.html`    | C/R/U/D(→Archive) / draft, pending, revision, approved | AI-3 gợi ý revision trước khi gửi        | Sơn (SV2) |

Trách nhiệm chéo SV2: JavaScript / dữ liệu giả lập / tương tác AI cho cả nhóm.

## 3. Kiểm duyệt viên — SV3 phụ trách end-to-end

| Vai trò         | Mục tiêu người dùng       | Nhiệm vụ                      | Màn hình           | Tệp                                       | CRUD / Trạng thái                               | AI                                                                                    | Phụ trách |
| --------------- | ------------------------- | ----------------------------- | ------------------ | ----------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------- | --------- |
| Kiểm duyệt viên | Chặn listing vi phạm (P4) | Duyệt / từ chối / yêu cầu sửa | Moderation Queue   | `pages/moderator-moderation-queue.html`   | R (+U trạng thái) / pending, approved, rejected | AI hỗ trợ gắn cờ thiếu thông tin (fail: “AI chưa chắc chắn”) + Thử lại/Bỏ qua/Báo cáo | Sáng (SV3) |
| Kiểm duyệt viên | Xử lý phản ánh            | Xem/sửa/trả lời báo cáo       | Report Center      | `pages/moderator-report-center.html`      | C/R/U / open, handling, done                    | —                                                                                     | Sáng (SV3) |
| Kiểm duyệt viên | Chuẩn hóa nội dung        | Soạn/sửa/xóa guideline        | Content Guidelines | `pages/moderator-content-guidelines.html` | C/R/U/D / normal, empty, success                | —                                                                                     | Sáng (SV3) |

## 4. Quản trị viên — SV3 phụ trách end-to-end + tích hợp/phát hành

| Vai trò       | Mục tiêu người dùng | Nhiệm vụ                     | Màn hình            | Tệp                                    | CRUD / Trạng thái                           | AI                                                                    | Phụ trách |
| ------------- | ------------------- | ---------------------------- | ------------------- | -------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------- | --------- |
| Quản trị viên | Giữ taxonomy sạch   | CRUD category                | Category Management | `pages/admin-category-management.html` | R (+C/U/Archive) / normal, empty, error     | —                                                                     | Sáng (SV3) |
| Quản trị viên | Quản lý tài khoản   | Khóa/mở/phân vai             | User Management     | `pages/admin-user-management.html`     | C/R/U (+Disable) / active, disabled         | —                                                                     | Sáng (SV3) |
| Quản trị viên | Nhìn toàn sàn       | Số liệu brief/order/revision | Platform Dashboard  | `pages/admin-platform-dashboard.html`  | C/R/U/D(→Archive cấu hình) / loading, empty | Tổng hợp insight từ 3 AI (chỉ mock, có trạng thái “Không đủ dữ liệu”) | Sáng (SV3) |

Trách nhiệm chéo SV3: responsive / tích hợp / phát hành / QA + nhất quán điều hướng toàn dự án.

## 5. Màn hình dùng chung (DONE — GĐ2)

| Vai trò | Mục tiêu người dùng           | Nhiệm vụ                                | Màn hình                   | Tệp                          | CRUD / Trạng thái                                               | AI  | Phụ trách |
| ------- | ----------------------------- | --------------------------------------- | -------------------------- | ---------------------------- | --------------------------------------------------------------- | --- | --------- |
| Chung   | Vào sàn, chọn vai trò         | Điều hướng 4 role + luồng tổng mục 7    | Landing chung (DONE)       | `index.html`                 | R / normal                                                      | —   | Huy (SV1) |
| Chung | Vào tài khoản đúng role | Đăng nhập đa role, validation | Đăng nhập (DONE) | `pages/login.html` | R / normal, invalid, success, error | — | Huy (SV1) |
| Chung | Tạo tài khoản mới | Đăng ký buyer, validation | Đăng ký (DONE) | `pages/register.html` | C / normal, invalid, success | — | Huy (SV1) |
| Chung | Lấy lại quyền truy cập | Nhập email → gửi link giả lập | Quên mật khẩu (DONE — GĐ2) | `pages/forgot-password.html` | R / idle, loading, success, error | — | Huy (SV1) |
| Chung | Quản lý danh tính | Xem/sửa tên, avatar, bio | Hồ sơ (DONE — GĐ2) | `pages/profile.html` | R/U overlay LocalStorage / empty, loading, success toast, error | — | Sơn (SV2) |
| Chung | Nắm cập nhật theo role | Lọc + đọc/xóa thông báo | Thông báo (DONE — GĐ2) | `pages/notifications.html` | R/U/D-soft(archived) / loading, empty | — | Sơn (SV2) |
| Chung | Hiểu khi bị chặn quyền | Trang 403 đồng bộ 404 | 403 (DONE — GĐ2) | `pages/403.html` | — / error | — | Sơn (SV2) |
| Chung | Hiểu khi lạc trang | Trang 404 tối thiểu | 404 (DONE) | `pages/404.html` | — / error | — | Sơn (SV2) |
| Chung | Tùy biến trải nghiệm (NÊN CÓ) | Dark/light, ngôn ngữ mock, toggle email | Cài đặt (DONE — GĐ2) | `pages/settings.html` | U LocalStorage / normal, success toast | — | Sơn (SV2) |
| Kinh doanh (ngoài BTL mục 8, đã duyệt bổ sung) | Mở gian hàng có phí | Nhập shop/sđt/email/địa chỉ → chọn gói mock → lên maker | Mở gian hàng (DONE) | `pages/seller-register.html` | C / normal, invalid, loading, success, error | — | Sáng (SV3) |

## 6. Bao phủ trạng thái (rút gọn để duyệt)

- Buyer marketplace: normal, loading (skeleton), empty (lọc 0 kết quả), error (mock fail).
- Custom brief + 3 AI: input → validate → processing → result + “Vì sao” → Accept/Edit/Reject/Regenerate/Save; fail: “Không đủ dữ liệu / AI chưa chắc chắn / Không thể xử lý” + Thử lại/Bỏ qua/Dùng thủ công.
- Orders/proposals: pending, revision, approved/done, rejected, cancelled/archived.
- Moderator/admin: pending/handling/done, empty, disabled.

## 7. Chuẩn DONE mỗi màn hình (trích mục 8 + DoD)

Figma → HTML ngữ nghĩa → CSS + responsive → JS tương tác + validation → mock/API → empty/loading/error → a11y cơ bản → branch → commit đúng mẫu → PR review chéo → merge `dev` → OBS `SVx-NN-screen-name.mp4` → cập nhật bảng này.

## 9. Ma trận state coverage (GĐ3 — màn × state)

Helper dùng chung: `js/modules/ui-state.js` (`renderLoading` skeleton, `renderEmpty`, `renderError`, `renderToast` góc phải trên tự ẩn 3s, `renderBadge` map status → màu pending/rejected/completed/cancelled).

| Màn hình                                  | normal   | loading            | empty                     | success         | error                                    | disabled                             | pending             | rejected  | completed          | cancelled-archived      |
| ----------------------------------------- | -------- | ------------------ | ------------------------- | --------------- | ---------------------------------------- | ------------------------------------ | ------------------- | --------- | ------------------ | ----------------------- |
| `index.html`                              | x        | —                  | —                         | —               | —                                        | —                                    | —                   | —         | —                  | —                       |
| `pages/login.html`                        | x        | —                  | —                         | x               | x (invalid)                              | —                                    | —                   | —         | —                  | —                       |
| `pages/register.html`                     | x        | —                  | —                         | x               | x (invalid)                              | —                                    | —                   | —         | —                  | —                       |
| `pages/forgot-password.html`              | x (idle) | x (800ms)          | —                         | x               | x (email không tồn tại)                  | x (nút gửi khi đang gửi)             | —                   | —         | —                  | —                       |
| `pages/profile.html`                      | x        | x                  | x (chưa có bio)           | x (toast)       | x                                        | —                                    | —                   | —         | —                  | —                       |
| `pages/notifications.html`                | x        | x                  | x (filter 0 kết quả)      | —               | —                                        | —                                    | —                   | —         | —                  | x (xóa mềm → archived)  |
| `pages/403.html`, `pages/404.html`        | —        | —                  | —                         | —               | x                                        | —                                    | —                   | —         | —                  | —                       |
| `pages/settings.html`                     | x        | —                  | —                         | x (toast)       | —                                        | —                                    | —                   | —         | —                  | —                       |
| `pages/buyer-marketplace.html`            | x        | x (skeleton)       | x (lọc 0 kết quả)         | —               | x (+`?fail` demo)                        | x (Tạo lại khi chưa có KQ)           | —                   | —         | —                  | —                       |
| `pages/buyer-custom-brief.html`           | x        | x (AI processing)  | —                         | x               | x (invalid + AI-fail “Không đủ dữ liệu”) | x (nút khi đang xử lý)               | —                   | —         | —                  | —                       |
| `pages/buyer-orders.html`                 | x        | x                  | x (filter cancelled rỗng) | x (toast)       | x (+`?fail=1` demo)                      | —                                    | x (badge)           | —         | x (badge done)     | x (Hủy đơn → cancelled) |
| `pages/maker-listing-management.html`     | x        | x                  | x                         | x               | x                                        | x                                    | x (badge)           | x (badge) | x (badge active)   | x (Archive)             |
| `pages/maker-brief-inbox.html`            | x        | x                  | x                         | —               | x                                        | x (vô hiệu thao tác khi đã xử lý)    | x (badge sent)      | x (badge) | x (badge accepted) | —                       |
| `pages/maker-proposal-editor.html`        | x        | x                  | —                         | x               | x                                        | —                                    | x (badge)           | x (badge) | x (badge approved) | x (Archive)             |
| `pages/moderator-moderation-queue.html`   | x        | x                  | x (queue trống)           | x (toast duyệt) | x                                        | x (Duyệt đã chọn khi chưa chọn item) | x (badge)           | x (badge) | x (badge active)   | —                       |
| `pages/moderator-report-center.html`      | x        | x                  | x                         | x               | x                                        | —                                    | x (open/handling)   | —         | x (done)           | —                       |
| `pages/moderator-content-guidelines.html` | x        | —                  | x                         | x               | —                                        | —                                    | —                   | —         | —                  | x (xóa)                 |
| `pages/admin-category-management.html`    | x        | x                  | x                         | x               | x                                        | —                                    | —                   | —         | —                  | x (Archive)             |
| `pages/admin-user-management.html`        | x        | x                  | —                         | x               | x                                        | x (Disable thay Xóa)                 | —                   | —         | x (active)         | x (disabled)            |
| `pages/admin-platform-dashboard.html`     | x        | x (skeleton chart) | —                         | —               | x (+`?fail=1` demo)                      | —                                    | x (số liệu pending) | —         | —                  | —                       |

## 8. Lát cắt dọc mỗi SV (bắt buộc)

- SV1: mock buyer → buyer-marketplace/custom-brief/orders + login/register/index → responsive → `feature/buyer-*` → PR → OBS.
- SV2: mock maker + `assets/data/*.json` + AI-1/AI-3 → maker 3 trang → `feature/maker-*` → PR → OBS.
- SV3: moderator + admin 6 trang + nav + 404 → `feature/moderator-*`, `feature/admin-*` → tích hợp `dev` → `main` → OBS.
