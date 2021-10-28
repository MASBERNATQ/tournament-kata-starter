import * as express from 'express';
import { getTournament, postTournament, postParticipant } from './app/api/tournament-api';

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to tournament!' });
});

// Routes for tournaments
app.post('/api/tournaments', postTournament);
app.get('/api/tournaments/:id', getTournament);
app.post('/api/tournaments/:id/participants', postParticipant);
