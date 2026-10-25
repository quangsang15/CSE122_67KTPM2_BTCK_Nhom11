(() => {
  Guard.require("admin");
  const $ = (id) => document.getElementById(id);
  let cats = [];
  let listings = [];
  let editingId = null;
  const STORAGE_KEY = "craftlink_categories_v1";
  const CATEGORIES_JSON = "../assets/data/categories.json";
  const LISTINGS_JSON = "../assets/data/listings.json";

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

  try {
    const s = JSON.parse(localStorage.getItem("craftlink_session_v1"));
    if (s && s.email) $("navUser").textContent = s.email.split("@")[0];
  } catch (e) {}

  const slugOf = (name) =>
    String(name ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const countOf = (name) =>
    listings.filter((x) => x.category === name && x.status === "active").length;

  const badge = (archived) =>
    archived
      ? "<span class='badge badge--archived'>Đã lưu trữ</span>"
      : "<span class='badge badge--active'>Đang hoạt động</span>";

  const showErr = (msg) => {
    $("formErr").textContent = msg || "";
    $("formErr").hidden = !msg;
  };

  const renderToast = (type, message) => {
    let box = document.getElementById("ui-toast");
    if (!box) {
      box = document.createElement("div");
      box.id = "ui-toast";
      document.body.appendChild(box);
    }
    box.className = "toast toast--" + (type === "error" ? "error" : "success");
    box.textContent = message;
    box.hidden = false;
    clearTimeout(box._t);
    box._t = setTimeout(() => {
      box.hidden = true;
    }, 3000);
  };

  const loadCats = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) cats = JSON.parse(raw);
    } catch (e) {
      cats = [];
    }
  };

  const saveCats = () =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cats));

  const render = () => {
    const q = $("search").value.trim().toLowerCase();
    const rows = cats.filter(
      (c) => !q || (c.name || "").toLowerCase().includes(q),
    );
    $("catSub").textContent =
      cats.filter((c) => !c.archived).length + " danh mục đang hoạt động";
    $("state-empty").hidden = rows.length > 0;
    $("tableCard").hidden = rows.length === 0;
    $("rows").innerHTML = rows
      .map(
        (c) =>
          "<tr><td class='u-primary u-fw500'>" +
          c.id +
          "</td>" +
          "<td class='u-fw500'>" +
          escapeHTML(c.name) +
          "</td>" +
          "<td class='muted u-mono u-fs13'>" +
          slugOf(c.name) +
          "</td>" +
          "<td>" +
          countOf(c.name).toLocaleString() +
          "</td>" +
          "<td>" +
          badge(!!c.archived) +
          "</td>" +
          "<td><div class='row'><button class='btn btn--sm' data-edit='" +
          c.id +
          "'>Sửa</button>" +
          "<button class='btn btn--sm " + (c.archived ? "btn--outline-success" : "btn--archive") + "' data-arch='" +
          c.id +
          "'>" +
          (c.archived ? "Khôi phục" : "Lưu trữ") +
          "</button></div></td></tr>",
      )
      .join("");

    $("rows")
      .querySelectorAll("[data-edit]")
      .forEach((b) =>
        b.addEventListener("click", () => {
          const c = cats.find((x) => x.id === b.dataset.edit);
          editingId = c.id;
          $("modalTitle").textContent = "Chỉnh sửa danh mục";
          $("fName").value = c.name;
          showErr("");
          $("catModal").hidden = false;
          $("fName").focus();
        }),
      );

    $("rows")
      .querySelectorAll("[data-arch]")
      .forEach((b) =>
        b.addEventListener("click", () => {
          cats = cats.map((x) =>
            x.id === b.dataset.arch ? { ...x, archived: !x.archived } : x,
          );
          saveCats();
          renderToast("success", "Đã cập nhật trạng thái danh mục");
          render();
        }),
      );
  };

  $("btnOpenCreate").addEventListener("click", () => {
    editingId = null;
    $("modalTitle").textContent = "Thêm danh mục mới";
    $("fName").value = "";
    showErr("");
    $("catModal").hidden = false;
    $("fName").focus();
  });

  $("btnSave").addEventListener("click", () => {
    const name = $("fName").value.trim();
    if (!name) {
      showErr("Vui lòng nhập tên danh mục.");
      return;
    }
    showErr("");
    if (editingId) {
      cats = cats.map((x) => (x.id === editingId ? { ...x, name } : x));
      renderToast("success", "Đã cập nhật danh mục!");
    } else {
      cats = [
        ...cats,
        { id: "c" + Date.now(), name, parent: null, archived: false },
      ];
      renderToast("success", "Đã thêm danh mục!");
    }
    saveCats();
    $("catModal").hidden = true;
    editingId = null;
    render();
  });

  $("btnCloseModal").addEventListener("click", () => {
    $("catModal").hidden = true;
  });
  $("btnCancelModal").addEventListener("click", () => {
    $("catModal").hidden = true;
  });
  $("catModal").addEventListener("click", (e) => {
    if (e.target === $("catModal")) $("catModal").hidden = true;
  });

  $("search").addEventListener("input", render);
  $("btnRetry").addEventListener("click", init);

  async function init() {
    $("state-loading").hidden = false;
    $("state-error").hidden = true;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        cats = JSON.parse(raw);
      } else {
        const res = await fetch(CATEGORIES_JSON);
        if (!res.ok) throw new Error("mock fail");
        cats = await res.json();
        saveCats();
      }
      const res2 = await fetch(LISTINGS_JSON);
      if (res2.ok) listings = await res2.json();
      try {
        const rawL = localStorage.getItem("craftlink_listings_v1");
        if (rawL) listings = JSON.parse(rawL);
      } catch (e) {}
      $("state-loading").hidden = true;
      render();
    } catch (e) {
      $("state-loading").hidden = true;
      $("state-error").hidden = false;
    }
  }

  init();
})();
