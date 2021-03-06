/*Author: Erica Purpose: Creates functions to get event list,
use the event list, delete an event, save a new event
Dispatches save event, which is listened for in EventList
*/

//importing weather modules to use when rendering events
// import { getWeather, useWeather } from "../weather/WeatherProvider"

//designates eventHub where outputs will be sent or displayed
const eventHub = document.querySelector(".container")

//disptaches newEventSaved to eventHub, listened for in EventList
const dispatchSaveEvent = () => {
    const eventSavedCustomEvent = new CustomEvent("newEventSaved")
    //dispatches new event to the eventHub
    eventHub.dispatchEvent(eventSavedCustomEvent)
}

//create empty array to hold events
let events = []

//gets events from server, parses responses into json
//creates events from parsed events
export const getEvents = () => {
    return fetch('http://localhost:8088/events')
    .then(response => response.json())
    .then(parsedEvents => {
        events = parsedEvents
    })
}

//creates a usable copy of events
export const useEvents = () => {
    return events.slice()
}

//saves event onto DOM
export const saveEvent = (event) => {
    //gets events currently saved on DOM
    return fetch('http://localhost:8088/events', {
        //POST event object to API
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    })
    //gets all events from API and weather 
    .then(getEvents)
    // .then(getWeather)
    //dispatch state change event to eventHub that events has been updated
    .then(dispatchSaveEvent)
}

//deletes event from API
export const deleteEvent = id => {
    return fetch(`http://localhost:8088/events/${id}`, {
        method: "DELETE"
    })
    .then(getEvents)
}