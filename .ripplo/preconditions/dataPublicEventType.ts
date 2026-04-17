import ripplo from "../ripplo";

export const dataPublicEventType = ripplo
  .precondition("data:public-event-type")
  .description("A user with a public 30-minute event type and weekday availability")
  .contract<{
    username: string;
    eventSlug: string;
    eventTitle: string;
    attendeeName: string;
    attendeeEmail: string;
  }>();
