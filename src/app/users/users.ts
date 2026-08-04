import { Component } from '@angular/core';

import { DxCardViewComponent } from 'devextreme-angular/ui/card-view';
// Direttiva per i template custom di DevExtreme: `*dxTemplate="let x of 'nome'"`
// proietta il contenuto dentro il widget nel punto in cui `nome` combacia
// con l'input `cardTemplate` del dx-card-view qui sotto. È lo stesso
// meccanismo usato da (quasi) tutti i widget DevExtreme per personalizzare
// il rendering di un singolo elemento (riga, card, nodo...).
import { DxTemplateDirective } from 'devextreme-angular/core';

import { USERS } from './user';

@Component({
  selector: 'app-users',
  imports: [DxCardViewComponent, DxTemplateDirective],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  protected readonly users = USERS;

  // Iniziale per l'avatar testuale nella scheda — niente immagini finte.
  // `name` può arrivare undefined nella passata di misurazione layout del
  // widget (vedi commento in users.html), da qui il parametro opzionale.
  protected initialOf(name: string | undefined): string {
    return (name ?? '').charAt(0).toUpperCase();
  }
}
