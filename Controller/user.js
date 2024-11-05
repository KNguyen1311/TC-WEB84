import UserModel from "../Model/user.js"
import crypto from 'crypto'

const userController = {


  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email });

      if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
      }

      const randomString = crypto.randomBytes(8).toString('hex');

      const apiKey = `mern-${user._id}-${email}-${randomString}`;

      user.apiKey = apiKey;
      await user.save();

      res.json({ apiKey });
    } catch (error) {
      res.status(500).json({ message: 'Đã xảy ra lỗi', error });
    }
  },
    getList: async (req, res) => {
      try {
        const users = await UserModel.find();
        res.json(users);
      } catch (error) {
        res.status(500).send(error);
      }
    },
  
    createUser: async (req, res) => {
      try {
        const user = req.body;
        const newUser = new UserModel(user);
        await newUser.save();
        res.json(newUser);
      } catch (error) {
        res.status(500).send(error);
      }
    },
  };
  
  export default userController;