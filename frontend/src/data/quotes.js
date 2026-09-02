export const DAILY_QUOTES = [
  '无所谓，躺平也是一种态度。',
  '今天不卷，明天也不卷。',
  '摸鱼使人快乐，奶蛙使人治愈。',
  '事情总会过去的，先躺一会儿。',
  '佛系一点，世界就安静了。',
  '加班？不存在的，我先浮在水面上。',
  '人生苦短，不如发会儿呆。',
  '拒绝内耗，从躺平开始。',
  '你急你的，我躺我的。',
  '今天也是元气满满地…躺着的一天。',
  '摆烂不是堕落，是自我保护。',
  '奶蛙说：随便吧，都可以。',
  '工作可以等等，放松不能少。',
  '累了就歇，饿了就吃，困了就睡。',
  '不是所有问题都需要立刻解决。',
  '慢一点没关系，奶蛙陪你。',
  '把烦恼交给水流，把自己交给躺椅。',
  '今日目标：完成呼吸。',
  '躺平是为了更好地…继续躺。',
  '世界很大，奶蛙很小，但很可爱。'
]

export function getDailyQuote(date = new Date()) {
  const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  }
  return DAILY_QUOTES[hash % DAILY_QUOTES.length]
}

export function getDailyImageIndex(total, date = new Date()) {
  if (!total) return 0
  const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  }
  return hash % total
}
