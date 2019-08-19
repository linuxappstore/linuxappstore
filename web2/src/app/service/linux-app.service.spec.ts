import { TestBed } from '@angular/core/testing';

import { LinuxAppService } from './linux-app.service';

describe('LinuxAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinuxAppService = TestBed.get(LinuxAppService);
    expect(service).toBeTruthy();
  });
});
