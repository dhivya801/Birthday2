/* ==========================================================================
   NAGA ARJUN'S BIRTHDAY SURPRISE - LOGIC CORE (app.js)
   ========================================================================== */

// ==========================================================================
// 1. RETRO-SYNTHESIZER SOUND ENGINE (Web Audio API)
// ==========================================================================
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.activeOscillators = [];
    }
    
    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }
    
    playPop() {
        if (!this.enabled) return;
        this.init();
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(380, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.08);
        
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
        
        osc.start(now);
        osc.stop(now + 0.08);
    }
    
    playChime() {
        if (!this.enabled) return;
        this.init();
        
        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 major arpeggio
        
        notes.forEach((freq, index) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + index * 0.07);
            
            gain.gain.setValueAtTime(0.12, now + index * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.07 + 0.25);
            
            osc.start(now + index * 0.07);
            osc.stop(now + index * 0.07 + 0.25);
        });
    }

    playLaser() {
        if (!this.enabled) return;
        this.init();
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.type = 'sawtooth';
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.14);
        
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.14);
        
        osc.start(now);
        osc.stop(now + 0.14);
    }
    
    playTada() {
        if (!this.enabled) return;
        this.init();
        
        const now = this.ctx.currentTime;
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
        
        notes.forEach((freq) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);
            
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
            
            osc.start(now);
            osc.stop(now + 0.7);
        });
    }

    playSwoosh() {
        if (!this.enabled) return;
        this.init();
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.type = 'sine';
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.exponentialRampToValueAtTime(550, now + 0.25);
        
        gain.gain.setValueAtTime(0.005, now);
        gain.gain.exponentialRampToValueAtTime(0.15, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        
        osc.start(now);
        osc.stop(now + 0.25);
    }
    
    playHappyBirthday() {
        if (!this.enabled) return;
        this.init();
        this.stopAll(); // Clear any running synth cycles
        
        const now = this.ctx.currentTime;
        
        // Note frequency values
        const G4 = 392.00, A4 = 440.00, B4 = 493.88, C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99;
        
        // Melody and timing sequence
        const song = [
            { f: G4, d: 0.35, t: 0.10 }, // Hap-
            { f: G4, d: 0.15, t: 0.02 }, // py
            { f: A4, d: 0.50, t: 0.05 }, // Birth-
            { f: G4, d: 0.50, t: 0.05 }, // day
            { f: C5, d: 0.50, t: 0.05 }, // to
            { f: B4, d: 0.95, t: 0.10 }, // you,
            
            { f: G4, d: 0.35, t: 0.10 }, // Hap-
            { f: G4, d: 0.15, t: 0.02 }, // py
            { f: A4, d: 0.50, t: 0.05 }, // Birth-
            { f: G4, d: 0.50, t: 0.05 }, // day
            { f: D5, d: 0.50, t: 0.05 }, // to
            { f: C5, d: 0.95, t: 0.10 }, // you,
            
            { f: G4, d: 0.35, t: 0.10 }, // Hap-
            { f: G4, d: 0.15, t: 0.02 }, // py
            { f: G5, d: 0.50, t: 0.05 }, // Birth-
            { f: E5, d: 0.50, t: 0.05 }, // day
            { f: C5, d: 0.50, t: 0.05 }, // dear
            { f: B4, d: 0.50, t: 0.05 }, // Na-
            { f: A4, d: 0.70, t: 0.08 }, // ga
            
            { f: F5, d: 0.35, t: 0.10 }, // Hap-
            { f: F5, d: 0.15, t: 0.02 }, // py
            { f: E5, d: 0.50, t: 0.05 }, // Birth-
            { f: C5, d: 0.50, t: 0.05 }, // day
            { f: D5, d: 0.50, t: 0.05 }, // to
            { f: C5, d: 1.10, t: 0.20 }  // you!
        ];
        
        let timeCursor = now + 0.05;
        song.forEach(note => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.type = 'triangle'; // Retro 8-bit sound
            osc.frequency.setValueAtTime(note.f, timeCursor);
            
            gain.gain.setValueAtTime(0.1, timeCursor);
            gain.gain.setValueAtTime(0.1, timeCursor + note.d - 0.04);
            gain.gain.linearRampToValueAtTime(0.001, timeCursor + note.d);
            
            osc.start(timeCursor);
            osc.stop(timeCursor + note.d);
            
            this.activeOscillators.push(osc);
            timeCursor += note.d + note.t;
        });
    }
    
    stopAll() {
        if (this.activeOscillators.length > 0) {
            this.activeOscillators.forEach(osc => {
                try { osc.stop(); } catch(e) {}
            });
            this.activeOscillators = [];
        }
    }
}

// ==========================================================================
// 2. CANVAS CONFETTI ENGINE
// ==========================================================================
class ConfettiEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#A855F7', '#FFD700', '#FF8C00', '#FF3366'];
        this.active = false;
        
        window.addEventListener('resize', () => this.resize());
        this.resize();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    spawn(count = 100, isBurst = false) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: isBurst ? this.canvas.width / 2 : Math.random() * this.canvas.width,
                y: isBurst ? this.canvas.height / 2.2 : -20,
                size: Math.random() * 8 + 6,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                shape: Math.random() > 0.45 ? 'circle' : 'ribbon',
                speedX: isBurst ? (Math.random() - 0.5) * 16 : (Math.random() - 0.5) * 3,
                speedY: isBurst ? (Math.random() - 0.72) * 16 - 3 : Math.random() * 3 + 2.5,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 8,
                opacity: 1
            });
        }
        if (!this.active) {
            this.active = true;
            this.animate();
        }
    }
    
    animate() {
        if (this.particles.length === 0) {
            this.active = false;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            return;
        }
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += p.rotationSpeed;
            
            // Apply physics: gravity + air drag
            p.speedY += 0.07;
            p.speedX *= 0.985;
            
            // Gentle side-to-side ribbon sway
            if (p.shape === 'ribbon') {
                p.x += Math.sin(p.y / 22) * 0.4;
            }
            
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation * Math.PI / 180);
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fillStyle = p.color;
            
            if (p.shape === 'circle') {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            }
            
            this.ctx.restore();
            
            // Cleanup conditions
            if (p.y > this.canvas.height + 20 || p.x < -20 || p.x > this.canvas.width + 20) {
                this.particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// ==========================================================================
// 3. CANVAS FIREWORKS PHYSICS ENGINE
// ==========================================================================
class FireworksEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.rockets = [];
        this.colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#A855F7', '#FFD700', '#FF3366', '#E070FF', '#17FFFF'];
        this.active = false;
        
        window.addEventListener('resize', () => this.resize());
        this.resize();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    spawnRocket() {
        const x = Math.random() * (this.canvas.width - 240) + 120;
        const y = this.canvas.height;
        const targetY = Math.random() * (this.canvas.height / 2.3) + 70;
        const speed = Math.random() * 4 + 7;
        
        this.rockets.push({
            x: x,
            y: y,
            targetY: targetY,
            speedY: -speed,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            trail: []
        });
        
        if (!this.active) {
            this.active = true;
            this.animate();
        }
    }
    
    explode(x, y, color) {
        const count = 75;
        const isRing = Math.random() > 0.5;
        
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            let speed = Math.random() * 4.5 + 1.5;
            
            if (isRing) {
                speed = 4.2 + (Math.random() - 0.5) * 0.4;
            }
            
            this.particles.push({
                x: x,
                y: y,
                speedX: Math.cos(angle) * speed,
                speedY: Math.sin(angle) * speed,
                color: color,
                size: Math.random() * 1.8 + 1.2,
                gravity: 0.06,
                friction: 0.955,
                life: 1.0,
                decay: Math.random() * 0.018 + 0.01
            });
        }
    }
    
    animate() {
        if (this.rockets.length === 0 && this.particles.length === 0) {
            this.active = false;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            return;
        }
        
        // Beautiful soft-alpha clean to paint trailing glows
        this.ctx.fillStyle = 'rgba(13, 2, 33, 0.16)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Rockets Logic
        for (let i = this.rockets.length - 1; i >= 0; i--) {
            const r = this.rockets[i];
            r.y += r.speedY;
            
            r.trail.push({ x: r.x, y: r.y });
            if (r.trail.length > 7) r.trail.shift();
            
            this.ctx.beginPath();
            this.ctx.moveTo(r.x, r.y);
            for (let j = r.trail.length - 1; j >= 0; j--) {
                this.ctx.lineTo(r.trail[j].x, r.trail[j].y);
            }
            this.ctx.strokeStyle = r.color;
            this.ctx.lineWidth = 2.2;
            this.ctx.shadowBlur = 8;
            this.ctx.shadowColor = r.color;
            this.ctx.stroke();
            this.ctx.shadowBlur = 0; // reset
            
            if (r.y <= r.targetY) {
                this.explode(r.x, r.y, r.color);
                this.rockets.splice(i, 1);
            }
        }
        
        // Particles Logic
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.speedX *= p.friction;
            p.speedY *= p.friction;
            p.speedY += p.gravity;
            p.x += p.speedX;
            p.y += p.speedY;
            p.life -= p.decay;
            
            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.life;
            this.ctx.shadowBlur = 5;
            this.ctx.shadowColor = p.color;
            this.ctx.fill();
            this.ctx.shadowBlur = 0; // reset
            this.ctx.globalAlpha = 1.0;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Instantiate Sound, Confetti, and Fireworks Engines
const sounds = new SoundEngine();
let confetti, fireworks;

// ==========================================================================
// 4. FLOATING CLOUDS & BALLOONS GENERATORS
// ==========================================================================
function spawnCloud() {
    const cloudsContainer = document.getElementById('cloudsContainer');
    if (!cloudsContainer) return;
    
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    const size = Math.random() * 90 + 70;
    cloud.style.width = `${size}px`;
    cloud.style.height = `${size * 0.38}px`;
    cloud.style.top = `${Math.random() * 38}%`;
    cloud.style.left = `-160px`;
    cloud.style.opacity = Math.random() * 0.35 + 0.1;
    
    const duration = Math.random() * 35 + 35;
    cloud.style.animation = `floatCloud ${duration}s linear forwards`;
    
    cloudsContainer.appendChild(cloud);
    setTimeout(() => cloud.remove(), duration * 1000);
}

function spawnBgBalloon() {
    const balloonsStream = document.getElementById('balloonsStream');
    if (!balloonsStream) return;
    
    const balloon = document.createElement('div');
    balloon.className = 'bg-balloon';
    
    const string = document.createElement('div');
    string.className = 'bg-balloon-string';
    balloon.appendChild(string);
    
    const left = Math.random() * 96 + 2;
    const scale = Math.random() * 0.45 + 0.65;
    const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#A855F7', '#FF8C00', '#FF3366'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    balloon.style.left = `${left}%`;
    balloon.style.color = randomColor;
    balloon.style.backgroundColor = randomColor;
    balloon.style.transform = `scale(${scale})`;
    
    const drift = (Math.random() - 0.5) * 140;
    const rotation = (Math.random() - 0.5) * 35;
    balloon.style.setProperty('--drift', `${drift}px`);
    balloon.style.setProperty('--rot', `${rotation}deg`);
    
    const duration = Math.random() * 7 + 11;
    balloon.style.animation = `floatBalloon ${duration}s linear forwards`;
    
    balloonsStream.appendChild(balloon);
    setTimeout(() => balloon.remove(), duration * 1000);
}

// ==========================================================================
// 5. GREETING ENVELOPE INTERACTIVITY
// ==========================================================================
function setupEnvelope() {
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const envelope = document.getElementById('envelope');
    const envelopeSeal = document.getElementById('envelopeSeal');
    const closeLetterBtn = document.getElementById('closeLetterBtn');
    const envelopeHint = document.getElementById('envelopeHint');
    
    if (envelopeWrapper && envelope && envelopeSeal && closeLetterBtn) {
        const openCard = (e) => {
            e.stopPropagation();
            sounds.playSwoosh();
            setTimeout(() => {
                sounds.playChime();
            }, 250);
            envelopeWrapper.classList.add('open');
            if (envelopeHint) envelopeHint.style.opacity = '0';
        };
        
        envelopeSeal.addEventListener('click', openCard);
        envelope.addEventListener('click', openCard);
        
        closeLetterBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sounds.playSwoosh();
            envelopeWrapper.classList.remove('open');
            if (envelopeHint) envelopeHint.style.opacity = '1';
        });
    }
}

// ==========================================================================
// 6. INTERACTIVE 3D CAKE & CANDLE BLOWING
// ==========================================================================
let activeCandlesCount = 9;
const candles = [];
let soundPlaying = false;
let micStream = null;
let micActive = false;

function setupCakeCandles() {
    for (let i = 1; i <= 9; i++) {
        const c = document.getElementById(`candle${i}`);
        if (c) {
            candles.push(c);
            c.addEventListener('click', (e) => {
                e.stopPropagation();
                extinguishCandle(c);
            });
        }
    }
    
    const blowCandlesBtn = document.getElementById('blowCandlesBtn');
    if (blowCandlesBtn) {
        blowCandlesBtn.addEventListener('click', () => {
            sounds.init();
            
            // Relight feature if they are already all blown
            if (activeCandlesCount === 0) {
                activeCandlesCount = 9;
                candles.forEach(c => c.classList.remove('blown'));
                const cakeInstruction = document.getElementById('cakeInstruction');
                if (cakeInstruction) {
                    cakeInstruction.innerHTML = "Click to blow out all 9 candles and unlock the celebration music! 🎶";
                    cakeInstruction.style.color = "";
                }
                sounds.stopAll();
                soundPlaying = false;
                sounds.playChime();
                return;
            }
            
            // Check mic capability fallback
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                autoBlowSequence();
                return;
            }
            
            // Toggle Mic listening
            if (micActive) {
                stopMicStream();
                return;
            }
            
            blowCandlesBtn.innerHTML = "<span class='btn-icon'>🎙️</span> Listening... Blow into mic!";
            blowCandlesBtn.style.background = "linear-gradient(135deg, #6BCB77, #4D96FF)";
            
            navigator.mediaDevices.getUserMedia({ audio: true, video: false })
                .then(stream => {
                    micStream = stream;
                    micActive = true;
                    
                    const audioContext = sounds.ctx || new (window.AudioContext || window.webkitAudioContext)();
                    if (!sounds.ctx) sounds.ctx = audioContext;
                    if (audioContext.state === 'suspended') audioContext.resume();
                    
                    const mediaStreamSource = audioContext.createMediaStreamSource(stream);
                    const analyser = audioContext.createAnalyser();
                    analyser.fftSize = 512;
                    mediaStreamSource.connect(analyser);
                    
                    const bufferLength = analyser.frequencyBinCount;
                    const dataArray = new Uint8Array(bufferLength);
                    
                    let blowCooldown = false;
                    
                    function detectBlow() {
                        if (!micActive || activeCandlesCount === 0) {
                            stopMicStream();
                            return;
                        }
                        
                        analyser.getByteFrequencyData(dataArray);
                        
                        // Extract breath signature: average upper frequencies (blowing wind sounds)
                        let highFreqSum = 0;
                        const startBin = Math.floor(bufferLength * 0.46);
                        const endBin = Math.floor(bufferLength * 0.88);
                        for (let i = startBin; i < endBin; i++) {
                            highFreqSum += dataArray[i];
                        }
                        const average = highFreqSum / (endBin - startBin);
                        
                        // Volume threshold crossing triggers blowing out a candle
                        if (average > 40 && !blowCooldown) {
                            blowCooldown = true;
                            const unblown = candles.filter(c => !c.classList.contains('blown'));
                            if (unblown.length > 0) {
                                extinguishCandle(unblown[0]);
                            }
                            
                            setTimeout(() => {
                                blowCooldown = false;
                            }, 260); // Spacing between candle pops
                        }
                        
                        requestAnimationFrame(detectBlow);
                    }
                    
                    detectBlow();
                })
                .catch(err => {
                    console.warn("Microphone denied. Falling back to auto-sequence.", err);
                    autoBlowSequence();
                });
        });
    }
}

function stopMicStream() {
    micActive = false;
    if (micStream) {
        micStream.getTracks().forEach(track => track.stop());
        micStream = null;
    }
    const blowCandlesBtn = document.getElementById('blowCandlesBtn');
    if (blowCandlesBtn) {
        blowCandlesBtn.innerHTML = "<span class='btn-icon'>🎂</span> Blow Candles & Make a Wish!";
        blowCandlesBtn.style.background = "";
    }
}

function extinguishCandle(candle) {
    if (candle.classList.contains('blown')) return;
    
    candle.classList.add('blown');
    activeCandlesCount--;
    
    sounds.playPop();
    
    // Spawn smoke puff HTML element
    const puff = document.createElement('div');
    puff.className = 'smoke-puff';
    candle.appendChild(puff);
    setTimeout(() => puff.remove(), 1200);
    
    if (activeCandlesCount === 0) {
        triggerCandlesBlownCelebration();
    }
}

function autoBlowSequence() {
    let delay = 0;
    candles.forEach((c) => {
        if (!c.classList.contains('blown')) {
            setTimeout(() => extinguishCandle(c), delay);
            delay += 250;
        }
    });
}

function triggerCandlesBlownCelebration() {
    stopMicStream();
    sounds.playTada();
    confetti.spawn(110, true);
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => fireworks.spawnRocket(), i * 380);
    }
    
    const cakeInstruction = document.getElementById('cakeInstruction');
    if (cakeInstruction) {
        cakeInstruction.innerHTML = "✨ BEAUTIFUL! All candles are blown! Sing along Naga Arjun! 🎶✨";
        cakeInstruction.style.color = "var(--yellow)";
    }
    
    if (!soundPlaying && sounds.enabled) {
        soundPlaying = true;
        sounds.playHappyBirthday();
    }
}

// ==========================================================================
// 7. REAL-TIME COUNTDOWN TIMER
// ==========================================================================
function updateCountdown() {
    const now = new Date();
    // Target is Naga Arjun's 10th Birthday: May 31, 2027
    let targetDate = new Date(`May 31, 2027 00:00:00`);
    
    if (now > targetDate) {
        const nextYear = now.getFullYear() + 1;
        targetDate = new Date(`May 31, ${nextYear} 00:00:00`);
        const cdTitle = document.querySelector('.countdown-section .section-title');
        if (cdTitle) {
            cdTitle.innerHTML = `⚡ Countdown to Arjun's ${nextYear - 2017}th Birthday!`;
        }
    }
    
    const diff = targetDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const dVal = document.querySelector('#cdDays .countdown-val');
    const hVal = document.querySelector('#cdHours .countdown-val');
    const mVal = document.querySelector('#cdMinutes .countdown-val');
    const sVal = document.querySelector('#cdSeconds .countdown-val');
    
    if (dVal) dVal.textContent = days.toString().padStart(2, '0');
    if (hVal) hVal.textContent = hours.toString().padStart(2, '0');
    if (mVal) mVal.textContent = minutes.toString().padStart(2, '0');
    if (sVal) sVal.textContent = seconds.toString().padStart(2, '0');
}

// ==========================================================================
// 8. ARCADE MINI-GAMES CABINET
// ==========================================================================
let highScores = { balloons: 0, stars: 0, gifts: 0 };

function setupArcadeCabinet() {
    const gameTabs = document.querySelectorAll('.arcade-tab-btn');
    const gameViews = document.querySelectorAll('.game-view');
    
    gameTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            sounds.playPop();
            const targetViewId = tab.getAttribute('data-game');
            
            gameTabs.forEach(t => t.classList.remove('active'));
            gameViews.forEach(v => v.classList.remove('active'));
            
            tab.classList.add('active');
            const targetView = document.getElementById(targetViewId);
            if (targetView) targetView.classList.add('active');
            
            stopAllArcadeGames();
            
            if (targetViewId === 'gameStars') {
                resizeStarsCanvas();
            }
        });
    });
    
    // Joystick and button sounds
    const aBtn = document.getElementById('arcadeControlA');
    const bBtn = document.getElementById('arcadeControlB');
    const cBtn = document.getElementById('arcadeControlC');
    if (aBtn) aBtn.addEventListener('click', () => sounds.playLaser());
    if (bBtn) bBtn.addEventListener('click', () => sounds.playPop());
    if (cBtn) cBtn.addEventListener('click', () => sounds.playChime());
}

function stopAllArcadeGames() {
    endBalloonsGame();
    endStarsGame();
    endGiftsGame();
}

// --------------------------------------------------------------------------
// Game 1: Pop Balloons
// --------------------------------------------------------------------------
let balloonsGameInterval = null;
let balloonsTimerInterval = null;
let balloonsScoreVal = 0;
let balloonsTimeLeft = 30;
let balloonsGameActive = false;

const startBalloonsBtn = document.getElementById('startBalloonsBtn');
const balloonStartOverlay = document.getElementById('balloonStartOverlay');
const balloonPlayArea = document.getElementById('balloonPlayArea');
const balloonsScoreSpan = document.getElementById('balloonsScore');
const balloonsTimerSpan = document.getElementById('balloonsTimer');

if (startBalloonsBtn) {
    startBalloonsBtn.addEventListener('click', () => {
        sounds.playLaser();
        startBalloonsGame();
    });
}

function startBalloonsGame() {
    if (!balloonStartOverlay || !balloonPlayArea) return;
    
    balloonStartOverlay.style.display = 'none';
    balloonsScoreVal = 0;
    balloonsTimeLeft = 30;
    balloonsGameActive = true;
    
    if (balloonsScoreSpan) balloonsScoreSpan.textContent = balloonsScoreVal;
    if (balloonsTimerSpan) balloonsTimerSpan.textContent = balloonsTimeLeft;
    
    const existing = balloonPlayArea.querySelectorAll('.game-balloon-obj');
    existing.forEach(b => b.remove());
    
    balloonsGameInterval = setInterval(spawnGameBalloon, 850);
    balloonsTimerInterval = setInterval(() => {
        balloonsTimeLeft--;
        if (balloonsTimerSpan) balloonsTimerSpan.textContent = balloonsTimeLeft;
        
        if (balloonsTimeLeft <= 0) {
            endBalloonsGame(true);
        }
    }, 1000);
}

function spawnGameBalloon() {
    if (!balloonsGameActive || !balloonPlayArea) return;
    
    const balloonObj = document.createElement('div');
    balloonObj.className = 'game-balloon-obj';
    
    const body = document.createElement('div');
    body.className = 'game-balloon-body';
    balloonObj.appendChild(body);
    
    const string = document.createElement('div');
    string.className = 'game-balloon-string';
    balloonObj.appendChild(string);
    
    const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#A855F7', '#FF8C00'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    body.style.color = randomColor;
    body.style.backgroundColor = randomColor;
    
    const left = Math.random() * 84 + 6;
    balloonObj.style.left = `${left}%`;
    
    const scale = Math.random() * 0.35 + 0.8;
    balloonObj.style.transform = `scale(${scale})`;
    
    balloonPlayArea.appendChild(balloonObj);
    
    let bottomPos = -75;
    const speed = Math.random() * 2 + 1.6;
    const driftSpeed = (Math.random() - 0.5) * 0.4;
    
    function rise() {
        if (!balloonsGameActive || !balloonObj.parentNode) return;
        bottomPos += speed;
        balloonObj.style.bottom = `${bottomPos}px`;
        balloonObj.style.transform = `scale(${scale}) translateX(${Math.sin(bottomPos / 18) * 8}px)`;
        
        if (bottomPos > balloonPlayArea.clientHeight + 80) {
            balloonObj.remove();
        } else {
            requestAnimationFrame(rise);
        }
    }
    
    const triggerPop = (e) => {
        e.stopPropagation();
        e.preventDefault();
        popBalloon(balloonObj, randomColor);
    };
    
    balloonObj.addEventListener('mousedown', triggerPop);
    balloonObj.addEventListener('touchstart', triggerPop);
    
    requestAnimationFrame(rise);
}

function popBalloon(balloon, color) {
    if (!balloonsGameActive) return;
    
    balloonsScoreVal += 10;
    if (balloonsScoreSpan) balloonsScoreSpan.textContent = balloonsScoreVal;
    sounds.playPop();
    
    const rect = balloon.getBoundingClientRect();
    const playAreaRect = balloonPlayArea.getBoundingClientRect();
    const x = rect.left - playAreaRect.left + rect.width / 2;
    const y = rect.top - playAreaRect.top + rect.height / 2;
    
    spawnGamePopParticles(x, y, color);
    balloon.remove();
}

function spawnGamePopParticles(x, y, color) {
    const particleCount = 14;
    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'pop-particle';
        p.style.backgroundColor = color;
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.5 + 2;
        const dx = Math.cos(angle) * speed * 14;
        const dy = Math.sin(angle) * speed * 14;
        
        p.style.setProperty('--dx', `${dx}px`);
        p.style.setProperty('--dy', `${dy}px`);
        
        balloonPlayArea.appendChild(p);
        setTimeout(() => p.remove(), 400);
    }
}

function endBalloonsGame(showScore = false) {
    balloonsGameActive = false;
    clearInterval(balloonsGameInterval);
    clearInterval(balloonsTimerInterval);
    
    if (!balloonStartOverlay) return;
    
    if (showScore) {
        sounds.playTada();
        if (balloonsScoreVal > highScores.balloons) {
            highScores.balloons = balloonsScoreVal;
        }
        balloonStartOverlay.querySelector('h3').textContent = "🎈 TIME'S UP! 🎈";
        balloonStartOverlay.querySelector('p').innerHTML = `You popped a fantastic score of <strong style='color:var(--yellow); font-size:1.35rem;'>${balloonsScoreVal}</strong> points!<br>High Score: ${highScores.balloons} points.`;
        balloonStartOverlay.querySelector('button').textContent = "PLAY AGAIN";
        balloonStartOverlay.style.display = 'flex';
    } else {
        balloonStartOverlay.style.display = 'flex';
    }
}

// --------------------------------------------------------------------------
// Game 2: Catch Stars
// --------------------------------------------------------------------------
const starsGameCanvas = document.getElementById('starsGameCanvas');
let starsScoreVal = 0;
let starsTimeLeft = 30;
let starsGameActive = false;
let starsTimerInterval = null;
let starSpawnInterval = null;
let starsAnimFrame = null;

const startStarsBtn = document.getElementById('startStarsBtn');
const starsStartOverlay = document.getElementById('starsStartOverlay');
const starsScoreSpan = document.getElementById('starsScore');
const starsTimerSpan = document.getElementById('starsTimer');

let basketX = 150;
const basketWidth = 60;
const basketHeight = 15;
let fallingStars = [];
let starsPlayArea = document.getElementById('starsPlayArea');

if (startStarsBtn) {
    startStarsBtn.addEventListener('click', () => {
        sounds.playLaser();
        startStarsGame();
    });
}

function resizeStarsCanvas() {
    if (starsGameCanvas && starsPlayArea) {
        starsGameCanvas.width = starsPlayArea.clientWidth;
        starsGameCanvas.height = starsPlayArea.clientHeight;
    }
}

if (starsPlayArea && starsGameCanvas) {
    const handleMove = (clientX) => {
        if (!starsGameActive) return;
        const rect = starsGameCanvas.getBoundingClientRect();
        basketX = clientX - rect.left - basketWidth / 2;
        keepBasketInBounds();
    };

    starsPlayArea.addEventListener('mousemove', (e) => handleMove(e.clientX));
    
    starsPlayArea.addEventListener('touchmove', (e) => {
        if (!starsGameActive) return;
        const touch = e.touches[0];
        handleMove(touch.clientX);
        e.preventDefault();
    }, { passive: false });
}

function keepBasketInBounds() {
    if (basketX < 0) basketX = 0;
    if (basketX > starsGameCanvas.width - basketWidth) {
        basketX = starsGameCanvas.width - basketWidth;
    }
}

function startStarsGame() {
    resizeStarsCanvas();
    if (!starsStartOverlay) return;
    
    starsStartOverlay.style.display = 'none';
    starsScoreVal = 0;
    starsTimeLeft = 30;
    starsGameActive = true;
    fallingStars = [];
    basketX = starsGameCanvas.width / 2 - basketWidth / 2;
    
    if (starsScoreSpan) starsScoreSpan.textContent = starsScoreVal;
    if (starsTimerSpan) starsTimerSpan.textContent = starsTimeLeft;
    
    starSpawnInterval = setInterval(spawnFallingStar, 550);
    
    starsTimerInterval = setInterval(() => {
        starsTimeLeft--;
        if (starsTimerSpan) starsTimerSpan.textContent = starsTimeLeft;
        
        if (starsTimeLeft <= 0) {
            endStarsGame(true);
        }
    }, 1000);
    
    animateStarsGame();
}

function spawnFallingStar() {
    if (!starsGameActive) return;
    
    const x = Math.random() * (starsGameCanvas.width - 24) + 12;
    const isBomb = Math.random() > 0.82; // ~18% chance of prank bomb
    
    fallingStars.push({
        x: x,
        y: -15,
        speed: Math.random() * 2.2 + 2.5,
        size: isBomb ? 11 : 8,
        isBomb: isBomb,
        color: isBomb ? '#FF3366' : '#FFD93D',
        pulse: Math.random() * 5
    });
}

function animateStarsGame() {
    if (!starsGameActive) return;
    
    const ctx = starsGameCanvas.getContext('2d');
    ctx.clearRect(0, 0, starsGameCanvas.width, starsGameCanvas.height);
    
    // Draw Basket (Green styled box)
    ctx.fillStyle = '#6BCB77';
    ctx.beginPath();
    ctx.roundRect(basketX, starsGameCanvas.height - basketHeight - 12, basketWidth, basketHeight, 4);
    ctx.fill();
    
    // Center decorative ribbon
    ctx.fillStyle = '#FFD93D';
    ctx.fillRect(basketX + basketWidth / 2 - 4, starsGameCanvas.height - basketHeight - 12, 8, basketHeight);
    
    // Process falling items
    for (let i = fallingStars.length - 1; i >= 0; i--) {
        const star = fallingStars[i];
        star.y += star.speed;
        star.pulse += 0.12;
        
        if (star.isBomb) {
            ctx.fillStyle = star.color;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Fuse spark
            ctx.fillStyle = '#FFD93D';
            ctx.fillRect(star.x - 1.5, star.y - star.size - 4, 3, 3);
        } else {
            ctx.fillStyle = star.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = star.color;
            drawStarShape(ctx, star.x, star.y, 5, star.size + Math.sin(star.pulse) * 1.8, star.size / 2);
            ctx.shadowBlur = 0; // reset
        }
        
        // Basket Collision check
        const basketY = starsGameCanvas.height - basketHeight - 12;
        if (star.y >= basketY && star.y <= basketY + basketHeight + 10 &&
            star.x >= basketX - 8 && star.x <= basketX + basketWidth + 8) {
            
            fallingStars.splice(i, 1);
            
            if (star.isBomb) {
                starsScoreVal = Math.max(0, starsScoreVal - 15);
                sounds.playPop();
            } else {
                starsScoreVal += 10;
                sounds.playChime();
            }
            
            if (starsScoreSpan) starsScoreSpan.textContent = starsScoreVal;
            continue;
        }
        
        if (star.y > starsGameCanvas.height + 25) {
            fallingStars.splice(i, 1);
        }
    }
    
    starsAnimFrame = requestAnimationFrame(animateStarsGame);
}

function drawStarShape(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
}

function endStarsGame(showScore = false) {
    starsGameActive = false;
    clearInterval(starSpawnInterval);
    clearInterval(starsTimerInterval);
    cancelAnimationFrame(starsAnimFrame);
    
    if (!starsStartOverlay) return;
    
    if (showScore) {
        sounds.playTada();
        if (starsScoreVal > highScores.stars) {
            highScores.stars = starsScoreVal;
        }
        starsStartOverlay.querySelector('h3').textContent = "⭐ TIME'S UP! ⭐";
        starsStartOverlay.querySelector('p').innerHTML = `You caught an amazing score of <strong style='color:var(--yellow); font-size:1.35rem;'>${starsScoreVal}</strong> points!<br>High Score: ${highScores.stars} points.`;
        starsStartOverlay.querySelector('button').textContent = "PLAY AGAIN";
        starsStartOverlay.style.display = 'flex';
    } else {
        starsStartOverlay.style.display = 'flex';
    }
}

// --------------------------------------------------------------------------
// Game 3: Find Cake
// --------------------------------------------------------------------------
const giftsPlayArea = document.getElementById('giftsPlayArea');
const giftsScoreSpan = document.getElementById('giftsScore');
const giftsStatus = document.getElementById('giftsStatus');
const giftsStartOverlay = document.getElementById('giftsStartOverlay');
const startGiftsBtn = document.getElementById('startGiftsBtn');

let giftPrizes = ['🎂', '🚀', '🦖', '🎮', '🚗', '🎈'];
let giftGameActive = false;
let giftsOpenedCount = 0;
let giftScoreVal = 0;

if (startGiftsBtn) {
    startGiftsBtn.addEventListener('click', () => {
        sounds.playLaser();
        startGiftsGame();
    });
}

function startGiftsGame() {
    if (!giftsStartOverlay) return;
    
    giftsStartOverlay.style.display = 'none';
    giftGameActive = true;
    giftsOpenedCount = 0;
    
    if (giftsStatus) giftsStatus.textContent = "Unwrap the gifts and search for the hidden Birthday Cake! 🎂";
    
    shuffleArray(giftPrizes);
    
    for (let i = 0; i < 6; i++) {
        const giftBox = document.getElementById(`gift${i}`);
        const prizeDiv = document.getElementById(`prize${i}`);
        if (giftBox && prizeDiv) {
            giftBox.classList.remove('open');
            prizeDiv.textContent = giftPrizes[i];
            giftBox.style.pointerEvents = 'auto';
        }
    }
}

function setupGiftsGrid() {
    for (let i = 0; i < 6; i++) {
        const giftBox = document.getElementById(`gift${i}`);
        if (giftBox) {
            giftBox.addEventListener('click', () => {
                if (!giftGameActive || giftBox.classList.contains('open')) return;
                
                giftBox.classList.add('open');
                giftBox.style.pointerEvents = 'none';
                giftsOpenedCount++;
                
                const prizeIdx = parseInt(giftBox.getAttribute('data-index'));
                const prize = giftPrizes[prizeIdx];
                
                if (prize === '🎂') {
                    // Win state
                    giftScoreVal += 100;
                    if (giftsScoreSpan) giftsScoreSpan.textContent = giftScoreVal;
                    if (giftsStatus) giftsStatus.innerHTML = "<strong style='color:var(--yellow);'>🎂 YOU FOUND THE BIRTHDAY CAKE! 🎂</strong>";
                    
                    sounds.playTada();
                    confetti.spawn(100, true);
                    
                    for (let k = 0; k < 4; k++) {
                        setTimeout(() => fireworks.spawnRocket(), k * 280);
                    }
                    
                    endGiftsGame(true);
                } else {
                    giftScoreVal += 10;
                    if (giftsScoreSpan) giftsScoreSpan.textContent = giftScoreVal;
                    sounds.playChime();
                    
                    const toys = {
                        '🚀': 'Super Spaceship! 🚀',
                        '🦖': 'Dino T-Rex! 🦖',
                        '🎮': 'Chamber Arcade Controller! 🎮',
                        '🚗': 'Racing Sportscar! 🚗',
                        '🎈': 'Rising Party Balloon! 🎈'
                    };
                    if (giftsStatus) giftsStatus.textContent = `Sweet! You found: ${toys[prize] || prize}`;
                    
                    if (giftsOpenedCount === 5) {
                        if (giftsStatus) giftsStatus.textContent = "Only one gift box left! The Cake is guaranteed in there! 🎂";
                    }
                }
            });
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function endGiftsGame(victory = false) {
    giftGameActive = false;
    
    if (!giftsStartOverlay) return;
    
    setTimeout(() => {
        giftsStartOverlay.querySelector('h3').textContent = victory ? "🎉 CONGRATULATIONS! 🎉" : "🎁 ARCADE CABINET 🎁";
        giftsStartOverlay.querySelector('p').innerHTML = victory 
            ? `You successfully found Arjun's Birthday Cake and unlocked <strong style='color:var(--yellow); font-size:1.3rem;'>${giftScoreVal}</strong> points!`
            : "Find Naga Arjun's Birthday Cake inside the magical gift packages!";
        giftsStartOverlay.querySelector('button').textContent = "SEARCH AGAIN";
        giftsStartOverlay.style.display = 'flex';
    }, 1800);
}

// ==========================================================================
// 9. SYSTEM CORE CONTROL CONTROLLERS (Mega Celebration / Sound Control)
// ==========================================================================
function setupSystemControls() {
    // Sound ON/OFF Toggle
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', () => {
            sounds.enabled = !sounds.enabled;
            if (sounds.enabled) {
                soundToggleBtn.querySelector('.sound-icon').textContent = "🔊";
                soundToggleBtn.querySelector('.sound-text').textContent = "SOUND ON";
                sounds.init();
                sounds.playChime();
            } else {
                soundToggleBtn.querySelector('.sound-icon').textContent = "🔇";
                soundToggleBtn.querySelector('.sound-text').textContent = "SOUND OFF";
                sounds.stopAll();
                soundPlaying = false;
            }
        });
    }
    
    // Mega Celebration Button Trigger
    const megaCelebrateBtn = document.getElementById('megaCelebrateBtn');
    if (megaCelebrateBtn) {
        megaCelebrateBtn.addEventListener('click', () => {
            sounds.init();
            sounds.playTada();
            
            // Massive floating balloons cascade
            for (let i = 0; i < 15; i++) {
                setTimeout(spawnBgBalloon, i * 150);
            }
            
            // Explosive confetti
            confetti.spawn(130, true);
            confetti.spawn(100, false);
            
            // Non-stop fireworks display
            for (let i = 0; i < 12; i++) {
                setTimeout(() => fireworks.spawnRocket(), i * 360);
            }
            
            // Play birthday music
            if (!soundPlaying && sounds.enabled) {
                soundPlaying = true;
                sounds.playHappyBirthday();
            }
        });
    }
}

// ==========================================================================
// 10. ENTRY POINT / WINDOW DOM LOADING
// ==========================================================================
window.addEventListener('DOMContentLoaded', () => {
    // Instantiate Confetti and Fireworks canvases
    confetti = new ConfettiEngine(document.getElementById('confettiCanvas'));
    fireworks = new FireworksEngine(document.getElementById('fireworksCanvas'));
    
    // Floating clouds and balloons spawner routines
    setInterval(spawnCloud, 13000);
    setInterval(spawnBgBalloon, 1900);
    
    // Seed initial clouds & balloons
    for (let i = 0; i < 3; i++) {
        setTimeout(spawnCloud, i * 3800);
    }
    for (let i = 0; i < 5; i++) {
        setTimeout(spawnBgBalloon, i * 900);
    }
    
    // Setup subsystems
    setupEnvelope();
    setupCakeCandles();
    setupArcadeCabinet();
    setupGiftsGrid();
    setupSystemControls();
    
    // Countdown updater
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Document unlock listener for AudioContext restrictions
    document.body.addEventListener('click', () => {
        sounds.init();
    }, { once: true });
});
