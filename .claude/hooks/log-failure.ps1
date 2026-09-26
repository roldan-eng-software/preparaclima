$ErrorActionPreference = 'SilentlyContinue'

$logDir = ".claude/logs"
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Force -Path $logDir | Out-Null }
$log = "$logDir/failures.log"

$raw = [Console]::In.ReadToEnd()
if (-not $raw) { exit 0 }

try {
    $payload = $raw | ConvertFrom-Json
    $cmd = $payload.tool_input.command
    $err = $payload.tool_response.stderr
    if ($err) { $err = ($err -split "`n" | Select-Object -First 20) -join "`n" }

    $entry = @"
=== $(Get-Date -Format 'yyyy-MM-ddTHH:mm:ss') ===
CMD: $cmd
ERR: $err

"@
    $entry | Out-File $log -Append -Encoding utf8
} catch { }

exit 0