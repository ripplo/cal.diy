import { click, fill } from "@ripplo/testing/actions";
import { assert } from "@ripplo/testing/assert";
import { role, testId } from "@ripplo/testing/locators";

import { dataPublicEventType } from "../preconditions/dataPublicEventType";
import ripplo from "../ripplo";

ripplo
  .test("book-30min-slot-end-to-end")
  .name("Book a 30-minute slot end-to-end as a guest")
  .requires({ event: dataPublicEventType })
  .expectedOutcome("After submitting the booking form, the booking success page renders the booked event title")
  .startsAt(({ event }) => `/${event.username}/${event.eventSlug}`)
  .steps(({ event }) => [
    assert.visible(role("heading", event.eventTitle)).as("event title heading renders"),
    click(testId("incrementMonth")).as("advance to next month so weekdays are available"),
    assert.visible(testId("selected-month-label")).as("next month label renders"),
    click(role("button", "1")).as("pick the 1st of the next month"),
    assert.visible(role("button", "4:00am")).as("time slot button renders for the selected day"),
    click(role("button", "4:00am")).as("pick the 4:00am time slot"),
    assert.visible(role("textbox", "Your name*")).as("booking form name field renders"),
    fill(role("textbox", "Your name*"), event.attendeeName).as("fill attendee name"),
    assert.value(role("textbox", "Your name*"), event.attendeeName).as("name field holds attendee name"),
    fill(role("textbox", "Email address *"), event.attendeeEmail).as("fill attendee email"),
    assert.value(role("textbox", "Email address *"), event.attendeeEmail).as("email field holds attendee email"),
    click(role("button", "Confirm")).as("submit the booking"),
    assert.visible(role("heading", event.eventTitle)).as("event title heading renders on success page"),
  ]);
