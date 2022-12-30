import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
  userId: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ],
  amount: { type: Number, required: true },
  type: { type: String, required: true, enum: ['credit', 'debit', 'transfer'] },
  destinationAcctNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: string;
  destinationAcctNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}
