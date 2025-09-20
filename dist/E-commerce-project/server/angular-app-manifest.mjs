
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/flowbite/lib/esm/index.js": [
    "chunk-SJ2YAMFQ.js"
  ]
},
  assets: {
    'index.csr.html': {size: 35437, hash: '182d9fab9bde8abdefd5a7c16eaa403bb8aa4f6556063bfa12a7631d99025ba3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 24945, hash: '4175f75ef4bdf48cd1dd137e27ccb5b3e1845063535de3bd419a884186f3ecd1', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-PRIDWLN3.css': {size: 215101, hash: 'pITQnRB4t7U', text: () => import('./assets-chunks/styles-PRIDWLN3_css.mjs').then(m => m.default)}
  },
};
