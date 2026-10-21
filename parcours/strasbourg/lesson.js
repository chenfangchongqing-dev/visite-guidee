(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const make = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined && value !== null) node.textContent = value;
    return node;
  };

  // Activité 01: recognize discourse functions, not isolated vocabulary.
  const functions = [
    '定位 · Situer',
    '观察 · Faire observer',
    '交代背景 · Contextualiser',
    '解释 · Interpréter',
    '过渡 · Faire la transition'
  ];
  const questions = [
    {sentence:'Nous voici sur la place de l’Université, face au Palais universitaire.',answer:0,why:'Nous voici 确认参观者共同所处的位置，首先完成定位。'},
    {sentence:'Si vous levez les yeux, vous verrez les sculptures au sommet de la façade.',answer:1,why:'引导参观者把目光转向立面上方，重点是观察动作。'},
    {sentence:'Le Palais universitaire a été inauguré en 1884.',answer:2,why:'提供建筑历史时间信息；没有解释展品的象征意义。'},
    {sentence:'La figure d’Athéna renvoie ici au savoir et à la connaissance.',answer:3,why:'将可见的人物形象与知识的寓意联系起来，属于解释。'},
    {sentence:'Nous allons maintenant passer dans l’atrium.',answer:4,why:'把参观者从现有位置带向下一处空间，属于过渡。'}
  ];

  let questionIndex = 0;
  let correctTotal = 0;
  let answered = false;

  function renderQuiz() {
    const host = $('function-quiz');
    host.replaceChildren();
    const progress = $('quiz-progress');
    progress.textContent = String(Math.min(questionIndex, questions.length)) + ' / ' + String(questions.length);

    if (questionIndex >= questions.length) {
      const end = make('div','lesson-quiz-complete','练习完成：' + correctTotal + ' / ' + questions.length + ' 题首次判断正确。');
      end.appendChild(make('small','', '建议再回到原始手册，寻找一个同时包含“观察”和“解释”的讲解节点。'));
      host.appendChild(end);
      return;
    }

    answered = false;
    const q = questions[questionIndex];
    host.appendChild(make('p','lesson-quiz-question',q.sentence));
    const options = make('div','lesson-quiz-list');
    const feedback = make('div','lesson-quiz-feedback');
    feedback.setAttribute('role','status');
    const next = make('button','lesson-quiz-next','下一题 →');
    next.type = 'button';
    next.hidden = true;
    next.addEventListener('click', () => {
      questionIndex += 1;
      renderQuiz();
    });

    functions.forEach((label,index) => {
      const button = make('button','',label);
      button.type = 'button';
      button.setAttribute('aria-pressed','false');
      button.addEventListener('click',() => {
        if (answered) return;
        answered = true;
        const correct = index === q.answer;
        if (correct) correctTotal += 1;
        [...options.querySelectorAll('button')].forEach((candidate,i) => {
          candidate.disabled = true;
          candidate.setAttribute('aria-pressed', i === q.answer ? 'true' : 'false');
        });
        feedback.className = 'lesson-quiz-feedback ' + (correct ? 'is-good' : 'is-wrong');
        feedback.textContent = (correct ? '判断正确。' : '本题应选择「' + functions[q.answer] + '」。') + ' ' + q.why;
        next.textContent = questionIndex === questions.length - 1 ? '查看结果 →' : '下一题 →';
        next.hidden = false;
        progress.textContent = String(questionIndex + 1) + ' / ' + String(questions.length);
      });
      options.appendChild(button);
    });

    host.appendChild(options);
    host.appendChild(feedback);
    host.appendChild(next);
  }
  $('quiz-restart').addEventListener('click',() => {questionIndex=0;correctTotal=0;renderQuiz();});
  renderQuiz();

  // Activité 02: sorting by meaning and visitor movement, usable by touch and keyboard.
  const segments = [
    {id:1,text:'Nous voici devant le Palais universitaire, sur la place de l’Université.'},
    {id:2,text:'Le bâtiment a été construit à la fin du XIXe siècle, sur les plans d’Otto Warth.'},
    {id:3,text:'Si vous levez les yeux, vous apercevrez des sculptures au sommet de la façade.'},
    {id:4,text:'Ces figures évoquent les disciplines et la place accordée au savoir.'},
    {id:5,text:'Je vous propose maintenant d’entrer dans le bâtiment.'}
  ];
  let sequence = [3,5,1,4,2];
  const orderHost = $('order-exercise');
  const orderFeedback = $('order-feedback');

  function renderOrder() {
    orderHost.replaceChildren();
    sequence.forEach((id, index) => {
      const source = segments.find(item=>item.id===id);
      const card = make('div','order-item');
      card.appendChild(make('span','',String(index+1).padStart(2,'0')));
      card.appendChild(make('p','',source.text));
      const moves = make('div','order-move');
      const up = make('button','','↑');
      up.type='button';
      up.setAttribute('aria-label','将第'+(index+1)+'项上移');
      up.disabled=index===0;
      up.addEventListener('click',()=>{
        [sequence[index-1],sequence[index]]=[sequence[index],sequence[index-1]];
        orderFeedback.textContent='顺序已调整。';
        renderOrder();
      });
      const down = make('button','','↓');
      down.type='button';
      down.setAttribute('aria-label','将第'+(index+1)+'项下移');
      down.disabled=index===sequence.length-1;
      down.addEventListener('click',()=>{
        [sequence[index+1],sequence[index]]=[sequence[index],sequence[index+1]];
        orderFeedback.textContent='顺序已调整。';
        renderOrder();
      });
      moves.append(up,down);
      card.appendChild(moves);
      orderHost.appendChild(card);
    });
  }
  $('order-check').addEventListener('click',()=>{
    const done=sequence.every((id,index)=>id===index+1);
    orderFeedback.textContent=done ?
      '顺序合理：定位 → 历史事实 → 观察 → 解释 → 过渡。' :
      '还可以调整：先让听众知道自己在哪里，再看建筑和细节，最后解释并继续行进。';
  });
  renderOrder();

  // Activité 03: actual speaking time, not an animation.
  const TOTAL=75;
  let remaining=TOTAL;
  let running=false;
  let deadline=0;
  let interval=null;

  function formatTime(seconds){
    const n=Math.max(0,Math.ceil(seconds));
    return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0');
  }
  function renderTime(){
    $('oral-clock').textContent=formatTime(remaining);
    $('oral-start').textContent=running ? '暂停' : (remaining < TOTAL && remaining > 0 ? '继续' : '开始75秒');
  }
  function stopTick(){
    if(interval!==null){clearInterval(interval);interval=null;}
    running=false;
  }
  function tick(){
    remaining=Math.max(0,(deadline-Date.now())/1000);
    if(remaining<=0){
      remaining=0;
      stopTick();
      $('oral-status').textContent='时间到：请先回想口译是否连贯，再看示范。';
    }
    renderTime();
  }
  $('oral-start').addEventListener('click',()=>{
    if(running){
      tick();
      stopTick();
      $('oral-status').textContent='已暂停';
      renderTime();
      return;
    }
    if(remaining<=0) remaining=TOTAL;
    deadline=Date.now()+remaining*1000;
    running=true;
    $('oral-status').textContent='正在进行法语口头讲解';
    interval=setInterval(tick,250);
    renderTime();
  });
  $('oral-reset').addEventListener('click',()=>{
    stopTick();
    remaining=TOTAL;
    $('oral-status').textContent='准备好后开始';
    renderTime();
  });
  renderTime();

  // Notes live only in this device's browser storage.
  const notes=$('transfer-notes');
  const saved=$('notes-status');
  const key='vg.strasbourg.lesson.notes.v1';
  let canStore=true;
  try{
    const existing=localStorage.getItem(key);
    if(existing) notes.value=existing;
  }catch(e){
    canStore=false;
    saved.textContent='当前浏览器禁止本地保存；可复制笔记另行保留。';
  }
  notes.addEventListener('input',()=>{
    if(!canStore) return;
    try {
      localStorage.setItem(key,notes.value);
      saved.textContent='本机已保存；不会上传给教师。';
    } catch(e){
      canStore=false;
      saved.textContent='本地保存失败；请复制笔记另行保留。';
    }
  });

  window.addEventListener('pagehide',()=>{if(interval!==null)clearInterval(interval);});
})();