import type { Plugin } from "@opencode-ai/plugin"
import { join } from "path"
import { homedir } from "os"
import { mkdir, writeFile } from "fs/promises"

interface Skill {
  name: string
  description: string
  prompt: string
}

const skills: Skill[] = [
  {
    name: "simplify",
    description:
      "Simplify code for clarity, consistency, and maintainability while preserving functionality",
    prompt: `Simplify the code in this session for clarity, consistency, and maintainability while preserving all functionality. Focus on recently modified code sections unless instructed otherwise.

Core principles:
- Never alter what code does, only how it does it
- Enhance clarity by reducing complexity and eliminating redundancy
- Avoid nested ternary operators; prefer switch statements or if/else chains
- Prioritize explicit, readable code over compact solutions
- Maintain proper React patterns with explicit Props types
- Use consistent error handling approaches
- Remove unnecessary comments describing obvious functionality
- Avoid over-simplification that could reduce maintainability

Work proactively on the code, refining it for elegance and maintainability.`,
  },
]

function buildSkillContent(skill: Skill): string {
  return `---\nname: ${skill.name}\ndescription: ${skill.description}\n---\n\n${skill.prompt}\n`
}

async function installSkill(skill: Skill, baseDir: string): Promise<void> {
  const dir = join(baseDir, skill.name)
  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, "SKILL.md"), buildSkillContent(skill), "utf-8")
}

export const OpenCodePluginsCC: Plugin = async () => {
  const baseDir = join(homedir(), ".config", "opencode", "skills")
  try {
    await Promise.all(skills.map((skill) => installSkill(skill, baseDir)))
  } catch {
    // Skill installation failed — don't crash OpenCode startup
  }
  return {}
}

export default OpenCodePluginsCC
