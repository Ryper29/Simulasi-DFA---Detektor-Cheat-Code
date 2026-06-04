// =============================================
// KONFIGURASI TAILWIND
// =============================================
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "on-primary-fixed": "#20005f",
                "outline": "#948ea1",
                "on-surface-variant": "#cac3d8",
                "inverse-surface": "#dfe2f3",
                "on-secondary-fixed": "#001f24",
                "secondary": "#bdf4ff",
                "on-tertiary-fixed": "#3f0018",
                "inverse-on-surface": "#2c303d",
                "secondary-container": "#00e3fd",
                "inverse-primary": "#6833ea",
                "on-error": "#690005",
                "on-surface": "#dfe2f3",
                "on-primary-fixed-variant": "#4f00d0",
                "on-tertiary-container": "#fff6f6",
                "surface-container": "#1b1f2c",
                "tertiary-container": "#da1e67",
                "surface-dim": "#0f131f",
                "outline-variant": "#494455",
                "surface-bright": "#353946",
                "on-tertiary-fixed-variant": "#8f003f",
                "primary-fixed": "#e8deff",
                "tertiary": "#ffb1c1",
                "on-secondary-container": "#00616d",
                "primary-fixed-dim": "#cdbdff",
                "surface-container-highest": "#313442",
                "on-primary-container": "#fcf6ff",
                "primary-container": "#7c4dff",
                "surface": "#0f131f",
                "on-error-container": "#ffdad6",
                "surface-container-lowest": "#0a0e1a",
                "error-container": "#93000a",
                "on-primary": "#370096",
                "primary": "#cdbdff",
                "error": "#ffb4ab",
                "on-background": "#dfe2f3",
                "on-tertiary": "#66002a",
                "surface-tint": "#cdbdff",
                "background": "#0f131f",
                "tertiary-fixed": "#ffd9df",
                "secondary-fixed": "#9cf0ff",
                "on-secondary-fixed-variant": "#004f58",
                "surface-variant": "#313442",
                "tertiary-fixed-dim": "#ffb1c1",
                "surface-container-low": "#171b28",
                "secondary-fixed-dim": "#00daf3",
                "surface-container-high": "#262a37"
            },
            "borderRadius": {
                "DEFAULT": "0.125rem",
                "lg": "0.25rem",
                "xl": "0.5rem",
                "full": "0.75rem"
            },
            "spacing": {
                "margin-mobile": "16px",
                "unit": "4px",
                "gutter": "24px",
                "max-width": "1200px",
                "margin-desktop": "64px"
            },
            "fontFamily": {
                "body-base": ["Hanken Grotesk"],
                "code-terminal": ["JetBrains Mono"],
                "label-caps": ["JetBrains Mono"],
                "headline-md": ["Sora"],
                "headline-md-mobile": ["Sora"],
                "display-lg": ["Sora"]
            },
            "fontSize": {
                "body-base": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
                "code-terminal": ["14px", {"lineHeight": "1.5", "fontWeight": "500"}],
                "label-caps": ["12px", {"lineHeight": "1.2", "fontWeight": "700"}],
                "headline-md": ["32px", {"lineHeight": "1.2", "fontWeight": "700"}],
                "headline-md-mobile": ["24px", {"lineHeight": "1.2", "fontWeight": "700"}],
                "display-lg": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "800"}]
            }
        },
    },
};

// =============================================
// STATE DFA
// =============================================
let state = "q0";
let inputHistory = [];
let unlockedCheats = new Set();
let resetTimeout = null;

// =============================================
// LOGIKA UTAMA: HANDLE INPUT CONTROLLER
// =============================================
function handleInput(btn) {
    if (resetTimeout) {
        clearTimeout(resetTimeout);
        resetTimeout = null;
    }

    const buffer = document.getElementById('input-buffer');

    if (inputHistory.length === 0) {
        buffer.innerHTML = "";
    }

    const oldState = state;

    // -----------------------------------------------
    // TRANSISI DFA MULTICABANG
    // -----------------------------------------------
    if (state === "q0") {
        if (btn === "RIGHT")      state = "q1";
        else if (btn === "UP")    state = "q7";
        else                      state = "q0";
    } else if (state === "q1") {
        if (btn === "UP")         state = "q2";
        else                      state = "q0";
    } else if (state === "q2") {
        if (btn === "UP")         state = "q3";
        else                      state = "q0";
    } else if (state === "q3") {
        if (btn === "CIRCLE")     state = "q4";
        else if (btn === "RIGHT") state = "q8";
        else                      state = "q0";
    } else if (state === "q4") {
        if (btn === "CIRCLE")     state = "q5";
        else                      state = "q0";
    } else if (state === "q5") {
        if (btn === "SQUARE")     state = "q_money";
        else                      state = "q0";
    } else if (state === "q8") {
        if (btn === "RIGHT")      state = "q9";
        else                      state = "q0";
    } else if (state === "q9") {
        if (btn === "SQUARE")     state = "q_maut";
        else                      state = "q0";
    } else if (state === "q7") {
        if (btn === "DOWN")       state = "q10";
        else                      state = "q0";
    } else if (state === "q10") {
        if (btn === "DOWN")       state = "q11";
        else                      state = "q0";
    } else if (state === "q11") {
        if (btn === "UP")         state = "q12";
        else                      state = "q0";
    } else if (state === "q12") {
        if (btn === "UP")         state = "q13";
        else                      state = "q0";
    } else if (state === "q13") {
        if (btn === "DOWN")       state = "q14";
        else                      state = "q0";
    } else if (state === "q14") {
        if (btn === "DOWN")       state = "q_unlock_all";
        else                      state = "q0";
    } else if (state.startsWith("q_")) {
        if (btn === "RIGHT")      state = "q1";
        else if (btn === "UP")    state = "q7";
        else                      state = "q0";
    }

    // Cek apakah kombinasi patah / input salah
    let isBroken = false;
    if (oldState !== "q0" && !oldState.startsWith("q_") && state === "q0") {
        isBroken = true;
    } else if (oldState === "q0" && state === "q0" && btn !== "RIGHT" && btn !== "UP") {
        isBroken = true;
    }

    if (isBroken) {
        inputHistory = [];
        buffer.innerHTML = "";
    } else {
        inputHistory.push(btn);
    }

    updateUI(btn, isBroken);

    // Render ikon di terminal
    if (!isBroken) {
        const iconMap = {
            'UP':       'arrow_upward',
            'DOWN':     'arrow_downward',
            'LEFT':     'arrow_back',
            'RIGHT':    'arrow_forward',
            'TRIANGLE': 'change_history',
            'SQUARE':   'crop_square',
            'CIRCLE':   'circle',
            'CROSS':    'close'
        };

        const span = document.createElement('span');
        span.className = "material-symbols-outlined text-2xl opacity-0 translate-y-4 transition-all duration-300";
        span.textContent = iconMap[btn];
        buffer.appendChild(span);
        setTimeout(() => {
            span.classList.remove('opacity-0', 'translate-y-4');
        }, 10);
    } else {
        buffer.innerHTML = `<span class="text-error">[ Kosong ]</span>`;
    }

    if (isBroken || state.startsWith("q_")) {
        state = "q0";
        inputHistory = [];
        resetTimeout = setTimeout(() => {
            if (inputHistory.length === 0) {
                document.getElementById('input-buffer').innerHTML = `[ Kosong ]`;
            }
        }, 1500);
    }
}

// =============================================
// UPDATE TAMPILAN (STATE BADGE & HINT)
// =============================================
function updateUI(btn, isBroken) {
    const stateBadge = document.getElementById('state-badge');
    const hint       = document.getElementById('hint-text');

    // Feedback badge pulsing
    stateBadge.classList.remove('pulsing-glow');
    void stateBadge.offsetWidth;
    stateBadge.classList.add('pulsing-glow');

    if (isBroken) {
        stateBadge.textContent = state;
        stateBadge.className = "w-32 h-32 bg-error-container text-on-error-container rounded-2xl font-code-terminal text-4xl flex items-center justify-center border-2 border-error/50 pulsing-glow transition-all duration-300";
        hint.innerHTML = `❌ [KOMBINASI PATAH]<br>Tombol salah! DFA otomatis Reset ke State q0.`;
        hint.className = "text-error font-label-caps text-[11px] uppercase tracking-[0.2em] leading-relaxed";
        return;
    }

    if (state.startsWith("q_")) {
        stateBadge.innerHTML = `<span class="text-sm text-center font-bold">FINAL<br>STATE</span>`;

        let cheatName = "";
        if (state === "q_money")      cheatName = "DAPAT UANG BANYAK";
        else if (state === "q_maut")  cheatName = "PUKULAN MAUT";
        else if (state === "q_unlock_all") cheatName = "MEMBUKA SEMUA YANG TERKUNCI";

        let isNowUnlocked = true;
        if (unlockedCheats.has(state)) {
            unlockedCheats.delete(state);
            isNowUnlocked = false;
        } else {
            unlockedCheats.add(state);
        }

        if (typeof renderAchievements === 'function') renderAchievements();

        if (isNowUnlocked) {
            stateBadge.className = "w-32 h-32 bg-secondary-container text-on-secondary-fixed rounded-2xl font-code-terminal text-[18px] flex items-center justify-center border-2 border-secondary/50 pulsing-glow transition-all duration-300";
            hint.innerHTML = `🔊 ✨ ${cheatName} ACTIVATED! ✨<br><span class='text-secondary-fixed text-[9px] mt-2 block tracking-normal normal-case'>Mencapai Final State (${state}). Cheat berhasil dibuka!</span>`;
            hint.className = "text-secondary font-label-caps text-[11px] uppercase tracking-[0.1em] leading-relaxed font-bold";
        } else {
            stateBadge.className = "w-32 h-32 bg-error-container text-on-error-container rounded-2xl font-code-terminal text-[18px] flex items-center justify-center border-2 border-error/50 pulsing-glow transition-all duration-300";
            hint.innerHTML = `🔇 ❌ ${cheatName} DEACTIVATED! ❌<br><span class='text-error text-[9px] mt-2 block tracking-normal normal-case'>Mencapai Final State (${state}). Cheat telah dinonaktifkan.</span>`;
            hint.className = "text-error font-label-caps text-[11px] uppercase tracking-[0.1em] leading-relaxed font-bold";
        }
    } else {
        stateBadge.textContent = state;
        stateBadge.className = "w-32 h-32 bg-primary-container text-on-primary-container rounded-2xl font-code-terminal text-4xl flex items-center justify-center border-2 border-primary/20 pulsing-glow transition-all duration-300";

        let step = 0;
        if (["q1", "q7"].includes(state))           step = 1;
        else if (["q2", "q10"].includes(state))     step = 2;
        else if (["q3", "q11"].includes(state))     step = 3;
        else if (["q4", "q8", "q12"].includes(state)) step = 4;
        else if (["q5", "q9", "q13"].includes(state)) step = 5;
        else if (["q14"].includes(state))           step = 6;

        hint.innerHTML = `🡢 [LOG DFA]: Tombol valid.<br>Berada di State ${state} (Langkah ${step}).`;
        hint.className = "text-tertiary-fixed font-label-caps text-[11px] uppercase tracking-[0.1em] leading-relaxed";
    }
}

// =============================================
// RESET DFA
// =============================================
function resetDFA() {
    if (resetTimeout) {
        clearTimeout(resetTimeout);
        resetTimeout = null;
    }
    state = "q0";
    inputHistory = [];

    const buffer    = document.getElementById('input-buffer');
    const hint      = document.getElementById('hint-text');
    const stateBadge = document.getElementById('state-badge');

    buffer.innerHTML = `[ Kosong ]`;
    hint.innerHTML   = "Menunggu input tombol pertama pada stik<br>...";
    hint.className   = "text-outline font-label-caps text-[11px] uppercase tracking-[0.2em] leading-relaxed animate-pulse";
    stateBadge.textContent = state;
    stateBadge.className   = "w-32 h-32 bg-primary-container text-on-primary-container rounded-2xl font-code-terminal text-4xl flex items-center justify-center border-2 border-primary/20 pulsing-glow transition-all duration-300";
}

// =============================================
// RENDER ACHIEVEMENTS
// =============================================
function renderAchievements() {
    const cheats = [
        { id: "q_money",      name: "DAPAT UANG BANYAK",           icon: "payments",           desc: "Berhasil mendapatkan uang tak terbatas" },
        { id: "q_maut",       name: "PUKULAN MAUT",                 icon: "sports_martial_arts", desc: "Berhasil mengaktifkan kekuatan pukulan maut" },
        { id: "q_unlock_all", name: "MEMBUKA SEMUA YANG TERKUNCI",  icon: "key",                desc: "Berhasil membuka semua item dan wilayah terkunci" }
    ];

    const container = document.getElementById('achievements-list');
    if (!container) return;

    container.innerHTML = "";
    let unlockedCount = 0;

    cheats.forEach(cheat => {
        const isUnlocked = unlockedCheats.has(cheat.id);
        if (isUnlocked) unlockedCount++;

        const cardClass = isUnlocked
            ? "bg-secondary-container/20 border-secondary/50 text-on-surface"
            : "bg-surface-container-highest/30 border-outline-variant/10 text-on-surface-variant opacity-60";

        const iconClass = isUnlocked
            ? "text-secondary drop-shadow-[0_0_8px_rgba(0,227,253,0.8)]"
            : "text-outline";

        const iconName = isUnlocked ? cheat.icon : "lock";

        container.innerHTML += `
            <div class="flex items-center gap-4 p-4 rounded-xl border ${cardClass} transition-all duration-300">
                <div class="w-12 h-12 rounded-full bg-surface flex items-center justify-center border border-outline-variant/20 shrink-0">
                    <span class="material-symbols-outlined text-2xl ${iconClass}">${iconName}</span>
                </div>
                <div class="flex-grow">
                    <h3 class="font-label-caps text-sm tracking-widest ${isUnlocked ? 'text-secondary' : ''}">${cheat.name}</h3>
                    <p class="text-xs mt-1 ${isUnlocked ? 'text-on-surface-variant' : 'text-outline'}">${isUnlocked ? cheat.desc : 'LOCKED - Rahasia belum terpecahkan'}</p>
                </div>
            </div>
        `;
    });

    const progress = document.getElementById('achievement-progress');
    if (progress) progress.innerText = `${unlockedCount} / 3 TERBUKA`;
}

// =============================================
// MODAL HELPERS
// =============================================
function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
    document.getElementById(id).classList.add('flex');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
    document.getElementById(id).classList.remove('flex');
}

// =============================================
// INISIALISASI
// =============================================
window.addEventListener('DOMContentLoaded', renderAchievements);
