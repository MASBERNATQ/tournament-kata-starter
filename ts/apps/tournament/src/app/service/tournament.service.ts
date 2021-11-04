import { TournamentRepository } from "../repository/tournament-repository";
import { TournamentDao } from "../repository/entity/Tournament";
import { TournamentModel } from "./tournament.model";

const tournamentRepository = new TournamentRepository();

export class TournamentUsecase {

    public async create(tournament: TournamentModel): Promise<TournamentModel> {
        // Check business rules (there is none for now)

        // Envoi pour persistence
        const dao: TournamentDao = await tournamentRepository.createTournament(new TournamentDao(tournament.name));
        return new TournamentModel(dao.name, dao.id?.toString());
    }
}