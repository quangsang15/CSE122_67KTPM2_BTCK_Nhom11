const $ = (id) => document.getElementById(id);
const TABS = [
  ["all", "Tất cả"],
  ["sent", "Mới gửi"],
  ["accepted", "Đã nhận"],
  ["rejected", "Đã từ chối"],
];

let briefs = [], users = [], tab = "all", expanded = null;


try {
  const s = JSON.parse(localStorage.getItem("craftlink_session_v1"));
  if (s && s.email) $("navUser").textContent = s.email.split("@")[0];
} catch (e) {}


const badge = (st) => {
  const label = (window.UIState && UIState.statusLabel) ? UIState.statusLabel(st) : st;
  return "<span class='badge badge--" + st + "'>" + label + "</span>";
};

const buyerOf = (b) => {
  const buyerId = b.buyerId || b.buyerID;
  return (users.find((x) => x.id === buyerId) || {}).name || "Khách hàng";
};

function render() {
  const rows = tab === "all" ? briefs : briefs.filter((b) => b.status === tab);

  
  $("briefTabs").innerHTML = TABS.map(([id, label]) => {
    const n = id === "all" ? briefs.length : briefs.filter((b) => b.status === id).length;
    return (
      "<button type='button' role='tab' class='tab" +
      (tab === id ? " active" : "") +
      "' data-tab='" + id + "'>" +
      label + (n ? " (" + n + ")" : "") +
      "</button>"
    );
  }).join("");

  $("briefTabs").querySelectorAll("[data-tab]").forEach((b) =>
    b.addEventListener("click", () => {
      tab = b.dataset.tab;
      render();
    })
  );

 
  $("state-empty").hidden = rows.length > 0;


  $("list").innerHTML = rows.map((b) => {
    const esc = window.escapeHTML || ((s) => String(s ?? "").replace(/[&<>"']/g, ""));
    const title = esc(b.title || "Yêu cầu #" + b.id);
    const buyer = esc(buyerOf(b));
    const desc = esc(b.freeText || b.description || "Không có mô tả chi tiết.");
    const budgetStr = b.budget ? " · Ngân sách: " + Number(b.budget).toLocaleString("vi-VN") + "đ" : "";
    const isSent = b.status === "sent";

    return (
      "<div class='card' data-open='" + b.id + "' style='cursor:pointer" + (isSent ? ";border-left:3px solid var(--primary)'" : "'") + ">" +
        "<div class='row row--between-start'>" +
          "<div class='u-flex1'>" +
            "<div class='row u-mb6'>" +
              "<span class='u-fw600 u-primary u-fs13'>" + b.id + "</span>" +
              badge(b.status) +
            "</div>" +
            "<div class='u-fw600 u-mb4'>" + title + "</div>" +
            "<div class='muted u-fs13'>từ " + buyer + budgetStr + "</div>" +
          "</div>" +
          "<span class='muted u-fs12'>" + (expanded === b.id ? "▲" : "▼") + "</span>" +
        "</div>" +
        (expanded === b.id
          ? "<div class='thread-sep'>" +
              "<div class='card reply-box'><b>Mô tả brief:</b> " + desc + "</div>" +
              (isSent
                ? "<div class='row u-mt12'>" +
                    "<button class='btn btn--primary btn--sm' data-acc='" + b.id + "'>✅ Nhận brief</button>" +
                    "<button class='btn btn--sm btn--danger' data-rej='" + b.id + "'>✕ Từ chối</button>" +
                  "</div>"
                : b.status === "accepted"
                ? "<div class='u-mt12'><a href='maker-proposal-editor.html' class='btn btn--primary btn--sm'>Tạo đề xuất →</a></div>"
                : "<div class='muted u-fs13 u-mt12'>Đã xử lý (" + ((window.UIState && UIState.statusLabel) ? UIState.statusLabel(b.status) : b.status) + ").</div>") +
            "</div>"
          : "") +
      "</div>"
    );
  }).join("");

  
  $("list").querySelectorAll("[data-open]").forEach((el) =>
    el.addEventListener("click", (e) => {
      if (e.target.closest("button") || e.target.closest("a")) return;
      expanded = expanded === el.dataset.open ? null : el.dataset.open;
      render();
    })
  );


  $("list").querySelectorAll("[data-acc]").forEach((b) =>
    b.addEventListener("click", async () => {
      briefs = briefs.map((x) => (x.id === b.dataset.acc ? { ...x, status: "accepted" } : x));
      await API.saveAll("briefs", briefs);
      if (window.UIState && UIState.renderToast) {
        UIState.renderToast("success", "Đã nhận brief! Hãy tạo đề xuất cho khách.");
      }
      render();
    })
  );


  $("list").querySelectorAll("[data-rej]").forEach((b) =>
    b.addEventListener("click", async () => {
      briefs = briefs.map((x) => (x.id === b.dataset.rej ? { ...x, status: "rejected" } : x));
      await API.saveAll("briefs", briefs);
      if (window.UIState && UIState.renderToast) {
        UIState.renderToast("success", "Đã từ chối brief.");
      }
      render();
    })
  );
}

$("btnRetry").addEventListener("click", init);

async function init() {
  $("state-loading").hidden = false;
  $("state-error").hidden = true;
  $("state-empty").hidden = true;

  try {
    [briefs, users] = await Promise.all([API.all("briefs"), API.all("users")]);
    $("state-loading").hidden = true;
    render();
  } catch (err) {
    console.error("Lỗi khi tải hoặc hiển thị Hộp thư Brief:", err);
    $("state-loading").hidden = true;
    $("state-error").hidden = false;
  }
}

init();