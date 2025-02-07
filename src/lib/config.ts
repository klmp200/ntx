  import {
    PUBLIC_GOOGLE_CALENDAR_API_KEY,
    PUBLIC_GOOGLE_CALENDAR_EVENTS,
    PUBLIC_GOOGLE_CALENDAR_LAN,
    PUBLIC_GOOGLE_CALENDAR_CONVENTIONS,
    PUBLIC_GOOGLE_CALENDAR_TWITCH,
  } from "$env/static/public";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class GoogleCalendarConfig {
	public static readonly API_KEY = PUBLIC_GOOGLE_CALENDAR_API_KEY ?? "UNDEFINED";
	public static readonly CALENDARS = {
		EVENTS: PUBLIC_GOOGLE_CALENDAR_EVENTS ?? null,
		LAN: PUBLIC_GOOGLE_CALENDAR_LAN ?? null,
		CONVENTIONS: PUBLIC_GOOGLE_CALENDAR_CONVENTIONS ?? null,
		TWITCH: PUBLIC_GOOGLE_CALENDAR_TWITCH ?? null,
	};
}