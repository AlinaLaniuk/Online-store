import { referenceArr } from '../../utils/referenceData';
import { testArr } from '../../utils/testData';
import { FiltersModel } from './FiltersModel';

const model = new FiltersModel();

describe('getCategoryList', () => {

  it('should get array of categories', () => {
    model.getCategoryList(testArr);

    expect(new Set(model.categoryList)).toEqual(new Set(referenceArr));
  })
})