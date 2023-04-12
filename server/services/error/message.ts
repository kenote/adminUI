// 错误信息
export default {
  ERROR_STATUS_NULL: 'Request Success!',

  ERROR_AUTH_FLAG_ACCESS: '没有访问该页面的权限',
  ERROR_AUTH_FLAG_OPERATE: '没有操作此项的权限',
  ERROR_BYLOND_LEVEL_OPERATE: '无法对比您等级高或平级的用户或组进行操作',
  ERROR_VALID_IDMARK_NOTEXIST: '缺少ID标识',
  ERROR_AUTH_OPERATE_GROUP_NULL: '要操作的用户组不存在',
  ERROR_NOT_FOUND_CHANNEL: '没找到 channel 配置',
  ERROR_NOT_FOUND_API: '没找到 api 接口',
  ERROR_NOT_FOUND_ACCESSKEY: '没找到 %s 的密钥',
  ERROR_ONLY_ADVANCED_ADMIN: '只有高级管理员才能操作',
  ERROR_AUTH_OPERATE_USER_NULL: '要操作的用户不存在',
  ERROR_VALID_IDMARK_NULL: '要%s的%s不存在',
  ERROR_DATA_DOESNT_BELONG_YOU: '不能操作不属于您的数据',
  ERROR_CUSTOMIZE_DATA: '\%s',
  ERROR_VALID_SIGNATURE_FAIL: 'MD5验签失败',
  ERROR_MISSING_CONFIG_PARAMETER: '缺少配置参数 %s',
  ERROR_NOT_REMOVE_CREATOR: '无法移除创建者',
  ERROR_REPEAT_ADDTO: '请不要重复添加%s',
  ERROR_NOTIN_WHITELIST: '服务器拒绝了访问，您的IP 不在白名单中',

  ERROR_UPLOAD_FILE_MIMETYPE: '上传文件类型不许可. [%s]',
  ERROR_UPLOAD_FILESIZE_LARGEMAX: '上传文件超过最大值 %s.',
  ERROR_UPLOAD_NOT_FILE: '请选择上传文件!',
  ERROR_UPLOAD_TYPE_FLAG: '您没有上传%s的权限',
  ERROR_FILENAME_EXISTS: '%s文件/目录已存在',
  ERROR_FILENAME_NOTEXISTS: '%s文件/目录不存在',

  ERROR_LOGINVALID_FAIL: '用户名密码错误',
  ERROR_FINDUSER_NOTEXIST: '用户不存在',

  ERROR_VALID_USERNAME_REQUIRED: '用户名不能为空',
  ERROR_VALID_USERNAME_FORMAT: '用户名格式错误',
  ERROR_VALID_USERNAME_UNIQUE: '用户名已占用',
  ERROR_VALID_PASSWORD_REQUIRED: '密码不能为空',
  ERROR_VALID_PASSWORD_FORMAT: '密码格式错误',
  ERROR_VALID_EMAIL_REQUIRED: '电子邮箱不能为空',
  ERROR_VALID_EMAIL_FORMAT: '电子邮箱格式错误',
  ERROR_VALID_EMAIL_UNIQUE: '电子邮箱已占用',
  ERROR_VALID_MOBILE_REQUIRED: '手机号不能为空',
  ERROR_VALID_MOBILE_FORMAT: '手机号格式错误',
  ERROR_VALID_MOBILE_UNIQUE: '手机号已占用',
  ERROR_VALID_CHOOSEONE_MORE: '%s 必须设置一个',
  ERROR_VALID_TICKET_REQUIRED: '%s不能为空',
  ERROR_VALID_TICKET_NULL: '该%s不存在',
  ERROR_VALID_TICKET_TYPE: '该%s不能应用于%s',
  ERROR_VALID_TICKET_USED: '该%s已使用',
  ERROR_VALID_TICKET_EXPIRED: '该%s已过期',

  ERROR_VALID_GROUP_REQUIRED: '用户组不能为空',
  ERROR_VALID_GROUP_NOTEXIST: '用户组不存在',
  ERROR_VALID_DATE_REQUIRED: '%s不能为空',
  ERROR_VALID_DATE_FORMAT: '%s格式错误，非日期格式',
  ERROR_VALID_NAME_REQUIRED: '%s不能为空',
  ERROR_VALID_NAME_FORMAT: '%s格式错误，不是正确的%s的格式',

  ERROR_VERIFY_EMAIL_TIMEOUT: '邮箱验证超时',
  ERROR_VERIFY_EMAIL_FAILED: '邮箱验证失败',
  ERROR_VERIFY_MOBILE_TIMEOUT: '手机号验证超时',
  ERROR_VERIFY_MOBILE_FAILED: '手机号验证失败',
  ERROR_VERIFY_TOKEN_VERIFIED: '该密钥已验证',
  ERROR_SEND_MAILPHONE_STEP: '请不要连续发送',
  ERROR_VERIFY_CODE_REQUIRED: '验证码不能为空',
  ERROR_VERIFY_CODE_TIMEOUT: '验证码超时',
  ERROR_VERIFY_CODE_FAILED: '验证码错误',
  ERROR_VERIFY_ID_REQUIRED: '缺少身份验证',
  ERROR_VERIFY_ID_TIMEOUT: '身份验证超时',
  ERROR_VERIFY_ID_FAILED: '身份验证错误'
}
