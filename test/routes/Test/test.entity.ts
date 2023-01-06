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

@Entity("menu","lmr_medical")
export class OtherTableMenu extends AdoOrmBaseEntity{
  @Key
  id!: string;
  
  m_name!: string;

  m_permission!: string;

  m_is_root!: string;

  m_path!: string;

  m_component!: string;

  createTime!: string;
}