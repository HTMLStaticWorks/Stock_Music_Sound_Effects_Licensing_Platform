$filePath = "d:\June Websites\Stock Music & Sound Effects Licensing Platform\dashboard.html"
$html = Get-Content -Raw -Path $filePath

# Revert previous change
$html = $html.Replace('
      <!-- Top Widgets -->
      <div class="widget-grid">', '
      <div id="dashboard" class="tab-section">
      <!-- Top Widgets -->
      <div class="widget-grid">')

$html = $html.Replace('
      <div id="dashboard" class="tab-section">
      <!-- Complex Widgets Area -->', '
      <!-- Complex Widgets Area -->')

# Now add a 4-section widget grid to all other tabs
$widgetGridTemplate = '
      <div class="widget-grid" style="margin-bottom: 2rem;">
        <div class="widget">
          <div class="widget-header">
            <span>Total Item 1</span>
            <i data-lucide="activity" style="color:var(--accent-color);"></i>
          </div>
          <div class="widget-value counter" data-target="0">0</div>
        </div>
        <div class="widget">
          <div class="widget-header">
            <span>Total Item 2</span>
            <i data-lucide="bar-chart" style="color:var(--accent-color);"></i>
          </div>
          <div class="widget-value counter" data-target="0">0</div>
        </div>
        <div class="widget">
          <div class="widget-header">
            <span>Total Item 3</span>
            <i data-lucide="pie-chart" style="color:var(--accent-color);"></i>
          </div>
          <div class="widget-value counter" data-target="0">0</div>
        </div>
        <div class="widget">
          <div class="widget-header">
            <span>Total Item 4</span>
            <i data-lucide="trending-up" style="color:var(--accent-color);"></i>
          </div>
          <div class="widget-value counter" data-target="0">0</div>
        </div>
      </div>'

$tabs = @("purchased", "downloads", "track-usage", "mood-collections", "favorite-tracks", "license-history", "projects", "notifications", "settings")

foreach ($tab in $tabs) {
    # Replace the inner content of the tab with the widget grid template
    # Find the tab div start and end
    $tabStart = '<div id="' + $tab + '" class="tab-section" style="display: none;">'
    $tabEnd = '</div>'
    
    # We know the content currently is:
    # <h2>Title</h2><p style="color: var(--text-secondary); margin-top: 1rem;">...</p>
    # We want to replace it with:
    # <h2>Title</h2><p style="...">...</p> + $widgetGridTemplate
    
    # Since we can't easily parse HTML in PowerShell without DOM, we can just replace the <p> end tag
    $searchString = 'appear here.</p>'
    $replaceString = 'appear here.</p>' + $widgetGridTemplate
    
    # Actually, let's just do a regex replace for the specific tab
    # Or simpler:
    $tabStartIdx = $html.IndexOf($tabStart)
    if ($tabStartIdx -ge 0) {
        $pEndIdx = $html.IndexOf('</p>', $tabStartIdx) + 4
        if ($pEndIdx -gt 4) {
            $html = $html.Substring(0, $pEndIdx) + $widgetGridTemplate + $html.Substring($pEndIdx)
        }
    }
}

Set-Content -Path $filePath -Value $html
Write-Output "Fixed tabs!"
