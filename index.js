const OTPAuth = require("./otpauth.esm")
// import * as OTPAuth from "./otpauth.esm"

const TOTP_FROM_EDIT = new OTPAuth.TOTP({
    issuer: "ACME",
    label: "AzureDiamond",
    algorithm: "SHA512",
    digits: 6,
    period: 60,
    secret: "V6YZWJLHVDVV3VRYBOUBDCZRQD4CM2YT3TMEKQ33XYMJO4JS3ICT4ZG3"
})

const TOTP_FROM_URI = OTPAuth.URI.parse('otpauth://totp/wanghe06000@KAYAKWISE.COM:wanghe06000_OTP?digits=6&secret=V6YZWJLHVDVV3VRYBOUBDCZRQD4CM2YT3TMEKQ33XYMJO4JS3ICT4ZG3&period=60&algorithm=SHA512&issuer=wanghe06000%40KAYAKWISE.COM')

function ShowList() {
    let token = TOTP_FROM_EDIT.generate()
    let token2 = TOTP_FROM_URI.generate()

    return {
        title: token,
        description: `${TOTP_FROM_URI.issuer}--tk2=${token2}`
    }
}

// console.log([
//     ShowList()
// ])

window.exports = {
    otp_list: {
        mode: "list",
        args: {
            enter: (action, callbackSetList) => {
                let list = [
                    ShowList()
                ]
                callbackSetList(list)
            },
            // 子输入框内容变化时被调用 可选 (未设置则无搜索)
            // search: (action, searchWord, callbackSetList) => {
            //     // 获取一些数据
            //     // 执行 callbackSetList 显示出来
            //     callbackSetList([
            //         {
            //             title: '这是标题',
            //             description: '这是描述',
            //             icon: '', // 图标
            //             url: 'https://yuanliao.info'
            //         }
            //     ])
            // },
            // 用户选择列表中某个条目时被调用
            select: (action, itemData, callbackSetList) => {
                window.utools.hideMainWindow()
                const code = itemData.title
                utools.copyText(code)
                window.utools.outPlugin()
            }
            // placeholder: "搜索"
        }
    }
}