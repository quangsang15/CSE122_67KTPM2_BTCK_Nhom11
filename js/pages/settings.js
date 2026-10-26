const $ = (id) => document.getElementById(id);
const KEY = "craftlink_settings_v1";
let s = { mail: true, sms: false, dark: false, lang: "vi" };
try {
  const raw = JSON.parse(localStorage.getItem(KEY) || "{}");
  s = { mail: raw.mail !== false, sms: !!raw.sms, dark: raw.theme === "dark" || !!raw.dark, lang: raw.lang || "vi" };
  const sess = JSON.parse(localStorage.getItem("craftlink_session_v1"));
  if (sess && sess.email) $("navUser").textContent = sess.email.split("@")[0];
} catch (e) {}
function paint() {
  $("tglMail").classList.toggle("on", s.mail);
  $("tglMail").setAttribute("aria-checked", String(s.mail));
  $("tglSms").classList.toggle("on", s.sms);
  $("tglSms").setAttribute("aria-checked", String(s.sms));
  $("tglTheme").classList.toggle("on", s.dark);
  document.documentElement.classList.toggle("theme-dark", s.dark);
  $("lang").value = s.lang;
}
$("tglMail").addEventListener("click", () => { s.mail = !s.mail; paint(); });
$("tglSms").addEventListener("click", () => { s.sms = !s.sms; paint(); });
$("tglTheme").addEventListener("click", () => { s.dark = !s.dark; paint(); });
$("lang").addEventListener("change", () => { s.lang = $("lang").value; });
$("btnSave").addEventListener("click", () => {
  localStorage.setItem(KEY, JSON.stringify({ mail: s.mail, sms: s.sms, theme: s.dark ? "dark" : "light", lang: s.lang }));
  UIState.renderToast("success", "Đã lưu cài đặt!");
});
$("btnDelete").addEventListener("click", () => {
  if (!confirm("Xóa tài khoản và đăng xuất? Hành động không thể hoàn tác.")) return;
  localStorage.removeItem("craftlink_session_v1");
  UIState.renderToast("success", "Đã xóa phiên đăng nhập.");
  setTimeout(() => location.href = "../index.html", 600);
});
paint();
