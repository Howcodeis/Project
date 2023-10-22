import { Message, Notification } from "element-ui"

export const MessageBack = {
  /**
 * 
 * @returns element-ui-Message
 */
  serverErrorBack () {
    return Message({
      type: 'error',
      message: "服务器断开或出现问题",
      duration: 2000,
      showClose: false
    })
  },

  /**
   * @param {string} type 
   * @param {string} message 
   * @returns element-ui-Message
   */
  normalBack (type, message) {
    return Message({
      type: type,
      message: message,
      duration: 2000,
      showClose: false
    })
  },

  /**
   * 
   * @param {string} title 
   * @param {string} message 
   * @param {string} type 
   * @param {number} offset 
   */
  notificationBack (title, message, type, offset) {
    return Notification({
      title: title,
      message: message,
      type: type,
      offset: offset,
      duration: 1500,
      showClose: false
    })
  },
}