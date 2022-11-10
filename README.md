# alpaca-albatross-practicum-team1

## Back End Repository

## Build for windows

To build the project run
`npm install`

### Installing Chocolatey

https://chocolatey.org/install

To install Chocolatey, use powershell.exe and run the following command:
`Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))`

### Installing MongoDB Shell

To install MongoDB Shell, run the following command from the command line or from PowerShell:
`choco install mongodb-shell`

## Build for Mac

To build the project run
`npm install`

### Installing Mongo Compass

-   `brew tap mongodb/brew`
-   `brew install mongodb-community`
-   `brew services start mongodb-community`

### Start the service locally

to start service locally run
`npm run dev`
