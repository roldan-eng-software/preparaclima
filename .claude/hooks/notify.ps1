# Notificação nativa do Windows quando Claude precisa de atenção.
$ErrorActionPreference = 'SilentlyContinue'

$msg = "Claude Code precisa da sua atencao"

# Toast via BurntToast se instalado (opcional, melhor UX)
if (Get-Module -ListAvailable -Name BurntToast) {
    Import-Module BurntToast
    New-BurntToastNotification -Text "Claude Code", $msg
    exit 0
}

# Fallback: MessageBox nativo (bloqueia até o usuário fechar)
Add-Type -AssemblyName System.Windows.Forms
[System.Windows.Forms.MessageBox]::Show($msg, "Claude Code") | Out-Null

exit 0