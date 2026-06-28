$dir = "d:\June Websites\Stock Music & Sound Effects Licensing Platform"

# Update CSS
$cssPath = Join-Path $dir "assets\css\style.css"
$css = Get-Content -Raw -Path $cssPath
$css = $css -replace 'grid-template-columns: 2fr 1fr 1fr 1fr;', 'grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;'
Set-Content -Path $cssPath -Value $css

# HTML files
$files = Get-ChildItem -Path $dir -Filter *.html

$socialIcons = @"

        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
          <a href="#" style="color: var(--text-secondary); transition: color var(--transition-fast);"><i data-lucide="twitter"></i></a>
          <a href="#" style="color: var(--text-secondary); transition: color var(--transition-fast);"><i data-lucide="facebook"></i></a>
          <a href="#" style="color: var(--text-secondary); transition: color var(--transition-fast);"><i data-lucide="instagram"></i></a>
          <a href="#" style="color: var(--text-secondary); transition: color var(--transition-fast);"><i data-lucide="youtube"></i></a>
        </div>
"@

$contactBlock = @"
      <div>
        <h3 class="footer-title">Contact Us</h3>
        <ul class="footer-links">
          <li><a href="mailto:support@audiosync.com" style="display: flex; align-items: center; gap: 0.5rem;"><i data-lucide="mail" style="width: 16px; height: 16px;"></i> support@audiosync.com</a></li>
          <li><a href="mailto:licensing@audiosync.com" style="display: flex; align-items: center; gap: 0.5rem;"><i data-lucide="mail" style="width: 16px; height: 16px;"></i> licensing@audiosync.com</a></li>
        </ul>
      </div>
"@

$count = 0

foreach ($file in $files) {
    $filePath = $file.FullName
    $html = Get-Content -Raw -Path $filePath
    $changed = $false

    # 1. Add social icons
    if (-not $html.Contains('data-lucide="twitter"')) {
        $html = $html -replace 'professional sound effects\.</p>', ('professional sound effects.</p>' + $socialIcons)
        $changed = $true
    }

    # 2. Add Contact Block
    if (-not $html.Contains('support@audiosync.com')) {
        # Try finding the end of the legal section
        $pattern = '(?s)<li><a href="[^"]*">Privacy Policy</a></li>\s*</ul>\s*</div>'
        if ($html -match $pattern) {
            $matched = $matches[0]
            $html = $html -replace [regex]::Escape($matched), ($matched + "`r`n" + $contactBlock)
            $changed = $true
        }
    }
    
    if ($changed) {
        Set-Content -Path $filePath -Value $html
        $count++
    }
}
Write-Output "Updated $count files."
