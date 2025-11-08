# pushInventory.ps1
# ------------------------
# Paths
$backendPath = "C:\Projects\InventoryBackend"
$frontendPath = "C:\Projects\InventoryFrontend"
$repoPath = "C:\Projects\InventoryProject"

# GitHub repository URL
$githubURL = "https://github.com/wafanaslun-crypto/sdcINVENTORYPROJECTSEM-.git"

# Step 1: Copy backend and frontend into repo folder
Write-Host "Copying backend and frontend into repository folder..."
Copy-Item -Recurse -Force $backendPath $repoPath\backend
Copy-Item -Recurse -Force $frontendPath $repoPath\frontend

# Step 2: Navigate to repo folder
Set-Location $repoPath

# Step 3: Initialize git if not already
if (-not (Test-Path "$repoPath\.git")) {
    git init
    Write-Host "Git repository initialized."
} else {
    Write-Host "Git repository already exists."
}

# Step 4: Add remote if not already
$remoteExists = git remote | Select-String "origin"
if (-not $remoteExists) {
    git remote add origin $githubURL
    Write-Host "Remote origin added."
} else {
    Write-Host "Remote origin already exists."
}

# Step 5: Add all files
git add .

# Step 6: Commit changes
git commit -m "Add backend and frontend files"

# Step 7: Push to GitHub (main branch)
git branch -M main
git push -u origin main

Write-Host "Done! Backend and frontend are pushed to GitHub."
