(() => {
  Guard.require("moderator", "admin");
  const $ = (id) => document.getElementById(id);
  const ROLE_TABS = [
    ["all", "Tất cả"],
    ["buyer", "Người mua"],
    ["maker", "Nghệ nhân"],
    ["moderator", "Moderator"],
  ];
  let users = [];
  let tab = "all";
  let lockId = null;
  let lockTo = null;
  const STORAGE_KEY = "craftlink_users_v1";

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
    ({ active: "Đang hoạt động", disabled: "Đã khóa" })[st] || st;

  const badgeClass = (st) =>
    String(st || "").toLowerCase() === "active"
      ? "badge badge--active"
      : "badge badge--disabled";

  const myRole = () => {
    try {
      return String(
        (JSON.parse(localStorage.getItem("craftlink_session_v1")) || {}).role ||
          "",
      ).toLowerCase();
    } catch (e) {
      return "";
    }
  };

  const load = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) users = JSON.parse(raw);
    } catch (e) {
      users = [];
    }
  };

  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

  const renderTabs = () => {
    $("roleTabs").innerHTML = ROLE_TABS.map(([id, label]) => {
      const n =
        id === "all" ? users.length : users.filter((u) => u.role === id).length;
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
    $("roleTabs")
      .querySelectorAll("[data-tab]")
      .forEach((b) =>
        b.addEventListener("click", () => {
          tab = b.dataset.tab;
          render();
        }),
      );
  };

  const renderRows = () => {
    const q = $("search").value.trim().toLowerCase();
    const rows = users.filter(
      (u) =>
        (tab === "all" || u.role === tab) &&
        (!q ||
          (u.name || "").toLowerCase().includes(q) ||
          (u.email || "").includes(q)),
    );
    $("userSub").textContent =
      users.filter((u) => u.status === "active").length +
      " tài khoản đang hoạt động";
    $("tableCard").hidden = rows.length === 0;
    $("rows").innerHTML = rows
      .map((u) => {
        const name = escapeHTML(u.name),
          mail = escapeHTML(u.email || "—");
        const badge =
          "<span class='" +
          badgeClass(u.status) +
          "'>" +
          statusLabel(u.status) +
          "</span>";
        const isAdmin = u.role === "admin";
        const lockBtn = isAdmin
          ? "<button class='btn btn--danger btn--sm' type='button' disabled title='Không thể khóa Admin'>Khóa</button>"
          : "<button class='btn btn--sm " +
            (u.status === "active" ? "btn--danger" : "btn--primary") +
            "' data-lock='" +
            u.id +
            "'>" +
            (u.status === "active" ? "Khóa" : "Mở khóa") +
            "</button>";
        return (
          "<tr><td><div class='row'><div><div class='u-fw500'>" +
          name +
          "</div><div class='muted u-fs13'>" +
          mail +
          "</div></div></div></td>" +
          "<td>" +
          u.role +
          "</td>" +
          "<td>" +
          (u.orders || 0) +
          "</td>" +
          "<td class='muted u-fs13'>" +
          (u.joined || "—") +
          "</td>" +
          "<td>" +
          badge +
          "</td>" +
          "<td>" +
          lockBtn +
          "</td></tr>"
        );
      })
      .join("");
    $("rows")
      .querySelectorAll("[data-lock]")
      .forEach((b) =>
        b.addEventListener("click", () => {
          const u = users.find((x) => x.id === b.dataset.lock);
          if (u.role === "admin") {
            renderToast("error", "Không thể khóa tài khoản Admin!");
            return;
          }
          lockId = u.id;
          lockTo = u.status === "active" ? "disabled" : "active";
          $("lockTitle").textContent =
            lockTo === "disabled" ? "Khóa tài khoản" : "Mở khóa tài khoản";
          $("lockMsg").textContent =
            lockTo === "disabled"
              ? 'Bạn chắc chắn muốn khóa tài khoản của "' +
                u.name +
                '"? Họ sẽ không thể đăng nhập.'
              : 'Bạn muốn mở khóa tài khoản của "' + u.name + '"?';
          $("btnDoLock").textContent =
            lockTo === "disabled" ? "Khóa tài khoản" : "Mở khóa";
          $("btnDoLock").className =
            "btn " + (lockTo === "disabled" ? "btn--danger" : "btn--primary");
          $("lockModal").hidden = false;
        }),
      );
  };

  const renderToast = (type, message) => {
    let box = document.getElementById("ui-toast");
    if (!box) {
      box = document.createElement("div");
      box.id = "ui-toast";
      box.setAttribute("role", "status");
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

  const render = () => {
    renderTabs();
    renderRows();
  };

  const setStatus = (id, status) => {
    users = users.map((u) => (u.id === id ? { ...u, status } : u));
    lockId = null;
    lockTo = null;
    save();
    render();
    renderToast(
      "success",
      status === "disabled" ? "Đã khóa tài khoản." : "Đã mở khóa tài khoản.",
    );
  };

  const init = async () => {
    $("state-loading").hidden = false;
    $("state-error").hidden = true;
    try {
      const res = await fetch("../assets/data/users.json");
      if (!res.ok) throw new Error("mock fail");
      users = await res.json();
      load();
      $("state-loading").hidden = true;
      render();
    } catch (e) {
      $("state-loading").hidden = true;
      $("state-error").hidden = false;
    }
  };

  $("btnRetry").addEventListener("click", init);
  $("btnDoLock").addEventListener("click", () => {
    if (lockId) setStatus(lockId, lockTo);
    $("lockModal").hidden = true;
  });
  $("btnOpenAdd").addEventListener("click", () => {
    $("fName").value = "";
    $("fEmail").value = "";
    $("fRole").value = "buyer";
    $("formErr").hidden = true;
    $("addModal").hidden = false;
  });
  $("btnSaveAdd").addEventListener("click", () => {
    const name = $("fName").value.trim();
    const email = $("fEmail").value.trim();
    const role = $("fRole").value;
    if (!name) {
      $("formErr").textContent = "Nhập họ tên.";
      $("formErr").hidden = false;
      return;
    }
    if (!email.includes("@")) {
      $("formErr").textContent = "Email chưa đúng.";
      $("formErr").hidden = false;
      return;
    }
    if (role === "admin" && myRole() !== "admin") {
      $("formErr").textContent = "Chỉ Admin mới được tạo tài khoản Admin.";
      $("formErr").hidden = false;
      return;
    }
    $("formErr").hidden = true;
    users = [
      ...users,
      {
        id: "u" + Date.now(),
        name,
        email,
        role,
        status: "active",
        joined: "",
        orders: 0,
      },
    ];
    save();
    $("addModal").hidden = true;
    renderToast("success", "Đã thêm tài khoản.");
    render();
  });
  [
    ["btnCloseAdd", "addModal"],
    ["btnCancelAdd", "addModal"],
    ["btnCloseLock", "lockModal"],
    ["btnCancelLock", "lockModal"],
  ].forEach(([b, m]) =>
    $(b).addEventListener("click", () => {
      $(m).hidden = true;
    }),
  );
  $("addModal").addEventListener("click", (e) => {
    if (e.target === $("addModal")) $("addModal").hidden = true;
  });
  $("lockModal").addEventListener("click", (e) => {
    if (e.target === $("lockModal")) $("lockModal").hidden = true;
  });
  $("search").addEventListener("input", render);
  init();
})();
