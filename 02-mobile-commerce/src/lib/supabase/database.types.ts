export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string | null
          price: number
          original_price: number | null
          discount_percentage: number | null
          category: string
          image_url: string
          thumbnail_url: string | null
          rating: number | null
          reviews_count: number
          stock_quantity: number
          is_available: boolean
          is_featured: boolean
          tags: string[] | null
          delivery_time: string | null
          brand: string | null
          sku: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description?: string | null
          price: number
          original_price?: number | null
          discount_percentage?: number | null
          category: string
          image_url: string
          thumbnail_url?: string | null
          rating?: number | null
          reviews_count?: number
          stock_quantity?: number
          is_available?: boolean
          is_featured?: boolean
          tags?: string[] | null
          delivery_time?: string | null
          brand?: string | null
          sku?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string | null
          price?: number
          original_price?: number | null
          discount_percentage?: number | null
          category?: string
          image_url?: string
          thumbnail_url?: string | null
          rating?: number | null
          reviews_count?: number
          stock_quantity?: number
          is_available?: boolean
          is_featured?: boolean
          tags?: string[] | null
          delivery_time?: string | null
          brand?: string | null
          sku?: string | null
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          image_url: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          image_url: string
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          image_url?: string
          display_order?: number
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          parent_id: string | null
          display_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          phone: string | null
          avatar_url: string | null
          role: 'customer' | 'admin' | 'delivery'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: 'customer' | 'admin' | 'delivery'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: 'customer' | 'admin' | 'delivery'
          created_at?: string
          updated_at?: string
        }
      }
      carts: {
        Row: {
          id: string
          user_id: string | null
          session_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          cart_id: string
          product_id: string
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cart_id: string
          product_id: string
          quantity: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          cart_id?: string
          product_id?: string
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          user_id: string | null
          status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled'
          total_amount: number
          delivery_fee: number
          discount_amount: number | null
          payment_method: string | null
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
          delivery_address: Json | null
          delivery_time: string | null
          delivery_person_id: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number?: string
          user_id?: string | null
          status?: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled'
          total_amount: number
          delivery_fee?: number
          discount_amount?: number | null
          payment_method?: string | null
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          delivery_address?: Json | null
          delivery_time?: string | null
          delivery_person_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          user_id?: string | null
          status?: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled'
          total_amount?: number
          delivery_fee?: number
          discount_amount?: number | null
          payment_method?: string | null
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          delivery_address?: Json | null
          delivery_time?: string | null
          delivery_person_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          total_price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          total_price?: number
          created_at?: string
        }
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          label: string | null
          street_address: string
          city: string
          state: string | null
          postal_code: string
          country: string
          is_default: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          label?: string | null
          street_address: string
          city: string
          state?: string | null
          postal_code: string
          country?: string
          is_default?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          label?: string | null
          street_address?: string
          city?: string
          state?: string | null
          postal_code?: string
          country?: string
          is_default?: boolean
          created_at?: string
        }
      }
      delivery_tracking: {
        Row: {
          id: string
          order_id: string
          status: string
          location: Json | null
          estimated_time: string | null
          actual_time: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          status: string
          location?: Json | null
          estimated_time?: string | null
          actual_time?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          status?: string
          location?: Json | null
          estimated_time?: string | null
          actual_time?: string | null
          notes?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}