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

    LOG.debug('go to url', url);
    await page.goto(url, {waitUntil: 'networkidle0'});
    const screenshot = await page.screenshot();

    await browser.close();
    LOG.debug('----------- browser closed -----------');
    return screenshot;
  }
}
