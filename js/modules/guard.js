(() => {
  const role = () => {
    try {
      return String(
        (JSON.parse(localStorage.getItem("craftlink_session_v1") || "{}") || {})
          .role || "",
      ).toLowerCase();
    } catch (e) {
      return "";
    }
  };
  window.Guard = {
    role,
    require: (...roles) => {
      const r = role();
      const want = roles.map((x) => String(x).toLowerCase());
      if (!r) {
        location.href = "login.html";
        throw new Error("guard: chua dang nhap");
      }
      if (!want.includes(r)) {
        location.href = "403.html";
        throw new Error("guard: sai vai tro");
      }
      return true;
    },
  };
})();
