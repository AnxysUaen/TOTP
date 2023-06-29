const OTPAuth = require("./otpauth.esm")

function ShowList(SetList, selectKey) {
  utools.db.promises.allDocs(selectKey ? [selectKey] : null).then(dbData => {
    let list = []
    dbData.forEach(obj => {
      let OTP_FROM_URI = OTPAuth.URI.parse(obj.url)
      list.push({
        title: OTP_FROM_URI.generate(),
        description: `${obj._id}--${OTP_FROM_URI.issuer}`,
        id: obj._id,
        type: 'code'
      })
    })
    if (list.length === 1) {
      list.push(...[
        // { title: '修改标题', type: 'edit', id: list[0].id },
        { title: '删除动态码', type: 'remove', id: list[0].id },
      ])
    } else if (list.length === 0) {
      list.push({
        title: '无数据',
        description: '复制绑定码的URL后打开uTools以添加'
      })
    }
    SetList(list)
  })
}

window.exports = {
  otp_list: {
    mode: "list",
    args: {
      enter: (action, callbackSetList) => {
        ShowList(callbackSetList)
      },
      // 子输入框内容变化时被调用 可选 (未设置则无搜索)
      search: (action, searchWord, callbackSetList) => {
        ShowList(callbackSetList, searchWord)
      },
      // 用户选择列表中某个条目时被调用
      select: (action, itemData, callbackSetList) => {
        utools.hideMainWindow()
        switch (itemData.type) {
          case 'code':
            const code = itemData.title
            utools.copyText(code)
            utools.showNotification('"' + code + '" 已复制')
            utools.outPlugin()
            break;
          case 'edit':
            // const code = itemData.title
            // utools.copyText(code)
            utools.outPlugin()
            break;
          case 'remove':
            utools.db.remove(itemData.id)
            utools.showNotification('删除完成')
            utools.outPlugin()
            break;
          default:
            break;
        }
      },
      placeholder: "输入序号编辑动态口令"
    }
  },
  otp_add: {
    mode: "none",
    args: {
      enter: (action) => {
        utools.hideMainWindow()
        utools.db.promises.allDocs().then(dbData => {
          utools.db.put({
            _id: `${dbData.length ? Number(dbData.sort((a, b) => Number(a._id) - Number(b._id))[0]._id) + 1 : 1}`,
            url: action.payload,
          })
        })
        utools.showNotification('添加完成')
        utools.outPlugin()
      }
    }
  }
}