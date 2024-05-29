import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty({ message: '会议室 id 不能为空' })
  roomId: number;

  @IsNotEmpty({ message: '开始时间不能为空' })
  startTime: number;

  @IsNotEmpty({ message: '结束时间不能为空' })
  endTime: number;

  @IsOptional()
  @MaxLength(200, { message: '备注不能超过100个字符' })
  note: string;

  @IsOptional()
  status: number;
}
