import * as assert from 'assert';
import add from '../ts_out/common/add';

it('Add', () => {
  assert.equal(add(1, 2), 3);
  assert.equal(add(-10, 4), -6);
});
