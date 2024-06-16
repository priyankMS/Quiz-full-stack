
import { Module } from '@nestjs/common';


import { MongooseModule } from '@nestjs/mongoose';
import { questionService } from './question/question.service';
import {  QuestionController } from './question/question.controller';
import {  Question, QuestionSchema } from './question/question.schema';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User, UserSchema } from './user/user.schema';
import { QuestionModule } from './question/question.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    
     ConfigModule.forRoot({
      isGlobal:true,
     }) ,
     MongooseModule.forRootAsync({
      useFactory:async()=>(
        {
          uri:process.env.MONGO_URI,
        }
      )
     }),
   
    MongooseModule.forFeature([
      {name:Question.name,schema:QuestionSchema},
      {name:User.name,schema:UserSchema}
    ]),QuestionModule,UserModule
  ],
 
})
export class AppModule {}
