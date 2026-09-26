# Alerta se schema foi alterado mas migration não foi gerada.
$ErrorActionPreference = 'SilentlyContinue'

if (-not (Test-Path "prisma/schema.prisma")) { exit 0 }

$changed = git diff --name-only HEAD 2>$null
if (-not $changed) { exit 0 }

if ($changed -match "prisma/schema\.prisma") {
    if (-not ($changed -match "prisma/migrations")) {
        $msg = "AVISO: schema.prisma foi alterado mas nenhuma migration nova foi detectada. Se a mudanca eh real, rode: npx prisma migrate dev --name <descricao>"
        $output = @{
            hookSpecificOutput = @{
                hookEventName     = "PostToolUse"
                additionalContext = $msg
            }
        }
        $output | ConvertTo-Json -Compress -Depth 5
    }
}

exit 0