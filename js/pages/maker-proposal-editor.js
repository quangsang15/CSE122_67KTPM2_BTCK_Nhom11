 const $ = (id) => document.getElementById(id);
  const TABS = [["all", "Tất cả"], ["draft", "Nháp"], ["pending", "Chờ phê duyệt"], ["revision", "Cần sửa"], ["approved", "Đã duyệt"]];
  let briefs = [], proposals = [], revisions = [], tab = "all", editId = null;
  const money = (n) => Number(n).toLocaleString("vi-VN") + "đ";
  try {
    const s = JSON.parse(localStorage.getItem("craftlink_session_v1"));
    if (s && s.email) $("navUser").textContent = s.email.split("@")[0];
  } catch (e) {}
  const badge = (st) => "<span class='badge badge--" + st + "'>" + UIState.statusLabel(st) + "</span>";
  const briefTitle = (p) => (briefs.find((x) => x.id === p.briefId) || {}).title || "Yêu cầu " + p.briefId;
  const buyerOf = (p) => {
    const b = briefs.find((x) => x.id === p.briefId);
    return (b && b.buyerName) || "Khách";
  };
  const showErr = (msg) => { $("formErr").textContent = msg || ""; $("formErr").hidden = !msg; };
  const nextVersion = (briefId) => {
    const vs = proposals.filter((p) => p.briefId === briefId).map((p) => p.version || 1);
    return vs.length ? Math.max(...vs) + 1 : 1;
  };

  function render() {
    const rows = tab === "all" ? proposals : proposals.filter((p) => p.status === tab);
    $("propTabs").innerHTML = TABS.map(([id, label]) => {
      const n = id === "all" ? proposals.length : proposals.filter((p) => p.status === id).length;
      return "<button type='button' role='tab' class='tab" + (tab === id ? " active" : "") + "' data-tab='" + id + "'>" + label + (n ? " (" + n + ")" : "") + "</button>";
    }).join("");
    $("propTabs").querySelectorAll("[data-tab]").forEach((b) =>
      b.addEventListener("click", () => { tab = b.dataset.tab; render(); }));
    $("state-empty").hidden = rows.length > 0;
    $("list").innerHTML = rows.map((p) => {
      const title = escapeHTML(briefTitle(p)), buyer = escapeHTML(buyerOf(p)), msg = escapeHTML(p.message), tl = escapeHTML(p.timeline);
      return "<div class='card'><div class='row row--between-start'>" +
      "<div class='u-flex1'><div class='row u-mb6'>" +
      "<span class='u-fw600 u-fs13 u-primary'>Bản " + (p.version || 1) + " · " + p.id + "</span>" + badge(p.status) + "</div>" +
      "<div class='u-fw600 u-mb4'>" + title + "</div>" +
      "<div class='muted u-fs13'>cho " + buyer + " · " + money(p.price) + " · " + tl + "</div></div>" +
      "<div>" + ((p.status === "draft" || p.status === "revision")
        ? "<button class='btn btn--primary btn--sm' data-edit='" + p.id + "'>" + (p.status === "revision" ? "Sửa & Gửi lại" : "Gửi đề xuất") + "</button>"
        : p.status === "approved" ? "<span class='ai-note'>✅ Đã được duyệt</span>" : "") + "</div></div>" +
      (p.status === "revision" ? "<div class='card mt-8 ai-warn'><b>Yêu cầu sửa từ khách:</b> " + escapeHTML(p.revisionNote || "Điều chỉnh giá và thời gian giao hàng.") + "</div>" : "") +
      "<div class='card mt-8 ai-box'>" + msg + "</div>" +
      "</div>";
    }).join("");
    $("list").querySelectorAll("[data-edit]").forEach((b) =>
      b.addEventListener("click", () => {
        const p = proposals.find((x) => x.id === b.dataset.edit);
        editId = p.id;
        $("ePrice").value = p.price;
        $("eTimeline").value = p.timeline;
        $("eNote").value = "";
        $("editModal").hidden = false;
      }));
  }

  async function saveWithStatus(status) {
    const briefId = $("fBrief").value;
    const price = Number($("fPrice").value);
    if (!briefId) { showErr("Chọn yêu cầu trước đã."); return; }
    if (!$("fPrice").value || !(price >= 0)) { showErr("Giá báo không được âm."); return; }
    if (!$("fTimeline").value.trim() || !$("fMsg").value.trim()) { showErr("Nhập thời gian làm và lời nhắn."); return; }
    showErr("");
    proposals = [...proposals, { id: "pr" + Date.now(), briefId, makerId: "u2", version: nextVersion(briefId), price, timeline: $("fTimeline").value.trim(), message: $("fMsg").value.trim(), status }];
    await API.saveAll("proposals", proposals);
    $("fPrice").value = ""; $("fTimeline").value = ""; $("fMsg").value = "";
    UIState.renderToast("success", status === "draft" ? "Đã lưu nháp." : "Đề xuất đã gửi đến khách!");
    render();
  }

  $("btnDraft").addEventListener("click", () => saveWithStatus("draft"));
  $("btnSend").addEventListener("click", () => saveWithStatus("pending"));
  $("btnAISuggest").addEventListener("click", async () => {
    const notes = revisions.slice(0, 5).map((r) => r.note);
    $("aiBox").hidden = true;
    $("aiFail").hidden = true;
    if (!notes.length) { $("aiFail").hidden = false; return; }
    $("btnAISuggest").disabled = true;
    $("aiLoading").hidden = false;
    try {
      const res = await API.mockAI("revision", { notes });
      $("aiWhy").textContent = "Vì sao: " + res.data.why;
      $("aiTasks").innerHTML = res.data.tasks.map((t) => "<p class='u-fs13'>• [" + escapeHTML(t.group) + "] " + escapeHTML(t.text) + "</p>").join("");
      $("aiTasks").dataset.raw = JSON.stringify(res.data.tasks);
      $("aiBox").hidden = false;
    } catch (err) {
      UIState.renderToast("error", "AI gặp sự cố, hãy thử lại.");
    } finally {
      $("aiLoading").hidden = true;
      $("btnAISuggest").disabled = false;
    }
  });
  $("btnAIApply").addEventListener("click", () => {
    const tasks = JSON.parse($("aiTasks").dataset.raw || "[]");
    $("fMsg").value = ($("fMsg").value ? $("fMsg").value + "\n" : "") + tasks.map((t) => "- [" + t.group + "] " + t.text).join("\n");
    UIState.renderToast("success", "Đã chèn " + tasks.length + " việc vào báo giá.");
  });
  $("btnAISkip").addEventListener("click", () => { $("aiBox").hidden = true; });
  $("btnSubmitEdit").addEventListener("click", async () => {
    if (!$("ePrice").value || !$("eTimeline").value.trim()) { UIState.renderToast("error", "Nhập đủ giá và thời gian."); return; }
    proposals = proposals.map((p) => p.id === editId ? { ...p, price: Number($("ePrice").value), timeline: $("eTimeline").value.trim(), status: "pending" } : p);
    await API.saveAll("proposals", proposals);
    $("editModal").hidden = true;
    editId = null;
    UIState.renderToast("success", "Đề xuất đã gửi đến khách!");
    render();
  });
  $("btnCloseEdit").addEventListener("click", () => { $("editModal").hidden = true; });
  $("btnCancelEdit").addEventListener("click", () => { $("editModal").hidden = true; });
  $("editModal").addEventListener("click", (e) => { if (e.target === $("editModal")) $("editModal").hidden = true; });
  $("btnRetry").addEventListener("click", init);

  async function init() {
    $("state-loading").hidden = false;
    $("state-error").hidden = true;
    try {
      [briefs, proposals, revisions] = await Promise.all([API.all("briefs"), API.all("proposals"), API.all("revisions")]);
      const accepted = briefs.filter((b) => b.status === "accepted");
      $("fBrief").innerHTML = accepted.length
        ? accepted.map((b) => "<option value='" + b.id + "'>" + b.id + " — " + b.title + "</option>").join("")
        : "<option value=''>Chưa có yêu cầu nào — sang Yêu cầu mới nhận trước</option>";
      $("state-loading").hidden = true;
      render();
    } catch (e) {
      $("state-loading").hidden = true;
      $("state-error").hidden = false;
    }
  }
  init();
