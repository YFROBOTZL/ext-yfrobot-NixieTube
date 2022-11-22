  YFTM1650.h - 
  		8-segment display driver of YFRobot 4-bit digital tube module based on TM1650 chip
  Created by yfrobot,Released into the public domain.
  Changelog:
	v1.0:
		2017/12/25 - Initial release 
	v1.1:
		2020/03/25 - 统一修改TM1650为YFTM1650（避免与其他库混淆）。
					 新增显示float/double/int类型函数。
					 新增显示滚动字符函数。
	v1.2:
		2021/07/01 - 优化显示float函数
						修复小于1小数点数字显示，补齐0位；
					 	修复超出100.00显示函数，超出int范围。
					 