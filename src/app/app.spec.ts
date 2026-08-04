import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the title and the DataGrid/Chart widgets', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('demo DevExtreme');
    expect(compiled.querySelector('dx-data-grid')).toBeTruthy();
    expect(compiled.querySelector('dx-chart')).toBeTruthy();
  });

  it('addTask() appends a task with the chosen priority and resets the title', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const initialCount = app['tasks']().length;

    app['newTitle'].set('Nuovo task di prova');
    app['newPriority'].set('high');
    app['addTask']();

    const tasks = app['tasks']();
    expect(tasks.length).toBe(initialCount + 1);
    expect(tasks.at(-1)?.title).toBe('Nuovo task di prova');
    expect(tasks.at(-1)?.priority).toBe('high');
    expect(app['newTitle']()).toBe('');
  });
});
