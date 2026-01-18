const grid = document.getElementById('grid');
const nameInput = document.getElementById('nameInput');
const eraInput = document.getElementById('eraInput');
const addBtn = document.getElementById('addBtn');

const KEY = 'jaemin_pocas_v1';

function load() {
  return JSON.parse(localStorage.getItem(KEY) || '[]');
}
function save(d) {
  localStorage.setItem(KEY, JSON.stringify(d));
}

function render() {
  const data = load();
  grid.innerHTML = '';
  data.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'card ' + (item.have ? '' : 'missing');

    // 클릭하면 있음/없음 토글 → 불투명 ↔ 원본
    card.onclick = (e) => {
      // 삭제 버튼 클릭은 제외
      if (e.target.classList.contains('del')) return;
      const all = load();
      all[idx].have = !all[idx].have;
      save(all);
      render();
    };

    const thumb = document.createElement('div');
    thumb.className = 'thumb';
    thumb.textContent = '💚';

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.innerHTML = `<div class="name">${item.name}</div><div class="era">${item.era || ''}</div>`;

    const del = document.createElement('button');
    del.className = 'del';
    del.textContent = '삭제';
    del.onclick = () => {
      const all = load();
      all.splice(idx, 1);
      save(all);
      render();
    };

    card.append(thumb, meta, del);
    grid.appendChild(card);
  });
}

addBtn.onclick = () => {
  const name = nameInput.value.trim();
  if (!name) return;
  const era = eraInput.value.trim();
  const data = load();
  data.push({ name, era, have: false });
  save(data);
  nameInput.value = '';
  eraInput.value = '';
  render();
};

render();
