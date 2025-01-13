import mongoose from 'mongoose';
//black list krne ka schema banao

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:86400
    }
});

const blacklistToken = mongoose.model("BlacklistToken",blacklistTokenSchema);

export default blacklistToken;