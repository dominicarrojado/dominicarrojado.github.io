const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

let failed = false;

function logFail(message) {
  console.error(`\x1b[31mFAIL: ${message}\x1b[0m`);
  failed = true;
}

function logPass(message) {
  console.log(`\x1b[32mPASS: ${message}\x1b[0m`);
}

console.log(
  'Starting verification of OpenCode Config, Subagents & Skills...\n'
);

// 1. Validate opencode.json
const configPath = path.join(process.cwd(), 'opencode.json');
if (fs.existsSync(configPath)) {
  try {
    const configRaw = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configRaw);

    if (config.instructions && Array.isArray(config.instructions)) {
      config.instructions.forEach((instrFile) => {
        const filePath = path.join(process.cwd(), instrFile);
        if (!fs.existsSync(filePath)) {
          logFail(
            `opencode.json instruction file "${instrFile}" does not exist.`
          );
        }
      });
    }

    if (config.skills && Array.isArray(config.skills.paths)) {
      config.skills.paths.forEach((skillPath) => {
        const fullPath = path.join(process.cwd(), skillPath);
        if (!fs.existsSync(fullPath)) {
          logFail(`opencode.json skill path "${skillPath}" does not exist.`);
        }
      });
    }

    if (!failed) {
      logPass('opencode.json verified successfully.');
    }
  } catch (err) {
    logFail(`Error parsing opencode.json: ${err.message}`);
  }
} else {
  console.log('No opencode.json config found.');
}

console.log('');

// 2. Validate Subagents
const agentsDir = path.join(process.cwd(), '.opencode', 'agents');
if (fs.existsSync(agentsDir)) {
  const agentFiles = fs.readdirSync(agentsDir).filter((f) => f.endsWith('.md'));
  agentFiles.forEach((file) => {
    const filePath = path.join(agentsDir, file);
    let localFailed = false;

    function logAgentFail(message) {
      console.error(`\x1b[31mFAIL: ${message}\x1b[0m`);
      localFailed = true;
      failed = true;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(content);
      const data = parsed.data;

      if (data.name && data.name !== path.basename(file, '.md')) {
        logAgentFail(
          `Agent name "${data.name}" in frontmatter does not match filename "${file}".`
        );
      }

      if (!data.description) {
        logAgentFail(
          `Agent file "${file}" is missing "description" in frontmatter.`
        );
      }

      const validModes = ['subagent', 'primary', 'all'];
      if (data.mode && !validModes.includes(data.mode)) {
        logAgentFail(
          `Agent file "${file}" has invalid mode "${data.mode}". Must be one of: ${validModes.join(', ')}.`
        );
      }

      if (!localFailed) {
        logPass(`Agent "${file}" verified successfully.`);
      }
    } catch (err) {
      logAgentFail(`Error parsing agent "${file}": ${err.message}`);
    }
  });
} else {
  console.log('No .opencode/agents directory found.');
}

console.log('');

// 3. Validate Skills
const skillsDir = path.join(process.cwd(), '.opencode', 'skills');
if (fs.existsSync(skillsDir)) {
  const skillFolders = fs.readdirSync(skillsDir).filter((f) => {
    return fs.statSync(path.join(skillsDir, f)).isDirectory();
  });

  skillFolders.forEach((folder) => {
    const skillFilePath = path.join(skillsDir, folder, 'SKILL.md');
    let localFailed = false;

    function logLocalFail(message) {
      console.error(`\x1b[31mFAIL: ${message}\x1b[0m`);
      localFailed = true;
      failed = true;
    }

    if (!fs.existsSync(skillFilePath)) {
      logLocalFail(`Skill folder "${folder}" is missing a "SKILL.md" file.`);
      return;
    }

    try {
      const content = fs.readFileSync(skillFilePath, 'utf8');
      const parsed = matter(content);
      const data = parsed.data;

      if (!data.name) {
        logLocalFail(
          `Skill "${folder}/SKILL.md" is missing "name" in frontmatter.`
        );
      } else if (data.name !== folder) {
        logLocalFail(
          `Skill name "${data.name}" in frontmatter does not match folder name "${folder}".`
        );
      }

      if (!data.description) {
        logLocalFail(
          `Skill "${folder}/SKILL.md" is missing "description" in frontmatter.`
        );
      }

      if (!localFailed) {
        logPass(`Skill "${folder}" verified successfully.`);
      }
    } catch (err) {
      logLocalFail(`Error parsing skill "${folder}/SKILL.md": ${err.message}`);
    }
  });
} else {
  console.log('No .opencode/skills directory found.');
}

console.log('');

if (failed) {
  console.log(
    '\x1b[31m❌ Verification failed. Please check the errors above.\x1b[0m'
  );
  process.exit(1);
} else {
  console.log(
    '\x1b[32m✔ All OpenCode agents and skills verified successfully!\x1b[0m'
  );
  process.exit(0);
}
