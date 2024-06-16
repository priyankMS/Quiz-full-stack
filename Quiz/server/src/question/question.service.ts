  import { Model } from 'mongoose';
  import { Question, QuestionDocument } from './question.schema';
  import { InjectModel } from '@nestjs/mongoose';
  import { Injectable, NotFoundException } from '@nestjs/common';
  import { CreateUserDTO } from '../dto';
  import { v4 as uuidv4 } from 'uuid';

  @Injectable()
  export class questionService {
    constructor(
      @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    ) {}

    async createQuestions(createQuestionsDto: CreateUserDTO[],): Promise<Question[]> {
      const validQuestion = createQuestionsDto.filter((dto) => dto.question);
      
      if (validQuestion.length === 0) {
        return [];}

    
      //conver DTO to queston
      const question = validQuestion.map((dto) => ({
        id: dto.id,
        isCheck:dto.isCheck,
        question: dto.question,
        options: dto.options,
        correctAnswer: dto.correctAnswer,
      }));

      const isEmpty = (await this.questionModel.countDocuments()) === 0;
      if (isEmpty) {
        const newQuestion = new this.questionModel({
          questionArray: question,
        });

        await newQuestion.save();
        return [newQuestion];
      } else {
        await this.questionModel.updateOne(
          {},
          { $push: { questionArray: { $each: question } } },
        );
        return await this.questionModel.findOne();
      }
    }

    async getAllItems(): Promise<Question[]> {
      return this.questionModel.find().exec();
    } 

  async deleteItem(itemId: string): Promise<void | null> {
  

    const question = await this.questionModel.findOneAndUpdate(
      {},
      { $pull: { questionArray: { id: itemId } } },
      { new: true }
    ).exec();

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return null;
  }

  async updateItem(itemId: string, updateQuestion: CreateUserDTO): Promise<void | null> {
    try {
      console.log(itemId);
      // const updatedQuestion = await this.questionModel.findOneAndUpdate(
        
      //   { _id: '6627b4df21ea12c364529b0b',itemId:itemId }, // Filter based on the itemId in questionArray
      //   { $pus: { "questionArray.$": updateQuestion }},
      //   { new: true }
      // ).exec();

      const updatedQuestion = await this.questionModel.findById('6627b4df21ea12c364529b0b');
      const questionIndex = updatedQuestion?.questionArray?.findIndex( q => q.id === itemId);
      if (questionIndex === -1) {
        throw new Error('Question not found in questionArray');
      }
      if (!updatedQuestion) {
        throw new NotFoundException('Question not found or updation error');
      }

      updatedQuestion.questionArray[questionIndex] = { ...updatedQuestion.questionArray[questionIndex], ...updateQuestion};
      await updatedQuestion.save();

      console.log('Updated question:', updatedQuestion);
      return null;
    } catch (error) {
      console.error(error);
      // Throw appropriate exceptions or handle errors as needed
    }
  }

        
        
        
    

  }
