import { Request, Response } from 'express';
import { TournamentRepository } from '../repository/tournament-repository';
import { TournamentToAdd, ParticipantToAdd } from './api-model';
import { v4 as uuidv4 } from 'uuid';

const tournamentRepository = new TournamentRepository();

export const postTournament = (req: Request, res: Response) => {
  const tournamentToAdd: TournamentToAdd = req.body;

  if (!tournamentToAdd.name) {
    res.status(400);
  }

  const tournament = { id: uuidv4(), name: tournamentToAdd.name, phases: [], participants: [] };
  tournamentRepository.saveTournament(tournament);

  res.status(201);
  res.send({ id: tournament.id });
};

export const getTournament = (req: Request, res: Response) => {
  const id = req.params['id'];

  const tournament = tournamentRepository.getTournament(id);

  res.status(200);
  res.send(tournament);
};


export const postParticipant = (req: Request, res: Response) => {
  const id = req.params['id'];
  const participantToAdd: ParticipantToAdd = req.body;

  // Get the tournament
  const tournament = tournamentRepository.getTournament(id);
  if (!tournament) {
    res.status(404).send("Le tournoi n'existe pas");
  }

  if (!participantToAdd.name || participantToAdd.elo) {
    res.status(400);
  }

  const participant = { id: uuidv4(), name: participantToAdd.name, elo: participantToAdd.elo };

  res.status(201).send({ id: participant.id });
};