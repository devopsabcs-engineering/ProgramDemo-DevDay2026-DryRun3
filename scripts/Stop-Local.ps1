<#
.SYNOPSIS
    Stop local development servers for CIVIC application.

.DESCRIPTION
    Kills processes running on backend port 8080 and frontend port 3000.

.EXAMPLE
    .\Stop-Local.ps1
    Stop all local development servers.
#>

$ErrorActionPreference = 'SilentlyContinue'
$BackendPort = 8080
$FrontendPort = 3000

Write-Host "CIVIC Local Development Shutdown" -ForegroundColor Magenta
Write-Host "=================================" -ForegroundColor Magenta

Write-Host "`nStopping processes on port $BackendPort (backend)..." -ForegroundColor Yellow
$backendProcesses = Get-NetTCPConnection -LocalPort $BackendPort -ErrorAction SilentlyContinue
if ($backendProcesses) {
    $backendProcesses | ForEach-Object { 
        $processId = $_.OwningProcess
        $processName = (Get-Process -Id $processId -ErrorAction SilentlyContinue).ProcessName
        Write-Host "  Stopping $processName (PID: $processId)" -ForegroundColor Gray
        Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue 
    }
    Write-Host "  Backend stopped." -ForegroundColor Green
}
else {
    Write-Host "  No process running on port $BackendPort." -ForegroundColor Gray
}

Write-Host "`nStopping processes on port $FrontendPort (frontend)..." -ForegroundColor Yellow
$frontendProcesses = Get-NetTCPConnection -LocalPort $FrontendPort -ErrorAction SilentlyContinue
if ($frontendProcesses) {
    $frontendProcesses | ForEach-Object { 
        $processId = $_.OwningProcess
        $processName = (Get-Process -Id $processId -ErrorAction SilentlyContinue).ProcessName
        Write-Host "  Stopping $processName (PID: $processId)" -ForegroundColor Gray
        Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue 
    }
    Write-Host "  Frontend stopped." -ForegroundColor Green
}
else {
    Write-Host "  No process running on port $FrontendPort." -ForegroundColor Gray
}

Write-Host "`n=== Shutdown Complete ===" -ForegroundColor Green
Write-Host "All local development servers stopped." -ForegroundColor Cyan
