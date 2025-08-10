// ページの読み込みが完了したら、処理を開始
document.addEventListener('DOMContentLoaded', function () {

    // news.jsonファイルを読み込む
    fetch('data/news.json')
        .then(response => {
            // 読み込みが成功したかチェック
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // データをJSON形式に変換
            return response.json();
        })
        .then(newsList => {
            // HTMLにニュースを表示する場所（要素）を取得
            const container = document.getElementById('news-container');

            // コンテナが見つからなければ、処理を中断
            if (!container) {
                return;
            }

            // 最新3件だけを取得
            const latestNews = newsList.slice(0, 3);



            latestNews.forEach(item => {
                // まずはリンク部分のHTMLを準備（最初は空）
                let linkHTML = '';

                // もしitem.linkが存在し、空文字列でなければ
                if (item.link) {
                    // リンク用のHTMLを作成する
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
        })
        .catch(error => {
            console.error('ニュースの読み込みに失敗しました:', error);
        });


    // --- Publicationセクションのデータを読み込む ---
    fetch('data/publication.json')
        .then(response => response.json())
        .then(publicationList => {
            const container = document.getElementById('publication-container');
            if (!container) return;

            // 最新4件だけを取得
            const latestPublications = publicationList.slice(0, 4);

            latestPublications.forEach(item => {
                const year = item.sort_date.substring(0, 4);
                const authorsText = item.authors.join(', ');

                // 表示する可能性のあるパーツを配列に準備
                const contentParts = [
                    authorsText,
                    item.title,
                    item.venue,
                    item.citation
                ];

                // 配列の中から、中身が空でないものだけを抽出
                const validParts = contentParts.filter(part => part);

                // 抽出されたパーツを ", " で結合
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
        });




    // --- Memberセクションのデータを読み込む ---
    fetch('data/member.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(memberList => {
            const container = document.getElementById('student-member-container');
            if (!container) return; // コンテナがなければ中断

            // 集計用オブジェクト
            const counts = { DC: 0, M2: 0, M1: 0, B4: 0, others: 0 };

            // 集計処理
            memberList.forEach(member => {
                if (counts.hasOwnProperty(member.grade)) {
                    counts[member.grade]++;
                } else {
                    counts.others++;
                }
            });

            // 人数カードをまとめてHTML化
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
        })
        .catch(error => {
            console.error('メンバー情報の読み込みに失敗しました:', error);
            const container = document.getElementById('student-member-container');
            if (container) {
                container.innerHTML = '<p>メンバー情報を読み込めませんでした。</p>';
            }
        });


});