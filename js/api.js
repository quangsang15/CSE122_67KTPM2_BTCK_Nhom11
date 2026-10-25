(() => {
  const NS = "craftlink_";

  const BASE = location.pathname.includes("/pages/") ? "../" : "";

  async function loadJSON(name) {
    const res = await fetch(BASE + "assets/data/" + name + ".json");
    if (!res.ok) throw new Error("mock fail: " + name);
    return res.json();
  }
  function localAll(entity) {
    try {
      return JSON.parse(localStorage.getItem(NS + entity + "_v1")) || null;
    } catch (e) {
      return null;
    }
  }

  async function all(entity) {
    const local = localAll(entity);
    if (local) return local;
    const seed = await loadJSON(entity);
    localStorage.setItem(NS + entity + "_v1", JSON.stringify(seed));
    return seed;
  }

  async function saveAll(entity, rows) {
    localStorage.setItem(NS + entity + "_v1", JSON.stringify(rows));
  }


  function mockAI(kind, payload) {
    const delay = 800 + Math.floor(Math.random() * 700);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.1) {
          reject(new Error("AI mock fail (" + kind + "): 10% random fail de test state error."));
          return;
        }
        try {
          let data = null;
          if (kind === "brief") data = window.AIBrief.build(payload);
          else if (kind === "match") data = window.AIMatch.match(payload.listings, payload.opts);
          else if (kind === "revision") data = window.AIRevision.summarize(payload.notes);
          else throw new Error("mockAI: kind la '" + kind + "'");
          resolve({ ok: true, kind, data });
        } catch (err) {
          reject(err);
        }
      }, delay);
    });
  }

  window.API = { all, saveAll, mockAI };
})();
