(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
(function() {
  let e2 = document.createElement(`link`).relList;
  if (e2 && e2.supports && e2.supports(`modulepreload`)) return;
  for (let e3 of document.querySelectorAll(`link[rel="modulepreload"]`)) n2(e3);
  new MutationObserver((e3) => {
    for (let t3 of e3) if (t3.type === `childList`) for (let e4 of t3.addedNodes) e4.tagName === `LINK` && e4.rel === `modulepreload` && n2(e4);
  }).observe(document, { childList: true, subtree: true });
  function t2(e3) {
    let t3 = {};
    return e3.integrity && (t3.integrity = e3.integrity), e3.referrerPolicy && (t3.referrerPolicy = e3.referrerPolicy), e3.crossOrigin === `use-credentials` ? t3.credentials = `include` : e3.crossOrigin === `anonymous` ? t3.credentials = `omit` : t3.credentials = `same-origin`, t3;
  }
  function n2(e3) {
    if (e3.ep) return;
    e3.ep = true;
    let n3 = t2(e3);
    fetch(e3.href, n3);
  }
})();
var e = [`#ef4444`, `#3b82f6`, `#f59e0b`, `#22c55e`], t = [`红队`, `蓝队`, `黄队`, `绿队`];
function n(n2) {
  return { id: n2, name: t[n2], color: e[n2], pos: 0, score: 0, finished: false };
}
function r() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
function i(e2) {
  return e2.trim().split(`
`).filter((e3) => !e3.startsWith(`格子`) && !e3.startsWith(`#`) && e3.trim()).map((e3) => {
    var _a;
    let t2 = e3.split(/[,\t]/);
    if (t2.length < 3) return null;
    let n2 = parseInt(t2[0].trim());
    return isNaN(n2) || n2 < 1 ? null : { id: r(), cellNumber: n2, question: t2[1].trim(), answer: parseFloat(t2[2].trim()), hint: ((_a = t2[3]) == null ? void 0 : _a.trim()) || void 0, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
  }).filter(Boolean);
}
function a(e2) {
  return `格子,题目,答案,提示
` + e2.sort((e3, t2) => e3.cellNumber - t2.cellNumber).map((e3) => `${e3.cellNumber},${e3.question},${Number.isNaN(e3.answer) ? `` : e3.answer},${e3.hint || ``}`).join(`
`);
}
function o(e2, t2) {
  let n2 = [];
  return e2.some((e3) => e3.cellNumber < 1 || e3.cellNumber > t2) && n2.push(`格子编号必须在 1-${t2} 之间`), e2.some((e3) => isNaN(e3.answer)) && n2.push(`答案必须为数字`), e2.some((e3) => !e3.question.trim()) && n2.push(`题目不能为空`), { valid: n2.length === 0, errors: n2 };
}
function s(e2) {
  let t2 = [`# 格式：格子编号(1-` + e2 + `),题目,答案,提示`, `格子,题目,答案,提示`];
  for (let n2 = 1; n2 <= e2; n2++) t2.push(`${n2},,,`);
  return t2.join(`
`);
}
var c = `math_flight_chess_cells`, l = class {
  getCellQuestion(e2) {
    return this.loadStore().questions.find((t2) => t2.cellNumber === e2) ?? null;
  }
  saveQuestions(e2) {
    let t2 = { totalCells: 55, questions: e2 };
    localStorage.setItem(c, JSON.stringify(t2));
  }
  loadStore() {
    let e2 = localStorage.getItem(c);
    if (!e2) return { totalCells: 55, questions: [] };
    try {
      let t2 = JSON.parse(e2);
      if (Array.isArray(t2.questions)) return t2;
      let n2 = Object.entries(t2).filter(([, e3]) => e3 && e3.trim()).map(([e3, t3]) => ({ id: r(), cellNumber: parseInt(e3), question: t3, answer: NaN, hint: void 0, createdAt: (/* @__PURE__ */ new Date()).toISOString() })), i2 = { totalCells: 55, questions: n2 };
      return this.saveQuestions(n2), i2;
    } catch {
      return { totalCells: 55, questions: [] };
    }
  }
};
export {
  a,
  i,
  l,
  n,
  o,
  r,
  s
};
