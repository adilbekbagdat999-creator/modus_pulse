import { createClient } from '@supabase/supabase-js';
import { initialTickets } from '../data/mockTickets';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('YOUR_'));

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Получение всех обращений (из базы Supabase или fallback на mock)
export async function getTickets() {
  if (!isSupabaseConfigured) {
    console.log('⚡ Supabase не настроен в .env — используются локальные данные.');
    return initialTickets;
  }

  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Ошибка загрузки из Supabase:', error.message);
      return initialTickets;
    }

    if (!data || data.length === 0) {
      return initialTickets;
    }

    // Приведение полей из базы к формату приложения
    return data.map(item => ({
      id: item.id,
      type: item.type,
      category: item.category,
      department: item.department,
      author: {
        name: item.author_name || 'Сотрудник',
        role: item.author_role || 'Специалист',
        avatar: item.author_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        email: item.author_email || ''
      },
      title: item.title,
      description: item.description,
      priority: item.priority || 'Средний',
      status: item.status || 'Новое',
      createdAt: item.created_at,
      assignedTo: item.assigned_to,
      suggestedAction: item.suggested_action,
      clusterId: item.cluster_id,
      clusterTitle: item.cluster_title,
      costOfInaction: item.cost_of_inaction,
      timeline: item.timeline || [],
      chat: item.chat || []
    }));
  } catch (err) {
    console.error('Исключение при запросе к Supabase:', err);
    return initialTickets;
  }
}

// Добавление нового обращения в Supabase
export async function addTicket(ticket) {
  if (!isSupabaseConfigured) {
    return { success: true, data: ticket };
  }

  try {
    const dbPayload = {
      id: ticket.id,
      type: ticket.type,
      category: ticket.category,
      department: ticket.department,
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status || 'Новое',
      author_name: ticket.author?.name,
      author_role: ticket.author?.role,
      author_avatar: ticket.author?.avatar,
      author_email: ticket.author?.email,
      created_at: ticket.createdAt || new Date().toISOString(),
      timeline: ticket.timeline || [],
      chat: ticket.chat || []
    };

    const { data, error } = await supabase
      .from('tickets')
      .insert([dbPayload])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Ошибка сохранения в Supabase:', err);
    return { success: false, error: err.message };
  }
}

// Обновление обращения (смена статуса, назначение ответственного, добавление сообщения в чат)
export async function updateTicket(ticket) {
  if (!isSupabaseConfigured) {
    return { success: true, data: ticket };
  }

  try {
    const { data, error } = await supabase
      .from('tickets')
      .update({
        status: ticket.status,
        assigned_to: ticket.assignedTo,
        timeline: ticket.timeline,
        chat: ticket.chat
      })
      .eq('id', ticket.id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Ошибка обновления в Supabase:', err);
    return { success: false, error: err.message };
  }
}

// Загрузка сообщений канала чата
export async function getChatMessages(channelId) {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('channel_id', channelId)
      .order('created_at', { ascending: true });

    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

// Отправка сообщения в канал чата
export async function saveChatMessage(msg) {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([{
        id: msg.id,
        channel_id: msg.channelId,
        sender_name: msg.senderName,
        sender_email: msg.senderEmail,
        sender_role: msg.senderRole,
        sender_department: msg.senderDepartment,
        sender_avatar: msg.senderAvatar,
        text: msg.text || '',
        file_name: msg.fileName || null,
        file_type: msg.fileType || null,
        file_size: msg.fileSize || null,
        file_data: msg.fileData || null,
        created_at: msg.createdAt || new Date().toISOString()
      }])
      .select()
      .single();

    if (error) return null;
    return data;
  } catch {
    return null;
  }
}
