import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
// import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { MeetingRoom } from 'src/meeting-room/entities/meeting-room.entity';
import { User } from 'src/user/entities/user.entity';
import { BookingVo } from './vo/bookingVo';

export interface BookingWithRelations extends Booking {
  meetingRoom: MeetingRoom;
  user: User;
}

@Injectable()
export class BookingService {
  @InjectRepository(Booking)
  private readonly bookingRepository: Repository<Booking>;

  async create(createBookingDto: CreateBookingDto, userid: number) {
    console.log(userid);

    const booking = new Booking();

    booking.createTime = Date.now();
    booking.updateTime = Date.now();
    booking.note = createBookingDto.note;
    booking.roomId = createBookingDto.roomId;
    booking.startTime = createBookingDto.startTime;
    booking.endTime = createBookingDto.endTime;
    booking.userid = userid;
    booking.status = 0;

    return await this.bookingRepository.insert(booking);
  }

  findAll() {
    return `This action returns all booking`;
  }

  async findOne(id: number) {
    const bookingRecord = (await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndMapOne(
        'booking.meetingRoom',
        MeetingRoom,
        'meetingRoom',
        'booking.roomId = meetingRoom.id',
      )
      .leftJoinAndMapOne(
        'booking.user',
        User,
        'user',
        'booking.userid = user.id',
      )
      .where('booking.id = :id', { id })
      .getOne()) as BookingWithRelations;

    if (!bookingRecord) {
      throw new HttpException('该预约记录不存在', HttpStatus.BAD_REQUEST);
    }

    let bookingVo = new BookingVo();

    bookingVo = { ...bookingRecord };

    bookingVo.user = {
      id: bookingRecord.user.id,
      username: bookingRecord.user.username,
      nickName: bookingRecord.user.nickName,
      email: bookingRecord.user.email,
    };

    return bookingVo;
  }

  async delete(id: number) {
    const bookingRecord = await this.bookingRepository.findOneBy({ id: id });

    if (!bookingRecord) {
      throw new HttpException('该预约记录不存在', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.bookingRepository.delete(id);
      return '操作成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async apply(id: number, userid: number) {
    const bookingRecord = await this.bookingRepository.findOneBy({ id: id });
    if (!bookingRecord) {
      throw new HttpException('该预约记录不存在', HttpStatus.BAD_REQUEST);
    }

    if (bookingRecord.userid != userid) {
      throw new HttpException('暂无权限', HttpStatus.BAD_REQUEST);
    }

    await this.bookingRepository.update({ id: id }, { status: 1 });

    return '操作成功';
  }
}
