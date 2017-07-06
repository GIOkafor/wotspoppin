import { WotspoppinPage } from './app.po';

describe('wotspoppin App', () => {
  let page: WotspoppinPage;

  beforeEach(() => {
    page = new WotspoppinPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
