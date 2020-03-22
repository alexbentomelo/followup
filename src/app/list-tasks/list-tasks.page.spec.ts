import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListTasksPage } from './list-tasks.page';

describe('ListTasksPage', () => {
  let component: ListTasksPage;
  let fixture: ComponentFixture<ListTasksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTasksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
