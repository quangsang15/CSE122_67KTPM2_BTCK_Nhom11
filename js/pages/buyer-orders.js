// Đơn hàng của tôi — js/pages/buyer-orders.js — procedural, tách từ pages/buyer-orders.html
  // Đơn hàng (SV1 Huy): tabs lọc + hủy đơn + AI-3 tóm tắt góp ý.
  const $ = (id) => document.getElementById(id);
  const TABS = [["all", "Tất cả"], ["pending", "Chờ xử lý"], ["making", "Đang làm"], ["revision", "Yêu cầu sửa"], ["done", "Hoàn thành"], ["cancelled", "Đã hủy"]];
  let tab = "all", orders = [], revisions = [], proposals = [], briefs = [], users = [];
  let expanded = null;
  const money = (n) => Number(n).toLocaleString("vi-VN") + "đ";
  try {
    const s = JSON.parse(localStorage.getItem("craftlink_session_v1"));
    if (s && s.email) $("navUser").textContent = s.email.split("@")[0];
  } catch (e) {}
  const badge = (st) => "<span class='badge badge--" + st + "'>" + UIState.statusLabel(st) + "</span>";
  const titleOf = (o) => {
    const p = proposals.find((x) => x.id === o.proposalId);
    const b = p && briefs.find((x) => x.id === p.briefId);
    return b ? b.title : "Đơn " + o.id;
  };
  const makerOf = (o) => (users.find((x) => x.id === o.makerId) || {}).name || o.makerId;

  function renderTabs() {
    $("orderTabs").innerHTML = TABS.map(([id, label]) => {
      const n = id === "all" ? orders.length : orders.filter((o) => o.status === id).length;
      return "<button type='button' role='tab' class='tab" + (tab === id ? " active" : "") + "' data-tab='" + id + "'>" + label + (id !== "all" && n ? " (" + n + ")" : "") + "</button>";
    }).join("");
    $("orderTabs").querySelectorAll("[data-tab]").forEach((b) =>
      b.addEventListener("click", () => { tab = b.dataset.tab; render(); }));
  }

  function render() {
    renderTabs();
    $("orderCount").textContent = orders.length + " đơn hàng tổng cộng";
    const rows = tab === "all" ? orders : orders.filter((o) => o.status === tab);
    $("state-empty").hidden = rows.length > 0;
    $("orders").innerHTML = rows.map((o) => {
      const notes = revisions.filter((r) => r.orderId === o.id);
      const title = escapeHTML(titleOf(o)), maker = escapeHTML(makerOf(o));
      return "<div class='card media-crop'>" +
        "<div class='order-head'>" +
        "<div class='u-flex1'><div class='row u-mb4'>" +
        "<span class='u-fw600 u-primary u-fs13'>" + o.id + "</span>" + badge(o.status) + "</div>" +
        "<div class='u-fw600 u-mb2'>" + title + "</div>" +
        "<div class='muted u-fs13'>bởi " + maker + " · " + notes.length + " góp ý</div></div>" +
        "<div class='u-text-right'><div class='u-fw700 u-primary u-mb6'>" + money(o.amount) + "</div>" +
        "<div class='row row--end'>" +
        (notes.length >= 2 ? "<button class='btn btn--sm' data-ai='" + o.id + "'>🤖 AI tóm tắt</button>" : "") +
        (o.status === "done" ? "<button class='btn btn--sm btn--primary' data-rate='" + o.id + "'>Đánh giá</button>"
          : o.status === "making" ? "<button class='btn btn--sm' data-track='" + o.id + "'>Theo dõi</button>"
          : o.status === "cancelled" ? "<span class='muted u-fs12'>Đã hủy</span>"
          : "<button class='btn btn--sm' data-cancel='" + o.id + "'>Hủy đơn</button>") +
        "</div></div></div>" +
        (expanded === o.id ? "<div class='order-foot'><b>🤖 AI-3:</b> <span id='aiInline'></span></div>" : "") +
        "</div>";
    }).join("");
    $("orders").querySelectorAll("[data-rate]").forEach((b) =>
      b.addEventListener("click", () => UIState.renderToast("success", "Cảm ơn bạn đã đánh giá đơn " + b.dataset.rate + "!")));
    $("orders").querySelectorAll("[data-track]").forEach((b) =>
      b.addEventListener("click", () => UIState.renderToast("success", "Thợ đang làm đơn " + b.dataset.track + ", dự kiến đúng hẹn.")));
    $("orders").querySelectorAll("[data-cancel]").forEach((b) =>
      b.addEventListener("click", async () => {
        orders = orders.map((x) => (x.id === b.dataset.cancel ? { ...x, status: "cancelled" } : x));
        await API.saveAll("orders", orders);
        render();
        UIState.renderToast("success", "Đã hủy đơn.");
      }));
    $("orders").querySelectorAll("[data-ai]").forEach((b) =>
      b.addEventListener("click", async () => {
        expanded = b.dataset.ai;
        render();
        const notes = revisions.filter((r) => r.orderId === expanded).map((r) => r.note);
        try {
          const res = await API.mockAI("revision", { notes });
          const el = $("aiInline");
          if (el) el.textContent = res.data.why;
        } catch (err) {
          const el = $("aiInline");
          if (el) el.textContent = "Chưa tóm tắt được lúc này.";
        }
      }));
    $("orderSel").innerHTML = orders.map((o) =>
      "<option value='" + o.id + "'>Đơn " + o.id + " · " + titleOf(o) + " (" + revisions.filter((r) => r.orderId === o.id).length + " góp ý)</option>"
    ).join("");
  }

  async function init() {
    $("state-loading").hidden = false;
    $("state-error").hidden = true;
    try {
      if (new URLSearchParams(location.search).has("fail")) throw new Error("demo loi");
      [orders, revisions, proposals, briefs, users] = await Promise.all([
        API.all("orders"), API.all("revisions"), API.all("proposals"), API.all("briefs"), API.all("users")]);
      $("state-loading").hidden = true;
      render();
    } catch (e) {
      $("state-loading").hidden = true;
      $("state-error").hidden = false;
    }
  }

  $("btnAddNote").addEventListener("click", async () => {
    const text = $("newNote").value.trim();
    if (!text) { UIState.renderToast("error", "Bạn viết góp ý trước đã nhé."); return; }
    revisions = [...revisions, { id: "r" + Date.now(), orderId: $("orderSel").value, note: text, status: "open" }];
    await API.saveAll("revisions", revisions);
    $("newNote").value = "";
    render();
    UIState.renderToast("success", "Đã thêm góp ý.");
  });
  $("btnSum").addEventListener("click", async () => {
    const notes = revisions.filter((r) => r.orderId === $("orderSel").value).map((r) => r.note);
    $("aiResult").hidden = true;
    $("aiFail").hidden = true;
    $("aiError").hidden = true;
    if (notes.length < 2) { $("aiFail").hidden = false; return; }
    $("aiLoading").hidden = false;
    $("btnSum").disabled = true;
    try {
      const res = await API.mockAI("revision", { notes });
      $("aiWhy").textContent = "Vì sao: " + res.data.why;
      $("aiTasks").innerHTML = res.data.tasks.map((t) => "<p class='u-fs13'>• [" + escapeHTML(t.group) + "] " + escapeHTML(t.text) + "</p>").join("");
      $("aiResult").hidden = false;
    } catch (err) {
      $("aiError").hidden = false;
    } finally {
      $("aiLoading").hidden = true;
      $("btnSum").disabled = false;
    }
  });
  $("btnAcceptSum").addEventListener("click", () => {
    localStorage.setItem("craftlink_revision_sum_v1", JSON.stringify($("aiTasks").innerText));
    UIState.renderToast("success", "Đã đưa tóm tắt vào báo giá.");
  });
  $("btnRejectSum").addEventListener("click", () => { $("aiResult").hidden = true; });
  $("btnSumRetry").addEventListener("click", () => $("btnSum").click());
  $("btnRetry").addEventListener("click", init);
  init();
