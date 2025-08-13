// 学生メンバーJSONを取得
async function fetchStudentData() {
    try {
        const response = await fetch('data/member.json'); // JSONのパス
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('学生データの取得に失敗しました:', error);
        return [];
    }
}

// 学生データを表示する関数
function renderStudents(studentList) {
    const container = document.getElementById('member-container-page');
    if (!container) return;

    container.innerHTML = ''; // 前の内容をクリア

    studentList.forEach(item => {
        const cardHTML = `
            <div class="member-card">
                <div class="member-card-meta">
                    <span class="member-grade">${item.grade}</span>
                    <span class="member-name">${item.name}</span>
                </div>
                <span class="member-theme">${item.theme}</span>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// DOM読み込み時に実行
document.addEventListener('DOMContentLoaded', async () => {
    const students = await fetchStudentData();
    renderStudents(students);
});