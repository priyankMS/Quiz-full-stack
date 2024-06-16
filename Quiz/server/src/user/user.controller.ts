import { Controller ,Body,Post,Get, UsePipes, ValidationPipe,Param,Delete} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO, UserDTO } from "src/dto";
import { User } from "./user.schema";


@Controller('user')
export class UserController{
   
    constructor(private userService:UserService){}
   @Post()  
   @UsePipes(new ValidationPipe({transform:true}))
   async saveUserData(@Body() createUserDto:UserDTO):Promise<User>{
   return  this.userService.createUserInfo(createUserDto)
   }

   @Get()
   async getUserData():Promise<User[]>{
        return  this.userService.getUserInfo()
   }
   
    
   @Delete('/:id')
   async deleteUserData(@Param('id') userId:string):Promise<void>{
      await this.userService.deleteData(userId)
   }
   
}