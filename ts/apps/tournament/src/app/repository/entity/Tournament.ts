import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class TournamentDao {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  public constructor(name?: string, id?: ObjectID){
    this.id = id;
    this.name = name;
  }
}