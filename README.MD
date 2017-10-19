# auth-service

## Installation

To install this library, run:

```bash
$ npm install @pluritech/auth-service --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install @pluritech/auth-service
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { AuthServiceModule } from 'auth-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    AuthServiceModule.forRoot('KEY_TO_STORE_AT_LOCALSTORAGE')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Luis H. Moreno](mailto:luishmcmoreno@gmail.com)
