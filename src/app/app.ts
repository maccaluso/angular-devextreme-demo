import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';

import { DxTabsComponent } from 'devextreme-angular/ui/tabs';
// Solo il TIPO dell'evento: import type non genera nessun import a
// runtime (viene cancellato in fase di compilazione), quindi non ha
// nulla a che fare con i problemi di risoluzione ESM visti altrove nel
// progetto per gli import "veri" di devextreme-angular.
import type { ItemClickEvent } from 'devextreme/ui/tabs';

interface NavItem {
  text: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { text: 'Task Board', path: 'tasks' },
  { text: 'Utenti', path: 'users' },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DxTabsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly router = inject(Router);

  protected readonly title = signal('Task Board — demo DevExtreme');
  protected readonly navItems = NAV_ITEMS;

  // Stesso ponte RxJS→Signal (toSignal) già visto nella demo /search del
  // Task Board originale: qui serve a tenere il tab selezionato nel
  // dx-tabs sincronizzato con l'URL corrente, `startWith(0)` copre il
  // render iniziale prima che arrivi il primo NavigationEnd.
  protected readonly selectedIndex = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => NAV_ITEMS.findIndex((item) => event.urlAfterRedirects.startsWith('/' + item.path))),
      startWith(0),
    ),
    { initialValue: 0 },
  );

  // dx-tabs non conosce il Router: gli passiamo solo `text`, la
  // navigazione vera la facciamo noi nell'handler del click.
  protected onTabClick(event: ItemClickEvent): void {
    const item = event.itemData as NavItem | undefined;
    if (item) this.router.navigate([item.path]);
  }
}
