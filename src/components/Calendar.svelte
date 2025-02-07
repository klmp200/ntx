<script lang="ts">
import { Calendar } from "@fullcalendar/core/index.js";
import { onMount } from "svelte";
import frLocale from "@fullcalendar/core/locales/fr";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";

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
    plugins: [dayGridPlugin, listPlugin],
    locales: [frLocale],
    height: "auto",
    locale: "fr",
    initialView: getCurrentView(),
    headerToolbar: getCurrentToolbar(),
    windowResize: () => {
      calendar.changeView(getCurrentView());
      calendar.setOption("headerToolbar", getCurrentToolbar());
    },
  });
  calendar.render();
});
</script>

<div bind:this={calendarContainer}></div>