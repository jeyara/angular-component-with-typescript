# Component based project Skelton using angular and typescript
Base framework for developing applications with angular component and type script.

## To Run

### Step 01

Please do following steps (skip the steps wich are done earlier),

Open a command prompt or shell and run following commands. [ConEmu](https://conemu.github.io/) is a good tool to manage multiple command prompts.

1. Install NodeJs
2. npm install -g jspm
3. npm install -g typescript
4. npm install -g typings@0.8.1

### Step 02

Open a command prompt or shell. Go to application root directory (under Src folder) and run following commands,

1. npm install
2. jspm install
3. typings install

"npm install" downloads packages configured in package.json. "jspm install" downloads packages configured in app/lib/js/config.js. "typings install" This installs necessary type definitions.

### Step 04

Open a command prompt or shell. Go to application root directory (under Src folder) and run following command,

tsc

This will compile all the type script files in to JavaScript files.

### Step 04

Install http server of your choice using NPM. I prefer [Live-Server](https://www.npmjs.com/package/live-server). Alternatively you can use IIS/Apache servers as well.

## Solution Structure

TO DO


