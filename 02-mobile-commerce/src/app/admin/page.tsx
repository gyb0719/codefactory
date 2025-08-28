'use client';

import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Calendar,
  Download,
  Filter,
  Eye
} from 'lucide-react';

// 차트 데이터 타입
interface ChartData {
  name: string;
  value: number;
  previous?: number;
}

// 통계 카드 컴포넌트
function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color
}: {
  title: string;
  value: string;
  change: string;
  changeType: 'up' | 'down';
  icon: any;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} bg-opacity-10 rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        <button className="p-1 hover:bg-gray-100 rounded-lg">
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <div className="flex items-center gap-2 mt-2">
          {changeType === 'up' ? (
            <ArrowUp className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {change}
          </span>
          <span className="text-sm text-gray-500">전월 대비</span>
        </div>
      </div>
    </div>
  );
}

// 미니 차트 컴포넌트
function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  return (
    <div className="flex items-end gap-1 h-12">
      {data.map((value, index) => {
        const height = range === 0 ? 50 : ((value - min) / range) * 100;
        return (
          <div
            key={index}
            className={`flex-1 ${color} rounded-t opacity-70 hover:opacity-100 transition-opacity`}
            style={{ height: `${height}%` }}
          />
        );
      })}
    </div>
  );
}

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState('7일');
  const [realtimeOrders, setRealtimeOrders] = useState(12);

  // 실시간 주문 수 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeOrders(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 통계 데이터
  const stats = [
    {
      title: '총 매출',
      value: '₩32,458,000',
      change: '+28.4%',
      changeType: 'up' as const,
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: '주문 수',
      value: '1,248',
      change: '+12.3%',
      changeType: 'up' as const,
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      title: '고객 수',
      value: '8,524',
      change: '+18.7%',
      changeType: 'up' as const,
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: '상품 수',
      value: '152',
      change: '-2.4%',
      changeType: 'down' as const,
      icon: Package,
      color: 'bg-orange-500'
    }
  ];

  // 최근 주문 데이터
  const recentOrders = [
    { id: '#12345', customer: '김철수', amount: '₩45,800', status: '배송중', time: '5분 전' },
    { id: '#12344', customer: '이영희', amount: '₩23,400', status: '준비중', time: '12분 전' },
    { id: '#12343', customer: '박민수', amount: '₩87,600', status: '완료', time: '25분 전' },
    { id: '#12342', customer: '최지원', amount: '₩15,900', status: '취소', time: '1시간 전' },
    { id: '#12341', customer: '정다은', amount: '₩56,700', status: '배송중', time: '2시간 전' }
  ];

  // 인기 상품 데이터
  const topProducts = [
    { name: '신선한 유기농 사과', sales: 234, revenue: '₩2,340,000', growth: '+15%' },
    { name: '프리미엄 한우 등심', sales: 156, revenue: '₩4,680,000', growth: '+23%' },
    { name: '무농약 토마토', sales: 189, revenue: '₩945,000', growth: '+8%' },
    { name: '수제 요거트', sales: 423, revenue: '₩1,692,000', growth: '+42%' },
    { name: '유기농 계란', sales: 567, revenue: '₩2,268,000', growth: '+18%' }
  ];

  // 시간대별 매출 데이터
  const hourlyRevenue = [12, 15, 18, 24, 32, 28, 35, 42, 38, 45, 52, 48, 43, 39, 36, 41, 47, 55, 62, 58, 51, 45, 38, 28];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
          <p className="text-sm text-gray-600 mt-1">실시간 매장 현황을 확인하세요</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium">
            <Calendar className="w-4 h-4 text-gray-500" />
            {dateRange}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium">
            <Filter className="w-4 h-4 text-gray-500" />
            필터
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:shadow-md text-sm font-medium">
            <Download className="w-4 h-4" />
            보고서
          </button>
        </div>
      </div>

      {/* Real-time Alert */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="font-medium">실시간 주문 현황</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">{realtimeOrders}개</span>
            <span className="text-sm opacity-90">처리 대기 중</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">시간대별 매출</h2>
              <p className="text-sm text-gray-600 mt-1">오늘 00:00 - 23:59</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Eye className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">₩8,524,300</span>
              <span className="text-sm font-medium text-green-500">+15.3% vs 어제</span>
            </div>
            <MiniChart data={hourlyRevenue} color="bg-gradient-to-t from-orange-500 to-pink-500" />
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:59</span>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">카테고리별 매출</h2>
          <div className="space-y-4">
            {[
              { name: '신선식품', value: 45, color: 'bg-green-500' },
              { name: '가공식품', value: 25, color: 'bg-blue-500' },
              { name: '생활용품', value: 15, color: 'bg-purple-500' },
              { name: '음료/주류', value: 10, color: 'bg-orange-500' },
              { name: '간식', value: 5, color: 'bg-pink-500' }
            ].map((category, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">{category.name}</span>
                  <span className="text-sm font-medium text-gray-900">{category.value}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`${category.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${category.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">최근 주문</h2>
            <button className="text-sm text-orange-500 hover:text-orange-600 font-medium">
              전체 보기
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.customer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{order.amount}</p>
                  <span className={`inline-flex px-2 py-0.5 text-xs rounded-full font-medium ${
                    order.status === '완료' ? 'bg-green-100 text-green-700' :
                    order.status === '배송중' ? 'bg-blue-100 text-blue-700' :
                    order.status === '준비중' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">인기 상품</h2>
            <button className="text-sm text-orange-500 hover:text-orange-600 font-medium">
              전체 보기
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-pink-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-orange-500">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales}개 판매</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{product.revenue}</p>
                  <p className="text-xs text-green-500 font-medium">{product.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}