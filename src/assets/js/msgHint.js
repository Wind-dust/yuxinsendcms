import {Message} from 'element-ui';

let errCollect = {
  admin: {
    getUserBank: {
      3001: '参数错误3001',
      3002: '参数错误3002',
      3003: '银行卡号输入错误'
    },
    cmsmenu: {},
    cmsmenuone: {
      3001: '参数错误3001'
    },
    addpermissionsgrouppower: {
      3001: '参数错误3001',
      3003: '权限分组不存在',
      3004: '权限分组不能为空',
      3005: '数据有误',
      3006: '菜单不存在',
      3007: '更改失败'
    },
    editmenu: {
      3001: '参数错误3001',
      3002: '菜单不存在',
      3003: '修改失败'
    },
    midifypasswd: {
      3001: '密码错误',
      3002: '密码必须为6-16个任意字符',
      3003: '原密码不能为空',
      3004: '密码确认有误',
      3005: '修改密码失败'
    },
    editpermissionsapi: {
      3001: '参数错误3001',
      3004: '权限名称不能为空 ',
      3005: '接口不存在',
      3007: '修改失败'
    },
    editpermissionsgroup: {
      3001: '分组名称错误',
      3003: '修改的用户不存在',
      3004: '分组错误',
      3005: '修改失败'
    },
    deladminpermissions: {
      3001: '分组id错误',
      3003: '权限分组不存在',
      3004: '删除用户不存在',
      3005: '管理员id有误',
      3006: '删除的管理员不存在',
      3007: '删除失败'
    },
    login: {
      3001: '账号密码不能为空',
      3002: '用户不存在',
      3003: '密码错误',
      3004: '登录失败'
    },
    openboss: {
      3001: '手机格式有误',
      3002: '账号昵称不能为空',
      3003: '金额必须为数字',
      3004: '扣除金额不能是负数',
      3006: '用户不存在',
      3007: '该用户已经是boss',
      3008: '开通失败',
      3009: 'boss正在申请中'
    },
    getopenbosslist: {
      3001: '手机格式有误'
    },
    addadmin: {
      3001: '账号不能为空',
      3002: '密码必须为6-16个任意字符',
      3003: '只有root账户可以添加超级管理员',
      3004: '该账号已存在',
      3006: '添加失败'
    },
    addpermissionsapi: {
      3001: '参数错误3001',
      3002: '接口url不能为空',
      3003: '请选择接口权操作类型',
      3004: '权限名称不能为空',
      3005: '接口已存在',
      3006: '菜单不存在',
      3007: '添加失败'
    },
    addpermissionsgroup: {
      3001: '分组名称错误',
      3005: '添加失败'
    },
    addadminpermissions: {
      3001: '参数错误3001',
      3003: '权限分组不存在',
      3004: '添加用户不存在',
      3005: '参数错误3005',
      3006: '该成员已存在',
      3007: '添加失败'
    },
    getAdminUsers: {
      5001: '账号已停用'
    },
    getpermissionsapi: {},
    getpermissionsapione: {
      3001: '接口有误'
    },
    getpermissionslist: {
      3001: '参数错误3001'
    },
    getpermissionsgroupadmin: {
      3001: '参数错误3001'
    },
    getgroupinfo: {
      3001: '参数错误3001'
    },
    getadmingroup: {
      3001: '参数错误3001'
    },
    getadmininfo: {
      5001: '账号已停用'
    },
    bindManagerSearchKeyword: {
      3001: '参数错误3001',
      3002: '请输入关键词'
    },
    delManagerSearchKeyword: {
      3001: '参数错误3001',
      3002: '参数错误3002'
    }
  },
  upload: {
    uploadfile: {
      3001: '上传的不是图片',
      3002: '上传图片不能超过2M',
      3003: '上传失败',
      3004: '上传文件不能为空'
    },
    uploadmultifile: {
      3001: '上传的不是图片',
      3002: '上传图片不能超过2M',
      3003: '上传失败',
      3004: '上传文件不能为空'
    }
  },
  administrator: {
    updateBusiness: {
      3001: 'id不正确',
      3002: '服务价格格式错误',
      3003: '价格不能小于0',
    },
    aduitRechargeApplication: {
      3001: 'id错误',
      3002: '状态格式错误',
      3003: '已审核'
    },
    getRechargeApplication: {},
    rechargeApplication: {
      3001: '手机号码格式错误',
      3002: '业务服务不存在',
      3003: '用户不存在',
      3004: '该用户没有该服务，无法充值'
    },
    addBusiness: {
      3001: '标题不能为空',
      3002: '服务价格错误',
      3003: '服务价格不能小于0'
    },
    getBusiness: {
      3001: '页码不能为空',
      3002: '用户不存在'
    },
    getUserEquities: {
      3001: '业务服务错误',
      3002: '用户不存在'
    },
    getUserQualificationRecord: {
      3001: 'id错误',
    },
    auditUserQualification: {
      3001: 'id错误',
      3002: '状态码错误',
      3003: '已审核'
    },
    distributionChannel: {
      3001: 'ID错误',
      3002: '通道id错误',
      3003: '服务id错误',
      3005: '没有开通该服务',
      3004: '已经分配通道',
      3006: '已停止服务',
      3007: '余额不足'
    },
    updateUserChannel: {
      3001: 'id错误',
      3003: '非法的优先级'
    },
    delUserChannel: {
      3001: 'id错误'
    }
  },
  user: {
    getUsers: {},
    seetingUser: {
      3000: '用户不存在',
      3001: '账户状态错误',
      3002: '服务码错误',
      3003: 'udi格式错误'
    },
    seetingUserEquities: {
      3001: '服务id错误',
      3002: '代理价格格式错误',
      3003: 'udi格式错误',
      3004: '代理价格不能低于统一服务价',
      3005: '该服务已添加',
      3006: '子账户服务无法设置'
    }
  },
  provinces: {
    getProvinceCity: {
      3000: '省市区列表为空'
    },
    getArea: {
      3000: '区列表为空',
      3001: '市级id不存在',
      3002: '市级id只能是数字'
    },
    getCity: {
      3000: '市列表为空',
      3001: '省级id不存在',
      3002: '省级id只能是数字'
    }
  }
}

function msgHint(code, url = '') {
  if (!url) throw new Error('url未传入');
  let port = url.split('/');
  let text = '';
  if (errCollect[port[0]] && errCollect[port[0]][port[1]] && errCollect[port[0]][port[1]][code]) {
    text = errCollect[port[0]][port[1]][code]
  } else {
    text = '错误码：' + code
  }
  Message({message: text, type: 'error'});
}

export {
  msgHint
}
