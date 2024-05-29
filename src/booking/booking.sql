CREATE TABLE `booking` (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '预定id',
	`userid` INT NOT NULL COMMENT '预定用户id',
	`room_id` INT NOT NULL COMMENT '预定会议室id',
	`start_time` BIGINT NOT NULL COMMENT '会议开始时间',
	`end_time` BIGINT NOT NULL COMMENT '会议结束时间',
	`status` INT NOT NULL COMMENT '状态： 0 申请中， 1 审批通过 2 审批驳回 3 已解除',
	`note` VARCHAR ( 200 ) COMMENT '备注',
	`create_time` BIGINT NOT NULL COMMENT '创建时间',
	`update_time` BIGINT NOT NULL COMMENT '更新时间' 
);