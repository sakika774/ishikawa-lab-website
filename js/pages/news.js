// ニュースJSONを取得する関数
async function fetchJson(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('ニュースデータの取得に失敗しました:', error);
        return [];
    }
}

function renderNewsByYear(newsList, year, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ''; // 前の表示をクリア

    // 指定年のニュースのみ抽出し、日付降順でソート
    const filteredNews = newsList
        .filter(item => item.date.startsWith(String(year)))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filteredNews.length === 0) {
        container.innerHTML = `<p>${year}年のニュースはありません。</p>`;
        return;
    }

    filteredNews.forEach(item => {
        let linkHTML = '';
        if (item.link) {
            linkHTML = `
                <a href="${item.link}" class="news-link" target="_blank" rel="noopener noreferrer">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M4 2L8 6L4 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>詳細はこちら</span>
                </a>
            `;
        }

        const newsItemHTML = `
            <article class="news-item">
                <div class="news-meta">
                    <span class="news-category">${item.category}</span>
                    <time class="news-date">${item.date}</time>
                </div>
                <p class="news-content">${item.content}</p>
                ${linkHTML}
            </article>
        `;

        container.insertAdjacentHTML('beforeend', newsItemHTML);
    });
}

// ページ読み込み時処理
document.addEventListener('DOMContentLoaded', async () => {
    const newsData = await fetchJson('data/news.json');

    if (!newsData.length) {
        const container = document.getElementById('news-container-page');
        if (container) {
            container.innerHTML = '<p>ニュースデータがありません。</p>';
        }
        return;
    }

    // 年のリストを取得（例: 2021〜2025）
    const yearsSet = new Set(newsData.map(item => item.date.slice(0, 4)));
    const years = Array.from(yearsSet).sort((a, b) => b - a); // 降順ソート

    // 年ボタンを生成
    const buttonsContainer = document.getElementById('news-year-buttons');
    if (buttonsContainer) {
        years.forEach((year, index) => {
            const btn = document.createElement('button');
            btn.textContent = year;
            btn.classList.add('year-button');
            if (index === 0) btn.classList.add('active'); // 最新年にactive付与
            buttonsContainer.appendChild(btn);
        });

        // クリック時の処理
        buttonsContainer.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') return;

            // activeクラス切り替え
            buttonsContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            // クリックされた年のニュースを表示
            renderNewsByYear(newsData, e.target.textContent, 'news-container-page');
        });
    }

    // 初期表示は最新年のニュース
    renderNewsByYear(newsData, years[0], 'news-container-page');
});