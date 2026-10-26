const $ = (id) => document.getElementById(id);
const KEY = "craftlink_notifs_v1";
const ICONS = { order: "📦", message: "💬", review: "⭐", system: "🔔", promo: "🎁" };
let filter = "all", notifs = [];
const role = () => { try { return (JSON.parse(localStorage.getItem("craftlink_session_v1")) || {}).role || "buyer"; } catch (e) { return "buyer"; } };
try {
  const s = JSON.parse(localStorage.getItem("craftlink_session_v1"));
  if (s && s.email) $("navUser").textContent = s.email.split("@")[0];
} catch (e) {}

function seed(r) {
  const base = [
    { type: "order", title: "Yêu cầu của bạn có báo cáo giá mới", time: "5 phút trước", role: "buyer" },
    { type: "message", title: "Nghệ nhân gửi tin nhắn về brief của bạn", time: "2 giờ trước", role: "buyer" },
    { type: "review", title: "Đơn hàng đã hoàn thành, hãy đánh giá nghệ nhân", time: "Hôm qua", role: "buyer" },
    { type: "order", title: "Có yêu cầu mới cần báo giá", time: "1 giờ trước", role: "maker" },
    { type: "system", title: "Món của bạn đã được duyệt", time: "Hôm qua", role: "maker" },
    { type: "order", title: "Còn 5 bài chờ duyệt", time: "30 phút trước", role: "moderator" },
    { type: "system", title: "Có khiếu nại mới cần xử lý", time: "Hôm qua", role: "moderator" },
    { type: "system", title: "Có thành viên mới tham gia", time: "Hôm nay", role: "admin" },
    { type: "promo", title: "Ưu đãi đặc biệt cho đơn đầu tiên", time: "1 tuần trước", role: "all" },
  ];
  return base.filter((n) => n.role === r || n.role === "all")
    .map((n, i) => ({ id: "n" + (i + 1), ...n, read: i % 3 === 0, archived: false }));
}

function persist() { localStorage.setItem(KEY + "_" + role(), JSON.stringify(notifs)); }

function render() {
  const rows = notifs.filter((n) => !n.archived && (filter === "all" || (filter === "unread" ? !n.read : n.read)));
  const unread = notifs.filter((n) => !n.archived && !n.read).length;
  $("notifSub").textContent = unread ? unread + " thông báo chưa đọc" : "Tất cả đã đọc";
  $("btnReadAll").hidden = !unread;
  $("state-empty").hidden = rows.length > 0;
  document.querySelectorAll(".tabs .tab").forEach((t) => t.classList.toggle("active", t.dataset.f === filter));
  $("list").innerHTML = rows.map((n) =>
    "<div class='card notif" + (n.read ? "" : " unread") + "' data-open='" + n.id + "'>" +
    "<span class='u-fs24 u-noshrink'>" + (ICONS[n.type] || "🔔") + "</span>" +
    "<div class='u-flex1'><p style='font-weight:" + (n.read ? 400 : 600) + ";margin-bottom:4px'>" + escapeHTML(n.title) + "</p>" +
    "<span class='muted u-fs12'>" + escapeHTML(n.time) + "</span></div>" +
    (n.read ? "" : "<div class='dot'></div>") +
    "<button class='btn btn--sm' data-del='" + n.id + "' aria-label='Xóa thông báo'>Xóa</button></div>"
  ).join("");
  $("list").querySelectorAll("[data-open]").forEach((el) =>
    el.addEventListener("click", (e) => {
      if (e.target.closest("[data-del]")) return;
      notifs = notifs.map((x) => (x.id === el.dataset.open ? { ...x, read: true } : x));
      persist();
      render();
    }));
  $("list").querySelectorAll("[data-del]").forEach((b) =>
    b.addEventListener("click", () => {
      notifs = notifs.map((x) => (x.id === b.dataset.del ? { ...x, archived: true } : x));
      persist();
      render();
    }));
}

document.querySelectorAll(".tabs .tab").forEach((t) =>
  t.addEventListener("click", () => { filter = t.dataset.f; render(); }));
$("btnReadAll").addEventListener("click", () => {
  notifs = notifs.map((n) => ({ ...n, read: true }));
  persist();
  render();
});

$("state-loading").hidden = false;
setTimeout(() => {
  try { notifs = JSON.parse(localStorage.getItem(KEY + "_" + role())) || seed(role()); }
  catch (e) { notifs = seed(role()); }
  persist();
  $("state-loading").hidden = true;
  render();
}, 400);
