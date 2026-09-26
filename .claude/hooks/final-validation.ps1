# Gate final: roda tsc + testes. Se falhar, injeta erro e bloqueia o Stop.
$ErrorActionPreference = 'SilentlyContinue'

$logDir = ".claude/logs"
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Force -Path $logDir | Out-Null }
$log = "$logDir/final-validation.log"

$errors = ""

# 1. TypeScript
if (Test-Path "tsconfig.json") {
    $tscOutput = npx tsc --noEmit 2>&1
    if ($LASTEXITCODE -ne 0) {
        $tail = ($tscOutput | Select-Object -Last 30) -join "`n"
        $errors += "FALHOU: tsc --noEmit. Erros:`n$tail`n`n"
        $tscOutput | Out-File $log -Encoding utf8
    }
}

# 2. Testes (vitest tem prioridade sobre jest)
$hasVitest = (Test-Path "vitest.config.ts") -or (Test-Path "vitest.config.js") -or (Test-Path "vitest.config.mjs")
$hasJest   = (Test-Path "jest.config.ts") -or (Test-Path "jest.config.js") -or (Test-Path "jest.config.mjs")

if ($hasVitest) {
    $testOutput = npx vitest run --reporter=dot 2>&1
    if ($LASTEXITCODE -ne 0) {
        $tail = ($testOutput | Select-Object -Last 40) -join "`n"
        $errors += "FALHOU: testes (vitest). Saida:`n$tail`n`n"
        $testOutput | Out-File $log -Append -Encoding utf8
    }
} elseif ($hasJest) {
    $testOutput = npx jest --silent 2>&1
    if ($LASTEXITCODE -ne 0) {
        $tail = ($testOutput | Select-Object -Last 40) -join "`n"
        $errors += "FALHOU: testes (jest). Saida:`n$tail`n`n"
        $testOutput | Out-File $log -Append -Encoding utf8
    }
}

# 3. Montar saída
if ($errors) {
    $msg = "== Validacao final do harness ==`n`n$errors`nCorrija os erros acima antes de finalizar.`n"
    $output = @{
        hookSpecificOutput = @{
            hookEventName     = "Stop"
            additionalContext = $msg
        }
    }
    $output | ConvertTo-Json -Compress -Depth 5
    exit 2  # exit 2 = bloqueia o Stop e continua o turno
}

exit 0