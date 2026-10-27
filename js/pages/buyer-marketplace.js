   const $ = (id) => document.getElementById(id);
  let listings = [], cats = [], lastAI = [];
  let cat = new URLSearchParams(location.search).get("cat") || "";
  const money = (n) => Number(n).toLocaleString("vi-VN") + "đ";
  const stars = (r) => "★★★★★".slice(0, Math.round(r || 0)) + "☆☆☆☆☆".slice(0, 5 - Math.round(r || 0));
  try {
    const s = JSON.parse(localStorage.getItem("craftlink_session_v1"));
    if (s && s.email) $("navUser").textContent = s.email.split("@")[0];
  } catch (e) {}
  const shorted = (id) => { try { return JSON.parse(localStorage.getItem("craftlink_shortlist_v1") || "[]").includes(id); } catch (e) { return false; } };

  function renderPills() {
    $("catPills").innerHTML = ["", ...cats].map((c) =>
      "<button type='button' class='pill" + (cat === c ? " active" : "") + "' data-cat=\"" + c.replace(/"/g, "") + "\">" + (c || "Tất cả") + "</button>"
    ).join("");
    $("catPills").querySelectorAll("[data-cat]").forEach((b) =>
      b.addEventListener("click", () => { cat = b.dataset.cat; renderPills(); applyFilter(); }));
  }

  function toggleShort(id, btn) {
    const key = "craftlink_shortlist_v1";
    const cur = JSON.parse(localStorage.getItem(key) || "[]");
    const i = cur.indexOf(id);
    if (i >= 0) cur.splice(i, 1); else cur.push(id);
    localStorage.setItem(key, JSON.stringify(cur));
    btn.textContent = cur.includes(id) ? "❤️" : "🤍";
    UIState.renderToast("success", cur.includes(id) ? "Đã lưu vào yêu thích." : "Đã bỏ khỏi yêu thích.");
  }

  function cardHTML(p) {
    const img = (p.images && p.images[0]) || "";
    const title = escapeHTML(p.title), cat = escapeHTML(p.cat), maker = escapeHTML(p.maker);
    return (img ? "<img class='product-card__img' src='" + img + "' alt='Ảnh " + title + "' loading='lazy' />" : "") +
      "<div class='product-card__body'>" +
      "<div class='row row--between'><span class='badge'>" + cat + "</span>" +
          "<button class='heart' type='button' data-short='" + p.id + "' aria-label='Lưu yêu thích'>" + (shorted(p.id) ? "❤️" : "🤍") + "</button></div>" +
          "<div class='u-fw600 u-fs14'>" + title + "</div>" +
          "<div class='muted u-fs13'>bởi " + maker + " · ⭐ " + p.rating + "</div>" +
      "<div class='row row--between'><span class='u-fw700 u-primary'>" + p.price + "</span>" +
      "<a href='buyer-custom-brief.html' class='btn btn--primary btn--sm'>Đặt ngay</a></div></div>";
  }

  function applyFilter() {
    const q = $("q").value.trim().toLowerCase();
    const max = Number($("maxPrice").value) || Infinity;
    const rows = listings.filter((p) =>
      (!cat || p.cat === cat) &&
      (!q || (p.name + " " + p.maker).toLowerCase().includes(q)) &&
      p.num <= max);
    $("state-empty").hidden = rows.length > 0;
    $("grid").innerHTML = rows.map((p) => "<div class='product-card'>" + cardHTML(p) + "</div>").join("");
    $("grid").querySelectorAll("[data-short]").forEach((b) =>
      b.addEventListener("click", () => toggleShort(b.dataset.short, b)));
  }

  async function init() {
    $("state-loading").hidden = false;
    $("state-error").hidden = true;
    $("skels").innerHTML = Array.from({ length: 8 }).map(() => "<div class='card'><div class='skel skel-line60'></div><div class='skel media-h80'></div><div class='skel skel-line30'></div></div>").join("");
    try {
      const [data, rawCats] = await Promise.all([API.all("listings"), API.all("categories")]);
      cats = rawCats.filter((c) => !c.archived).map((c) => c.name);
      const users = await API.all("users").catch(() => []);
      const makerOf = (id) => (users.find((u) => u.id === id) || {}).name || "Nghệ nhân";
      listings = data.filter((x) => x.status === "active").map((x) => ({
        id: x.id, name: x.title, maker: makerOf(x.makerId), cat: x.category,
        price: money(x.price), num: Number(x.price), rating: x.rating || 5, images: x.images || [],
      }));
      $("state-loading").hidden = true;
      renderPills();
      applyFilter();
    } catch (err) {
      $("state-loading").hidden = true;
      $("state-error").hidden = false;
    }
  }

  $("aiToggle").addEventListener("click", () => {
    const open = $("aiPanel").hidden;
    $("aiPanel").hidden = !open;
    $("aiToggle").setAttribute("aria-expanded", String(open));
  });

  $("aiGo").addEventListener("click", async () => {
    const style = $("aiStyle").value.trim();
    const budget = Number($("aiBudget").value);
    if ($("aiBudget").value && !(budget >= 0)) { UIState.renderToast("error", "Ngân sách không được âm."); return; }
    $("aiLoading").hidden = false;
    $("aiResult").innerHTML = "";
    $("aiFail").hidden = true;
    $("aiError").hidden = true;
    $("aiGo").disabled = true;
    try {
      const raw = await API.all("listings").catch(() => []);
      const res = await API.mockAI("match", { listings: raw, opts: { style, budget: $("aiBudget").value ? budget : null, priority: $("aiPriority").value } });
      lastAI = res.data;
      if (lastAI.length < 3) { $("aiFail").hidden = false; }
      else {
        $("aiResult").innerHTML = "<div class='grid-2'>" + lastAI.slice(0, 3).map((p) =>
          "<div class='rec-box'>" +
          "<div class='u-fw600 u-mb4'>" + p.title + "</div>" +
          "<div class='muted u-fs12'>Vì sao: " + p._reasons.join(" · ") + "</div>" +
          "<div class='rec-title'>" + p._pct + "% hợp gu</div></div>"
        ).join("") + "</div>";
        $("aiRegen").disabled = false;
      }
    } catch (err) {
      $("aiError").hidden = false;
    } finally {
      $("aiLoading").hidden = true;
      $("aiGo").disabled = false;
    }
  });
  $("aiRegen").addEventListener("click", () => { lastAI = [...lastAI].reverse(); $("aiGo").click(); });
  $("aiRetry").addEventListener("click", () => { $("aiBudget").value = ""; $("aiGo").click(); });
  $("aiExpand").addEventListener("click", () => { $("aiStyle").value = ""; $("aiBudget").value = ""; $("aiGo").click(); });
  $("aiErrRetry").addEventListener("click", () => $("aiGo").click());
  $("q").addEventListener("input", applyFilter);
  $("maxPrice").addEventListener("input", applyFilter);
  $("btnRetry").addEventListener("click", init);
  init();
