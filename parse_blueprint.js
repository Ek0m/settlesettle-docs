const fs = require('fs');
const path = require('path');

const blueprintPath = path.join(__dirname, 'blueprint.md');
const content = fs.readFileSync(blueprintPath, 'utf8');

// Normalize line endings
const lines = content.replace(/\r\n/g, '\n').split('\n');

const pages = [];
let currentPage = null;
let state = 'search_page'; // 'search_page', 'search_metadata', 'collect_content'
let contentLines = [];

console.log(`Total lines: ${lines.length}`);

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();

  if (state === 'search_page') {
    const pageMatch = line.match(/^### Page (\d+):\s*(.*)$/);
    if (pageMatch) {
      currentPage = {
        number: parseInt(pageMatch[1], 10),
        title: pageMatch[2].trim(),
        slug: '',
        category: '',
        content: ''
      };
      state = 'search_metadata';
    }
  } else if (state === 'search_metadata') {
    const slugMatch = line.match(/^\*\s+\*\*Slug\*\*:\s*`(.*?)`/);
    if (slugMatch) {
      currentPage.slug = slugMatch[1].trim();
    }
    const catMatch = line.match(/^\*\s+\*\*Category\*\*:\s*`(.*?)`/);
    if (catMatch) {
      currentPage.category = catMatch[1].trim();
    }
    if (line.startsWith('* **Content**:')) {
      const nextLine = (lines[i + 1] || '').trim();
      if (nextLine.startsWith('```markdown')) {
        i++; // skip the ```markdown line
        state = 'collect_content';
        contentLines = [];
      }
    }
  } else if (state === 'collect_content') {
    if (line === '```') {
      let isEnd = false;
      let j = i + 1;
      // Skip empty lines
      while (j < lines.length && lines[j].trim() === '') {
        j++;
      }
      if (j < lines.length) {
        const nextContentLine = lines[j].trim();
        if (nextContentLine === '---') {
          // It is followed by '---'. Now check if the next non-empty line is a page header or section end.
          let k = j + 1;
          while (k < lines.length && lines[k].trim() === '') {
            k++;
          }
          if (k < lines.length) {
            const afterHrLine = lines[k].trim();
            if (afterHrLine.startsWith('### Page') || afterHrLine.startsWith('## 4. Prompt')) {
              isEnd = true;
              j = k - 1; // Position j before the header so it gets parsed correctly or skipped
            }
          }
        } else if (nextContentLine.startsWith('## 4. Prompt')) {
          isEnd = true;
        }
      } else {
        isEnd = true; // end of file
      }
      
      if (isEnd) {
        currentPage.content = contentLines.join('\n');
        pages.push(currentPage);
        currentPage = null;
        state = 'search_page';
        i = j; // Advance index to the separator line
        continue;
      }
    }
    // We keep the original line inside the content block
    contentLines.push(lines[i]);
  }
}

console.log(`Parsed ${pages.length} pages.`);

const outputDir = path.join(__dirname, 'lib');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const docsDataTsPath = path.join(outputDir, 'docs-data.ts');
const fileContent = `export interface DocPage {
  number: number;
  title: string;
  slug: string;
  category: string;
  content: string;
}

export const docsPages: DocPage[] = ${JSON.stringify(pages, null, 2)};
`;

fs.writeFileSync(docsDataTsPath, fileContent, 'utf8');
console.log(`Generated ${docsDataTsPath}`);
