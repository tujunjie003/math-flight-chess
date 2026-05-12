import{n as e,t}from"./StorageService-ClyGpF2g.js";var n=null,r=null;function i(e,t){n=e,r=t}function a(e,t){let i=e(`tbody`);if(i){if(t.questions.length===0){i.innerHTML=`<tr><td colspan="5" class="empty">暂无题目，点击右上角「添加题目」或「粘贴导入」</td></tr>`;return}i.innerHTML=t.questions.sort((e,t)=>e.cellNumber-t.cellNumber).map(e=>`
      <tr data-id="${e.id}">
        <td class="cell-num">${e.cellNumber}</td>
        <td class="cell-q">${e.question}</td>
        <td class="cell-a">${Number.isInteger(e.answer)?e.answer:e.answer.toFixed(2)}</td>
        <td class="cell-hint">${e.hint||`—`}</td>
        <td>
          <button class="btn-icon edit-btn" data-id="${e.id}" title="编辑">✏️</button>
          <button class="btn-icon del-btn" data-id="${e.id}" title="删除">🗑️</button>
        </td>
      </tr>`).join(``),i.querySelectorAll(`.edit-btn`).forEach(e=>{e.addEventListener(`click`,()=>n?.(e.dataset.id))}),i.querySelectorAll(`.del-btn`).forEach(e=>{e.addEventListener(`click`,()=>r?.(e.dataset.id))})}}function o(e,t){let n=e(`.stats`);if(!n)return;let r=Math.round(t.questions.length/t.totalCells*100);n.innerHTML=`
    <span>已填题目：<strong>${t.questions.length}</strong> / ${t.totalCells}</span>
    <div class="progress-bar"><div class="progress-fill" style="width:${r}%"></div></div>
    <span>${r}%</span>
  `}function s(e,t){o(e,t),a(e,t)}function c(e,t){if(!e)return;let n=e(`#modalTitle`),r=e(`#cellNumInput`),i=e(`#questionInput`),a=e(`#answerInput`),o=e(`#hintInput`),s=e(`#modalOverlay`);n&&(n.textContent=`添加题目`),r&&(r.value=``,r.max=String(t)),i&&(i.value=``),a&&(a.value=``),o&&(o.value=``),s?.classList.add(`show`),r?.focus()}function l(e,t,n){if(!e)return;let r=e(`#modalTitle`),i=e(`#cellNumInput`),a=e(`#questionInput`),o=e(`#answerInput`),s=e(`#hintInput`),c=e(`#modalOverlay`);r&&(r.textContent=`编辑题目`),i&&(i.value=String(t.cellNumber),i.max=String(n)),a&&(a.value=t.question),o&&(o.value=String(t.answer)),s&&(s.value=t.hint||``),c?.classList.add(`show`)}function u(e){e(`#modalOverlay`)?.classList.remove(`show`)}function d(e){return e?{cellNumber:parseInt(e(`#cellNumInput`)?.value||``),question:e(`#questionInput`)?.value.trim()||``,answer:parseFloat(e(`#answerInput`)?.value||``),hint:e(`#hintInput`)?.value.trim()||void 0}:null}function f(e,t){return!e.cellNumber||e.cellNumber<1||e.cellNumber>t?{ok:!1,msg:`格子编号需在 1-${t}`}:e.question?isNaN(e.answer)?{ok:!1,msg:`答案必须是数字`}:{ok:!0}:{ok:!1,msg:`题目不能为空`}}function p(e){return e.trim().split(`
`).filter(e=>!e.includes(`格子`)&&!e.startsWith(`#`)&&e.trim()).map(e=>{let t=e.split(/[,\t]/);if(t.length<3)return null;let n=parseInt(t[0].trim());return isNaN(n)||n<1?null:{id:Date.now().toString(36)+Math.random().toString(36).slice(2,7),cellNumber:n,question:t[1].trim(),answer:parseFloat(t[2].trim()),hint:t[3]?.trim()||void 0,createdAt:new Date().toISOString()}}).filter(Boolean)}function m(e,t){let n=[];return e.some(e=>e.cellNumber<1||e.cellNumber>t)&&n.push(`格子编号必须在 1-${t} 之间`),e.some(e=>isNaN(e.answer))&&n.push(`答案必须为数字`),e.some(e=>!e.question.trim())&&n.push(`题目不能为空`),{valid:n.length===0,errors:n}}function h(e){e(`#importModal`)?.classList.add(`show`);let t=e(`#importTextarea`),n=e(`#importPreview`);t&&(t.value=``),n&&(n.innerHTML=``)}function g(e){e(`#importModal`)?.classList.remove(`show`)}function _(e,t){let n=e(`#importTextarea`)?.value||``;if(n.trim())try{let r=p(n),{errors:i}=m(r,t),a=e(`#importPreview`);if(!a)return;i.length>0?a.innerHTML=`<span class="error">⚠️ ${i[0]}</span>`:a.innerHTML=`<span class="success">✅ 解析成功，将导入 ${r.length} 道题目（覆盖同名格子）</span>`}catch{e(`#importPreview`).innerHTML=`<span class="error">⚠️ 格式解析失败</span>`}}function v(e,t,n){let r=p(e(`#importTextarea`)?.value||``),{valid:i,errors:a}=m(r,n);return i?{added:[...t.filter(e=>!r.find(t=>t.cellNumber===e.cellNumber)),...r],errors:[]}:{added:[],errors:a}}function y(e=52){let t=[`# 格式：格子编号(1-`+e+`),题目,答案,提示`,`格子,题目,答案,提示`];for(let n=1;n<=e;n++)t.push(`${n},,,`);return t.join(`
`)}function b(e){return`格子,题目,答案,提示
`+e.sort((e,t)=>e.cellNumber-t.cellNumber).map(e=>`${e.cellNumber},${e.question},${Number.isNaN(e.answer)?``:e.answer},${e.hint||``}`).join(`
`)}function x(e,t){let n=y(t);w(`格子题模板_${t}格.csv`,n,`text/csv`),T(e,`模板下载中…`,`success`)}function S(e,t){if(t.length===0){T(e,`暂无题目可导出`,`error`);return}let n=b(t);w(`格子题_${t.length}题.csv`,n,`text/csv`),T(e,`导出中…`,`success`)}function C(e,t,n){return n<5||n>52?(T(e,`格子数需在 5-52 之间`,`error`),{ok:!1}):(t.totalCells=n,T(e,`格子数已保存`,`success`),{ok:!0})}function w(e,t,n){let r=new Blob([t],{type:n}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=e,a.click(),URL.revokeObjectURL(i)}function T(e,t,n=`success`){let r=e(`#toast`);r&&(r.textContent=t,r.className=`toast show ${n}`,setTimeout(()=>r.classList.remove(`show`),2500))}var E=new t,D={totalCells:20,questions:[]},O=null;function k(e){return document.getElementById(e)}function A(){let e=document.getElementById(`app`);e.innerHTML=`
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
  `,M(),s(k,D)}function j(){E.saveQuestions(D.questions)}function M(){i(e=>{let t=D.questions.find(t=>t.id===e);t&&(O=e,l(k,t,D.totalCells))},e=>{D.questions=D.questions.filter(t=>t.id!==e),j(),T(k,`已删除`,`success`),A()}),k(`#saveTotalBtn`).addEventListener(`click`,()=>{let e=parseInt(k(`#totalCellsInput`).value),{ok:t}=C(k,D,e);t&&A()}),k(`#downloadTemplateBtn`).addEventListener(`click`,()=>x(k,D.totalCells)),k(`#exportBtn`).addEventListener(`click`,()=>S(k,D.questions)),k(`#importBtn`).addEventListener(`click`,()=>h(k)),k(`#addBtn`).addEventListener(`click`,()=>{O=null,c(k,D.totalCells)}),k(`#importTextarea`).addEventListener(`input`,()=>_(k,D.totalCells)),k(`#importConfirmBtn`).addEventListener(`click`,()=>{let{added:e,errors:t}=v(k,D.questions,D.totalCells);if(t.length>0){T(k,t[0],`error`);return}D.questions=e,j(),g(k),T(k,`已导入 ${e.length} 道题目`,`success`),A()}),k(`#importCancelBtn`).addEventListener(`click`,()=>g(k)),k(`#cancelBtn`).addEventListener(`click`,()=>u(k)),k(`#modalOverlay`).addEventListener(`click`,e=>{e.target===k(`#modalOverlay`)&&u(k)}),k(`#saveBtn`).addEventListener(`click`,()=>{let t=d(k);if(!t)return;let n=f(t,D.totalCells);if(!n.ok){T(k,n.msg,`error`);return}if(O){let e=D.questions.findIndex(e=>e.id===O);e>=0&&(D.questions[e]={...D.questions[e],...t,hint:t.hint})}else{let n=D.questions.findIndex(e=>e.cellNumber===t.cellNumber);n>=0?D.questions[n]={...D.questions[n],...t,hint:t.hint}:D.questions.push({id:e(),...t,createdAt:new Date().toISOString()})}j(),u(k),T(k,O?`已更新`:`已添加`,`success`),O=null,A()})}D=E.loadStore(),document.addEventListener(`DOMContentLoaded`,()=>A());