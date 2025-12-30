import { useEffect, useState } from "react";
import api from "../services/api";
import EventsTable from "../components/EventsTable";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/events")
      .then((res) => setEvents(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Events</h1>
      <EventsTable events={events} />
    </div>
  );
};

export default Events;