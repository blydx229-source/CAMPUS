const $ = s => document.querySelector(s);
const content = $('#content');
let page = 'home';
let editing = false;

let openedMaterial = null;
let openedLesson = null, openedAnnouncement = null, openedAttendance = null;
let openedGrade = null, openedActivity = null;
const teacherName = 'Горбунов Олег Витальевич';
const lessonDetails = {
'Веб-разработка':['Создание и оформление веб-страниц','Создать HTML-страницу с заголовком, навигацией и основным содержимым. Оформить её с помощью CSS.'],
'Английский язык':['Техническая лексика в IT','Выучить 15 терминов по теме разработки сайтов и составить с ними 5 предложений на английском.'],
'Основы дизайна':['Композиция и визуальная иерархия','Подготовить два варианта композиции плаката и отметить главный визуальный акцент.'],
'Программирование':['Основы алгоритмов и программирования','Написать программу с условным оператором и циклом. Добавить комментарии.'],
'Математика':['Логика и решение задач','Решить задачи из конспекта и записать ход решения.'],
'История':['Исторический контекст','Подготовить краткий конспект по теме занятия.'],
'Дизайн':['Основы визуального языка','Подобрать три визуальных референса и объяснить выбор.'],
'Физкультура':['Общая физическая подготовка','Самостоятельно выполнить комплекс разминки.'],
'Практика':['Практическая работа по специальности','Завершить практическое задание и подготовить результат к проверке.']
};
const announcements = [
{title:'День открытых дверей',meta:'21 ноября · Актовый зал',body:'Колледж приглашает студентов и гостей на день открытых дверей. В программе — презентации специальностей, знакомство с преподавателями и учебными аудиториями. Место проведения: актовый зал. Начало в 12:00.'},
{title:'Изменение расписания',meta:'В пятницу третья пара переносится',body:'В пятницу третья пара переносится на 14:00. Перед началом учебного дня проверь обновлённое расписание и номер аудитории.'},
{title:'Конкурс проектов',meta:'Приём работ до 28 ноября',body:'Открыт приём студенческих проектов: сайты, приложения, дизайн-концепции и программные разработки. Подготовь краткое описание и приложи ссылку или демонстрационные материалы. Заявки принимаются до 28 ноября.'}
];

const gradeDetails = {
'Веб-разработка':[5,4,5,5,4],'Программирование':[4,5,4,4],
'Базы данных':[5,5,4,5,5],'Компьютерные сети':[4,4,5],
'Операционные системы':[5,4,5,5],'Алгоритмизация':[5,5,4,5],
'Информационная безопасность':[4,5,4],'Математика':[5,4,5,5,4],
'Английский язык':[4,5,4,4],'Проектирование интерфейсов':[5,5,4,5]
};
const activityDays = [
{day:'Понедельник',hours:3.5,lessons:2,details:'Веб-разработка — 2 часа; самостоятельная работа — 1,5 часа.'},
{day:'Вторник',hours:5,lessons:3,details:'Программирование — 2 часа; английский язык — 1,5 часа; самостоятельная работа — 1,5 часа.'},
{day:'Среда',hours:4,lessons:2,details:'Основы дизайна — 2 часа; работа над проектом — 2 часа.'},
{day:'Четверг',hours:6,lessons:4,details:'Веб-разработка — 1,5 часа; английский язык — 1,5 часа; дизайн — 1,5 часа; программирование — 1,5 часа.'},
{day:'Пятница',hours:3,lessons:2,details:'Математика — 1,5 часа; программирование — 1,5 часа.'},
{day:'Суббота',hours:1.5,lessons:0,details:'Самостоятельная работа над учебными материалами — 1,5 часа.'},
{day:'Воскресенье',hours:2,lessons:0,details:'Повторение материала и подготовка к занятиям — 2 часа.'}
];

const materials = [
{id:1,subject:'Веб-разработка',title:'Основы HTML и CSS',type:'Конспект',body:'HTML задаёт структуру веб-страницы, а CSS отвечает за её внешний вид. Основные элементы HTML: заголовки h1–h6, абзацы p, ссылки a, изображения img, списки ul и ol, формы form. Для подключения CSS используют тег link в секции head. В CSS правило состоит из селектора и блока объявлений. Практика: создай страницу с заголовком, текстом, изображением и оформи её с помощью CSS.'},
{id:2,subject:'Программирование',title:'Введение в Python',type:'Учебный материал',body:'Python — язык программирования с простым синтаксисом. Переменные создаются присваиванием: name = "Илья". Основные типы данных: int, float, str и bool. Условие записывается через if и else. Цикл for перебирает элементы последовательности, while выполняется, пока условие истинно. Функции объявляются ключевым словом def. Практика: напиши программу, которая запрашивает два числа и выводит их сумму.'},
{id:3,subject:'Базы данных',title:'Основы SQL и реляционных баз данных',type:'Методичка',body:'Реляционная база данных хранит информацию в таблицах. Таблица состоит из строк и столбцов. Первичный ключ (PRIMARY KEY) однозначно определяет запись, внешний ключ (FOREIGN KEY) связывает таблицы. Команда SELECT получает данные, INSERT добавляет записи, UPDATE изменяет их, DELETE удаляет. Практика: спроектируй таблицу студентов с полями id, name и group_name.'},
{id:4,subject:'Компьютерные сети',title:'Локальные сети и модель TCP/IP',type:'Конспект',body:'Компьютерная сеть объединяет устройства для обмена данными. Локальная сеть (LAN) обычно охватывает кабинет, здание или кампус. IP-адрес идентифицирует устройство в сети. Модель TCP/IP описывает передачу данных на нескольких уровнях: канальном, сетевом, транспортном и прикладном. DNS преобразует доменные имена в IP-адреса, DHCP автоматически выдаёт сетевые настройки. Практика: определи IP-адрес своего компьютера и шлюз по умолчанию.'},
{id:5,subject:'Операционные системы',title:'Файловая система и процессы',type:'Учебный материал',body:'Операционная система управляет ресурсами компьютера и обеспечивает взаимодействие пользователя с устройством. Файловая система определяет способ хранения файлов и папок. Процесс — выполняющаяся программа, а поток — последовательность выполнения внутри процесса. Операционная система распределяет процессорное время и оперативную память. Практика: создай структуру папок учебного проекта и опиши назначение каждой.'},
{id:6,subject:'Алгоритмизация',title:'Алгоритмы, блок-схемы и структуры',type:'Практическая работа',body:'Алгоритм — точная последовательность действий для решения задачи. Базовые структуры: следование, ветвление и цикл. В блок-схемах овал обозначает начало и конец, прямоугольник — действие, ромб — условие, параллелограмм — ввод или вывод данных. Перед программированием полезно описать входные данные, ожидаемый результат и шаги решения. Практика: составь блок-схему определения большего из двух чисел.'},
{id:7,subject:'Информационная безопасность',title:'Основы защиты информации',type:'Памятка',body:'Информационная безопасность направлена на защиту конфиденциальности, целостности и доступности данных. Используй уникальные сложные пароли и двухфакторную аутентификацию. Не открывай подозрительные вложения и проверяй адрес сайта перед вводом личных данных. Резервные копии помогают восстановить информацию после сбоя или атаки. Практика: составь список из пяти правил безопасной работы в интернете.'},
{id:8,subject:'Математика',title:'Логика и основы дискретной математики',type:'Конспект',body:'Математическая логика изучает высказывания и операции над ними. Основные операции: отрицание (НЕ), конъюнкция (И), дизъюнкция (ИЛИ) и импликация. Таблицы истинности показывают результат логической операции для всех комбинаций значений. Дискретная математика также включает множества, отношения, графы и комбинаторику. Практика: построй таблицы истинности для выражений A И B и A ИЛИ B.'},
{id:9,subject:'Английский язык',title:'IT English: базовая техническая лексика',type:'Словарь',body:'Полезные термины: hardware — оборудование, software — программное обеспечение, database — база данных, network — сеть, file — файл, folder — папка, user — пользователь, password — пароль, source code — исходный код, bug — ошибка программы. Практика: составь пять предложений на английском, используя эти слова.'},
{id:10,subject:'Проектирование интерфейсов',title:'Основы UX/UI-дизайна',type:'Учебный материал',body:'UX (User Experience) описывает опыт взаимодействия пользователя с продуктом, а UI (User Interface) — визуальный и интерактивный интерфейс. При проектировании важно учитывать задачу пользователя, понятную навигацию, читаемость, контраст и единообразие элементов. Прототип помогает проверить структуру до разработки. Практика: нарисуй схему экрана авторизации и проверь, понятно ли пользователю, что делать дальше.'}
];

let profile = {name:'Илья', group:'ИС-21', course:'2 курс', specialty:'Информационные системы', form:'Очная'};
let tasks = [
 {name:'Сверстать главную страницу сайта',date:'Сегодня',done:false},
 {name:'Подготовить презентацию по дизайну',date:'Завтра',done:false},
 {name:'Выполнить упражнения по английскому',date:'20 ноября',done:true},
 {name:'Сдать практическую работу',date:'22 ноября',done:false}
];
let notices = [
 {id:1,icon:'▦',title:'Изменение расписания',desc:'В пятницу третья пара переносится на 14:00.',date:'Сегодня · 09:30',read:false},
 {id:2,icon:'▤',title:'Новая оценка',desc:'По предмету «Веб-разработка» выставлена оценка 5.',date:'Сегодня · 08:45',read:false},
 {id:3,icon:'♢',title:'Объявление колледжа',desc:'21 ноября состоится день открытых дверей.',date:'Вчера · 15:20',read:false},
 {id:4,icon:'✓',title:'Напоминание о задании',desc:'Не забудь сдать практическую работу.',date:'Вчера · 12:00',read:true}
];
const titles = {home:'Доброе утро!',schedule:'Расписание',tasks:'Мои задания',grades:'Успеваемость',attendance:'Посещаемость',library:'Библиотека',chat:'Сообщения',notifications:'Уведомления',profile:'Мой профиль',activityDetail:'Учебная активность'};
const safe = s => (s === undefined || s === null || s === 'undefined' ? '' : String(s)).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const panel = (title,sub,body='') => `<div class="panel"><h2>${title ?? ''}</h2>${sub?`<p class="muted">${sub}</p>`:''}${body ?? ''}</div>`;
function toast(message){const t=$('#toast');t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
function updateBell(){const n=notices.filter(x=>!x.read).length;$('#bellDot').style.display=n?'block':'none';$('#sideCount').textContent=n?`(${n})`:''}
function go(p){page=p;editing=false;$('#pageTitle').textContent=titles[p];document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.page===p));render();window.scrollTo({top:0,behavior:'smooth'})}
function noticeRows(filter){return notices.filter(x=>filter==='all'||!x.read).map(x=>`<div class="notice ${x.read?'':'unread'}"><div class="notice-icon">${x.icon}</div><div class="notice-body"><div class="notice-top"><b>${safe(x.title)}</b><span class="notice-status ${x.read?'read':''}">${x.read?'Прочитано':'Новое'}</span></div><p class="muted">${safe(x.desc)}</p><p class="muted">${x.date}</p>${!x.read?`<button data-read="${x.id}">Отметить прочитанным</button>`:''}</div></div>`).join('')||'<p class="empty">Здесь пока нет уведомлений.</p>'}
function render(){
 if(page==='home'){
 content.innerHTML=`<div class="grid stats">${[['Средний балл','4.6','За семестр','grades'],['Занятия сегодня','4','Следующая пара в 11:40','schedule'],['Задания',tasks.filter(x=>!x.done).length,'Осталось выполнить','tasks'],['Посещаемость','94%','За семестр','attendance']].map(x=>`<button type="button" class="panel stat-card" data-page="${x[3]}" aria-label="Открыть раздел: ${x[0]}"><div class="muted">${x[0]}</div><div class="metric">${x[1]}</div><div class="muted">${x[2]}</div><span class="open-arrow">Открыть раздел →</span></button>`).join('')}</div>
 <div class="grid columns"><div class="panel"><div class="panel-head"><div><h2>Расписание на сегодня</h2><p class="muted">Твоя учебная программа</p></div><button class="link" data-page="schedule">Всё расписание →</button></div>${[['09:00','Веб-разработка','304'],['10:40','Английский язык','212'],['11:40','Основы дизайна','401'],['13:40','Программирование','305']].map(x=>`<button class="lesson lesson-click" data-lesson="${safe(x[1])}" data-time="${x[0]}" data-room="${x[2]}"><div class="time">${x[0]}</div><div class="lesson-info"><b>${x[1]}</b><div class="muted">Кабинет ${x[2]}</div></div><span class="open-arrow">Подробнее →</span></button>`).join('')}</div><div class="panel"><h2>Ближайшие задания</h2>${tasks.filter(x=>!x.done).slice(0,3).map(x=>`<div class="task-preview"><b>${safe(x.name)}</b><div class="muted">${x.date}</div></div>`).join('')}<button class="link" data-page="tasks">Все задания →</button></div></div>
 <div class="grid columns"><div class="panel"><h2>Объявления колледжа</h2>${announcements.map((a,i)=>`<button class="announcement announcement-click" data-announcement="${i}"><b>${safe(a.title)}</b><p class="muted">${safe(a.meta)}</p><span class="open-arrow">Открыть описание →</span></button>`).join("")}</div><div class="panel"><h2>Учебная активность</h2><p class="muted">Нажми на столбик, чтобы посмотреть часы и занятия</p><div class="bar-chart">${[55,78,64,90,48,25,35].map((h,i)=>`<button class="activity-bar" data-activity="${i}" style="height:${h}%" aria-label="${activityDays[i].day}: ${activityDays[i].hours} часа" title="${activityDays[i].day}: ${activityDays[i].hours} ч"></button>`).join('')}</div><div class="bar-labels"><span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span></div></div></div>
 <div class="panel"><div class="panel-head"><h2>Последние уведомления</h2><button class="link" data-page="notifications">Все уведомления →</button></div>${notices.filter(x=>!x.read).slice(0,2).map(x=>`<div class="notice unread"><div class="notice-icon">${x.icon}</div><div class="notice-body"><b>${x.title}</b><p class="muted">${x.desc}</p><p class="muted">${x.date}</p></div></div>`).join('')||'<p class="empty">Новых уведомлений нет.</p>'}</div>`;
 return;
 }
 if(page==='activityDetail'){
 const a=activityDays[openedActivity];
 content.innerHTML=panel(`<button class="link" id="backActivity">← На главную</button><h2 style="margin-top:14px">${safe(a.day)}</h2>`,`Подробная статистика учебной активности`,`<div class="grid stats"><div class="panel"><div class="metric">${a.hours}</div><div class="muted">Часов активности</div></div><div class="panel"><div class="metric">${a.lessons}</div><div class="muted">Учебных занятий</div></div></div><h3 style="margin-top:20px">Чем был занят день</h3><p class="muted" style="line-height:1.8">${safe(a.details)}</p>`);
 return;
 }
 if(page==='notifications'){
 content.innerHTML=panel('Центр уведомлений','Все важные события твоей учёбы',`<div class="panel-head" style="margin-top:18px"><span class="muted">Непрочитанных: <b style="color:#5967dc">${notices.filter(x=>!x.read).length}</b></span><button id="readAll" class="secondary">Прочитать все</button></div><div class="row" style="margin-bottom:15px"><button class="tabbtn selected" data-filter="all">Все</button><button class="tabbtn" data-filter="unread">Непрочитанные</button></div><div id="noticeList">${noticeRows('all')}</div>`);
 return;
 }
 if(page==='profile'){
 content.innerHTML=panel('Личный профиль','Информация о студенте',!editing?`<div class="profile-card"><div class="big-avatar">${safe(profile.name.charAt(0).toUpperCase())}</div><div><b style="font-size:18px">${safe(profile.name)}</b><div class="muted">Студент · ${safe(profile.group)}</div></div></div><div>${[['Группа',profile.group],['Специальность',profile.specialty],['Курс',profile.course],['Форма обучения',profile.form]].map(x=>`<div class="profile-line"><span>${x[0]}</span><b>${safe(x[1])}</b></div>`).join('')}</div><button id="edit" class="action" style="margin-top:22px">✎ Редактировать профиль</button>`:`<div class="form-grid" style="margin-top:20px"><label>Имя<input id="pname" class="field" value="${safe(profile.name)}"></label><label>Группа<input id="pgroup" class="field" value="${safe(profile.group)}" placeholder="Например, ИС-21"></label><label>Специальность<input id="pspecialty" class="field" value="${safe(profile.specialty)}"></label><label>Курс<select id="pcourse" class="field">${['1 курс','2 курс','3 курс','4 курс','5 курс','6 курс'].map(x=>`<option ${profile.course===x?'selected':''}>${x}</option>`).join('')}</select></label><label>Форма обучения<select id="pform" class="field">${['Очная','Очно-заочная','Заочная','Дистанционная'].map(x=>`<option ${profile.form===x?'selected':''}>${x}</option>`).join('')}</select></label><div class="row"><button id="save" class="action">Сохранить изменения</button><button id="cancel" class="secondary">Отмена</button></div></div>`);
 return;
 }
 if(page==='tasks'){
 content.innerHTML=panel('Список заданий','Отмечай выполненные работы и добавляй новые',`<div class="row" style="margin:18px 0"><input id="newTask" class="field" placeholder="Название нового задания"><button id="addTask" class="action">+ Добавить</button></div><div>${tasks.map((x,i)=>`<div class="profile-line"><label class="row" style="flex:1"><input type="checkbox" data-task="${i}" ${x.done?'checked':''}><span style="${x.done?'text-decoration:line-through;color:#999':''}">${safe(x.name)} <small class="muted">${x.date}</small></span></label><button data-delete="${i}" class="secondary">Удалить</button></div>`).join('')}</div><p class="muted">Выполнено: ${tasks.filter(x=>x.done).length} из ${tasks.length}</p>`);
 return;
 }
 if(page==='schedule'){
 const days=['Пн 16','Вт 17','Ср 18','Чт 19','Пт 20'];
 content.innerHTML=panel('Учебная неделя','Расписание занятий',`<div class="row" style="flex-wrap:wrap;margin:18px 0">${days.map((d,i)=>`<button class="tabbtn ${i===3?'selected':''}" data-day="${i}">${d}</button>`).join('')}</div><div id="dayList"></div>`);
 drawDay(3);return;
 }
 if(page==='grades'){
 const gradeRows=[['Веб-разработка','5','Отлично'],['Программирование','4','Хорошо'],['Базы данных','5','Отлично'],['Компьютерные сети','4','Хорошо'],['Операционные системы','5','Отлично'],['Алгоритмизация','5','Отлично'],['Информационная безопасность','4','Хорошо'],['Математика','5','Отлично'],['Английский язык','4','Хорошо'],['Проектирование интерфейсов','5','Отлично']];
 if(openedGrade){
   const marks=gradeDetails[openedGrade]||[4,5,4];
   const average=(marks.reduce((a,b)=>a+b,0)/marks.length).toFixed(1);
   content.innerHTML=panel(`<button class="link" id="backGrades">← Назад к успеваемости</button><h2 style="margin-top:14px">${safe(openedGrade)}</h2>`,`Оценки за семестр · ${marks.length} оценок`,`<div class="metric" style="color:#5967dc">${average}</div><p class="muted">Средний балл по предмету</p><div class="grade-mark-grid">${marks.map((m,i)=>`<div class="grade-mark"><b>${m}</b><span>Оценка ${i+1}</span><small>${['05.09','19.09','03.10','17.10','07.11'][i%5]}</small></div>`).join('')}</div><p class="muted">Всего оценок за семестр: ${marks.length}</p>`);
   return;
 }
 content.innerHTML=panel('Электронная зачётка','Оценки по профильным и общеобразовательным предметам',`<div class="metric" style="color:#5967dc">4.6</div><div class="muted" style="margin-bottom:12px">Средний балл за семестр</div>${gradeRows.map(x=>`<button class="profile-line grade-subject" data-grade="${safe(x[0])}"><div><b>${safe(x[0])}</b><div class="muted">Нажми, чтобы посмотреть оценки за семестр</div></div><div style="text-align:right"><b style="color:#5967dc;font-size:18px">${safe(x[1])}</b><div class="muted">${safe(x[2])}</div></div><span class="open-arrow">Открыть →</span></button>`).join('')}<p class="muted">Оценки демонстрационные — их можно заменить на реальные.</p>`);
 return;
 }
 if(page==='attendance'){if(openedAttendance!==null){const a=[{title:'Посещено',count:47,desc:'Всего посещено 47 занятий за семестр.',items:['Веб-разработка — 12 занятий','Английский язык — 10 занятий','Основы дизайна — 13 занятий','Программирование — 12 занятий']},{title:'Пропуски',count:2,desc:'За семестр зафиксировано 2 пропуска.',items:['Математика — 1 пропуск','Программирование — 1 пропуск']},{title:'Опоздания',count:1,desc:'За семестр зафиксировано 1 опоздание.',items:['Английский язык — 1 опоздание']}][openedAttendance];content.innerHTML=panel(`<button class="link" id="backAttendance">← Назад к посещаемости</button><h2 style="margin-top:14px">${a.title}</h2><div class="metric">${a.count}</div><p class="muted">${a.desc}</p>${a.items.map(x=>`<div class="profile-line">${safe(x)}</div>`).join('')}`);return}content.innerHTML=panel('Посещаемость','Статистика за семестр',`<div class="metric" style="color:#15966b">94%</div><div class="progress-track" style="background:#e8f2ed;height:10px"><div style="width:94%;height:100%;background:#36b88a;border-radius:10px"></div></div><div class="grid stats" style="margin-top:20px">${[['47','Посещено'],['2','Пропуски'],['1','Опоздания']].map((x,i)=>`<button class="panel attendance-card" data-attendance="${i}"><div class="metric">${x[0]}</div><div class="muted">${x[1]}</div><span class="open-arrow">Посмотреть →</span></button>`).join('')}</div><p class="muted">Нажми на показатель, чтобы открыть подробности.</p>`);return}
 if(page==='library'){if(openedMaterial){const m=materials.find(x=>x.id===openedMaterial);content.innerHTML=panel(`<button class="link" id="backLibrary">← Назад к библиотеке</button><h2 style="margin-top:16px">${m.title}</h2><p class="muted">${m.subject} · ${m.type}</p><div class="material-content">${m.body}</div><div class="announcement"><b>Практическое задание</b><p class="muted">${safe(m.body.split("Практика:").pop().trim())}</p></div>`);return}content.innerHTML=panel('Электронная библиотека','Материалы по дисциплинам IT-колледжа',`<input id="libSearch" class="field" style="margin:15px 0" placeholder="Поиск по предмету или названию..."><div class="library-hint">Выбери материал, чтобы открыть конспект, методичку или практическую работу.</div><div id="books">${materials.map(m=>`<div class="profile-line libitem"><div><b>${m.title}</b><div class="muted">${m.subject} · ${m.type}</div></div><button class="action" data-material="${m.id}">Открыть</button></div>`).join('')}</div>`);return}
 if(page==='chat'){content.innerHTML=panel('Групповой чат','Общение со студентами',`<div id="messages" class="message-list"><div class="message"><b>Аня</b><p>Ребята, кто записал домашнее задание?</p></div><div class="message mine"><b>${safe(profile.name)}</b><p>Сделать макет сайта к пятнице!</p></div></div><div class="row" style="margin-top:12px"><input id="msg" class="field" placeholder="Написать сообщение..."><button id="send" class="action">Отправить</button></div>`);return}
}
function drawDay(n){const sets=[[['09:00','Математика','201'],['10:40','Программирование','305'],['12:20','Физкультура','Зал'],['14:00','Английский язык','212']],[['09:00','История','204'],['10:40','Веб-разработка','304'],['12:20','Математика','201']],[['09:00','Английский язык','212'],['10:40','Дизайн','401'],['12:20','Программирование','305']],[['09:00','Веб-разработка','304'],['10:40','Английский язык','212'],['11:40','Основы дизайна','401'],['13:40','Программирование','305']],[['09:00','Математика','201'],['10:40','История','204'],['12:20','Практика','305']]];$('#dayList').innerHTML=sets[n].map(x=>`<button class="lesson lesson-click" data-lesson="${safe(x[1])}" data-time="${x[0]}" data-room="${x[2]}"><div class="time">${x[0]}</div><div class="lesson-info"><b>${x[1]}</b><div class="muted">Кабинет ${x[2]}</div></div><span class="open-arrow">Подробнее →</span></button>`).join('')}

document.addEventListener('click',e=>{
 const lesson=e.target.closest('[data-lesson]');
 if(lesson){const name=lesson.dataset.lesson,info=lessonDetails[name]||['Тема занятия','Выполнить практическую работу по теме урока.'];openedLesson={name,time:lesson.dataset.time,room:lesson.dataset.room,topic:info[0],homework:info[1]};content.innerHTML=panel(`<button class="link" id="backLessons">← Назад</button><h2 style="margin-top:14px">${safe(name)}</h2>`,`Занятие · ${safe(openedLesson.time)} · Кабинет ${safe(openedLesson.room)}`,`<div class="profile-line"><span>Преподаватель</span><b>${teacherName}</b></div><div class="profile-line"><span>Тема урока</span><b>${safe(openedLesson.topic)}</b></div><div style="margin-top:20px"><h3>Задание</h3><p class="muted" style="font-size:14px;line-height:1.7">${safe(openedLesson.homework)}</p></div>`);return}
 const grade=e.target.closest('[data-grade]');
 if(grade){openedGrade=grade.dataset.grade;render();return}
 if(e.target.id==='backGrades'){openedGrade=null;render();return}
 const activity=e.target.closest('[data-activity]');
 if(activity){openedActivity=Number(activity.dataset.activity);go('activityDetail');return}
 if(e.target.id==='backActivity'){go('home');return}
 const ann=e.target.closest('[data-announcement]');
 if(ann){const a=announcements[+ann.dataset.announcement];content.innerHTML=panel(`<button class="link" id="backHome">← На главную</button><h2 style="margin-top:14px">${safe(a.title)}</h2>`,`${safe(a.meta)}`,`<p style="font-size:14px;line-height:1.8;margin-top:20px">${safe(a.body)}</p>`);return}
 if(e.target.closest('[data-attendance]')){openedAttendance=+e.target.closest('[data-attendance]').dataset.attendance;render();return}
 if(e.target.id==='backAttendance'){openedAttendance=null;render();return}
 if(e.target.id==='backLessons'){openedLesson=null;go('home');return}
 if(e.target.id==='backHome'){openedAnnouncement=null;go('home');return}

 const nav=e.target.closest('[data-page]');if(nav){go(nav.dataset.page);return}
 if(e.target.id==='topBell'){go('notifications');return}
 if(e.target.dataset.material){openedMaterial=+e.target.dataset.material;render();return}
 if(e.target.id==='backLibrary'){openedMaterial=null;render();return}
 if(e.target.id==='edit'){editing=true;render()}
 if(e.target.id==='cancel'){editing=false;render()}
 if(e.target.id==='save'){const name=$('#pname').value.trim(),group=$('#pgroup').value.trim(),specialty=$('#pspecialty').value.trim();if(!name||!group||!specialty){toast('Заполни имя, группу и специальность');return}profile={name,group,specialty,course:$('#pcourse').value,form:$('#pform').value};$('#topName').textContent=name;editing=false;render();toast('Профиль обновлён');return}
 if(e.target.id==='readAll'){notices.forEach(x=>x.read=true);render();updateBell();toast('Все уведомления прочитаны')}
 if(e.target.dataset.read){const x=notices.find(n=>n.id===+e.target.dataset.read);if(x)x.read=true;render();updateBell()}
 if(e.target.dataset.filter){document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('selected'));e.target.classList.add('selected');$('#noticeList').innerHTML=noticeRows(e.target.dataset.filter)}
 if(e.target.id==='addTask'){const x=$('#newTask').value.trim();if(x){tasks.push({name:x,date:'Без срока',done:false});render()}}
 if(e.target.dataset.delete!==undefined){tasks.splice(+e.target.dataset.delete,1);render()}
 if(e.target.dataset.day!==undefined){document.querySelectorAll('[data-day]').forEach(x=>x.classList.remove('selected'));e.target.classList.add('selected');drawDay(+e.target.dataset.day)}
 if(e.target.id==='send'){const x=$('#msg').value.trim();if(x){$('#messages').insertAdjacentHTML('beforeend',`<div class="message mine"><b>${safe(profile.name)}</b><p>${safe(x)}</p></div>`);$('#msg').value='';$('#messages').scrollTop=$('#messages').scrollHeight}}
});
document.addEventListener('change',e=>{if(e.target.dataset.task!==undefined){tasks[+e.target.dataset.task].done=e.target.checked;render()}});
document.addEventListener('input',e=>{if(e.target.id==='libSearch'){const q=e.target.value.toLowerCase();document.querySelectorAll('.libitem').forEach(x=>x.style.display=x.textContent.toLowerCase().includes(q)?'flex':'none')}});
updateBell();go('home');
