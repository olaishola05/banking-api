import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
  user_id: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ],
  amount: { type: Number, required: true },
  type: { type: String, required: true, enum: ['credit', 'debit', 'transfer'] },
  status: { type: String, required: true },
});

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: string;
  status: string;
}
