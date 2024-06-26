import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMeetingRoomDto } from './dto/create-meeting-room.dto';
// import { UpdateMeetingRoomDto } from './dto/update-meeting-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MeetingRoom } from './entities/meeting-room.entity';
import { Repository } from 'typeorm';
import { UpdateMeetingRoomDto } from './dto/update-meeting-room.dto';

@Injectable()
export class MeetingRoomService {
  @InjectRepository(MeetingRoom)
  private readonly meetingRoomRepository: Repository<MeetingRoom>;

  async add(createMeetingRoomDto: CreateMeetingRoomDto) {
    createMeetingRoomDto.createTime = Date.now();
    createMeetingRoomDto.updateTime = Date.now();
    return await this.meetingRoomRepository.insert(createMeetingRoomDto);
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

  async delete(id: string) {
    try {
      await this.meetingRoomRepository.delete(id);
      return '操作成功';
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateMeetingRoomDto: UpdateMeetingRoomDto) {
    const meetingRoom = await this.meetingRoomRepository.findOneBy({
      id: +id,
    });

    if (!meetingRoom) {
      throw new HttpException('会议室不存在', HttpStatus.BAD_REQUEST);
    }

    await this.meetingRoomRepository.update(
      {
        id: +id,
      },
      {
        updateTime: Date.now(),
        ...updateMeetingRoomDto,
      },
    );

    // return '操作成功';
  }

  async getById(id: string) {
    const meetingRoom = await this.meetingRoomRepository.findOneBy({
      id: +id,
    });

    if (!meetingRoom) {
      throw new HttpException('会议室不存在', HttpStatus.BAD_REQUEST);
    }

    return meetingRoom;
  }
}
