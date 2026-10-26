// Trang chủ — tách từ index.html
  // Trang chủ (SV1 Huy): session + pills danh mục + makers nổi bật.
  const $ = (id) => document.getElementById(id);
  const MAKERS = [
    { name: "Nguyên Minh", skill: "Thư pháp & Calligraphy", rating: 4.9, orders: 128, av: "NM" },
    { name: "Lan Hương", skill: "Đồ gốm sứ thủ công", rating: 4.8, orders: 95, av: "LH" },
    { name: "Tuấn Khanh", skill: "Tranh lụa truyền thống", rating: 5.0, orders: 77, av: "TK" },
    { name: "Bảo Châu", skill: "Trang sức bạc", rating: 4.7, orders: 214, av: "BC" },
  ];
  try {
    const s = JSON.parse(localStorage.getItem("craftlink_session_v1"));
    if (s && s.email) $("navUser").textContent = s.email.split("@")[0];
  } catch (e) {}
  $("makerGrid").innerHTML = MAKERS.map((m) =>
    "<div class='card u-text-center'>" +
    "<div class='avatar avatar-sm'>" + m.av + "</div>" +
    "<div class='u-fw600 u-mb4'>" + m.name + "</div>" +
    "<div class='muted u-mb10'>" + m.skill + "</div>" +
    "<div class='muted u-fs12'>⭐ " + m.rating + " · 📦 " + m.orders + " đơn</div>" +
    "<a href='pages/buyer-marketplace.html' class='btn btn--primary btn--sm btn--block u-mt14'>Xem gian hàng</a></div>"
  ).join("");
  API.all("categories").then((cats) => {
    $("catPills").innerHTML = cats.filter((c) => !c.archived).map((c) =>
      "<a class='pill pill-link' href='pages/buyer-marketplace.html?cat=" + encodeURIComponent(c.name) + "'>" + escapeHTML(c.name) + "</a>"
    ).join("");
  }).catch(() => {});
