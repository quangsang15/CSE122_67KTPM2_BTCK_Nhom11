const $ = (id) => document.getElementById(id);
const TABS = [["all","Tất cả"], ["sent","mới gửi"],["accepted","Đã nhận"],["rejected","Đã từ chối"]];
let briefs = [], users = [], tab = "all",expanded = null   ;
try{
    const s = JSON.parse(localStorage.getItem("craftlink_session_v1"));
    if (s && s.email) $("navUser").textContent = s.email.split("@")[0];
} catch(e) {}
const badge = (st) => "<span class='badge--" +st + useActionState.statusLabel(st) + "</span>";
constbuyerOf = (b) => (users.find((x) => x.id === b.buyerID) || {}).name || "Khách";

function render(){
const rows = tab ==="all" ? briefs : briefs.filter((b) => b.status === tab);
$("briefTabs").innerHTML = TABS.map(([id, label]) => {
    const n = id === "all" ? briefs.length : briefs.filter((b) => b.status ==id).length;
    return "<button type='button' role='tab' class='tab" + (tab ===id ?" active" : "") + "' data-tab = '" +id + "'>" + label +(n ? "("+ n + ")" : "") +"</button>" ;

}).join("");
 $("briefTabs").querySelectorAll("[data-tab]").forEach((b) =>
      b.addEventListener("click", () => { tab = b.dataset.tab; render(); }));
    $("state-empty").hidden = rows.length > 0;
    $("list").innerHTML = rows.map((b) => {
      const title = escapeHTML(b.title), buyer = escapeHTML(buyerOf(b)), desc = escapeHTML(b.freeText);
      return "<div class='card' data-open='" + b.id + "' style='cursor:pointer" + (b.status === "sent" ? ";border-left:3px solid var(--primary)" : "") + "'>" +
      "<div class='row row--between-start'>" +
      "<div class='u-flex1'><div class='row u-mb6'>" +
      "<span class='u-fw600 u-primary u-fs13'>" + b.id + "</span>" + badge(b.status) + "</div>" +
      "<div class='u-fw600 u-mb4'>" + title + "</div>" +
      "<div class='muted u-fs13'>từ " + buyer + (b.budget ? " · Ngân sách: " + Number(b.budget).toLocaleString("vi-VN") + "đ" : "") + "</div></div>" +
      "<span class='muted u-fs12'>" + (expanded === b.id ? "▲" : "▼") + "</span></div>" +
      (expanded === b.id ?
        "<div class='thread-sep'>" +
        "<div class='card reply-box'><b>Mô tả brief:</b> " + desc + "</div>" +
        (b.status === "sent" ?
          "<div class='row'><button class='btn btn--primary btn--sm' data-acc='" + b.id + "'>✅ Nhận brief</button>" +
          "<button class='btn btn--sm btn--danger' data-rej='" + b.id + "'>✕ Từ chối</button></div>"
          : b.status === "accepted" ? "<a href='maker-proposal-editor.html' class='btn btn--primary btn--sm'>Tạo đề xuất →</a>"
          : "<span class='muted u-fs13'>Đã trả lời (" + UIState.statusLabel(b.status) + ").</span>") +
        "</div>" : "") +
      "</div>";
    }).join("");
    $("list").querySelectorAll("[data-open]").forEach((el) =>
      el.addEventListener("click", (e) => {
        if (e.target.closest("button") || e.target.closest("a")) return;
        expanded = expanded === el.dataset.open ? null : el.dataset.open;
        render();
      }));
    $("list").querySelectorAll("[data-acc]").forEach((b) =>
      b.addEventListener("click", async () => {
        briefs = briefs.map((x) => (x.id === b.dataset.acc ? { ...x, status: "accepted" } : x));
        await API.saveAll("briefs", briefs);
        UIState.renderToast("success", "Đã nhận brief! Hãy gửi đề xuất cho khách.");
        render();
      }));
    $("list").querySelectorAll("[data-rej]").forEach((b) =>
      b.addEventListener("click", async () => {
        briefs = briefs.map((x) => (x.id === b.dataset.rej ? { ...x, status: "rejected" } : x));
        await API.saveAll("briefs", briefs);
        UIState.renderToast("success", "Đã từ chối brief.");
        render();
      }));
  }

  $("btnRetry").addEventListener("click", init);
  async function init() {
    $("state-loading").hidden = false;
    $("state-error").hidden = true;
    try {
      [briefs, users] = await Promise.all([API.all("briefs"), API.all("users")]);
      $("state-loading").hidden = true;
      render();
    } catch (e) {
      $("state-loading").hidden = true;
      $("state-error").hidden = false;
    }
  }
  init();



