(() => {
  const $ = (id) => document.getElementById(id);
  const form = $("loginForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("email").value.trim();
    const pw = $("pw").value;
    let ok = true;
    if (!email) {
      $("emailErr").textContent = "Vui lòng nhập email";
      $("emailErr").hidden = false;
      ok = false;
    } else {
      $("emailErr").hidden = true;
    }
    if (!pw) {
      $("pwErr").textContent = "Vui lòng nhập mật khẩu";
      $("pwErr").hidden = false;
      ok = false;
    } else if (pw.length < 6) {
      $("pwErr").textContent = "Mật khẩu từ 6 ký tự trở lên nhé.";
      $("pwErr").hidden = false;
      ok = false;
    } else {
      $("pwErr").hidden = true;
    }
    if (!ok) return;
    const btn = $("btnLogin");
    btn.disabled = true;
    btn.textContent = "Đang đăng nhập...";
    setTimeout(() => {
      const role = email.startsWith("maker")
        ? "maker"
        : email.startsWith("mod")
          ? "moderator"
          : email.startsWith("admin")
            ? "admin"
            : "buyer";
      localStorage.setItem(
        "craftlink_session_v1",
        JSON.stringify({ email, role }),
      );
      location.href = "admin-platform-dashboard.html";
    }, 800);
  });
})();
