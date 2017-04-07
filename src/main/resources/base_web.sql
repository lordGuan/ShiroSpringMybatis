DROP DATABASE IF EXISTS base_web;

CREATE DATABASE base_web DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

use base_web;

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- 用户权限表
-- ----------------------------
DROP TABLE IF EXISTS `u_permission`;
CREATE TABLE `u_permission` (
`id`  bigint(20) NOT NULL AUTO_INCREMENT ,
`url`  varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'url地址' ,
`name`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'url描述' ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=21;

BEGIN;
INSERT INTO `u_permission` (`id`, `url`, `name`) VALUES ('4', '/permission/index.shtml', '权限列表');
INSERT INTO `u_permission` (`id`, `url`, `name`) VALUES ('6', '/permission/addPermission.shtml', '权限添加');
INSERT INTO `u_permission` (`id`, `url`, `name`) VALUES ('7', '/permission/deletePermissionById.shtml', '权限删除');
INSERT INTO `u_permission` (`id`, `url`, `name`) VALUES ('8', '/member/list.shtml', '用户列表');
INSERT INTO `u_permission` (`id`, `url`, `name`) VALUES ('9', '/member/online.shtml', '在线用户');
INSERT INTO `u_permission` (`id`, `url`, `name`) VALUES ('10', '/member/changeSessionStatus.shtml', '用户Session踢出');
INSERT INTO `u_permission` (`id`, `url`, `name`) VALUES ('11', '/member/forbidUserById.shtml', '用户激活&禁止');
INSERT INTO `u_permission` (`id`, `url`, `name`) VALUES ('12', '/member/deleteUserById.shtml', '用户删除');
INSERT INTO `u_permission` (`id`, `url`, `name`) VALUES ('13', '/permission/addPermission2Role.shtml', '权限分配');
INSERT INTO `u_permission` (`id`, `url`, `name`) VALUES ('14', '/role/clearRoleByUserIds.shtml', '用户角色分配清空');
INSERT INTO `u_permission` (`id`, `url`, `name`) VALUES ('15', '/role/addRole2User.shtml', '角色分配保存');
INSERT INTO `u_permission` (`id`, `url`, `name`) VALUES ('16', '/role/deleteRoleById.shtml', '角色列表删除');
INSERT INTO `u_permission` (`id`, `url`, `name`) VALUES ('17', '/role/addRole.shtml', '角色列表添加');
INSERT INTO `u_permission` (`id`, `url`, `name`) VALUES ('18', '/role/index.shtml', '角色列表');
INSERT INTO `u_permission` (`id`, `url`, `name`) VALUES ('19', '/permission/allocation.shtml', '权限分配');
INSERT INTO `u_permission` (`id`, `url`, `name`) VALUES ('20', '/role/allocation.shtml', '角色分配');
COMMIT;

-- ----------------------------
-- 角色表
-- ----------------------------
DROP TABLE IF EXISTS `u_role`;
CREATE TABLE `u_role` (
`id`  bigint(20) NOT NULL AUTO_INCREMENT ,
`name`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色名称' ,
`type`  varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色类型' ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=5;

BEGIN;
INSERT INTO `u_role` (`id`, `name`, `type`) VALUES ('1', '系统管理员', '888888');
INSERT INTO `u_role` (`id`, `name`, `type`) VALUES ('3', '权限角色', '100003');
INSERT INTO `u_role` (`id`, `name`, `type`) VALUES ('4', '用户中心', '100002');
COMMIT;

-- ----------------------------
-- 权限角色关系表
-- ----------------------------
DROP TABLE IF EXISTS `u_role_permission`;
CREATE TABLE `u_role_permission` (
`rid`  bigint(20) NULL DEFAULT NULL COMMENT '角色ID' ,
`pid`  bigint(20) NULL DEFAULT NULL COMMENT '权限ID' 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci;

BEGIN;
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('4', '8');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('4', '9');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('4', '10');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('4', '11');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('4', '12');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('3', '4');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('3', '6');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('3', '7');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('3', '13');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('3', '14');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('3', '15');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('3', '16');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('3', '17');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('3', '18');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('3', '19');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('3', '20');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('1', '4');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('1', '6');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('1', '7');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('1', '8');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('1', '9');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('1', '10');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('1', '11');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('1', '12');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('1', '13');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('1', '14');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('1', '15');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('1', '16');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('1', '17');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('1', '18');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('1', '19');
INSERT INTO `u_role_permission` (`rid`, `pid`) VALUES ('1', '20');
COMMIT;

-- ----------------------------
-- 用户表
-- ----------------------------
DROP TABLE IF EXISTS `u_user`;
CREATE TABLE `u_user` (
`id`  bigint(20) NOT NULL AUTO_INCREMENT ,
`nickname`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户昵称' ,
`email`  varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱|登录帐号' ,
`pswd`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码' ,
`create_time`  datetime NULL DEFAULT NULL COMMENT '创建时间' ,
`last_login_time`  datetime NULL DEFAULT NULL COMMENT '最后登录时间' ,
`status`  bigint(1) NULL DEFAULT 1 COMMENT '1:有效，0:禁止登录' ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=13;

BEGIN;
INSERT INTO `u_user` (`id`, `nickname`, `email`, `pswd`, `create_time`, `last_login_time`, `status`) VALUES ('1', '管理员', 'admin', '0736236422d9fa872ec983e22e4bceb2', '2016-06-16 11:15:33', '2017-01-26 15:17:56', '1');
INSERT INTO `u_user` (`id`, `nickname`, `email`, `pswd`, `create_time`, `last_login_time`, `status`) VALUES ('11', '权限角色', 'role', '597b1516de08a94880eef8e2e69069bc', '2016-05-26 20:50:54', '2016-06-16 11:24:35', '1');
INSERT INTO `u_user` (`id`, `nickname`, `email`, `pswd`, `create_time`, `last_login_time`, `status`) VALUES ('12', '用户中心', 'users', 'c63161e3dc4579d829ab6a61f37322bb', '2016-05-27 22:34:19', '2016-06-15 17:03:16', '1');
COMMIT;

-- ----------------------------
-- 用户角色表
-- ----------------------------
DROP TABLE IF EXISTS `u_user_role`;
CREATE TABLE `u_user_role` (
`uid`  bigint(20) NULL DEFAULT NULL COMMENT '用户ID' ,
`rid`  bigint(20) NULL DEFAULT NULL COMMENT '角色ID' 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci;

BEGIN;
INSERT INTO `u_user_role` (`uid`, `rid`) VALUES ('12', '4');
INSERT INTO `u_user_role` (`uid`, `rid`) VALUES ('11', '3');
INSERT INTO `u_user_role` (`uid`, `rid`) VALUES ('11', '4');
INSERT INTO `u_user_role` (`uid`, `rid`) VALUES ('1', '1');
COMMIT;

