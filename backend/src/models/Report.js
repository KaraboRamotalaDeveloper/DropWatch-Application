const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    name:{
        type:String,
        enum:["BURST","LEAKAGE","WATER-SHEDDING"],
        defaut:"WATER-SHEDDING",
    },
    description:{
        tyrp:String,
        required: true,
    },
    photoUrl:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    status:{
        type:String,
        enum:["REPORTED","ASSIGNED","IN_PROGRESS","FIXED"],
        default:"REPORTED",
    },
    reportedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId;
        ref: "User",
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    upVotesCount:{
        type:Number,
        default: 0,
    },
    priority:{
        type:String,
        enum:["LOW","MEDIUM","HIGH","CRTICAL"],
        default:"MEDIUM",
    }
},{timestamps:true});

const Report = mongoose.model("Report", reportSchema);

module.exprts = Report;
