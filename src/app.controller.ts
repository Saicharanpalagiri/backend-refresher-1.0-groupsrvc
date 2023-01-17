import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { GroupDto } from './submodules/backend-refresher-1.0-dtos/src/dtos/group.dto';
import { UserDto } from './submodules/backend-refresher-1.0-dtos/src/dtos/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get()
  async Users() {
    try {
      let a=await this.appService.users();
      return a; 
    } catch (error) {
      console.log(error)
    }
  }
  @Get()
  async getGroups(){
    try{
      let fetchedgroups = await this.appService.findAll();
      console.log(fetchedgroups);
      return fetchedgroups;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

}
