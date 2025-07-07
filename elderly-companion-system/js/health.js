// 健康页面JavaScript

// 刷新健康数据
function refreshHealthData() {
    const refreshBtn = document.querySelector('.refresh-btn i');
    refreshBtn.classList.add('fa-spin');
    
    // 模拟数据刷新
    setTimeout(() => {
        // 更新血压
        const systolic = 115 + Math.floor(Math.random() * 15);
        const diastolic = 75 + Math.floor(Math.random() * 10);
        document.querySelector('.blood-pressure .main-value').textContent = `${systolic}/${diastolic}`;
        
        // 更新心率
        const heartRate = 68 + Math.floor(Math.random() * 12);
        document.querySelector('.heart-rate .main-value').textContent = heartRate;
        
        // 更新血糖
        const bloodSugar = (4.5 + Math.random() * 1.5).toFixed(1);
        document.querySelector('.blood-sugar .main-value').textContent = bloodSugar;
        
        // 更新体温
        const temperature = (36.2 + Math.random() * 0.6).toFixed(1);
        document.querySelector('.temperature .main-value').textContent = temperature;
        
        // 更新健康指数
        const healthScore = 85 + Math.floor(Math.random() * 10);
        document.querySelector('.score').textContent = healthScore;
        
        // 更新最后更新时间
        const updates = document.querySelectorAll('.last-update');
        updates.forEach(update => {
            if (update.textContent !== '实时监测中') {
                update.textContent = '刚刚更新';
            }
        });
        
        refreshBtn.classList.remove('fa-spin');
        
        // 显示提示
        showNotification('数据已更新');
    }, 1000);
}

// 显示历史记录
function showHistory(period) {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    const historyContent = document.querySelector('.history-content');
    
    switch(period) {
        case 'week':
            historyContent.innerHTML = `
                <div style="text-align: center;">
                    <p style="font-size: var(--font-size-large); margin-bottom: 10px;">最近一周健康趋势</p>
                    <p>血压平均值：118/78 mmHg</p>
                    <p>心率平均值：73 次/分</p>
                    <p>健康指数：稳定在90-95之间</p>
                </div>
            `;
            break;
        case 'month':
            historyContent.innerHTML = `
                <div style="text-align: center;">
                    <p style="font-size: var(--font-size-large); margin-bottom: 10px;">最近一月健康趋势</p>
                    <p>血压控制良好，波动较小</p>
                    <p>心率稳定，运动后恢复迅速</p>
                    <p>血糖控制在正常范围内</p>
                </div>
            `;
            break;
        case 'year':
            historyContent.innerHTML = `
                <div style="text-align: center;">
                    <p style="font-size: var(--font-size-large); margin-bottom: 10px;">年度健康报告</p>
                    <p>整体健康状况：优秀</p>
                    <p>需要注意：适量增加运动</p>
                    <p>建议：保持当前生活习惯</p>
                </div>
            `;
            break;
    }
}

// 显示通知
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--secondary-color);
        color: white;
        padding: 15px 30px;
        border-radius: 10px;
        font-size: var(--font-size-normal);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 模拟实时心率监测
let heartbeatInterval;
function simulateHeartbeat() {
    const heartIcon = document.querySelector('.heart-rate-animation i');
    let beatCount = 0;
    
    heartbeatInterval = setInterval(() => {
        // 每分钟更新一次心率值
        if (beatCount % 60 === 0) {
            const heartRate = 68 + Math.floor(Math.random() * 12);
            document.querySelector('.heart-rate .main-value').textContent = heartRate;
        }
        beatCount++;
    }, 1000);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 启动心率模拟
    simulateHeartbeat();
    
    // 定期自动刷新数据（每5分钟）
    setInterval(() => {
        refreshHealthData();
    }, 300000);
    
    // 添加手势支持（左滑返回）
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX - touchStartX > 50) {
            // 右滑，返回上一页
            history.back();
        }
    }
});

// 页面离开时清理
window.addEventListener('beforeunload', () => {
    if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
    }
});