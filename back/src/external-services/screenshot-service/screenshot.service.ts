import {Injectable} from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class ScreenshotService {
  async getScreenShot(url: string) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto(url, {waitUntil: 'networkidle0'});
    const screenshot = await page.screenshot();

    await browser.close();

    return screenshot;
  }
}
