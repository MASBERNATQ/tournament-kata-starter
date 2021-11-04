import { Request, Response } from 'express';
import { ObjectID } from 'typeorm';
import { TournamentRepository } from '../repository/tournament-repository';
import { TournamentModel } from '../service/tournament.model';
import { TournamentUsecase } from '../service/tournament.service';
import { TournamentToAdd } from './api-model';

const tournamentRepository = new TournamentRepository();
const tournamentService = new TournamentUsecase();

export const postTournament = async (req: Request, res: Response) => {
  const tournamentToAdd: TournamentToAdd = req.body;

  if (!tournamentToAdd.name) {
    res.status(400).send("Le champ nom est manquant ou vide");
  }

  const tournament = tournamentService.create(new TournamentModel(tournamentToAdd.name));
  //const tournament = await tournamentRepository.createTournament(tournamentToAdd);

  res.status(201).send(tournament);
};

export const getTournament = async (req: Request, res: Response) => {
  const id = req.params['id'];
  if (!ObjectID.isValid(id)) {
    res.status(400).send("L'identifiant n'est pas correcte");
  }

  const tournament = await tournamentRepository.getTournament(id);
  if (!tournament) {
    res.status(400).send("Le tournoi n'existe pas");
  }

  res.status(200).send(tournament);
};

export const getTournaments = async (req: Request, res: Response) => {
  const tournaments = await tournamentRepository.getTournaments();
  res.status(200).send(tournaments);
};

// export const postParticipant = (req: Request, res: Response) => {
//   // Get the id in the params
//   const id = req.params['id'];

//   // Get the participant to add in the request body
//   const { name, elo }: ParticipantToAdd = req.body;
//   if (!name || !elo || !Number.isInteger(elo)) {
//     res.status(400).send("Le nom ou l'elo sont incorrects");
//   }

//   // Get the tournament
//   const tournament = tournamentRepository.getTournament(id);
//   if (!tournament) {
//     res.status(404).send("Le tournoi n'existe pas");
//   }

//   const participant = { id: uuidv4(), name, elo };

//   // Save tournament
//   tournament.participants.push(participant);
//   tournamentRepository.saveTournament(tournament);

//   res.status(201).send({ id: participant.id });
// };