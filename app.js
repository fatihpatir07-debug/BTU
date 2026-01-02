const content = {
    flashcards: [
        // Soru - Cevap Bölümü (PDF Sayfa 1)
        { q: "\"Izgarayı Düzenle\" (Edit Grid) seçeneği ne işe yarar?", a: "Çalışma alanının boyutlarını ve ölçü birimini (mm/inç) ayarlar." },
        { q: "Beyaz köşe tutamaçları ile siyah kenar tutamaçları farkı nedir?", a: "Beyazlar en ve boyu aynı anda, siyahlar ise tek bir yöndeki boyutu değiştirir." },
        { q: "\"Duplicate\" (Ctrl+D) komutunun kopyala-yapıştırdan farkı nedir?", a: "Hareket ve döndürme işlemlerini hafızaya alır, tekrar basıldığında hareketi otomatik tekrarlar." },
        { q: "Gruplandırılan farklı renkteki nesnelerin renklerini nasıl koruruz?", a: "\"Katı\" menüsünden \"Çok Renkli\" (Multicolor) seçeneği işaretlenir." },
        { q: "Bir nesneyi \"Delik\" (Hole) yapmak boşluk için yeterli midir?", a: "Hayır. Delik nesne ile katı nesne birlikte seçilip \"Gruplandır\" komutu uygulanmalıdır." },
        { q: "\"Hizala\" (Align) komutundaki siyah noktalar ne anlama gelir?", a: "Uçtakiler kenara yaslar, ortadakiler merkezde hizalar." },
        { q: "\"Cetvel\" (Ruler) aracı tasarımda ne sağlar?", a: "Nesnelerin birbirine uzaklığını ve koordinatlarını rakamsal gösterir, hassas yerleştirme sağlar." },
        { q: "\"Aynala\" (Mirror) komutu hangi amaçla kullanılır?", a: "Nesnenin seçilen eksende tam tersi yansımasını oluşturur. Simetrik parçalar için kullanılır." },
        { q: "\"Çalışma Düzlemi\" (Workplane) bir yüzeye yerleştirilirse ne olur?", a: "O yüzey yeni ana zemin olur. Yeni nesneler doğrudan o yüzeye yerleşir." },
        { q: "Tasarımdaki en yaygın 3D yazıcı dosya formatı nedir?", a: ".STL formatıdır." },

        // Araçlar ve Kısayollar (PDF Sayfa 2)
        { q: "Kopyala - Yapıştır kısayolları nelerdir?", a: "Kopyala: Ctrl+C | Yapıştır: Ctrl+V" },
        { q: "Geri Al - İleri Al kısayolları nelerdir?", a: "Geri Al: Ctrl+Z | İleri Al: Ctrl+Y" },
        { q: "Gruplandır - Grubu Çöz kısayolları nelerdir?", a: "Gruplandır: Ctrl+G | Grubu Çöz: Ctrl+Shift+G" },
        { q: "Hizala ve Aynala kısayolları nelerdir?", a: "Hizala: L | Aynala: M" },
        { q: "Çalışma Düzlemi (Workplane) ve Cetvel kısayolları nelerdir?", a: "Çalışma Düzlemi: W | Cetvel: R" },
        { q: "Tümünü Sığdır (Fit all) kısayolu nedir?", a: "F tuşu. Seçili nesneyi ekrana odaklayıp yakınlaştırır." },
        { q: "Dışa Aktar (Export) ne işe yarar?", a: "Tasarımı .STL veya .OBJ olarak kaydeder." },
        { q: "İçe Aktar (Import) ne işe yarar?", a: "Bilgisayardaki bir dosyayı Tinkercad alanına yükler." },

        // İpuçları
        { q: "Orantılı Büyütme nasıl yapılır?", a: "Boyut değiştirirken Shift tuşuna basılı tutularak." },
        { q: "Merkezden Büyütme nasıl yapılır?", a: "Boyut değiştirirken Alt tuşuna basılı tutularak." },
        { q: "Nesneyi yukarı (Z ekseninde) kaldırma kısayolu nedir?", a: "Ctrl + Yukarı Ok tuşları." },
        { q: "Hassas Hareket için neye dikkat edilmelidir?", a: "Izgara hassasiyetine (Snap Grid) ayarına." }
    ],
    quizzes: [
        {
            q: "Tinkercad'de nesneleri gruplandırmak için hangi kısayol kullanılır?",
            options: ["Ctrl + G", "Ctrl + D", "Ctrl + C", "Ctrl + Shift + G"],
            correct: 0
        },
        {
            q: "Hangi araç nesnelerin birbirine olan uzaklığını rakamsal olarak görmemizi sağlar?",
            options: ["Hizala", "Aynala", "Cetvel", "Çalışma Düzlemi"],
            correct: 2
        },
        {
            q: "Ctrl + D (Duplicate) komutunun kopyala-yapıştırdan en önemli farkı nedir?",
            options: ["Sadece kopyalar", "Nesneyi siler", "Sonraki hareketleri hafızaya alıp tekrarlar", "Renkleri değiştirir"],
            correct: 2
        },
        {
            q: "Görünüm Küpü ne işe yarar?",
            options: ["Nesneyi siler", "Tasarıma farklı açılardan bakmayı sağlar", "Nesneyi büyütür", "Dosyayı kaydeder"],
            correct: 1
        },
        {
            q: "Orantılı büyütme yapmak için hangi tuş basılı tutulmalıdır?",
            options: ["Alt", "Ctrl", "Shift", "Tab"],
            correct: 2
        },
        {
            q: "Nesneyi Z ekseninde (havaya) kaldırmak için hangi kombinasyon kullanılır?",
            options: ["Ctrl + Sol Ok", "Ctrl + Sağ Ok", "Ctrl + Yukarı Ok", "Ctrl + Alt"],
            correct: 2
        },
        {
            q: "Gruplandırılan nesnelerin orijinal renklerini korumak için hangi menü kullanılır?",
            options: ["Delik Menüsü", "Katı -> Çok Renkli", "Görünüm Menüsü", "Cetvel Ayarları"],
            correct: 1
        }
    ]
};

let currentCardIndex = 0;
let currentQuizIndex = 0;
let score = 0;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    showView('welcome');
    setupNav();
    setTheme('winter');
});

function setupNav() {
    document.getElementById('btn-home').onclick = () => showView('welcome');
    document.getElementById('btn-cards').onclick = () => {
        showView('cards');
        renderCard();
    };
    document.getElementById('btn-quiz').onclick = () => {
        showView('quiz');
        renderQuiz();
    };
    document.getElementById('btn-info').onclick = () => showInfo();
}

function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    let target = document.getElementById(viewId);
    if (!target) {
        target = document.createElement('section');
        target.id = viewId;
        target.className = 'view';
        document.getElementById('main-content').appendChild(target);
    }

    target.classList.add('active');
    const btn = document.getElementById(`btn-${viewId}`);
    if (btn) btn.classList.add('active');
}

// Flashcard Logic
function renderCard() {
    const view = document.getElementById('cards');
    const card = content.flashcards[currentCardIndex];

    view.innerHTML = `
        <h3 style="margin-bottom:10px">Flash Kartlar (${currentCardIndex + 1}/${content.flashcards.length})</h3>
        <div id="card-container">
            <div class="flashcard" onclick="this.classList.toggle('flipped')">
                <div class="card-front">
                    <p style="font-size: 1.2rem; font-weight: bold;">${card.q}</p>
                    <small style="margin-top: 2rem; color: #666;">Cevabı görmek için tıkla</small>
                </div>
                <div class="card-back">
                    <p style="font-size: 1.1rem;">${card.a}</p>
                </div>
            </div>
        </div>
        <div class="card-buttons">
            <button class="action-btn" onclick="prevCard()" ${currentCardIndex === 0 ? 'style="opacity:0.5"' : ''}>Geri</button>
            <button class="action-btn" onclick="nextCard()">Sıradaki</button>
        </div>
    `;
}

window.nextCard = () => {
    currentCardIndex = (currentCardIndex + 1) % content.flashcards.length;
    renderCard();
};

window.prevCard = () => {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        renderCard();
    }
};

// Quiz Logic
function renderQuiz() {
    const view = document.getElementById('quiz');
    if (currentQuizIndex >= content.quizzes.length) {
        view.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <h2>Test Bitti!</h2>
                <div style="font-size: 3rem; margin: 1rem 0;">🎯</div>
                <p>Doğru Sayısı: <strong>${score}</strong> / ${content.quizzes.length}</p>
                <button class="action-btn" style="margin-top: 1.5rem" onclick="resetQuiz()">Tekrar Dene</button>
            </div>
        `;
        return;
    }

    const q = content.quizzes[currentQuizIndex];
    view.innerHTML = `
        <h3>Test (${currentQuizIndex + 1}/${content.quizzes.length})</h3>
        <div class="quiz-card" style="padding: 1.5rem; margin-top: 1rem;">
            <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 1.5rem;">${q.q}</p>
            <div class="options">
                ${q.options.map((opt, i) => `
                    <button class="option-btn" onclick="checkAnswer(${i}, this)">${opt}</button>
                `).join('')}
            </div>
        </div>
    `;
}

window.resetQuiz = () => {
    currentQuizIndex = 0;
    score = 0;
    renderQuiz();
};

window.checkAnswer = (idx, btn) => {
    const q = content.quizzes[currentQuizIndex];
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(b => b.disabled = true);

    if (idx === q.correct) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
        buttons[q.correct].classList.add('correct');
    }

    setTimeout(() => {
        currentQuizIndex++;
        renderQuiz();
    }, 1500);
};

// Theme Logic
window.setTheme = (theme) => {
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
    createParticles(theme);
};

function createParticles(theme) {
    const container = document.getElementById('particles-container');
    container.innerHTML = '';

    let count = 0;
    let type = '';
    let emoji = '';

    if (theme === 'winter') { count = 40; type = 'snowflake'; emoji = '❄'; }
    else if (theme === 'spring') { count = 80; type = 'rain-drop'; }
    else if (theme === 'autumn') { count = 30; type = 'leaf'; }

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = `particle ${type}`;
        if (emoji) p.innerText = emoji;

        p.style.left = Math.random() * 100 + 'vw';
        const duration = Math.random() * 3 + 2;
        p.style.animation = `fall ${duration}s linear infinite, drift ${duration / 2}s ease-in-out infinite`;
        p.style.animationDelay = Math.random() * 5 + 's';

        if (theme === 'autumn') {
            const colors = ['#d97706', '#9a3412', '#7c2d12', '#b45309'];
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
        }

        container.appendChild(p);
    }
}

// Info Modal
function showInfo() {
    alert("BTU - Bilgisayarlı Tasarım Uygulamaları\nKorkuteli Nene Hatun MTAL\n\nGeliştiren: Fatih PATIR\nÜnvan: Bilgisayar Öğretmeni\nWeb: fatihpatir.github.io/web\n\nBu uygulama PWA olarak tasarlanmıştır. Tarayıcı ayarlarından 'Ana Ekrana Ekle' diyerek telefonunuza yükleyebilirsiniz.");
}
