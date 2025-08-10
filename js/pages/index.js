document.addEventListener('DOMContentLoaded', async function () {
    try {
        const newsList = await fetchJson('data/news.json');
        renderNews(newsList);
    } catch (error) {
        console.error('ニュースの読み込みに失敗しました:', error);
    }

    try {
        const publicationList = await fetchJson('data/publication.json');
        renderPublications(publicationList);
    } catch (error) {
        console.error('研究業績の読み込みに失敗しました:', error);
    }

    try {
        const memberList = await fetchJson('data/member.json');
        renderMembers(memberList);
    } catch (error) {
        console.error('メンバー情報の読み込みに失敗しました:', error);
    }
});



// --- Newsセクションのデータを表示 ---
function renderNews(newsList) {
    const container = document.getElementById('news-container-home');
    if (!container) return;

    //最新3件のデータのみを取得
    const latestNews = newsList.slice(0, 3);

    latestNews.forEach(item => {

        //リンクがある場合の準備   
        let linkHTML = '';
        if (item.link) { //リンクがある場合、リンク用のHTMLを作成
            linkHTML = `
                <a href="${item.link}" class="news-link" target="_blank" rel="noopener noreferrer">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M4 2L8 6L4 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>詳細はこちら</span>
                </a>
            `;
        }

        //jsonからニュースを表示する
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

        //コンテナに追加
        container.insertAdjacentHTML('beforeend', newsItemHTML);
    });
}



// --- Publicationセクションのデータを表示 ---
function renderPublications(publicationList) {
    const container = document.getElementById('publication-container-home');
    if (!container) return;

    //最新4件のデータのみを取得
    const latestPublications = publicationList.slice(0, 4);

    latestPublications.forEach(item => {
        const year = item.sort_date.substring(0, 4); //発表年のみを取り出す
        const authorsText = item.authors.join(', '); //関係者をまとめる

        //表示する情報をまとめる(空要素は除外)
        const contentParts = [authorsText, item.title, item.venue, item.note, item.citation];
        const validParts = contentParts.filter(part => part);
        const contentText = validParts.join(', ');

        const cardHTML = `
            <a href="publication.html" class="publication-card">
                <div class="publication-card-meta">
                    <span class="publication-card-year">${year}</span>
                    <span class="publication-card-category">${item.category}</span>
                </div>
                <div class="publication-card-content">
                    <p>${contentText}</p>
                </div>
            </a>
        `;

        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}



// --- memberセクションのデータを表示 ---
function renderMembers(memberList) {
    const container = document.getElementById('student-member-container-home');
    if (!container) return;

    const counts = { DC: 0, M2: 0, M1: 0, B4: 0, others: 0 }; //人数カウント用の変数

    memberList.forEach(member => {
        if (counts.hasOwnProperty(member.grade)) {
            counts[member.grade]++;
        } else {
            counts.others++;
        }
    });

    const cardHTML = `
        <div class="member-card">
            <span class="member-role">博士後期課程</span>
            <h4 class="member-name">${counts.DC}名</h4>
        </div>
        <div class="member-card">
            <span class="member-role">修士課程２年生</span>
            <h4 class="member-name">${counts.M2}名</h4>
        </div>
        <div class="member-card">
            <span class="member-role">修士課程1年生</span>
            <h4 class="member-name">${counts.M1}名</h4>
        </div>
        <div class="member-card">
            <span class="member-role">学部4年生</span>
            <h4 class="member-name">${counts.B4}名</h4>
        </div>
        <div class="member-card">
            <span class="member-role">その他</span>
            <h4 class="member-name">${counts.others}名</h4>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', cardHTML);
}