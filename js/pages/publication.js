// 研究業績JSONを取得する関数
async function fetchJson(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('研究業績データの取得に失敗しました:', error);
        return [];
    }
}

// 日付表示用関数（YYYY-MM-DD または YYYY-MM → YYYY.MM.DD / YYYY.MM）
function formatDateForDisplay(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-'); // YYYY, MM, DD に分解
    if (parts.length === 3) {
        return `${parts[0]}.${parts[1]}.${parts[2]}`;
    } else if (parts.length === 2) {
        return `${parts[0]}.${parts[1]}`;
    } else {
        return dateStr;
    }
}

function renderPublicationsByYear(publicationList, year, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    const filtered = publicationList
        .filter(item => item.date.startsWith(String(year)))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filtered.length === 0) {
        container.innerHTML = `<p>${year}年の研究業績はありません。</p>`;
        return;
    }

    filtered.forEach(item => {
        const authorsText = item.authors.join(', ');
        const formattedDate = formatDateForDisplay(item.date);

        const contentParts = [
            authorsText,
            item.title || '',
            item.venue || '',
            item.place || '',
            formattedDate || '',
            item.doi ? `doi: <a href="${item.url}" target="_blank">${item.doi}</a>`
                : (item.url ? `<a href="${item.url}" target="_blank">Link</a>` : ''),
            item.note || ''
        ].filter(part => part);

        const contentText = contentParts.join(', ');

        const cardHTML = `
            <div class="publication-card">
                <div class="publication-card-meta">
                    <span class="publication-card-category">${item.category}</span>
                </div>
                <p class="publication-card-content">${contentText}</p>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// ページ読み込み時処理
document.addEventListener('DOMContentLoaded', async () => {
    const publications = await fetchJson('data/publication.json');

    if (!publications.length) {
        const container = document.getElementById('publication-container-page');
        if (container) {
            container.innerHTML = '<p>研究業績データがありません。</p>';
        }
        return;
    }

    // 年リストを作成
    const yearsSet = new Set(publications.map(item => item.date.slice(0, 4)));
    const years = Array.from(yearsSet).sort((a, b) => b - a);

    // 年ボタンを生成
    const buttonsContainer = document.getElementById('publication-year-buttons');
    if (buttonsContainer) {
        years.forEach((year, index) => {
            const btn = document.createElement('button');
            btn.textContent = year;
            btn.classList.add('year-button');
            if (index === 0) btn.classList.add('active');
            buttonsContainer.appendChild(btn);
        });

        // クリック時の切り替え
        buttonsContainer.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') return;

            buttonsContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            renderPublicationsByYear(publications, e.target.textContent, 'publication-container-page');
        });
    }

    // 初期表示
    renderPublicationsByYear(publications, years[0], 'publication-container-page');
});