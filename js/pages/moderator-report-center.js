(() => {
  Guard.require("moderator", "admin");
  const $ = (id) => document.getElementById(id);
  const TABS = [
    ["all", "Tất cả"],
    ["open", "Mới"],
    ["handling", "Đang xử lý"],
    ["done", "Xong"],
  ];
  let reports = [];
  let tab = "all";
  const STORAGE_KEY = "craftlink_reports_v1";

  const escapeHTML = (s) =>
    String(s ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );

  const statusLabel = (st) =>
    ({ open: "Mới", handling: "Đang xử lý", done: "Xong" })[st] || st;

  const badgeClass = (st) => {
    const s = String(st || "").toLowerCase();
    if (s === "open") return "badge badge--open";
    if (s === "handling") return "badge badge--handling";
    if (s === "done") return "badge badge--done";
    return "badge";
  };

  const load = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) reports = JSON.parse(raw);
    } catch (e) {
      reports = [];
    }
  };

  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));

  const renderTabs = () => {
    $("reportTabs").innerHTML = TABS.map(([id, label]) => {
      const n =
        id === "all"
          ? reports.length
          : reports.filter((r) => r.status === id).length;
      return (
        "<button type='button' role='tab' class='tab" +
        (tab === id ? " active" : "") +
        "' data-tab='" +
        id +
        "'>" +
        label +
        (n ? " (" + n + ")" : "") +
        "</button>"
      );
    }).join("");
    $("reportTabs")
      .querySelectorAll("[data-tab]")
      .forEach((b) =>
        b.addEventListener("click", () => {
          tab = b.dataset.tab;
          render();
        }),
      );
  };

  const renderRows = () => {
    const rows =
      tab === "all" ? reports : reports.filter((r) => r.status === tab);
    $("state-empty").hidden = rows.length > 0;
    $("list").hidden = rows.length === 0;
    $("reportSub").textContent =
      reports.filter((r) => r.status === "open").length +
      " báo cáo mới chưa xử lý";

    $("list").innerHTML = rows
      .map((r) => {
        const title = escapeHTML(r.reason);
        const target = escapeHTML(r.targetType + "/" + r.targetId);
        const by = escapeHTML(r.reportedBy || "");
        const date = escapeHTML(r.date || "");
        const badge =
          "<span class='" +
          badgeClass(r.status) +
          "'>" +
          statusLabel(r.status) +
          "</span>";
        const action =
          r.status === "open"
            ? "<button class='btn btn--primary btn--sm' data-act='handling' data-id='" +
              r.id +
              "'>Xử lý</button>"
            : r.status === "handling"
              ? "<button class='btn btn--sm verdict-ok' data-act='done' data-id='" +
                r.id +
                "'>Đóng báo cáo</button>"
              : "<span class='ai-note'>✅ Đã xong</span>";
        return (
          "<div class='card'><div class='row row--between-start'>" +
          "<div class='u-flex1'><div class='row u-mb6'>" +
          "<span class='u-fw600 u-fs13 u-primary'>" +
          r.id +
          "</span>" +
          badge +
          "<span class='muted u-fs13'>" +
          date +
          "</span></div>" +
          "<div class='u-fw600 u-mb4'>" +
          title +
          "</div>" +
          "<div class='muted u-fs13'>Báo cáo bởi: " +
          by +
          " - Đối tượng: " +
          target +
          "</div></div>" +
          "<div>" +
          action +
          "</div></div></div>"
        );
      })
      .join("");

    $("list")
      .querySelectorAll("[data-act]")
      .forEach((b) =>
        b.addEventListener("click", () => {
          setStatus(b.dataset.id, b.dataset.act);
        }),
      );
  };

  const setStatus = (id, status) => {
    reports = reports.map((x) => (x.id === id ? { ...x, status } : x));
    save();
    render();
  };

  const render = () => {
    renderTabs();
    renderRows();
  };

  const init = async () => {
    $("state-loading").hidden = false;
    $("state-error").hidden = true;
    try {
      const res = await fetch("../assets/data/reports.json");
      if (!res.ok) throw new Error("mock fail");
      reports = await res.json();
      load();
      $("state-loading").hidden = true;
      render();
    } catch (e) {
      $("state-loading").hidden = true;
      $("state-error").hidden = false;
    }
  };

  $("btnRetry").addEventListener("click", init);
  init();
})();
