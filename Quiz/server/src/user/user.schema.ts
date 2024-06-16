import { Schema  ,Prop, SchemaFactory} from "@nestjs/mongoose";


export type  UserDoucment= User & Document

@Schema()
export class User{
    @Prop()
    username:string

    @Prop()
    email:string

    @Prop()
    correctAnswers: number
  
    @Prop()
    totalQuestion:number
}

export const UserSchema = SchemaFactory.createForClass(User)