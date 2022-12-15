export function getTemplate(
  template: string,
  content: string
): HTMLTemplateElement {
  const itemTemplate: HTMLTemplateElement = <HTMLTemplateElement>(
    document.querySelector(`#${template}`)
  );

  const itemClone = <HTMLTemplateElement>(
    itemTemplate.content.querySelector(`.${content}`)!.cloneNode(true)
  );

  return itemClone;
}
