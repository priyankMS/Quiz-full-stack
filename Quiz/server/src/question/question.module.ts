import { Module } from "@nestjs/common";
import { QuestionController } from "./question.controller";
import { questionService } from "./question.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Question, QuestionSchema } from "./question.schema";

@Module({
  imports: [MongooseModule.forFeature([{name:Question.name,schema:QuestionSchema}])],
  controllers: [QuestionController],
  providers: [questionService],
  exports: [],
})

export class QuestionModule {}