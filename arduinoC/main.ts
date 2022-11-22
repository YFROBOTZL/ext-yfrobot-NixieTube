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

enum DOT {
    //% block="亮"
    true,
    //% block="灭"
    false
}

enum CLEAR {
    //% block="开"
    0,
    //% block="关"
    1,
    //% block="清屏"
    2
}

//% color="#4c8dae" iconWidth=50 iconHeight=40
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
        Generator.addCode(`${digitalTubeInitO}.setBrightness(${brightness});`);
    }

    //% block="四位数码管显示字符串[STRING]" blockType="command"
    //% STRING.shadow="string"   STRING.defl="1234"
    export function digitalTubeShowStr(parameter: any, block: any) {
        let string = parameter.STRING.code;
        Generator.addCode(`${digitalTubeInitO}.displayString(String(${string}));`);
    }

    //% block="四位数码管显示数字[NUM]" blockType="command"
    //% NUM.shadow="number"   NUM.defl="123"
    export function digitalTubeShowNum(parameter: any, block: any) {
        let num = parameter.NUM.code;
        Generator.addCode(`${digitalTubeInitO}.displayString((int)${num});`);
    }

    //% block="四位数码管第[DOT]个小数点[LIGHT]" blockType="command"
    //% DOT.shadow="range"   DOT.params.min=1    DOT.params.max=4    DOT.defl=1
    //% LIGHT.shadow="dropdown" LIGHT.options="DOT"  LIGHT.defl=DOT.true
    export function digitalTubeShowDot(parameter: any, block: any) {
        let dot = parameter.DOT.code;
        let light = parameter.LIGHT.code;
        Generator.addCode(`${digitalTubeInitO}.setDot(${dot}-1, ${light});`);
    }
    
    //% block="四位数码管[CLEAR]" blockType="command"    
    //% CLEAR.shadow="dropdown"   CLEAR.options="CLEAR"     CLEAR.defl=CLEAR.2
    export function digitalTubeClear(parameter: any, block: any) {
        let cle = parameter.CLEAR.code;
        if( cle === '0'){
            Generator.addCode(`${digitalTubeInitO}.displayOn();`);
        }else if( cle === '1'){
            Generator.addCode(`${digitalTubeInitO}.displayOff();`);
        }else if( cle === '2'){
            Generator.addCode(`${digitalTubeInitO}.clear();`);
        }
    }
    
}
