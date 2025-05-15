import fs from 'fs/promises';
import path from 'path';

export async function saveReport(report) {
  const reportDir = path.resolve('reports');
  await fs.mkdir(reportDir, { recursive: true });
  const fileName = path.join(reportDir, `report-${Date.now()}.json`);
  await fs.writeFile(fileName, JSON.stringify(report, null, 2), 'utf-8');
}
