const clockGrid = document.querySelector('#clockGrid');

// 時區清單：可在此新增/移除城市。新增時只需追加一筆 { city, timeZone } 設定。
const TIME_ZONES = [
  { city: '台北', timeZone: 'Asia/Taipei' },
  { city: '紐約', timeZone: 'America/New_York' },
  { city: '倫敦', timeZone: 'Europe/London' },
  { city: '東京', timeZone: 'Asia/Tokyo' },
  { city: '雪梨', timeZone: 'Australia/Sydney' }
];

function createClockCard({ city, timeZone }) {
  const card = document.createElement('article');
  card.className = 'clock-card';
  card.dataset.timeZone = timeZone;
  card.innerHTML = `
    <h2>${city}</h2>
    <p class="clock-timezone">${timeZone}</p>
    <p class="clock-date" data-role="date">--</p>
    <p class="clock-time" data-role="time">--:--:--</p>
  `;
  return card;
}

function formatDateTime(currentTime, timeZone) {
  const dateText = new Intl.DateTimeFormat('zh-TW', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short'
  }).format(currentTime);

  const timeText = new Intl.DateTimeFormat('zh-TW', {
    timeZone,
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(currentTime);

  return { dateText, timeText };
}

function updateClocks() {
  const now = new Date();

  TIME_ZONES.forEach(({ timeZone }) => {
    const card = clockGrid.querySelector(`[data-time-zone="${timeZone}"]`);
    const { dateText, timeText } = formatDateTime(now, timeZone);
    card.querySelector('[data-role="date"]').textContent = dateText;
    card.querySelector('[data-role="time"]').textContent = timeText;
  });
}

TIME_ZONES.forEach((item) => {
  const card = createClockCard(item);
  card.setAttribute('data-time-zone', item.timeZone);
  clockGrid.appendChild(card);
});

updateClocks();
setInterval(updateClocks, 1000);
