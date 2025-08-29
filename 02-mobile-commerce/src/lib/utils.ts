import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(price);
}

export function formatDiscount(originalPrice: number, discountedPrice: number) {
  const discount = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  return discount;
}

export function formatDeliveryTime(time: number | string | null) {
  if (!time) return '30분 내';
  
  // 문자열로 전달된 경우 (예: "30분 내", "1시간")
  if (typeof time === 'string') {
    return time;
  }
  
  // 숫자로 전달된 경우 (분 단위)
  const minutes = Number(time);
  if (minutes < 60) {
    return `${minutes}분`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}시간 ${remainingMinutes}분` : `${hours}시간`;
}

