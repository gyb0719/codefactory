'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Edit2,
  Trash2,
  Eye,
  MoreVertical,
  Package,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Grid,
  List,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// 상품 타입 정의
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  sales: number;
  image: string;
  trend: 'up' | 'down' | 'stable';
  lastModified: string;
}

// 상품 상태 뱃지 컴포넌트
function StatusBadge({ status }: { status: Product['status'] }) {
  const statusConfig = {
    active: { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: '판매중' },
    inactive: { color: 'bg-gray-100 text-gray-700', icon: XCircle, text: '판매중지' },
    out_of_stock: { color: 'bg-red-100 text-red-700', icon: AlertCircle, text: '품절' }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3" />
      {config.text}
    </span>
  );
}

export default function ProductsManagement() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // 샘플 상품 데이터
  const products: Product[] = [
    {
      id: 'P001',
      name: '신선한 유기농 사과 1kg',
      category: '신선식품',
      price: 12000,
      stock: 45,
      status: 'active',
      sales: 234,
      image: '/api/placeholder/100/100',
      trend: 'up',
      lastModified: '2시간 전'
    },
    {
      id: 'P002',
      name: '프리미엄 한우 등심 300g',
      category: '신선식품',
      price: 45000,
      stock: 12,
      status: 'active',
      sales: 156,
      image: '/api/placeholder/100/100',
      trend: 'up',
      lastModified: '3시간 전'
    },
    {
      id: 'P003',
      name: '무농약 방울토마토 500g',
      category: '신선식품',
      price: 8900,
      stock: 0,
      status: 'out_of_stock',
      sales: 189,
      image: '/api/placeholder/100/100',
      trend: 'down',
      lastModified: '1일 전'
    },
    {
      id: 'P004',
      name: '수제 그릭 요거트 450ml',
      category: '가공식품',
      price: 6500,
      stock: 89,
      status: 'active',
      sales: 423,
      image: '/api/placeholder/100/100',
      trend: 'up',
      lastModified: '5시간 전'
    },
    {
      id: 'P005',
      name: '유기농 계란 30구',
      category: '신선식품',
      price: 15000,
      stock: 23,
      status: 'inactive',
      sales: 567,
      image: '/api/placeholder/100/100',
      trend: 'stable',
      lastModified: '2일 전'
    }
  ];

  const categories = ['전체', '신선식품', '가공식품', '생활용품', '음료/주류', '간식'];

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const selectAllProducts = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">상품 관리</h1>
          <p className="text-sm text-gray-600 mt-1">총 {products.length}개의 상품</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium">
            <Upload className="w-4 h-4 text-gray-500" />
            대량 등록
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium">
            <Download className="w-4 h-4 text-gray-500" />
            내보내기
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:shadow-md text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            상품 추가
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="상품명, SKU로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${
                viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <List className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <Grid className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Selected Actions */}
        {selectedProducts.length > 0 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">
              {selectedProducts.length}개 선택됨
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                상태 변경
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg">
                삭제
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Table */}
      {viewMode === 'list' ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === products.length}
                      onChange={selectAllProducts}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상품
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    카테고리
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    가격
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    재고
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    판매량
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    수정일
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleProductSelection(product.id)}
                        className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                          <Package className="w-full h-full p-3 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">SKU: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{product.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">₩{product.price.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${
                          product.stock === 0 ? 'text-red-600' :
                          product.stock < 20 ? 'text-yellow-600' :
                          'text-gray-900'
                        }`}>
                          {product.stock}개
                        </span>
                        {product.stock < 20 && product.stock > 0 && (
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900">{product.sales}</span>
                        {product.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                        {product.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">{product.lastModified}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded-lg">
                          <Eye className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded-lg">
                          <Edit2 className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded-lg">
                          <Trash2 className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">
                전체 <span className="font-medium">152</span>개 중 <span className="font-medium">1-10</span>개 표시
              </p>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50" disabled>
                  <ChevronLeft className="w-4 h-4 text-gray-500" />
                </button>
                <button className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm font-medium">
                  1
                </button>
                <button className="px-3 py-1 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                  2
                </button>
                <button className="px-3 py-1 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                  3
                </button>
                <span className="px-2 text-gray-500">...</span>
                <button className="px-3 py-1 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                  15
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-gray-100">
                <Package className="absolute inset-0 w-16 h-16 m-auto text-gray-400" />
                <div className="absolute top-2 right-2">
                  <StatusBadge status={product.status} />
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">SKU: {product.id}</p>
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-gray-900">₩{product.price.toLocaleString()}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600">{product.sales}</span>
                    {product.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                    {product.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className={`text-sm font-medium ${
                    product.stock === 0 ? 'text-red-600' :
                    product.stock < 20 ? 'text-yellow-600' :
                    'text-gray-600'
                  }`}>
                    재고: {product.stock}개
                  </span>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                      <Edit2 className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}