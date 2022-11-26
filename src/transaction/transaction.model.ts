import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
  userId: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ],
  amount: { type: Number, required: true },
  type: { type: String, required: true, enum: ['credit', 'debit', 'transfer'] },
  destinationAcctNumber: { type: String },
});

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: string;
  destinationAcctNumber?: string;
}
