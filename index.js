const COHORT = "2308-ACC-ET-WEB-PT-B";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  events: [],
};

const EventList = document.querySelector("#events");

const addEventsForm = document.querySelector("#addEvents");
addEventsForm.addEventListener("submit", addEvents);

/**
 * Sync state with the API and rerender
 */
async function render() {
  await getEvents();
  renderEvents();
}
render();

/**
 * Update state with events from API
 */
async function getEvents() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.events = json.data;
    console.log(json)
    console.log(state)
    console.log(state.events)
  } catch (error) {
    console.error(error);
  }
}

/**
 * Render events from state
 */
function renderEvents() {
  if (!state.events.length) {
    EventsList.innerHTML = "<li>No Events.</li>";
    return;
  }

  const eventCards = state.events.map((event) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h2>${event.name}</h2>
      <p>Location: ${event.location}</p>
      <p>Date: ${event.date}</p>
      <p>Description: ${event.description}</p>
      <button>Delete</button>
    `;
    return li;
  });

  EventList.replaceChildren(...eventCards);
}

/**
 * Ask the API to create a new Event based on form data
 * @param {Event} event
 */
async function addEvents(event) {
  event.preventDefault();
    console.log(event)
    console.log(addEventsForm.name.value)
    console.log(addEventsForm.description.value)
    console.log(addEventsForm.date.value)
    console.log(addEventsForm.location.value)
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addEventsForm.name.value,
        // description: addEventsForm.description.value,
        // date: addEventsForm.date.value,
        // location: addEventsForm.location.value,  
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create Event");
    }

    render();
  } catch (error) {
    console.error(error);
  }
}
// Add Delete Function