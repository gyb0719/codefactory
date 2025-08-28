'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle,
  Phone,
  MessageCircle
} from 'lucide-react';

interface DeliveryStatus {
  id: string;
  status: 'ordered' | 'preparing' | 'picked_up' | 'in_transit' | 'delivered';
  timestamp: Date;
  location?: string;
  message: string;
}

interface DeliveryTrackerProps {
  orderId: string;
}

const DeliveryTracker = ({ orderId }: DeliveryTrackerProps) => {
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus[]>([]);
  const [currentStatus, setCurrentStatus] = useState<DeliveryStatus['status']>('ordered');
  const [estimatedTime, setEstimatedTime] = useState(25);
  const [driverInfo] = useState({
    name: '김배달',
    phone: '010-1234-5678',
    rating: 4.9,
    vehicle: '오토바이'
  });

  // 실시간 배송 상태 시뮬레이션
  useEffect(() => {
    const initialStatus: DeliveryStatus[] = [
      {
        id: '1',
        status: 'ordered',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        message: '주문이 접수되었습니다'
      },
      {
        id: '2',
        status: 'preparing',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        location: '퀵마트 강남점',
        message: '상품을 준비하고 있습니다'
      },
      {
        id: '3',
        status: 'picked_up',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        location: '퀵마트 강남점',
        message: '상품이 픽업되었습니다'
      }
    ];

    setDeliveryStatus(initialStatus);
    setCurrentStatus('picked_up');

    // 실시간 업데이트 시뮬레이션
    const interval = setInterval(() => {
      setEstimatedTime(prev => Math.max(0, prev - 1));
      
      // 정기적으로 배송 상태 업데이트 (30초마다)
      if (prev % 30 === 0 && prev > 0) {
        const now = new Date();
        setDeliveryStatus(prev => {
          if (prev.length < 5) {
            const newStatus: DeliveryStatus = {
              id: (prev.length + 1).toString(),
              status: prev.length === 3 ? 'in_transit' : 'delivered',
              timestamp: now,
              location: prev.length === 3 ? '배달 중' : '고객님 주소지',
              message: prev.length === 3 ? '배달원이 고객님께 향하고 있습니다' : '배송이 완료되었습니다'
            };
            setCurrentStatus(newStatus.status);
            return [...prev, newStatus];
          }
          return prev;
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: DeliveryStatus['status']) => {
    switch (status) {
      case 'ordered':
        return <Package className="w-5 h-5" />;
      case 'preparing':
        return <Clock className="w-5 h-5" />;
      case 'picked_up':
        return <Truck className="w-5 h-5" />;
      case 'in_transit':
        return <MapPin className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: DeliveryStatus['status'], isCurrent: boolean) => {
    if (isCurrent) return 'bg-orange-500 text-white';
    
    const completedStatuses = deliveryStatus.map(s => s.status);
    const isCompleted = completedStatuses.includes(status);
    
    return isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">배송 추적</h3>
        <span className="text-sm text-gray-600">주문번호: {orderId}</span>
      </div>

      {/* 예상 도착 시간 */}
      <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">예상 도착 시간</p>
            <p className="text-2xl font-bold text-orange-600">
              {estimatedTime}분 후
            </p>
          </div>
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <Truck className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* 배송 상태 타임라인 */}
      <div className="space-y-4 mb-6">
        {deliveryStatus.map((status, index) => (
          <motion.div
            key={status.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4"
          >
            {/* 상태 아이콘 */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              getStatusColor(status.status, status.status === currentStatus)
            }`}>
              {getStatusIcon(status.status)}
            </div>

            {/* 상태 정보 */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-900">{status.message}</p>
                <span className="text-sm text-gray-500">
                  {formatTime(status.timestamp)}
                </span>
              </div>
              {status.location && (
                <p className="text-sm text-gray-600 mt-1">{status.location}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 배달원 정보 */}
      {currentStatus === 'picked_up' || currentStatus === 'in_transit' ? (
        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-900 mb-3">배달원 정보</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                김
              </div>
              <div>
                <p className="font-semibold">{driverInfo.name}</p>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <span>⭐ {driverInfo.rating}</span>
                  <span>•</span>
                  <span>{driverInfo.vehicle}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* 실시간 지도 (시뮬레이션) */}
      {currentStatus === 'in_transit' && (
        <div className="border-t pt-4 mt-4">
          <h4 className="font-semibold text-gray-900 mb-3">실시간 위치</h4>
          <div className="h-32 bg-gray-100 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">배달원이 이동 중입니다</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryTracker;