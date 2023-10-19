import {Injectable} from '@nestjs/common';
import puppeteer from 'puppeteer';
import Logger from '@/utils/logger';

@Injectable()
export class ScreenshotService {
  LOG = new Logger(ScreenshotService.name);
  async getScreenShot(url: string) {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();

    this.LOG.debug('go to url', url);
    await page.goto(url, {waitUntil: 'networkidle0'});
    const screenshot = await page.screenshot();

    await browser.close();
    this.LOG.debug('----------- browser closed -----------');
    return screenshot;
  }
}
