import { defineConfig } from 'vitest/config';

// Config extra caricata dal builder @angular/build:unit-test (opzione
// runnerConfig in angular.json). Serve un solo motivo: nell'ambiente
// Node/jsdom di default, Vitest carica devextreme come vera ESM nativa,
// e devextreme-angular importa percorsi come "devextreme/ui/data_grid"
// (una directory, senza indicare il file — legale per `require()` CJS,
// non per `import` ESM nativo). `ng build`/`ng serve` non hanno questo
// problema perché passano da esbuild, che risolve le directory import
// in modo permissivo; Vitest in ambiente Node no. La riga sotto dice a
// Vitest di pre-processare (inline) i pacchetti devextreme* con lo
// stesso tipo di risoluzione permissiva invece di importarli come ESM
// nativa così com'è.
export default defineConfig({
  test: {
    server: {
      deps: {
        inline: [/devextreme/],
      },
    },
  },
});
