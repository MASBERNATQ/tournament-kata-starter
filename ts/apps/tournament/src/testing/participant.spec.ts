import * as request from 'supertest';
import { app } from '../app';
import { exampleParticipant } from './participant.utils';
import { createTournament, exampleTournament } from './tournament.utils';

describe('/participant endpoint', () => {
  describe('[POST] when creating a participant', () => {
    it('should have a 400 if the name and the elo is not correct', async () => {
      const { body: tournament } = await createTournament(exampleTournament);

      await request(app).post(`/api/tournaments/${tournament.id}/participants`).send({}).expect(400);
      await request(app).post(`/api/tournaments/${tournament.id}/participants`).send({ name: '' }).expect(400);
      await request(app).post(`/api/tournaments/${tournament.id}/participants`).send({ name: exampleParticipant.name, elo: '1' }).expect(400);
      await request(app).post(`/api/tournaments/${tournament.id}/participants`).send({ elo: '1' }).expect(400);
    });

    it('should have a 404 if the tournament id is not correct', async () => {
      const id = 1;

      await request(app).post(`/api/tournaments/${id}/participants`).send(exampleParticipant).expect(404);
    });

    it('should have stored the participant', async () => {
      const { body: tournament } = await createTournament(exampleTournament);

      await request(app).post(`/api/tournaments/${tournament.id}/participants`).send(exampleParticipant).expect(201);
    });
  });
});
