/** 
 * @file yfrobot
 * @brief YFROBOT's sensors Mind+ library.
 * @n This is a MindPlus graphics programming extension for YFROBOT's module.
 * 
 * @copyright    YFROBOT,2022
 * @copyright    MIT Lesser General Public License
 * 
 * @author [email](yfrobot@qq.com)
 * @date  2022-11-22
*/

enum LEDONOFF {
    //% block="OFF"
    HIGH,
    //% block="ON"
    LOW
}

enum LEDN {
    //% block="D1"
    0,
    //% block="D2"
    1
}

enum MOTORN {
    //% block="RIGHT"
    0,
    //% block="LEFT"
    1
}


enum ENDIS {
    //% block="ENABLE"
    HIGH,
    //% block="DISABLE"
    LOW
}

enum LFSENSORSNUM {
    //% blockId="LFS_1" block="●○○○○"
    0,
    //% blockId="LFS_2" block="○●○○○"
    1,
    //% blockId="LFS_3" block="○○●○○"
    2,
    //% blockId="LFS_4" block="○○○●○"
    3,
    //% blockId="LFS_5" block="○○○○●"
    4
}

enum LFSENSORSNUM_MX {
    //% blockId="LFS_MAX" block="最大值"
    calibratedMaximumOn,
    //% blockId="LFS_MIN" block="最小值"
    calibratedMinimumOn
}

enum PSSTATE {
    //% block="○●○"
    S0,
    //% block="●○○"
    S1,
    //% block="○○●"
    S2,
    //% block="●●●"
    S3,
    //% block="○○○"
    S4,
    //% block="●●○"
    S5,
    //% block="○●●"
    S6,
}

//% color="#177cb0" iconWidth=50 iconHeight=40
namespace digitalTube {

    let digitalTubeInitO = `YF4Bit`;
    //% block="四位数码管初始化DIO[DIOPIN]SCK[SCKPIN]" blockType="command"
    //% DIOPIN.shadow="dropdown" DIOPIN.options="PIN_DigitalWrite"
    //% SCKPIN.shadow="dropdown" SCKPIN.options="PIN_DigitalWrite"
    export function digitalTubeInit(parameter: any, block: any) {
        let sck = parameter.SCKPIN.code;
        let dio = parameter.DIOPIN.code;
        Generator.addInclude(`Include_YFTM1650`, `#include <YFTM1650.h>`)
        Generator.addObject(`YFTM1650`, `YFTM1650`, `${digitalTubeInitO}(${sck}, ${dio});`);
        Generator.addSetup(`${digitalTubeInitO}.init`, `${digitalTubeInitO}.init();`);
    }

    //% block="四位数码管设置亮度[BRIGHT]" blockType="command"
    //% BRIGHT.shadow="range"   BRIGHT.params.min=1    BRIGHT.params.max=8    BRIGHT.defl=1
    export function digitalTubeSetBrightness(parameter: any, block: any) {
        let brightness = parameter.BRIGHT.code;
        Generator.addCode(`${digitalTubeInitO}.setBrightness`, `${digitalTubeInitO}.setBrightness(${brightness});`);
    }

    //% block="OLED 第[LINE]行 显示[STRING]" blockType="command"
    //% LINE.shadow="range"   LINE.params.min=1    LINE.params.max=4    LINE.defl=1
    //% STRING.shadow="string"   STRING.defl="valon"
    export function oledShowLine(parameter: any, block: any) {
        let line = parameter.LINE.code;
        let string = parameter.STRING.code;
        Generator.addInclude(`Include_DFRobot_SSD1306_I2C`, `#include <DFRobot_SSD1306_I2C.h>`)
        Generator.addObject(`DFRobot_SSD1306_I2C`, `DFRobot_SSD1306_I2C`, `${valonoled};`);
        Generator.addSetup(`${valonoled}.begin`, `${valonoled}.begin(0x3d);`);
        Generator.addCode(`${valonoled}.setCursorLine(${line});\n  ${valonoled}.printLine(${string});`);
    }

    //% block="OLED 在坐标X:[X]Y:16*[Y]显示[STRING]" blockType="command"
    //% X.shadow="range"   X.params.min=0    X.params.max=127    X.defl=0
    //% Y.shadow="range"   Y.params.min=1    Y.params.max=4    Y.defl=1
    //% STRING.shadow="string"   STRING.defl="valon"
    export function oledShowXY(parameter: any, block: any) {
        let x = parameter.X.code;
        let y = parameter.Y.code;
        let string = parameter.STRING.code;
        Generator.addInclude(`Include_DFRobot_SSD1306_I2C`, `#include <DFRobot_SSD1306_I2C.h>`)
        Generator.addObject(`DFRobot_SSD1306_I2C`, `DFRobot_SSD1306_I2C`, `${valonoled};`);
        Generator.addSetup(`${valonoled}.begin`, `${valonoled}.begin(0x3d);`);
        Generator.addCode(`${valonoled}.setCursor(${x},${y}-1);\n  ${valonoled}.print(${string});`);
    }
    
    //% block="OLED 清屏" blockType="command"
    export function oledClean(parameter: any, block: any) {
        Generator.addInclude(`Include_DFRobot_SSD1306_I2C`, `#include <DFRobot_SSD1306_I2C.h>`)
        Generator.addObject(`DFRobot_SSD1306_I2C`, `DFRobot_SSD1306_I2C`, `${valonoled};`);
        Generator.addSetup(`${valonoled}.begin`, `${valonoled}.begin(0x3d);`);
        Generator.addCode(`${valonoled}.fillScreen(0);`);
    }
    let irpin = `A0`;
    let irObject = `irrecv`;
    //% block="是否读取到引脚A0红外值" blockType="boolean"
    export function readIR(parameter: any, block: any) {
        Generator.addInclude(`Include_IRremote`, `#include <IRremote.h>`)
        Generator.addObject(`Object_IRrecv`, `IRrecv`, `${irObject}(${irpin});`);
        Generator.addSetup(`${irObject}.enableIRIn`, `${irObject}.enableIRIn();`);
        Generator.addInclude(`Include_decode_results`,`decode_results  results;`);
        Generator.addCode(`${irObject}.decode(&results)`);
    }

    //% block="读到的红外值" blockType="reporter"
    export function IRVal(parameter: any, block: any) {
        Generator.addCode(`results.value`);
    }

    //% block="恢复读取红外值" blockType="command"
    export function readIRResume(parameter: any, block: any) {
        Generator.addCode(`${irObject}.resume();`);
    }
    
    //% block="红外遥控器[BTN]值" blockType="reporter"
    //% BTN.shadow="dropdown"   BTN.options="IrButton"     BTN.defl=IrButton.0xFFA25D
    export function IRMiniValue(parameter: any, block: any) {
        let minibtnval = parameter.BTN.code;
        Generator.addCode(`${minibtnval}`);
    }

    //% block="红外遥控器[BTNH]值(手柄式)" blockType="reporter"
    //% BTNH.shadow="dropdown"   BTNH.options="IrButtonHandle"     BTNH.defl=IrButtonHandle.0xE49BE916
    export function IRHandleValue(parameter: any, block: any) {
        let Handlebtnval = parameter.BTNH.code;
        Generator.addCode(`${Handlebtnval}`);
    }

}
