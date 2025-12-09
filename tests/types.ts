interface PaymentDetails {
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  description?: string;
  metadata?: Record<string, unknown>;
}

interface PaymentMethod {
  type: 'credit_card' | 'bank_transfer' | 'digital_wallet';
  details: CreditCardDetails | BankTransferDetails | DigitalWalletDetails;
}

interface CreditCardDetails {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardholderName: string;
}

interface BankTransferDetails {
  accountNumber: string;
  routingNumber: string;
  accountHolderName: string;
}

interface DigitalWalletDetails {
  walletId: string;
  provider: 'paypal' | 'apple_pay' | 'google_pay';
}

interface PaymentResponse {
  paymentId: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
  error?: {
    code: string;
    message: string;
  };
}

interface RefundDetails {
  paymentId: string;
  amount: number;
  reason?: string;
}

interface RefundResponse {
  refundId: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
  error?: {
    code: string;
    message: string;
  };
}

interface PaymentProcessorConfig {
  apiKey: string;
  environment: 'sandbox' | 'production';
  timeout?: number;
}

type PaymentCallback = (response: PaymentResponse) => void;
type RefundCallback = (response: RefundResponse) => void;