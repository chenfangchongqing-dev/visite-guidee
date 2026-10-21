(() => {
  'use strict';
  const d = window.VG_DATA;
  if (!d) return;
  const $ = (id) => document.getElementById(id);
  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const storage = {
    get(key, fallback = '') { try { return localStorage.getItem('vg1:' + key) ?? fallback; } catch (_) { return fallback; } },
    set(key, value) { try { localStorage.setItem('vg1:' + key, value); } catch (_) {} }
  };
  let toastTimer = null;
  function toast(message) {
    const el = $('toast'); el.textContent = message; el.classList.add('visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('visible'), 2600);
  }
  async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(value); toast('已复制'); return; } catch (_) {}
    }
    const temp = document.createElement('textarea'); temp.value = value; temp.setAttribute('readonly', '');
    temp.style.position = 'fixed'; temp.style.left = '-9999px'; document.body.append(temp);
    temp.select();
    try { if (document.execCommand('copy')) toast('已复制'); else toast('复制不可用，请手动选择文本'); }
    catch (_) { toast('复制不可用，请手动选择文本'); }
    temp.remove();
  }

  // Strasbourg: source-based reading, with authored oral teaching examples.
  let activeStep = 0;
  function renderStrasbourg() {
    $('strasbourg-steps').innerHTML = d.strasbourg.map((item, i) => `
      <button type="button" class="case-step ${i === activeStep ? 'selected' : ''}" data-step="${i}" aria-pressed="${i === activeStep}">
        <span class="num">${String(i + 1).padStart(2,'0')}</span>
        <span><strong>${esc(item.title)}</strong><small lang="fr">${esc(item.fr)}</small></span>
      </button>`).join('');
    const item = d.strasbourg[activeStep];
    $('strasbourg-detail').innerHTML = `<span class="case-num">ÉTAPE ${String(activeStep + 1).padStart(2,'0')} / 05</span>
      <h3>${esc(item.title)}</h3><div class="case-meta">${esc(item.page)}</div>
      <p>${esc(item.intro)}</p>
      <div class="case-fr" lang="fr"><small>PROPOSITION ORALE · 教学改写</small>${esc(item.sample)}</div>
      <p class="case-question">课堂思考：${esc(item.question)}</p>`;
    $('strasbourg-steps').querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
      activeStep = Number(button.dataset.step); renderStrasbourg();
    }));
  }

  // Phrase bank: filter/search/copy, with no external requests.
  let activeFilter = 'all';
  function renderFilters() {
    $('expression-filters').innerHTML = d.filters.map(f => `<button type="button" class="filter-pill ${activeFilter === f.id ? 'active' : ''}" data-filter="${esc(f.id)}" aria-pressed="${activeFilter === f.id}">${esc(f.name)}</button>`).join('');
    $('expression-filters').querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
      activeFilter = button.dataset.filter; renderFilters(); renderExpressions();
    }));
  }
  function renderExpressions() {
    const q = $('expression-search').value.trim().toLocaleLowerCase();
    const shown = d.expressions.map((x,i) => ({...x,index:i})).filter(x => (activeFilter === 'all' || x.cat === activeFilter) && (!q || (x.fr + ' ' + x.zh).toLocaleLowerCase().includes(q)));
    $('expression-grid').innerHTML = shown.length ? shown.map(x => `
      <article class="expr-card"><div class="expr-meta"><span>${esc(d.filters.find(f => f.id === x.cat).name)}</span><button type="button" class="expr-copy" data-copy="${x.index}" aria-label="复制句型 ${esc(x.fr)}">复制 ↗</button></div>
      <div class="expr-fr" lang="fr">${esc(x.fr)}</div><div class="expr-zh">${esc(x.zh)}</div></article>`).join('') : '<div class="no-results">没有匹配的表达，请更换关键词。</div>';
    $('expression-grid').querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', () => copyText(d.expressions[Number(button.dataset.copy)].fr)));
  }

  // Text lab: display source exactly as recorded, then optionally show an annotation layer.
  let activeExercise = 0;
  let isAnnotated = false;
  let modelVisible = false;
  const formatTime = (seconds) => `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
  let timerRemaining = 90;
  let timerId = null;
  let timerEnd = 0;
  function updateClock() { $('timer-display').textContent = formatTime(timerRemaining); }
  function stopTimer() { if (timerId) clearInterval(timerId); timerId = null; }
  function resetTimer() { stopTimer(); timerRemaining = 90; timerEnd = 0; updateClock(); $('timer-start').textContent = '开始计时'; }
  function startTimer() {
    if (timerId) {
      const remaining = Math.max(0, Math.ceil((timerEnd - Date.now())/1000));
      timerRemaining = remaining; stopTimer(); $('timer-start').textContent = '继续计时'; return;
    }
    if (timerRemaining <= 0) timerRemaining = 90;
    timerEnd = Date.now() + timerRemaining * 1000;
    $('timer-start').textContent = '暂停';
    timerId = setInterval(() => {
      timerRemaining = Math.max(0, Math.ceil((timerEnd - Date.now())/1000)); updateClock();
      if (timerRemaining === 0) {stopTimer(); $('timer-start').textContent = '重新开始'; toast('准备时间结束，可以开始口译了');}
    }, 200);
  }
  function renderExerciseTabs() {
    $('exercise-tabs').innerHTML = d.exercises.map((e,i) => `<button type="button" class="exercise-tab ${activeExercise === i ? 'current' : ''}" data-exercise="${i}" aria-pressed="${activeExercise === i}">
      <span class="tab-num">${String(i + 1).padStart(2, '0')}</span><span><strong>${esc(e.title.split(' · ')[0])}</strong><small lang="fr">${esc(e.fr)}</small></span></button>`).join('');
    $('exercise-tabs').querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
      const next = Number(button.dataset.exercise);
      if (next === activeExercise) return;
      if (recorder && recorder.state === 'recording') {toast('请先停止录音，再切换材料'); return;}
      activeExercise = next; isAnnotated = false; modelVisible = false; resetTimer(); renderExercise();
    }));
  }
  function updateAnnotation() {
    $('source-text').classList.toggle('annotated', isAnnotated);
    $('annotation-legend').hidden = !isAnnotated;
    $('annotate-toggle').textContent = isAnnotated ? '隐藏信息层级' : '显示信息层级';
    $('annotate-toggle').setAttribute('aria-pressed', String(isAnnotated));
  }
  function renderExercise() {
    renderExerciseTabs();
    const e = d.exercises[activeExercise];
    $('exercise-counter').textContent = 'EXTRAIT ' + String(activeExercise + 1).padStart(2, '0') + ' / ' + String(d.exercises.length).padStart(2, '0');
    $('exercise-title').textContent = e.title;
    $('exercise-level').textContent = e.level;
    $('exercise-goal').textContent = e.goal;
    $('exercise-question').textContent = e.question;
    $('source-text').innerHTML = e.units.map(u => `<span class="source-unit ${esc(u.role)}">${esc(u.text)}</span>`).join('');
    $('annotation-legend').innerHTML = Object.entries(d.roles).map(([key,val]) => `<span class="${key}">${esc(val)}</span>`).join('');
    $('french-model').textContent = e.model;
    $('model-insight').textContent = '译法说明：' + e.insight;
    $('student-notes').value = storage.get('notes:' + e.id);
    $('model-panel').hidden = !modelVisible;
    $('model-toggle').setAttribute('aria-expanded', String(modelVisible));
    $('model-toggle').querySelector('.model-sign').textContent = modelVisible ? '−' : '＋';
    updateAnnotation();
    if (!recorder || recorder.state !== 'recording') clearRecordingResult();
  }
  function toggleModel() {
    modelVisible = !modelVisible;
    $('model-panel').hidden = !modelVisible;
    $('model-toggle').setAttribute('aria-expanded', String(modelVisible));
    $('model-toggle').querySelector('.model-sign').textContent = modelVisible ? '−' : '＋';
  }

  // Optional local recording; never posted to a server.
  let recorder = null, stream = null, chunks = [], recordInterval = null, recordingStart = 0, blobUrl = '';
  function clearRecordingResult() {
    $('recording-result').hidden = true;
    $('audio-playback').removeAttribute('src');
    $('audio-playback').load();
    $('audio-download').removeAttribute('href');
    if (blobUrl) {URL.revokeObjectURL(blobUrl); blobUrl = '';}
  }
  function stopRecording() {
    if (recorder && recorder.state === 'recording') recorder.stop();
  }
  async function toggleRecording() {
    if (recorder && recorder.state === 'recording') {stopRecording(); return;}
    if (!window.MediaRecorder || !navigator.mediaDevices?.getUserMedia) {toast('此浏览器不支持网页录音，可使用手机录音机'); return;}
    try {
      stream = await navigator.mediaDevices.getUserMedia({audio:true});
      clearRecordingResult(); chunks = [];
      const types = ['audio/webm;codecs=opus','audio/mp4','audio/webm','audio/ogg'];
      const preferred = types.find(t => window.MediaRecorder.isTypeSupported?.(t));
      recorder = new MediaRecorder(stream, preferred ? {mimeType:preferred} : undefined);
      recorder.addEventListener('dataavailable', e => {if (e.data.size) chunks.push(e.data);});
      recorder.addEventListener('stop', () => {
        clearInterval(recordInterval); recordInterval = null;
        $('record-button').textContent = '● 开始录音'; $('record-button').classList.remove('is-recording');
        stream?.getTracks().forEach(t => t.stop()); stream = null;
        const type = recorder.mimeType || 'audio/webm';
        const blob = new Blob(chunks, {type});
        if (!blob.size) { $('record-status').textContent = '录音未生成，请使用设备自带录音功能。'; return; }
        blobUrl = URL.createObjectURL(blob);
        $('audio-playback').src = blobUrl;
        $('audio-download').href = blobUrl;
        $('audio-download').download = `visite-guidee-${d.exercises[activeExercise].id}-${new Date().toISOString().slice(0,10)}.${type.includes('mp4') ? 'm4a' : type.includes('ogg') ? 'ogg' : 'webm'}`;
        $('recording-result').hidden = false;
        $('record-status').textContent = '录音完成。可直接试听或保存到本机。';
        $('record-clock').textContent = '';
      });
      recorder.start(250); recordingStart = Date.now();
      $('record-button').textContent = '■ 停止录音'; $('record-button').classList.add('is-recording');
      $('record-status').textContent = '正在本机录音…'; $('record-clock').textContent = '00:00';
      recordInterval = setInterval(() => $('record-clock').textContent = formatTime(Math.floor((Date.now() - recordingStart)/1000)), 300);
    } catch (error) {
      stream?.getTracks().forEach(t => t.stop()); stream = null;
      $('record-status').textContent = '无法启用麦克风。请允许录音权限，或改用手机录音功能。';
    }
  }

  // Feedback: 5 × 4 points, local persistence.
  function renderRubric() {
    $('rubric-rows').innerHTML = d.rubric.map((r,i) => `<div class="rubric-row"><div><strong>${String(i + 1).padStart(2, '0')} · ${esc(r.title)}</strong><small>${esc(r.desc)}</small></div><label><span class="sr-only">${esc(r.title)} 评分</span><select data-rubric="${esc(r.id)}"><option value="">选择等级</option><option value="1">1 · 待加强</option><option value="2">2 · 部分完成</option><option value="3">3 · 基本达成</option><option value="4">4 · 完整达成</option></select></label></div>`).join('');
    $('rubric-rows').querySelectorAll('select').forEach(s => {
      s.value = storage.get('rubric:' + s.dataset.rubric);
      s.addEventListener('change', () => {storage.set('rubric:' + s.dataset.rubric, s.value); updateRubricTotal();});
    });
    $('revision-note').value = storage.get('revision');
    updateRubricTotal();
  }
  function updateRubricTotal() {
    const scores = [...$('rubric-rows').querySelectorAll('select')].map(x => x.value === '' ? null : Number(x.value));
    const count = scores.filter(x => x !== null).length;
    const total = scores.reduce((sum,n) => sum + (n ?? 0),0);
    $('rubric-total').textContent = count === 5 ? `本次自评：${total} / 20` : `已评 ${count}/5 项${count ? ` · 当前 ${total} 分` : ''}`;
  }
  function makeEvaluationText() {
    const title = d.exercises[activeExercise].title;
    const rows = [...$('rubric-rows').querySelectorAll('select')];
    const complete = rows.every(s => s.value);
    const scores = rows.map((s,i) => `${d.rubric[i].title}：${s.value || '未评分'} / 4`);
    const total = rows.reduce((sum,s) => sum + Number(s.value || 0),0);
    return ['Visite guidée · 视译自评','练习：' + title,...scores,`总分：${complete ? total + ' / 20' : '未完成评分'}`,'下一轮调整：' + ($('revision-note').value.trim() || '未填写')].join('\n');
  }

  renderStrasbourg(); renderFilters(); renderExpressions(); renderExercise(); renderRubric();
  $('expression-search').addEventListener('input', renderExpressions);
  $('annotate-toggle').addEventListener('click', () => {isAnnotated = !isAnnotated; updateAnnotation();});
  $('model-toggle').addEventListener('click', toggleModel);
  $('student-notes').addEventListener('input', e => storage.set('notes:' + d.exercises[activeExercise].id,e.target.value));
  $('timer-start').addEventListener('click', startTimer);
  $('timer-reset').addEventListener('click', resetTimer);
  $('record-button').addEventListener('click', toggleRecording);
  $('revision-note').addEventListener('input', e => storage.set('revision',e.target.value));
  $('copy-evaluation').addEventListener('click', () => copyText(makeEvaluationText()));
  window.addEventListener('beforeunload', () => {stopTimer();stopRecording();});
})();
