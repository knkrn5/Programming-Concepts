# **CLI Concepts**

## **Different command-line interfaces (CLIs) or terminal emulators**

- In both .bat (Windows batch) and .sh (Linux/macOS shell) scripts, **any argument passed after the script call is treated as part of the script's argument list**. (_the format **(--port, -port, port)** is just a convention - the script treats them all as plain text strings._)

1. **CMD: -** _In window **.bat** files, and also **.cmd** Command files (newer)_

   ```cmd
   @REM any argument passed after the script call is treated as part of the script's argument list⬇️
    frontend.bat --port 8000 port:3000
      . %0 → script name (e.g., frontend.bat)
      . %1 → --port
      . %2 → 8000
      . %3 → port:3000
      . %* → for all args
   ```

   ```bat
   @REM : -This echo off disables command echoing, so it hides all the actual commands being run
    @echo off
   setlocal

   @REM Check for --build argument at first place after the .bat command
   set "BUILD_MODE=false"
   if "%1"=="--build" set "BUILD_MODE=true"

   @REM Navigate to frontend folder
   cd frontend || goto :cdError

   @REM Run appropriate npm command
   if "%BUILD_MODE%"=="true" (
      call npm run build || goto :buildError
   ) else (
      call npm run dev || goto :runError
   )

   @REM Exit only the current batch script or function, not the entire CMD window, Exit code / error code. 0 = success, 1 (or any non-zero) = failure
   exit /b 0

   :cdError
   echo Error while navigating to frontend folder.
   exit /b 1

   :buildError
   echo Error occurred while building the frontend
   exit /b 1

   :runError
   echo Error occurred while starting the frontend.
   exit /b 1
   ```

   ```cmd
    REM start the bat file in cmd
    frontend.bat
   ```

   | `.bat`                | `.cmd`                                                 |
   | --------------------- | ------------------------------------------------------ |
   | Introduced in MS-DOS  | Introduced in Windows NT                               |
   | Some legacy behaviors | Better error handling in NT-based systems              |
   | Still widely used     | Preferred in newer Windows scripting (but same syntax) |

   - .cmd file is very similar to a .bat file — they both run using cmd.exe (Windows Command Prompt)

   ***

2. **Powershell: -** _In window **.ps1** PowerShell scripts/files_

   - Correct Way to Run a **.bat** File in PowerShell, is to **Use `.\` before the filename**.

   ```ps1
   .\frontend.bat
   ```

3. **Bash: -** _In unix based OS like git bash, linux , macOS and WSL **.sh** for shell files_

   ```bash
   # .sh file
   #!/bin/bash # This is called a "shebang" (or hashbang) and it's very important in shell scripts.
   #! tells the system: "Use the following program to run this script."
    # /bin/bash is the path to the Bash shell — it tells the OS to run the script using Bash.

    cd frontend || { echo "Error"; exit 1; }
    npm run dev || { echo "Error"; exit 1; }

   ```

   ```bash
   # Make executable
   # It adds executable permission to the file for the user (and optionally for group/others), so the system knows **This file is allowed to be executed like a program.**
   chmod +x frontend.sh

   # Run it
   ./frontend.sh

   # any argument passed after the script call is treated as part of the script's argument list⬇️
   ./frontend.sh --port 8000 port:3000
      # $0 → script name (./frontend.sh)
      # $1 → --port
      # $2 → 8000
      # $3 → port:3000
      # $@ or $* → all passed arguments
   ```

![CLI with Their Written Programming Lang](./imgs/cliwiththeirprogramminglang.png)
