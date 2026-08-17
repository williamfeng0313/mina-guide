$files = @(
  'database/bosses/astral-gate-warden.html',
  'database/bosses/worm-queen.html',
  'database/bosses/the-worms-back.html',
  'database/bosses/tide-caller.html'
)
foreach ($file in $files) {
  if (Test-Path $file) { Remove-Item $file -Force; Write-Host "Deleted $file" }
}
Write-Host 'Invalid boss stub cleanup complete.'
