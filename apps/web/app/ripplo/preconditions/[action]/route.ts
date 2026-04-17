import { createNextHandler } from "@ripplo/testing/nextjs";

import ripplo from "../../../../../../.ripplo/ripplo";
import { dataPublicEventType } from "../../../../../../.ripplo/preconditions/dataPublicEventType";
import { dataSignupCandidate } from "../../../../../../.ripplo/preconditions/dataSignupCandidate";

ripplo.implement(dataPublicEventType, {
  setup: async (ctx) => {
    const { default: prisma } = await import("@calcom/prisma");

    const usernameTv = ctx.uniqueId("user");
    const emailTv = ctx.uniqueEmail();
    const username = (usernameTv as unknown as { value: string }).value.toLowerCase();
    const email = (emailTv as unknown as { value: string }).value;
    const eventSlug = "thirty-min";
    const eventTitle = "Ripplo Thirty Minute Meeting";

    const user = await prisma.user.create({
      data: {
        username,
        email,
        name: username,
        timeZone: "UTC",
        locale: "en",
        completedOnboarding: true,
        schedules: {
          create: {
            name: "Working Hours",
            timeZone: "UTC",
            availability: {
              create: {
                days: [1, 2, 3, 4, 5],
                startTime: new Date("1970-01-01T09:00:00.000Z"),
                endTime: new Date("1970-01-01T17:00:00.000Z"),
              },
            },
          },
        },
      },
      select: { id: true, schedules: { select: { id: true } } },
    });

    const scheduleId = user.schedules[0]?.id;
    if (scheduleId) {
      await prisma.user.update({ where: { id: user.id }, data: { defaultScheduleId: scheduleId } });
    }

    await prisma.eventType.create({
      data: {
        title: eventTitle,
        slug: eventSlug,
        length: 30,
        userId: user.id,
        users: { connect: { id: user.id } },
        ...(scheduleId ? { scheduleId } : {}),
      },
      select: { id: true },
    });

    await prisma.eventType.create({
      data: {
        title: "Ripplo Fifteen Minute Meeting",
        slug: "fifteen-min",
        length: 15,
        userId: user.id,
        users: { connect: { id: user.id } },
        ...(scheduleId ? { scheduleId } : {}),
      },
      select: { id: true },
    });

    const attendeeName = `Ripplo Guest ${ctx.runId.slice(0, 6)}`;
    const attendeeEmail = `ripplo-guest-${ctx.runId}@test.ripplo.ai`;

    return {
      username: ctx.fixed(username),
      eventSlug: ctx.fixed(eventSlug),
      eventTitle: ctx.fixed(eventTitle),
      attendeeName: ctx.fixed(attendeeName),
      attendeeEmail: ctx.fixed(attendeeEmail),
    };
  },
  teardown: async (ctx) => {
    const { default: prisma } = await import("@calcom/prisma");
    const { username } = ctx.data as { username: string };
    await prisma.user.deleteMany({ where: { username } });
  },
});

ripplo.implement(dataSignupCandidate, {
  setup: async (ctx) => {
    const usernameTv = ctx.uniqueId("signup");
    const emailTv = ctx.uniqueEmail();
    const username = (usernameTv as unknown as { value: string }).value.toLowerCase();
    const email = (emailTv as unknown as { value: string }).value;
    const password = "RipploTest123!";
    return {
      username: ctx.fixed(username),
      email: ctx.fixed(email),
      password: ctx.fixed(password),
    };
  },
  teardown: async (ctx) => {
    const { default: prisma } = await import("@calcom/prisma");
    const { username, email } = ctx.data as { username: string; email: string };
    await prisma.user.deleteMany({ where: { OR: [{ username }, { email }] } });
  },
});

export const PUT = createNextHandler({
  enabled: process.env.ENABLE_RIPPLO_TESTING === "true",
  ripplo,
});
