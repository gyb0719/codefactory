'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Smartphone, 
  X, 
  Check,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onPaymentSuccess: () => void;
}

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  totalAmount, 
  onPaymentSuccess 
}: PaymentModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'kakao' | 'naver'>('card');
  const [paymentStep, setPaymentStep] = useState<'select' | 'processing' | 'success' | 'error'>('select');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const paymentMethods = [
    {
      id: 'card' as const,
      name: '신용/체크카드',
      icon: CreditCard,
      description: '간편하고 안전한 카드 결제',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'kakao' as const,
      name: '카카오페이',
      icon: Smartphone,
      description: '원터치 간편결제',
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      id: 'naver' as const,
      name: '네이버페이',
      icon: Smartphone,
      description: '네이버 간편결제',
      color: 'bg-green-50 border-green-200'
    }
  ];

  const handlePayment = async () => {
    setPaymentStep('processing');

    try {
      // 실제 토스페이먼츠 API 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 성공 확률 90%로 시뮬레이션
      if (Math.random() < 0.9) {
        setPaymentStep('success');
        setTimeout(() => {
          onPaymentSuccess();
          onClose();
        }, 2000);
      } else {
        throw new Error('결제 실패');
      }
    } catch (error) {
      setPaymentStep('error');
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '');
    }
    return v;
  };

  const renderPaymentForm = () => {
    if (selectedMethod === 'card') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카드번호
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                만료일
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                maxLength={5}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVC
              </label>
              <input
                type="text"
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, '').slice(0, 3))}
                maxLength={3}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Smartphone className="w-8 h-8 text-orange-600" />
        </div>
        <p className="text-gray-600">
          {selectedMethod === 'kakao' ? '카카오톡' : '네이버'} 앱으로 이동하여 결제를 진행합니다
        </p>
      </div>
    );
  };

  const renderProcessingStep = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">결제 처리 중...</h3>
      <p className="text-gray-600">잠시만 기다려주세요</p>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">결제 완료!</h3>
      <p className="text-gray-600">주문이 성공적으로 처리되었습니다</p>
    </div>
  );

  const renderErrorStep = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">결제 실패</h3>
      <p className="text-gray-600 mb-6">결제 처리 중 오류가 발생했습니다</p>
      <button
        onClick={() => setPaymentStep('select')}
        className="bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 transition-colors"
      >
        다시 시도
      </button>
    </div>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        {/* 백드롭 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />

        {/* 모달 */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          className="relative w-full max-w-md bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto"
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">결제하기</h2>
            <button
              onClick={onClose}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              disabled={paymentStep === 'processing'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {paymentStep === 'select' && (
            <>
              {/* 주문 요약 */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">총 결제금액</span>
                  <span className="text-xl font-bold text-orange-600">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>

              {/* 결제 방법 선택 */}
              <div className="space-y-3 mb-6">
                <h3 className="font-semibold text-gray-900">결제 방법</h3>
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full p-4 border-2 rounded-2xl transition-all ${
                      selectedMethod === method.id
                        ? 'border-orange-500 bg-orange-50'
                        : method.color
                    } hover:border-orange-300`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <method.icon className="w-6 h-6 text-gray-700" />
                        <div className="text-left">
                          <div className="font-semibold">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>

              {/* 결제 정보 입력 */}
              {renderPaymentForm()}

              {/* 결제 버튼 */}
              <button
                onClick={handlePayment}
                disabled={
                  selectedMethod === 'card' && 
                  (!cardNumber || !expiryDate || !cvc || cardNumber.length < 19)
                }
                className="w-full mt-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
              >
                {formatPrice(totalAmount)} 결제하기
              </button>
            </>
          )}

          {paymentStep === 'processing' && renderProcessingStep()}
          {paymentStep === 'success' && renderSuccessStep()}
          {paymentStep === 'error' && renderErrorStep()}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;