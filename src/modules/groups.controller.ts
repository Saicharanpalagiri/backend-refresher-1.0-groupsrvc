import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { UserDto } from 'src/submodules/backend-refresher-1.0-dtos/src/dtos/user.dto';
import { GroupDto } from 'src/submodules/backend-refresher-1.0-dtos/src/dtos/group.dto';

import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  

  @Get()
  async getGroups(){
    try{
      let fetchedgroups = await this.groupsService.findAll();
      console.log(fetchedgroups);
      return fetchedgroups;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Post()
  async createGroup(
    @Body() group: GroupDto,
    @Query() query: { userId: number },
  ) {
    try {
      let { userId } = query;
      let createdGroup = await this.groupsService.createGroup(group, userId);
      return createdGroup
      //console.log('control is here', user);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Get('/users-in-group')
  async UsersinGroup(@Query() query: { groupId: number }) {
    try {
      let { groupId } = query;
      let fetchedUsersInGroup = await this.groupsService.fetchedUsersInGroup(groupId);
      return fetchedUsersInGroup;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') groupId: number) {
    try{
      let deletedUser = await this.groupsService.deleteGroup(groupId);
      return deletedUser
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Put()
  async updateUser(@Body() group: GroupDto) {
    try {
      let updateResult = await this.groupsService.updategroup(group);
      return updateResult;
    } catch (err) {
      console.log(err);
      return err;
    }
  }


  @Post('/create-user')
  async createUser(@Body() user: UserDto) {
    try {
      let createdUser = await this.groupsService.createUser(user)
      return createdUser
      //console.log('control is here', user);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Put('/user-group')
  async AddUser(@Query() query: { groupId: number; userId: number }) {
    try{
      let { groupId, userId } = query;
      let fetchedContent = await this.groupsService.updateGroup(groupId, userId);
      return fetchedContent;
    } catch (err) {
      console.log(err);
    }
  }

  @Get('/get-group')
  async getGroup(@Query() query: { groupId: number }) {
    try{
      let { groupId } = query;
      let UpdatedGroup = await this.groupsService.GetGroup(groupId);
      return UpdatedGroup;
    } catch (err) {
      console.log(err);
    }
  }

  @Put('/delete-user-in-group')
  async deleteUserInGroup(@Query() query: { userId: number, groupId: number }) {
    try{
      let { userId, groupId } = query;
      let UpdatedGroup = await this.groupsService.deletegroupUser(userId, groupId);
      return UpdatedGroup;
    } catch (err) {
      console.log(err);
    }
  }
}
