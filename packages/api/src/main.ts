import { AppModule } from './app/app.module';
import { bootstrap } from './base/bootstrap/api-bootstrap';
import { enableSwagger } from './base/bootstrap/api-swagger';

async function serve() {
  const swaggerEnabled =
    process.env.K_SERVICE == null || process.env.ENABLE_SWAGGER === 'true';
  await bootstrap(
    AppModule,
    swaggerEnabled
      ? enableSwagger({
          title: 'Met API',
          description: 'Met API definitions',
          version: '1.0.0',
        })
      : undefined,
  );
}

serve().catch(e => {
  console.error(`Process exit with unexpected error: ${e.stack || e}`);
  setTimeout(() => process.exit(1), 1000);
});
