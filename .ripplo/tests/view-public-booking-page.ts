import { assert } from "@ripplo/testing/assert";
import { role } from "@ripplo/testing/locators";

import { dataPublicEventType } from "../preconditions/dataPublicEventType.js";
import ripplo from "../ripplo.js";

ripplo
  .test("view-public-booking-page")
  .name("Visit a user's public booking page and see event details")
  .requires({ event: dataPublicEventType })
  .expectedOutcome("Event title heading renders and the event meta panel is visible")
  .startsAt(({ event }) => `/${event.username}/${event.eventSlug}`)
  .steps(({ event }) => [
    assert.visible(role("heading", event.eventTitle)).as("event title heading renders"),
    assert.url(`/${event.username}/${event.eventSlug}`).as("url matches booking page"),
  ]);
