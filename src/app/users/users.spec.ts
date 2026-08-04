import { TestBed } from '@angular/core/testing';
import { Users } from './users';
import { USERS } from './user';

describe('Users', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Users],
    }).compileComponents();
  });

  it('should render one card per user', async () => {
    const fixture = TestBed.createComponent(Users);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.user-card');
    expect(cards.length).toBe(USERS.length);
    expect(compiled.textContent).toContain('Giulia');
    expect(compiled.textContent).toContain('Marco');
  });

  it('initialOf() returns the uppercase first letter', () => {
    const fixture = TestBed.createComponent(Users);
    const users = fixture.componentInstance;
    expect(users['initialOf']('marco')).toBe('M');
  });
});
