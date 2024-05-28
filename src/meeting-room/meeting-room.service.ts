import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMeetingRoomDto } from './dto/create-meeting-room.dto';
import { UpdateMeetingRoomDto } from './dto/update-meeting-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MeetingRoom } from './entities/meeting-room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MeetingRoomService {
  @InjectRepository(MeetingRoom)
  private readonly meetingRoomRepository: Repository<MeetingRoom>;

  create(createMeetingRoomDto: CreateMeetingRoomDto) {
    return 'This action adds a new meetingRoom';
  }

  findAll() {
    return `This action returns all meetingRoom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meetingRoom`;
  }

  update(id: number, updateMeetingRoomDto: UpdateMeetingRoomDto) {
    return `This action updates a #${id} meetingRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} metingRoom`;
  }

  async getList(pageNumber: number, pageSize: number) {
    if (pageNumber < 1) {
      throw new HttpException('页码不正确', HttpStatus.BAD_REQUEST);
    }
    if (pageSize < 1) {
      throw new HttpException('页码数不正确', HttpStatus.BAD_REQUEST);
    }
    console.log(111);

    const [rows, total] = await this.meetingRoomRepository.findAndCount({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    });

    console.log(rows, total);

    return { rows, total };
  }
}
