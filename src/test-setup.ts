// Setup globale per i test Vitest (vedi "setupFiles" in angular.json).
//
// jsdom (il DOM finto usato dai unit test) non implementa un vero canvas
// a meno di installare il pacchetto nativo `canvas` (richiede cairo/pango
// di sistema, non disponibili qui senza sudo). `HTMLCanvasElement.
// prototype.toDataURL()` di jsdom stampa un warning "Not implemented" e
// ritorna null. Il widget dx-chart, in fase di init, sonda i formati
// immagine supportati chiamando `canvas.toDataURL(mimeType).indexOf(...)`
// SEMPRE — anche con l'export disabilitato via `[export]="{ enabled:
// false }"` nel template, perché quel controllo riguarda solo la
// visibilità del pulsante, non l'inizializzazione del plugin — quindi
// `null.indexOf` mandava in crash ogni test che renderizzasse il grafico.
// Restituire una stringa vuota invece di null è sufficiente: i test non
// hanno bisogno di sapere quali formati siano "supportati", solo che il
// widget non esploda durante l'inizializzazione.
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.toDataURL = () => '';
}
