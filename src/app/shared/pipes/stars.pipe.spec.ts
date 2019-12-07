import { ToStarsPipe } from './stars.pipe';

describe('ToStarsPipe', () => {

  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new ToStarsPipe();

  it('transforms to low mark', () => {
    const result = pipe.transform(1, 5);

    const total = result.length;
    const selected = result.filter(s => s).length;

    expect(total).toBe(5);
    expect(selected).toBe(1);
  });

  it('transforms to max mark', () => {
    const result = pipe.transform(5, 5);

    const total = result.length;
    const selected = result.filter(s => s).length;

    expect(total).toBe(5);
    expect(selected).toBe(5);
  });
});
