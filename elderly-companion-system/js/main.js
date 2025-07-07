// 时间更新功能
function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('currentTime').textContent = `${hours}:${minutes}`;
    
    // 更新问候语
    let greeting = '';
    if (hours < 6) {
        greeting = '凌晨好';
    } else if (hours < 12) {
        greeting = '早上好';
    } else if (hours < 14) {
        greeting = '中午好';
    } else if (hours < 18) {
        greeting = '下午好';
    } else {
        greeting = '晚上好';
    }
    document.getElementById('greeting').textContent = `${greeting}，王大爷`;
    
    // 更新日期
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const dateStr = now.toLocaleDateString('zh-CN', options);
    document.getElementById('currentDate').textContent = dateStr;
}

// 每分钟更新时间
setInterval(updateTime, 60000);
updateTime(); // 初始化

// 模拟天气数据
function updateWeather() {
    // 这里可以接入真实的天气API
    const weatherData = {
        temp: Math.floor(Math.random() * 15 + 20),
        desc: ['晴天', '多云', '阴天', '小雨'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 30 + 40),
        airQuality: ['优', '良', '轻度污染'][Math.floor(Math.random() * 3)]
    };
    
    document.querySelector('.temp').textContent = `${weatherData.temp}°C`;
    document.querySelector('.weather-desc').textContent = weatherData.desc;
    
    // 更新天气图标
    const weatherIcon = document.querySelector('.weather-icon');
    weatherIcon.className = 'fas weather-icon';
    switch (weatherData.desc) {
        case '晴天':
            weatherIcon.classList.add('fa-sun');
            break;
        case '多云':
            weatherIcon.classList.add('fa-cloud-sun');
            break;
        case '阴天':
            weatherIcon.classList.add('fa-cloud');
            break;
        case '小雨':
            weatherIcon.classList.add('fa-cloud-rain');
            break;
    }
}

// 语音助手功能
function startVoiceAssistant() {
    alert('语音助手功能已启动\n您可以说："打电话给儿子"、"查看健康数据"、"今天吃什么药"等');
    // 实际应用中，这里会调用语音识别API
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('您好，有什么可以帮助您的吗？');
        utterance.lang = 'zh-CN';
        speechSynthesis.speak(utterance);
    }
}

// 健康详情页
function openHealthDetails() {
    window.location.href = 'health.html';
}

// 用药详情页
function openMedicationDetails() {
    window.location.href = 'medications.html';
}

// 环境详情页
function openEnvironmentDetails() {
    alert('环境监测详情：\n室内温度：25°C\n湿度：55%\n空气质量：优\n\n建议：当前环境舒适，适合休息');
}

// 日程详情页
function openScheduleDetails() {
    window.location.href = 'schedule.html';
}

// 联系家人功能
function callFamily() {
    const familyMembers = [
        { name: '儿子', phone: '13800138001' },
        { name: '女儿', phone: '13800138002' },
        { name: '老伴', phone: '13800138003' }
    ];
    
    let message = '请选择要联系的家人：\n';
    familyMembers.forEach((member, index) => {
        message += `${index + 1}. ${member.name} - ${member.phone}\n`;
    });
    
    const choice = prompt(message);
    if (choice && choice >= 1 && choice <= familyMembers.length) {
        const selected = familyMembers[choice - 1];
        alert(`正在拨打${selected.name}的电话：${selected.phone}`);
        // 实际应用中，这里会调用电话API
        window.location.href = `tel:${selected.phone}`;
    }
}

// 紧急求助功能
function emergencyCall() {
    if (confirm('确定要发起紧急求助吗？\n将立即联系紧急联系人和医疗服务')) {
        alert('紧急求助已发出！\n正在联系：\n1. 紧急联系人（儿子）\n2. 社区医疗服务中心\n3. 120急救中心');
        // 实际应用中，这里会发送紧急通知
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log('紧急位置信息：', position.coords.latitude, position.coords.longitude);
            });
        }
    }
}

// 聊天陪伴功能
function openChat() {
    window.location.href = 'chat.html';
}

// 位置共享功能
function shareLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            alert(`您的当前位置已共享给家人\n纬度：${position.coords.latitude.toFixed(6)}\n经度：${position.coords.longitude.toFixed(6)}`);
            // 实际应用中，这里会发送位置信息给家人
        }, function(error) {
            alert('无法获取您的位置信息，请检查定位权限');
        });
    } else {
        alert('您的浏览器不支持定位功能');
    }
}

// 用药提醒功能
document.querySelector('.take-med-btn')?.addEventListener('click', function(e) {
    e.stopPropagation();
    if (confirm('确认已服用维生素D吗？')) {
        this.innerHTML = '<i class="fas fa-check-double"></i> 已确认';
        this.style.background = '#10B981';
        this.style.color = 'white';
        
        // 更新下次服药时间
        const nextDose = document.querySelector('.next-dose span');
        nextDose.textContent = '下次服用：晚上7:00';
        
        // 语音提醒
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('好的，已记录您服用了维生素D');
            utterance.lang = 'zh-CN';
            speechSynthesis.speak(utterance);
        }
    }
});

// 模拟实时健康数据更新
function updateHealthData() {
    // 模拟心率变化
    const heartRate = 70 + Math.floor(Math.random() * 10);
    document.querySelector('.heart-rate .value').textContent = `${heartRate} 次/分`;
    
    // 模拟血压变化
    const systolic = 115 + Math.floor(Math.random() * 15);
    const diastolic = 75 + Math.floor(Math.random() * 10);
    document.querySelector('.blood-pressure .value').textContent = `${systolic}/${diastolic}`;
}

// 每30秒更新一次健康数据
setInterval(updateHealthData, 30000);

// 检查用药时间提醒
function checkMedicationReminders() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    // 检查是否到了用药时间
    if (hours === 14 && minutes === 0) {
        alert('用药提醒：请服用维生素D 1000 IU');
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('用药提醒：请服用维生素D');
            utterance.lang = 'zh-CN';
            speechSynthesis.speak(utterance);
        }
    }
}

// 每分钟检查一次用药提醒
setInterval(checkMedicationReminders, 60000);

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    updateWeather();
    
    // 添加页面切换动画
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // 检测是否在线
    window.addEventListener('online', function() {
        console.log('网络已连接');
    });
    
    window.addEventListener('offline', function() {
        alert('网络连接已断开，部分功能可能无法使用');
    });
});