/*
  8-segment display driver of YFRobot 4-bit digital tube module based on TM1650 chip
  Created by yfrobot,Released into the public domain.
*/

#include <YFTM1650.h>

YFTM1650 YF_4BitDis(10, 11);

void setup()
{
  Serial.begin(38400); //Start serial communication at 9600 for debug statements
  Serial.println("YFRobot TM1650 Example Code");
  YF_4BitDis.init();
}

void loop()
{
  YF_4BitDis.setBrightness(1);
  YF_4BitDis.displayString(String("____"));
  delay(1000);
  char line[] = "1234";

  YF_4BitDis.displayString(line);
  YF_4BitDis.setBrightness(7);

  for (int i = 1; i <= 8; i++) {
    YF_4BitDis.setBrightness(i);
    delay(200);
  }
  for (int i = 1; i <= 8; i++) {
    YF_4BitDis.setBrightness(8 - i);
    delay(200);
  }

  YF_4BitDis.displayString(-1.235);
  delay(1000);

  YF_4BitDis.displayString(12.10);
  delay(1000);

  YF_4BitDis.displayString(String("abcd"));
  delay(2000);

  YF_4BitDis.displayString(2020);
  delay(2000);

  if (YF_4BitDis.displayRunning(String("1234567890abcdefghijklmnop"))) {
    delay(500);
    while (YF_4BitDis.displayRunningShift()) {
      delay(500);
    }
  }
  delay(2000);

  for (int i = 0; i < 20; i++) {
    YF_4BitDis.displayOff();
    delay(200);
    YF_4BitDis.displayOn();
    delay(200);
  }

  for (int i = 0; i < 20; i++) {
    YF_4BitDis.setBrightness(1);
    delay(200);
    YF_4BitDis.setBrightness(8);
    delay(200);
  }

  for (int i = 0; i < 20; i++) {
    for (int j = 0; j < 4; j++) {
      YF_4BitDis.setDot(j, true);
      delay(200);
    }
    for (int j = 0; j < 4; j++) {
      YF_4BitDis.setDot(j, false);
      delay(200);
    }
  }
}