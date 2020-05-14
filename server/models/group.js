const { mongoose } = require('../config/db')
const Schema = mongoose.Schema
const schema = new Schema({
  id: String, //群id
  adminIdList:Array,
  avatar:String,
  ownerId:String, //群主id
  topic:String,
  memberIdList:{ type: Array },
  robotId:String, //机器人id
  roomJoinReply:{type:String,default:'你好，欢迎加入!'},
  autojoin: { type: Boolean, default: false },
  joinCode:String,//群代号
  maxFoul:{ type: Number, default: 3 }, //成员违规最大限度
  control: { type: Boolean, default: false }, //是否受控制
})
const Group = mongoose.model('group', schema, 'group')
module.exports = {
  Group,
  Dao:{
    myGroups:async(id)=>{
      try { 
        const result = await Group.find({robotId:id})
        return result
      } catch (err) { throw err }
    },
    update:async(id,params)=>{
      try {
        const result = await Group.findByIdAndUpdate(id, params, {
          new: true
        }).exec();
        return result
      } catch (err) { throw err }
    },
  }
}