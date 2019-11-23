@ECHO off
TITLE KarmaBot Installer for Windows
SET root=%~dp0
CD /D %root%
SET "rootdir=%cd%"
SET "installtemp=%root%KarmaBotTemp\"
IF EXIST "%installtemp%" ( RMDIR "%installtemp%" /S /Q >nul 2>&1)
timeout /t 5
node --version >nul 2>&1 || GOTO :node
git --version >nul 2>&1 || GOTO :git
:start
MKDIR "%root%KarmaBotTemp"
CD /D "%installtemp%"
ECHO Downloading KarmaBot...
ECHO.
git clone -b master --recursive --depth 1 --progress https://github.com/shikhir-arora/karma-simple.git >nul
IF %ERRORLEVEL% EQU 128 (GOTO :errorgit)
TITLE Installing Node modules..
ECHO.
npm install --build-from-source --force >nul 2>&1
MKDIR "karmaStore"
ECHO Modules installed..Cleaning up..
ECHO.
IF EXIST "%root%karma-simple\" (GOTO :removedirec) ELSE (GOTO :copydirec)
:removedirec
    RMDIR "%root%karma-simple\" /S /Q >nul 2>&1
    ROBOCOPY "%root%KarmaBotTemp" "%rootdir%" /E /MOVE >nul 2>&1
    IF %ERRORLEVEL% GEQ 8 (GOTO :copyerror)
    GOTO end
:copydirec
    ROBOCOPY "%root%KarmaBotTemp" "%rootdir%" /E /MOVE >nul 2>&1
    IF %ERRORLEVEL% GEQ 8 (GOTO :copyerror)
    GOTO end
:git
	TITLE Error!
	ECHO Git not found, please download here: https://git-scm.com/download/win
	ECHO Press any key to exit.
	PAUSE >nul 2>&1
	CD /D "%root%"
	GOTO :EOF
:node
	TITLE Error!
	ECHO Node not found, please download Node v8 (the latest) here: https://nodejs.org/en/download/current/
	ECHO Press any key to exit.
	PAUSE >nul 2>&1
	CD /D "%root%"
	GOTO :EOF
:errorgit
	ECHO.
	ECHO Git clone failed, retrying..
	RMDIR "%installtemp%" /S /Q >nul 2>&1
	GOTO :start
:copyerror
	TITLE Copying Error!
	ECHO.
	ECHO An error in copying data has been encountered: %ERRORLEVEL%
	ECHO.
	ECHO Ensure you are running the installer as ADMINISTRATOR.
	PAUSE >nul 2>&1
	CD /D "%root%"
	GOTO :EOF
:end
    TITLE KarmaBot Installation complete! Edit config.json and follow the README to finish
    ECHO All files should be in the root directory in a folder called karma-simple
	CD /D "%root%"
	RMDIR /S /Q "%installtemp%" >nul 2>&1
	ECHO.
	ECHO Installation complete!
	ECHO.
	timeout /t 5
	del installer.bat
