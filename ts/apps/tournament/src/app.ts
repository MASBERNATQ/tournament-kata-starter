import * as express from 'express';
import "reflect-metadata";
import { createConnection } from 'typeorm';
import { getTournament, getTournaments, postTournament } from './app/api/tournament-api';
import { TournamentDao } from './app/repository/entity/Tournament';

export const app = express();

createConnection({
  "type": "mongodb",
  "url": "mongodb+srv://admin:tournament-project@cluster0.giiqh.mongodb.net/tournament-project",
  "port": 27017,
  "entities": [TournamentDao],
  "synchronize": true,
  "logging": false,
  "useUnifiedTopology": true
}
).then(() => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to tournament!' });
  });

  // Routes for tournaments
  app.post('/api/tournaments', postTournament);
  app.get('/api/tournaments', getTournaments);
  app.get('/api/tournaments/:id', getTournament);
  // app.post('/api/tournaments/:id/participants', postParticipant);
}).catch(error => console.log(error));