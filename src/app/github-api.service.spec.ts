import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubApiService } from './github-api.service';

describe('GithubApiService', () => {
  let service: GithubApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubApiService]
    });
    service = TestBed.inject(GithubApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user repositories', () => {
    const username = 'johnpapa';
    const page=1;
    const pageSize=10;
    const mockRepositories = [{ id: 1, name: 'repo1' }, { id: 2, name: 'repo2' }];

    service.getUserRepositories(username,page,pageSize).subscribe(repos => {
      expect(repos).toEqual(mockRepositories);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRepositories);
  });

  it('should fetch user bio', () => {
    const username = 'testuser';
    const mockBio = { id: 123, login: 'testuser', name: 'Test User' };

    service.getUserbio(username).subscribe(bio => {
      expect(bio).toEqual(mockBio);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBio);
  });
});
