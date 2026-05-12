import{a as e,i as t,n,o as r,r as i,t as a}from"./StorageService-8ITX0ZhK.js";var o=null,s=null;function c(e,t){o=e,s=t}function l(e,t){let n=e(`tbody`);if(n){if(t.questions.length===0){n.innerHTML=`<tr><td colspan="5" class="empty">暂无题目，点击右上角「添加题目」或「粘贴导入」</td></tr>`;return}n.innerHTML=t.questions.sort((e,t)=>e.cellNumber-t.cellNumber).map(e=>`
      <tr data-id="${e.id}">
        <td class="cell-num">${e.cellNumber}</td>
        <td class="cell-q">${e.question}</td>
        <td class="cell-a">${Number.isInteger(e.answer)?e.answer:e.answer.toFixed(2)}</td>
        <td class="cell-hint">${e.hint||`—`}</td>
        <td>
          <button class="btn-icon edit-btn" data-id="${e.id}" title="编辑">✏️</button>
          <button class="btn-icon del-btn" data-id="${e.id}" title="删除">🗑️</button>
        </td>
      </tr>`).join(``),n.querySelectorAll(`.edit-btn`).forEach(e=>{e.addEventListener(`click`,()=>o?.(e.dataset.id))}),n.querySelectorAll(`.del-btn`).forEach(e=>{e.addEventListener(`click`,()=>s?.(e.dataset.id))})}}function u(e,t){let n=e(`.stats`);if(!n)return;let r=Math.round(t.questions.length/t.totalCells*100);n.innerHTML=`
    <span>已填题目：<strong>${t.questions.length}</strong> / ${t.totalCells}</span>
    <div class="progress-bar"><div class="progress-fill" style="width:${r}%"></div></div>
    <span>${r}%</span>
  `}function d(e,t){u(e,t),l(e,t)}function f(e,t){if(!e)return;let n=e(`#modalTitle`),r=e(`#cellNumInput`),i=e(`#questionInput`),a=e(`#answerInput`),o=e(`#hintInput`),s=e(`#modalOverlay`);n&&(n.textContent=`添加题目`),r&&(r.value=``,r.max=String(t)),i&&(i.value=``),a&&(a.value=``),o&&(o.value=``),s?.classList.add(`show`),r?.focus()}function p(e,t,n){if(!e)return;let r=e(`#modalTitle`),i=e(`#cellNumInput`),a=e(`#questionInput`),o=e(`#answerInput`),s=e(`#hintInput`),c=e(`#modalOverlay`);r&&(r.textContent=`编辑题目`),i&&(i.value=String(t.cellNumber),i.max=String(n)),a&&(a.value=t.question),o&&(o.value=String(t.answer)),s&&(s.value=t.hint||``),c?.classList.add(`show`)}function m(e){e(`#modalOverlay`)?.classList.remove(`show`)}function h(e){return e?{cellNumber:parseInt(e(`#cellNumInput`)?.value||``),question:e(`#questionInput`)?.value.trim()||``,answer:parseFloat(e(`#answerInput`)?.value||``),hint:e(`#hintInput`)?.value.trim()||void 0}:null}function g(e,t){return!e.cellNumber||e.cellNumber<1||e.cellNumber>t?{ok:!1,msg:`格子编号需在 1-${t}`}:e.question?isNaN(e.answer)?{ok:!1,msg:`答案必须是数字`}:{ok:!0}:{ok:!1,msg:`题目不能为空`}}function _(e){e(`#importModal`)?.classList.add(`show`);let t=e(`#importTextarea`),n=e(`#importPreview`);t&&(t.value=``),n&&(n.innerHTML=``)}function v(e){e(`#importModal`)?.classList.remove(`show`)}function y(e,n){let i=e(`#importTextarea`)?.value||``;if(i.trim())try{let a=t(i),{errors:o}=r(a,n),s=e(`#importPreview`);if(!s)return;o.length>0?s.innerHTML=`<span class="error">⚠️ ${o[0]}</span>`:s.innerHTML=`<span class="success">✅ 解析成功，将导入 ${a.length} 道题目（覆盖同名格子）</span>`}catch{e(`#importPreview`).innerHTML=`<span class="error">⚠️ 格式解析失败</span>`}}function b(e,n,i){let a=t(e(`#importTextarea`)?.value||``),{valid:o,errors:s}=r(a,i);return o?{added:[...n.filter(e=>!a.find(t=>t.cellNumber===e.cellNumber)),...a],errors:[]}:{added:[],errors:s}}function x(e,t){let n=i(t);w(`格子题模板_${t}格.csv`,n,`text/csv`),T(e,`模板下载中…`,`success`)}function S(t,n){if(n.length===0){T(t,`暂无题目可导出`,`error`);return}let r=e(n);w(`格子题_${n.length}题.csv`,r,`text/csv`),T(t,`导出中…`,`success`)}function C(e,t,n){return n<5||n>52?(T(e,`格子数需在 5-52 之间`,`error`),{ok:!1}):(t.totalCells=n,T(e,`格子数已保存`,`success`),{ok:!0})}function w(e,t,n){let r=new Blob([t],{type:n}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=e,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i)}function T(e,t,n=`success`){let r=e(`#toast`);r&&(r.textContent=t,r.className=`toast show ${n}`,setTimeout(()=>r.classList.remove(`show`),2500))}var E=new a,D={totalCells:20,questions:[]},O=null;function k(e){return document.getElementById(e)}function A(){let e=document.getElementById(`app`);e.innerHTML=`
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
        <textarea id="importTextarea" placeholder="1,7 + 8 = ?,15,凑十法\n2,12 - 5 = ?,7\n..." aria-label="粘贴内容"></textarea>
        <div class="import-preview" id="importPreview"></div>
        <div class="modal-actions">
          <button class="btn btn-outline" id="importCancelBtn">取消</button>
          <button class="btn" id="importConfirmBtn">确认导入</button>
        </div>
      </div>
    </div>
    <div class="toast" id="toast"></div>
  `,M(),d(k,D)}function j(){E.saveQuestions(D.questions)}function M(){c(e=>{let t=D.questions.find(t=>t.id===e);t&&(O=e,p(k,t,D.totalCells))},e=>{D.questions=D.questions.filter(t=>t.id!==e),j(),T(k,`已删除`,`success`),A()}),k(`#saveTotalBtn`)?.addEventListener(`click`,()=>{let e=parseInt(k(`#totalCellsInput`)?.value||``),{ok:t}=C(k,D,e);t&&A()}),k(`#downloadTemplateBtn`)?.addEventListener(`click`,()=>x(k,D.totalCells)),k(`#exportBtn`)?.addEventListener(`click`,()=>S(k,D.questions)),k(`#importBtn`)?.addEventListener(`click`,()=>_(k)),k(`#addBtn`)?.addEventListener(`click`,()=>{O=null,f(k,D.totalCells)}),k(`#importTextarea`)?.addEventListener(`input`,()=>y(k,D.totalCells)),k(`#importConfirmBtn`)?.addEventListener(`click`,()=>{let{added:e,errors:t}=b(k,D.questions,D.totalCells);if(t.length>0){T(k,t[0],`error`);return}D.questions=e,j(),v(k),T(k,`已导入 ${e.length} 道题目`,`success`),A()}),k(`#importCancelBtn`)?.addEventListener(`click`,()=>v(k)),k(`#cancelBtn`)?.addEventListener(`click`,()=>m(k)),k(`#modalOverlay`)?.addEventListener(`click`,e=>{e.target===k(`#modalOverlay`)&&m(k)}),k(`#saveBtn`)?.addEventListener(`click`,()=>{let e=h(k);if(!e)return;let t=g(e,D.totalCells);if(!t.ok){T(k,t.msg,`error`);return}if(O){let t=D.questions.findIndex(e=>e.id===O);t>=0&&(D.questions[t]={...D.questions[t],...e,hint:e.hint})}else{let t=D.questions.findIndex(t=>t.cellNumber===e.cellNumber);t>=0?D.questions[t]={...D.questions[t],...e,hint:e.hint}:D.questions.push({id:n(),...e,createdAt:new Date().toISOString()})}j(),m(k),T(k,O?`已更新`:`已添加`,`success`),O=null,A()})}D=E.loadStore(),document.addEventListener(`DOMContentLoaded`,()=>A());