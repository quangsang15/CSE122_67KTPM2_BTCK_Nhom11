(() => {
  Guard.require("admin");
  const getElementById = (id) => document.getElementById(id);
  const STORAGE_PREFIX = "craftlink_";
  const STORAGE_SUFFIX = "_v1";

  const escapeHTML = (text) =>
    String(text ?? "").replace(
      /[&<>"']/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[character],
    );

  const formatShortMoney = (amount) =>
    amount >= 1000000
      ? "₫" + (amount / 1000000).toFixed(1) + "M"
      : "₫" + Number(amount).toLocaleString("vi-VN");

  const getStatusLabel = (status) =>
    ({
      pending: "Chờ duyệt",
      active: "Đang hoạt động",
      rejected: "Từ chối",
      handling: "Đang xử lý",
      done: "Hoàn thành",
      cancelled: "Đã hủy",
      making: "Đang làm",
      revision: "Cần sửa",
    })[status] || status;

  const getBadgeClass = (status) => {
    const statusLower = String(status || "").toLowerCase();
    if (["pending", "open", "handling"].includes(statusLower)) {
      return "badge badge--pending";
    }
    if (["rejected", "cancelled", "disabled", "failed"].includes(statusLower)) {
      return "badge badge--rejected";
    }
    if (
      ["done", "approved", "active", "accepted", "completed"].includes(
        statusLower,
      )
    ) {
      return "badge badge--done";
    }
    if (["archived"].includes(statusLower)) {
      return "badge badge--archived";
    }
    if (["making", "revision"].includes(statusLower)) {
      return "badge badge--pending";
    }
    return "badge";
  };

  const renderToast = (type, message) => {
    let toastBox = document.getElementById("ui-toast");
    if (!toastBox) {
      toastBox = document.createElement("div");
      toastBox.id = "ui-toast";
      toastBox.setAttribute("role", "status");
      document.body.appendChild(toastBox);
    }
    toastBox.className =
      "toast toast--" + (type === "error" ? "error" : "success");
    toastBox.textContent = message;
    toastBox.hidden = false;
    clearTimeout(toastBox._t);
    toastBox._t = setTimeout(() => {
      toastBox.hidden = true;
    }, 3000);
  };

  const loadEntity = async (entityName) => {
    const storageKey = STORAGE_PREFIX + entityName + STORAGE_SUFFIX;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {}
    const response = await fetch("../assets/data/" + entityName + ".json");
    if (!response.ok) {
      throw new Error("mock fail: " + entityName);
    }
    const data = await response.json();
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (e) {}
    return data;
  };

  const renderAll = (listings, briefs, proposals, orders, users) => {
    const statsElement = getElementById("stats");
    const pendingCount = listings.filter(
      (listing) => listing.status === "pending",
    ).length;
    const sentCount = briefs.filter((brief) => brief.status === "sent").length;
    const waitQuoteCount = proposals.filter(
      (proposal) => proposal.status === "pending",
    ).length;
    const doingCount = orders.filter(
      (order) => order.status === "making" || order.status === "revision",
    ).length;
    const totalRevenue = orders
      .filter((order) => order.status !== "cancelled")
      .reduce(
        (accumulatedTotal, order) =>
          accumulatedTotal + Number(order.amount || 0),
        0,
      );

    statsElement.innerHTML = [
      ["💰", "Tổng giá trị đơn", formatShortMoney(totalRevenue)],
      ["📦", "Món chờ duyệt", pendingCount],
      ["📩", "Yêu cầu mới gửi", sentCount],
      ["👥", "Thành viên", users.length],
    ]
      .map(
        ([icon, label, displayValue]) =>
          "<div class='stat'><div class='row row--between'><small>" +
          label +
          "</small><span class='u-fs20'>" +
          icon +
          "</span></div><b>" +
          displayValue +
          "</b></div>",
      )
      .join("");

    const statusGroups = [
      ["pending", "Chờ xử lý"],
      ["making", "Đang làm"],
      ["revision", "Cần sửa"],
      ["done", "Xong"],
      ["cancelled", "Đã hủy"],
    ];
    const maxRevenue = Math.max(
      1,
      ...statusGroups.map(([status]) =>
        orders
          .filter((order) => order.status === status)
          .reduce(
            (accumulatedTotal, order) =>
              accumulatedTotal + Number(order.amount || 0),
            0,
          ),
      ),
    );
    const revenueBarsElement = getElementById("revBars");
    revenueBarsElement.innerHTML = statusGroups
      .map(([status, label], index) => {
        const statusRevenue = orders
          .filter((order) => order.status === status)
          .reduce(
            (accumulatedTotal, order) =>
              accumulatedTotal + Number(order.amount || 0),
            0,
          );
        return (
          "<div class='bar'><i style='height:" +
          Math.max(4, (statusRevenue / maxRevenue) * 100) +
          "%" +
          (index === 3 ? ";opacity:1" : "") +
          "' title='" +
          label +
          ": " +
          formatShortMoney(statusRevenue) +
          "'></i><span>" +
          label +
          "</span></div>"
        );
      })
      .join("");

    const categoryCount = {};
    listings
      .filter((listing) => listing.status === "active")
      .forEach((listing) => {
        categoryCount[listing.category] =
          (categoryCount[listing.category] || 0) + 1;
      });
    const maxCategoryCount = Math.max(1, ...Object.values(categoryCount), 1);
    const categoryColors = [
      "#2563EB",
      "#7C3AED",
      "#059669",
      "#D97706",
      "#DB2777",
    ];
    const categoryBarsElement = getElementById("catBars");
    categoryBarsElement.innerHTML =
      Object.entries(categoryCount)
        .map(
          ([categoryName, count], index) =>
            "<div class='u-mb10'><div class='row row--between u-mb4 u-fs13'><span>" +
            escapeHTML(categoryName) +
            "</span><b>" +
            count +
            "</b></div>" +
            "<div class='meter'><i style='width:" +
            (count / maxCategoryCount) * 100 +
            "%;background:" +
            categoryColors[index % categoryColors.length] +
            "'></i></div></div>",
        )
        .join("") || "<p class='muted'>Chưa có món đang bán.</p>";

    const getMakerName = (makerId) =>
      escapeHTML(
        (users.find((user) => user.id === makerId) || {}).name || makerId,
      );
    const recentRowsElement = getElementById("recentRows");
    recentRowsElement.innerHTML =
      orders
        .slice(0, 5)
        .map(
          (order) =>
            "<tr><td class='u-fw500 u-primary'>" +
            escapeHTML(order.id) +
            "</td><td>" +
            getMakerName(order.makerId) +
            "</td><td class='u-fw600'>" +
            formatShortMoney(order.amount) +
            "</td><td><span class='" +
            getBadgeClass(order.status) +
            "'>" +
            getStatusLabel(order.status) +
            "</span></td></tr>",
        )
        .join("") ||
      "<tr><td colspan='4' class='muted'>Chưa có đơn hàng.</td></tr>";

    const insightElement = getElementById("insight");
    insightElement.textContent =
      listings.length + briefs.length + proposals.length < 5
        ? "Chợ còn ít món, đăng thêm món rồi tải lại nhé."
        : "Nhiều yêu cầu đang chờ báo giá (" +
          waitQuoteCount +
          ") — người bán nên trả lời yêu cầu mới trước; có " +
          pendingCount +
          " món chờ duyệt cần xem.";
  };

  async function initializeDashboard() {
    const loadingElement = getElementById("state-loading");
    const errorElement = getElementById("state-error");
    const dashboardBody = getElementById("dashBody");
    loadingElement.hidden = false;
    errorElement.hidden = true;
    dashboardBody.hidden = true;
    try {
      if (new URLSearchParams(location.search).has("fail")) {
        throw new Error("demo loi");
      }
      const [listings, briefs, proposals, orders, users] = await Promise.all([
        loadEntity("listings"),
        loadEntity("briefs"),
        loadEntity("proposals"),
        loadEntity("orders"),
        loadEntity("users"),
      ]);
      renderAll(listings, briefs, proposals, orders, users);
      loadingElement.hidden = true;
      dashboardBody.hidden = false;
      renderToast("success", "Đã tải bảng điều khiển thành công.");
    } catch (error) {
      loadingElement.hidden = true;
      errorElement.hidden = false;
      renderToast("error", "Không thể tải dữ liệu dashboard.");
    }
  }

  const retryButton = getElementById("btnRetry");
  retryButton.addEventListener("click", initializeDashboard);

  window.addEventListener("storage", (event) => {
    const relatedKeys = [
      "craftlink_listings_v1",
      "craftlink_briefs_v1",
      "craftlink_proposals_v1",
      "craftlink_orders_v1",
      "craftlink_users_v1",
    ];
    if (event.key && relatedKeys.includes(event.key)) {
      initializeDashboard();
    }
  });

  initializeDashboard();
})();
