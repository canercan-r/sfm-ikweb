# Angular Workspace, Ionic Cordova Applications with for Android, IOS (all Projects in one)

## Summary

This recipe produces a monorepo with the following key pieces:

- angular workspace with common angular.json
- an angular application
- an ionic angular application with cordova platform build for android
- a shared library

The workspace and projects are built with

- angular 14.2
- node 16.13 (causes karma error requiring --force whenever using npm install)

Use a lower version of node.

TEST
Overall there are no magic configuration changes required except for dealing with the output from the ionic cordova build. The output does not make its way to the /www folder and so is not deployed to the android platform as it should. A simple workaround is to create a hook script that runs after the angular build and copies the output from the /dist folder to the /www folder.

### Final project structure

This will be the final file structure at three levels deep showing the two applications, a shared library and also the cordova output in the integrations folder.
TEST DEV BRANCH

```text
.
├── dist
│
├── apps
│   └── ik-mobile (ionic application)
│       ├── karma.conf.js
│       ├── package.json
│       ├── scripts
│       ├── src
│       ├── tsconfig.app.json
│       └── tsconfig.spec.json
│
├── integrations
│   └── ik-mobile
│       ├── config.xml
│       ├── package.json
│       └── resources
│
├── libs
│   └── core
│         ├── communication
│         ├── configuration
│         ├── interceptors
│         ├── mock-api
│         ├── models
│         ├── providers
│         ├── security
│         ├── services
│         ├── core-service.module
│         └── core-ui.module
│   └── common
│         ├── components
│         ├── directives
│         ├── models
│         ├── pipes
│         ├── services
│         ├── utils
│         └── common.module.ts
│
├── node_modules
├── ionic.config.json
├── angular.json
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## Steps

These are the steps to create a functioning workspace with cross-platform output for further development.

### Step 1 - new angular workspace

```console
ng new only-cordova --create-Application=false
cd ./only-cordova
```

Install the npm packages and use force if required

```console
npm install -force
```

### Step 2 - new angular library

```console
ng generate library common --prefix=lib
ng build common
```

### Step 3 - new angular application

```console
ng generate application --prefix=web --routing --style=scss web
ng build web
ng serve --project web
```

### Step 4 - consume library in angular application

Open app-one in an editor, and edit the module file and add LibCommonModule to the imports.

/apps/web/src/app/app.module.ts\_

```javascript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { LibCommonModule } from "@lib-common";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LibCommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

There should be no issues adding the component or intellisense because the library definition was added automatically to the common typescript configuration file:

tsconfig.json\_

```json
"compilerOptions": {
    "paths": {
      "common": [
        "dist/common/common",
        "dist/common"
      ]
    },
```

Edit the web project to consume the component,

/apps/web/src/app/app.component.html\_

```html
<lib-common></lib-common>

<router-outlet></router-outlet>
```

And the change is now visible:

```console
ng serve --project ik-mobile

```

### Step 5 - new ionic angular application

At this point there is no ionic content in the application and ionic has definitely not been initialised

```console
ionic init --multi-app
```

At this point the ionic configuration file should look like:

ionic.config.json\_

```json
{
  "projects": {}
}
```

Add the ionic app

```console
ng generate application --prefix=two --routing --style=scss ik-mobile
npm i @ionic/angular
ng add @ionic/angular --project=ik-mobile
```

Run the following but don't make the app the default project

```console
cd apps/ik-mobile
ionic init ik-mobile --type=angular --project-id=ik-mobile
cd ../..
```

At this point the ionic configuration file should look like:

ionic.config.json\_

```json
{
  "projects": {
    "ik-mobile": {
      "name": "ik-mobile",
      "integrations": {},
      "type": "angular",
      "root": "projects/ik-mobile"
    }
  }
}
```

Serve the app

```console
ionic serve --project ik-mobile
```

### Step 6 - consume library in ionic application

Alter the ionic application, ik-mobile, in the same way as app-one:

/apps/ik-mobile/src/app/app.module.ts\_

```javascript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IonicModule } from "@ionic/angular";
import { LibCommonModule } from "@lib-common";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LibCommonModule, IonicModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

and also

/apps/ik-mobile/src/app/app.component.html\_

```html
<lib-common></lib-common> In ionic app
```

Serve the app and verify

```console
ionic serve --project ik-mobile
```

### Step 7 - Integrate cordova

Run the following ionic command to create an integration in its own folder

```console
ionic integrations enable cordova --add --root=integrations/ik-mobile --project=ik-mobile
```

At this point the ionic configuration file will look like this:

ionic.config.json\_

```json
{
  "projects": {
    "ik-mobile": {
      "name": "ik-mobile",
      "integrations": {
        "cordova": {
          "root": "integrations/ik-mobile"
        }
      },
      "type": "angular",
      "root": "apps/ik-mobile"
    }
  }
}
```

and there will be a new /integrations folder. This is where the cross-platform output will go.

Initialise /integrations/ik-mobile folder as an npm package:

```console
cd integrations/ik-mobile
npm init
cd ../..
```

At this point commit any changes because a build creates a lot of folders. Cordova also wants
the ik-mobile project to have an initialised npm package.json

```console
cd apps/ik-mobile
npm init
cd ../..
```

Add the android platform

```console
ionic cordova platform add android --project ik-mobile
```

commit your changes and then confirm that a build completes successfully.

```console
ionic cordova build android --project ik-mobile
```

There will no web asset output on \_/integrations/ik-mobile/platforms/android

## Step 8 - Rebuild and open android platform in Android Studio

```console
ionic cordova build android --project ik-mobile
```

## Bonus Steps for Adding IOS

These are the additional steps for adding an integration for IOS

## Step 9 - integrate IOS

Add the ios platform

```console
ionic cordova platform add ios --project ik-mobile
```

Commit all before the build because of the folders that get added. I am working on a macbook so this will work :)

```console
ionic cordova build ios --project ik-mobile
```

## Building from a clone

Clone your source as usual or run this:

```console
git clone https://github.com/canercha/monorepo-blank.git
cd monorepo-blank

npm install
```

Now build what you want

lib-common (shared library)\_

```console
ng build --project common
```

web (angular application)\_

```console
ng build --project web
```

ik-mobile (ionic application)\_

```console
ionic cordova build --project ik-mobile android
ionic cordova build --project ik-mobile ios
```

or serve

```console
ng serve --project app-one
ionic serve --project ik-mobile
```

### Issues

You may encounter an issue with the PlatformApi missing (<https://stackoverflow.com/questions/46799446/cordova-unable-to-load-platformapi>)

Remove both platforms and then rebuilding will _fix_ it:

```console
ionic cordova platform rm android --project ik-mobile
ionic cordova platform rm ios --project ik-mobile
```
