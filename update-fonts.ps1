$directory = "d:\June Websites\Stock Music & Sound Effects Licensing Platform"

# Update style.css
$stylePath = Join-Path $directory "assets\css\style.css"
$content = Get-Content $stylePath -Raw
$content = $content -replace 'font-weight:\s*590;', 'font-weight: 550;'
$content = $content -replace 'font-weight:\s*600;', 'font-weight: 550;'
$content = $content -replace 'font-weight:\s*700;', 'font-weight: 550;'
$content = $content -replace 'font-weight:\s*bold;', 'font-weight: 550;'
Set-Content -Path $stylePath -Value $content -Encoding UTF8

# Update HTML files
$htmlFiles = Get-ChildItem -Path $directory -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace 'font-weight:\s*600;?', 'font-weight: 550;'
    $content = $content -replace 'font-weight:\s*700;?', 'font-weight: 550;'
    $content = $content -replace 'font-weight:\s*bold;?', 'font-weight: 550;'
    
    # We can also replace `<b>` and `<strong>` tags if necessary, but usually they just use inline CSS or classes. The user asked specifically about font weights.
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}

Write-Host "Fonts updated successfully!"
