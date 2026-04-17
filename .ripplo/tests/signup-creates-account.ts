import { click, fill } from "@ripplo/testing/actions";
import { assert } from "@ripplo/testing/assert";
import { role, testId } from "@ripplo/testing/locators";

import { dataSignupCandidate } from "../preconditions/dataSignupCandidate";
import ripplo from "../ripplo";

ripplo
  .test("signup-creates-account")
  .name("Signup form creates a new account with valid input")
  .requires({ candidate: dataSignupCandidate })
  .expectedOutcome("After submitting a valid signup, the submit button is no longer on the signup page (navigation away from /signup)")
  .startsAt(() => "/signup")
  .steps(({ candidate }) => [
    click(testId("continue-with-email-button")).as("reveal the email signup form"),
    assert.visible(testId("signup-usernamefield")).as("username field renders"),
    fill(testId("signup-usernamefield"), candidate.username).as("fill username"),
    assert.value(testId("signup-usernamefield"), candidate.username).as("username field holds the candidate username"),
    fill(testId("signup-emailfield"), candidate.email).as("fill email"),
    assert.value(testId("signup-emailfield"), candidate.email).as("email field holds the candidate email"),
    fill(testId("signup-passwordfield"), candidate.password).as("fill password"),
    assert.enabled(testId("signup-submit-button")).as("submit button is enabled after filling fields"),
    click(testId("signup-submit-button")).as("submit the signup form"),
    assert.not.visible(testId("signup-submit-button")).as("signup submit button is gone after successful signup"),
  ]);
