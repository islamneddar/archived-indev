import {Injectable} from '@nestjs/common';
import puppeteer from 'puppeteer';
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

    LOG.debug('go to url', url);
    await page.goto(url, {
      waitUntil: 'networkidle2',
    });

    const screenshot = await page.screenshot();

    await page.close();

    await browser.close();
    LOG.debug('----------- browser closed -----------');
    return screenshot;
  }
}
