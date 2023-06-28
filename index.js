import { URI } from "otpauth"
// import { TOTP, URI } from "otpauth"

// const TOTP_FROM_EDIT = new TOTP({
//     issuer: "ACME",
//     label: "AzureDiamond",
//     algorithm: "SHA512",
//     digits: 6,
//     period: 60,
//     secret: "V6YZWJLHVDVV3VRYBOUBDCZRQD4CM2YT3TMEKQ33XYMJO4JS3ICT4ZG3", // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
// })
// console.log(URI.stringify(TOTP_FROM_EDIT))

function ShowList() {
    const TOTP_FROM_URI = URI.parse('otpauth://totp/wanghe06000@KAYAKWISE.COM:wanghe06000_OTP?digits=6&secret=V6YZWJLHVDVV3VRYBOUBDCZRQD4CM2YT3TMEKQ33XYMJO4JS3ICT4ZG3&period=60&algorithm=SHA512&issuer=wanghe06000%40KAYAKWISE.COM')
    const token = TOTP_FROM_URI.generate()

    return {
        title: TOTP_FROM_URI.issuer,
        description: token,
        icon: 'logo.png'
    }
}

window.exports = {
    otp_list: {
        mode: "list",
        args: {
            enter: (action, callbackSetList) => {
                callbackSetList([
                    ShowList()
                ])
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
            // select: (action, itemData, callbackSetList) => {
            //     window.utools.hideMainWindow()
            //     const url = itemData.url
            //     require('electron').shell.openExternal(url)
            //     window.utools.outPlugin()
            // },
            // placeholder: "搜索"
        }
    }
}