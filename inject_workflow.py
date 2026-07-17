import re

workflow_html = '''
  <!-- How it Works / Workflow -->
  <section class="container fade-in text-center" style="margin-top: 5rem;">
    <div class="section-header">
      <h2 class="section-title">How It Works</h2>
      <p class="section-subtitle">A simple 4-step process to get your perfect track.</p>
    </div>
    <div class="grid-4">
      <div class="card text-center" style="padding: 2rem;">
        <div style="color: var(--accent-color); margin-bottom: 1rem; display: flex; justify-content: center;">
          <i data-lucide="search" style="width: 48px; height: 48px;"></i>
        </div>
        <h3 class="card-title" style="margin-bottom: 0.5rem;">1. Browse</h3>
        <p style="font-size: 0.9rem; color: var(--text-secondary);">Explore our extensive library of high-quality music and sound effects.</p>
      </div>
      <div class="card text-center" style="padding: 2rem;">
        <div style="color: var(--accent-color); margin-bottom: 1rem; display: flex; justify-content: center;">
          <i data-lucide="play-circle" style="width: 48px; height: 48px;"></i>
        </div>
        <h3 class="card-title" style="margin-bottom: 0.5rem;">2. Preview</h3>
        <p style="font-size: 0.9rem; color: var(--text-secondary);">Listen to full tracks and find the perfect match for your project.</p>
      </div>
      <div class="card text-center" style="padding: 2rem;">
        <div style="color: var(--accent-color); margin-bottom: 1rem; display: flex; justify-content: center;">
          <i data-lucide="file-check-2" style="width: 48px; height: 48px;"></i>
        </div>
        <h3 class="card-title" style="margin-bottom: 0.5rem;">3. License</h3>
        <p style="font-size: 0.9rem; color: var(--text-secondary);">Choose the right license for your needs with transparent pricing.</p>
      </div>
      <div class="card text-center" style="padding: 2rem;">
        <div style="color: var(--accent-color); margin-bottom: 1rem; display: flex; justify-content: center;">
          <i data-lucide="download" style="width: 48px; height: 48px;"></i>
        </div>
        <h3 class="card-title" style="margin-bottom: 0.5rem;">4. Download</h3>
        <p style="font-size: 0.9rem; color: var(--text-secondary);">Get your high-res audio files instantly and start creating.</p>
      </div>
    </div>
  </section>
'''

def insert_before(filepath, target_line, new_content):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<!-- How it Works / Workflow -->' in content:
        print(f"Already injected in {filepath}")
        return
        
    parts = content.split(target_line)
    if len(parts) == 2:
        new_content = parts[0] + new_content + "\n" + target_line + parts[1]
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Successfully injected into {filepath}")
    else:
        print(f"Could not find target line in {filepath}")

# For index.html
insert_before('index.html', '  <!-- 6. Popular Downloads -->', workflow_html)

# For home-2.html
insert_before('home-2.html', '  <!-- 4. Featured Creators -->', workflow_html)

# For services.html
# Let's insert it before the CTA section or Testimonials if there is one.
# Let's check services.html for a good spot.
