import * as request from 'supertest';
import { app } from '../app';
import { Tournament } from './../app/api/api-model';

export const exampleTournament = {
  name: 'Nom du tournoi',
} as Tournament;

export const createTournament = async (tournament: Tournament) => {
  return await request(app).post('/api/tournaments').send(tournament).expect(201);
}