"use server";
import { createId } from '@/utils/helpers';
import { google } from 'googleapis';
import { getIntegrationBy } from '../integration';

type Credentials = typeof google.auth.OAuth2.prototype.credentials;

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL,
);

export async function generateGoogleMeetAuthLink({ state }: { state: string }) {
  const scopes = [
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/calendar'
  ];
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state
  });
  return url;
}

export async function validateGoogleAuth(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

export async function generateGoogleMeetLink(payload: {
  summary: string,
  date: string,
  meetingTime: number,
  orgId: string,
  attendees: string[],
}) {
  const { metadata } = await getIntegrationBy({
    type: "google_meet",
    org_id: payload.orgId 
  });
  const { tokens } = (metadata || {}) as { tokens: Credentials };
  oauth2Client.setCredentials(tokens);

  // Generate Google Meet link
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  const response = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: {
      summary: payload?.summary || 'Google Meet Meeting',
      conferenceData: {
        createRequest: {
          requestId: createId(),
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      start: { dateTime: new Date(payload.date).toISOString() },
      end: { dateTime: new Date(new Date(payload.date).getTime() + payload.meetingTime).toISOString() }, // min meeting
      attendees: payload.attendees.map(email => ({ email })),
    },
    conferenceDataVersion: 1,
    sendUpdates: 'all',
  });

  return response.data.hangoutLink;
}