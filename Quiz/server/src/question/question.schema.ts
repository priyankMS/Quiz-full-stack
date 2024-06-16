import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {

 
  @Prop({ type: [{ type: Object }] })
  questionArray: [{
    isCheck: boolean;
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
  }]; 
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
