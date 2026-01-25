# 贡献指南

感谢您对 Maptalks GL Vue 的关注！我们欢迎来自社区的贡献。

[English Documentation](./CONTRIBUTING.md)

## 快速开始

### 环境要求

- Node.js >= 20.19.0 或 >= 22.12.0
- npm >= 8.0.0 或 pnpm 或 yarn

### 开发环境配置

1. Fork 仓库
2. 克隆你的 fork：

```bash
git clone https://github.com/你的用户名/maptalks-gl-vue.git
cd maptalks-gl-vue
```

3. 安装依赖：

```bash
npm install
```

4. 配置环境变量：

```bash
cp example/.env.example example/.env
# 编辑 example/.env 填入你的 API keys
```

5. 启动开发服务器：

```bash
npm run example:dev
```

## 开发流程

### 项目结构

```
maptalks-gl-vue/
├── src/                  # 源代码
│   ├── api/             # API 工具函数
│   ├── components/      # Vue 组件
│   ├── composables/     # Vue 组合式函数
│   ├── context/         # 全局上下文和配置
│   ├── core/            # 核心地图功能
│   ├── decorators/      # 几何图形装饰器
│   ├── layers/          # 图层实现
│   ├── styles/          # 全局样式
│   └── utils/           # 工具函数
├── example/             # 示例应用
├── assets/              # 静态资源
└── dist/                # 构建输出
```

### 代码规范

我们使用 TypeScript 并遵循以下约定：

- 所有新代码使用 TypeScript
- 遵循现有代码风格（使用 ESLint 和 Prettier）
- 编写有意义的提交信息
- 为公共 API 添加 JSDoc 注释
- 使用描述性的变量名

### 提交信息规范

我们遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<类型>(<范围>): <主题>

<正文>

<页脚>
```

**类型：**

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档变更
- `style`: 代码格式（不影响代码运行）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 添加或更新测试
- `chore`: 维护任务
- `ci`: CI/CD 变更

**示例：**

```
feat(MapPicker): 添加自定义图标支持
fix(MapViewer): 修复 iOS 上的全屏行为
docs(README): 更新安装说明
refactor(core): 改进图层管理
```

### 测试

提交 Pull Request 之前：

1. 构建库：

```bash
npm run build
```

2. 测试示例应用：

```bash
npm run example:dev
```

3. 验证 TypeScript 类型：

```bash
npx vue-tsc --noEmit
```

## Pull Request 流程

1. **创建功能分支**

```bash
git checkout -b feat/你的功能名称
# 或
git checkout -b fix/你的bug修复
```

2. **进行修改**

   - 编写清晰、简洁的代码
   - 必要时添加注释
   - 更新文档（如需要）

3. **提交修改**

```bash
git add .
git commit -m "feat: 添加惊艳的功能"
```

4. **推送到你的 Fork**

```bash
git push origin feat/你的功能名称
```

5. **创建 Pull Request**
   - 前往原始仓库
   - 点击 "New Pull Request"
   - 选择你的 fork 和分支
   - 填写 PR 模板
   - 关联相关 issue

### Pull Request 指南

- **标题**：使用 conventional commit 格式
- **描述**：
  - 清楚描述你做了什么修改
  - 解释为什么做这些修改
  - UI 变更请包含截图
  - 引用相关 issue
- **大小**：保持 PR 专注且大小合理
- **测试**：确保示例应用正常工作
- **文档**：如果修改了 API，请更新文档

## 添加新功能

### 添加新组件

1. 在 `src/components/` 创建组件文件
2. 从 `src/components/index.ts` 导出
3. 添加 TypeScript 类型
4. 更新文档
5. 添加使用示例

### 添加新图层类型

1. 在 `src/layers/` 创建图层类
2. 在 `src/decorators/` 创建装饰器
3. 从各自的 `index.ts` 文件导出
4. 添加使用示例
5. 更新文档

### 添加新地图源

1. 在 `src/context/base-layers/` 添加图层配置
2. 在 `constant.ts` 中更新新的图层 ID
3. 添加缩略图到 `assets/thumbs/`
4. 在 `src/context/config/cdn.ts` 更新 CDN 路径
5. 更新文档

## 文档

### 更新文档

- API 变更时更新 README.md 和 README.zh-CN.md
- 保持中英文文档同步
- 包含代码示例
- 有帮助时添加截图

### 文档风格

- 使用清晰、简洁的语言
- 提供完整的代码示例
- 包含常见用例
- 记录边界情况和限制

## 发布流程

发布由维护者处理：

1. 更新 `package.json` 中的版本号
2. 更新 `CHANGELOG.md`
3. 创建 git 标签
4. 发布到 npm
5. 创建 GitHub release

## 发布策略

- alpha/beta 是下一个稳定版本的预发布版本
- 两者共享相同的基本版本
- 没有专门为预发布创建变更集
- 预发布退出仅在稳定发布之前发生

## 获取帮助

- 📧 邮箱：chenyyz1015@gmail.com
- 🐛 问题：[GitHub Issues](https://github.com/chenyyz1015/maptalks-gl-vue/issues)
- 💬 讨论：[GitHub Discussions](https://github.com/chenyyz1015/maptalks-gl-vue/discussions)

## 行为准则

### 我们的承诺

我们致力于为每个人提供一个友好和包容的环境。

### 期望的行为

- 尊重和体谅他人
- 欢迎新人
- 优雅地接受建设性批评
- 专注于对社区最有利的事情

### 不可接受的行为

- 骚扰或歧视
- 恶意攻击或侮辱性评论
- 个人或政治攻击
- 发布他人的私人信息

## 许可证

通过为 Maptalks GL Vue 做出贡献，您同意您的贡献将在 MIT 许可证下获得许可。

## 感谢！

您的贡献让这个项目变得更好。我们感谢您的时间和努力！🎉
