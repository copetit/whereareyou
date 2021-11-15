import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends CoreEntity {
  @Column()
  Password: string;

  @Column()
  MailAddress: string;
}
