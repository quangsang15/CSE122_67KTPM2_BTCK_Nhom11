(() => {
  const $ = (id) => document.getElementById(id);
  const PLANS = { 99000: "Cơ bản", 249000: "Chuyên nghiệp", 399000: "Cao cấp" };
  const money = (n) => Number(n).toLocaleString("vi-VN") + "₫";
  const STORAGE_KEY = "craftlink_users_v1";
  const SELLER_KEY = "craftlink_seller_v1";
  const SESSION_KEY = "craftlink_session_v1";
  const USERS_JSON = "../assets/data/users.json";

  let plan = "249000";
  let users = [];
  let session = null;

  try {
    session = JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch (e) {
    session = null;
  }

  const showErr = (msg) => {
    $("formErr").textContent = msg || "";
    $("formErr").hidden = !msg;
  };

  const loadUsers = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) users = JSON.parse(raw);
    } catch (e) {
      users = [];
    }
  };

  const saveUsers = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

  const initUsers = async () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        users = JSON.parse(raw);
        return;
      }
      const res = await fetch(USERS_JSON);
      if (!res.ok) throw new Error("mock fail");
      users = await res.json();
      saveUsers();
    } catch (e) {
      loadUsers();
    }
  };

  const paintPlan = () => {
    document.querySelectorAll("#planCards .plan").forEach((el) => {
      el.classList.toggle("active", el.dataset.plan === plan);
    });
    $("planName").textContent = PLANS[plan];
    $("planPrice").textContent = money(Number(plan)) + "/tháng";
    $("paySummary").textContent = "Tổng: " + money(Number(plan));
  };

  document.querySelectorAll("#planCards [data-pick]").forEach((b) =>
    b.addEventListener("click", () => {
      plan = b.dataset.pick;
      paintPlan();
      $("shopName").focus();
    }),
  );

  document.querySelectorAll("#planCards .plan").forEach((el) =>
    el.addEventListener("click", (e) => {
      if (!e.target.closest("[data-pick]")) {
        plan = el.dataset.plan;
        paintPlan();
      }
    }),
  );

  if (session && session.email) {
    $("navUser").textContent = session.email.split("@")[0];
    if (!$("email").value) $("email").value = session.email;
  }

  if (session && ["maker", "admin"].includes(String(session.role || "").toLowerCase())) {
    $("regBody").hidden = true;
    $("state-already").hidden = false;
  }

  paintPlan();

  $("btnPay").addEventListener("click", async () => {
    const shop = $("shopName").value.trim();
    const phone = $("phone").value.trim();
    const email = $("email").value.trim();
    const address = $("address").value.trim();

    if (shop.length < 3) {
      showErr("Tên gian hàng ít nhất 3 ký tự nhé.");
      return;
    }
    if (!/^0\d{9}$/.test(phone)) {
      showErr("Số điện thoại 10 số, bắt đầu bằng 0 nhé.");
      return;
    }
    if (!email.includes("@")) {
      showErr("Email chưa đúng.");
      return;
    }
    if (!address) {
      showErr("Nhập địa chỉ lấy hàng đã nhé.");
      return;
    }

    showErr("");
    $("btnPay").disabled = true;
    $("payLoading").hidden = false;

    await new Promise((r) => setTimeout(r, 1200));

    try {
      await initUsers();
      const emailLower = email.toLowerCase();
      const i = users.findIndex((u) => String(u.email || "").toLowerCase() === emailLower);
      if (i >= 0) {
        users[i] = { ...users[i], role: "maker", shopName: shop, phone, address };
      } else {
        users.push({
          id: "u" + Date.now(),
          name: shop,
          email,
          role: "maker",
          status: "active",
          joined: "",
          orders: 0,
          shopName: shop,
          phone,
          address,
        });
      }
      saveUsers();
      localStorage.setItem(SESSION_KEY, JSON.stringify({ email, role: "maker" }));
      localStorage.setItem(SELLER_KEY, JSON.stringify({ email, shopName: shop, plan, paidAt: Date.now() }));
      $("state-success").hidden = false;
      $("state-success").scrollIntoView({ block: "center" });
    } catch (e) {
      showErr("Thanh toán mock lỗi, thử lại nhé.");
    } finally {
      $("btnPay").disabled = false;
      $("payLoading").hidden = true;
    }
  });

  initUsers();
})();
