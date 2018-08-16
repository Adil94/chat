// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: 'AIzaSyC-fXGCIR8UqsIjvDDW0E2mXznFGI0utb0',
    authDomain: 'live-chat-app-50803.firebaseapp.com',
    databaseURL: 'https://live-chat-app-50803.firebaseio.com',
    projectId: 'live-chat-app-50803',
    storageBucket: '',
    messagingSenderId: '1049811626398'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
