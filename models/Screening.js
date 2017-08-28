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
  screeningdate: {
    type: Date,
    default: Date.now
  },
  // 性别
  sex: Number,
  // 出生年份
  birth: Number,
  // 体重
  weight: Number,
  // 身高
  height: Number,
  // 年龄在18至80岁的男／女患者
  inclusion_1: Boolean,
  // 欲行择期手术切除左侧结肠 (降结肠、乙状结肠) 或直肠上段 (距离肛缘15cm以上)  良性或恶性病变的患者
  inclusion_2: Boolean,
  // 患者具有参加本试验研究的认知能力，并能理解他/她收到的关于本研究的资料
  inclusion_3: Boolean,
  // 签署知情同意书
  inclusion_4: Boolean,
  // 当前病情需要紧急救护
  exclusion_1: Boolean,
  // 当前外科情况为肠梗阻或肠穿孔，局部或全身感染、腹膜炎、小肠局部缺血或者严重癌转移
  exclusion_2: Boolean,
  // 肛管狭窄或存在其他可致肛管梗阻的情况
  exclusion_3: Boolean,
  // 既往有较大腹部手术病史，既往腹部或盆腔的放射治疗
  exclusion_4: Boolean,
  // ASA III - VI 
  exclusion_5: Boolean,
  // 白蛋白低于35 g/l
  exclusion_6: Boolean,
  // 炎性肠病(溃疡性结肠炎或克罗恩病)
  exclusion_7: Boolean,
  // 病情需要两处或以上肠吻合
  exclusion_8: Boolean,
  // 术前一个月内使用过皮质激素、免疫抑制剂
  exclusion_9: Boolean,
  // 全身麻醉禁忌症
  exclusion_10: Boolean,
  // 术前或术中发现肠管直径异常或肠壁厚度异常
  exclusion_11: Boolean,
  // 因认知能力所限，不能理解与试验研究相关的资料，不能了解试验研究的目的和设计，或患者不同意参加本试验
  exclusion_12: Boolean,
  // BMI > 35
  exclusion_13: Boolean,
  // 术前六个月内发生过心肌梗死或其他严重心脏疾病
  exclusion_14: Boolean,
  // 严重凝血方面疾病
  exclusion_15: Boolean,
  // 其他外科医生认为不适宜参加本试验研究的情况 
  exclusion_16: Boolean,
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
  // 神清
  vitalsign_1: Boolean,
  // 心脏杂音
  vitalsign_2: Boolean,
  // 呼吸音清晰
  vitalsign_3: Boolean,
  // 腹部检查
  vitalsign_4: Number,
  // 脉搏 (次/分)
  vitalsign_5: Number,
  // 肿瘤可触及
  vitalsign_6: Boolean,
  // 血压-高压 (mmHg)
  vitalsign_7_high: Number,
  // 血压-低压 (mmHg)
  vitalsign_7_low: Number,
  // 肝脏可触及
  vitalsign_8: Boolean,
  // 其他相关情况
  vitalsign_9: String,
  // 红细胞 (RBC)
  lab_1: Number,
  // 红细胞 (RBC)临床评估
  lab_2: Number,
  // 白细胞 (WBC)
  lab_3: Number,
  // 白细胞 (WBC)临床评估
  lab_4: Number,
  // 血红蛋白 (Hb)
  lab_5: Number,
  // 血红蛋白 (Hb)临床评估
  lab_6: Number,
  // 中性粒细胞绝对计数 (ANC)
  lab_7: Number,
  // 中性粒细胞绝对计数 (ANC)临床评估
  lab_8: Number,
  // 血小板 (PLT)
  lab_9: Number,
  // 血小板 (PLT)临床评估
  lab_10: Number,
  // 单核细胞百分比
  lab_11: Number,
  // 单核细胞百分比临床评估
  lab_12: Number,
  // 淋巴细胞百分比
  lab_13: Number,
  // 淋巴细胞百分比临床评估
  lab_14: Number,
  // 丙氨酸氨基转移酶 (ALT)
  lab_15: Number,
  // 丙氨酸氨基转移酶 (ALT)临床评估
  lab_16: Number,
  // 天门冬氨酸氨基转移酶 (AST)
  lab_17: Number,
  // 天门冬氨酸氨基转移酶 (AST)临床评估
  lab_18: Number,
  // 白蛋白 (ALB)
  lab_19: Number,
  // 白蛋白 (ALB)临床评估
  lab_20: Number,
  // 血尿素氮 (BUN)
  lab_21: Number,
  // 血尿素氮 (BUN)临床评估
  lab_22: Number,
  // 肌酐 (Cr)
  lab_23: Number,
  // 肌酐 (Cr)临床评估
  lab_24: Number,
  // 血糖 (Glu)
  lab_25: Number,
  // 血糖 (Glu)临床评估
  lab_26: Number,
  // 凝血酶原时间 (PT)
  lab_27: Number,
  // 凝血酶原时间 (PT)临床评估
  lab_28: Number,
  // 活化部分凝血活酶时间 (APTT)
  lab_29: Number,
  // 活化部分凝血活酶时间 (APTT)临床评估
  lab_30: Number,
  // 凝血酶时间 (TT)
  lab_31: Number,
  // 凝血酶时间 (TT)临床评估
  lab_32: Number,
  // 纤维蛋白原 (FIB)
  lab_33: Number,
  // 纤维蛋白原 (FIB)临床评估
  lab_34: Number,
  // 心电图
  assistant_1: Number,
  // 心电图(异常，有临床意义),请注明
  assistant_2: String,
  // 腹部B超
  assistant_3: Number,
  // 腹部B超(异常，有临床意义),请注明
  assistant_4: String,
  // 胸部CT/胸部X线
  assistant_5: Number,
  // 胸部CT/胸部X线(异常，有临床意义),请注明
  assistant_6: String,
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
