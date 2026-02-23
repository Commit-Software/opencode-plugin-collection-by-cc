# opencode-plugins-cc

A collection of [OpenCode](https://opencode.ai) plugins that add useful slash commands to your AI coding workflow.

## Installation

**1. Install the package globally:**

```bash
npm install -g opencode-plugins-cc
# or
bun add -g opencode-plugins-cc
```

**2. Add to your `opencode.json`:**

```json
{
  "plugin": ["opencode-plugins-cc"]
}
```

**3. (Re)start OpenCode** — all skills are installed automatically and the commands below will be available.

---

## Available Commands

### `/simplify`

Simplify code for clarity, consistency, and maintainability — without changing what the code does.

Ported from Anthropic's official [code-simplifier Claude plugin](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/code-simplifier).

**Usage:**

```
/simplify
/simplify the authentication module
/simplify and focus on reducing nested conditionals
```

**What it does:**

- Never changes behavior — only improves how code is written
- Reduces complexity and eliminates redundancy
- Replaces nested ternary operators with `switch` or `if/else`
- Prefers explicit, readable code over compact one-liners
- Maintains proper React patterns with explicit `Props` types
- Removes comments that just describe the obvious
- Focuses on recently modified code by default

---

## Requirements

- OpenCode v0.15.0+
- Bun (used internally by OpenCode)

## How It Works

When OpenCode loads this plugin, it writes a `SKILL.md` file for each command into `~/.config/opencode/skills/`. OpenCode discovers these skills on startup and makes them available as slash commands.

## License

Apache-2.0
