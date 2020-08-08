const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const screeningSchema = new Schema({
  case: {
    type: String,
    ref: 'Case',
    required: 'You must supply a caseid'
  },
  /**
   * SCREENING
   */
  // 性别
  sex: Number,
  // 出生年份
  birth: {
    type: Date
  },
  // 体重
  weight: Number,
  // 身高
  height: Number,
  // 年龄在18以上的男／女患者
  inclusion_1: Boolean,
  // 欲行择期手术切除左侧结肠 (降结肠、乙状结肠) 或直肠上段 (距离肛缘15cm以上)  良性或恶性病变的患者
  inclusion_2: Boolean,
  // 患者具有参加本试验研究的认知能力，并能理解他/她收到的关于本研究的资料
  inclusion_3: Boolean,
  // 当前病情需要紧急救护
  exclusion_1: {
    type: Boolean,
    default: false
  },
  // 当前外科情况为肠梗阻或肠穿孔，局部或全身感染、腹膜炎、小肠局部缺血或者严重癌转移
  exclusion_2: {
    type: Boolean,
    default: false
  },
  // 肛管狭窄或存在其他可致肛管梗阻的情况
  exclusion_3: {
    type: Boolean,
    default: false
  },
  // 全身麻醉禁忌症
  exclusion_10: {
    type: Boolean,
    default: false
  },
  // 其他外科医生认为不适宜参加本试验研究的情况 
  exclusion_16: {
    type: Boolean,
    default: false
  },
  // 其他外科医生认为不适宜参加本试验研究的情况 说明
  exclusion_17: String,
  // 饮酒
  disease_1: Boolean,
  // 肝硬化
  disease_2: Boolean,
  // 吸烟
  disease_3: Boolean,
  // 阻塞性肺疾患
  disease_4: Boolean,
  // 糖尿病
  disease_5: Boolean,
  // 心脏病
  disease_6: Boolean,
  // 较大腹部手术史
  disease_7: Boolean,
  // 其他疾病
  disease_8: Boolean,
  // 其他疾病(请注明)
  disease_9: String,
  // 抗生素
  conmed_1: Boolean,
  // 抗凝血剂
  conmed_2: Boolean,
  // 止痛药
  conmed_3: Boolean,
  // 激素药物
  conmed_4: Boolean,
  // 其他药物
  conmed_5: Boolean,
  // 内窥镜检查
  method_1: Boolean,
  // CT检查
  method_2: Boolean,
  // 气钡双重造影
  method_3: Boolean,
  // 肛门指诊
  method_4: Boolean,
  // 降结肠
  region_1: Boolean,
  // 乙状结肠
  region_2: Boolean,
  // 直肠上段 (距离肛缘15cm以上)
  region_3: Boolean,
  // 其他位置
  region_4: Boolean,
  // 其他位置，请注明：
  region_5: String,
  // 病理诊断
  dignose_1: String,
  // 入组前临床诊断
  dignose_2: String,
  // 临床分期 (若适用)
  dignose_3: Number,
  // 转移灶
  dignose_4: Boolean,
  // 转移灶部位
  dignose_5: String
});

screeningSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Screening', screeningSchema);
