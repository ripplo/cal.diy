import ripplo from "../ripplo";

export const dataSignupCandidate = ripplo
  .precondition("data:signup-candidate")
  .description("Unique username/email/password for a signup form submission; teardown deletes the created user")
  .contract<{ username: string; email: string; password: string }>();
