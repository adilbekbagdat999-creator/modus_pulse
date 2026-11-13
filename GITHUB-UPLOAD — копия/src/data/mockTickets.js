// Исходный датасет хакатона ГК «Модус Трейд» (все 20 тестовых обращений A-001 ... A-020)
// с обогащенными данными для интерактивного трекинга, живого чата и AI-аналитики.

export const initialTickets = [
  {
    id: "A-001",
    type: "Проблема",
    category: "Межотдельное взаимодействие",
    department: "Закупки",
    author: {
      name: "Сотрудник закупок",
      role: "Специалист отдела закупок",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      email: "procurement1@modus-trade.ru"
    },
    title: "Проблемы с заявками на оборудование",
    description: "В заявках на приобретение оборудования иногда не хватает назначения изделия и требуемых параметров. Предлагаю добавить обязательные поля, чтобы сократить число уточнений.",
    priority: "Средний",
    status: "Новое",
    createdAt: "2026-11-10T09:30:00",
    assignedTo: "Руководитель закупок",
    suggestedAction: "Запросить пример корректно заполненной заявки; оценить изменение шаблона.",
    clusterId: "spec-nomenclature",
    clusterTitle: "Спецификации и номенклатура (Закупки ↔ Проектирование)",
    costOfInaction: "~35 000 ₽ / мес на лишних уточнениях",
    timeline: [
      { step: 1, title: "Обращение создано", date: "10 ноя, 09:30", completed: true, by: "Сотрудник закупок" },
      { step: 2, title: "Зарегистрировано ИИ", date: "10 ноя, 09:31", completed: true, by: "MODUS AI" },
      { step: 3, title: "Назначен ответственный", date: "Ожидает назначения", completed: false, by: "Директорат" },
      { step: 4, title: "В процессе решения", date: "—", completed: false },
      { step: 5, title: "Проблема устранена", date: "—", completed: false }
    ],
    chat: [
      {
        id: "msg-1",
        sender: "Сотрудник закупок",
        role: "author",
        text: "Добрый день! Уже третий раз за неделю получаем спецификации без указания рабочего диапазона температур и вольтажа. Приходится звонить инженерам и тратить по 2 часа.",
        timestamp: "10 ноя, 09:35",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      },
      {
        id: "msg-2",
        sender: "MODUS AI",
        role: "system",
        text: "Обращение связано с кластером #A-003 (разные обозначения) и #A-013 (изменение состава оборудования). Рекомендация: обновить шаблон заявки в 1С.",
        timestamp: "10 ноя, 09:36",
        isAi: true
      }
    ]
  },
  {
    id: "A-002",
    type: "Предложение",
    category: "Информационная прозрачность",
    department: "Закупки",
    author: {
      name: "Сотрудник закупок",
      role: "Специалист отдела снабжения",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      email: "supply@modus-trade.ru"
    },
    title: "Ориентировочные статусы проектов для поставщиков",
    description: "При общении с поставщиками полезно видеть общую стадию проекта без доступа к коммерческим деталям. Можно ли показывать краткий статус и ориентировочные контрольные даты?",
    priority: "Средний",
    status: "На рассмотрении",
    createdAt: "2026-11-09T14:15:00",
    assignedTo: "Руководитель направления",
    suggestedAction: "Определить перечень доступных статусов и источник их обновления.",
    clusterId: "cross-department",
    clusterTitle: "Прозрачность этапов между отделами",
    costOfInaction: "~20 000 ₽ / мес потери в переписках",
    timeline: [
      { step: 1, title: "Обращение создано", date: "09 ноя, 14:15", completed: true, by: "Сотрудник закупок" },
      { step: 2, title: "Прочитано руководителем", date: "09 ноя, 15:00", completed: true, by: "Руководитель направления" },
      { step: 3, title: "Взято на рассмотрение", date: "09 ноя, 16:30", completed: true, by: "Руководитель направления" },
      { step: 4, title: "Разработка регламента", date: "В процессе", completed: false },
      { step: 5, title: "Внедрено в систему", date: "—", completed: false }
    ],
    chat: [
      {
        id: "msg-1",
        sender: "Руководитель направления",
        role: "manager",
        text: "Идея отличная. Подготовим отдельный дашборд только с ключевыми этапами (Проектирование / Закупка / Монтаж) без сумм и контрагентов.",
        timestamp: "09 ноя, 16:35",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "A-003",
    type: "Проблема",
    category: "Каталог и данные",
    department: "Проектирование",
    author: {
      name: "Сотрудник проектирования",
      role: "Ведущий инженер-проектировщик",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      email: "engineer@modus-trade.ru"
    },
    title: "Разные обозначения одного изделия в номенклатуре",
    description: "В рабочих материалах иногда встречаются разные обозначения одного изделия. Это увеличивает время проверки спецификации. Нужен понятный способ находить актуальную карточку позиции.",
    priority: "Высокий",
    status: "В работе",
    createdAt: "2026-11-08T11:00:00",
    assignedTo: "Ответственный за номенклатуру",
    suggestedAction: "Подготовить правило проверки и корректировки номенклатуры.",
    clusterId: "spec-nomenclature",
    clusterTitle: "Спецификации и номенклатура",
    costOfInaction: "~150 000 ₽ / мес (задержка поставок)",
    timeline: [
      { step: 1, title: "Обращение создано", date: "08 ноя, 11:00", completed: true, by: "Инженер-проектировщик" },
      { step: 2, title: "Приоритет: Высокий", date: "08 ноя, 11:05", completed: true, by: "MODUS AI" },
      { step: 3, title: "Назначен ответственный", date: "08 ноя, 12:00", completed: true, by: "Ответственный за номенклатуру" },
      { step: 4, title: "Сверка справочника 1С", date: "В работе (до 15 ноя)", completed: true },
      { step: 5, title: "Единый каталог утвержден", date: "—", completed: false }
    ],
    chat: [
      {
        id: "msg-1",
        sender: "Ответственный за номенклатуру",
        role: "manager",
        text: "Начали чистку дублей. Уже нашли 42 задвоенные позиции по слаботочным кабелям и датчикам.",
        timestamp: "08 ноя, 14:20",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "A-004",
    type: "Предложение",
    category: "Обучение",
    department: "Закупки",
    author: {
      name: "Сотрудник закупок",
      role: "Менеджер направления",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      email: "procurement2@modus-trade.ru"
    },
    title: "Обучение новым товарным линейкам",
    description: "Было бы полезно проводить короткие занятия по новым товарным линейкам с разбором типовых запросов. Предлагаю составить календарь таких встреч.",
    priority: "Низкий",
    status: "Реализовано",
    createdAt: "2026-11-01T10:00:00",
    assignedTo: "Ответственный за обучение",
    suggestedAction: "Запланирован пробный обучающий семинар.",
    clusterId: "training-culture",
    clusterTitle: "Обучение и адаптация персонала",
    costOfInaction: "0 ₽ (успешно реализовано)",
    timeline: [
      { step: 1, title: "Предложение подано", date: "01 ноя, 10:00", completed: true },
      { step: 2, title: "Одобрено HR и директоратом", date: "02 ноя, 11:30", completed: true },
      { step: 3, title: "Составлен график вебинаров", date: "04 ноя, 15:00", completed: true },
      { step: 4, title: "Проведен 1-й семинар", date: "07 ноя, 17:00", completed: true },
      { step: 5, title: "Реализовано (в постоянном графике)", date: "08 ноя, 10:00", completed: true }
    ],
    chat: [
      {
        id: "msg-1",
        sender: "Ответственный за обучение",
        role: "manager",
        text: "Первый воркшоп посетили 18 человек. Запись выложена в корпоративную базу знаний!",
        timestamp: "07 ноя, 18:00",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "A-005",
    type: "Проблема",
    category: "Документооборот",
    department: "Бухгалтерия",
    author: {
      name: "Сотрудник бухгалтерии",
      role: "Бухгалтер по первичной документации",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      email: "accounting@modus-trade.ru"
    },
    title: "Статус согласования пакетов документов между отделами",
    description: "При обработке документов между подразделениями возникают дополнительные вопросы о том, на каком этапе находится пакет. Хотелось бы видеть ответственного и текущий статус.",
    priority: "Средний",
    status: "Ожидает уточнения",
    createdAt: "2026-11-09T16:00:00",
    assignedTo: "Руководитель бухгалтерии",
    suggestedAction: "Уточнить виды документов и ключевые этапы согласования.",
    clusterId: "cross-department",
    clusterTitle: "Прозрачность документооборота",
    costOfInaction: "~45 000 ₽ / мес потерянных часов",
    timeline: [
      { step: 1, title: "Обращение создано", date: "09 ноя, 16:00", completed: true },
      { step: 2, title: "Запрос конкретики", date: "10 ноя, 10:00", completed: true },
      { step: 3, title: "Ожидает ответа автора", date: "Сейчас", completed: true, active: true },
      { step: 4, title: "Внедрение статусов", date: "—", completed: false },
      { step: 5, title: "Завершено", date: "—", completed: false }
    ],
    chat: [
      {
        id: "msg-1",
        sender: "Руководитель бухгалтерии",
        role: "manager",
        text: "Уточните, пожалуйста, о каких именно документах речь: закрывающие акты монтажа или счета на оплату от поставщиков?",
        timestamp: "10 ноя, 10:05",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "A-006",
    type: "Предложение",
    category: "Регламенты",
    department: "Бухгалтерия",
    author: {
      name: "Сотрудник бухгалтерии",
      role: "Ведущий бухгалтер",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      email: "accounting2@modus-trade.ru"
    },
    title: "Пошаговая памятка для межотдельных операций",
    description: "Предлагаю собрать короткую пошаговую памятку для операций, в которых последовательно участвуют несколько подразделений, и определить порядок актуализации памятки.",
    priority: "Средний",
    status: "На рассмотрении",
    createdAt: "2026-11-07T12:00:00",
    assignedTo: "Ответственный за процессы",
    suggestedAction: "Назначить владельца процесса и согласовать черновик инструкции.",
    clusterId: "training-culture",
    clusterTitle: "Регламентация процессов",
    costOfInaction: "~25 000 ₽ / мес",
    timeline: [
      { step: 1, title: "Подано", date: "07 ноя, 12:00", completed: true },
      { step: 2, title: "На рассмотрении", date: "08 ноя, 09:00", completed: true },
      { step: 3, title: "Составление черновика", date: "В работе", completed: false },
      { step: 4, title: "Публикация в Базе Знаний", date: "—", completed: false }
    ],
    chat: []
  },
  {
    id: "A-007",
    type: "Проблема",
    category: "Интеграции и IT",
    department: "Бухгалтерия",
    author: {
      name: "Сотрудник бухгалтерии",
      role: "Оператор 1С",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      email: "operator1c@modus-trade.ru"
    },
    title: "Повторный ввод одних и тех же сведений в разные системы",
    description: "Иногда повторный ввод одних и тех же сведений в разных рабочих системах занимает много времени. Нужна оценка, какие операции можно синхронизировать безопасно.",
    priority: "Высокий",
    status: "Новое",
    createdAt: "2026-11-10T11:20:00",
    assignedTo: "IT-специалист",
    suggestedAction: "Собрать примеры операций и оценить техническую реализуемость.",
    clusterId: "cross-department",
    clusterTitle: "Автоматизация и интеграции (1С ↔ Битрикс24)",
    costOfInaction: "~190 000 ₽ / мес ручного труда",
    timeline: [
      { step: 1, title: "Создано", date: "10 ноя, 11:20", completed: true },
      { step: 2, title: "AI-приоритет: Критический", date: "10 ноя, 11:21", completed: true },
      { step: 3, title: "Ожидает подтверждения ТЗ", date: "Сегодня", completed: true, active: true },
      { step: 4, title: "Разработка коннектора", date: "—", completed: false },
      { step: 5, title: "Синхронизация запущена", date: "—", completed: false }
    ],
    chat: [
      {
        id: "msg-1",
        sender: "MODUS AI",
        role: "system",
        text: "Рекомендация для руководства: Реализация обмена контрагентами и счетами сэкономит около 48 рабочих часов в неделю по всей компании.",
        timestamp: "10 ноя, 11:22",
        isAi: true
      }
    ]
  },
  {
    id: "A-008",
    type: "Предложение",
    category: "Знания и наставничество",
    department: "Бухгалтерия",
    author: {
      name: "Сотрудник бухгалтерии",
      role: "Старший бухгалтер",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      email: "senior_acc@modus-trade.ru"
    },
    title: "Памятка типовых ошибок и контактов для новичков",
    description: "При передаче сложной задачи новому сотруднику полезен короткий разбор типовых ошибок и контактов, к которым можно обратиться за помощью. Предлагаю сделать такую памятку.",
    priority: "Низкий",
    status: "Реализовано",
    createdAt: "2026-10-28T09:00:00",
    assignedTo: "Руководитель подразделения",
    suggestedAction: "Создана учебная инструкция в Базе Знаний.",
    clusterId: "training-culture",
    clusterTitle: "Онбординг сотрудников",
    costOfInaction: "0 ₽ (успешно внедрено)",
    timeline: [
      { step: 1, title: "Подано", date: "28 окт", completed: true },
      { step: 2, title: "Одобрено", date: "29 окт", completed: true },
      { step: 3, title: "Инструкция написана", date: "02 ноя", completed: true },
      { step: 4, title: "Размещено в Базе Знаний", date: "04 ноя", completed: true }
    ],
    chat: []
  },
  {
    id: "A-009",
    type: "Проблема",
    category: "Договорная работа",
    department: "Продажи",
    author: {
      name: "Менеджер по продажам",
      role: "Ведущий менеджер по работе с клиентами",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      email: "sales1@modus-trade.ru"
    },
    title: "Разграничение ответственности при подготовке приложений к договору",
    description: "Не всегда понятно, кто готовит очередную версию приложения к договору и кто должен проверить её перед отправкой. Это приводит к повторным согласованиям.",
    priority: "Высокий",
    status: "В работе",
    createdAt: "2026-11-06T15:00:00",
    assignedTo: "Ответственный за договоры",
    suggestedAction: "Разграничить этапы подготовки, проверки и утверждения.",
    clusterId: "cross-department",
    clusterTitle: "Договорной документооборот",
    costOfInaction: "~80 000 ₽ / мес рисков по контрактам",
    timeline: [
      { step: 1, title: "Подано", date: "06 ноя", completed: true },
      { step: 2, title: "Принято юротделом", date: "07 ноя", completed: true },
      { step: 3, title: "Чек-лист согласования", date: "В работе", completed: true, active: true },
      { step: 4, title: "Финальное утверждение", date: "—", completed: false }
    ],
    chat: []
  },
  {
    id: "A-010",
    type: "Предложение",
    category: "Задачи и коммуникации",
    department: "Продажи",
    author: {
      name: "Менеджер по продажам",
      role: "Менеджер проектов продаж",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      email: "sales2@modus-trade.ru"
    },
    title: "Правило закрытия задач только после подтверждения клиентом",
    description: "Предлагаю не закрывать рабочую задачу до подтверждения заказчиком результата внутри компании, чтобы связанные вопросы оставались в общей истории обсуждения.",
    priority: "Средний",
    status: "На рассмотрении",
    createdAt: "2026-11-05T17:00:00",
    assignedTo: "Руководитель продаж",
    suggestedAction: "Проверить, подходит ли правило для разных типов задач.",
    clusterId: "cross-department",
    clusterTitle: "Качество клиентского сервиса",
    costOfInaction: "~30 000 ₽ / мес",
    timeline: [
      { step: 1, title: "Подано", date: "05 ноя", completed: true },
      { step: 2, title: "На обсуждении", date: "06 ноя", completed: true }
    ],
    chat: []
  },
  {
    id: "A-011",
    type: "Проблема",
    category: "Оперативность",
    department: "Продажи",
    author: {
      name: "Менеджер по продажам",
      role: "Аккаунт-менеджер",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      email: "sales3@modus-trade.ru"
    },
    title: "Сроки ответов от смежных подразделений при срочных КП",
    description: "При срочной подготовке клиентского предложения сложно прогнозировать сроки ответа от смежных подразделений. Хотелось бы видеть ожидаемый срок и уведомление при задержке.",
    priority: "Высокий",
    status: "Новое",
    createdAt: "2026-11-10T12:00:00",
    assignedTo: "Руководитель направления",
    suggestedAction: "Определить допустимые сроки реакции для разных категорий.",
    clusterId: "cross-department",
    clusterTitle: "SLA и скорость реакции",
    costOfInaction: "~110 000 ₽ / мес упущенных сделок",
    timeline: [
      { step: 1, title: "Создано", date: "10 ноя, 12:00", completed: true },
      { step: 2, title: "Назначение SLA", date: "В очереди", completed: false }
    ],
    chat: []
  },
  {
    id: "A-012",
    type: "Предложение",
    category: "Коммуникации",
    department: "Продажи",
    author: {
      name: "Менеджер по продажам",
      role: "Специалист тендерного отдела",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      email: "tenders@modus-trade.ru"
    },
    title: "Единое место для фиксации итоговых решений по проектам",
    description: "Рабочие обсуждения распределены по нескольким каналам (почта, мессенджеры), из-за чего теряется контекст. Предлагаю выбрать единое место для итоговых решений по задаче.",
    priority: "Низкий",
    status: "На рассмотрении",
    createdAt: "2026-11-04T10:00:00",
    assignedTo: "IT-специалист",
    suggestedAction: "Сравнить варианты и предложить правила фиксации итогов.",
    clusterId: "cross-department",
    clusterTitle: "Единая среда коммуникаций",
    costOfInaction: "~40 000 ₽ / мес",
    timeline: [
      { step: 1, title: "Подано", date: "04 ноя", completed: true },
      { step: 2, title: "На рассмотрении IT", date: "05 ноя", completed: true }
    ],
    chat: []
  },
  {
    id: "A-013",
    type: "Проблема",
    category: "Проектная деятельность",
    department: "Проектирование",
    author: {
      name: "Координатор проекта",
      role: "Координатор слаботочных проектов",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      email: "coord1@modus-trade.ru"
    },
    title: "История изменений спецификаций при замене оборудования",
    description: "Когда изменяется состав оборудования в проекте, не всегда ясно, какие строки спецификации были пересмотрены. Нужна более заметная история изменений.",
    priority: "Средний",
    status: "Ожидает уточнения",
    createdAt: "2026-11-08T16:00:00",
    assignedTo: "Руководитель проектов",
    suggestedAction: "Уточнить формат исходных файлов и способы сравнения версий.",
    clusterId: "spec-nomenclature",
    clusterTitle: "Версионность спецификаций",
    costOfInaction: "~60 000 ₽ / мес",
    timeline: [
      { step: 1, title: "Подано", date: "08 ноя", completed: true },
      { step: 2, title: "Запрос примера файла", date: "09 ноя", completed: true, active: true }
    ],
    chat: []
  },
  {
    id: "A-014",
    type: "Предложение",
    category: "Планирование ресурсов",
    department: "Проектирование",
    author: {
      name: "Координатор проекта",
      role: "ПМ инженерных систем",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      email: "coord2@modus-trade.ru"
    },
    title: "Визуализация загруженности проектной группы",
    description: "Предлагаю показывать загруженность проектной группы на ближайшие недели в укрупнённом виде. Так будет проще согласовывать сроки запуска новых задач.",
    priority: "Средний",
    status: "На рассмотрении",
    createdAt: "2026-11-03T11:00:00",
    assignedTo: "Руководитель проектирования",
    suggestedAction: "Согласовать показатели загрузки и права просмотра.",
    clusterId: "cross-department",
    clusterTitle: "Ресурсное планирование",
    costOfInaction: "~50 000 ₽ / мес",
    timeline: [
      { step: 1, title: "Подано", date: "03 ноя", completed: true },
      { step: 2, title: "Оценка прототипа", date: "05 ноя", completed: true }
    ],
    chat: []
  },
  {
    id: "A-015",
    type: "Проблема",
    category: "Постановка задач",
    department: "Проектирование",
    author: {
      name: "Руководитель проекта",
      role: "Главный инженер проекта (ГИП)",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      email: "gip@modus-trade.ru"
    },
    title: "Поручения без ожидаемого результата и даты завершения",
    description: "Некоторые поручения поступают без ожидаемого результата и даты завершения. Предлагаю договориться о минимальном наборе данных при постановке задачи.",
    priority: "Средний",
    status: "В работе",
    createdAt: "2026-11-07T14:30:00",
    assignedTo: "Руководитель направления",
    suggestedAction: "Подготовить шаблон с целью, сроком, приоритетом и ответственным.",
    clusterId: "training-culture",
    clusterTitle: "Стандарты управления задачами",
    costOfInaction: "~40 000 ₽ / мес срывов сроков",
    timeline: [
      { step: 1, title: "Подано", date: "07 ноя", completed: true },
      { step: 2, title: "Внедрение обязательных полей", date: "В работе", completed: true }
    ],
    chat: []
  },
  {
    id: "A-016",
    type: "Предложение",
    category: "Обучение",
    department: "Проектирование",
    author: {
      name: "Руководитель проекта",
      role: "Технический лидер",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      email: "techlead@modus-trade.ru"
    },
    title: "Практические занятия с учебными образцами оборудования",
    description: "Для новых сотрудников полезны практические демонстрации оборудования, а не только презентации. Предлагаю пилотное занятие с учебными образцами.",
    priority: "Низкий",
    status: "Новое",
    createdAt: "2026-11-10T13:00:00",
    assignedTo: "Ответственный за обучение",
    suggestedAction: "Проверить наличие образцов и составить план пилота.",
    clusterId: "training-culture",
    clusterTitle: "Практическое обучение",
    costOfInaction: "—",
    timeline: [
      { step: 1, title: "Создано", date: "10 ноя", completed: true }
    ],
    chat: []
  },
  {
    id: "A-017",
    type: "Предложение",
    category: "Корпоративная среда",
    department: "Офис",
    author: {
      name: "Сотрудник офиса",
      role: "Специалист бэк-офиса",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      email: "office@modus-trade.ru"
    },
    title: "Организация отдельной зоны для коротких перерывов",
    description: "Предлагаю организовать отдельную небольшую зону для коротких перерывов рядом с рабочими помещениями.",
    priority: "Низкий",
    status: "Отклонено",
    createdAt: "2026-10-25T11:00:00",
    assignedTo: "Административный руководитель",
    suggestedAction: "Мотивированный отказ: сейчас нет подходящего помещения; вернуться к вопросу при перепланировке.",
    clusterId: "comfort-office",
    clusterTitle: "Офисный комфорт",
    costOfInaction: "0 ₽",
    timeline: [
      { step: 1, title: "Подано", date: "25 окт", completed: true },
      { step: 2, title: "Рассмотрено администрацией", date: "26 окт", completed: true },
      { step: 3, title: "Мотивированный отказ дан", date: "27 окт", completed: true, isRejected: true }
    ],
    chat: [
      {
        id: "msg-1",
        sender: "Административный руководитель",
        role: "manager",
        text: "Спасибо за предложение! К сожалению, на текущем этаже все помещения заняты инженерными стендами. Вопрос внесён в план на первый квартал при перепланировке 3-го этажа.",
        timestamp: "27 окт, 14:00",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: "A-018",
    type: "Положительный отзыв",
    category: "Корпоративная среда",
    department: "Офис",
    author: {
      name: "Сотрудник офиса",
      role: "Ассистент отдела продаж",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      email: "assistant@modus-trade.ru"
    },
    title: "Благодарность за формат внутренних учебных встреч",
    description: "Хочу отметить пользу внутренних учебных встреч: после них стало легче обращаться к коллегам за консультацией. Было бы хорошо сохранить этот формат.",
    priority: "Низкий",
    status: "Закрыто",
    createdAt: "2026-11-09T09:00:00",
    assignedTo: "HR / внутренние коммуникации",
    suggestedAction: "Зафиксировать положительный отзыв и передать организаторам обучения.",
    clusterId: "training-culture",
    clusterTitle: "Благодарности и позитивный фидбек",
    costOfInaction: "0 ₽ (+10 к лояльности команды)",
    timeline: [
      { step: 1, title: "Отзыв опубликован", date: "09 ноя", completed: true },
      { step: 2, title: "Передано организаторам", date: "09 ноя", completed: true },
      { step: 3, title: "Закрыто с благодарностью", date: "09 ноя", completed: true }
    ],
    chat: []
  },
  {
    id: "A-019",
    type: "Проблема",
    category: "Хранение документов",
    department: "Проектирование",
    author: {
      name: "Координатор проекта",
      role: "Архивариус проектов",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      email: "archive@modus-trade.ru"
    },
    title: "Определение актуальной редакции инструкций в общих папках",
    description: "В общих папках трудно быстро определить актуальную редакцию инструкции. Можно ли закрепить единые правила именования и архивирования старых версий?",
    priority: "Средний",
    status: "На рассмотрении",
    createdAt: "2026-11-08T10:00:00",
    assignedTo: "Администратор документов",
    suggestedAction: "Согласовать порядок хранения и владельцев папок.",
    clusterId: "cross-department",
    clusterTitle: "Единые стандарты документации",
    costOfInaction: "~25 000 ₽ / мес",
    timeline: [
      { step: 1, title: "Подано", date: "08 ноя", completed: true },
      { step: 2, title: "На согласовании регламента", date: "09 ноя", completed: true }
    ],
    chat: []
  },
  {
    id: "A-020",
    type: "Предложение",
    category: "Прозрачность результатов",
    department: "Закупки",
    author: {
      name: "Сотрудник закупок",
      role: "Ведущий специалист по снабжению",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      email: "supply_lead@modus-trade.ru"
    },
    title: "Публикация регулярного обзора завершённых улучшений",
    description: "Предлагаю публиковать краткий обзор завершённых внутренних улучшений, чтобы сотрудники видели результат направленных предложений.",
    priority: "Низкий",
    status: "Новое",
    createdAt: "2026-11-10T14:00:00",
    assignedTo: "Руководитель подразделения",
    suggestedAction: "Рассмотреть формат квартальной подборки без конфиденциальных сведений (Стена реализованных идей).",
    clusterId: "training-culture",
    clusterTitle: "Стена побед и открытость результатов",
    costOfInaction: "Ключевая фича для вовлечения людей",
    timeline: [
      { step: 1, title: "Предложение зарегистрировано", date: "10 ноя, 14:00", completed: true },
      { step: 2, title: "Одобрено концептуально в MODUS PULSE", date: "Сегодня", completed: true }
    ],
    chat: [
      {
        id: "msg-1",
        sender: "MODUS AI",
        role: "system",
        text: "Это предложение уже воплощено в разделе «Идеи и предложения / Стена побед» платформы MODUS PULSE!",
        timestamp: "10 ноя, 14:05",
        isAi: true
      }
    ]
  }
];


