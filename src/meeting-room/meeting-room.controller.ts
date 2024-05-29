import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { MeetingRoomService } from './meeting-room.service';
import { CreateMeetingRoomDto } from './dto/create-meeting-room.dto';
// import { UpdateMeetingRoomDto } from './dto/update-meeting-room.dto';

@Controller('meeting-room')
export class MeetingRoomController {
  constructor(private readonly meetingRoomService: MeetingRoomService) {}

  @Post('add')
  create(@Body() createMeetingRoomDto: CreateMeetingRoomDto) {
    return this.meetingRoomService.add(createMeetingRoomDto);
  }

  @Get('list')
  async getList(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
  ) {
    console.log(1111111);

    return await this.meetingRoomService.getList(pageNumber, pageSize);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.meetingRoomService.delete(id);
  }
}
