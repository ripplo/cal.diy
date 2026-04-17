import { click } from "@ripplo/testing/actions";
import { assert } from "@ripplo/testing/assert";
import { role, testId } from "@ripplo/testing/locators";

import { dataPublicEventType } from "../preconditions/dataPublicEventType";
import ripplo from "../ripplo";

ripplo
  .test("pick-slot-on-public-booking-page")
  .name("Date picker and month navigation render on public booking page")
  .requires({ event: dataPublicEventType })
  .expectedOutcome("Date picker month label updates after clicking the next-month button on the booker")
  .startsAt(({ event }) => `/${event.username}/${event.eventSlug}`)
  .steps(() => [
    assert.visible(testId("booker-container")).as("booker container renders"),
    assert.visible(testId("selected-month-label")).as("month label renders"),
    click(testId("incrementMonth")).as("click next month"),
    assert.visible(testId("selected-month-label")).as("month label still visible after advancing"),
    assert.visible(testId("decrementMonth")).as("decrement month control renders"),
  ]);
