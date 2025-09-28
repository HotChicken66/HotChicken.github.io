// 烟花动效
class Fireworks {
    constructor() {
        this.container = document.getElementById('fireworks');
        this.colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8'];
        this.init();
    }

    init() {
        // 页面加载后延迟1秒开始烟花
        setTimeout(() => {
            this.createFireworks();
            // 每3秒创建一次烟花
            setInterval(() => {
                this.createFireworks();
            }, 3000);
        }, 1000);
    }

    createFireworks() {
        const fireworksCount = Math.random() * 3 + 2; // 2-5个烟花
        
        for (let i = 0; i < fireworksCount; i++) {
            setTimeout(() => {
                this.createSingleFirework();
            }, i * 200);
        }
    }

    createSingleFirework() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.1;
        const particleCount = Math.random() * 20 + 15; // 15-35个粒子
        
        for (let i = 0; i < particleCount; i++) {
            this.createParticle(x, y);
        }
    }

    createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const angle = (Math.PI * 2 * Math.random());
        const velocity = Math.random() * 100 + 50;
        const size = Math.random() * 4 + 2;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.backgroundColor = color;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        const deltaX = Math.cos(angle) * velocity;
        const deltaY = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--delta-x', deltaX + 'px');
        particle.style.setProperty('--delta-y', deltaY + 'px');
        
        // 添加自定义动画
        particle.style.animation = `fireworkParticle 2s ease-out forwards`;
        
        this.container.appendChild(particle);
        
        // 2秒后移除粒子
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
}

// 添加粒子动画的CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fireworkParticle {
        0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
        }
        10% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--delta-x), var(--delta-y)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 页面加载完成后初始化烟花
document.addEventListener('DOMContentLoaded', () => {
    new Fireworks();
    
    // 添加点击触发烟花效果
    document.addEventListener('click', (e) => {
        const fireworks = new Fireworks();
        fireworks.createSingleFirework();
    });
});

// 添加一些额外的交互效果
document.addEventListener('DOMContentLoaded', () => {
    // 为二维码图片添加点击放大功能
    const qrImage = document.querySelector('.qr-image');
    if (qrImage) {
        qrImage.style.cursor = 'pointer';
        qrImage.title = '点击查看大图';
        
        qrImage.addEventListener('click', () => {
            showQRModal(qrImage.src);
        });
    }
});

// 显示二维码大图模态框
function showQRModal(imageSrc) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        cursor: pointer;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        animation: zoomIn 0.3s ease-out;
    `;
    
    const closeText = document.createElement('div');
    closeText.textContent = '点击任意位置关闭';
    closeText.style.cssText = `
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-size: 16px;
        background: rgba(0,0,0,0.5);
        padding: 10px 20px;
        border-radius: 25px;
    `;
    
    modal.appendChild(img);
    modal.appendChild(closeText);
    document.body.appendChild(modal);
    
    // 点击关闭模态框
    modal.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    });
}

// 显示提示消息
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 2000);
}

// 添加滑入滑出动画和模态框动画
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    @keyframes zoomIn {
        from {
            transform: scale(0.5);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(toastStyle);