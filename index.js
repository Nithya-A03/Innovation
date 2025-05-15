import path from 'path';
import chalk from 'chalk';

import { readResume } from './modules/fileReader.js';
import { cleanText } from './modules/textCleaner.js';
import { analyzeKeywords, allKeywords } from './modules/keywordAnalyzer.js';
import { saveReport } from './modules/reportGenerator.js';
import { log } from './modules/logger.js';

// __dirname fix for ES modules:
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runAnalyzer(filePath) {
  try {
    log(`Starting analysis for ${filePath}`);

    const rawText = await readResume(filePath);
    const cleanedText = cleanText(rawText);
    const matchedKeywords = analyzeKeywords(cleanedText);

    const totalKeywords = allKeywords.length;
    const matchedCount = matchedKeywords.length;
    const score = Math.round((matchedCount / totalKeywords) * 100);
    const missingKeywords = allKeywords.filter(kw => !matchedKeywords.includes(kw));

    const verdict = score >= 60 ? "ACCEPTABLE" : "NOT ACCEPTABLE";

    const report = {
      file: filePath,
      matchedKeywords,
      missingKeywords,
      score,
      verdict
    };

    await saveReport(report);
    log(`Analysis complete. Score: ${score}. Verdict: ${verdict}`);

    console.log(chalk.blue.bold('\n======= Resume Analysis Report ======='));
    console.log(chalk.white(`File: ${filePath}`));
    console.log(chalk.green(`✅ Matched Keywords: ${matchedKeywords.join(', ') || 'None'}`));
    console.log(chalk.red(`❌ Missing Keywords: ${missingKeywords.join(', ') || 'None'}`));

    const scoreColor = score >= 80
      ? chalk.greenBright
      : score >= 60
      ? chalk.yellowBright
      : chalk.redBright;

    console.log(scoreColor(`📊 Resume Score: ${score}/100`));

    const verdictColor = score >= 60 ? chalk.green : chalk.red;
    console.log(verdictColor.bold(`📋 Verdict: Resume is ${verdict}`));
    console.log(chalk.blue.bold('======================================\n'));

  } catch (err) {
    log(`Error: ${err.message}`);
    console.error(chalk.red('An error occurred:'), err.message);
  }
}

const resumePath = path.join(__dirname, 'resumes', 'resume.pdf');
runAnalyzer(resumePath);
