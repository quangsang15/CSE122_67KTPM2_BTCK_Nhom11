
const $ = (id) => document.getElementById(id);
$("regForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = $("name").value.trim();
  const email = $("email").value.trim();
  const pw = $("pw").value;
  let ok = true;
  if (!name) { $("nameErr").textContent = "Vui lòng nhập họ tên"; $("nameErr").hidden = false; ok = false; }
  else $("nameErr").hidden = true;
  if (!email) { $("emailErr").textContent = "Vui lòng nhập email"; $("emailErr").hidden = false; ok = false; }
  else $("emailErr").hidden = true;
  if (pw.length < 6) { $("pwErr").textContent = "Mật khẩu ít nhất 6 ký tự"; $("pwErr").hidden = false; ok = false; }
  else $("pwErr").hidden = true;
  if (!ok) return;
  const btn = $("btnReg");
  btn.disabled = true;
  btn.textContent = "Đang tạo tài khoản...";
  try {
    const users = await API.all("users");
    await API.saveAll("users", [...users, { id: "u" + Date.now(), name, email, role: $("role").value, status: "active", bio: "" }]);
    localStorage.setItem("craftlink_session_v1", JSON.stringify({ email, role: $("role").value }));
    UIState.renderToast("success", "Đăng ký thành công!");
    location.href = $("role").value === "maker" ? "seller-register.html" : "buyer-marketplace.html";
  } catch (err) {
    UIState.renderToast("error", "Mạng chập chờn, thử lại nhé.");
    btn.disabled = false;
    btn.textContent = "Đăng ký";
  }
});
