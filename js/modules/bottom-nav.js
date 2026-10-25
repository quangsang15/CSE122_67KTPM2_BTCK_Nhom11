(() => {
  if (document.querySelector(".bottom-nav")) return;
  const inPages = location.pathname.includes("/pages/");
  const P = inPages ? "" : "pages/";
  const HOME = inPages ? "../index.html" : "index.html";

  const getRole = () => {
    try {
      const s = JSON.parse(localStorage.getItem("craftlink_session_v1"));
      return (s && s.role ? String(s.role).toLowerCase() : "buyer");
    } catch (e) { return "buyer"; }
  };
  const canSell = () => ["maker", "admin"].includes(getRole());
  const sellHref = () => (canSell() ? P + "maker-listing-management.html" : P + "seller-register.html");

  const path = location.pathname.toLowerCase();
  const isActive = (key) => {
    if (key === "home") return path.endsWith("index.html") || path === "/" || path.endsWith("/");
    if (key === "market") return path.includes("buyer-marketplace");
    if (key === "sell") return path.includes("maker-listing") || path.includes("maker-brief") || path.includes("maker-proposal") || path.includes("seller-register");
    if (key === "profile") return path.includes("profile") || path.includes("settings");
    return false;
  };

  const nav = document.createElement("nav");
  nav.className = "bottom-nav";
  nav.setAttribute("aria-label", "Điều hướng chính");
  nav.innerHTML =
    "<a class='bottom-nav__link" + (isActive("home") ? " bottom-nav__link--active" : "") + "' href='" + HOME + "'><i class='fa-solid fa-house'></i><span>Trang chủ</span></a>" +
    "<a class='bottom-nav__link" + (isActive("market") ? " bottom-nav__link--active" : "") + "' href='" + P + "buyer-marketplace.html'><i class='fa-solid fa-store'></i><span>Dạo chợ</span></a>" +
    "<a class='bottom-nav__link" + (isActive("sell") ? " bottom-nav__link--active" : "") + "' href='" + sellHref() + "' data-sell><i class='fa-solid fa-shop'></i><span>Bán hàng</span></a>" +
    "<a class='bottom-nav__link" + (isActive("profile") ? " bottom-nav__link--active" : "") + "' href='" + P + "profile.html'><i class='fa-solid fa-user'></i><span>Hồ sơ</span></a>";

  
  nav.querySelector("[data-sell]").addEventListener("click", (ev) => {
    const href = sellHref();
    if (ev.currentTarget.getAttribute("href") !== href) {
      ev.preventDefault();
      location.href = href;
    }
  });

  document.body.appendChild(nav);
})();
