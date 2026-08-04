// Modello dati locale, in memoria — niente backend qui: lo scopo di questo
// progetto è vedere DevExtreme in azione, non ricostruire il Task Board.
export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  title: string;
  assignee: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
}

// Le liste "lookup" separate (invece di infilare le label italiane
// direttamente nel dato) sono lo stesso pattern che poi usiamo nel
// dx-select-box e nel `lookup` della colonna Stato del DataGrid:
// il dato resta in inglese/machine-readable, la UI mostra un'etichetta.
export const PRIORITIES: { id: TaskPriority; label: string }[] = [
  { id: 'low', label: 'Bassa' },
  { id: 'medium', label: 'Media' },
  { id: 'high', label: 'Alta' },
];

export const STATUSES: { id: TaskStatus; label: string }[] = [
  { id: 'todo', label: 'Da fare' },
  { id: 'in-progress', label: 'In corso' },
  { id: 'done', label: 'Fatto' },
];

export const SEED_TASKS: Task[] = [
  { id: 1, title: 'Configurare il tema DevExtreme', assignee: 'Giulia', status: 'done', priority: 'medium', dueDate: new Date('2026-08-01') },
  { id: 2, title: 'Collegare la DataSource del DataGrid', assignee: 'Marco', status: 'done', priority: 'high', dueDate: new Date('2026-08-02') },
  { id: 3, title: 'Aggiungere il grafico di riepilogo', assignee: 'Giulia', status: 'in-progress', priority: 'medium', dueDate: new Date('2026-08-05') },
  { id: 4, title: 'Validare la form di creazione task', assignee: 'Elena', status: 'in-progress', priority: 'high', dueDate: new Date('2026-08-06') },
  { id: 5, title: 'Scrivere i filtri della toolbar', assignee: 'Marco', status: 'todo', priority: 'low', dueDate: new Date('2026-08-10') },
  { id: 6, title: 'Verificare il tema in dark mode', assignee: 'Elena', status: 'todo', priority: 'low', dueDate: new Date('2026-08-12') },
  { id: 7, title: 'Testare export in Excel dal grid', assignee: 'Giulia', status: 'todo', priority: 'medium', dueDate: new Date('2026-08-14') },
  { id: 8, title: 'Rivedere licenza DevExtreme col cliente', assignee: 'Marco', status: 'todo', priority: 'high', dueDate: new Date('2026-08-15') },
];
