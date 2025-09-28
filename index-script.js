// 粒子系统
class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles');
        this.particles = [];
        this.init();
    }

    init() {
        this.createParticles();
        setInterval(() => {
            this.createParticle();
        }, 200);
    }

    createParticles() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createParticle();
            }, i * 100);
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const x = Math.random() * window.innerWidth;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 3 + 5;
        const delay = Math.random() * 2;
        
        particle.style.left = x + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        this.container.appendChild(particle);
        
        // 清理粒子
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (duration + delay) * 1000);
    }
}

// 打字机效果
class TypeWriter {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        setTimeout(() => {
            this.type();
        }, 2000);
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.innerHTML = currentText.substring(0, this.charIndex - 1) + '<span class="typing-cursor"></span>';
            this.charIndex--;
        } else {
            this.element.innerHTML = currentText.substring(0, this.charIndex + 1) + '<span class="typing-cursor"></span>';
            this.charIndex++;
        }

        let typeSpeed = this.speed;
        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000; // 停留时间
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// 页面切换功能
class PageTransition {
    constructor() {
        this.init();
    }

    init() {
        const button = document.getElementById('revealButton');
        button.addEventListener('click', () => {
            this.transitionToWelcome();
        });
    }

    transitionToWelcome() {
        // 创建过渡动画
        const transition = document.createElement('div');
        transition.className = 'page-transition';
        transition.innerHTML = `
            <div class="transition-content">
                <div class="loading-spinner"></div>
                <p>正在为你揭晓结果...</p>
            </div>
        `;
        
        document.body.appendChild(transition);
        
        // 触发动画
        setTimeout(() => {
            transition.classList.add('active');
        }, 10);
        
        // 跳转到欢迎页面
        setTimeout(() => {
            window.location.href = 'welcome.html';
        }, 2000);
    }
}

// 背景音效（可选）
class SoundEffects {
    constructor() {
        this.audioContext = null;
        this.init();
    }

    init() {
        // 创建音频上下文（需要用户交互才能启用）
        document.addEventListener('click', () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        }, { once: true });
    }

    playClickSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    // 初始化粒子系统
    new ParticleSystem();
    
    // 初始化打字机效果
    const typingElement = document.getElementById('typingText');
    const texts = [
        '感谢你参加我们的面试...',
        '你的表现让我们印象深刻...',
        '现在，让我们为你揭晓结果！'
    ];
    new TypeWriter(typingElement, texts, 80);
    
    // 初始化页面切换
    new PageTransition();
    
    // 初始化音效
    const soundEffects = new SoundEffects();
    
    // 为按钮添加音效
    const button = document.getElementById('revealButton');
    button.addEventListener('click', () => {
        soundEffects.playClickSound();
    });
    
    // 添加鼠标跟随效果
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // 创建鼠标跟随粒子
        if (Math.random() < 0.1) {
            createMouseParticle(mouseX, mouseY);
        }
    });
    
    function createMouseParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: rgba(33, 150, 243, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: mouseParticle 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
    
    // 添加鼠标粒子动画
    const mouseParticleStyle = document.createElement('style');
    mouseParticleStyle.textContent = `
        @keyframes mouseParticle {
            0% {
                transform: scale(0) translate(0, 0);
                opacity: 1;
            }
            100% {
                transform: scale(1) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(mouseParticleStyle);
});

// 窗口大小改变时重新计算粒子位置
window.addEventListener('resize', () => {
    // 清理现有粒子并重新创建
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    });
});