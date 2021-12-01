import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CoreEntity } from 'src/common/entities/core.entity';

@Entity()
export class LocationInfo extends CoreEntity {
  @ApiProperty({
    default: 35.73805386139952,
  })
  @Column('decimal', { precision: 9, scale: 6 })
  lat: number;

  @ApiProperty({
    default: 139.6538817110336,
  })
  @Column('decimal', { precision: 9, scale: 6 })
  lng: number;
}
