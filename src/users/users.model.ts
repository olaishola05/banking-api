import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, index: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: Number, required: true },
  phone_number: { type: Number, required: true, unique: true },
});

export interface User {
  id: string;
  name: string;
  email: string;
  password: number;
  phone_number: number;
}
