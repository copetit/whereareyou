import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Contents extends CoreEntity {
  @Column()
  imageUrl: string;

  @Column()
  videoUrl: string;
}
