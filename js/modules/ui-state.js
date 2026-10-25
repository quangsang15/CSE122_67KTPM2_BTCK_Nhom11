(() => {
  const badgeClass = (status) => {
    const s = String(status || "").toLowerCase();
    if (["pending", "sent", "draft", "making", "open", "handling"].includes(s)) return "badge badge--pending";
    if (["rejected", "cancelled", "disabled", "failed"].includes(s)) return "badge badge--rejected";
    if (["done", "approved", "active", "accepted", "completed"].includes(s)) return "badge badge--completed";
    if (["revision", "archived"].includes(s)) return "badge badge--cancelled";
    return "badge";
  };

  const badge = (status) => {
    const span = document.createElement("span");
    span.className = badgeClass(status);
    span.textContent = statusLabel(status);
    return span;
  };

  
  const STATUS_LABEL = {
    active: "Đang bán", pending: "Chờ duyệt", rejected: "Bị từ chối",
    sent: "Đã gửi", accepted: "Đã nhận", draft: "Nháp",
    making: "Đang làm", revision: "Cần sửa", approved: "Đã duyệt",
    done: "Hoàn thành", cancelled: "Đã hủy", archived: "Đã lưu trữ",
    open: "Mới", handling: "Đang xử lý", disabled: "Đã khóa",
  };
  const ROLE_LABEL = { buyer: "Người mua", maker: "Người bán", moderator: "Kiểm duyệt", admin: "Quản trị" };
  const statusLabel = (status) => STATUS_LABEL[String(status || "").toLowerCase()] || status;
  const roleLabel = (role) => ROLE_LABEL[String(role || "").toLowerCase()] || role;
  const renderLoading = (container, rows) => {
    container.innerHTML = "";
    const n = rows || 3;
    for (let i = 0; i < n; i++) {
      const el = document.createElement("div");
      el.className = "cart-page__item";
      const sk = document.createElement("div");
      sk.className = "skel skel--full";
      el.appendChild(sk);
      container.appendChild(el);
    }
  };

  const renderEmpty = (container, opts) => {
    const o = opts || {};
    container.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "cart-page__item";
    const info = document.createElement("div");
    info.className = "cart-page__info";
    const p = document.createElement("p");
    p.className = "help__answer";
    p.textContent = (o.icon ? o.icon + " " : "") + (o.title || "Không có dữ liệu.") + (o.hint ? " " + o.hint : "");
    info.appendChild(p);
    wrap.appendChild(info);
    if (o.actionLabel) {
      const btn = document.createElement("button");
      btn.className = "btn btn--primary btn--sm";
      btn.type = "button";
      btn.textContent = o.actionLabel;
      if (o.onAction) btn.addEventListener("click", o.onAction);
      wrap.appendChild(btn);
    }
    container.appendChild(wrap);
  };

  const renderError = (container, opts) => {
    const o = opts || {};
    container.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "cart-page__item";
    const info = document.createElement("div");
    info.className = "cart-page__info";
    const p = document.createElement("p");
    p.className = "help__answer";
    p.textContent = o.message || "Không tải được dữ liệu.";
    info.appendChild(p);
    wrap.appendChild(info);
    const btn = document.createElement("button");
    btn.className = "btn btn--white btn--sm";
    btn.type = "button";
    btn.textContent = "Thử lại";
    if (o.onRetry) btn.addEventListener("click", o.onRetry);
    wrap.appendChild(btn);
    container.appendChild(wrap);
  };

  
  const renderToast = (type, message) => {
    let box = document.getElementById("ui-toast");
    if (!box) {
      box = document.createElement("div");
      box.id = "ui-toast";
      box.className = "toast toast--success";
      box.setAttribute("role", "status");
      document.body.appendChild(box);
    }
    box.className = "toast toast--" + (type === "error" ? "error" : "success");
    box.textContent = message;
    box.hidden = false;
    clearTimeout(box._t);
    box._t = setTimeout(() => { box.hidden = true; }, 3000);
  };

  window.UIState = { renderLoading, renderEmpty, renderError, renderToast, renderBadge: badge, badgeClass, statusLabel, roleLabel };
})();

