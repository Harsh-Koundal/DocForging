import mongoose, { mongo } from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        document: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Document",
        },

        action: {
            type: String,
            enum: [
                "edit",
                "create",
                "upload",
                "delete",
                "share",
                "join",
                "convert",
                "ai_generate"
            ]
        },

        metadata: {
            type: Object
        }
    },
    {
        timestamps:true,
    },
);

export default mongoose.model("Activity",activitySchema);