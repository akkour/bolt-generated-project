import { supabase } from '../supabase/client';
import type { Database } from '../supabase/types';

type Message = Database['public']['Tables']['messages']['Row'];

export const messages = {
  /**
   * Send a new message
   */
  async sendMessage(message: Omit<Message, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('messages')
      .insert(message)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get messages for a service request
   */
  async getRequestMessages(requestId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:profiles!sender_id(*),
        receiver:profiles!receiver_id(*)
      `)
      .eq('service_request_id', requestId)
      .order('created_at');

    if (error) throw error;
    return data;
  },

  /**
   * Mark messages as read
   */
  async markAsRead(messageIds: string[]) {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .in('id', messageIds);

    if (error) throw error;
  },
}
