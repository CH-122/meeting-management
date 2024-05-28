import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MeetingRoomService } from './meeting-room.service';
import { CreateMeetingRoomDto } from './dto/create-meeting-room.dto';
import { UpdateMeetingRoomDto } from './dto/update-meeting-room.dto';

@Controller('meeting-room')
export class MeetingRoomController {
  constructor(private readonly meetingRoomService: MeetingRoomService) {}

  @Post()
  create(@Body() createMeetingRoomDto: CreateMeetingRoomDto) {
    return this.meetingRoomService.create(createMeetingRoomDto);
  }

  @Get()
  findAll() {
    return this.meetingRoomService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMeetingRoomDto: UpdateMeetingRoomDto,
  ) {
    return this.meetingRoomService.update(+id, updateMeetingRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meetingRoomService.remove(+id);
  }

  @Get('list')
  async getList(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
  ) {
    console.log(1111111);

    return await this.meetingRoomService.getList(pageNumber, pageSize);
  }
}
