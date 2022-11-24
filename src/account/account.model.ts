import * as mongoose from 'mongoose';

export const accountSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, index: true },
  balance: { type: Number },
  userId: { type: String, required: true },
  accountNumber: { type: Number, unique: true, required: true },
});

export interface Account {
  id: string;
  name: string;
  balance: number;
  userId: string;
  accountNumber: number;
}
