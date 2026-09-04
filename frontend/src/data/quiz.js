export const QUIZ_QUESTIONS = [
  {
    question: '周一早上闹钟响了，你的第一反应是？',
    options: [
      { text: '再睡五分钟，世界等我', score: { lazy: 3, chill: 1 } },
      { text: '起来！今天也要加油', score: { energetic: 3 } },
      { text: '关掉闹钟，假装没听到', score: { lazy: 2, chill: 2 } },
      { text: '先看看手机有没有消息', score: { social: 2, chill: 1 } }
    ]
  },
  {
    question: '同事请你帮忙加班，你会？',
    options: [
      { text: '委婉拒绝，我的时间很宝贵', score: { lazy: 2, chill: 2 } },
      { text: '好的没问题！', score: { energetic: 3 } },
      { text: '能拖就拖，能推就推', score: { lazy: 3 } },
      { text: '看心情，今天不想动', score: { chill: 3 } }
    ]
  },
  {
    question: '周末最理想的状态是？',
    options: [
      { text: '躺床上刷手机一整天', score: { lazy: 3, chill: 1 } },
      { text: '出门社交，见朋友', score: { social: 3 } },
      { text: '泡个澡，发发呆', score: { chill: 3 } },
      { text: '运动健身，充实自己', score: { energetic: 3 } }
    ]
  },
  {
    question: '遇到烦心事，你通常？',
    options: [
      { text: '无所谓，时间会冲淡一切', score: { chill: 3 } },
      { text: '躺平，不去想它', score: { lazy: 3 } },
      { text: '找朋友吐槽', score: { social: 3 } },
      { text: '积极解决，不拖泥带水', score: { energetic: 3 } }
    ]
  },
  {
    question: '用一句话形容你的人生态度？',
    options: [
      { text: '随便吧，都可以', score: { chill: 3, lazy: 1 } },
      { text: '躺平万岁', score: { lazy: 3 } },
      { text: '冲冲冲', score: { energetic: 3 } },
      { text: '开心就好', score: { social: 2, chill: 2 } }
    ]
  }
]

export const QUIZ_RESULTS = {
  lazy: {
    title: '躺平奶蛙',
    emoji: '😴',
    desc: '你是一只标准的躺平奶蛙！慵懒是你的天赋，浮在水面上是你的使命。今天什么都不想做？没关系，奶蛙陪你一起躺。',
    color: '#8B877D'
  },
  chill: {
    title: '佛系奶蛙',
    emoji: '🧘',
    desc: '你是一只佛系奶蛙！遇事不慌，心态超稳。世界纷纷扰扰，你自岿然不动——因为无所谓。',
    color: '#F3F0E8'
  },
  energetic: {
    title: '元气奶蛙',
    emoji: '⚡',
    desc: '你是一只罕见的元气奶蛙！虽然奶蛙通常躺平，但你居然还能卷？respect！记得也要适当休息哦。',
    color: '#A94B3C'
  },
  social: {
    title: '社交奶蛙',
    emoji: '🎉',
    desc: '你是一只社交奶蛙！喜欢和朋友分享快乐，表情包是你的语言。把奶蛙的快乐传播给更多人吧！',
    color: '#292825'
  }
}

export function calcQuizResult(scores) {
  let best = 'chill'
  let max = -1
  for (const [key, val] of Object.entries(scores)) {
    if (val > max) {
      max = val
      best = key
    }
  }
  return QUIZ_RESULTS[best] || QUIZ_RESULTS.chill
}
