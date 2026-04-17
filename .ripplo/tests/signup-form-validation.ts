import { click } from "@ripplo/testing/actions";
import { assert } from "@ripplo/testing/assert";
import { role, testId } from "@ripplo/testing/locators";

import ripplo from "../ripplo";

ripplo
  .test("signup-form-validation")
  .name("Signup email form renders required fields after clicking 'Continue with Email'")
  .requires({})
  .expectedOutcome("After clicking 'Continue with Email', the signup form shows a disabled submit button and the Username, Email, and Password fields")
  .startsAt(() => "/signup")
  .steps(() => [
    assert.visible(testId("continue-with-email-button")).as("continue-with-email button renders"),
    click(testId("continue-with-email-button")).as("click continue with email to reveal form"),
    assert.visible(testId("signup-emailfield")).as("email field renders"),
    assert.visible(testId("signup-passwordfield")).as("password field renders"),
    assert.disabled(testId("signup-submit-button")).as("submit button is disabled while fields are empty"),
  ]);
