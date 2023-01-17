import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupDto } from './submodules/backend-refresher-1.0-dtos/src/dtos/group.dto';
import { UserDto } from './submodules/backend-refresher-1.0-dtos/src/dtos/user.dto';
import { Group } from './submodules/backend-refresher-entities-1.0/src/entities/group.entity';
import { User } from './submodules/backend-refresher-entities-1.0/src/entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Group) 
    private groupRepository: Repository<Group>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}

  getHello(): string {
    return 'Hello World!';
  }
  async users(){
    try {
      let a = 'Hello';
      return a;
    } catch (error) {
      console.log(error);
    }
  }

  

  async findAll(){
    try{
      let retrievedGroups = await this.groupRepository.find();
      return retrievedGroups;
    } catch (err) {
      throw err
    }
  }

}

