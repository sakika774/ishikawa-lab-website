// 研究情報を取得して表示する関数
async function fetchResearchData() {
    return await fetchJson('data/research.json');
}

function renderResearch(dataList) {
    const container = document.getElementById('research-container-page');
    if (!container) return;

    container.innerHTML = ''; // 内容クリア

    dataList.forEach(item => {
        const html = `
            <div class="research-item">
                <div class="research-meta">
                    <span class="research-category">${item.tag}</span>
                    <time class="research-period">${item.period}</time>
                </div>
                <h3 class="research-title">${item.title}</h3>
                <p>${item.funding}</p>
                <p>${item.representative}</p>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', html);
    });
}

// DOM読み込み時に研究情報を表示
document.addEventListener('DOMContentLoaded', async () => {
    const researchData = await fetchResearchData();
    renderResearch(researchData);
});