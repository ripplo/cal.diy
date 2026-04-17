import { assert } from "@ripplo/testing/assert";
import { role, testId } from "@ripplo/testing/locators";

import ripplo from "../ripplo";

ripplo
  .test("public-booking-page-not-found")
  .name("Public booking page for a nonexistent user shows 404")
  .requires({})
  .expectedOutcome("The 404 page renders with the 'This page does not exist.' heading")
  .startsAt(() => "/ripplo-missing-user-xyz123/anything")
  .steps(() => [
    assert.visible(testId("404-page")).as("404 page container is visible"),
    assert.visible(role("heading", "This page does not exist.")).as("not-found heading renders"),
  ]);
