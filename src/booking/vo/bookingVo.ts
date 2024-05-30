export class BookingVo {
  id: number;
  startTime: number;
  endTime: number;
  status: number;
  note: string;
  createTime: number;
  updateTime: number;
  meetingRoom: {
    id: number;
    name: string;
  };
}
