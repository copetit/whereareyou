import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Contents extends CoreEntity {
  @Column('simple-array')
  imageUrl: string[];

  @Column('simple-array')
  videoUrl: string[];
}
