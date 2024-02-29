# TS Commands

Initialize as typescript project

```tsc --init```

Compile and watch all ts files in the project

```tsc --watch```

# Useful TS configs

- "target": "es6"
- "sourceMap": true // debugging ts files on the browser
- "rootDir": "./src" // ts files
- "outDir": "./dist" // js files
- "removeComments": true // removes comments from ts to js conversion  
- "noEmitOnError": true // doesn't create js files when file has an error
- "noUnusedLocals": true, // complains about unused vars
- "noUnusedParameters": true // compains about unused parameters
- "noImplicitReturns": true // complains if we have a function that sometimes returns something and sometimes doesn't

# VS Code Extensions
- VS Code extensions:
- ESLint
- Material Icon Theme
- Path Intellisense
- Prettier
- Debugger for Firefox

# Docs
- Tsconfig Docs: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
- Compiler Config Docs: https://www.typescriptlang.org/docs/handbook/compiler-options.html
- VS Code TS Debugging: https://code.visualstudio.com/docs/typescript/typescript-debugging
