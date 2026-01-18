# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FocusHelper is a new project with SpecKit (specification-driven development) tooling configured. No source code exists yet - the project is ready for feature development using the SpecKit workflow.

## SpecKit Workflow

This project uses SpecKit, a specification-first development workflow. Features are developed through these commands in order:

1. `/speckit.specify <description>` - Create feature specification from natural language
2. `/speckit.clarify` - Identify and resolve underspecified areas in the spec
3. `/speckit.plan` - Generate technical implementation plan with design artifacts
4. `/speckit.tasks` - Break plan into actionable, dependency-ordered tasks
5. `/speckit.implement` - Execute the implementation by processing tasks.md
6. `/speckit.analyze` - Cross-artifact consistency and quality analysis

### Additional Commands
- `/speckit.constitution` - Create/update project constitution (development principles)
- `/speckit.checklist` - Generate custom checklist for current feature
- `/speckit.taskstoissues` - Convert tasks to GitHub issues

## Project Structure

```
.specify/
├── memory/constitution.md    # Project development principles (template - needs filling)
├── templates/                # Templates for spec, plan, tasks, checklists
└── scripts/bash/             # Workflow automation scripts
    ├── create-new-feature.sh # Creates feature branch and spec file
    ├── setup-plan.sh         # Initializes plan.md for a feature
    ├── check-prerequisites.sh # Validates required docs exist
    └── update-agent-context.sh # Updates AI context files

specs/                        # Feature specifications (created per feature)
└── ###-feature-name/
    ├── spec.md               # Feature specification
    ├── plan.md               # Implementation plan
    ├── tasks.md              # Task breakdown
    ├── research.md           # Technical decisions
    ├── data-model.md         # Entity definitions
    ├── quickstart.md         # Integration scenarios
    ├── contracts/            # API specifications
    └── checklists/           # Quality validation checklists
```

## Key SpecKit Principles

- **Specification first**: Define WHAT and WHY before HOW
- **Technology-agnostic specs**: No implementation details in specifications
- **Prioritized user stories**: P1, P2, P3 with independent testability
- **Task format**: `- [ ] T001 [P] [US1] Description with file path`
  - `[P]` = parallelizable task
  - `[US1]` = user story label
- **Constitution compliance**: All features must pass constitution gates
