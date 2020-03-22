import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateTasksPage } from './create-tasks.page';

describe('CreateTasksPage', () => {
  let component: CreateTasksPage;
  let fixture: ComponentFixture<CreateTasksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTasksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
