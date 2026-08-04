import { TestBed } from '@angular/core/testing';
import { TaskBoard } from './task-board';

describe('TaskBoard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskBoard],
    }).compileComponents();
  });

  it('should render the DataGrid and the Chart widgets', async () => {
    const fixture = TestBed.createComponent(TaskBoard);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('dx-data-grid')).toBeTruthy();
    expect(compiled.querySelector('dx-chart')).toBeTruthy();
  });

  it('addTask() appends a task with the chosen priority and resets the title', () => {
    const fixture = TestBed.createComponent(TaskBoard);
    const board = fixture.componentInstance;
    const initialCount = board['tasks']().length;

    board['newTitle'].set('Nuovo task di prova');
    board['newPriority'].set('high');
    board['addTask']();

    const tasks = board['tasks']();
    expect(tasks.length).toBe(initialCount + 1);
    expect(tasks.at(-1)?.title).toBe('Nuovo task di prova');
    expect(tasks.at(-1)?.priority).toBe('high');
    expect(board['newTitle']()).toBe('');
  });
});
