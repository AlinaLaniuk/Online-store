import SummaryView from "./summaryView";

let mockElement: HTMLElement;

test('Is total cost was crossed?', () => {
  document.body.innerHTML = `
    <div class="summary__total-cost"></div>
    `;
  const summaryView = new SummaryView();
  mockElement = document.querySelector('.summary__total-cost') as HTMLElement;
  summaryView.crossOutTotalCost();
  expect(mockElement.classList.contains('cross-out')).toBe(true);
});

test('Is promocode block empty?', () => {
  document.body.innerHTML = `
    <div class="summary__promo-for-add"></div>
    `;
  const summaryView = new SummaryView();
  mockElement = document.querySelector('.summary__promo-for-add') as HTMLElement;
  summaryView.deletePromoCodeBlockForAdd();
  expect(mockElement.innerHTML).toEqual('');
})