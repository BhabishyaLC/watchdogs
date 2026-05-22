import mongoose, { Mongoose } from "mongoose";

const reportSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
    },

    location: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
        
      },
    ],

    like:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'users_auth'
    }],
    
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users_auth",
      required:true
     
    },

    status: {
      type: String,
      enum: ["pending", "investigating", "resolved", "rejected"],
      default: "pending",
    },

    
  },
  {
    timestamps: true,
  },
);

const Report = mongoose.model("report_incident", reportSchema);

export default Report;
