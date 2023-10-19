import {Injectable} from '@nestjs/common';
import puppeteer, {Browser, Page} from 'puppeteer';
import LOG from '@/utils/logger';

@Injectable()
export class ScreenshotService {
  async getScreenShot(url: string) {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();

    await page.setViewport({width: 1366, height: 768});

    page.setDefaultNavigationTimeout(60000);

    try {
      LOG.debug('go to url', url);
      await page.goto(url, {
        waitUntil: 'networkidle2',
      });
      const screenshot = await page.screenshot();
      await this.closeBrowserAndPage(browser, page);
      return screenshot;
    } catch (error) {
      LOG.error('error when get screenshot', error);
      await this.closeBrowserAndPage(browser, page);
      throw new Error(error);
    }
  }

  async closeBrowserAndPage(browser: Browser, page: Page) {
    await page.close();
    LOG.debug('----------- page closed -----------');
    await browser.close();
    LOG.debug('----------- browser closed -----------');
  }
}
