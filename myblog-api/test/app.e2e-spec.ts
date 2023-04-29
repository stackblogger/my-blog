import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImppbWN1dGU4ODc5QGdtYWlsLmNvbSIsInN1YiI6IjY0NDk3YmRjMWU1NmY2Zjc0ZGRjMmY2NiIsImlhdCI6MTY4MjYzMTY2MSwiZXhwIjoxNjg1MjIzNjYxfQ.N-uoFHoq3SPAXI0mzopKltY0jjETGQEVoMyhWzOg8Kg';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/blogs (GET) without access token', () => {
    return request(app.getHttpServer()).get('/blogs').expect(401);
  });

  it('/blogs (POST) with access token', () => {
    return request(app.getHttpServer())
      .post('/blogs')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        title: 'Some Article Title Here',
        body: '<p>Some Content Body</p>',
        tags: [
          {
            name: 'programming'
          },
          {
            name: 'javascript'
          }
        ],
        category: {
          name: 'Angular'
        }
      })
      .expect(201);
  });

  it('/blogs (GET) with access token', () => {
    return request(app.getHttpServer())
      .get('/blogs')
      .query({ pageSize: 10, currentPage: 1 })
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);
  });

  it('/blogs (POST) without access token', () => {
    return request(app.getHttpServer()).post('/blogs').expect(401);
  });
});
