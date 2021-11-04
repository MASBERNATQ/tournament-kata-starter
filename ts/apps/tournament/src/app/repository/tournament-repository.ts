import { getMongoRepository } from "typeorm";
import { TournamentDao } from "./entity/Tournament";

export class TournamentRepository {
  public async createTournament(tournamentToAdd: TournamentDao): Promise<TournamentDao> {
    const repository = getMongoRepository(TournamentDao);
    const tournament = await repository.create(tournamentToAdd);
    return await repository.save(tournament);
  }

  public async getTournament(tournamentId: string): Promise<TournamentDao> {
    const repository = getMongoRepository(TournamentDao);
    return await repository.findOne(tournamentId);
  }

  public async getTournaments(): Promise<TournamentDao[]> {
    const repository = getMongoRepository(TournamentDao);
    return await repository.find();
  }
}
