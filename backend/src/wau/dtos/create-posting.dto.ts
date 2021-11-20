import { User } from '../entities/user.entity';
import { LocationInfo } from '../entities/locationinfo.entity';
import { Contents } from '../entities/contents.entity';
import { CoreOutput } from './output.dto';

export class CreatePosting {
  PetName: string;
  PetSex?: string;
  PetAge?: number;
  PetInfo: string;
  Detail?: string;
  LostDate: Date;
  Address: string;
  CreatedDate: Date;
  UpdateDate: Date;
  locationinfo: LocationInfo;
  user: User;
  contents: Contents;
}

export class CreatePostingOutput extends CoreOutput {
  id?: number;
}
