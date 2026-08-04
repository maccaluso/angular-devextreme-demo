import { Component, computed, signal } from '@angular/core';

// Ogni componente DevExtreme Angular è una classe standalone separata,
// da importare direttamente nell'array `imports` — non serve nessun
// NgModule (DxDataGridModule & co. sono la vecchia API pre-standalone).
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
// Le opzioni "annidate" (colonne, paging, filtri...) sono anch'esse
// componenti standalone separati, con selettore <dxi-...>/<dxo-...>.
// ATTENZIONE: da questa versione (26.x) i selettori sono namespaced per
// widget — `dxi-data-grid-column`, non il vecchio `dxi-column` — proprio
// per evitare collisioni quando importi le nested option di più widget
// diversi (es. data-grid E tree-list) nello stesso componente standalone.
// Verificato leggendo i bundle compilati in node_modules, non a memoria.
import {
  DxiDataGridColumnComponent,
  DxiDataGridTotalItemComponent,
  DxoDataGridExportComponent,
  DxoDataGridFilterRowComponent,
  DxoDataGridGroupingComponent,
  DxoDataGridGroupPanelComponent,
  DxoDataGridPagingComponent,
  DxoDataGridSearchPanelComponent,
  DxoDataGridSummaryComponent,
} from 'devextreme-angular/ui/data-grid/nested';

import { DxChartComponent } from 'devextreme-angular/ui/chart';
import {
  DxiChartSeriesComponent,
  DxoChartArgumentAxisComponent,
  DxoChartCommonSeriesSettingsComponent,
  DxoChartLegendComponent,
} from 'devextreme-angular/ui/chart/nested';

import { DxTextBoxComponent } from 'devextreme-angular/ui/text-box';
import { DxSelectBoxComponent } from 'devextreme-angular/ui/select-box';
import { DxButtonComponent } from 'devextreme-angular/ui/button';

import { PRIORITIES, SEED_TASKS, STATUSES, Task, TaskPriority } from './task';

@Component({
  selector: 'app-task-board',
  imports: [
    DxDataGridComponent,
    DxiDataGridColumnComponent,
    DxiDataGridTotalItemComponent,
    DxoDataGridExportComponent,
    DxoDataGridFilterRowComponent,
    DxoDataGridGroupingComponent,
    DxoDataGridGroupPanelComponent,
    DxoDataGridPagingComponent,
    DxoDataGridSearchPanelComponent,
    DxoDataGridSummaryComponent,
    DxChartComponent,
    DxiChartSeriesComponent,
    DxoChartArgumentAxisComponent,
    DxoChartCommonSeriesSettingsComponent,
    DxoChartLegendComponent,
    DxTextBoxComponent,
    DxSelectBoxComponent,
    DxButtonComponent,
  ],
  templateUrl: './task-board.html',
  styleUrl: './task-board.scss',
})
export class TaskBoard {
  // Stato applicativo "vero": signal Angular, esattamente come nel resto
  // del ripasso. DevExtreme non impone il proprio state management, si
  // limita a leggere/scrivere quello che gli passiamo via [dataSource].
  protected readonly tasks = signal<Task[]>(SEED_TASKS);

  // Stato locale della mini-form di creazione (toolbar sopra il grafico).
  protected readonly newTitle = signal('');
  protected readonly newPriority = signal<TaskPriority>('medium');

  protected readonly priorities = PRIORITIES;
  protected readonly statuses = STATUSES;

  // Aggregazione calcolata lato Angular con un computed(), NON dal
  // DataGrid: è un confronto voluto con il `groupIndex` sulla colonna
  // "Stato" più sotto, che invece fa raggruppare/sommare a DevExtreme
  // stesso, lato widget. Due modi diversi di ottenere lo stesso tipo di
  // riepilogo, entrambi legittimi a seconda di dove serve il dato.
  protected readonly statusCounts = computed(() => {
    const counts: Record<string, number> = {};
    for (const status of this.statuses) counts[status.id] = 0;
    for (const task of this.tasks()) counts[task.status]++;
    return this.statuses.map((s) => ({ status: s.label, count: counts[s.id] }));
  });

  protected addTask(): void {
    const title = this.newTitle().trim();
    if (!title) return;

    const nextId = Math.max(0, ...this.tasks().map((t) => t.id)) + 1;
    this.tasks.update((current) => [
      ...current,
      {
        id: nextId,
        title,
        assignee: 'Tu',
        status: 'todo',
        priority: this.newPriority(),
        dueDate: new Date(),
      },
    ]);

    this.newTitle.set('');
  }
}
