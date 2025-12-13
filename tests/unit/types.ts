// types.ts
import { Decimal } from 'decimal.js';

type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CNY';

type CurrencySymbol = 'USD' | '$' | 'EUR' | '€' | 'GBP' | '£' | 'JPY' | '¥' | 'CNY' | '¥';

type PaymentMethod = 'credit_card' | 'bank_transfer' | 'paypal' | 'apple_pay' | 'google_pay';

type TransactionStatus = 'pending' | 'approved' | 'declined' | 'failed';

type TransactionType = 'deposit' | 'withdrawal' | 'transfer';

interface Transaction {
  id: string;
  amount: Decimal;
  currency: CurrencyCode;
  method: PaymentMethod;
  status: TransactionStatus;
  type: TransactionType;
  timestamp: Date;
}

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  balance: Decimal;
}

interface PaymentGateway {
  processTransaction(transaction: Transaction): Promise<Transaction>;
}

interface PaymentProcessor {
  getTransaction(id: string): Promise<Transaction | null>;
  getBalance(): Promise<Decimal>;
}