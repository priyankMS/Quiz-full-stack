import { Injectable } from '@nestjs/common';
import { User, UserDoucment } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDTO } from 'src/dto';

@Injectable()
export class UserService {
   constructor(@InjectModel(User.name) private userModel:Model<UserDoucment>){}
  
   async createUserInfo(createUserDto:UserDTO):Promise<UserDoucment>{
       const saveData  = new this.userModel(createUserDto)
       
       return await saveData.save()
   }

    async getUserInfo():Promise<UserDoucment[]>{
        return await this.userModel.find()
    }

    async deleteData(id:string):Promise<void>{
      return  await this.userModel.findByIdAndDelete(id)
      
    }

}