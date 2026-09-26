# Formata + linta o arquivo recém-editado. Sincroniza schema se for o caso.
$ErrorActionPreference = 'SilentlyContinue'

# Ler payload do stdin
$raw = [Console]::In.ReadToEnd()
if (-not $raw) { exit 0 }

try {
    $payload = $raw | ConvertFrom-Json
} catch { exit 0 }

$file = $payload.tool_input.file_path
if (-not $file -or -not (Test-Path $file)) { exit 0 }

# Normalizar para caminho relativo com forward slash
$rel = $file -replace '\\','/'

# 1. Prettier em qualquer arquivo suportado
npx prettier --write "$file" 2>$null | Out-Null

# 2. ESLint --fix em arquivos JS/TS
if ($rel -match '\.(ts|tsx|js|jsx)$') {
    npx eslint --fix "$file" 2>$null | Out-Null
}

# 3. Sincronizar schema Prisma
if ($rel -match 'prisma/schema\.prisma$') {
    Copy-Item "prisma/schema.prisma" ".claude/schema.prisma" -Force
    Write-Host "schema.prisma sincronizado com .claude/"
}

exit 0