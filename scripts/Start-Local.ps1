<#
.SYNOPSIS
    Start local development servers for CIVIC application.

.DESCRIPTION
    Starts backend (Java/Spring Boot on port 8080) and/or frontend (React/Vite on port 3000).
    Supports skipping build, running only backend or frontend, and using Azure SQL.

.PARAMETER SkipBuild
    Skip Maven/npm build steps and run existing artifacts.

.PARAMETER BackendOnly
    Start only the backend server.

.PARAMETER FrontendOnly
    Start only the frontend server.

.PARAMETER UseAzureSql
    Use Azure SQL connection instead of H2 in-memory database.

.EXAMPLE
    .\Start-Local.ps1
    Start both backend and frontend with full build.

.EXAMPLE
    .\Start-Local.ps1 -SkipBuild -BackendOnly
    Start only backend without rebuilding.

.EXAMPLE
    .\Start-Local.ps1 -FrontendOnly
    Start only frontend development server.

.EXAMPLE
    .\Start-Local.ps1 -UseAzureSql
    Start with Azure SQL Database instead of H2.
#>
param(
    [switch]$SkipBuild,
    [switch]$BackendOnly,
    [switch]$FrontendOnly,
    [switch]$UseAzureSql
)

$ErrorActionPreference = 'Stop'
$BackendPort = 8080
$FrontendPort = 3000
$BackendPath = Join-Path $PSScriptRoot '..' 'backend'
$FrontendPath = Join-Path $PSScriptRoot '..' 'frontend'

function Test-PortInUse {
    param([int]$Port)
    $connection = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    return $null -ne $connection
}

function Stop-ProcessOnPort {
    param([int]$Port)
    Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue |
        ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
}

function Start-Backend {
    Write-Host "`n=== Starting Backend Server ===" -ForegroundColor Cyan
    
    if (Test-PortInUse -Port $BackendPort) {
        Write-Host "Port $BackendPort in use. Stopping existing process..." -ForegroundColor Yellow
        Stop-ProcessOnPort -Port $BackendPort
        Start-Sleep -Seconds 2
    }
    
    Push-Location $BackendPath
    try {
        if (-not $SkipBuild) {
            Write-Host "Building backend..." -ForegroundColor Yellow
            mvn clean package -DskipTests
            if ($LASTEXITCODE -ne 0) {
                throw "Maven build failed"
            }
        }
        
        $springProfile = if ($UseAzureSql) { "azure" } else { "local" }
        Write-Host "Starting Spring Boot with profile: $springProfile" -ForegroundColor Green
        
        $env:SPRING_PROFILES_ACTIVE = $springProfile
        Start-Process -FilePath "mvn" -ArgumentList "spring-boot:run" -NoNewWindow
        
        Write-Host "Backend starting on http://localhost:$BackendPort" -ForegroundColor Green
    }
    finally {
        Pop-Location
    }
}

function Start-Frontend {
    Write-Host "`n=== Starting Frontend Server ===" -ForegroundColor Cyan
    
    if (Test-PortInUse -Port $FrontendPort) {
        Write-Host "Port $FrontendPort in use. Stopping existing process..." -ForegroundColor Yellow
        Stop-ProcessOnPort -Port $FrontendPort
        Start-Sleep -Seconds 2
    }
    
    Push-Location $FrontendPath
    try {
        if (-not $SkipBuild) {
            Write-Host "Installing npm dependencies..." -ForegroundColor Yellow
            npm install
            if ($LASTEXITCODE -ne 0) {
                throw "npm install failed"
            }
        }
        
        Write-Host "Starting Vite development server..." -ForegroundColor Green
        Start-Process -FilePath "npm" -ArgumentList "run", "dev" -NoNewWindow
        
        Write-Host "Frontend starting on http://localhost:$FrontendPort" -ForegroundColor Green
    }
    finally {
        Pop-Location
    }
}

# Main execution
Write-Host "CIVIC Local Development Startup" -ForegroundColor Magenta
Write-Host "================================" -ForegroundColor Magenta

if ($BackendOnly -and $FrontendOnly) {
    Write-Host "Error: Cannot specify both -BackendOnly and -FrontendOnly" -ForegroundColor Red
    exit 1
}

if ($BackendOnly) {
    Start-Backend
}
elseif ($FrontendOnly) {
    Start-Frontend
}
else {
    Start-Backend
    Start-Sleep -Seconds 5  # Wait for backend to initialize
    Start-Frontend
}

Write-Host "`n=== Startup Complete ===" -ForegroundColor Green
Write-Host "Backend:  http://localhost:$BackendPort" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:$FrontendPort" -ForegroundColor Cyan
Write-Host "H2 Console: http://localhost:$BackendPort/h2-console" -ForegroundColor Cyan

if ($UseAzureSql) {
    Write-Host "`nUsing Azure SQL Database (ensure AZURE_SQL_URL is set)" -ForegroundColor Yellow
}
else {
    Write-Host "`nUsing H2 in-memory database (MODE=MSSQLServer)" -ForegroundColor Yellow
}
