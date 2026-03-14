import mongoose, { mongo } from "mongoose";

const documentSchema = new mongoose.Schema(
    {
        name :{
            type:String,
            required:true,
        },

        type:{
            type:String,
            enum : ["docx","pdf","txt","image","collab"],
            required:true,
        },

        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

        collaborators:[
            {
                user:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"User",
                },
                role:{
                    enum:["viewer","editor","owner"],
                    default:"viewer",
                }
            }
        ],
        
        fileUerl:{
            type:String,
        },

        fileSize:{
            type:Number,
        },

        storageProvider:{
            type:String,
            enum:["local","aws","cloudinary"],
            default:"local",
        },

        folder:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Folder",
        },

        isStarred:{
            type:Boolean,
            default:false,
        },

        isDeleted:{
            type:Boolean,
            default:false,
        },

        lasrOpened:{
            type:Date,
        },
    },
    {
        timestamps:true,
    },
);

export default mongoose.model("Document",documentSchema);