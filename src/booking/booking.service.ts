import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
// import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { MeetingRoom } from 'src/meeting-room/entities/meeting-room.entity';

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
    const bookingRecord = await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect(
        MeetingRoom,
        'meetingRoom',
        'meetingRoom.id = booking.roomId',
      )
      .where('booking.id = :id', { id })
      .getRawMany();

    if (!bookingRecord) {
      throw new HttpException('该预约记录不存在', HttpStatus.BAD_REQUEST);
    }

    return bookingRecord;
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
}
