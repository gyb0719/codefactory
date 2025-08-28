'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  MessageSquare,
  MoreVertical,
  Eye,
  Printer,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  ShoppingCart
} from 'lucide-react';

// 주문 타입 정의
interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'completed' | 'cancelled';
  orderTime: string;
  deliveryTime?: string;
  deliveryPerson?: string;
  notes?: string;
}

// 주문 상태 스타일 설정
const statusConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock, text: '주문 접수' },
  confirmed: { color: 'bg-blue-100 text-blue-700', icon: CheckCircle, text: '주문 확인' },
  preparing: { color: 'bg-purple-100 text-purple-700', icon: Package, text: '준비중' },
  delivering: { color: 'bg-indigo-100 text-indigo-700', icon: Truck, text: '배송중' },
  completed: { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: '완료' },
  cancelled: { color: 'bg-red-100 text-red-700', icon: XCircle, text: '취소' }
};

// 주문 카드 컴포넌트
function OrderCard({ order, expanded, onToggle }: { order: Order; expanded: boolean; onToggle: () => void }) {
  const config = statusConfig[order.status];
  const StatusIcon = config.icon;

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-900">#{order.id}</span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
              <StatusIcon className="w-3 h-3" />
              {config.text}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-gray-100 rounded-lg">
              <Printer className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-lg">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{order.orderTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <CreditCard className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{order.paymentMethod}</span>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600 font-medium"
          >
            상세보기
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Customer Info */}
      <div className="p-4 border-b border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <User className="w-4 h-4 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">{order.customer.name}</p>
              <p className="text-xs text-gray-500">고객명</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">{order.customer.phone}</p>
              <p className="text-xs text-gray-500">연락처</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900 line-clamp-1">{order.customer.address}</p>
              <p className="text-xs text-gray-500">배송지</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items - Expandable */}
      {expanded && (
        <div className="p-4 border-b border-gray-100">
          <h4 className="text-sm font-medium text-gray-900 mb-3">주문 상품</h4>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.quantity}개</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  ₩{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          
          {order.notes && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-yellow-800 mb-1">배송 요청사항</p>
                  <p className="text-xs text-yellow-700">{order.notes}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer - Total & Actions */}
      <div className="p-4 bg-gray-50 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">총 결제금액</p>
          <p className="text-lg font-bold text-gray-900">₩{order.totalAmount.toLocaleString()}</p>
        </div>
        <div className="flex items-center gap-2">
          {order.status === 'pending' && (
            <>
              <button className="px-3 py-1.5 bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">
                주문 취소
              </button>
              <button className="px-3 py-1.5 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600">
                주문 확인
              </button>
            </>
          )}
          {order.status === 'confirmed' && (
            <button className="px-3 py-1.5 bg-purple-500 text-white text-sm font-medium rounded-lg hover:bg-purple-600">
              준비 시작
            </button>
          )}
          {order.status === 'preparing' && (
            <button className="px-3 py-1.5 bg-indigo-500 text-white text-sm font-medium rounded-lg hover:bg-indigo-600">
              배송 시작
            </button>
          )}
          {order.status === 'delivering' && (
            <button className="px-3 py-1.5 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600">
              배송 완료
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OrdersManagement() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState('today');

  // 샘플 주문 데이터
  const orders: Order[] = [
    {
      id: '12345',
      customer: {
        name: '김철수',
        phone: '010-1234-5678',
        address: '서울시 강남구 테헤란로 123 아파트 101동 1201호'
      },
      items: [
        { name: '신선한 유기농 사과 1kg', quantity: 2, price: 12000 },
        { name: '프리미엄 한우 등심 300g', quantity: 1, price: 45000 }
      ],
      totalAmount: 69000,
      paymentMethod: '카카오페이',
      status: 'delivering',
      orderTime: '오늘 14:32',
      deliveryTime: '15:02 예정',
      deliveryPerson: '박배송',
      notes: '문 앞에 놓아주세요'
    },
    {
      id: '12344',
      customer: {
        name: '이영희',
        phone: '010-2345-6789',
        address: '서울시 서초구 반포대로 45'
      },
      items: [
        { name: '무농약 방울토마토 500g', quantity: 3, price: 8900 },
        { name: '수제 그릭 요거트 450ml', quantity: 2, price: 6500 }
      ],
      totalAmount: 39700,
      paymentMethod: '신용카드',
      status: 'preparing',
      orderTime: '오늘 14:15'
    },
    {
      id: '12343',
      customer: {
        name: '박민수',
        phone: '010-3456-7890',
        address: '서울시 송파구 올림픽로 300'
      },
      items: [
        { name: '유기농 계란 30구', quantity: 1, price: 15000 }
      ],
      totalAmount: 15000,
      paymentMethod: '네이버페이',
      status: 'pending',
      orderTime: '오늘 13:58'
    }
  ];

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  // 상태별 주문 수 계산
  const orderCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    delivering: orders.filter(o => o.status === 'delivering').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">주문 관리</h1>
          <p className="text-sm text-gray-600 mt-1">실시간 주문 처리 및 배송 관리</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium">
            <RefreshCw className="w-4 h-4 text-gray-500" />
            새로고침
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium">
            <Calendar className="w-4 h-4 text-gray-500" />
            오늘
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium">
            <Download className="w-4 h-4 text-gray-500" />
            내보내기
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
        <div className="flex items-center gap-1 overflow-x-auto">
          {Object.entries(orderCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedStatus === status
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {status === 'all' ? '전체' :
               status === 'pending' ? '접수 대기' :
               status === 'confirmed' ? '주문 확인' :
               status === 'preparing' ? '준비중' :
               status === 'delivering' ? '배송중' :
               status === 'completed' ? '완료' :
               '취소'}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                selectedStatus === status
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">오늘 주문</span>
            <ShoppingCart className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">48건</p>
          <p className="text-sm text-green-500 font-medium mt-1">+12% vs 어제</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">평균 처리시간</span>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">28분</p>
          <p className="text-sm text-green-500 font-medium mt-1">-5분 단축</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">배송 완료율</span>
            <CheckCircle className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">96.5%</p>
          <p className="text-sm text-green-500 font-medium mt-1">+2.3%</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">취소율</span>
            <XCircle className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">2.1%</p>
          <p className="text-sm text-red-500 font-medium mt-1">+0.3%</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="주문번호, 고객명, 전화번호로 검색..."
              className="pl-10 pr-4 py-2 w-full bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium">
            <Filter className="w-4 h-4 text-gray-500" />
            필터
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            expanded={expandedOrders.includes(order.id)}
            onToggle={() => toggleOrderExpansion(order.id)}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <button className="px-6 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">
          더 보기
        </button>
      </div>
    </div>
  );
}