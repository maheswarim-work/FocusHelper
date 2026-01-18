# FocusHelper Constitution

## Core Principles

### I. Simplicity First
Keep the codebase minimal and understandable. No frameworks or libraries unless they solve a real problem. Vanilla HTML/CSS/JS preferred for simple features. Every dependency must justify its inclusion.

### II. Localhost Development
All features must work locally without external services. No cloud dependencies for core functionality. Use local storage or file-based persistence. Development server must start with a single command.

### III. Progressive Enhancement
Core functionality works without JavaScript. CSS handles layout and styling. JavaScript enhances interactivity. Graceful degradation for older browsers.

### IV. Single Responsibility
Each file does one thing well. Components are self-contained. No circular dependencies. Clear separation between structure (HTML), presentation (CSS), and behavior (JS).

### V. Test Before Ship
Manual testing checklist required before any feature is complete. Core user flows must be verified in browser. Edge cases documented and tested.

## Technical Constraints

- **Build tools and frameworks allowed when explicitly requested**: When a user specifically requests build tools (Vite, webpack) or frameworks (React, Vue), these are permitted. Otherwise, vanilla HTML/CSS/JS preferred.
- **No external APIs**: All data stays local
- **Responsive design**: Works on mobile and desktop
- **Accessibility**: Semantic HTML, keyboard navigation, sufficient color contrast
- **Browser support**: Modern browsers (last 2 versions of Chrome, Firefox, Safari, Edge)

## Development Workflow

- Features developed on feature branches (`###-feature-name`)
- Manual browser testing before merge
- Code changes must include updated CLAUDE.md if architecture changes
- No minification or bundling for development

## Governance

This constitution guides all development decisions. Violations require documented justification. Amendments need explicit approval and must be reflected in dependent specifications.

**Version**: 1.0.0 | **Ratified**: 2026-01-17 | **Last Amended**: 2026-01-17
