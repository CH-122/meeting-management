CREATE TABLE `meeting_room` (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '会议室id',
	`name` VARCHAR ( 50 ) NOT NULL COMMENT '会议室名称',
	capacity INT NOT NULL COMMENT '容纳人数',
	location VARCHAR ( 100 ) NOT NULL COMMENT '会议室位置',
	equipment VARCHAR ( 100 ) COMMENT '设备',
	description VARCHAR ( 200 ) COMMENT '描述',
	`is_booked` TINYINT DEFAULT 0 COMMENT '是否被预定',
	`create_time` BIGINT NOT NULL COMMENT '创建时间',
	`update_time` BIGINT NOT NULL COMMENT '更新时间' 
);


INSERT INTO `meeting_room` ( `name`, capacity, location, equipment, `create_time`, `update_time` )
VALUES
	( '白泽', 10, '一层西', '智能电视', 1716866789882, 1716866789882 ),(
		'夔',
		10,
		'一层东',
		'投影仪',
		1716866789882,
		1716866789882 
		),(
		'凤凰',
		10,
		'一层中',
		'录音设备',
		1716866789882,
		1716866789882 
	);