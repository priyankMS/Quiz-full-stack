import { Body, Controller, Post, Get, UsePipes, ValidationPipe, Put, Param, Delete, HttpException, HttpStatus } from "@nestjs/common";
import { questionService } from "./question.service";
import { CreateUserDTO } from "../dto";
import { Question } from "./question.schema";

@Controller({ path: 'question' })
export class QuestionController {
    constructor(private questionService: questionService) {}

    @Post()
    @UsePipes(new ValidationPipe({transform:true}))
    async createQuestions(@Body() createQuestionsDto: CreateUserDTO[]): Promise<Question[]> {
        const questionsArray = Array.isArray(createQuestionsDto) ? createQuestionsDto : [createQuestionsDto];
        return this.questionService.createQuestions(questionsArray);
    }

    @Get()
    async getAllItems(): Promise<Question[]> {
        return this.questionService.getAllItems();
    }

    @Delete('/:id')
    async deleteQuestionItem(@Param('id') itemId:string):Promise<void>{
        try {
            const deleteQUestion = await this.questionService.deleteItem(itemId)
            if(deleteQUestion === undefined){
                throw new HttpException('not found',HttpStatus.NOT_FOUND)
            }   
        } catch (error) {
            console.log(error);
        }
    }


    @Put('/:id')
    async updatequestion(@Param('id') itemId:string,@Body() updateQuestion:CreateUserDTO):Promise<void>{
        try {
            const updateQUestion = await this.questionService.updateItem(itemId,updateQuestion)
            if(updateQUestion === undefined){
                throw new HttpException('not found',HttpStatus.NOT_FOUND)
            }
        } catch (error) {
            console.log(error);
        }
    }
  


}
