class SummaryView{
    drawStartSummaryState(){
        const mainWrapper = document.querySelector('.main-wrapper') as HTMLElement;
        const summaryTemplate = document.querySelector('#summary') as HTMLTemplateElement;
        const cloneSummaryTemplate = summaryTemplate.content.cloneNode(true);
        mainWrapper.append(cloneSummaryTemplate);
    }
}
export default SummaryView;