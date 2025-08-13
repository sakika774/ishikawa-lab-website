/**
 * 指定されたURLからHTMLを読み込み、指定された要素に挿入する関数
 * @param {string} url 読み込むHTMLファイルのURL
 * @param {string} targetId 挿入先の要素のID
 */

async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
    }
    return response.json();
}

window.fetchJson = fetchJson;

function loadComponent(url, targetId) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.innerHTML = data;
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

/**
 * SP版メニューの開閉処理をセットアップする関数
 */
function setupMenuButton() {
    const menuButton = document.querySelector('.header-menu-button');
    const body = document.body;

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            body.classList.toggle('is-menu-open');
            menuButton.classList.toggle('is-active');
        });
    }
}

// ページの読み込みが完了したら、共通パーツを読み込む
document.addEventListener("DOMContentLoaded", function () {
    // 現在のURLの階層の深さを計算（ファイル名は除外）
    const depth = location.pathname.split("/").filter(Boolean).length - 1;
    // 階層数に応じた相対パスを生成
    const basePath = depth > 0 ? "../".repeat(depth) : "./";
    // ヘッダーとフッターを読み込み
    loadComponent(`${basePath}_header.html`, 'header-placeholder').then(() => {
        setupMenuButton();
    });
    loadComponent(`${basePath}_footer.html`, 'footer-placeholder');
});