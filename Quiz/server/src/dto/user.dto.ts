import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserDTO{
    @IsString()
    @IsNotEmpty()
    username:string;
  
    @IsEmail()
    @IsNotEmpty()
    email:string;

   
    @IsNumber()
    correctAnswers:number;

    @IsNumber()
    totalQuestion:number
    
}

