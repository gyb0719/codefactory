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
import { useRealtimeOrder } from '@/hooks/useRealtimeOrders';

interface DeliveryTrackerProps {
  orderId: string;
}

const DeliveryTracker = ({ orderId }: DeliveryTrackerProps) => {
  const { order, tracking, loading, error, currentStatus, estimatedTime } = useRealtimeOrder(orderId);
  const [remainingTime, setRemainingTime] = useState(30);
  const [driverInfo] = useState({
    name: '김배달',
    phone: '010-1234-5678',
    rating: 4.9,
    vehicle: '오토바이'
  });

  // 남은 시간 계산
  useEffect(() => {
    if (estimatedTime) {
      const targetTime = new Date(estimatedTime).getTime();
      const now = Date.now();
      const diff = Math.max(0, Math.floor((targetTime - now) / 1000 / 60));
      setRemainingTime(diff);
      
      const interval = setInterval(() => {
        const now = Date.now();
        const diff = Math.max(0, Math.floor((targetTime - now) / 1000 / 60));
        setRemainingTime(diff);
      }, 30000); // 30초마다 업데이트
      
      return () => clearInterval(interval);
    }
  }, [estimatedTime]);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-20 bg-gray-100 rounded-2xl mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
        <p className="text-red-500">주문 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
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

  const getStatusColor = (status: string, isCurrent: boolean) => {
    if (isCurrent) return 'bg-orange-500 text-white';
    return 'bg-green-500 text-white';
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
        <span className="text-sm text-gray-600">주문번호: {order.order_number}</span>
      </div>

      {/* 예상 도착 시간 */}
      <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">예상 도착 시간</p>
            <p className="text-2xl font-bold text-orange-600">
              {remainingTime}분 후
            </p>
          </div>
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <Truck className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* 배송 상태 타임라인 */}
      <div className="space-y-4 mb-6">
        {tracking.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4"
          >
            {/* 상태 아이콘 */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              getStatusColor(item.status, item.status === currentStatus)
            }`}>
              {getStatusIcon(item.status)}
            </div>

            {/* 상태 정보 */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-900">{item.notes || item.status}</p>
                <span className="text-sm text-gray-500">
                  {formatTime(new Date(item.created_at))}
                </span>
              </div>
              {item.location && (
                <p className="text-sm text-gray-600 mt-1">{JSON.stringify(item.location)}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 배달원 정보 */}
      {(currentStatus === 'out_for_delivery' || currentStatus === 'delivering') ? (
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
      {currentStatus === 'out_for_delivery' && (
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