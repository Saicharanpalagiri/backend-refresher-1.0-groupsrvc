import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GroupDto } from './submodules/backend-refresher-1.0-dtos/src/dtos/group.dto';
import { UserDto } from './submodules/backend-refresher-1.0-dtos/src/dtos/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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

  @Post()
  async createGroup(
    @Body() group: GroupDto,
    @Query() query: { userId: number },
  ) {
    try {
      let { userId } = query;
      let createdGroup = await this.appService.createGroup(group, userId);
      return createdGroup
      //console.log('control is here', user);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') groupId: number) {
    try{
      let deletedUser = await this.appService.deleteGroup(groupId);
      return deletedUser
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Put()
  async updateUser(@Body() group: GroupDto) {
    try {
      let updateResult = await this.appService.updategroup(group);
      return updateResult;
    } catch (err) {
      console.log(err);
      return err;
    }
  }


  @Post('/create-user')
  async createUser(@Body() user: UserDto) {
    try {
      let createdUser = await this.appService.createUser(user)
      return createdUser
      //console.log('control is here', user);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Put('/user-group')
  async fetchContentByUser(
    @Query() query: { groupId: number; userId: number },
  ) {
    try{
      let { groupId, userId } = query;
      let fetchedContent = await this.appService.updateGroup(groupId, userId);
      return fetchedContent;
    } catch (err) {
      console.log(err);
    }
  }

  @Get('/get-group')
  async getGroup(@Query() query: { groupId: number }) {
    try{
      let { groupId } = query;
      let UpdatedGroup = await this.appService.GetGroup(groupId);
      return UpdatedGroup;
    } catch (err) {
      console.log(err);
    }
  }

  @Put('/delete-user-in-group')
  async deleteUserInGroup(@Query() query: { userId: number, groupId: number }) {
    try{
      let { userId, groupId } = query;
      let UpdatedGroup = await this.appService.deletegroupUser(userId, groupId);
      return UpdatedGroup;
    } catch (err) {
      console.log(err);
    }
  }

}
