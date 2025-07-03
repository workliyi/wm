import { Controller, Get, Query } from '@nestjs/common';
import { SeoService, SeoReport } from './seo.service';

@Controller('seo')
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Get('report')
  async getReport(@Query('url') url: string): Promise<SeoReport> {
    if (!url) {
      throw new Error('url query parameter is required');
    }
    return this.seoService.analyze(url);
  }
}
