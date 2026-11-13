-- =========================================================
-- MODUS PULSE — Схема базы данных для Supabase (PostgreSQL)
-- Скопируйте этот код и вставьте в Supabase -> SQL Editor -> Run
-- =========================================================

-- 1. Создаем таблицу обращений
CREATE TABLE IF NOT EXISTS public.tickets (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'Проблема',
  category TEXT NOT NULL DEFAULT 'Межотдельное взаимодействие',
  department TEXT NOT NULL DEFAULT 'Закупки',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'Средний',
  status TEXT NOT NULL DEFAULT 'Новое',
  author_name TEXT NOT NULL,
  author_role TEXT,
  author_avatar TEXT,
  author_email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  assigned_to TEXT,
  suggested_action TEXT,
  cluster_id TEXT,
  cluster_title TEXT,
  cost_of_inaction TEXT,
  timeline JSONB DEFAULT '[]'::jsonb,
  chat JSONB DEFAULT '[]'::jsonb
);

-- Включаем публичный доступ на чтение и запись (для хакатона/демо)
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Публичное чтение обращений" 
ON public.tickets FOR SELECT 
USING (true);

CREATE POLICY "Публичное добавление обращений" 
ON public.tickets FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Публичное обновление обращений" 
ON public.tickets FOR UPDATE 
USING (true);

-- 2. Вставляем все 20 тестовых обращений из датасета ТЗ ГК «Модус Трейд»
INSERT INTO public.tickets (
  id, type, category, department, title, description, priority, status,
  author_name, author_role, author_avatar, assigned_to, suggested_action,
  cluster_id, cluster_title, cost_of_inaction, timeline, chat
) VALUES 
(
  'A-001', 'Проблема', 'Межотдельное взаимодействие', 'Закупки',
  'Проблемы с заявками на оборудование',
  'В заявках на приобретение оборудования иногда не хватает назначения изделия и требуемых параметров. Предлагаю добавить обязательные поля, чтобы сократить число уточнений.',
  'Средний', 'Новое', 'Сотрудник закупок', 'Специалист отдела закупок',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  'Руководитель закупок', 'Запросить пример корректно заполненной заявки; оценить изменение шаблона.',
  'spec-nomenclature', 'Спецификации и номенклатура (Закупки ↔ Проектирование)',
  '~35 000 ₽ / мес на лишних уточнениях',
  '[{"step":1,"title":"Обращение создано","date":"10 ноя, 09:30","completed":true,"by":"Сотрудник закупок"},{"step":2,"title":"Зарегистрировано ИИ","date":"10 ноя, 09:31","completed":true,"by":"MODUS AI"},{"step":3,"title":"Назначен ответственный","date":"Ожидает назначения","completed":false},{"step":4,"title":"В процессе решения","date":"—","completed":false},{"step":5,"title":"Проблема устранена","date":"—","completed":false}]'::jsonb,
  '[{"id":"msg-1","sender":"Сотрудник закупок","role":"author","text":"Добрый день! Уже третий раз за неделю получаем спецификации без указания диапазона температур.","timestamp":"10 ноя, 09:35"},{"id":"msg-2","sender":"MODUS AI","role":"system","text":"Обращение связано с кластером #A-003. Рекомендация: обновить шаблон заявки в 1С.","timestamp":"10 ноя, 09:36","isAi":true}]'::jsonb
),
(
  'A-002', 'Предложение', 'Информационная прозрачность', 'Закупки',
  'Ориентировочные статусы проектов для поставщиков',
  'При общении с поставщиками полезно видеть общую стадию проекта без доступа к коммерческим деталям. Можно ли показывать краткий статус и ориентировочные контрольные даты?',
  'Средний', 'На рассмотрении', 'Сотрудник закупок', 'Специалист отдела снабжения',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  'Руководитель направления', 'Определить перечень доступных статусов и источник их обновления.',
  'cross-department', 'Прозрачность этапов между отделами', '~20 000 ₽ / мес потери в переписках',
  '[{"step":1,"title":"Обращение создано","date":"09 ноя, 14:15","completed":true},{"step":2,"title":"Прочитано руководителем","date":"09 ноя, 15:00","completed":true},{"step":3,"title":"Взято на рассмотрение","date":"09 ноя, 16:30","completed":true},{"step":4,"title":"Разработка регламента","date":"В процессе","completed":false},{"step":5,"title":"Внедрено в систему","date":"—","completed":false}]'::jsonb,
  '[{"id":"msg-1","sender":"Руководитель направления","role":"manager","text":"Идея отличная. Подготовим отдельный дашборд только с ключевыми этапами.","timestamp":"09 ноя, 16:35"}]'::jsonb
),
(
  'A-003', 'Проблема', 'Каталог и данные', 'Проектирование',
  'Разные обозначения одного изделия в номенклатуре',
  'В рабочих материалах иногда встречаются разные обозначения одного изделия. Это увеличивает время проверки спецификации. Нужен понятный способ находить актуальную карточку позиции.',
  'Высокий', 'В работе', 'Сотрудник проектирования', 'Ведущий инженер-проектировщик',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
  'Ответственный за номенклатуру', 'Подготовить правило проверки и корректировки номенклатуры.',
  'spec-nomenclature', 'Спецификации и номенклатура', '~150 000 ₽ / мес (задержка поставок)',
  '[{"step":1,"title":"Обращение создано","date":"08 ноя, 11:00","completed":true},{"step":2,"title":"Приоритет: Высокий","date":"08 ноя, 11:05","completed":true},{"step":3,"title":"Назначен ответственный","date":"08 ноя, 12:00","completed":true},{"step":4,"title":"Сверка справочника 1С","date":"В работе (до 15 ноя)","completed":true},{"step":5,"title":"Единый каталог утвержден","date":"—","completed":false}]'::jsonb,
  '[{"id":"msg-1","sender":"Ответственный за номенклатуру","role":"manager","text":"Начали чистку дублей. Уже нашли 42 задвоенные позиции.","timestamp":"08 ноя, 14:20"}]'::jsonb
),
(
  'A-007', 'Проблема', 'Интеграции и IT', 'Бухгалтерия',
  'Повторный ввод одних и тех же сведений в разные системы',
  'Иногда повторный ввод одних и тех же сведений в разных рабочих системах занимает много времени. Нужна оценка, какие операции можно синхронизировать безопасно.',
  'Высокий', 'Новое', 'Сотрудник бухгалтерии', 'Оператор 1С',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
  'IT-специалист', 'Собрать примеры операций и оценить техническую реализуемость.',
  'cross-department', 'Автоматизация и интеграции (1С ↔ Битрикс24)', '~190 000 ₽ / мес ручного труда',
  '[{"step":1,"title":"Создано","date":"10 ноя, 11:20","completed":true},{"step":2,"title":"AI-приоритет: Критический","date":"10 ноя, 11:21","completed":true},{"step":3,"title":"Ожидает подтверждения ТЗ","date":"Сегодня","completed":true},{"step":4,"title":"Разработка коннектора","date":"—","completed":false},{"step":5,"title":"Синхронизация запущена","date":"—","completed":false}]'::jsonb,
  '[{"id":"msg-1","sender":"MODUS AI","role":"system","text":"Рекомендация: обмен счетами сэкономит около 48 рабочих часов в неделю.","timestamp":"10 ноя, 11:22","isAi":true}]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- 3. Создаем таблицу сообщений прямого чата отделов и сотрудников
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id TEXT PRIMARY KEY,
  channel_id TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  sender_email TEXT,
  sender_role TEXT,
  sender_department TEXT,
  sender_avatar TEXT,
  text TEXT,
  file_name TEXT,
  file_type TEXT,
  file_size TEXT,
  file_data TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Публичное чтение сообщений чата" 
ON public.chat_messages FOR SELECT 
USING (true);

CREATE POLICY "Публичная отправка сообщений чата" 
ON public.chat_messages FOR INSERT 
WITH CHECK (true);

