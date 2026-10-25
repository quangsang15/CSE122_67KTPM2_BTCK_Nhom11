 const $ = (id) => document.getElementById(id);
  const OVERLAY = "craftlink_profile_v1";
  const money = (n) => Number(n).toLocaleString("vi-VN") + "đ";
  let email = "buyer@demo.vn", uid = null, editing = false;
  try {
    const s = JSON.parse(localStorage.getItem("craftlink_session_v1"));
    if (s && s.email) email = s.email;
    $("navUser").textContent = email.split("@")[0];
  } catch (e) {}
  const badge = (st) => "<span class='badge badge--" + st + "'>" + UIState.statusLabel(st) + "</span>";
  const initials = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  function renderView(data) {
    $("infoView").innerHTML = [["Họ và tên", data.name], ["Email", data.email], ["Giới thiệu", data.bio || "Chưa có giới thiệu."]]
      .map(([k, v]) => "<div class='kv'><small>" + k + "</small><div>" + escapeHTML(v) + "</div></div>").join("");
  }

  $("btnEdit").addEventListener("click", () => {
    editing = true;
    $("infoView").hidden = true;
    $("infoForm").hidden = false;
    $("btnEdit").hidden = true;
  });
  $("btnCancel").addEventListener("click", () => {
    editing = false;
    $("infoView").hidden = false;
    $("infoForm").hidden = true;
    $("btnEdit").hidden = false;
  });
  $("btnSave").addEventListener("click", () => {
    const name = $("fName").value.trim();
    if (name.length < 2) { $("formErr").textContent = "Họ tên ít nhất 2 ký tự nhé."; $("formErr").hidden = false; return; }
    $("formErr").hidden = true;
    const overlay = JSON.parse(localStorage.getItem(OVERLAY) || "{}");
    overlay[uid] = { name, bio: $("fBio").value.trim() };
    localStorage.setItem(OVERLAY, JSON.stringify(overlay));
    $("pName").textContent = name;
    $("avatarBig").textContent = initials(name);
    renderView({ name, email, bio: $("fBio").value.trim() });
    $("btnCancel").click();
    UIState.renderToast("success", "Cập nhật hồ sơ thành công!");
  });
  $("btnLogout").addEventListener("click", () => {
    localStorage.removeItem("craftlink_session_v1");
    location.href = "login.html";
  });
  $("btnRetry").addEventListener("click", init);

  async function init() {
    $("state-loading").hidden = false;
    $("state-error").hidden = true;
    $("profileBody").hidden = true;
    try {
      const [users, orders, proposals, briefs] = await Promise.all([
        API.all("users"), API.all("orders"), API.all("proposals"), API.all("briefs")]);
      const overlay = JSON.parse(localStorage.getItem(OVERLAY) || "{}");
      const found = users.find((u) => (u.email || "").toLowerCase() === email.toLowerCase()) || users[0];
      const data = { ...found, ...(overlay[found.id] || {}) };
      uid = found.id;
      $("pName").textContent = data.name;
      $("avatarBig").textContent = initials(data.name || "?");
      $("fName").value = data.name || "";
      $("fBio").value = data.bio || "";
      renderView({ name: data.name, email: data.email, bio: data.bio });
      const mine = orders.filter((o) => (o.buyerId || "u1") === (found.id || "u1"));
      const all = mine.length ? mine : orders;
      $("pStats").innerHTML = [["Đơn hàng", all.length], ["Chờ xử lý", all.filter((o) => o.status === "pending").length], ["Hoàn thành", all.filter((o) => o.status === "done").length]]
        .map(([k, v]) => "<div class='row row--between u-mb8 u-fs14'><span class='muted'>" + k + "</span><b>" + v + "</b></div>").join("");
      $("recentRows").innerHTML = all.slice(0, 3).map((o) => {
        const p = proposals.find((x) => x.id === o.proposalId);
        const b = p && briefs.find((x) => x.id === p.briefId);
        return "<tr><td class='u-fw500 u-primary'>" + o.id + "</td><td>" + (b ? b.title : "—") + "</td><td>" + badge(o.status) + "</td><td>" + money(o.amount) + "</td></tr>";
      }).join("") || "<tr><td colspan='4' class='muted'>Chưa có đơn hàng.</td></tr>";
      const isAdmin = ["maker", "admin", "moderator"].includes(String(data.role || "").toLowerCase());
      $("linkSell").textContent = isAdmin ? "Kênh người bán" : "Đăng ký bán hàng";
      $("linkSell").href = isAdmin ? "maker-listing-management.html" : "seller-register.html";
      $("profileBody").hidden = false;
    } catch (e) {
      $("state-error").hidden = false;
    } finally {
      $("state-loading").hidden = true;
    }
  }
  init();
