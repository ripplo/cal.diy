import { assert } from "@ripplo/testing/assert";
import { role, testId } from "@ripplo/testing/locators";

import { dataPublicEventType } from "../preconditions/dataPublicEventType";
import ripplo from "../ripplo";

ripplo
  .test("public-profile-lists-event-types")
  .name("Public user profile lists their event types")
  .requires({ event: dataPublicEventType })
  .expectedOutcome("The user's profile page shows the event type title as a heading inside the event-types list")
  .startsAt(({ event }) => `/${event.username}`)
  .steps(({ event }) => [
    assert.visible(testId("event-types")).as("event-types list renders"),
    assert.visible(role("heading", event.eventTitle)).as("event type title heading is visible"),
    assert.count(testId("event-type-link"), 2).as("two event type links rendered"),
  ]);
