import { Request, Response } from 'express';
import { ParticipantRepository } from '../repository/participant-repository';
import { ParticipantToAdd } from './api-model';
import { v4 as uuidv4 } from 'uuid';

const participantRepository = new ParticipantRepository();

export const postParticipant = (req: Request, res: Response) => {
  const participantToAdd: ParticipantToAdd = req.body;

  const participant = { id: uuidv4(), name: participantToAdd.name, elo: participantToAdd.elo };
  participantRepository.saveParticipant(participant);

  res.status(201).send({ id: participant.id });
}