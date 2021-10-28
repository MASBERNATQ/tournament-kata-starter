import * as express from 'express';
import { getTournament, postTournament } from './app/api/tournament-api';
import { postParticipant } from './app/api/participant-api';

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to tournament!' });
});

// tournaments
app.post('/api/tournaments', postTournament);
app.get('/api/tournaments/:id', getTournament);
app.post('/api/tournaments/:id/participants', postParticipant);
