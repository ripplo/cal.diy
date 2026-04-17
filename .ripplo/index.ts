// Register every precondition and test here. The CLI loads this one file —
// anything not imported from here is invisible to ripplo run / lint / status.
// When you add a test under ./tests or a precondition under ./preconditions,
// add a matching `import "./..."` line below.

export { default } from "./ripplo";

import "./preconditions/dataPublicEventType";
import "./preconditions/dataSignupCandidate";
import "./tests/view-public-booking-page";
import "./tests/pick-slot-on-public-booking-page";
import "./tests/book-30min-slot-end-to-end";
import "./tests/public-booking-page-not-found";
import "./tests/public-profile-lists-event-types";
import "./tests/signup-form-validation";
import "./tests/signup-creates-account";
