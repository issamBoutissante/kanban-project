import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NHaF5cWWFCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWH1cd3RQQmZdUU1yX0U='
);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
