import { l as l$1, r, a, i, o as o$1, s as s$1 } from "./StorageService-8ITX0ZhK-CRsL0YYk.js";
var o = null, s = null;
function c(e, t) {
  o = e, s = t;
}
function l(e, t) {
  let n = e(`tbody`);
  if (n) {
    if (t.questions.length === 0) {
      n.innerHTML = `<tr><td colspan="5" class="empty">暂无题目，点击右上角「添加题目」或「粘贴导入」</td></tr>`;
      return;
    }
    n.innerHTML = t.questions.sort((e2, t2) => e2.cellNumber - t2.cellNumber).map((e2) => `
      <tr data-id="${e2.id}">
        <td class="cell-num">${e2.cellNumber}</td>
        <td class="cell-q">${e2.question}</td>
        <td class="cell-a">${Number.isInteger(e2.answer) ? e2.answer : e2.answer.toFixed(2)}</td>
        <td class="cell-hint">${e2.hint || `—`}</td>
        <td>
          <button class="btn-icon edit-btn" data-id="${e2.id}" title="编辑">✏️</button>
          <button class="btn-icon del-btn" data-id="${e2.id}" title="删除">🗑️</button>
        </td>
      </tr>`).join(``), n.querySelectorAll(`.edit-btn`).forEach((e2) => {
      e2.addEventListener(`click`, () => o == null ? void 0 : o(e2.dataset.id));
    }), n.querySelectorAll(`.del-btn`).forEach((e2) => {
      e2.addEventListener(`click`, () => s == null ? void 0 : s(e2.dataset.id));
    });
  }
}
function u(e, t) {
  let n = e(`.stats`);
  if (!n) return;
  let r2 = Math.round(t.questions.length / t.totalCells * 100);
  n.innerHTML = `
    <span>已填题目：<strong>${t.questions.length}</strong> / ${t.totalCells}</span>
    <div class="progress-bar"><div class="progress-fill" style="width:${r2}%"></div></div>
    <span>${r2}%</span>
  `;
}
function d(e, t) {
  u(e, t), l(e, t);
}
function f(e, t) {
  if (!e) return;
  let n = e(`#modalTitle`), r2 = e(`#cellNumInput`), i2 = e(`#questionInput`), a2 = e(`#answerInput`), o2 = e(`#hintInput`), s2 = e(`#modalOverlay`);
  n && (n.textContent = `添加题目`), r2 && (r2.value = ``, r2.max = String(t)), i2 && (i2.value = ``), a2 && (a2.value = ``), o2 && (o2.value = ``), s2 == null ? void 0 : s2.classList.add(`show`), r2 == null ? void 0 : r2.focus();
}
function p(e, t, n) {
  if (!e) return;
  let r2 = e(`#modalTitle`), i2 = e(`#cellNumInput`), a2 = e(`#questionInput`), o2 = e(`#answerInput`), s2 = e(`#hintInput`), c2 = e(`#modalOverlay`);
  r2 && (r2.textContent = `编辑题目`), i2 && (i2.value = String(t.cellNumber), i2.max = String(n)), a2 && (a2.value = t.question), o2 && (o2.value = String(t.answer)), s2 && (s2.value = t.hint || ``), c2 == null ? void 0 : c2.classList.add(`show`);
}
function m(e) {
  var _a;
  (_a = e(`#modalOverlay`)) == null ? void 0 : _a.classList.remove(`show`);
}
function h(e) {
  var _a, _b, _c, _d;
  return e ? { cellNumber: parseInt(((_a = e(`#cellNumInput`)) == null ? void 0 : _a.value) || ``), question: ((_b = e(`#questionInput`)) == null ? void 0 : _b.value.trim()) || ``, answer: parseFloat(((_c = e(`#answerInput`)) == null ? void 0 : _c.value) || ``), hint: ((_d = e(`#hintInput`)) == null ? void 0 : _d.value.trim()) || void 0 } : null;
}
function g(e, t) {
  return !e.cellNumber || e.cellNumber < 1 || e.cellNumber > t ? { ok: false, msg: `格子编号需在 1-${t}` } : e.question ? isNaN(e.answer) ? { ok: false, msg: `答案必须是数字` } : { ok: true } : { ok: false, msg: `题目不能为空` };
}
function _(e) {
  var _a;
  (_a = e(`#importModal`)) == null ? void 0 : _a.classList.add(`show`);
  let t = e(`#importTextarea`), n = e(`#importPreview`);
  t && (t.value = ``), n && (n.innerHTML = ``);
}
function v(e) {
  var _a;
  (_a = e(`#importModal`)) == null ? void 0 : _a.classList.remove(`show`);
}
function y(e, n) {
  var _a;
  let i$1 = ((_a = e(`#importTextarea`)) == null ? void 0 : _a.value) || ``;
  if (i$1.trim()) try {
    let a2 = i(i$1), { errors: o2 } = o$1(a2, n), s2 = e(`#importPreview`);
    if (!s2) return;
    o2.length > 0 ? s2.innerHTML = `<span class="error">⚠️ ${o2[0]}</span>` : s2.innerHTML = `<span class="success">✅ 解析成功，将导入 ${a2.length} 道题目（覆盖同名格子）</span>`;
  } catch {
    e(`#importPreview`).innerHTML = `<span class="error">⚠️ 格式解析失败</span>`;
  }
}
function b(e, n, i$1) {
  var _a;
  let a2 = i(((_a = e(`#importTextarea`)) == null ? void 0 : _a.value) || ``), { valid: o2, errors: s2 } = o$1(a2, i$1);
  return o2 ? { added: [...n.filter((e2) => !a2.find((t) => t.cellNumber === e2.cellNumber)), ...a2], errors: [] } : { added: [], errors: s2 };
}
function x(e, t) {
  let n = s$1(t);
  w(`格子题模板_${t}格.csv`, n, `text/csv`), T(e, `模板下载中…`, `success`);
}
function S(t, n) {
  if (n.length === 0) {
    T(t, `暂无题目可导出`, `error`);
    return;
  }
  let r2 = a(n);
  w(`格子题_${n.length}题.csv`, r2, `text/csv`), T(t, `导出中…`, `success`);
}
function C(e, t, n) {
  return n < 5 || n > 52 ? (T(e, `格子数需在 5-52 之间`, `error`), { ok: false }) : (t.totalCells = n, T(e, `格子数已保存`, `success`), { ok: true });
}
function w(e, t, n) {
  let r2 = new Blob([t], { type: n }), i2 = URL.createObjectURL(r2), a2 = document.createElement(`a`);
  a2.href = i2, a2.download = e, document.body.appendChild(a2), a2.click(), document.body.removeChild(a2), URL.revokeObjectURL(i2);
}
function T(e, t, n = `success`) {
  let r2 = e(`#toast`);
  r2 && (r2.textContent = t, r2.className = `toast show ${n}`, setTimeout(() => r2.classList.remove(`show`), 2500));
}
var E = new l$1(), D = { totalCells: 20, questions: [] }, O = null;
function k(e) {
  return document.getElementById(e);
}
function A() {
  let e = document.getElementById(`app`);
  e.innerHTML = `
    <div class="header">
      <h1>📋 格子题管理</h1>
      <p>预设每格的答题题目，课堂游戏时学生落到该格触发答题</p>
    </div>
    <div class="toolbar">
      <div class="total-cells-group">
        <label>总格子数：</label>
        <input type="number" id="totalCellsInput" value="${D.totalCells}" min="5" max="52" aria-label="总格子数">
        <button class="btn btn-outline" id="saveTotalBtn">保存</button>
      </div>
      <div class="toolbar-right">
        <button class="btn btn-outline" id="downloadTemplateBtn">📥 下载模板</button>
        <button class="btn btn-outline" id="exportBtn">📤 导出已填题目</button>
        <button class="btn" id="importBtn">📋 粘贴导入</button>
        <button class="btn btn-accent" id="addBtn">+ 添加题目</button>
      </div>
    </div>
    <div class="stats"></div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>格子</th><th>题目</th><th>答案</th><th>提示</th><th>操作</th></tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
    <div class="modal-overlay" id="modalOverlay">
      <div class="modal" role="dialog" aria-modal="true" aria-label="添加/编辑题目">
        <h2 id="modalTitle">添加题目</h2>
        <div class="form-group"><label for="cellNumInput">格子编号</label><input type="number" id="cellNumInput" min="1" max="${D.totalCells}" aria-label="格子编号"></div>
        <div class="form-group"><label for="questionInput">题目</label><input type="text" id="questionInput" placeholder="如：7 + 8 = ?" aria-label="题目"></div>
        <div class="form-group"><label for="answerInput">答案（数字）</label><input type="number" id="answerInput" step="any" placeholder="如：15" aria-label="答案"></div>
        <div class="form-group"><label for="hintInput">提示（可选）</label><input type="text" id="hintInput" placeholder="如：凑十法" aria-label="提示"></div>
        <div class="modal-actions">
          <button class="btn btn-outline" id="cancelBtn">取消</button>
          <button class="btn" id="saveBtn">保存</button>
        </div>
      </div>
    </div>
    <div class="modal-overlay" id="importModal">
      <div class="modal" role="dialog" aria-modal="true" aria-label="粘贴导入">
        <h2>📋 粘贴导入题目</h2>
        <p>从 Excel 或 CSV 粘贴内容，格式：<code>格子,题目,答案,提示</code></p>
        <textarea id="importTextarea" placeholder="1,7 + 8 = ?,15,凑十法
2,12 - 5 = ?,7
..." aria-label="粘贴内容"></textarea>
        <div class="import-preview" id="importPreview"></div>
        <div class="modal-actions">
          <button class="btn btn-outline" id="importCancelBtn">取消</button>
          <button class="btn" id="importConfirmBtn">确认导入</button>
        </div>
      </div>
    </div>
    <div class="toast" id="toast"></div>
  `, M(), d(k, D);
}
function j() {
  E.saveQuestions(D.questions);
}
function M() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  c((e) => {
    let t = D.questions.find((t2) => t2.id === e);
    t && (O = e, p(k, t, D.totalCells));
  }, (e) => {
    D.questions = D.questions.filter((t) => t.id !== e), j(), T(k, `已删除`, `success`), A();
  }), (_a = k(`#saveTotalBtn`)) == null ? void 0 : _a.addEventListener(`click`, () => {
    var _a2;
    let e = parseInt(((_a2 = k(`#totalCellsInput`)) == null ? void 0 : _a2.value) || ``), { ok: t } = C(k, D, e);
    t && A();
  }), (_b = k(`#downloadTemplateBtn`)) == null ? void 0 : _b.addEventListener(`click`, () => x(k, D.totalCells)), (_c = k(`#exportBtn`)) == null ? void 0 : _c.addEventListener(`click`, () => S(k, D.questions)), (_d = k(`#importBtn`)) == null ? void 0 : _d.addEventListener(`click`, () => _(k)), (_e = k(`#addBtn`)) == null ? void 0 : _e.addEventListener(`click`, () => {
    O = null, f(k, D.totalCells);
  }), (_f = k(`#importTextarea`)) == null ? void 0 : _f.addEventListener(`input`, () => y(k, D.totalCells)), (_g = k(`#importConfirmBtn`)) == null ? void 0 : _g.addEventListener(`click`, () => {
    let { added: e, errors: t } = b(k, D.questions, D.totalCells);
    if (t.length > 0) {
      T(k, t[0], `error`);
      return;
    }
    D.questions = e, j(), v(k), T(k, `已导入 ${e.length} 道题目`, `success`), A();
  }), (_h = k(`#importCancelBtn`)) == null ? void 0 : _h.addEventListener(`click`, () => v(k)), (_i = k(`#cancelBtn`)) == null ? void 0 : _i.addEventListener(`click`, () => m(k)), (_j = k(`#modalOverlay`)) == null ? void 0 : _j.addEventListener(`click`, (e) => {
    e.target === k(`#modalOverlay`) && m(k);
  }), (_k = k(`#saveBtn`)) == null ? void 0 : _k.addEventListener(`click`, () => {
    let e = h(k);
    if (!e) return;
    let t = g(e, D.totalCells);
    if (!t.ok) {
      T(k, t.msg, `error`);
      return;
    }
    if (O) {
      let t2 = D.questions.findIndex((e2) => e2.id === O);
      t2 >= 0 && (D.questions[t2] = { ...D.questions[t2], ...e, hint: e.hint });
    } else {
      let t2 = D.questions.findIndex((t3) => t3.cellNumber === e.cellNumber);
      t2 >= 0 ? D.questions[t2] = { ...D.questions[t2], ...e, hint: e.hint } : D.questions.push({ id: r(), ...e, createdAt: (/* @__PURE__ */ new Date()).toISOString() });
    }
    j(), m(k), T(k, O ? `已更新` : `已添加`, `success`), O = null, A();
  });
}
D = E.loadStore(), document.readyState === "loading" ? document.addEventListener(`DOMContentLoaded`, () => A()) : A();
