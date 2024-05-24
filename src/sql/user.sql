CREATE DATABASE metting_reservation DEFAULT CHARACTER 
SET utf8mb4;

USE  `metting_reservation`;

CREATE TABLE `users` (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL COMMENT '用户id',
	username VARCHAR ( 50 ) NOT NULL COMMENT '用户名',
	password VARCHAR ( 50 ) NOT NULL COMMENT '密码',
	email VARCHAR ( 255 ) NOT NULL COMMENT '邮箱',
	nickName VARCHAR ( 255 ) NOT NULL COMMENT '昵称',
	avatar VARCHAR ( 255 ) COMMENT '头像',
	phone VARCHAR ( 20 )  COMMENT '手机号',
	isFrozen TINYINT NOT NULL DEFAULT 0 COMMENT '是否冻结',
	isAdmin TINYINT NOT NULL DEFAULT 0 COMMENT '是否是管理员',
	createTime BIGINT NOT NULL COMMENT '创建时间',
	updateTime BIGINT NOT NULL COMMENT '更新时间' 
);

# roles
CREATE TABLE `roles` ( id INT PRIMARY KEY AUTO_INCREMENT NOT NULL COMMENT '角色 id', NAME VARCHAR ( 20 ) NOT NULL COMMENT '角色名' );

# permissions
CREATE TABLE permissions (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL COMMENT '权限 id',
	CODE VARCHAR ( 20 ) NOT NULL COMMENT '权限代码',
	description VARCHAR ( 100 ) NOT NULL COMMENT '权限描述' 
);

# user_roles
CREATE TABLE `user_roles` ( id INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT 'id', `user_id` INT NOT NULL COMMENT '用户id', `role_id` INT NOT NULL COMMENT '角色 id' );

# 角色-权限
CREATE TABLE `role_permissions` ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'id', `role_id` INT NOT NULL COMMENT '角色 id', `permission_id` INT NOT NULL COMMENT '权限 id' );

DROP TABLE `users`;

# 创建角色
INSERT INTO roles (name) VALUES ('管理员'),('普通用户');

# 创建权限
INSERT INTO permissions (code, description) VALUES ('ccc', '访问 ccc 接口'), ('ddd', '访问 ddd 接口');

# 给用户添加角色
INSERT INTO `user_roles` (`user_id`, `role_id`)  VALUES (1, 1),(2,2);

# 给角色设置权限
INSERT INTO `role_permissions` (`role_id`, `permission_id`) VALUES (1, 1), (1, 2), (2, 1);

# 用户修改为管理员
UPDATE `users` SET `isAdmin` = 1 WHERE `username` = 'hh';





