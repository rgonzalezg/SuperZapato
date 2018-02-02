import { SuperZapato.Web.WebPage } from './app.po';

describe('super-zapato.web.web App', () => {
  let page: SuperZapato.Web.WebPage;

  beforeEach(() => {
    page = new SuperZapato.Web.WebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
