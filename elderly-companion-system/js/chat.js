// 聊天功能JavaScript

// 预定义的回复
const replies = {
    '今天天气怎么样？': '今天天气晴朗，温度30°C，建议您多喝水，避免中午外出。',
    '提醒我吃药': '好的，我已经为您设置了用药提醒。下次服药时间是下午2:00，维生素D 1000 IU。',
    '给我讲个故事': '从前有一座山，山上有座庙，庙里有个老和尚在给小和尚讲故事...您想听什么类型的故事呢？我可以给您讲历史故事、童话故事或者生活趣事。',
    '播放音乐': '正在为您播放轻松的音乐...♪♫♪ 您喜欢听什么类型的音乐呢？',
    '你好': '您好！很高兴为您服务。有什么需要帮助的吗？',
    '我感觉不舒服': '听到您不舒服我很担心。请问您哪里不舒服呢？需要我帮您联系家人或医生吗？',
    '今天吃什么': '根据您的健康状况，建议今天的饮食清淡一些。早餐可以喝粥配青菜，午餐吃些鱼肉和蔬菜，晚餐喝汤配面条。记得要少油少盐哦！',
    '我想打电话': '好的，请问您想联系谁呢？我可以帮您拨打电话给：1. 儿子 2. 女儿 3. 老伴',
};

// 获取当前时间
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// 发送消息
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // 添加用户消息
    addMessage(message, 'user');
    
    // 清空输入框
    input.value = '';
    
    // 模拟助手回复
    setTimeout(() => {
        const reply = getReply(message);
        addMessage(reply, 'assistant');
        
        // 语音播报回复
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(reply);
            utterance.lang = 'zh-CN';
            speechSynthesis.speak(utterance);
        }
    }, 1000);
}

// 添加消息到聊天窗口
function addMessage(text, sender) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'avatar';
    avatarDiv.innerHTML = sender === 'user' 
        ? '<i class="fas fa-user"></i>' 
        : '<i class="fas fa-robot"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `
        <p>${text}</p>
        <span class="time">${getCurrentTime()}</span>
    `;
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    // 移除快速回复按钮（如果存在）
    const quickReplies = messagesDiv.querySelector('.quick-replies');
    if (quickReplies && sender === 'user') {
        quickReplies.remove();
    }
    
    messagesDiv.appendChild(messageDiv);
    
    // 滚动到底部
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// 获取回复
function getReply(message) {
    // 查找预定义回复
    for (let key in replies) {
        if (message.includes(key)) {
            return replies[key];
        }
    }
    
    // 默认回复
    const defaultReplies = [
        '我理解您的意思，让我想想如何帮助您。',
        '好的，我明白了。还有什么其他需要帮助的吗？',
        '这是个好问题，让我为您查询一下。',
        '我会记住这个信息的，谢谢您告诉我。'
    ];
    
    return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
}

// 发送快速回复
function sendQuickReply(text) {
    document.getElementById('messageInput').value = text;
    sendMessage();
}

// 处理回车键
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// 开始语音输入
let isRecording = false;
function startVoiceInput() {
    const voiceBtn = document.querySelector('.voice-input-btn');
    
    if (!isRecording) {
        voiceBtn.classList.add('recording');
        isRecording = true;
        
        // 使用语音识别API（如果支持）
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            
            recognition.lang = 'zh-CN';
            recognition.continuous = false;
            recognition.interimResults = false;
            
            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                document.getElementById('messageInput').value = transcript;
                sendMessage();
            };
            
            recognition.onerror = function(event) {
                console.error('语音识别错误:', event.error);
                alert('语音识别失败，请重试');
            };
            
            recognition.onend = function() {
                voiceBtn.classList.remove('recording');
                isRecording = false;
            };
            
            recognition.start();
        } else {
            // 不支持语音识别
            alert('您的浏览器不支持语音识别功能');
            voiceBtn.classList.remove('recording');
            isRecording = false;
        }
    } else {
        // 停止录音
        voiceBtn.classList.remove('recording');
        isRecording = false;
    }
}

// 开始语音通话
function startVoiceCall() {
    alert('正在连接语音通话...\n通话功能需要配合实际的通话服务使用');
    // 实际应用中，这里会连接到语音通话服务
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 聚焦输入框
    document.getElementById('messageInput').focus();
    
    // 添加一些示例对话
    setTimeout(() => {
        addMessage('我可以帮您：\n• 查看天气\n• 设置用药提醒\n• 联系家人\n• 陪您聊天解闷', 'assistant');
    }, 2000);
});