import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true, 
    },
    age: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true, 
    },
    role: {
      type: String,
      default: 'user', 
    },
  });

const User = mongoose.model('User', UserSchema);
export default User;
