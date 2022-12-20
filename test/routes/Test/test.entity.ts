import { AdoOrmBaseEntity, Entity, Key } from "../../../lib/orm";

export class Name{

  first!: string;
  
  last!: string;

}

@Entity("user")
export class User extends AdoOrmBaseEntity{

  @Key
  id!:string;

  name!: Name
  
}