import { createRequestHandler } from '@angular/ssr';
import serverModule from '../dist/E-commerce-project/server/server.mjs';

export default createRequestHandler(serverModule.default);
