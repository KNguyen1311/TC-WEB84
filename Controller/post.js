import UserModel from "../Model/user.js";
import PostModel from "../Model/post.js";

const postController = {

    updatePost: async (req, res) => {
        const { apiKey } = req.query;
        const { content } = req.body;
        const { id } = req.params;
    
        if (!apiKey) {
          return res.status(400).json({ message: 'Thiếu apiKey' });
        }
    
        try {
          const user = await UserModel.findOne({ apiKey });
          if (!user) {
            return res.status(401).json({ message: 'apiKey không hợp lệ' });
          }
    
          const post = await PostModel.findById(id);
          if (!post) {
            return res.status(404).json({ message: 'Không tìm thấy bài post' });
          }
    
          if (!content) {
            return res.status(400).json({ message: 'Thiếu nội dung bài post' });
          }
    
          post.content = content;
          post.updatedAt = new Date();
          await post.save();
    
          res.status(200).json({ message: 'Cập nhật bài post thành công', post });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Đã có lỗi xảy ra' });
        }
      },

    createPost: async (req, res) => {
        const { apiKey } = req.query;
        const { content } = req.body;

        if (!apiKey) {
            return res.status(400).json({ message: 'Thiếu apiKey' });
        }

        try {
            const user = await UserModel.findOne({ apiKey });
            if (!user) {
                return res.status(401).json({ message: 'apiKey không hợp lệ' });
            }

            if (!content) {
                return res.status(400).json({ message: 'Thiếu nội dung bài post' });
            }

            const post = new PostModel({
                userId: user._id,  
                content,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            await post.save();

            res.status(201).json({ message: 'Tạo bài post thành công', post });
        } catch (error) {
            res.status(500).json({ message: 'Đã xảy ra lỗi', error });
        }
    }

    

};

export default postController;