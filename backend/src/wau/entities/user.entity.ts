import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User extends CoreEntity {
  @Column()
  Password: string;

  @Column()
  MailAddress: string;

  // passwordをhash化する
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      const salt = await bcrypt.genSalt();
      this.Password = await bcrypt.hash(this.Password, salt);
    } catch (error) {
      console.log(error);
    }
  }
}
