# 🐸 奶蛙世界 - Milk Frog World

一个以 Maximalism/Dopamine 设计风格为特色的奶蛙介绍网站。

## 技术栈

| 层 | 技术 |
|---|------|
| 前端 | Vue 3 + Vite + Element Plus + Tailwind CSS v4 |
| 后端 | FastAPI (Python) |
| 设计系统 | Maximalism / Dopamine 风格 |

## 项目结构

```
NAIWA/
├── frontend/          # Vue3 前端项目
│   ├── src/
│   │   ├── components/ui/   # 可复用UI组件
│   │   ├── views/           # 页面组件
│   │   ├── router/          # 路由配置
│   │   ├── stores/          # Pinia 状态管理
│   │   └── utils/           # 工具函数
│   └── public/
├── backend/           # FastAPI 后端
│   ├── app/
│   │   ├── api/             # API 路由
│   │   ├── models/          # 数据模型
│   │   └── utils/           # 工具函数
│   └── requirements.txt
├── images/            # 奶蛙图片资源 (448张)
└── docs/              # 项目文档
```

## 快速开始

### 前端

```bash
cd frontend
npm install
npm run dev
```

前端开发服务器运行在 http://localhost:5173

### 后端

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

后端 API 运行在 http://localhost:8000

### API 文档

启动后端后，访问 http://localhost:8000/docs 查看 Swagger API 文档。

## 设计系统

本项目采用 **Maximalism / Dopamine** 设计风格：

- **颜色**: 5种强调色轮换 (黄色、品红、青色、橙色、紫色)
- **黄色 (#FFE600)** 作为主要肢体色彩
- **字体**: Outfit (标题) + DM Sans (正文) + Bangers (装饰)
- **特效**: 堆叠阴影、渐变文字、浮动动画、图案叠加
- **原则**: MORE IS MORE - 每个像素都应带来视觉愉悦

## 页面

- **首页** (`/`) - 英雄区域 + 统计数据 + 特色功能 + 时间线
- **关于** (`/about`) - 奶蛙起源故事 + 特征 + 使用场景
- **图片库** (`/gallery`) - 448张奶蛙表情包展示 + 分类 + 搜索
- **联系** (`/contact`) - 联系表单 + FAQ

## 图片资源

图片来源于网络公开传播的奶蛙/变异奶龙表情图，仅供个人娱乐使用，请勿用于商业用途。

## License

个人娱乐项目，非商业用途。
