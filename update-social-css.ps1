$dir = "d:\June Websites\Stock Music & Sound Effects Licensing Platform"
$files = Get-ChildItem -Path $dir -Filter *.html

$inlineStyle = 'style="color: var(--text-secondary); transition: color var(--transition-fast);"'
$cssClass = 'class="social-icon"'

$count = 0
foreach ($file in $files) {
    $filePath = $file.FullName
    $html = Get-Content -Raw -Path $filePath
    
    # We only want to replace it for the social media icons, which are in the footer.
    # The safest way is to replace it globally because those exact inline styles were only used there by me.
    # But just to be super safe, I'll replace it inside the div that contains them.
    
    if ($html.Contains('<div style="display: flex; gap: 1rem; margin-top: 1.5rem;">')) {
        # Since I added these recently, I can just string replace the specific anchors.
        $html = $html.Replace('<a href="#" ' + $inlineStyle + '><svg', '<a href="#" ' + $cssClass + '><svg')
        Set-Content -Path $filePath -Value $html
        $count++
    }
}
Write-Output "Updated $count files."
