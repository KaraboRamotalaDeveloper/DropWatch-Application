const mongoose = require("mongoose");


const reportLogSchema({
    reportId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Report",
        required: true,
        index:true,
    },
    action:{
        type:String,
        enum:["changeStatus", "changeAssignedTo"],
        default:null,
    },
    prevStatus:{
        type:String,
    },
    prevAssignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    newStatus:{
        type:String,
    },
    newAssignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    actionPerfomedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    note:{
        type:String,
    },
},{timestamps:true});

const ReportLog = mongoose.model("ReportLog", reportLogSchema );

module.exports = ReportLog;