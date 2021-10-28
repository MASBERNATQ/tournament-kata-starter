import { app } from '../app';
import * as request from 'supertest';
import { Participant } from '../app/api/api-model';
import { exampleTournament } from './tournament.spec';

const exampleParticipant = {
  name: 'John',
  elo: 1
} as Participant;

describe('/particpant endpoint', () => {
  describe('[POST] when creating a participant', () => {
    it('should have a 400 if the name and the elo is not correct', async () => {
      const { body } = await request(app).post('/api/tournaments').send(exampleTournament);

      await request(app).post(`/api/tournaments/${body.id}/participants`).send({}).expect(400);
      await request(app).post(`/api/tournaments/${body.id}/participants`).send({ name: '' }).expect(400);
      await request(app).post(`/api/tournaments/${body.id}/participants`).send({ name: exampleParticipant.name, elo: '1' }).expect(400);
      await request(app).post(`/api/tournaments/${body.id}/participants`).send({ elo: '1' }).expect(400);
    });

    it('should have a 404 if the tournament id is not correct', async () => {
      const badTournamentId = 1;

      await request(app).post(`/api/tournaments/${badTournamentId}/participants`).send(exampleParticipant).expect(404);
    });

    it('should have stored the participant', async () => {
      const { body } = await request(app).post('/api/tournaments').send(exampleTournament);

      await request(app).post(`/api/tournaments/${body.id}/participants`).send(exampleParticipant).expect(201);
    });
  });
});
