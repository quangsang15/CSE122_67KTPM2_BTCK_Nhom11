(() => {
  const $ = (id) => document.getElementById(id);
  const TABS = [
    ["pending", "Chờ duyệt"],
    ["all", "Tất cả"],
    ["active", "Đã duyệt"],
    ["rejected", "Từ chối"],
  ];
  let listings = [];
  let tab = "pending";
  const selected = new Set();
  const STORAGE_KEY = "craftlink_listings_v1";

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
    ({
      pending: "Chờ duyệt",
      active: "Đã duyệt",
      rejected: "Từ chối",
      handling: "Đang xử lý",
      done: "Hoàn thành",
    })[st] || st;

  const badgeClass = (st) => {
    const s = String(st || "").toLowerCase();
    if (["pending", "open", "handling"].includes(s))
      return "badge badge--pending";
    if (["rejected", "cancelled", "disabled", "failed"].includes(s))
      return "badge badge--rejected";
    if (["active", "done", "approved", "accepted", "completed"].includes(s))
      return "badge badge--done";
    if (["archived"].includes(s)) return "badge badge--archived";
    return "badge";
  };

  const load = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) listings = JSON.parse(raw);
    } catch (e) {
      listings = [];
    }
  };

  const save = () =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));

  const updateBulk = () => {
    $("bulkBar").hidden = selected.size === 0;
    $("selInfo").textContent = "Đã chọn " + selected.size;
  };

  const renderTabs = () => {
    $("queueTabs").innerHTML = TABS.map(([id, label]) => {
      const n =
        id === "all"
          ? listings.length
          : listings.filter((x) => x.status === id).length;
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
    $("queueTabs")
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
      tab === "all" ? listings : listings.filter((x) => x.status === tab);
    $("state-empty").hidden = rows.length > 0;
    $("tableCard").hidden = rows.length === 0;
    $("queueSub").textContent =
      listings.filter((x) => x.status === "pending").length +
      " sản phẩm chờ duyệt";

    $("headRow").innerHTML =
      (tab === "pending"
        ? "<th class='col-w40'><input type='checkbox' id='chkAll' aria-label='Chọn tất cả' /></th>"
        : "") +
      "<th scope='col'>Mã</th><th scope='col'>Sản phẩm</th><th scope='col'>Nghệ nhân</th><th scope='col'>Danh mục</th><th scope='col'>Trạng thái</th><th scope='col'>Hành động</th>";

    if (tab === "pending") {
      const pend = rows.filter((x) => x.status === "pending");
      $("chkAll").checked =
        pend.length > 0 && pend.every((x) => selected.has(x.id));
      $("chkAll").addEventListener("change", (e) => {
        if (e.target.checked) pend.forEach((x) => selected.add(x.id));
        else pend.forEach((x) => selected.delete(x.id));
        updateBulk();
        render();
      });
    }

    $("rows").innerHTML = rows
      .map((x) => {
        const title = escapeHTML(x.title),
          cat = escapeHTML(x.category),
          maker = escapeHTML(x.maker);
        const badge =
          "<span class='" +
          badgeClass(x.status) +
          "'>" +
          statusLabel(x.status) +
          "</span>";
        const actions =
          x.status === "pending"
            ? "<div class='row'><button class='btn btn--primary btn--sm' data-ok='" +
              x.id +
              "'>Duyệt</button><button class='btn btn--sm btn--danger' data-no='" +
              x.id +
              "'>Từ chối</button></div>"
            : "<span class='muted u-fs12'>Đã xử lý</span>";
        return (
          "<tr>" +
          (tab === "pending"
            ? "<td><input type='checkbox' data-sel='" +
              x.id +
              "'" +
              (selected.has(x.id) ? " checked" : "") +
              " aria-label='Chọn " +
              title +
              "' /></td>"
            : "") +
          "<td class='u-primary u-fw500'>" +
          x.id +
          "</td>" +
          "<td><div class='u-fw500'>" +
          title +
          "</div></td>" +
          "<td>" +
          maker +
          "</td>" +
          "<td class='muted'>" +
          cat +
          "</td>" +
          "<td>" +
          badge +
          "</td>" +
          "<td>" +
          actions +
          "</td></tr>"
        );
      })
      .join("");

    $("rows")
      .querySelectorAll("[data-sel]")
      .forEach((c) =>
        c.addEventListener("change", () => {
          if (c.checked) selected.add(c.dataset.sel);
          else selected.delete(c.dataset.sel);
          updateBulk();
        }),
      );

    $("rows")
      .querySelectorAll("[data-ok]")
      .forEach((b) =>
        b.addEventListener("click", () => {
          setStatus(b.dataset.ok, "active");
        }),
      );

    $("rows")
      .querySelectorAll("[data-no]")
      .forEach((b) =>
        b.addEventListener("click", () => {
          setStatus(b.dataset.no, "rejected");
        }),
      );

    updateBulk();
  };

  const setStatus = (id, status) => {
    listings = listings.map((x) => (x.id === id ? { ...x, status } : x));
    selected.delete(id);
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
      const res = await fetch("../assets/data/listings.json");
      if (!res.ok) throw new Error("mock fail");
      listings = await res.json();
      load();
      $("state-loading").hidden = true;
      render();
    } catch (e) {
      $("state-loading").hidden = true;
      $("state-error").hidden = false;
    }
  };

  $("btnRetry").addEventListener("click", init);
  $("btnBulkApprove").addEventListener("click", () => {
    listings = listings.map((x) =>
      selected.has(x.id) ? { ...x, status: "active" } : x,
    );
    selected.clear();
    save();
    render();
  });

  init();
})();
