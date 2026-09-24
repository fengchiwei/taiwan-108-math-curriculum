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
  const card = document.createElement('li');
  card.className = 'clock-card';
  const title = document.createElement('h2');
  title.textContent = city;
  const zoneText = document.createElement('p');
  zoneText.className = 'clock-timezone';
  zoneText.textContent = timeZone;
  const dateNode = document.createElement('p');
  dateNode.className = 'clock-date';
  dateNode.dataset.role = 'date';
  dateNode.textContent = '--';
  const timeNode = document.createElement('p');
  timeNode.className = 'clock-time';
  timeNode.dataset.role = 'time';
  timeNode.textContent = '--:--:--';
  card.append(title, zoneText, dateNode, timeNode);
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

  clockItems.forEach(({ timeZone, dateNode, timeNode }) => {
    const { dateText, timeText } = formatDateTime(now, timeZone);
    dateNode.textContent = dateText;
    timeNode.textContent = timeText;
  });
}

let clockItems = [];

if (clockGrid) {
  clockItems = TIME_ZONES.map((item) => {
    const card = createClockCard(item);
    clockGrid.appendChild(card);
    return {
      timeZone: item.timeZone,
      dateNode: card.querySelector('[data-role="date"]'),
      timeNode: card.querySelector('[data-role="time"]')
    };
  });

  updateClocks();

  function scheduleNextUpdate() {
    const delay = 1000 - (Date.now() % 1000);
    setTimeout(() => {
      updateClocks();
      scheduleNextUpdate();
    }, delay);
  }

  scheduleNextUpdate();
}
