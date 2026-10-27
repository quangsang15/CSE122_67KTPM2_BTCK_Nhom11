
  const $ = (id) => document.getElementById(id);
  let current = null;
  try {
    const s = JSON.parse(localStorage.getItem("craftlink_session_v1"));
    if (s && s.email) $("navUser").textContent = s.email.split("@")[0];
  } catch (e) {}
  const showErr = (msg) => { $("formErr").textContent = msg || ""; $("formErr").hidden = !msg; };

  async function build() {
    const freeText = $("freeText").value.trim();
    if (freeText.length < 20) {
      $("aiFail").hidden = false;
      $("aiError").hidden = true;
      return;
    }
    if ($("budget").value && !(Number($("budget").value) >= 0)) { showErr("Số tiền không được âm."); return; }
    showErr("");
    $("aiFail").hidden = true;
    $("aiError").hidden = true;
    $("aiLoading").hidden = false;
    $("btnBuild").disabled = true;
    try {
      const res = await API.mockAI("brief", { freeText, budget: $("budget").value, deadline: $("deadline").value });
      current = res.data;
      $("rTitle").value = current.title;
      $("rDesc").value = current.desc;
      $("rBudget").value = Number(current.budgetSuggest).toLocaleString("vi-VN") + "đ";
      $("rDeadline").value = current.deadlineSuggest;
      $("rTags").textContent = current.tags.join(", ");
      $("rSuggest").textContent = "💡 Gợi ý: ngân sách hợp lý " + Number(current.budgetSuggest).toLocaleString("vi-VN") + "đ · nên nhận trước " + current.deadlineSuggest;
      $("rWhyList").innerHTML = current.whyBullets.map((w) => "<li>" + escapeHTML(w) + "</li>").join("");
      $("rList").innerHTML = current.checklist.map((c) => "<li>" + escapeHTML(c) + "</li>").join("");
      $("stepPreview").hidden = false;
      $("stepPreview").scrollIntoView({ block: "start" });
    } catch (err) {
      $("aiError").hidden = false;
      UIState.renderToast("error", "AI gặp sự cố, hãy thử lại.");
    } finally {
      $("aiLoading").hidden = true;
      $("btnBuild").disabled = false;
    }
  }

  async function saveBrief(status) {
    if (!current) return;
    const rows = await API.all("briefs");
    await API.saveAll("briefs", [...rows, {
      id: "b" + Date.now(), buyerId: "u1",
      title: $("rTitle").value.trim() || current.title,
      freeText: $("rDesc").value.trim() || $("freeText").value.trim(),
      budget: $("budget").value ? Number($("budget").value) : current.budgetSuggest,
      deadline: $("deadline").value || current.deadlineSuggest,
      style: current.style, status,
    }]);
    if (status === "sent") {
      $("stepPreview").hidden = true;
      $("stepDone").hidden = false;
      UIState.renderToast("success", "Brief đã được gửi đến các nghệ nhân!");
    } else {
      UIState.renderToast("success", "Đã lưu brief!");
    }
  }

  $("btnBuild").addEventListener("click", build);
  $("btnRegen").addEventListener("click", build);
  $("btnAIRetry").addEventListener("click", build);
  $("btnAccept").addEventListener("click", () => saveBrief("sent"));
  $("btnDraft").addEventListener("click", () => saveBrief("draft"));
  $("btnDraftTop").addEventListener("click", async () => {
    const text = $("freeText").value.trim();
    if (text.length < 20) { $("aiFail").hidden = false; return; }
    current = { title: text.slice(0, 50), desc: text, style: "Tùy biến", budgetSuggest: null, deadlineSuggest: null };
    await saveBrief("draft");
  });
  $("btnReject").addEventListener("click", () => {
    current = null;
    $("stepPreview").hidden = true;
    $("freeText").value = "";
  });
  $("btnNewBrief").addEventListener("click", () => {
    current = null;
    $("stepDone").hidden = true;
    $("freeText").value = ""; $("budget").value = ""; $("deadline").value = "";
  });
  $("btnManual").addEventListener("click", async () => {
    const text = $("freeText").value.trim();
    if (!text) return;
    const rows = await API.all("briefs");
    await API.saveAll("briefs", [...rows, { id: "b" + Date.now(), buyerId: "u1", title: text.slice(0, 50), freeText: text, budget: null, deadline: null, style: "Tùy biến", status: "draft" }]);
    $("aiFail").hidden = true;
    UIState.renderToast("success", "Đã lưu đúng chữ bạn viết.");
  });
