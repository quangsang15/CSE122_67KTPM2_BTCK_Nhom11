(() => {
  const pickGroup = (note) => {
    const t = note.toLowerCase();
    if (t.includes("màu") || t.includes("mau") || t.includes("sơn")) return "Màu sắc";
    if (t.includes("kích") || t.includes("cm") || t.includes("góc") || t.includes("size")) return "Kích thước";
    if (t.includes("gỗ") || t.includes("vải") || t.includes("gốm") || t.includes("chất")) return "Chất liệu";
    if (t.includes("giao") || t.includes("deadline") || t.includes("ngày")) return "Tiến độ giao";
    if (t.includes("giá") || t.includes("gia") || t.includes("ship")) return "Giá / vận chuyển";
    return "Khác";
  };

  const summarize = (notes) => {
    const list = (notes || []).map((n) => String(n)).filter((s) => s.trim());
    const groups = {};
    list.forEach((n) => {
      const g = pickGroup(n);
      if (!groups[g]) groups[g] = [];
      groups[g].push(n);
    });
    const tasks = Object.entries(groups).map(([g, arr]) => ({
      group: g,
      text: g + ": " + arr.length + " ghi chú — " + arr[0].slice(0, 60),
    })).slice(0, 5);
    const bullets = tasks.map((t) => t.text);
    const whyBullets = Object.entries(groups).map(([g, arr]) => "'" + g + "': " + arr.length + " góp ý cùng chủ đề.");
    return {
      bullets,
      tasks,
      priority: bullets.length > 0 ? bullets[0] : null,
      why: "Các góp ý được xếp vào nhóm chung chủ đề.",
      whyBullets,
    };
  };

  window.AIRevision = { summarize };
})();
