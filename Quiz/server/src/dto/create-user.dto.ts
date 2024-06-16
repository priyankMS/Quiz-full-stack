import {
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDTO {
   
  isCheck:boolean;

  @IsString()
  @IsNotEmpty()
 readonly  id: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @ValidateNested({ each: true })
  @IsObject()
  @Type(() => OptionDTO)
  options: string[];

  @IsString()
  @IsNotEmpty()
  correctAnswer: string;
  private _id: string;
  propertyName: any;
}

class OptionDTO {
  @IsString()
  option: string;
}
