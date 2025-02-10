import { supabase } from '../supabase/client';
import type { Database } from '../supabase/types';

type Review = Database['public']['Tables']['reviews']['Row'];

export const reviews = {
  /**
   * Create a new review
   */
  async createReview(review: Omit<Review, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get reviews for a provider
   */
  async getProviderReviews(providerId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles (*)
      `)
      .eq('provider_id', providerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Get the average rating for a provider
   */
  async getProviderRating(providerId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('provider_id', providerId);

    if (error) throw error;

    if (!data.length) return 0;
    
    const average = data.reduce((acc, curr) => acc + curr.rating, 0) / data.length;
    return Number(average.toFixed(2));
  },
}
