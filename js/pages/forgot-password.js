
const $ = (id) => document.getElementById(id);
$("fpForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = $("email").value.trim().toLowerCase();
  if (!email) { UIState.renderToast("error", "Vui lòng nhập email."); return; }
  const btn = $("btnSend");
  btn.disabled = true;
  btn.textContent = "Đang gửi...";
  setTimeout(async () => {
    try {
      const users = await API.all("users");
      const found = users.some((u) => (u.email || "").toLowerCase() === email);
      if (!found) {
        UIState.renderToast("error", "Email này chưa từng đăng ký.");
        btn.disabled = false;
        btn.textContent = "Gửi link đặt lại";
        return;
      }
      $("fpMail").textContent = email;
      $("fpForm").hidden = true;
      $("fpDone").hidden = false;
      UIState.renderToast("success", "Đã gửi email đặt lại mật khẩu!");
    } catch (err) {
      UIState.renderToast("error", "Mạng chập chờn, thử lại nhé.");
      btn.disabled = false;
      btn.textContent = "Gửi link đặt lại";
    }
  }, 800);
});
