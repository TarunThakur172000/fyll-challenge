import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { UserInputComponent } from './user-input.component';
import { GithubApiService } from '../github-api.service';
import { of } from 'rxjs';

describe('UserInputComponent', () => {
  let component: UserInputComponent;
  let fixture: ComponentFixture<UserInputComponent>;
  let mockGithubApiService: jasmine.SpyObj<GithubApiService>;

  beforeEach(async(() => {
    mockGithubApiService = jasmine.createSpyObj('GithubApiService', ['getUserRepositories']);
    
    TestBed.configureTestingModule({
      declarations: [ UserInputComponent ],
      providers: [{ provide: GithubApiService, useValue: mockGithubApiService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUserRepositories when getRepositories is called', () => {
    const username = 'testuser';
    const page=1
    const pageSize=10
    const mockRepositories = [{ id: 1, name: 'repo1' }, { id: 2, name: 'repo2' }];
    mockGithubApiService.getUserRepositories.and.returnValue(of(mockRepositories));

    component.username = username;
    component.getRepositories(1);

    expect(mockGithubApiService.getUserRepositories).toHaveBeenCalledWith(username,page,pageSize);
    expect(component.repositories).toEqual(mockRepositories);
  });
});
