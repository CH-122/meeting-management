import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
// import { UpdateBookingDto } from './dto/update-booking.dto';
import { RequireLogin, UserInfo } from 'src/custom.decorator';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
  //   return this.bookingService.update(+id, updateBookingDto);
  // }

  @Post('add')
  @RequireLogin()
  async create(
    @Body() createBookingDto: CreateBookingDto,
    @UserInfo('userid') userid: number,
  ) {
    return await this.bookingService.create(createBookingDto, userid);
  }

  @Delete(':id')
  async deleteBooking(@Param('id') id: string) {
    return await this.bookingService.delete(+id);
  }

  @Get('apply/:id')
  @RequireLogin()
  async apply(@Param('id') id: string, @UserInfo('uerid') userid: number) {
    return await this.bookingService.apply(+id, userid);
  }
}
