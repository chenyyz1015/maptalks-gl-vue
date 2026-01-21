# Contributing to Maptalks GL Vue

Thank you for your interest in contributing to Maptalks GL Vue! We welcome contributions from the community.

[中文文档](./CONTRIBUTING.zh-CN.md)

## Getting Started

### Prerequisites

- Node.js >= 20.19.0 or >= 22.12.0
- npm >= 8.0.0 or pnpm or yarn

### Development Setup

1. Fork the repository
2. Clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/maptalks-gl-vue.git
cd maptalks-gl-vue
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

```bash
cp example/.env.example example/.env
# Edit example/.env with your API keys
```

5. Start the development server:

```bash
npm run example:dev
```

## Development Workflow

### Project Structure

```
maptalks-gl-vue/
├── src/                  # Source code
│   ├── api/             # API utilities
│   ├── components/      # Vue components
│   ├── composables/     # Vue composables
│   ├── context/         # Global context and configuration
│   ├── core/            # Core map functionality
│   ├── decorators/      # Geometry decorators
│   ├── layers/          # Layer implementations
│   ├── styles/          # Global styles
│   └── utils/           # Utility functions
├── example/             # Example application
├── assets/              # Static assets
└── dist/                # Build output
```

### Code Style

We use TypeScript and follow these conventions:

- Use TypeScript for all new code
- Follow existing code style (we use ESLint and Prettier)
- Write meaningful commit messages
- Add JSDoc comments for public APIs
- Use descriptive variable names

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

**Examples:**

```
feat(MapPicker): add custom icon support
fix(MapViewer): correct fullscreen behavior on iOS
docs(README): update installation instructions
refactor(core): improve layer management
```

### Testing

Before submitting a pull request:

1. Build the library:

```bash
npm run build
```

2. Test the example application:

```bash
npm run example:dev
```

3. Verify TypeScript types:

```bash
npx vue-tsc --noEmit
```

## Pull Request Process

1. **Create a Feature Branch**

```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

2. **Make Your Changes**
   - Write clear, concise code
   - Add comments where necessary
   - Update documentation if needed

3. **Commit Your Changes**

```bash
git add .
git commit -m "feat: add amazing feature"
```

4. **Push to Your Fork**

```bash
git push origin feat/your-feature-name
```

5. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template
   - Link related issues

### Pull Request Guidelines

- **Title**: Use conventional commit format
- **Description**:
  - Clearly describe what changes you made
  - Explain why you made these changes
  - Include screenshots for UI changes
  - Reference related issues
- **Size**: Keep PRs focused and reasonably sized
- **Tests**: Ensure the example app works correctly
- **Documentation**: Update docs if you changed APIs

## Adding New Features

### Adding a New Component

1. Create component file in `src/components/`
2. Export from `src/components/index.ts`
3. Add TypeScript types
4. Update documentation
5. Add usage example

### Adding a New Layer Type

1. Create layer class in `src/layers/`
2. Create decorator in `src/decorators/`
3. Export from respective `index.ts` files
4. Add usage examples
5. Update documentation

### Adding a New Map Source

1. Add layer configuration in `src/context/base-layers/`
2. Update `constant.ts` with new layer IDs
3. Add thumbnail image to `assets/thumbs/`
4. Update CDN paths in `src/context/config/cdn.ts`
5. Update documentation

## Documentation

### Updating Documentation

- Update README.md and README.zh-CN.md for API changes
- Keep both English and Chinese docs synchronized
- Include code examples
- Add screenshots when helpful

### Documentation Style

- Use clear, simple language
- Provide complete code examples
- Include common use cases
- Document edge cases and limitations

## Release Process

Releases are handled by maintainers:

1. Version bump in `package.json`
2. Update `CHANGELOG.md`
3. Create git tag
4. Publish to npm
5. Create GitHub release

## Getting Help

- 📧 Email: chenyyz1015@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/chenyyz1015/maptalks-gl-vue/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/chenyyz1015/maptalks-gl-vue/discussions)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for everyone.

### Expected Behavior

- Be respectful and considerate
- Welcome newcomers
- Accept constructive criticism gracefully
- Focus on what's best for the community

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information

## License

By contributing to Maptalks GL Vue, you agree that your contributions will be licensed under the MIT License.

## Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort! 🎉
