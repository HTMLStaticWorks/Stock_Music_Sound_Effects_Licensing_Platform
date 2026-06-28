const fs = require('fs');
const path = require('path');

const dir = 'd:/June Websites/Stock Music & Sound Effects Licensing Platform';

// Update CSS
const cssPath = path.join(dir, 'assets/css/style.css');
let css = fs.readFileSync(cssPath, 'utf8');
css = css.replace('grid-template-columns: 2fr 1fr 1fr 1fr;', 'grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;');
fs.writeFileSync(cssPath, css);

// HTML files
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const socialIcons = `
        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
          <a href="#" style="color: var(--text-secondary);"><i data-lucide="twitter"></i></a>
          <a href="#" style="color: var(--text-secondary);"><i data-lucide="facebook"></i></a>
          <a href="#" style="color: var(--text-secondary);"><i data-lucide="instagram"></i></a>
          <a href="#" style="color: var(--text-secondary);"><i data-lucide="youtube"></i></a>
        </div>`;

const contactBlock = `
      <div>
        <h3 class="footer-title">Contact Us</h3>
        <ul class="footer-links">
          <li><a href="mailto:support@audiosync.com" style="display: flex; align-items: center; gap: 0.5rem;"><i data-lucide="mail" style="width: 16px; height: 16px;"></i> support@audiosync.com</a></li>
          <li><a href="mailto:licensing@audiosync.com" style="display: flex; align-items: center; gap: 0.5rem;"><i data-lucide="mail" style="width: 16px; height: 16px;"></i> licensing@audiosync.com</a></li>
        </ul>
      </div>`;

let count = 0;
for (const file of files) {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Add social icons
    if (!html.includes('data-lucide="twitter"') && html.includes('professional sound effects.</p>')) {
        html = html.replace('professional sound effects.</p>', 'professional sound effects.</p>' + socialIcons);
        changed = true;
    }

    // 2. Add Contact Block
    const legalEnd = `          <li><a href="#">Privacy Policy</a></li>\r
        </ul>\r
      </div>`;
    const legalEndLF = `          <li><a href="#">Privacy Policy</a></li>\n        </ul>\n      </div>`;
    
    if (!html.includes('support@audiosync.com')) {
        if (html.includes(legalEnd)) {
            html = html.replace(legalEnd, legalEnd + '\r\n' + contactBlock);
            changed = true;
        } else if (html.includes(legalEndLF)) {
            html = html.replace(legalEndLF, legalEndLF + '\n' + contactBlock);
            changed = true;
        }
    }
    
    if (changed) {
        fs.writeFileSync(filePath, html);
        count++;
    }
}
console.log('Updated', count, 'files.');
