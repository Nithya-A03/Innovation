export const allKeywords = [
  'javascript', 'node.js', 'react', 'express',
  'mongodb', 'sql', 'aws', 'docker', 'git', 'typescript'
];

export function analyzeKeywords(text) {
  return allKeywords.filter(keyword => text.includes(keyword.toLowerCase()));
}
