export type CalendarEvent = {
    id: number;
    created_at: string;
    title: string;
    date: string;
    location: string;
    cost: string;
    start_time: string;
    end_time: string;
    extra_info: string;
    type: string;
};

export type EventType = {
	id: string;
	icon: string;
};

export type EventPayload = {
  title: string;
  date: string;
  location: string;
  cost: string;
  startTime: string;
  endTime: string;
  extraInfo: string;
  eventType: 'deadline' | 'reminder' | 'event' | 'all day' | 'birthday' | 'bill';
};
