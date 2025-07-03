import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import axios from 'axios';

jest.mock('axios');

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue({
      data: `<html><head><title>Test</title><meta name="description" content="desc"></head><body><h1>Header</h1><img src="x.png" alt="img"></body></html>`,
    });
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/seo/report (GET)', () => {
    return request(app.getHttpServer())
      .get('/seo/report')
      .query({ url: 'https://example.com' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('titlePresent');
        expect(res.body).toHaveProperty('metaDescriptionPresent');
        expect(res.body).toHaveProperty('h1Count');
        expect(res.body).toHaveProperty('imagesWithoutAlt');
      });
  });
});
