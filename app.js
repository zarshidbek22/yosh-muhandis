/* Yosh Muhandis — working prototype. All data is demo data, stored only in this browser. */
(function () {
  'use strict';

  var KEY = 'ym-demo-v1';
  function start() {
    return {
      coins: 240, xp: 340, points: 340,
      lessons: {}, likes: {}, myWorks: [], pending: [], registered: {}, bought: [],
      comicDone: [], limit: 60, minutes: 35, practiceBest: 0,
      safe: { dm: false, shopConfirm: true, night: true },
      invites: [{ name: 'Bekzod', st: 'ok' }, { name: 'Sardor', st: 'wait' }]
    };
  }
  function load() {
    try { var v = JSON.parse(localStorage.getItem(KEY)); if (v) return Object.assign(start(), v); } catch (e) {}
    return start();
  }
  var S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function sum(n) { return n.toLocaleString('ru-RU').replace(/,/g, ' ') + ' soʻm'; }

  /* ---------- icons ---------- */
  var I = {
    home: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
    book: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5a2 2 0 0 1 2-2h14v14H6a2 2 0 0 0-2 2 2 2 0 0 0 2 2h14"/></svg>',
    cup: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 20h6"/></svg>',
    comic: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 4v16M3 12h9"/></svg>',
    bag: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    user: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    back: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
    heart: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-9.5-9.3C1 8 3.4 4.5 7 4.5c2 0 3.4 1 5 2.8 1.6-1.8 3-2.8 5-2.8 3.6 0 6 3.5 4.5 7.2C19.5 16.4 12 21 12 21z"/></svg>',
    plus: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    shield: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    chev: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
    lock: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>'
  };

  /* ---------- content ---------- */
  var COURSES = [
    { id: 'py', title: 'Python: birinchi qadamlar', color: '#DCE7FF', ink: '#1F3BD1', lessons: [
      { id: 'py1', title: 'print() buyrugʻi', theory: 'Kompyuterga biror narsani ekranga chiqarishni aytish uchun <b>print()</b> ishlatiladi. Matn qoʻshtirnoq ichida yoziladi: <code>print("Salom")</code>.',
        quiz: { q: 'Qaysi qator ekranga Salom soʻzini chiqaradi?', opts: ['print(Salom)', 'print("Salom")', 'Salom.print()'], a: 1 },
        code: { task: 'Ekranga <b>Salom, dunyo!</b> matnini chiqaring.', start: '', expect: 'Salom, dunyo!' } },
      { id: 'py2', title: 'Oʻzgaruvchilar', theory: 'Oʻzgaruvchi — qiymatni saqlaydigan quti. <code>x = 5</code> yozsak, x ichida 5 turadi. Keyin <code>print(x + 2)</code> 7 chiqaradi.',
        quiz: { q: 'x = 4, keyin x = x * 3. print(x) nima chiqaradi?', opts: ['7', '12', '43'], a: 1 },
        code: { task: 'a = 8 va b = 5 oʻzgaruvchilarini yarating va ularning yigʻindisini chiqaring.', start: 'a = 8\nb = 5\n', expect: '13' } }
    ]},
    { id: 'gd', title: 'Grafik dizayn asoslari', color: '#FFE6D5', ink: '#8A3A06', lessons: [
      { id: 'gd1', title: 'Rang doirasi', theory: 'Asosiy ranglar: qizil, sariq, koʻk. Ikkitasini aralashtirsak, oraliq rang chiqadi. Qarama-qarshi ranglar bir-birini kuchliroq koʻrsatadi.',
        quiz: { q: 'Qizil va sariq aralashsa qaysi rang chiqadi?', opts: ['Yashil', 'Toʻq sariq', 'Binafsha'], a: 1 } },
      { id: 'gd2', title: 'Logotip: oddiylik qoidasi', theory: 'Yaxshi logotip kichik oʻlchamda ham oʻqiladi. 2–3 rang va bitta aniq shakl yetarli.',
        quiz: { q: 'Logotip uchun nechta rang tavsiya qilinadi?', opts: ['2–3 ta', '7–8 ta', 'Qancha koʻp boʻlsa shuncha yaxshi'], a: 0 } }
    ]},
    { id: 'rb', title: 'Robototexnika: karton robot', color: '#DDF3E8', ink: '#1E6B45', lessons: [
      { id: 'rb1', title: 'Telefon ushlagich yasaymiz', theory: 'Kartondan ushlagich yasash uchun uchburchak tayanch kerak: u ogʻirlikni teng taqsimlaydi. Burchakni 60–70° qiling.',
        quiz: { q: 'Nima uchun tayanch uchburchak shaklida?', opts: ['Chiroyli boʻlgani uchun', 'Ogʻirlikni teng taqsimlaydi', 'Karton tejaladi'], a: 1 } }
    ]}
  ];
  function findLesson(id) {
    for (var i = 0; i < COURSES.length; i++) for (var j = 0; j < COURSES[i].lessons.length; j++)
      if (COURSES[i].lessons[j].id === id) return { c: COURSES[i], l: COURSES[i].lessons[j] };
    return null;
  }

  var WORKS = {
    w1: { author: 'Madina', grade: '8-sinf · Chirchiq', ava: '#E0353B', title: 'Telefon uchun ushlagich', thumb: '#FFE6D5', ink: '#8A3A06',
      text: 'Kartondan yasadim, 3 qatlam. Uchburchak tayanch telefonni 60° burchakda ushlab turadi. 40 daqiqa ketdi.', likes: 48, lesson: 'rb1', shop: 's1' },
    w2: { author: 'Javohir', grade: '9-sinf · Samarqand', ava: '#3355FF', title: 'Python’da “Tosh-qaychi-qogʻoz”', thumb: '#DCE7FF', ink: '#1F3BD1',
      text: 'Birinchi oʻyinim. Kompyuter tasodifiy tanlaydi, hisob saqlanadi. Keyingi qadam — grafik oyna.', likes: 31, lesson: 'py1', shop: 's3' }
  };

  var CONTESTS = [
    { id: 'math', title: 'Matematika', kind: 'Onlayn test · 19-dekabr, 10:00–20:00 · 60 daqiqa', fee: 49000 },
    { id: 'eng', title: 'Ingliz tili', kind: 'Onlayn test · 20-dekabr', fee: 49000 },
    { id: 'logic', title: 'Mantiq', kind: 'Onlayn test · 21-dekabr', fee: 49000 },
    { id: 'code', title: 'Dasturlash va AI', kind: 'Video loyiha · hakamlar baholaydi', fee: 49000 },
    { id: 'robo', title: 'Robototexnika', kind: 'Video loyiha · hakamlar baholaydi', fee: 49000 }
  ];

  var PRACTICE = [
    { q: '15 × 4 = ?', opts: ['50', '60', '64'], a: 1 },
    { q: 'Ketma-ketlik: 3, 6, 12, 24, ?', opts: ['36', '48', '30'], a: 1 },
    { q: '0,5 + 0,25 = ?', opts: ['0,75', '0,30', '0,525'], a: 0 },
    { q: 'Kvadratning perimetri 20 sm. Tomoni?', opts: ['4 sm', '5 sm', '10 sm'], a: 1 },
    { q: '100 ning 15% i nechaga teng?', opts: ['15', '1,5', '85'], a: 0 }
  ];

  var SHOP = [
    { id: 's1', title: 'Telefon ushlagich (karton)', by: 'Madina, 8-sinf', price: 35000, color: '#FFE6D5', ink: '#8A3A06', kind: 'Buyum · pochta orqali' },
    { id: 's2', title: 'Stikerlar toʻplami “Kosmos”', by: 'Aziz, 8-sinf', price: 12000, color: '#DDF3E8', ink: '#1E6B45', kind: 'Raqamli fayl' },
    { id: 's3', title: '“Tosh-qaychi-qogʻoz” oʻyini', by: 'Javohir, 9-sinf', price: 8000, color: '#DCE7FF', ink: '#1F3BD1', kind: 'Raqamli · Python kodi' },
    { id: 's4', title: 'Maktab afishasi shabloni', by: 'Nilufar, 10-sinf', price: 15000, color: '#F3E3F5', ink: '#7A2F84', kind: 'Raqamli fayl' }
  ];
  var REWARDS = [
    { id: 'k1', title: 'Profil uchun oltin ramka', cost: 80, color: '#FFF3D6', ink: '#6B4400' },
    { id: 'k2', title: 'Ochiq dars: Blender 3D', cost: 150, color: '#DCE7FF', ink: '#1F3BD1' },
    { id: 'k3', title: 'Komiks: maxsus son', cost: 120, color: '#FDE2E3', ink: '#A3191E' }
  ];

  var EPISODES = [
    { id: 'e1', title: '1-qism. Rangsiz shahar', panels: [
      { bg: '#DCE7FF', who: 'Zarina', text: 'Bolt, qara! Shahardagi hamma afishalar kulrang boʻlib qolibdi.' },
      { bg: '#E9ECF3', who: 'Bolt', text: 'Ranglar moduli ishlamayapti. Menda faqat qizil va sariq boʻyoq qoldi.' },
      { bg: '#FFE6D5', who: 'Zarina', text: 'Kutubxona eshigini toʻq sariqqa boʻyash kerak. Shunda u ochiladi!' }
    ], mission: { q: 'Bolt toʻq sariq rang olishi uchun nimani aralashtirishi kerak?', opts: ['Qizil + koʻk', 'Qizil + sariq', 'Sariq + koʻk'], a: 1 }, reward: 30 },
    { id: 'e2', title: '2-qism. Kutubxona qulfi', panels: [
      { bg: '#DDF3E8', who: 'Bolt', text: 'Eshik ochildi! Lekin ichkarida raqamli qulf bor.' },
      { bg: '#F3E3F5', who: 'Zarina', text: 'Ekranda yozuv: 2, 4, 8, 16 … keyingisini kirit.' },
      { bg: '#FFF3D6', who: 'Bolt', text: 'Har safar ikki baravar oshyapti. Menga yordam ber!' }
    ], mission: { q: 'Qulf kodi qaysi son?', opts: ['24', '32', '20'], a: 1 }, reward: 30 },
    { id: 'e3', title: '3-qism. Yashirin ustaxona', locked: true }
  ];

  var RIVALS = [
    { n: 'Diyorbek · Toshkent', p: 612 }, { n: 'Malika · Fargʻona', p: 598 }, { n: 'Asadbek · Buxoro', p: 571 },
    { n: 'Sevinch · Namangan', p: 560 }, { n: 'Temur · Xorazm', p: 544 }
  ];

  /* ---------- router ---------- */
  var TABS = [
    { id: 'feed', label: 'Lenta', icon: I.home }, { id: 'courses', label: 'Kurslar', icon: I.book },
    { id: 'contests', label: 'Tanlovlar', icon: I.cup }, { id: 'comics', label: 'Komiks', icon: I.comic },
    { id: 'shop', label: 'Doʻkon', icon: I.bag }, { id: 'profile', label: 'Profil', icon: I.user }
  ];
  var stack = [{ name: 'feed' }];
  var tmp = {}; // per-screen transient state
  var root = document.getElementById('app');

  function cur() { return stack[stack.length - 1]; }
  function go(name, arg) { stack.push({ name: name, arg: arg }); tmp = {}; render(true); }
  function tab(name) { stack = [{ name: name }]; tmp = {}; render(true); }
  function back() { if (stack.length > 1) stack.pop(); tmp = {}; render(true); }

  function level() { return 1 + Math.floor(S.xp / 150); }
  function rank() { return Math.max(1, Math.round(128 - (S.points - 340) / 3)); }
  function addCoins(n, why) { S.coins += n; S.xp += n; save(); toast('+' + n + ' tanga · ' + why); }

  var toastTimer;
  function toast(msg) { setTimeout(function () { showToast(msg); }, 30); }
  function showToast(msg) {
    var t = root.querySelector('.ym-toast'); if (!t) return;
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }

  function head(title, opts) {
    opts = opts || {};
    var backBtn = stack.length > 1 ? '<button class="ym-back" data-act="back" aria-label="Orqaga">' + I.back + '</button>' : '';
    var coin = opts.noCoin ? '' : '<button class="ym-coin" data-tab="profile" aria-label="Tangalar"><i></i>' + S.coins + '</button>';
    var tag = stack.length > 1 ? 'p class="t"' : 'h1';
    return '<div class="ym-head" style="' + (opts.style || '') + '">' + backBtn + '<' + tag + '>' + title + '</' + tag.split(' ')[0] + '>' + (opts.right || '') + coin + '</div>';
  }

  /* ---------- screens ---------- */
  var SCREENS = {};

  SCREENS.feed = function () {
    var posts = [];
    S.myWorks.slice().reverse().forEach(function (w) {
      posts.push('<article class="ym-card ym-col" style="gap:10px"><div class="ym-row"><div class="ym-ava" style="background:#3355FF">AZ</div><div class="ym-grow"><strong>Aziz (siz)</strong><div class="ym-small">' + esc(w.cat) + '</div></div>' +
        (w.ok ? '<span class="ym-pill green">Joylandi</span>' : '<span class="ym-pill">Tekshiruvda</span>') + '</div>' +
        '<div class="ym-thumb" style="background:#E6EBFF;color:#1F3BD1">' + esc(w.title) + '</div>' + (w.text ? '<div class="ym-muted">' + esc(w.text) + '</div>' : '') + '</article>');
    });
    function workPost(id) {
      var w = WORKS[id], on = !!S.likes[id];
      return '<article class="ym-card ym-col" style="gap:10px"><button class="ym-link" data-go="work:' + id + '"><div class="ym-row" style="margin-bottom:10px"><div class="ym-ava" style="background:' + w.ava + '">' + w.author[0] + '</div><div class="ym-grow"><strong>' + w.author + '</strong><div class="ym-small">' + w.grade + '</div></div><span class="ym-pill blue">Yangi ish</span></div>' +
        '<div class="ym-thumb" style="background:' + w.thumb + ';color:' + w.ink + '">' + w.title + '</div></button>' +
        '<div class="ym-row"><button class="ym-like' + (on ? ' on' : '') + '" data-act="like:' + id + '" aria-pressed="' + on + '">' + I.heart + (w.likes + (on ? 1 : 0)) + '</button><span class="ym-grow"></span><button class="ym-btn sm" data-go="work:' + id + '">Men ham qilaman</button></div></article>';
    }
    return head('Yosh Muhandis') +
      '<div class="ym-body">' +
      '<div class="ym-card ym-row" style="background:#141B34;color:#fff;border:none"><div class="ym-grow ym-col"><span style="opacity:.75;font-size:12px">Bugungi missiya</span><strong>1 ta dars + 1 ta mashq testi</strong><span style="font-size:12px;opacity:.8">' + Object.keys(S.lessons).length + ' ta dars tugatilgan · ' + S.minutes + '/' + S.limit + ' daqiqa</span></div><button class="ym-btn coin sm" data-tab="courses">Boshlash</button></div>' +
      posts.join('') + workPost('w1') +
      '<button class="ym-link ym-card" data-go="contest:math"><div class="ym-row"><div class="ym-ava" style="background:#F2A20C;color:#2B1A00">' + I.cup + '</div><div class="ym-grow"><strong>Dekabr bosqichi ochildi</strong><div class="ym-small">Matematika · 19-dekabr · roʻyxat 49 000 soʻm</div></div>' + I.chev + '</div></button>' +
      workPost('w2') +
      '<button class="ym-link ym-card" data-tab="comics"><div class="ym-row"><div class="ym-ava" style="background:#E0353B">' + I.comic + '</div><div class="ym-grow"><strong>Komiks: “Rangsiz shahar”</strong><div class="ym-small">Zarina va Bolt · missiya uchun +30 tanga</div></div>' + I.chev + '</div></button>' +
      '</div><button class="ym-fab" data-go="upload" aria-label="Ish joylash">' + I.plus + '</button>';
  };

  SCREENS.work = function (id) {
    var w = WORKS[id], l = findLesson(w.lesson), p = SHOP.filter(function (s) { return s.id === w.shop; })[0];
    return head('Doʻstning ishi') + '<div class="ym-body">' +
      '<div class="ym-row"><div class="ym-ava" style="background:' + w.ava + '">' + w.author[0] + '</div><div class="ym-grow"><strong>' + w.author + '</strong><div class="ym-small">' + w.grade + '</div></div></div>' +
      '<div class="ym-thumb" style="height:200px;background:' + w.thumb + ';color:' + w.ink + ';font-size:16px">' + w.title + '</div>' +
      '<p style="margin:0">' + w.text + '</p>' +
      '<div class="ym-card ym-col"><span class="ym-small">Bu ishni qilish uchun dars</span><strong>' + l.c.title + ' · ' + l.l.title + '</strong><span class="ym-small">≈ 15 daqiqa · +20 tanga</span></div>' +
      '<button class="ym-btn" data-go="lesson:' + w.lesson + '">Men ham qilaman</button>' +
      (p ? '<button class="ym-btn ghost" data-go="product:' + p.id + '">Doʻkonda koʻrish · ' + sum(p.price) + '</button>' : '') +
      '</div>';
  };

  SCREENS.courses = function () {
    return head('Kurslar') + '<div class="ym-body">' + COURSES.map(function (c) {
      var done = c.lessons.filter(function (l) { return S.lessons[l.id]; }).length, pct = Math.round(done / c.lessons.length * 100);
      return '<div class="ym-card ym-col" style="gap:10px"><div class="ym-row"><div class="ym-ava" style="background:' + c.color + ';color:' + c.ink + '">' + I.book + '</div><div class="ym-grow"><strong>' + c.title + '</strong><div class="ym-small">' + done + '/' + c.lessons.length + ' dars</div></div><span class="ym-pill ' + (pct === 100 ? 'green' : 'blue') + '">' + pct + '%</span></div>' +
        '<div class="ym-progress"><b style="width:' + pct + '%"></b></div>' +
        c.lessons.map(function (l) {
          return '<button class="ym-opt ym-row" data-go="lesson:' + l.id + '" style="padding:11px 12px"><span class="ym-grow">' + l.title + '</span>' + (S.lessons[l.id] ? '<span class="ym-pill green">Bajarildi</span>' : '<span class="ym-pill coin">+20</span>') + '</button>';
        }).join('') + '</div>';
    }).join('') + '</div>';
  };

  SCREENS.lesson = function (id) {
    var f = findLesson(id), l = f.l;
    if (tmp.step == null) tmp.step = 0;
    var steps = l.code ? 3 : 2, s = tmp.step, body = '';
    if (s === 0) {
      body = '<span class="ym-pill blue" style="align-self:flex-start">Nazariya</span><h2 style="font:700 19px var(--display);margin:0">' + l.title + '</h2><p style="margin:0;font-size:15px;line-height:1.55">' + l.theory + '</p>' +
        '<div style="flex:1"></div><button class="ym-btn" data-act="next">Tushundim</button>';
    } else if (s === 1) {
      var q = l.quiz, answered = tmp.ans != null;
      body = '<span class="ym-pill blue" style="align-self:flex-start">Savol</span><strong style="font-size:16px">' + q.q + '</strong>' +
        q.opts.map(function (o, i) {
          var cls = answered ? (i === q.a ? ' ok' : (i === tmp.ans ? ' bad' : '')) : '';
          return '<button class="ym-opt' + cls + '" data-act="ans:' + i + '"' + (answered ? ' disabled' : '') + '>' + o + '</button>';
        }).join('') +
        (answered ? '<div class="ym-small" style="font-size:14px;color:' + (tmp.ans === q.a ? '#1E6B45' : '#A3191E') + '">' + (tmp.ans === q.a ? 'Toʻgʻri!' : 'Notoʻgʻri. Toʻgʻri javob yashil bilan belgilandi.') + '</div>' : '') +
        '<div style="flex:1"></div>' + (answered ? '<button class="ym-btn" data-act="' + (tmp.ans === q.a ? 'next' : 'retry') + '">' + (tmp.ans === q.a ? 'Davom etish' : 'Qayta urinish') + '</button>' : '');
    } else if (s === 2 && l.code) {
      body = '<span class="ym-pill blue" style="align-self:flex-start">Amaliyot</span><strong style="font-size:15px">' + l.code.task + '</strong>' +
        '<label class="ym-label" for="code">Kodingiz</label><textarea id="code" class="ym-code" spellcheck="false" placeholder="print(&quot;...&quot;)">' + esc(tmp.code != null ? tmp.code : l.code.start) + '</textarea>' +
        '<button class="ym-btn dark" data-act="run">Ishga tushirish</button>' +
        '<div class="ym-label">Natija</div><div class="ym-out' + (tmp.err ? ' err' : '') + '" id="out">' + esc(tmp.out || 'Kodni yozing va “Ishga tushirish”ni bosing') + '</div>' +
        (tmp.passed ? '<button class="ym-btn green" data-act="next">Topshirish</button>' : '');
    } else {
      var first = !S.lessons[id];
      if (first) { S.lessons[id] = 1; addCoins(20, 'dars tugadi'); }
      body = '<div style="flex:1"></div><div style="text-align:center" class="ym-col"><div style="font:700 44px var(--display);color:#F2A20C">+20</div><strong style="font:700 19px var(--display)">Dars tugadi!</strong><span class="ym-muted">“' + l.title + '” portfoliongizga qoʻshildi</span></div><div style="flex:1"></div>' +
        '<button class="ym-btn" data-act="back">Kurslarga qaytish</button><button class="ym-btn ghost" data-go="upload">Oʻz ishimni joylash</button>';
    }
    var pct = Math.round(Math.min(s, steps) / steps * 100);
    return head(f.c.title) + '<div class="ym-body"><div class="ym-progress"><b style="width:' + pct + '%"></b></div>' + body + '</div>';
  };

  /* tiny Python subset: assignments and print() of strings / numbers / arithmetic */
  function runPy(src) {
    var vars = {}, out = [];
    var lines = src.split('\n');
    function ev(expr, ln) {
      expr = expr.trim();
      var m = expr.match(/^(["'])(.*)\1$/);
      if (m) return m[2];
      var js = expr.replace(/[A-Za-z_]\w*/g, function (n) {
        if (!(n in vars)) throw new Error(ln + '-qator: “' + n + '” nomli oʻzgaruvchi yoʻq');
        return typeof vars[n] === 'string' ? JSON.stringify(vars[n]) : String(vars[n]);
      });
      if (!/^[\d\s+\-*/().,"'A-Za-z!?Ѐ-ӿʻʼ]*$/.test(js) || /[;=]/.test(js)) throw new Error(ln + '-qator: tushunarsiz ifoda');
      try { return Function('"use strict";return (' + js + ')')(); } catch (e) { throw new Error(ln + '-qator: sintaksis xatosi'); }
    }
    lines.forEach(function (raw, i) {
      var line = raw.replace(/#.*/, '').trim(), ln = i + 1;
      if (!line) return;
      var p = line.match(/^print\s*\((.*)\)$/);
      if (p) { out.push(p[1].trim() === '' ? '' : String(ev(p[1], ln))); return; }
      var a = line.match(/^([A-Za-z_]\w*)\s*=\s*(.+)$/);
      if (a) { vars[a[1]] = ev(a[2], ln); return; }
      if (/^print\b/.test(line)) throw new Error(ln + '-qator: print dan keyin qavs kerak: print(...)');
      throw new Error(ln + '-qator: “' + line + '” ni tushunmadim');
    });
    return out.join('\n');
  }

  SCREENS.contests = function () {
    return head('Tanlovlar') + '<div class="ym-body">' +
      '<button class="ym-link ym-card" data-go="league" style="background:#141B34;color:#fff;border:none"><div class="ym-row"><div class="ym-grow ym-col" style="gap:2px"><span style="font-size:12px;opacity:.8">Mavsum reytingi 2026/27</span><strong style="font:700 22px var(--display)">' + rank() + '-oʻrin</strong><span style="font-size:13px;opacity:.85">' + S.points + ' ball · eng yaxshi 12% finalga chiqadi</span></div><span style="color:#F2A20C">' + I.cup + '</span></div></button>' +
      '<button class="ym-link ym-card" data-go="practice" style="border:2px dashed #3355FF"><div class="ym-row"><div class="ym-grow"><strong>Bepul mashq testi</strong><div class="ym-small">5 savol · 60 soniya · ball reytingga qoʻshiladi</div></div><span class="ym-pill blue">' + (S.practiceBest ? 'Rekord ' + S.practiceBest + '/5' : 'Boshlash') + '</span></div></button>' +
      '<p class="ym-h2">Dekabr bosqichi · 19–27-dekabr</p>' +
      CONTESTS.map(function (c) {
        var st = S.registered[c.id];
        var pill = st === 'ok' ? '<span class="ym-pill green">Roʻyxatdasiz</span>' : st === 'wait' ? '<span class="ym-pill coin">Ota-ona tasdigʻi</span>' : '<span class="ym-pill">Ochiq</span>';
        return '<button class="ym-link ym-card" data-go="contest:' + c.id + '"><div class="ym-row"><div class="ym-grow"><strong>' + c.title + '</strong><div class="ym-small">' + c.kind + '</div></div>' + pill + '</div></button>';
      }).join('') +
      '<p class="ym-small" style="margin:0">Final 26-dekabr, taqdirlash 27-dekabr. QR-kodli sertifikat.</p></div>';
  };

  SCREENS.contest = function (id) {
    var c = CONTESTS.filter(function (x) { return x.id === id; })[0], st = S.registered[id];
    var action = st === 'ok' ? '<div class="ym-card ym-row" style="background:#DDF3E8;border:none;color:#1E6B45">' + I.shield + '<strong class="ym-grow">Siz roʻyxatdan oʻtdingiz. Test kuni eslatma keladi.</strong></div><button class="ym-btn ghost" data-go="practice">Mashq qilish</button>'
      : st === 'wait' ? '<div class="ym-card ym-col" style="background:#FFF3D6;border:none;color:#6B4400"><strong>Ota-onangiz tasdigʻi kutilmoqda</strong><span style="font-size:13px">Soʻrov ota-ona kabinetiga yuborildi. Tasdiqlangandan keyin roʻyxatdan oʻtasiz.</span></div><button class="ym-btn green" data-go="parent">Ota-ona kabineti (demo)</button>'
      : '<button class="ym-btn" data-act="register:' + id + '">Roʻyxatdan oʻtish · ' + sum(c.fee) + '</button><span class="ym-small" style="text-align:center">Toʻlovni ota-onangiz tasdiqlaydi. Maktab orqali pul yigʻilmaydi.</span>';
    return head(c.title) + '<div class="ym-body">' +
      '<div class="ym-card ym-col" style="gap:8px"><span class="ym-pill blue" style="align-self:flex-start">Dekabr bosqichi</span><strong style="font:700 20px var(--display)">' + c.title + '</strong><span class="ym-muted">' + c.kind + '</span></div>' +
      '<div class="ym-card ym-col" style="gap:6px"><strong>Mukofotlar</strong><span class="ym-muted">1–3-oʻrin: diplom, sovgʻa va xalqaro bosqichga yoʻllanma uchun ball. Barcha qatnashchilar: QR-kodli sertifikat va +50 tanga.</span></div>' +
      '<div class="ym-card ym-col" style="gap:6px"><strong>Qoidalar</strong><span class="ym-muted">Test bir marta topshiriladi. Kamera talab qilinmaydi. Natija 24 soat ichida chiqadi.</span></div>' +
      action + '</div>';
  };

  SCREENS.practice = function () {
    if (tmp.i == null) { tmp.i = 0; tmp.score = 0; tmp.left = 60; tmp.ans = null; }
    if (tmp.i >= PRACTICE.length || tmp.left <= 0) {
      stopTimer();
      if (!tmp.saved) {
        tmp.saved = true;
        var gained = Math.max(0, tmp.score - S.practiceBest) * 12;
        if (tmp.score > S.practiceBest) { S.practiceBest = tmp.score; S.points += gained; }
        tmp.gained = gained;
        if (tmp.score > 0) addCoins(tmp.score * 2, 'mashq testi'); else save();
      }
      return head('Mashq testi') + '<div class="ym-body"><div style="flex:1"></div><div class="ym-col" style="text-align:center;gap:6px"><div style="font:700 48px var(--display)">' + tmp.score + '/5</div><strong>' + (tmp.left <= 0 ? 'Vaqt tugadi' : 'Test tugadi') + '</strong><span class="ym-muted">' + (tmp.gained ? 'Reytingga +' + tmp.gained + ' ball. Yangi oʻrin: ' + rank() : 'Rekordni yangilash uchun yana urinib koʻring') + '</span></div><div style="flex:1"></div>' +
        '<button class="ym-btn" data-act="again">Yana bir bor</button><button class="ym-btn ghost" data-go="league">Reytingni koʻrish</button></div>';
    }
    startTimer();
    var q = PRACTICE[tmp.i], answered = tmp.ans != null;
    return head('Mashq testi', { right: '<span class="ym-pill ' + (tmp.left <= 10 ? 'red' : 'blue') + '" id="timer">' + tmp.left + ' s</span>', noCoin: true }) +
      '<div class="ym-body"><div class="ym-progress"><b style="width:' + (tmp.i / PRACTICE.length * 100) + '%"></b></div><span class="ym-small">' + (tmp.i + 1) + '-savol / 5</span>' +
      '<strong style="font:700 22px var(--display)">' + q.q + '</strong>' +
      q.opts.map(function (o, i) {
        var cls = answered ? (i === q.a ? ' ok' : (i === tmp.ans ? ' bad' : '')) : '';
        return '<button class="ym-opt' + cls + '" data-act="pans:' + i + '"' + (answered ? ' disabled' : '') + '>' + o + '</button>';
      }).join('') + '</div>';
  };
  var timerId = null;
  function startTimer() {
    if (timerId) return;
    timerId = setInterval(function () {
      if (cur().name !== 'practice') { stopTimer(); return; }
      tmp.left--;
      var t = document.getElementById('timer');
      if (tmp.left <= 0) { render(); return; }
      if (t) { t.textContent = tmp.left + ' s'; if (tmp.left <= 10) t.className = 'ym-pill red'; }
    }, 1000);
  }
  function stopTimer() { clearInterval(timerId); timerId = null; }

  SCREENS.league = function () {
    var me = { n: 'Aziz (siz) · Toshkent vil.', p: S.points, me: true };
    var all = RIVALS.concat(S.points > 544 ? [me] : []).sort(function (a, b) { return b.p - a.p; });
    var rows = all.map(function (r, i) { return '<div class="ym-rank' + (r.me ? ' me' : '') + '"><b style="width:28px">' + (i + 1) + '</b><span class="ym-grow">' + r.n + '</span><span>' + r.p + '</span></div>'; }).join('');
    if (S.points <= 544) rows += '<div class="ym-rank" style="justify-content:center;color:#5A6380">· · ·</div><div class="ym-rank me"><b style="width:28px">' + rank() + '</b><span class="ym-grow">' + me.n + '</span><span>' + S.points + '</span></div>';
    var toFinal = Math.max(0, 470 - S.points);
    return head('Oʻrta liga') + '<div class="ym-body">' +
      '<div class="ym-card ym-col" style="gap:8px"><strong>Yoʻl: maktab → viloyat → respublika → xalqaro</strong><div class="ym-progress"><b style="width:' + Math.min(100, S.points / 470 * 100) + '%"></b></div><span class="ym-small">' + (toFinal ? 'Respublika finaliga ' + toFinal + ' ball qoldi' : 'Siz finalga chiqish zonasidasiz!') + '</span></div>' +
      '<div class="ym-card" style="padding-block:4px"><p class="ym-h2" style="margin:10px 0 4px">Mavsum reytingi · 1 060 qatnashchi</p>' + rows + '</div>' +
      '<button class="ym-btn" data-go="practice">Ball yigʻish: mashq testi</button></div>';
  };

  SCREENS.comics = function () {
    return head('Komiks va missiyalar') + '<div class="ym-body">' +
      '<div class="ym-card ym-row" style="background:#FDE2E3;border:none"><svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true"><circle cx="20" cy="22" r="12" fill="#8A3A06"/><circle cx="20" cy="25" r="9" fill="#F6C9A0"/><rect x="32" y="16" width="20" height="22" rx="5" fill="#3355FF"/><circle cx="38" cy="26" r="2.5" fill="#fff"/><circle cx="46" cy="26" r="2.5" fill="#fff"/><path d="M42 10v6" stroke="#141B34" stroke-width="2"/><circle cx="42" cy="9" r="2.5" fill="#F2A20C"/></svg><div class="ym-grow"><strong>Zarina va robot Bolt</strong><div class="ym-small" style="color:#7A2F38">Har bir qism oxirida missiya. Missiyani bajarsangiz keyingi qism ochiladi.</div></div></div>' +
      EPISODES.map(function (e, i) {
        var open = !e.locked && (i === 0 || S.comicDone.indexOf(EPISODES[i - 1].id) >= 0), done = S.comicDone.indexOf(e.id) >= 0;
        var pill = done ? '<span class="ym-pill green">Bajarildi</span>' : open ? '<span class="ym-pill coin">+' + e.reward + '</span>' : '<span class="ym-pill">' + I.lock + '</span>';
        return open ? '<button class="ym-link ym-card" data-go="episode:' + e.id + '"><div class="ym-row"><strong class="ym-grow">' + e.title + '</strong>' + pill + '</div></button>'
          : '<div class="ym-card ym-row" style="opacity:.6"><strong class="ym-grow">' + e.title + '</strong>' + pill + '</div>';
      }).join('') + '<p class="ym-small" style="margin:0">Personajlar platformaning oʻz qahramonlari.</p></div>';
  };

  function figure(who) {
    return who === 'Bolt'
      ? '<svg width="70" height="80" viewBox="0 0 70 80" aria-hidden="true" style="position:absolute;right:10px;bottom:0"><rect x="12" y="18" width="46" height="40" rx="10" fill="#3355FF"/><circle cx="27" cy="36" r="5" fill="#fff"/><circle cx="43" cy="36" r="5" fill="#fff"/><circle cx="27" cy="36" r="2" fill="#141B34"/><circle cx="43" cy="36" r="2" fill="#141B34"/><path d="M35 6v12" stroke="#141B34" stroke-width="3"/><circle cx="35" cy="6" r="4" fill="#F2A20C"/><rect x="18" y="58" width="34" height="22" rx="6" fill="#1F3BD1"/></svg>'
      : '<svg width="70" height="84" viewBox="0 0 70 84" aria-hidden="true" style="position:absolute;right:10px;bottom:0"><circle cx="35" cy="28" r="20" fill="#8A3A06"/><circle cx="35" cy="33" r="15" fill="#F6C9A0"/><circle cx="29" cy="32" r="2" fill="#141B34"/><circle cx="41" cy="32" r="2" fill="#141B34"/><path d="M30 40q5 4 10 0" stroke="#141B34" stroke-width="2" fill="none"/><path d="M12 84q0-30 23-30t23 30z" fill="#E0353B"/></svg>';
  }

  SCREENS.episode = function (id) {
    var e = EPISODES.filter(function (x) { return x.id === id; })[0], done = S.comicDone.indexOf(id) >= 0, m = e.mission;
    var answered = tmp.ans != null, ok = answered && tmp.ans === m.a;
    return head(e.title) + '<div class="ym-body">' +
      e.panels.map(function (p) { return '<div class="ym-panel" style="background:' + p.bg + '"><span class="ym-small" style="font-weight:700;color:#141B34">' + p.who + '</span><div class="ym-bubble">' + p.text + '</div><div style="height:50px"></div>' + figure(p.who) + '</div>'; }).join('') +
      '<div class="ym-card ym-col" style="gap:8px;border:2px solid #F2A20C"><span class="ym-pill coin" style="align-self:flex-start">Missiya · +' + e.reward + ' tanga</span><strong>' + m.q + '</strong>' +
      (done && !answered ? '<span class="ym-pill green" style="align-self:flex-start">Bajarilgan</span>' :
        m.opts.map(function (o, i) {
          var cls = answered ? (i === m.a ? ' ok' : (i === tmp.ans ? ' bad' : '')) : '';
          return '<button class="ym-opt' + cls + '" data-act="mans:' + id + ':' + i + '"' + (answered && ok ? ' disabled' : '') + '>' + o + '</button>';
        }).join('')) +
      (answered && !ok ? '<span class="ym-small" style="color:#A3191E">Yana urinib koʻring</span>' : '') +
      (ok ? '<button class="ym-btn" data-act="back">' + (id === 'e1' ? 'Keyingi qism ochildi' : 'Komikslarga qaytish') + '</button>' : '') + '</div></div>';
  };

  SCREENS.shop = function () {
    var t = tmp.t || 'works';
    var list = t === 'works'
      ? SHOP.map(function (p) {
          var mine = S.bought.indexOf(p.id) >= 0, wait = S.pending.some(function (x) { return x.ref === p.id; });
          return '<button class="ym-link ym-card" data-go="product:' + p.id + '"><div class="ym-row"><div class="ym-tile" style="width:64px;background:' + p.color + ';color:' + p.ink + '"></div><div class="ym-grow ym-col" style="gap:2px"><strong>' + p.title + '</strong><span class="ym-small">' + p.by + '</span><span style="font-weight:700">' + sum(p.price) + '</span></div>' +
            (mine ? '<span class="ym-pill green">Sizda</span>' : wait ? '<span class="ym-pill coin">Kutilmoqda</span>' : I.chev) + '</div></button>';
        }).join('')
      : REWARDS.map(function (r) {
          var mine = S.bought.indexOf(r.id) >= 0;
          return '<div class="ym-card ym-row"><div class="ym-tile" style="width:56px;background:' + r.color + ';color:' + r.ink + '"></div><div class="ym-grow ym-col" style="gap:2px"><strong>' + r.title + '</strong><span class="ym-pill coin" style="align-self:flex-start">' + r.cost + ' tanga</span></div>' +
            (mine ? '<span class="ym-pill green">Sizda</span>' : '<button class="ym-btn coin sm" data-act="redeem:' + r.id + '"' + (S.coins < r.cost ? ' disabled style="background:#E9ECF3;color:#5A6380"' : '') + '>Olish</button>') + '</div>';
        }).join('') + '<p class="ym-small" style="margin:0">Tangalar faqat oʻqish va tanlovlar uchun beriladi. Ularni pulga sotib olib boʻlmaydi.</p>';
    return head('Doʻkon') + '<div class="ym-body"><div class="ym-tabs"><button class="' + (t === 'works' ? 'on' : '') + '" data-act="stab:works">Oʻquvchilar ishlari</button><button class="' + (t === 'coins' ? 'on' : '') + '" data-act="stab:coins">Tanga uchun</button></div>' + list + '</div>';
  };

  SCREENS.product = function (id) {
    var p = SHOP.filter(function (x) { return x.id === id; })[0];
    var mine = S.bought.indexOf(id) >= 0, wait = S.pending.some(function (x) { return x.ref === id; });
    var fee = Math.round(p.price * 0.12);
    return head('Mahsulot') + '<div class="ym-body">' +
      '<div class="ym-thumb" style="height:190px;background:' + p.color + ';color:' + p.ink + ';font-size:16px">' + p.title + '</div>' +
      '<div class="ym-col"><strong style="font:700 18px var(--display)">' + p.title + '</strong><span class="ym-muted">' + p.by + ' · ' + p.kind + '</span></div>' +
      '<div class="ym-card ym-col" style="gap:6px"><div class="ym-row"><span class="ym-grow ym-muted">Narx</span><strong>' + sum(p.price) + '</strong></div><div class="ym-row"><span class="ym-grow ym-muted">Muallifga</span><span>' + sum(p.price - fee) + '</span></div><div class="ym-row"><span class="ym-grow ym-muted">Platforma komissiyasi 12%</span><span>' + sum(fee) + '</span></div></div>' +
      (mine ? '<div class="ym-card" style="background:#DDF3E8;border:none;color:#1E6B45;font-weight:700">Xarid tasdiqlandi. Muallif xabardor qilindi.</div>'
        : wait ? '<div class="ym-card" style="background:#FFF3D6;border:none;color:#6B4400"><strong>Ota-ona tasdigʻi kutilmoqda</strong></div><button class="ym-btn green" data-go="parent">Ota-ona kabineti (demo)</button>'
        : '<button class="ym-btn" data-act="buy:' + id + '">Sotib olish · ota-ona tasdigʻi bilan</button>') + '</div>';
  };

  SCREENS.profile = function () {
    var lessons = Object.keys(S.lessons).length, certs = 2 + Object.keys(S.registered).filter(function (k) { return S.registered[k] === 'ok'; }).length;
    var base = [['Logotip', '#DCE7FF', '#1F3BD1'], ['Afisha', '#FFE6D5', '#8A3A06'], ['Stiker toʻplami', '#DDF3E8', '#1E6B45'], ['Brendbuk', '#F3E3F5', '#7A2F84'], ['Karton robot', '#FDE2E3', '#A3191E'], ['Sertifikat', '#E9ECF3', '#3A4466']];
    var tiles = S.myWorks.slice().reverse().map(function (w) { return '<div class="ym-tile" style="background:#E6EBFF;color:#1F3BD1;outline:2px solid #3355FF">' + esc(w.title) + '</div>'; })
      .concat(base.map(function (b) { return '<div class="ym-tile" style="background:' + b[1] + ';color:' + b[2] + '">' + b[0] + '</div>'; }));
    var badges = ['Birinchi sotuv', 'Noyabr: mantiq finalisti'];
    if (lessons) badges.push(lessons + ' ta dars');
    if (S.comicDone.length) badges.push('Komiks: ' + S.comicDone.length + ' missiya');
    if (S.practiceBest === 5) badges.push('Mashq: 5/5');
    return head('Profil') + '<div class="ym-body">' +
      '<div class="ym-row" style="gap:14px"><div class="ym-ava" style="width:68px;height:68px;border-radius:22px;background:#3355FF;font:700 22px var(--display)">AZ</div><div class="ym-col ym-grow" style="gap:2px"><strong style="font:700 19px var(--display)">Aziz</strong><span class="ym-muted">14 yosh · Toshkent viloyati</span><span class="ym-pill blue" style="align-self:flex-start;margin-top:4px">' + level() + '-daraja · ' + S.xp + ' XP</span></div></div>' +
      '<div class="ym-grid3"><div class="ym-stat"><strong>' + (6 + S.myWorks.length) + '</strong><span class="ym-small">loyiha</span></div><div class="ym-stat"><strong>' + certs + '</strong><span class="ym-small">sertifikat</span></div><div class="ym-stat" style="background:#FFF3D6;border:none;color:#6B4400"><strong>' + S.coins + '</strong><span style="font-size:12px">tanga</span></div></div>' +
      '<p class="ym-h2">Yutuqlar</p><div class="ym-row" style="flex-wrap:wrap;gap:6px">' + badges.map(function (b) { return '<span class="ym-pill" style="background:#fff;border:1px solid #E2E6F0;padding:6px 12px">' + b + '</span>'; }).join('') + '</div>' +
      '<div class="ym-row"><p class="ym-h2 ym-grow">Portfolio</p><button class="ym-btn sm" data-go="upload">+ Ish joylash</button></div><div class="ym-grid3">' + tiles.join('') + '</div>' +
      '<div class="ym-row"><button class="ym-btn dark" data-act="share">Portfolioni ulashish</button><button class="ym-btn coin" data-go="invite">Doʻstni taklif qil</button></div>' +
      '<button class="ym-link ym-card ym-row" data-go="parent" style="background:#DDF3E8;border:none;color:#1E6B45;font-weight:600">' + I.shield + '<span class="ym-grow">Ota-ona nazorati yoqilgan</span>' + (S.pending.length ? '<span class="ym-pill coin">' + S.pending.length + '</span>' : '') + I.chev + '</button>' +
      '</div>';
  };

  SCREENS.upload = function () {
    return head('Ish joylash') + '<form class="ym-body" id="uploadForm">' +
      '<label class="ym-label" for="upTitle">Ish nomi</label><input class="ym-input" id="upTitle" required maxlength="40" placeholder="Masalan: Qogʻoz samolyot">' +
      '<label class="ym-label" for="upCat">Yoʻnalish</label><select class="ym-select" id="upCat"><option>Dizayn</option><option>Dasturlash</option><option>Robototexnika</option><option>Komiks va rasm</option></select>' +
      '<label class="ym-label" for="upText">Qanday qildingiz?</label><textarea class="ym-input" id="upText" style="height:90px;padding:10px 12px" maxlength="200" placeholder="Qisqacha yozing"></textarea>' +
      '<label class="ym-label" for="upFile">Rasm yoki video (ixtiyoriy)</label><input id="upFile" type="file" accept="image/*,video/*" style="font-size:13px">' +
      '<div class="ym-card ym-row" style="background:#E6EBFF;border:none;color:#1F3BD1;font-size:13px">' + I.shield + '<span>Har bir ish moderator tekshiruvidan keyin chiqadi. Yuz, maktab va manzilni koʻrsatmang.</span></div>' +
      '<button class="ym-btn" type="submit">Joylash · +10 tanga</button></form>';
  };

  SCREENS.parent = function () {
    var lessons = Object.keys(S.lessons).length;
    return head('Ota-ona kabineti', { noCoin: true, style: 'background:#DDF3E8' }) + '<div class="ym-body">' +
      '<div class="ym-card ym-col" style="gap:4px"><span class="ym-small">Farzandingiz</span><strong style="font-size:16px">Aziz · ' + level() + '-daraja</strong><span class="ym-muted">Bu hafta: ' + lessons + ' dars, ' + S.comicDone.length + ' missiya, reyting ' + rank() + '-oʻrin</span></div>' +
      '<p class="ym-h2">Tasdiqlash kutilmoqda</p>' +
      (S.pending.length ? S.pending.map(function (p, i) {
        return '<div class="ym-card ym-col" style="gap:10px"><div class="ym-row"><div class="ym-grow ym-col" style="gap:2px"><strong>' + p.title + '</strong><span class="ym-small">' + (p.type === 'contest' ? 'Tanlov uchun toʻlov' : 'Doʻkondan xarid') + ' · Click / Payme</span></div><strong>' + sum(p.amount) + '</strong></div>' +
          '<div class="ym-row"><button class="ym-btn ghost sm" style="flex:1" data-act="deny:' + i + '">Rad etish</button><button class="ym-btn green sm" style="flex:1" data-act="approve:' + i + '">Tasdiqlash va toʻlash</button></div></div>';
      }).join('') : '<div class="ym-card ym-muted">Hozircha soʻrov yoʻq. Farzandingiz tanlovga yozilsa yoki xarid qilsa, shu yerda koʻrinadi.</div>') +
      '<p class="ym-h2">Ekran vaqti</p><div class="ym-card ym-col" style="gap:8px"><div class="ym-row"><span class="ym-grow">Kunlik limit</span><strong id="limitVal">' + S.limit + ' daqiqa</strong></div><input type="range" id="limit" min="30" max="120" step="15" value="' + S.limit + '" aria-label="Kunlik limit"><span class="ym-small">Bugun ishlatildi: ' + S.minutes + ' daqiqa</span></div>' +
      '<p class="ym-h2">Xavfsizlik</p><div class="ym-card ym-col" style="gap:12px">' +
      sw('dm', 'Notanish odamlar bilan shaxsiy xabarlar', 'MVP’da umuman yoʻq') + sw('shopConfirm', 'Har bir xarid uchun tasdiq', 'Tavsiya etiladi') + sw('night', '22:00 dan keyin ilova yopiladi', 'Uyqu rejimi') + '</div>' +
      '<p class="ym-small" style="margin:0">Demo: haqiqiy toʻlov amalga oshmaydi.</p></div>';
  };
  function sw(k, t, s) { return '<div class="ym-row"><div class="ym-grow ym-col" style="gap:1px"><span>' + t + '</span><span class="ym-small">' + s + '</span></div><button class="ym-switch' + (S.safe[k] ? ' on' : '') + '" data-act="sw:' + k + '" role="switch" aria-checked="' + !!S.safe[k] + '" aria-label="' + t + '"></button></div>'; }

  SCREENS.invite = function () {
    var link = 'yoshmuhandis.uz/t/AZ128';
    return head('Doʻstni taklif qil') + '<div class="ym-body">' +
      '<div class="ym-card ym-col" style="background:#F2A20C;border:none;color:#2B1A00;gap:6px;padding:18px"><strong style="font:700 19px var(--display);line-height:1.25">+50 tanga senga, +50 doʻstingga</strong><span>Doʻsting birinchi missiyani bajarganda tushadi</span></div>' +
      '<label class="ym-label" for="invLink">Sizning havolangiz</label><input class="ym-input" id="invLink" readonly value="' + link + '">' +
      '<div class="ym-row"><a class="ym-btn" style="display:grid;place-items:center;text-decoration:none" href="https://t.me/share/url?url=' + encodeURIComponent('https://' + link) + '&text=' + encodeURIComponent('Yosh Muhandis’da birga oʻqiymiz!') + '" target="_blank" rel="noopener">Telegram’da yuborish</a><button class="ym-btn ghost" data-act="copy">Nusxalash</button></div>' +
      '<form class="ym-row" id="invForm"><label for="invName" class="sr" style="position:absolute;left:-9999px">Doʻst ismi</label><input class="ym-input" id="invName" placeholder="Doʻstingiz ismi" maxlength="20" required><button class="ym-btn sm" style="height:46px" type="submit">Qoʻshish</button></form>' +
      '<div class="ym-card" style="padding-block:4px"><p class="ym-h2" style="margin:10px 0 4px">Taklif qilinganlar · ' + S.invites.length + '</p>' +
      S.invites.map(function (v) { return '<div class="ym-rank"><span class="ym-grow">' + esc(v.name) + '</span>' + (v.st === 'ok' ? '<span class="ym-pill green">Qoʻshildi · +50</span>' : '<span class="ym-pill">Ota-ona roziligi kutilmoqda</span>') + '</div>'; }).join('') + '</div>' +
      '<p class="ym-small" style="margin:0">Taklif uchun pul berilmaydi, faqat tanga. Oyiga 10 tagacha taklif.</p></div>';
  };

  /* ---------- render ---------- */
  function render(resetScroll) {
    var c = cur(), screen = SCREENS[c.name](c.arg);
    var isRoot = stack.length === 1;
    var nav = isRoot ? '<nav class="ym-nav" aria-label="Asosiy menyu">' + TABS.map(function (t) {
      return '<button data-tab="' + t.id + '" class="' + (t.id === c.name ? 'on' : '') + '"' + (t.id === c.name ? ' aria-current="page"' : '') + '>' + t.icon + t.label + '</button>';
    }).join('') + '</nav>' : '';
    var prev = root.querySelector('.ym-body'), top = prev && !resetScroll ? prev.scrollTop : 0;
    root.innerHTML = '<div class="ym-status"><span>9:41</span><span>Yosh Muhandis</span></div>' + screen + nav + '<div class="ym-toast" role="status" aria-live="polite"></div>';
    var b = root.querySelector('.ym-body'); if (b) b.scrollTop = top;
    if (window.YMhook) window.YMhook(c.name);
  }

  function modal(title, text, okLabel, onOk) {
    var m = document.createElement('div');
    m.className = 'ym-modal';
    m.innerHTML = '<div class="ym-sheet" role="dialog" aria-modal="true" aria-label="' + esc(title) + '"><h3>' + title + '</h3><p class="ym-muted" style="margin:0;font-size:14px">' + text + '</p><button class="ym-btn" data-m="ok">' + okLabel + '</button><button class="ym-btn ghost" data-m="no">Bekor qilish</button></div>';
    root.appendChild(m);
    m.querySelector('[data-m=ok]').focus();
    m.addEventListener('click', function (e) {
      var k = e.target.getAttribute('data-m');
      if (k === 'ok') { m.remove(); onOk(); } else if (k === 'no' || e.target === m) m.remove();
    });
  }

  root.addEventListener('click', function (e) {
    var el = e.target.closest('[data-go],[data-tab],[data-act]');
    if (!el || !root.contains(el)) return;
    if (el.hasAttribute('data-tab')) { tab(el.getAttribute('data-tab')); return; }
    if (el.hasAttribute('data-go')) { var g = el.getAttribute('data-go').split(':'); go(g[0], g[1]); return; }
    var a = el.getAttribute('data-act').split(':'), act = a[0], c = cur();
    switch (act) {
      case 'back': back(); break;
      case 'like': S.likes[a[1]] = !S.likes[a[1]]; save(); render(); break;
      case 'next': tmp.step++; tmp.ans = null; render(true); break;
      case 'retry': tmp.ans = null; render(); break;
      case 'ans': tmp.ans = +a[1]; render(); break;
      case 'run':
        var src = document.getElementById('code').value; tmp.code = src;
        var l = findLesson(c.arg).l;
        try {
          var out = runPy(src); tmp.err = false;
          tmp.passed = out.trim() === l.code.expect;
          tmp.out = (out || '(hech narsa chiqmadi)') + (tmp.passed ? '\n\n✓ Toʻgʻri! Topshirishingiz mumkin.' : '\n\nKutilgan natija: ' + l.code.expect);
        } catch (err) { tmp.err = true; tmp.passed = false; tmp.out = err.message; }
        render(); break;
      case 'register':
        var ct = CONTESTS.filter(function (x) { return x.id === a[1]; })[0];
        modal('Ota-onaga soʻrov yuboriladi', ct.title + ' tanlovi, ' + sum(ct.fee) + '. Ota-onangiz Telegram’da tasdiqlaydi va Click yoki Payme orqali toʻlaydi.', 'Soʻrov yuborish', function () {
          S.registered[ct.id] = 'wait'; S.pending.push({ type: 'contest', ref: ct.id, title: ct.title + ' tanlovi', amount: ct.fee }); save(); render(); toast('Soʻrov ota-onangizga yuborildi');
        }); break;
      case 'buy':
        var p = SHOP.filter(function (x) { return x.id === a[1]; })[0];
        modal('Xarid uchun tasdiq', p.title + ', ' + sum(p.price) + '. Ota-onangiz tasdiqlagandan keyin muallifga xabar boradi.', 'Soʻrov yuborish', function () {
          S.pending.push({ type: 'shop', ref: p.id, title: p.title, amount: p.price }); save(); render(); toast('Soʻrov ota-onangizga yuborildi');
        }); break;
      case 'approve':
        var it = S.pending.splice(+a[1], 1)[0];
        if (it.type === 'contest') { S.registered[it.ref] = 'ok'; S.coins += 50; } else S.bought.push(it.ref);
        save(); render(); toast(it.type === 'contest' ? 'Toʻlandi. Aziz roʻyxatdan oʻtdi (+50 tanga)' : 'Toʻlandi. Xarid tasdiqlandi'); break;
      case 'deny':
        var d = S.pending.splice(+a[1], 1)[0];
        if (d.type === 'contest') delete S.registered[d.ref];
        save(); render(); toast('Soʻrov rad etildi'); break;
      case 'stab': tmp.t = a[1]; render(); break;
      case 'redeem':
        var r = REWARDS.filter(function (x) { return x.id === a[1]; })[0];
        if (S.coins >= r.cost) { S.coins -= r.cost; S.bought.push(r.id); save(); render(); toast(r.title + ' — sizniki!'); } break;
      case 'pans':
        if (tmp.ans != null) break;
        tmp.ans = +a[1]; if (tmp.ans === PRACTICE[tmp.i].a) tmp.score++;
        render();
        setTimeout(function () { if (cur().name === 'practice' && tmp.ans != null) { tmp.i++; tmp.ans = null; render(); } }, 700); break;
      case 'again': tmp = {}; render(true); break;
      case 'mans':
        var ep = EPISODES.filter(function (x) { return x.id === a[1]; })[0];
        tmp.ans = +a[2];
        if (tmp.ans === ep.mission.a && S.comicDone.indexOf(ep.id) < 0) { S.comicDone.push(ep.id); addCoins(ep.reward, 'missiya bajarildi'); }
        render(); break;
      case 'sw':
        if (a[1] === 'dm') { toast('MVP’da notanishlar bilan xabar almashish yoʻq'); break; }
        S.safe[a[1]] = !S.safe[a[1]]; save(); render(); break;
      case 'share': copyText('yoshmuhandis.uz/p/aziz', 'Portfolio havolasi nusxalandi'); break;
      case 'copy': copyText(document.getElementById('invLink').value, 'Havola nusxalandi'); break;
    }
  });

  function copyText(t, msg) {
    var done = function () { toast(msg); };
    try { navigator.clipboard.writeText(t).then(done, function () { toast(t); }); } catch (e) { toast(t); }
  }

  root.addEventListener('input', function (e) {
    if (e.target.id === 'limit') { S.limit = +e.target.value; save(); var v = document.getElementById('limitVal'); if (v) v.textContent = S.limit + ' daqiqa'; }
    if (e.target.id === 'code') tmp.code = e.target.value;
  });
  root.addEventListener('keydown', function (e) {
    if (e.target.id === 'code' && e.key === 'Tab') {
      e.preventDefault(); var t = e.target, s = t.selectionStart;
      t.value = t.value.slice(0, s) + '    ' + t.value.slice(t.selectionEnd); t.selectionStart = t.selectionEnd = s + 4;
    }
  });
  root.addEventListener('submit', function (e) {
    e.preventDefault();
    if (e.target.id === 'uploadForm') {
      var w = { title: document.getElementById('upTitle').value.trim(), cat: document.getElementById('upCat').value, text: document.getElementById('upText').value.trim(), ok: false };
      if (!w.title) return;
      S.myWorks.push(w); S.coins += 10; S.xp += 10; save();
      tab('feed'); toast('Ish yuborildi (+10 tanga). Moderator tekshiryapti…');
      var idx = S.myWorks.length - 1;
      setTimeout(function () { S.myWorks[idx].ok = true; save(); if (cur().name === 'feed' || cur().name === 'profile') render(); toast('Ishingiz tekshirildi va lentaga chiqdi'); }, 3500);
    }
    if (e.target.id === 'invForm') {
      var n = document.getElementById('invName').value.trim();
      if (!n) return;
      if (S.invites.length >= 10) { toast('Oyiga 10 tagacha taklif'); return; }
      S.invites.push({ name: n, st: 'wait' }); save(); render(); toast(n + ' ga taklif yuborildi');
    }
  });

  /* ---------- landing integration ---------- */
  var SCRIPT = [
    function () { tab('feed'); },
    function () { stack = [{ name: 'courses' }, { name: 'lesson', arg: 'py1' }]; tmp = {}; render(true); },
    function () { stack = [{ name: 'contests' }, { name: 'contest', arg: 'math' }]; tmp = {}; render(true); },
    function () { stack = [{ name: 'profile' }, { name: 'parent' }]; tmp = {}; render(true); },
    function () { stack = [{ name: 'comics' }, { name: 'episode', arg: 'e1' }]; tmp = {}; render(true); },
    function () { tab('shop'); },
    function () { stack = [{ name: 'feed' }, { name: 'upload' }]; tmp = {}; render(true); },
    function () { stack = [{ name: 'profile' }, { name: 'invite' }]; tmp = {}; render(true); }
  ];
  var stepIdx = 0;
  var stepBtns = document.querySelectorAll('[data-step]');
  function setStep(i) {
    stepIdx = (i + SCRIPT.length) % SCRIPT.length;
    SCRIPT[stepIdx]();
    stepBtns.forEach(function (b) { b.classList.toggle('on', +b.getAttribute('data-step') === stepIdx); });
    var lbl = document.getElementById('stepLabel'); if (lbl) lbl.textContent = 'Шаг ' + (stepIdx + 1) + ' из ' + SCRIPT.length;
    if (window.innerWidth <= 980 && !document.body.classList.contains('present')) document.getElementById('phone').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  stepBtns.forEach(function (b) { b.addEventListener('click', function () { setStep(+b.getAttribute('data-step')); }); });

  function on(id, fn) { var el = document.getElementById(id); if (el) el.addEventListener('click', fn); }
  on('presentBtn', function () { document.body.classList.add('present'); window.scrollTo(0, 0); setStep(0); });
  on('exitPresent', function () { document.body.classList.remove('present'); });
  on('nextStep', function () { setStep(stepIdx + 1); });
  on('prevStep', function () { setStep(stepIdx - 1); });
  on('resetBtn', function () { S = start(); save(); stack = [{ name: 'feed' }]; tmp = {}; stopTimer(); render(true); stepBtns.forEach(function (b) { b.classList.remove('on'); }); toast('Demo qaytadan boshlandi'); });
  document.addEventListener('keydown', function (e) {
    if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (!document.body.classList.contains('present')) return;
    if (e.key === 'ArrowRight') setStep(stepIdx + 1);
    if (e.key === 'ArrowLeft') setStep(stepIdx - 1);
    if (e.key === 'Escape') document.body.classList.remove('present');
  });

  render(true);
})();
