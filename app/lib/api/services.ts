import { supabase } from '../supabase/client';
import type { Database } from '../supabase/types';

type ServiceCategory = Database['public']['Tables']['service_categories']['Row'];
type ServiceRequest = Database['public']['Tables']['service_requests']['Row'];

export const services = {
  /**
   * Get all service categories
   */
  async getCategories() {
    const { data, error } = await supabase
      .from('service_categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  },

  /**
   * Create a new service request
   */
  async createRequest(request: Omit<ServiceRequest, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('service_requests')
      .insert(request)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get service requests for a client
   */
  async getClientRequests(clientId: string) {
    const { data, error } = await supabase
      .from('service_requests')
      .select(`
        *,
        provider_profiles (
          *,
          profiles (*)
        ),
        service_categories (*)
      `)
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Get service requests for a provider
   */
  async getProviderRequests(providerId: string) {
    const { data, error } = await supabase
      .from('service_requests')
      .select(`
        *,
        profiles (*),
        service_categories (*)
      `)
      .eq('provider_id', providerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Update a service request status
   */
  async updateRequestStatus(
    requestId: string,
    status: Database['public']['Enums']['request_status']
  ) {
    const { data, error } = await supabase
      .from('service_requests')
      .update({ status })
      .eq('id', requestId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
}
