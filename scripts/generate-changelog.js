#!/usr/bin/env node

/**
 * 自动生成 CHANGELOG 脚本
 * 基于 Conventional Commits 规范从 git 提交记录生成更新日志
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const CHANGELOG_FILE = path.join(__dirname, "../CHANGELOG.md");
const COMMIT_TYPES = {
  feat: { title: "Added", emoji: "✨" },
  fix: { title: "Fixed", emoji: "🐛" },
  docs: { title: "Documentation", emoji: "📝" },
  style: { title: "Styles", emoji: "💄" },
  refactor: { title: "Refactored", emoji: "♻️" },
  perf: { title: "Performance", emoji: "⚡" },
  test: { title: "Tests", emoji: "✅" },
  build: { title: "Build", emoji: "📦" },
  ci: { title: "CI/CD", emoji: "👷" },
  chore: { title: "Chores", emoji: "🔧" },
  revert: { title: "Reverts", emoji: "⏪" }
};

/**
 * 执行 shell 命令
 */
function exec(command) {
  try {
    return execSync(command, { encoding: "utf-8" }).trim();
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    return "";
  }
}

/**
 * 获取最新的 tag
 */
function getLatestTag() {
  const tag = exec("git describe --tags --abbrev=0 2>/dev/null");
  return tag || null;
}

/**
 * 获取提交记录
 */
function getCommits(from = null) {
  const range = from ? `${from}..HEAD` : "HEAD";
  const commits = exec(`git log ${range} --pretty=format:"%H|%s|%an|%ae|%ad" --date=short`);

  if (!commits) return [];

  return commits.split("\n").map((line) => {
    const [hash, subject, author, email, date] = line.split("|");
    return { hash, subject, author, email, date };
  });
}

/**
 * 解析 Conventional Commit
 */
function parseCommit(subject) {
  const conventionalRegex = /^(\w+)(\(([^)]+)\))?: (.+)$/;
  const match = subject.match(conventionalRegex);

  if (!match) {
    return {
      type: "other",
      scope: null,
      subject: subject,
      breaking: subject.includes("BREAKING CHANGE")
    };
  }

  return {
    type: match[1],
    scope: match[3] || null,
    subject: match[4],
    breaking: subject.includes("BREAKING CHANGE") || subject.includes("!")
  };
}

/**
 * 分组提交
 */
function groupCommits(commits) {
  const grouped = {};
  const breaking = [];

  commits.forEach((commit) => {
    const parsed = parseCommit(commit.subject);

    if (parsed.breaking) {
      breaking.push({ ...commit, parsed });
    }

    const type = parsed.type;
    if (!grouped[type]) {
      grouped[type] = [];
    }

    grouped[type].push({ ...commit, parsed });
  });

  return { grouped, breaking };
}

/**
 * 生成 Markdown 内容
 */
function generateMarkdown(commits, version = "Unreleased", date = null) {
  const { grouped, breaking } = groupCommits(commits);

  let markdown = `## [${version}]`;
  if (date) {
    markdown += ` - ${date}`;
  }
  markdown += "\n\n";

  // Breaking Changes
  if (breaking.length > 0) {
    markdown += `### ⚠️ BREAKING CHANGES\n\n`;
    breaking.forEach((commit) => {
      markdown += `- ${commit.parsed.subject} ([${commit.hash.substring(0, 7)}](https://github.com/chenyyz1015/maptalks-gl-vue/commit/${commit.hash}))\n`;
    });
    markdown += "\n";
  }

  // 按类型分组
  Object.keys(COMMIT_TYPES).forEach((type) => {
    if (grouped[type] && grouped[type].length > 0) {
      const typeInfo = COMMIT_TYPES[type];
      markdown += `### ${typeInfo.emoji} ${typeInfo.title}\n\n`;

      grouped[type].forEach((commit) => {
        const scope = commit.parsed.scope ? `**${commit.parsed.scope}**: ` : "";
        markdown += `- ${scope}${commit.parsed.subject} ([${commit.hash.substring(0, 7)}](https://github.com/chenyyz1015/maptalks-gl-vue/commit/${commit.hash}))\n`;
      });

      markdown += "\n";
    }
  });

  // 其他提交
  if (grouped.other && grouped.other.length > 0) {
    markdown += `### 📌 Other Changes\n\n`;
    grouped.other.forEach((commit) => {
      markdown += `- ${commit.parsed.subject} ([${commit.hash.substring(0, 7)}](https://github.com/chenyyz1015/maptalks-gl-vue/commit/${commit.hash}))\n`;
    });
    markdown += "\n";
  }

  return markdown;
}

/**
 * 更新 CHANGELOG.md
 */
function updateChangelog(newContent) {
  let changelog = "";

  if (fs.existsSync(CHANGELOG_FILE)) {
    changelog = fs.readFileSync(CHANGELOG_FILE, "utf-8");
  } else {
    // 如果文件不存在，创建基础结构
    changelog = `# Changelog\n\nAll notable changes to this project will be documented in this file.\n\nThe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),\nand this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n\n`;
  }

  // 查找 [Unreleased] 部分
  const unreleasedRegex = /## \[Unreleased\][\s\S]*?(?=\n## \[|$)/;
  const match = changelog.match(unreleasedRegex);

  if (match) {
    // 替换 [Unreleased] 部分
    changelog = changelog.replace(unreleasedRegex, newContent);
  } else {
    // 在第一个版本之前插入
    const versionRegex = /## \[/;
    const versionMatch = changelog.match(versionRegex);

    if (versionMatch) {
      const insertIndex = changelog.indexOf(versionMatch[0]);
      changelog = changelog.slice(0, insertIndex) + newContent + "\n" + changelog.slice(insertIndex);
    } else {
      // 如果没有任何版本，直接追加
      changelog += newContent;
    }
  }

  fs.writeFileSync(CHANGELOG_FILE, changelog, "utf-8");
}

/**
 * 主函数
 */
function main() {
  console.log("🚀 Generating changelog...\n");

  const latestTag = getLatestTag();
  console.log(`📌 Latest tag: ${latestTag || "None"}\n`);

  const commits = getCommits(latestTag);

  if (commits.length === 0) {
    console.log("✅ No new commits found.");
    return;
  }

  console.log(`📝 Found ${commits.length} commits\n`);

  const markdown = generateMarkdown(commits);
  updateChangelog(markdown);

  console.log("✅ CHANGELOG.md updated successfully!");
  console.log(`📄 File: ${CHANGELOG_FILE}\n`);
}

// 执行
main();
