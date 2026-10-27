// AI-1 Brief Builder (mock Frontend, de hieu cho nguoi moi).
// Bien mo ta tu do thanh brief chuan: tieu de, mo ta chuan hoa, tags,
// ngan sach goi y, deadline goi y + checklist + ly do (why bullets).
(() => {
  const detectStyle = (text) => {
    const t = text.toLowerCase();
    if (t.includes("gỗ") || t.includes("rustic") || t.includes("mộc")) return "Rustic";
    if (t.includes("hiện đại") || t.includes("tối giản") || t.includes("minimal")) return "Minimal";
    if (t.includes("chibi") || t.includes("minh họa") || t.includes("vẽ")) return "Illustration";
    return "Tùy biến";
  };

  const detectTags = (text) => {
    const t = text.toLowerCase();
    const tags = [];
    if (t.includes("gỗ") || t.includes("mộc")) tags.push("gỗ");
    if (t.includes("khắc") || t.includes("tên")) tags.push("khắc tên");
    if (t.includes("tối giản") || t.includes("minimal") || t.includes("hiện đại")) tags.push("tối giản");
    if (t.includes("chibi") || t.includes("minh họa") || t.includes("vẽ")) tags.push("minh họa");
    if (t.includes("cm") || t.includes("kích")) tags.push("kích thước custom");
    if (t.includes("quà") || t.includes("tặng")) tags.push("quà tặng");
    if (tags.length === 0) tags.push("tùy biến");
    return tags.slice(0, 4);
  };

  const suggestBudget = (text, budget) => {
    if (budget) return Number(budget);
    const t = text.toLowerCase();
    if (t.includes("gỗ") || t.includes("bàn") || t.includes("kệ")) return 900000;
    if (t.includes("tranh") || t.includes("chibi") || t.includes("vẽ")) return 350000;
    return 500000;
  };

  const suggestDeadline = (deadline) => {
    if (deadline) return deadline;
    const d = new Date(Date.now() + 14 * 86400000);
    return d.toISOString().slice(0, 10);
  };

  const buildChecklist = (text) => {
    const parts = text.split(/[.\n]+/).map((s) => s.trim()).filter(Boolean);
    const list = parts.slice(0, 4).map((s) => "Xác nhận: " + s);
    if (list.length === 0) list.push("Xác nhận kích thước với maker");
    list.push("Chốt ngân sách và deadline");
    return list;
  };

  const build = ({ freeText, budget, deadline }) => {
    const text = (freeText || "").trim();
    const style = detectStyle(text);
    const tags = detectTags(text);
    const title = text.slice(0, 50) || "Brief tùy biến mới";
    return {
      title,
      desc: text,
      style,
      tags,
      budgetSuggest: suggestBudget(text, budget),
      deadlineSuggest: suggestDeadline(deadline),
      checklist: buildChecklist(text),
      why: "Nhận diện từ khóa trong mô tả (" + style + ") + tách câu thành checklist.",
      whyBullets: [
        "Kiểu '" + style + "' đoán từ cách bạn mô tả.",
        "Từ khóa (" + tags.join(", ") + ") rút ra từ chất liệu + nhu cầu bạn nhắc tới.",
        "Giá gợi ý theo mặt bằng món cùng loại" + (budget ? " (giữ nguyên số bạn nhập)" : "") + ".",
        "Ngày gợi ý = hôm nay + 14 ngày" + (deadline ? " (giữ nguyên ngày bạn chọn)" : "") + ".",
        "Danh việc cần chốt tách từ từng câu bạn viết, câu nào cũng thành một đầu việc.",
      ],
    };
  };

  window.AIBrief = { build };
})();
