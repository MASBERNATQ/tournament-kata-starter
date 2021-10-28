import { Request, Response } from 'express';
import { TournamentRepository } from '../repository/tournament-repository';
import { TournamentToAdd, ParticipantToAdd } from './api-model';
import { v4 as uuidv4 } from 'uuid';

const tournamentRepository = new TournamentRepository();

export const postTournament = (req: Request, res: Response) => {
  const { name }: TournamentToAdd = req.body;

  if (!name) {
    res.status(400).send("Le champ nom est manquant ou vide");
  }

  const tournament = { id: uuidv4(), name, phases: [], participants: [] };
  tournamentRepository.saveTournament(tournament);

  res.status(201).send({ id: tournament.id });
};

export const getTournament = (req: Request, res: Response) => {
  const id = req.params['id'];

  const tournament = tournamentRepository.getTournament(id);

  res.status(200);
  res.send(tournament);
};

export const postParticipant = (req: Request, res: Response) => {
  // Get the id in the params
  const id = req.params['id'];

  // Get the participant to add in the request body
  const { name, elo }: ParticipantToAdd = req.body;
  if (!name || !elo || !Number.isInteger(elo)) {
    res.status(400).send("Le nom ou l'elo sont incorrects");
  }

  // Get the tournament
  const tournament = tournamentRepository.getTournament(id);
  if (!tournament) {
    res.status(404).send("Le tournoi n'existe pas");
  }

  const participant = { id: uuidv4(), name, elo };

  res.status(201).send({ id: participant.id });
};