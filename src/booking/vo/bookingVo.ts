import { MeetingRoom } from 'src/meeting-room/entities/meeting-room.entity';

export class BookingVo {
  id: number;
  startTime: number;
  endTime: number;
  status: number;
  note: string;
  createTime: number;
  updateTime: number;
  meetingRoom: MeetingRoom;
  user: {
    id: number;
    username: string;
    nickName: string;
    email: string;
  };
}
