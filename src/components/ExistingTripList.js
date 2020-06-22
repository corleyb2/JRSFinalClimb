import React from "react";

export default function ExistingTripList({ listUpcomingTrips }) {
  console.log("listUpcoming on ExistingTripList component", listUpcomingTrips);

  return (
    <div>
      {listUpcomingTrips &&
        listUpcomingTrips.map((trip) => (
          <div key={trip._id}>
            <h3>{trip && trip.location}</h3>
            <p>
              {trip.dateRange && trip.dateRange.start} to{" "}
              {trip.dateRange && trip.dateRange.end}
            </p>
            <button>Join!</button>
          </div>
        ))}
    </div>
  );
}
