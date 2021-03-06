
const rp = require("request-promise")
const crypto = require('crypto');
const md5 = require('md5');
const config = require('../config')
const { appid, secret } = config.wx
module.exports = {
  login: async function (js_code, fullUserInfo) {
    let res = await rp({
      uri: 'https://api.weixin.qq.com/sns/jscode2session',
      qs: {
        appid,
        secret,
        js_code,
        grant_type: "authorization_code"
      }
    })
    let session = JSON.parse(res)
    if (!session.openid) {
      return null
    }

    // 验证用户信息完整性
    const sha1 = crypto.createHash('sha1').update(fullUserInfo.rawData.toString() + session.session_key).digest('hex');
    if (fullUserInfo.signature !== sha1) {
      return null;
    }

    // 解析用户数据
    const wechatUserInfo = await this.decryptUserInfoData(session.session_key, fullUserInfo.encryptedData, fullUserInfo.iv);
    if (!wechatUserInfo) {
      return null;
    }
    return wechatUserInfo;
  },

   /**
   * 解析微信登录用户数据
   * @param sessionKey
   * @param encryptedData
   * @param iv
   * @returns {Promise.<string>}
   */
  async decryptUserInfoData(sessionKey, encryptedData, iv) {
    let decoded = '';
    try {
      const _sessionKey = Buffer.from(sessionKey, 'base64');
      encryptedData = Buffer.from(encryptedData, 'base64');
      iv = Buffer.from(iv, 'base64');
      // 解密
      const decipher = crypto.createDecipheriv('aes-128-cbc', _sessionKey, iv);
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);
      decoded = decipher.update(encryptedData, 'binary', 'utf8');
      decoded += decipher.final('utf8');
      const userInfo = JSON.parse(decoded);
      if (userInfo.watermark.appid !== config.wx.appid) {
        return null;
      }

      return userInfo;
    } catch (err) {
      return null;
    }
  }
}