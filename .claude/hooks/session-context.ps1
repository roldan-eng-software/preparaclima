# Injeta contexto do harness no início da sessão.
$ErrorActionPreference = 'SilentlyContinue'

$context = ""
$warnings = ""

# 1. Feature ativa (Spec Kit)
if (Test-Path ".specify/feature.json") {
    try {
        $feature = (Get-Content ".specify/feature.json" -Raw | ConvertFrom-Json).feature_directory
        if ($feature -and (Test-Path "specs/$feature/plan.md")) {
            $context += "Feature ativa: specs/$feature/plan.md`n"
        }
    } catch { }
}

# 2. Verificar sincronização do schema Prisma
if ((Test-Path "prisma/schema.prisma") -and (Test-Path ".claude/schema.prisma")) {
    $a = Get-FileHash "prisma/schema.prisma" -Algorithm MD5
    $b = Get-FileHash ".claude/schema.prisma" -Algorithm MD5
    if ($a.Hash -ne $b.Hash) {
        $warnings += "AVISO: .claude/schema.prisma está dessincronizado. Rode: Copy-Item prisma/schema.prisma .claude/schema.prisma`n"
    }
}

# 3. Verificar integridade do harness
$required = @(
    ".claude/harness-rules.md",
    ".claude/conventions.md",
    ".claude/validation-checklist.md",
    ".claude/prompt-templates.md",
    "CLAUDE.md"
)
foreach ($f in $required) {
    if (-not (Test-Path $f)) {
        $warnings += "AVISO: Harness incompleto - $f ausente`n"
    }
}

# 4. Verificar migrations pendentes
if ((Test-Path "prisma/schema.prisma") -and (Test-Path "prisma/migrations")) {
    $changed = git diff --name-only HEAD 2>$null
    if ($changed -match "prisma/schema\.prisma") {
        if (-not ($changed -match "prisma/migrations")) {
            $warnings += "AVISO: schema.prisma alterado sem migration. Rode: npx prisma migrate dev --name <descricao>`n"
        }
    }
}

# 5. Montar saída
$msg = ""
if ($context)  { $msg += "== Harness - Contexto ==`n$context`n" }
if ($warnings) { $msg += "== Harness - Avisos ==`n$warnings`n" }

if ($msg) {
    $output = @{
        hookSpecificOutput = @{
            hookEventName     = "SessionStart"
            additionalContext = $msg
        }
    }
    $output | ConvertTo-Json -Compress -Depth 5
}

exit 0