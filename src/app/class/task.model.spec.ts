import { Task } from './task.model';

describe('Task', () => {
  it('should create an instance', () => {
    expect(new Task(4,"",true,"")).toBeTruthy();
  });
});
