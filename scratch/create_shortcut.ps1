$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut("C:\dev\Redes UPL\UPL Stories.lnk")
$Shortcut.TargetPath = "C:\dev\Redes UPL\bin_desktop\UPL_Stories\UPL_Stories.exe"
$Shortcut.WorkingDirectory = "C:\dev\Redes UPL\bin_desktop\UPL_Stories"
$Shortcut.Save()
Write-Host "Acceso directo creado correctamente"
