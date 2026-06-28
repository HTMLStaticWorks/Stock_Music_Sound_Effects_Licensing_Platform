$htmlFiles = Get-ChildItem -Path "d:\June Websites\Stock Music & Sound Effects Licensing Platform" -Filter "*.html"
$favicon = "  <link rel=""icon"" type=""image/svg+xml"" href=""data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%231a202c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M9 18V5l12-2v13'/><circle cx='6' cy='18' r='3'/><circle cx='18' cy='16' r='3'/></svg>"">"

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName
    if ($content -notmatch '<link rel="icon"') {
        $newContent = $content -replace '(?i)(<title>.*?</title>)', "`$1`n$favicon"
        Set-Content -Path $file.FullName -Value $newContent
    }
}
Write-Host "Favicon added to all HTML files."
