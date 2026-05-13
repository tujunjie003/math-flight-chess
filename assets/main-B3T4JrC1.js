var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { l as l$1, n as n$1 } from "./StorageService-8ITX0ZhK-CRsL0YYk.js";
function n(t, n2 = 4) {
  return { phase: `setup`, currentTeam: 0, teams: Array.from({ length: n2 }, (t2, n3) => n$1(n3)), config: t, question: ``, answer: 0, diceValue: 0, diceRange: 6, lastResult: null, cellQuestion: null, winner: null };
}
var r = [{ grade: 1, semester: `上`, ops: [`+`], range: [1, 10], examples: [`3+4=?`, `7+2=?`, `5+5=?`] }, { grade: 1, semester: `下`, ops: [`+`, `-`], range: [1, 20], examples: [`9+7=?`, `15-8=?`, `12-4=?`] }, { grade: 2, semester: `上`, ops: [`+`, `-`, `×`], range: [1, 100], examples: [`45+37=?`, `82-35=?`, `3×4=?`] }, { grade: 2, semester: `下`, ops: [`×`, `÷`], range: [1, 9], examples: [`56÷7=?`, `8×6=?`, `36÷9=?`] }, { grade: 3, semester: `上`, ops: [`+`, `-`, `×`, `÷`], range: [1, 9999], examples: [`3000+1500=?`, `4500-2800=?`, `234×3=?`] }, { grade: 3, semester: `下`, ops: [`+`, `-`, `×`, `÷`], range: [1, 999], examples: [`125+87=?`, `432-198=?`, `864÷8=?`] }];
function i(e, t) {
  return r.find((n2) => n2.grade === e && n2.semester === t) ?? r[0];
}
function a(e, t) {
  return Math.floor(Math.random() * (t - e + 1)) + e;
}
function o(e) {
  return new Promise((t) => setTimeout(t, e));
}
function s(e) {
  let { ops: t, range: n2 } = e, [r2, i2] = n2;
  switch (t[a(0, t.length - 1)]) {
    case `+`: {
      let e2 = a(r2, i2), t2 = a(r2, i2);
      return { q: `${e2}+${t2}=?`, a: e2 + t2 };
    }
    case `-`: {
      let e2 = a(r2, i2), t2 = a(r2, Math.min(e2, i2));
      return { q: `${e2}-${t2}=?`, a: e2 - t2 };
    }
    case `×`: {
      let e2 = a(2, 9), t2 = a(2, 9);
      return { q: `${e2}×${t2}=?`, a: e2 * t2 };
    }
    case `÷`: {
      let e2 = a(2, 9), t2 = a(1, 9);
      return { q: `${e2 * t2}÷${e2}=?`, a: t2 };
    }
    default:
      return { q: `1+1=?`, a: 2 };
  }
}
var c = class {
  constructor(e, t, n2) {
    __publicField(this, "state");
    __publicField(this, "cb");
    __publicField(this, "storage");
    this.state = e, this.cb = n2, this.storage = t;
  }
  startDicePhase() {
    let { q: e, a: t } = s(i(this.state.config.grade, this.state.config.semester));
    this.state.question = e, this.state.answer = t, this.state.phase = `dice`, this.cb.onPhaseChange(`dice`), this.cb.onStartCountdown(20, () => {
    });
  }
  onCorrect() {
    this.state.phase === `dice` && (this.state.diceRange = 6, this.cb.onStopCountdown(), this.cb.onRollDice(6, (e) => this.doMove(e, true)));
  }
  onWrong() {
    this.state.phase === `dice` && (this.state.diceRange = 3, this.cb.onStopCountdown(), this.cb.onRollDice(3, (e) => this.doMove(e, false)));
  }
  onNextTeam() {
    this.advanceToNextTeam();
  }
  doMove(e, t) {
    let n2 = this.state.teams[this.state.currentTeam], r2 = Math.min(n2.pos + e, 55);
    if (n2.pos = r2, this.cb.onDiceShow(e), this.cb.onBoardUpdate(), this.cb.onTeamPanelsUpdate(), r2 >= 55) {
      n2.finished = true, n2.score += 10, this.state.phase = `gameover`, this.cb.onPhaseChange(`gameover`), this.endGame();
      return;
    }
    let i2 = this.storage.getCellQuestion(r2);
    i2 && !Number.isNaN(i2.answer) ? (this.state.phase = `cell`, this.state.cellQuestion = i2.question, this.state.answer = i2.answer, this.cb.onPhaseChange(`cell`)) : this.advanceTeam(t ? `✓ 正确！` : `✗ 回答错误`, t, e);
  }
  advanceTeam(e, t, n2) {
    this.state.phase = `result`, this.cb.onPhaseChange(`result`);
    let r2 = this.state.teams[this.state.currentTeam], i2 = t ? `var(--success)` : `var(--danger)`;
    this.cb.onResultShow(e, i2, `${r2.name} 第 ${r2.pos} 格（${n2}步），积分 ${r2.score}`);
  }
  advanceToNextTeam() {
    let e = this.state.teams.length, t = (this.state.currentTeam + 1) % e, n2 = 0;
    for (; this.state.teams[t].finished && n2 < e; ) t = (t + 1) % e, n2++;
    if (this.state.teams.every((e2) => e2.finished)) {
      this.endGame();
      return;
    }
    this.state.currentTeam = t, this.state.lastResult = null, this.cb.onTeamPanelsUpdate();
    let r2 = this.state.teams[this.state.currentTeam];
    this.cb.onHeaderUpdate(r2.name, this.state.config.grade, this.state.config.semester), this.startDicePhase();
  }
  endGame() {
    this.state.phase = `gameover`;
    let e = [...this.state.teams].sort((e2, t) => t.score - e2.score);
    this.cb.onGameEnd(e[0], e);
  }
}, l = (e) => document.getElementById(e), u = (e) => document.querySelectorAll(e), d = 8, f = 7;
function p() {
  let e = [];
  for (let t = 0; t < f; t++) if (t % 2 == 0) for (let n2 = 0; n2 < d; n2++) e.push(t * d + n2);
  else for (let n2 = d - 1; n2 >= 0; n2--) e.push(t * d + n2);
  return e;
}
var m = p();
function h(e) {
  return e === 0 ? `起` : e === 55 ? `终` : String(e);
}
var g = class {
  constructor() {
    __publicField(this, "boardEl", l(`board`));
  }
  render(e) {
    this.boardEl.innerHTML = ``, m.forEach((t) => {
      let n2 = document.createElement(`div`);
      n2.className = `cell`, n2.id = `cell-${t}`, t === 0 && n2.classList.add(`cell-start`), n2.textContent = h(t), e.teams.forEach((e2) => {
        if (e2.pos === t && !e2.finished) {
          let t2 = document.createElement(`div`);
          t2.className = `token token-${e2.id}`, t2.style.background = e2.color, t2.title = e2.name, n2.appendChild(t2);
        }
      }), e.teams[e.currentTeam].pos === t && e.phase !== `gameover` && n2.classList.add(`active-turn`), this.boardEl.appendChild(n2);
    });
  }
  scrollTo(e) {
    var _a;
    (_a = document.getElementById(`cell-${Math.min(e, 55)}`)) == null ? void 0 : _a.scrollIntoView({ behavior: `smooth`, block: `center`, inline: `center` });
  }
}, _ = class {
  constructor() {
    __publicField(this, "panels", u(`.team-panel`));
  }
  render(e) {
    let t = document.querySelector(`.team-panels`);
    t.dataset.count = String(e.teams.length), this.panels.forEach((t2) => {
      let n2 = parseInt(t2.dataset.teamId ?? `0`);
      if (n2 >= e.teams.length) {
        t2.style.display = `none`;
        return;
      }
      t2.style.display = ``;
      let r2 = e.teams[n2], i2 = t2.querySelector(`.team-name`), a2 = t2.querySelector(`.team-pos`), o2 = t2.querySelector(`.team-score`);
      i2.textContent = r2.name, i2.style.color = r2.color, a2.textContent = r2.pos >= 55 ? `✓ 到达终点` : `第 ${r2.pos} 格`, o2.textContent = `积分 ${r2.score}`, t2.classList.toggle(`active`, n2 === e.currentTeam && e.phase !== `gameover`), t2.classList.toggle(`finished`, r2.finished);
    });
  }
}, v = class {
  constructor(e, t) {
    __publicField(this, "sideEl");
    __publicField(this, "btnEl");
    __publicField(this, "animating", false);
    this.sideEl = document.getElementById(e), this.btnEl = document.getElementById(t);
  }
  async animateSide(e, t) {
    if (this.animating) return;
    this.animating = true, this.sideEl.classList.add(`dice-rolling`);
    for (let t2 = 0; t2 < 15; t2++) this.sideEl.textContent = String(Math.floor(Math.random() * e) + 1), await o(80);
    let n2 = Math.floor(Math.random() * e) + 1;
    this.sideEl.classList.remove(`dice-rolling`), this.sideEl.textContent = String(n2), await o(400), this.animating = false, t(n2);
  }
  showValue(e) {
    this.sideEl.textContent = String(e);
  }
  setEnabled(e) {
    this.btnEl.disabled = !e;
  }
}, y = { setup: ``, dice: `🎲 口算题`, roll: `🎲 骰子`, cell: `📋 答题判断`, result: `📝 答题结果`, gameover: `🏆 游戏结束` }, b = class {
  constructor() {
    __publicField(this, "phaseEl", l(`header-phase`));
    __publicField(this, "diceBtn", l(`dice-btn`));
    __publicField(this, "questionBox", l(`question-box`));
    __publicField(this, "correctBtn", l(`correct-btn`));
    __publicField(this, "wrongBtn", l(`wrong-btn`));
    __publicField(this, "nextTeamBtn", l(`next-team-btn`));
    __publicField(this, "countdownNum", l(`countdown-num`));
    __publicField(this, "countdownFill", l(`countdown-fill`));
    __publicField(this, "countdownDisplay", l(`countdown-display`));
    __publicField(this, "countdownTimer", null);
    __publicField(this, "onCountdownExpire", null);
  }
  show(e) {
    let t = e;
    switch (this.phaseEl.textContent = y[t] ?? String(e), this.diceBtn.style.display = `none`, this.questionBox.style.display = `none`, this.correctBtn.style.display = `none`, this.wrongBtn.style.display = `none`, this.nextTeamBtn.style.display = `none`, this.countdownDisplay.style.display = `none`, t) {
      case `dice`:
        this.questionBox.style.display = `block`, this.diceBtn.style.display = `none`, this.correctBtn.style.display = `inline-block`, this.wrongBtn.style.display = `inline-block`;
        break;
      case `cell`:
        this.questionBox.style.display = `block`, this.correctBtn.style.display = `inline-block`, this.wrongBtn.style.display = `inline-block`;
        break;
      case `result`:
        this.nextTeamBtn.style.display = `inline-block`;
        break;
    }
  }
  startCountdown(e, t) {
    this.stopCountdown(), this.onCountdownExpire = t, this.countdownDisplay.style.display = `block`;
    let n2 = e;
    this.countdownNum.textContent = String(n2), this.countdownFill.style.width = `100%`, this.countdownTimer = setInterval(() => {
      n2--, this.countdownNum.textContent = String(Math.max(0, n2)), this.countdownFill.style.width = `${n2 / e * 100}%`, n2 <= 0 && (this.stopCountdown(), t());
    }, 1e3);
  }
  stopCountdown() {
    this.countdownTimer && (this.countdownTimer = (clearInterval(this.countdownTimer), null)), this.countdownDisplay.style.display = `none`;
  }
  showQuestion(e, t = false) {
    l(`question-text`).textContent = e, l(`question-text`).style.fontSize = t ? `1.8em` : `2.2em`, l(`q-label`).textContent = t ? `📋 格子题（老师讲解）` : `🎲 口算题`, this.animateQuestionText(e);
  }
  animateQuestionText(e) {
    let t = l(`question-text`);
    t.style.opacity = `0`;
    let n2 = 0, r2 = setInterval(() => {
      t.textContent = this.randomMathExpr(e), n2++, n2 > 10 && (clearInterval(r2), t.textContent = e, t.style.opacity = `1`);
    }, 100);
  }
  randomMathExpr(e) {
    return e.replace(/\d+/g, () => String(Math.floor(Math.random() * 10)));
  }
  showResult(e, t, n2) {
    this.stopCountdown();
    let r2 = l(`question-text`);
    r2.textContent = e, r2.style.color = t, r2.style.fontSize = `1.5em`, l(`q-label`).textContent = `📝 答题结果`, l(`result-detail`).textContent = n2, this.correctBtn.style.display = `none`, this.wrongBtn.style.display = `none`, this.nextTeamBtn.style.display = `inline-block`;
  }
  showScreen(e) {
    this.stopCountdown(), l(`setup-screen`).style.display = e === `setup` ? `flex` : `none`, l(`game-screen`).style.display = e === `game` ? `block` : `none`, l(`result-screen`).style.display = e === `result` ? `flex` : `none`;
  }
}, x = new g(), S = new _(), C = new v(`dice-display-side`, `dice-btn`), w = new b(), T = new l$1(), E, D, O = { onPhaseChange(e) {
  w.show(e), e === `dice` ? w.showQuestion(E.question, false) : e === `cell` && w.showQuestion(E.question, true);
}, onBoardUpdate() {
  x.render(E), x.scrollTo(E.teams[E.currentTeam].pos);
}, onTeamPanelsUpdate() {
  S.render(E);
}, onHeaderUpdate(e, t, n2) {
  l(`header-turn`).textContent = `当前：${e}`, l(`header-grade`).textContent = `${t}年级${n2}学期`;
}, onResultShow(e, t, n2) {
  w.showResult(e, t, n2);
}, onDiceShow(e) {
  C.showValue(e);
}, onGameEnd(e, t) {
  l(`winner-name`).textContent = e.name + ` 获胜！`, l(`winner-name`).style.color = e.color, l(`winner-msg`).textContent = `积分 ${e.score} 分，率先到达终点！`, l(`scoreboard`).innerHTML = t.map((e2, t2) => `<div class="score-row" style="border-left:4px solid ${e2.color}">${t2 + 1}. ${e2.name} — ${e2.score} 分</div>`).join(``), w.showScreen(`result`);
}, onStartCountdown(e, t) {
  w.startCountdown(e, t);
}, onStopCountdown() {
  w.stopCountdown();
}, onRollDice(e, t) {
  C.animateSide(e, t);
} };
function k() {
  if (D) return;
  let e = parseInt(l(`grade-select`).value), t = document.querySelector(`input[name="semester"]:checked`).value, r2 = parseInt(l(`team-count-select`).value);
  E = n({ grade: e, semester: t }, r2), D = new c(E, T, O), l(`header-turn`).textContent = `当前：${E.teams[0].name}`, l(`header-grade`).textContent = `${e}年级${t}学期`, x.render(E), S.render(E), w.showScreen(`game`), D.startDicePhase();
}
function A() {
}
function j() {
  if (T.loadStore().questions.length === 0) {
    let e = l(`no-questions-hint`);
    e && (e.style.display = `block`);
  }
  l(`start-btn`).addEventListener(`click`, k), l(`dice-btn`).addEventListener(`click`, A), l(`correct-btn`).addEventListener(`click`, () => D == null ? void 0 : D.onCorrect()), l(`wrong-btn`).addEventListener(`click`, () => D == null ? void 0 : D.onWrong()), l(`next-team-btn`).addEventListener(`click`, () => D == null ? void 0 : D.onNextTeam()), l(`restart-btn`).addEventListener(`click`, () => {
    D = void 0, w.showScreen(`setup`);
  }), w.showScreen(`setup`);
}
document.readyState === "loading" ? document.addEventListener(`DOMContentLoaded`, () => {
  j();
}) : j();
