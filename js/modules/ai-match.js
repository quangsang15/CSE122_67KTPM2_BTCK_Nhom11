// AI-2 Style Matcher (mock Frontend, de hieu cho nguoi moi).
// Luong: nhap -> validate -> dang xu ly -> ket qua + vi sao -> chap nhan / tao lai / bo qua.
// Uu tien: gia | rating | deadline(gia + trang thai san sang).
(() => {
  // Cham diem toi da 6: trung style +2, gia trong budget +1, rating cao +1, san sang +1, uu tien +1.
  // Co tin hieu (signal) = trung style hoac vua budget; khong signal -> loai de fail that ("AI chua chac chan").
  const scoreListing = (listing, style, budget, priority) => {
    let score = 0;
    let signal = false;
    const reasons = [];
    const hay = (listing.title + " " + listing.category).toLowerCase();

    if (style && hay.includes(style.toLowerCase())) {
      score += 2;
      signal = true;
      reasons.push("Đúng kiểu '" + style + "' mà bạn thích");
    }
    if (budget && listing.price <= budget) {
      score += 1;
      signal = true;
      reasons.push("Giá " + Number(listing.price).toLocaleString("vi-VN") + "đ vừa túi tiền " + Number(budget).toLocaleString("vi-VN") + "đ");
    } else if (budget) {
      reasons.push("Giá vượt túi tiền — thử nới ngân sách");
    }
    if ((listing.rating || 0) >= 4.5) {
      score += 1;
      reasons.push("Được chấm " + listing.rating + "/5");
    }
    if (listing.status === "active") {
      score += 1;
      reasons.push("Đang bán, nhận làm ngay được");
    }
    // Uu tien cua nguoi dung cong them 1 diem nhan manh.
    if (priority === "price" && budget && listing.price <= budget) score += 1;
    if (priority === "rating" && (listing.rating || 0) >= 4.5) score += 1;
    if (priority === "deadline" && listing.status === "active") score += 1;
    const pct = Math.min(99, Math.round((score / 6) * 100));
    return { score, pct, signal, reasons };
  };

  const match = (listings, opts) => {
    const o = opts || {};
    const openSearch = !o.style && !o.budget;
    return listings
      .map((listing) => {
        const r = scoreListing(listing, o.style, o.budget, o.priority);
        return { ...listing, _score: r.score, _pct: r.pct, _reasons: r.reasons, _signal: r.signal };
      })
      .filter((item) => item._score > 0 && (openSearch || item._signal))
      .sort((a, b) => b._score - a._score || (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);
  };

  window.AIMatch = { match };
})();
