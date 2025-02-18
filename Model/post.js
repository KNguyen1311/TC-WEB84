import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
             type: mongoose.Schema.Types.ObjectId,
             ref: 'User',
             required: true },
    content: {
             type: String,
             required: true },
    createdAt: {
             type: Date,
            default: Date.now },
    updatedAt: {
         type: Date,
        default: Date.now
     }
});

const PostModel = mongoose.model('Post', postSchema);

export default PostModel;