export interface UserProfile {
  id: number;
  name: string;
  role: string;
  // Colore di sfondo per l'iniziale nell'avatar — nessuna immagine reale,
  // solo per dare un tocco visivo diverso a ogni scheda.
  color: string;
}

// Stessi nomi già usati come "assignee" nei task di task-board/task.ts —
// coerenza col resto della demo, non un dataset a sé stante.
export const USERS: UserProfile[] = [
  { id: 1, name: 'Giulia', role: 'Frontend Developer', color: '#5b6bf5' },
  { id: 2, name: 'Marco', role: 'Backend Developer', color: '#2ea88c' },
  { id: 3, name: 'Elena', role: 'QA Engineer', color: '#e0793f' },
  { id: 4, name: 'Luca', role: 'Project Manager', color: '#c0499a' },
];
