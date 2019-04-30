# TSPath
#### TypeScript Path Alias Resolver

***

:warning: **Important!** There have been reports of shaky behaviour when tspath
is run with node 9.x, I am looking into the issue, if one of you who reported it
happened to see where the problem occurs, please share :)

***

Everyone working in a TypeScript project that grows beyond a certains limit will
eventually experience the situation commonly described as **path hell**, the snippet
below is an example of such hell.

##### Path hell
```typescript
 import { IgniterApplication } from "../../../Application/IgniterApplication";
 import { CrcCalculator }      from "../../../../../../../Utilities/FileUtilities";
 import { IMessageHandler }    from "../../../../Messaging/IMessageHandler";
 import { IMessageHub }        from "../../../../Messaging/Hub/IMessageHub";
 import { CronTabHelper }      from "../../../../../../../Utilities/CronTabHelper";
 import { GLog }               from "../../../Application/GLog";

```

By specifying path aliases in **tsconfig.json** you can use that alias to
form an "absolute path"
 

```json
{
  "compilerOptions": {
    ...
    "paths": {
      "@App/*":         ["./Application/*"],
      "@Messaging/*":   ["./Messaging/*"],
      "@Utils/*":       ["./Server/Tools/Utilities/*"]
    }
  }
}
```

Below is the sample example but with **Path Aliases** instead of relative paths added,
as you can see, the readability have improved significantly!

```typescript
 import { IgniterApplication } from "@App/IgniterApplication";
 import { CrcCalculator }      from "@Utils/FileUtilities";
 import { IMessageHandler }    from "@Messaging/IMessageHandler";
 import { IMessageHub }        from "@Messaging/Hub/IMessageHub";
 import { CronTabHelper }      from "@Utils/CronTabHelper";
 import { GLog }               from "@App/GLog";

```
The TypeScript compiler will be able to resolve the paths so this will compile
without problems, however the JavaScript output will not be possible to execute
by Node nor a Web Browser, why? the reason is simple!

The JavaScript engine does not know anything about the compile time 
TypeScript configuration.

In order to run your JavaScript code, the path aliases now needs to be made into
relative paths again, here is when **TSPath** comes into play.

So, simply run:
```bash
$ node node_modules/tspath_ext/dist/tspath.js
or
$ node node_modules/tspath_ext/dist/tspath.js -f
```
Yes, that´s it, really!

Say bye bye to the relative path hell!

##### Supporting fall back locations
Sometimes it needs to link the external module to compile into your project. For example the most regular problem - usage common interfaces: both backend and frontend. 
```
 |-- Project
    |-- backend
        |-- tsconfig.json
        |-- package.json
        |-- src
            |-- index.ts
    |-- common
        |-- tsconfig.json
        |-- package.json
        |-- src
            |-- IUser.ts
    |-- frontend
        |-- tsconfig.json
        |-- angular.json
        |-- package.json
        |-- src
            |-- main.ts
```
For usage of the common module in both frontend and backend you should simply add the configuration of typescript compilation in **tsconfig.json**.

```json
{
  "compilerOptions": {
    ...
    "outDir": "./out",
    "baseUrl": ".",
    "rootDirs": [
        "./src",
        "../common/src"
    ],
    "paths": {
        "@common/*" : ["../common/src/*"]
    }
  }
}
```

This configuration says compile all from `rootDirs` to `outDur`. 
Because we use upscale structure - typescript compiler will make subtree for each upper project.
```
 |-- Project
    |-- backend
        ...
        |-- out
            |-- common
                |-- src
                    |-- IUser.js   
            |-- backend
                |-- src
                    |-- index.js
```
This is becouse this fork aimed at correctly linking upper project sturcture

:warning: **Important!** This structure will be generated only if any reference to common module will exists . If not - it will make regular flat structure and this will not work.
