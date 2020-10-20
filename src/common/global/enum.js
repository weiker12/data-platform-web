/**
 * 安心管
 * Copyright 2016 Baidu Inc. All rights reserved.
 *
 * @file 通用枚举数据
 */

import Enum from 'common/Enum';

/**
 * 发布状态
 *
 * @enum
 */
export const PublishStatus = new Enum(
  {alias: 'DRAFT', text: '草稿', value: 0},
  {alias: 'PUBLISHED', text: '发布', value: 1},
);

export const NewsKeyTypes = new Enum(
  {alias: 'TITLE', text: '标题', value: 0},
  {alias: 'ID', text: 'ID', value: 1},
);

/*
 * 日期格式
 *
 * @enum
 */
export const DateFormat = new Enum(
  {alias: 'DAY', text: '日', value: 'YYYY-MM-DD'},
  {alias: 'MONTH', text: '月', value: 'YYYY-MM'},
);

/*
 * 审核状态
 *
 * @enum
 */
export const AuditStatus = new Enum(
  {alias: 'READY', text: '待审核', value: 0},
  {alias: 'SUCCESS', text: '审核通过', value: 1},
  {alias: 'FAIL', text: '审核失败', value: 2},
);

/*
 * 小区审核状态
 *
 * @enum
 */
export const CommunityAuditStatus = new Enum(
  {alias: 'READY', text: '待审核', value: 1},
  {alias: 'SUCCESS', text: '审核通过', value: 2},
  {alias: 'REJECT', text: '审核驳回', value: 3},
  {alias: 'CLOSE', text: '已关闭', value: 4},
);

/*
 * 小区审核-小区来源
 *
 * @enum
 */
export const CommunitySource = new Enum(
  {alias: 'PERSONAL', text: '个人用户', value: 1},
  {alias: 'COMPANY', text: '企业用户', value: 2},
);

/*
 * 中介审核状态
 *
 * @enum
 */
export const CertificateStatus = new Enum(
  {alias: 'WAIT', text: '未认证', value: 1},
  {alias: 'PASS', text: '认证通过', value: 2},
  {alias: 'READY', text: '未认证', value: 3},
  {alias: 'DENY', text: '认证驳回', value: 4},
);

/*
 * 是否
 *
 * @enum
 */
export const BooleanValue = new Enum(
  {alias: 'NO', text: '否', value: 0},
  {alias: 'YES', text: '是', value: 1},
);
/*
 * 上下架状态
 *
 * @enum
 */
export const SellUpStatus = new Enum(
  {alias: 'OFFLINE', text: '已下架', value: 0},
  {alias: 'ONLINE', text: '已上架', value: 2},
);
/*
 * 上下架状态
 *
 * @enum
 */
export const SellStatus = new Enum(
  {alias: 'OFFLINE', text: '已下架', value: 0},
  {alias: 'ONLINE', text: '已上架', value: 2},
);

/* 单间上下架状态
 *
 * @enum
 */
export const RoomSellStatus = new Enum(
  {alias: 'OFFLINE', text: '已下架', value: 0},
  {alias: 'ONLINE', text: '已上架', value: 1},
);

/*
 * 经营模式
 *
 * @enum
 */
export const BusinessModel = new Enum(
  {alias: 'FEDERAL', text: '分散式', value: 1},
  {alias: 'CENTRAL', text: '集中式', value: 2},
  {alias: 'MIXED', text: '混合经营', value: 3},
);

/*
 * 出租模式
 *
 * @enum
 */
export const RentType = new Enum(
  {alias: 'FULL', text: '整租', value: 1},
  {alias: 'UNION', text: '合租', value: 2},
);

/*
 * 信用免押
 *
 * @enum
 */
export const CreditStatus = new Enum(
  {alias: 'OPEN', text: '支持', value: 1},
  {alias: 'CLOSE', text: '不支持', value: 0},
);

// 合同状态
// 0发起签约 1房东确认 2租客确认 3待支付 4租赁中 5备案完成 6到期结束 7无效状态 8退租中
export const ContractStatus = new Enum(
  {alias: '发起签约', text: '发起签约', value: 0},
  {alias: '房东确认', text: '房东确认', value: 1},
  {alias: '租客确认', text: '租客确认', value: 2},
  {alias: '待支付', text: '待支付', value: 3},
  {alias: '租赁中', text: '租赁中', value: 4},
  {alias: '备案完成', text: '备案完成', value: 5},
  {alias: '到期结束', text: '到期结束', value: 6},
  {alias: '无效状态', text: '无效状态', value: 7},
  {alias: '退租中', text: '退租中', value: 8},
  {alias: '双方已确认', text: '双方已确认', value: 9},
);

/*
 * 合同审核状态
 *
 * @enum
 */
export const ContractCertificateStatus = new Enum(
  {text: '待审核', alias: '待备案1', value: 1},
  {text: '待审核', alias: '待备案2', value: 2},
  {text: '审核通过', alias: '备案通过3', value: 3},
  {text: '审核驳回', alias: '备案失败4', value: 4},
  {text: '待审核', alias: '待备案6', value: 6},
  {text: '审核通过', alias: '备案通过8', value: 8},
  {text: '审核驳回', alias: '备案失败9', value: 9},
  {text: '待审核', alias: '待备案11', value: 11},
  {text: '审核通过', alias: '备案通过13', value: 13},
  {text: '审核驳回', alias: '备案失败14', value: 14},
);
/*
 * 合同备案申请状态
 *
 * @enum
 */
export const ContractApplyStatus = new Enum(
  {text: '备案', alias: '备案', value: 1},
  {text: '变更', alias: '变更', value: 2},
  {text: '注销', alias: '注销', value: 3},
);

// 账号冻结与否状态
export const AccountStatus = new Enum(
  {alias: 'NORMAL', text: '启用', value: 0},
  {alias: 'FROZEN', text: '停用', value: 1},
);

/*
 * 企业机构查询
 *
 * @enum
 *
 */
export const AnstitutionType = new Enum(
  {alias: 'REALTY BROKERAGES', text: '房地产经纪公司', value: 1},
  {alias: 'APARTMENT', text: '长/短租公寓', value: 2},
);

/*
 * 企业机构审核状态
 *
 * @enum
 */
export const InstitutionCertificateStatus = new Enum(
  {alias: 'NOT', text: '未认证', value: 1},
  {alias: 'SUCCESS', text: '认证通过', value: 2},
  {alias: 'CERTIFICATEING', text: '待审核', value: 3},
  {alias: 'FAILED', text: '认证驳回', value: 4},
);

export const InstitutionSelectStatus = new Enum(
  {alias: 'PENDDING', text: '待审核', value: 3},
  {alias: 'SUCCESS', text: '认证通过', value: 2},
  {alias: 'FAILED', text: '认证驳回', value: 4},
);

/*
 * 公租房类型：1:公租房,2:人才房,3:廉租房
 *
 * @enum
 */
export const PublicType = new Enum(
  {alias: 'common', text: '公租房', value: 1},
  {alias: 'talents', text: '人才房', value: 2},
  {alias: 'cheaper', text: '廉租房', value: 3},
);
/*
 * 公租房户型：1-9室
 *
 * @enum
 */
export const PublicRoom = new Enum(
  {alias: '1 room', text: '1室', value: 1},
  {alias: '2 room', text: '2室', value: 2},
  {alias: '3 room', text: '3室', value: 3},
  {alias: '4 room', text: '4室', value: 4},
  {alias: '5 room', text: '5室', value: 5},
  {alias: '6 room', text: '6室', value: 6},
  {alias: '7 room', text: '7室', value: 7},
  {alias: '8 room', text: '8室', value: 8},
  {alias: '9 room', text: '9室', value: 9},
);
/*
 * 公租房户型：0-9厅
 *
 * @enum
 */
export const PublicHall = new Enum(
  {alias: '0 hall', text: '0厅', value: 0},
  {alias: '1 hall', text: '1厅', value: 1},
  {alias: '2 hall', text: '2厅', value: 2},
  {alias: '3 hall', text: '3厅', value: 3},
  {alias: '4 hall', text: '4厅', value: 4},
  {alias: '5 hall', text: '5厅', value: 5},
  {alias: '6 hall', text: '6厅', value: 6},
  {alias: '7 hall', text: '7厅', value: 7},
  {alias: '8 hall', text: '8厅', value: 8},
  {alias: '9 hall', text: '9厅', value: 9},
);
// 1:房改房，2:经济适用房（全额集资房），3:商品房，4:自由私有（含农村住宅），5:承租公房，6:临时简易房，7:暂住亲友家,8:其他
/*
 * 产权性质: 1:公租房,2:人才房,3:廉租房
 *
 * @enum
 */
export const PropertyRights = new Enum(
  {alias: 'updated', text: '房改房', value: 1},
  {alias: 'affordable', text: '经济适用房（全额集资房）', value: 2},
  {alias: 'commodity', text: '商品房', value: 3},
  {alias: 'free', text: '自由私有（含农村住宅）', value: 4},
  {alias: 'public', text: '承租公房', value: 5},
  {alias: 'temporary', text: '临时简易房', value: 6},
  {alias: 'lodging', text: '暂住亲友家', value: 7},
  {alias: 'other', text: '其他', value: 8},
);
/*
 * 项目申请状态：1:即将申请,2:申请中,3:结束申请
 *
 * @enum
 */
export const ApplicationStatus = new Enum(
  {alias: 'apply', text: '申请中', value: 1},
  {alias: 'applying', text: '即将申请', value: 2},
  {alias: 'applied', text: '结束申请', value: 3},
);
/*
 * 合同期限：3个月，12个月，24个月，36个月
 *
 * @enum
 */
export const ContractLimit = new Enum(
  {alias: '3Month', text: '3个月', value: 3},
  {alias: '12Month', text: '12个月', value: 12},
  {alias: '24Month', text: '24个月', value: 24},
  {alias: '36Month', text: '36个月', value: 36},
  {alias: 'customed', text: '自定义', value: 99},
);
/*
 * 家庭人口数：1-10
 *
 * @enum
 */
export const FamilyNum = new Enum(
  {alias: 'one', text: '1', value: 1},
  {alias: 'two', text: '2', value: 2},
  {alias: 'three', text: '3', value: 3},
  {alias: 'four', text: '4', value: 4},
  {alias: 'five', text: '5', value: 5},
  {alias: 'six', text: '6', value: 6},
  {alias: 'seven', text: '7', value: 7},
  {alias: 'eight', text: '8', value: 8},
  {alias: 'nine', text: '9', value: 9},
  {alias: 'ten', text: '10', value: 10},
);
/*
 * 装修情况：1:精装,2:普装,3:毛坯
 *
 * @enum
 */
export const Situation = new Enum(
  {alias: 'rough', text: '毛坯', value: 1},
  {alias: 'general', text: '普通装修', value: 2},
  {alias: 'exquisite', text: '精装修', value: 3},
  {alias: 'luxury', text: '豪华装修', value: 4},
  {alias: 'other', text: '其他', value: 5},
);

/*
 * 处理人的权限
 *
 */
export const DealerAuth = new Enum(
  {alias: 'contract', text: 'contract', value: 'CONTRACT_RECORD_CHECK'},
  {alias: 'institution', text: 'institution', value: 'ENT_ORG_CHECK'},
);

/*
 * 房源性质
 *
 * @enum
 */
export const HouseTypes = new Enum(
  {alias: 'ENTERPRISE', text: '房行房源', value: 2},
  {alias: 'PERSONAL', text: '个人房源', value: 3},
  {alias: 'AGENT', text: '中介房源', value: 4},
);

/*
 * 房源渠道
 *
 * @enum
 */
export const HouseChannelLinks = new Enum(
  {alias: 'C', text: '租赁服务平台', value: 1},
  {alias: 'B', text: '企业/机构管理平台', value: 2},
);

/*
 * 栏目分类（type居然是写死的）
 *
 * @enum
 */
export const CategoryList = new Enum(
  {alias: 'SCZX', text: '市场资讯', value: 1},
  {alias: 'ZFBK', text: '租房百科', value: 2},
  {alias: 'ZCYW', text: '政策要闻', value: 3},
  {alias: 'GGGS', text: '公告告示', value: 4},
);

/*
 * 信用规则受众分类
 *
 */
export const CreditMember = new Enum(
  {alias: 'COMPANY', text: '企业机构', value: 1},
  {alias: 'AGENT', text: '经纪人', value: 2},
);

/*
 * 账号状态
 *
 */
export const CompanyStatus = new Enum(
  {alias: 'NORMAL', text: '正常', value: 0},
  {alias: 'BLOCK', text: '黑名单', value: 1},
);

/*
 * 经纪人管理-账户状态
 *
 * @enum
 *
 */
export const AgentAccountStatus = new Enum(
  {alias: 'ENABLED', text: '启用', value: 1},
  {alias: 'DISABLE', text: '停用', value: 2},
  {alias: 'DEPARTURE', text: '离职', value: 3},
  {alias: 'BLACKLIST', text: '黑名单', value: 4},
);
/*
 * 公租房资格申请 流程详情展示状态
 *审核类型
 * @enum
 *
 */
export const ApplyFlowSubTypeStatus = new Enum(
  {alias: '并联审核', text: '并联审核', value: 0},
  {alias: '串联审核', text: '串联审核', value: 1},
);
/*
 * 公租房资格申请 流程详情展示状态
 *审核条件
 * @enum
 *
 */
export const ApplyFlowContion = new Enum(
  {alias: '任意一人', text: '任意一人', value: 0},
  {alias: '全部通过', text: '全部通过', value: 1},
);
/*
 * 公租房资格申请 流程详情 操作日志 操作状态
 *审核条件
 * @enum
 *
 */
export const ApplyFlowOperateStatus = new Enum(
  {alias: '启用流程', text: '启用流程', value: 0},
  {alias: '关闭流程', text: '关闭流程', value: 1},
);
/*
 * 合同查询 备案状态
 *审核条件
 * @enum
 *
 */
export const ContractRecordStatus = new Enum(
  {alias: '已备案', text: '已备案', value: 1},
  {alias: '备案到期', text: '备案到期', value: 2},
  {alias: '备案结束', text: '备案结束', value: 3},
);
