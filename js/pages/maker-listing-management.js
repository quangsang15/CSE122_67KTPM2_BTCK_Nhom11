const $ = (id) => document.getElementById(id);
const TABS = [
  ["all", "Tất cả"],
  ["active", "Đang bán"],
  ["pending", "Chờ duyệt"],
  ["rejected", "Bị từ chối"],
  ["archived", "Lưu trữ"],
];
let listings = [],
  tab = "all",
  editingId = null;
const money = (n) => Number(n).toLocaleString("vi-VN") + "đ";
const role = () => {
  try {
    return String(
      (JSON.parse(localStorage.getItem("craftlink_session_v1")) || {}).role ||
        "buyer",
    ).toLowerCase();
  } catch (e) {
    return "buyer";
  }
};
try {
  const s = JSON.parse(localStorage.getItem("craftlink_session_v1"));
  if (s && s.email) $("navUser").textContent = s.email.split("@")[0];
} catch (e) {}
if (!["maker", "admin"].includes(role())) {
  $("sellGate").hidden = false;
} else {
  $("sellBody").hidden = false;
}
const badge = (st) =>
  "<span class='badge badge--" +
  st +
  "'>" +
  UIState.statusLabel(st) +
  "</span>";
const showErr = (msg) => {
  $("formErr").textContent = msg || "";
  $("formErr").hidden = !msg;
};
const openModal = () => {
  $("listingModal").hidden = false;
  $("fTitle").focus();
};
const closeModal = () => {
  $("listingModal").hidden = true;
  editingId = null;
  $("formTitle").textContent = "Thêm sản phẩm mới";
  showErr("");
};

function render() {
  const q = $("search").value.trim().toLowerCase();
  const rows = listings.filter(
    (l) =>
      (tab === "all" || l.status === tab) &&
      (!q || l.title.toLowerCase().includes(q)),
  );
  $("listingTabs").innerHTML = TABS.map(([id, label]) => {
    const n =
      id === "all"
        ? listings.length
        : listings.filter((l) => l.status === id).length;
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
  $("listingTabs")
    .querySelectorAll("[data-tab]")
    .forEach((b) =>
      b.addEventListener("click", () => {
        tab = b.dataset.tab;
        render();
      }),
    );
  $("listingSub").textContent =
    listings.filter((l) => l.status === "active").length + " sản phẩm đang bán";
  $("state-empty").hidden = rows.length > 0;
  $("tableCard").hidden = rows.length === 0;
  $("rows").innerHTML = rows
    .map(
      (l) =>
        "<tr><td class='u-primary u-fw500'>" +
        l.id +
        "</td>" +
        "<td class='u-fw500'>" +
        l.title +
        "</td>" +
        "<td class='muted'>" +
        l.category +
        "</td>" +
        "<td class='u-fw600'>" +
        money(l.price) +
        "</td>" +
        "<td>" +
        badge(l.status) +
        "</td>" +
        "<td><div class='row'><button class='btn btn--sm' data-edit='" +
        l.id +
        "'>Sửa</button>" +
        (l.status !== "archived"
          ? "<button class='btn btn--sm' data-arch='" +
            l.id +
            "'>Lưu trữ</button>"
          : "") +
        "</div></td></tr>",
    )
    .join("");
  $("rows")
    .querySelectorAll("[data-edit]")
    .forEach((b) =>
      b.addEventListener("click", () => {
        const it = listings.find((x) => x.id === b.dataset.edit);
        editingId = it.id;
        $("fTitle").value = it.title;
        $("fCat").value = it.category;
        $("fPrice").value = it.price;
        $("fOpts").value = (it.customOptions || []).join(", ");
        $("formTitle").textContent = "Sửa món " + it.id;
        openModal();
      }),
    );
  $("rows")
    .querySelectorAll("[data-arch]")
    .forEach((b) =>
      b.addEventListener("click", async () => {
        listings = listings.map((x) =>
          x.id === b.dataset.arch ? { ...x, status: "archived" } : x,
        );
        await API.saveAll("listings", listings);
        UIState.renderToast("success", "Đã lưu trữ sản phẩm");
        render();
      }),
    );
}

$("btnSave").addEventListener("click", async () => {
  const title = $("fTitle").value.trim();
  const price = Number($("fPrice").value);
  if (!title || !$("fPrice").value) {
    showErr("Vui lòng điền tên và giá.");
    return;
  }
  if (!(price >= 0)) {
    showErr("Giá bán không được âm.");
    return;
  }
  showErr("");
  const data = {
    title,
    category: $("fCat").value,
    price,
    customOptions: $("fOpts")
      .value.split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  };
  if (editingId)
    listings = listings.map((x) =>
      x.id === editingId ? { ...x, ...data } : x,
    );
  else
    listings = [
      ...listings,
      {
        id: "l" + Date.now(),
        makerId: "u2",
        status: "pending",
        rating: 5,
        images: [],
        ...data,
      },
    ];
  await API.saveAll("listings", listings);
  $("fTitle").value = "";
  $("fPrice").value = "";
  $("fOpts").value = "";
  closeModal();
  UIState.renderToast("success", "Sản phẩm đã gửi duyệt!");
  render();
});
$("btnOpenModal").addEventListener("click", openModal);
$("btnEmptyAdd").addEventListener("click", openModal);
$("btnCloseModal").addEventListener("click", closeModal);
$("btnCancelModal").addEventListener("click", closeModal);
$("listingModal").addEventListener("click", (e) => {
  if (e.target === $("listingModal")) closeModal();
});
$("search").addEventListener("input", render);
$("btnRetry").addEventListener("click", init);

async function init() {
  if (!["maker", "admin"].includes(role())) return;
  $("state-loading").hidden = false;
  $("state-error").hidden = true;
  try {
    const [data, cats] = await Promise.all([
      API.all("listings"),
      API.all("categories"),
    ]);
    listings = data;
    $("fCat").innerHTML = cats
      .filter((c) => !c.archived)
      .map((c) => "<option>" + c.name + "</option>")
      .join("");
    $("state-loading").hidden = true;
    render();
  } catch (e) {
    $("state-loading").hidden = true;
    $("state-error").hidden = false;
  }
}
init();
