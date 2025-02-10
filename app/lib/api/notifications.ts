import { supabase } from '../supabase/client';
import type { Database } from '../supabase/types';

type Notification = Database['public']['Tables']['notifications']['Row'];

export const notifications = {
  /**
   * Create a new notification
   */
  async createNotification(notification: Omit<Notification, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('notifications')
      .insert(notification)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get user's notifications
   */
  async getUserNotifications(userId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Mark notifications as read
   */
  async markAsRead(notificationIds: string[]) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .in('id', notificationIds);

    if (error) throw error;
  },
}
