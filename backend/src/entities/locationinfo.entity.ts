import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class LocationInfo extends CoreEntity {
  @Column()
  lat: number;

  @Column()
  lng: number;
}
