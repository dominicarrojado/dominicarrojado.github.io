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

console.log('Starting verification of Gemini Subagents & Skills...\n');

// Validate Subagents
const agentsDir = path.join(process.cwd(), '.gemini', 'agents');
if (fs.existsSync(agentsDir)) {
  const agentFiles = fs.readdirSync(agentsDir).filter((f) => f.endsWith('.md'));
  agentFiles.forEach((file) => {
    const filePath = path.join(agentsDir, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(content);
      const data = parsed.data;

      if (!data.name) {
        logFail(`Agent file "${file}" is missing "name" in frontmatter.`);
      } else if (data.name !== path.basename(file, '.md')) {
        logFail(
          `Agent name "${data.name}" in frontmatter does not match filename "${file}".`
        );
      }

      if (!data.description) {
        logFail(
          `Agent file "${file}" is missing "description" in frontmatter.`
        );
      }

      if (!failed) {
        logPass(`Agent "${file}" verified successfully.`);
      }
    } catch (err) {
      logFail(`Error parsing agent "${file}": ${err.message}`);
    }
  });
} else {
  console.log('No agents directory found.');
}

console.log('');

// Validate Skills
const skillsDir = path.join(process.cwd(), '.gemini', 'skills');
if (fs.existsSync(skillsDir)) {
  const skillFolders = fs.readdirSync(skillsDir).filter((f) => {
    return fs.statSync(path.join(skillsDir, f)).isDirectory();
  });

  skillFolders.forEach((folder) => {
    const skillFilePath = path.join(skillsDir, folder, 'SKILL.md');
    if (!fs.existsSync(skillFilePath)) {
      logFail(`Skill folder "${folder}" is missing a "SKILL.md" file.`);
      return;
    }

    try {
      const content = fs.readFileSync(skillFilePath, 'utf8');
      const parsed = matter(content);
      const data = parsed.data;

      if (!data.name) {
        logFail(`Skill "${folder}/SKILL.md" is missing "name" in frontmatter.`);
      } else if (data.name !== folder) {
        logFail(
          `Skill name "${data.name}" in frontmatter does not match folder name "${folder}".`
        );
      }

      if (!data.description) {
        logFail(
          `Skill "${folder}/SKILL.md" is missing "description" in frontmatter.`
        );
      }

      if (!failed) {
        logPass(`Skill "${folder}" verified successfully.`);
      }
    } catch (err) {
      logFail(`Error parsing skill "${folder}/SKILL.md": ${err.message}`);
    }
  });
} else {
  console.log('No skills directory found.');
}

console.log('');

if (failed) {
  console.log(
    '\x1b[31m❌ Verification failed. Please check the errors above.\x1b[0m'
  );
  process.exit(1);
} else {
  console.log(
    '\x1b[32m✔ All Gemini agents and skills verified successfully!\x1b[0m'
  );
  process.exit(0);
}
