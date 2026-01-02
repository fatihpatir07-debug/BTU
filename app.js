const content = {
    flashcards: [
        { q: "\"Izgarayı Düzenle\" (Edit Grid) seçeneği ne işe yarar?", a: "Çalışma alanının boyutlarını ve ölçü birimini (mm/inç) ayarlar." },
        { q: "Beyaz köşe tutamaçları ile siyah kenar tutamaçları farkı nedir?", a: "Beyazlar en ve boyu aynı anda, siyahlar ise tek bir yöndeki boyutu değiştirir." },
        { q: "\"Duplicate\" (Ctrl+D) komutunun kopyala-yapıştırdan farkı nedir?", a: "Hareket ve döndürme işlemlerini hafızaya alır, tekrar basıldığında hareketi otomatik tekrarlar." },
        { q: "Gruplandırılan farklı renkteki nesnelerin renklerini nasıl koruruz?", a: "\"Katı\" menüsünden \"Çok Renkli\" (Multicolor) seçeneği işaretlenir." },
        { q: "Bir nesneyi \"Delik\" (Hole) yapmak boşluk için yeterli midir?", a: "Hayır. Delik nesne ile katı nesne birlikte seçilip \"Gruplandır\" komutu uygulanmalıdır." },
        { q: "\"Hizala\" (Align) komutundaki siyah noktalar ne anlama gelir?", a: "Uçtakiler kenara yaslar, ortadakiler merkezde hizalar." },
        { q: "\"Cetvel\" (Ruler) aracı tasarımda ne sağlar?", a: "Kesin ölçü ve koordinat gösterir, hassas yerleştirme sağlar." },
        { q: "\"Aynala\" (Mirror) komutu ne işe yarar?", a: "Nesnenin tam ters yansımasını (simetrisini) oluşturur." },
        { q: "\"Çalışma Düzlemi\" (Workplane) nereye yerleştirilirse?", a: "Yerleştirilen yüzey yeni ana zemin olur." },
        { q: "3D Yazıcı En Yaygın Dosya Formatı?", a: ".STL formatıdır." },
        { q: "Kopyala - Yapıştır:", a: "Ctrl+C ve Ctrl+V" },
        { q: "Geri Al - İleri Al:", a: "Ctrl+Z ve Ctrl+Y" },
        { q: "Gruplandır - Grubu Çöz:", a: "Ctrl+G ve Ctrl+Shift+G" },
        { q: "Hizala - Aynala:", a: "L ve M tuşları" },
        { q: "Tümünü Sığdır (Yakınlaştır):", a: "F tuşu" }
    ],
    quizzes: [
        { q: "Tinkercad'de nesneleri gruplandırmak için hangi kısayol kullanılır?", options: ["Ctrl+G", "Ctrl+D", "Ctrl+C", "L"], correct: 0 },
        { q: "Nesnelerin birbirine olan uzaklığını gösteren hassas araç?", options: ["Hizala", "Cetvel", "Ayna", "Küp"], correct: 1 },
        { q: "Hizalama komutunun kısayolu nedir?", options: ["L", "M", "W", "R"], correct: 0 },
        { q: "Seçili nesneyi tam tersine çevirme (yansıma) tuşu?", options: ["L", "M", "W", "R"], correct: 1 },
        { q: "Basılan yüzeyi zemin yapan araç (Workplane)?", options: ["W", "R", "F", "D"], correct: 0 }
    ]
};

let currentIndex = 0;
let quizScore = 0;

document.addEventListener('DOMContentLoaded', () => {
    initButtons();
    updateStats();
    showView('welcome');
});

function initButtons() {
    const ids = ['home', 'cards', 'quiz', 'info'];
    ids.forEach(id => {
        const btn = document.getElementById('btn-' + id);
        if (btn) {
            btn.onclick = () => {
                if (id === 'cards') { currentIndex = 0; renderCard(); }
                if (id === 'quiz') { currentIndex = 0; quizScore = 0; renderQuiz(); }
                showView(id);
            };
        }
    });
}

function showView(id) {
    document.querySelectorAll('.view').forEach(v => {
        v.style.display = 'none';
        v.classList.remove('active');
    });
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));

    const target = document.getElementById(id);
    if (target) {
        target.style.display = 'block';
        setTimeout(() => target.classList.add('active'), 10);
        const btn = document.getElementById('btn-' + id);
        if (btn) btn.classList.add('active');
    }
}

function renderCard() {
    const container = document.getElementById('cards');
    const item = content.flashcards[currentIndex];
    container.innerHTML = `
        <div class="hero-card">
            <h2 style="font-size:1.2rem; margin-bottom:0">Flash Kart ${currentIndex + 1} / ${content.flashcards.length}</h2>
        </div>
        <div id="card-container">
            <div class="flashcard" onclick="this.classList.toggle('flipped')">
                <div class="card-face card-front">
                    <p>${item.q}</p>
                    <span>CEVAP İÇİN ÇEVİR</span>
                </div>
                <div class="card-face card-back">
                    <p>${item.a}</p>
                </div>
            </div>
        </div>
        <div class="controls">
            <button class="btn btn-alt" onclick="moveCard(-1)">◀ GERİ</button>
            <button class="btn btn-main" onclick="moveCard(1)">İLERİ ▶</button>
        </div>
    `;
}

window.moveCard = (dir) => {
    currentIndex = (currentIndex + dir + content.flashcards.length) % content.flashcards.length;
    if (dir > 0) {
        let l = parseInt(localStorage.getItem('btu_learned') || 0);
        localStorage.setItem('btu_learned', l + 1);
        updateStats();
    }
    renderCard();
};

function renderQuiz() {
    const container = document.getElementById('quiz');
    if (currentIndex >= content.quizzes.length) {
        let best = parseInt(localStorage.getItem('btu_score') || 0);
        if (quizScore > best) localStorage.setItem('btu_score', quizScore);
        updateStats();
        container.innerHTML = `
            <div class="hero-card" style="text-align:center">
                <h2>Test Bitti!</h2>
                <p style="font-size:2rem; margin:20px 0;">🎯 ${quizScore} / ${content.quizzes.length}</p>
                <button class="btn btn-main" style="width:100%" onclick="resetQuiz()">TEKRAR BAŞLA</button>
            </div>`;
        return;
    }

    const q = content.quizzes[currentIndex];
    container.innerHTML = `
        <div class="hero-card">
            <h2 style="font-size:1.2rem; margin-bottom:0">Soru ${currentIndex + 1} / ${content.quizzes.length}</h2>
        </div>
        <div class="stat-box" style="margin-bottom:20px; border-color:var(--primary)">
            <p style="font-size:1.4rem; font-weight:800;">${q.q}</p>
        </div>
        ${q.options.map((opt, i) => `
            <button class="btn btn-alt" style="width:100%; text-align:left; margin-bottom:12px;" id="opt-${i}" onclick="checkAnswer(${i})">
                ${opt}
            </button>
        `).join('')}
    `;
}

window.checkAnswer = (idx) => {
    const q = content.quizzes[currentIndex];
    const btns = document.querySelectorAll('#quiz .btn');
    btns.forEach(b => b.disabled = true);

    if (idx === q.correct) {
        document.getElementById('opt-' + idx).classList.add('correct');
        quizScore++;
    } else {
        document.getElementById('opt-' + idx).classList.add('wrong');
        document.getElementById('opt-' + q.correct).classList.add('correct');
    }

    setTimeout(() => {
        currentIndex++;
        renderQuiz();
    }, 1200);
};

window.resetQuiz = () => { currentIndex = 0; quizScore = 0; renderQuiz(); };
window.setTheme = (n) => { document.body.className = 'theme-' + n; };

function updateStats() {
    const l = localStorage.getItem('btu_learned') || 0;
    const s = localStorage.getItem('btu_score') || 0;
    if (document.getElementById('learned-count')) document.getElementById('learned-count').innerText = l;
    if (document.getElementById('quiz-score')) document.getElementById('quiz-score').innerText = s;
}
