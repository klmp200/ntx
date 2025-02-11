<script lang="ts">
  import { Calendar } from "@fullcalendar/core/index.js";
  import { onMount } from "svelte";
  import frLocale from "@fullcalendar/core/locales/fr";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import googleCalendarPlugin from "@fullcalendar/google-calendar";
  import listPlugin from "@fullcalendar/list";
  import bootstrap5Plugin from "@fullcalendar/bootstrap5";
  import { GoogleCalendarConfig } from "../lib/config"

  let calendarContainer: HTMLDivElement;

  const isMobileView = () => window.innerWidth < 765;
  const getCurrentView = () => (isMobileView() ? "listMonth" : "dayGridMonth");
  const getCurrentToolbar = () => {
    if (isMobileView()) {
      return {
        left: "prev,next",
        center: "title",
        right: "",
      };
    }
    return {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,dayGridWeek,dayGridDay",
    };
  };

  onMount(() => {
    const calendar = new Calendar(calendarContainer, {
      plugins: [
        dayGridPlugin,
        listPlugin,
        googleCalendarPlugin,
        bootstrap5Plugin,
      ],
      locales: [frLocale],
      themeSystem: "bootstrap5",
      height: "auto",
      locale: "fr",
      initialView: getCurrentView(),
      headerToolbar: getCurrentToolbar(),
      googleCalendarApiKey: GoogleCalendarConfig.API_KEY,
      eventSources: [
        {
          googleCalendarId: GoogleCalendarConfig.CALENDARS.EVENTS,
          color: "#0d6efd",
        },
        {
          googleCalendarId: GoogleCalendarConfig.CALENDARS.LAN,
          color: "#43b98e",
        },
        {
          googleCalendarId: GoogleCalendarConfig.CALENDARS.CONVENTIONS,
          color: "#d27d87",
        },
        {
          googleCalendarId: GoogleCalendarConfig.CALENDARS.TWITCH,
          color: "#6441a5",
        },
      ],
      windowResize: () => {
        calendar.changeView(getCurrentView());
        calendar.setOption("headerToolbar", getCurrentToolbar());
      },
    });
    calendar.render();
  });
</script>

<div bind:this={calendarContainer}></div>
