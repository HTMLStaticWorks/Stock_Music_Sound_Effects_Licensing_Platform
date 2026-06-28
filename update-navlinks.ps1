$directory = "d:\June Websites\Stock Music & Sound Effects Licensing Platform"
$htmlFiles = Get-ChildItem -Path $directory -Filter "*.html"

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    $filename = $file.Name
    
    # 1. Remove "active" from all nav-links
    $content = $content -replace 'class="nav-link active"', 'class="nav-link"'
    $content = $content -replace 'class="nav-link dropdown-toggle active"', 'class="nav-link dropdown-toggle"'
    
    # 2. Add "active" to the matching nav-link
    $content = $content -replace "href=`"$filename`" class=`"nav-link`"", "href=`"$filename`" class=`"nav-link active`""
    
    # 3. Handle dropdown logic: If the filename is index.html or home-2.html, we must also make the parent toggle active.
    if ($filename -eq "index.html" -or $filename -eq "home-2.html") {
        $content = $content -replace 'class="nav-link dropdown-toggle"', 'class="nav-link dropdown-toggle active"'
    }
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}

Write-Host "Navlinks updated statically via PowerShell!"
