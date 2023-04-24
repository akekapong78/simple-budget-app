import { RequirementStatusPipe } from './requirement-status.pipe';

describe('RequirementStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new RequirementStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
