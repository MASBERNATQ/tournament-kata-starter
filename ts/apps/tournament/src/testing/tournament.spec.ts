import * as request from 'supertest';
import { app } from '../app';
import { exampleParticipant } from './participant.utils';
import { createTournament, exampleTournament } from './tournament.utils';

describe('/tournament endpoint', () => {
  describe('[POST] when creating a tournament', () => {
    it('should return the correct id', async () => {
      const { body: tournament } = await createTournament(exampleTournament);

      expect(tournament.id).not.toBeUndefined();
    });

    it('should have stored the tournament', async () => {
      const { body } = await request(app).post('/api/tournaments').send(exampleTournament).expect(201);

      const get = await request(app).get(`/api/tournaments/${body.id}`).expect(200);

      expect(get.body.name).toEqual(exampleTournament.name);
    });

    it('should return 400 when name is empty or missing', async () => {
      await request(app).post('/api/tournaments').send({ name: '' }).expect(400);
      await request(app).post(`/api/tournaments`).send({}).expect(400);
    });

    it('should have a 400 if the name and the elo is not correct', async () => {
      const { body: tournament } = await createTournament(exampleTournament);

      await request(app).post(`/api/tournaments/${tournament.id}/participants`).send({}).expect(400);
      await request(app).post(`/api/tournaments/${tournament.id}/participants`).send({ name: '' }).expect(400);
      await request(app).post(`/api/tournaments/${tournament.id}/participants`).send({ name: exampleParticipant.name, elo: '1' }).expect(400);
      await request(app).post(`/api/tournaments/${tournament.id}/participants`).send({ elo: '1' }).expect(400);
    });

    it('should have a 404 if the tournament id is not correct', async () => {
      const badTournamentId = 1;

      await request(app).post(`/api/tournaments/${badTournamentId}/participants`).send(exampleParticipant).expect(404);
    });

    it('should have stored the participant', async () => {
      const { body: tournament } = await createTournament(exampleTournament);

      await request(app).post(`/api/tournaments/${tournament.id}/participants`).send(exampleParticipant).expect(201);
    });
  });
});
