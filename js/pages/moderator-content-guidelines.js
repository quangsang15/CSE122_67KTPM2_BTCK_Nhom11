(() => {
  Guard.require("moderator", "admin");
  const $ = (id) => document.getElementById(id);
  const KEY = "craftlink_guidelines_v1";
  const CATS = ["Hình ảnh", "Nội dung", "Giá cả", "Vận chuyển", "Giao dịch"];
  const SEED = [
    {
      id: "g1",
      title: "Quy định về hình ảnh sản phẩm",
      category: "Hình ảnh",
      body: "Hình ảnh phải là ảnh thật của sản phẩm do chính nghệ nhân chụp. Không dùng ảnh stock hoặc ảnh lấy từ internet. Ảnh rõ nét, đủ sáng, thể hiện đúng màu sắc và kích thước sản phẩm.",
      updated: "15/03/2025",
    },
    {
      id: "g2",
      title: "Tiêu chuẩn mô tả sản phẩm",
      category: "Nội dung",
      body: "Mô tả phải nêu rõ nguyên liệu sử dụng, kích thước, thời gian làm thủ công, và phương pháp bảo quản. Không được phép sử dụng từ ngữ gây hiểu lầm hoặc phóng đại.",
      updated: "10/03/2025",
    },
    {
      id: "g3",
      title: "Chính sách định giá công bằng",
      category: "Giá cả",
      body: "Giá sản phẩm phản ánh đúng giá trị lao động thủ công. Không được phép bán giá thấp hơn chi phí nguyên liệu + công sức. Gian hàng phổ thông: tối đa 50 sản phẩm.",
      updated: "08/03/2025",
    },
  ];

  let rows = [];
  let editingId = null;
  let delId = null;

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

  const load = () => {
    try {
      const raw = localStorage.getItem(KEY);
      rows = raw ? JSON.parse(raw) : SEED;
      if (!raw) persist();
    } catch (e) {
      rows = SEED;
    }
  };

  const persist = () => localStorage.setItem(KEY, JSON.stringify(rows));

  function render() {
    $("state-empty").hidden = rows.length > 0;
    $("list").innerHTML = rows
      .map(
        (g) =>
          "<div class='card u-mb16'>" +
          "<div class='row row--between u-mb8'>" +
          "<div class='row'>" +
          "<span class='badge badge--tag'>" +
          escapeHTML(g.category) +
          "</span>" +
          "<span class='muted u-fs13'>Cập nhật: " +
          escapeHTML(g.updated || "—") +
          "</span>" +
          "</div>" +
          "<div class='row'>" +
          "<button class='btn btn--sm' type='button' data-edit='" +
          g.id +
          "'>Sửa</button>" +
          "<button class='btn btn--danger btn--sm' type='button' data-del='" +
          g.id +
          "'>Xóa</button>" +
          "</div>" +
          "</div>" +
          "<h3>" +
          escapeHTML(g.title) +
          "</h3>" +
          "<p class='muted'>" +
          escapeHTML(g.body) +
          "</p>" +
          "</div>",
      )
      .join("");

    $("list")
      .querySelectorAll("[data-edit]")
      .forEach((b) =>
        b.addEventListener("click", () => {
          const g = rows.find((x) => x.id === b.dataset.edit);
          if (!g) return;
          editingId = g.id;
          $("editTitle").textContent = "Chỉnh sửa hướng dẫn";
          $("fTitle").value = g.title;
          $("fCat").value = CATS.includes(g.category) ? g.category : CATS[0];
          $("fBody").value = g.body;
          showErr("");
          $("editModal").hidden = false;
          $("fTitle").focus();
        }),
      );

    $("list")
      .querySelectorAll("[data-del]")
      .forEach((b) =>
        b.addEventListener("click", () => {
          delId = b.dataset.del;
          $("delModal").hidden = false;
        }),
      );
  }

  $("btnOpenCreate").addEventListener("click", () => {
    editingId = null;
    $("editTitle").textContent = "Thêm hướng dẫn mới";
    $("fTitle").value = "";
    $("fCat").value = CATS[0];
    $("fBody").value = "";
    showErr("");
    $("editModal").hidden = false;
    $("fTitle").focus();
  });

  $("btnSave").addEventListener("click", () => {
    const title = $("fTitle").value.trim();
    const body = $("fBody").value.trim();
    if (!title || !body) {
      showErr("Vui lòng nhập đầy đủ tiêu đề và nội dung.");
      return;
    }
    showErr("");
    const today = new Date().toLocaleDateString("vi-VN");
    if (editingId) {
      rows = rows.map((x) =>
        x.id === editingId
          ? { ...x, title, category: $("fCat").value, body, updated: today }
          : x,
      );
      renderToast("success", "Đã cập nhật hướng dẫn!");
    } else {
      rows = [
        ...rows,
        {
          id: "g" + Date.now(),
          title,
          category: $("fCat").value,
          body,
          updated: today,
        },
      ];
      renderToast("success", "Đã thêm hướng dẫn mới!");
    }
    persist();
    $("editModal").hidden = true;
    editingId = null;
    render();
  });

  $("btnDoDel").addEventListener("click", () => {
    rows = rows.filter((x) => x.id !== delId);
    persist();
    $("delModal").hidden = true;
    delId = null;
    renderToast("success", "Đã xóa hướng dẫn.");
    render();
  });

  [
    ["btnCloseEdit", "editModal"],
    ["btnCancelEdit", "editModal"],
    ["btnCloseDel", "delModal"],
    ["btnCancelDel", "delModal"],
  ].forEach(([b, m]) =>
    $(b).addEventListener("click", () => {
      $(m).hidden = true;
    }),
  );

  $("editModal").addEventListener("click", (e) => {
    if (e.target === $("editModal")) $("editModal").hidden = true;
  });

  $("delModal").addEventListener("click", (e) => {
    if (e.target === $("delModal")) $("delModal").hidden = true;
  });

  load();
  render();
})();
