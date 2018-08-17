const Page = require('./helpers/page')

let page

beforeEach(async () => {
  page = await Page.build()
  await page.goto('http://localhost:3000')
})

afterEach(async () => {
  await page.close()
})

test('Header logo text is ok', async () => {
  // find dom element
  const text = await page.getContentsOf('a.brand-logo')
  expect(text).toEqual('Blogster')
})

test('Clicking login starts oauth flow', async () => {
  await page.click('.right a')
  const url = await page.url()
  expect(url).toMatch(/accounts\.google\.com/)
})

test('when signed in, check logout button is there', async () => {
  await page.login()

  // check the logout button is there
  const text = await page.getContentsOf('a[href="/auth/logout"]')
  expect(text).toEqual('Logout')
})
