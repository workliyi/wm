import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

export interface SeoReport {
  titlePresent: boolean;
  metaDescriptionPresent: boolean;
  h1Count: number;
  imagesWithoutAlt: number;
}

@Injectable()
export class SeoService {
  async analyze(url: string): Promise<SeoReport> {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const titlePresent = $('title').length > 0;
    const metaDescriptionPresent = $('meta[name="description"]').length > 0;
    const h1Count = $('h1').length;
    const imagesWithoutAlt = $('img:not([alt])').length;

    return {
      titlePresent,
      metaDescriptionPresent,
      h1Count,
      imagesWithoutAlt,
    };
  }
}
