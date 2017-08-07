import { GithubUserSpaPage } from './app.po';

describe('github-user-spa App', () => {
  let page: GithubUserSpaPage;

  beforeEach(() => {
    page = new GithubUserSpaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
