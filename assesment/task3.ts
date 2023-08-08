/*
Task:
The businessmen among you will know that it's often not easy to find an appointment. In this
task we want to find such an appointment automatically. You will be given the calendars of
our businessmen and a duration for the meeting. Your task is to find the earliest time, when
every businessman is free for at least that duration.

Requirements:
* All times in the calendars will be given in 24h format "hh:mm", the result must also be in
that format
* A meeting is represented by its start time (inclusively) and end time (exclusively) -> if a
meeting takes place from 09:00 - 11:00, the next possible start time would be 11:00
* The businessmen work from 09:00 (inclusively) - 19:00 (exclusively), the appointment
must start and end within that range
* If the meeting does not fit into the schedules, return null
The duration of the meeting will be provided as an integer in minutes
* Following these rules and looking at the example below the earliest time for a 60 minutes
meeting would be 12:15.

Data Format:
The schedule will be provided as 3-dimensional array.
*/

// Solution
function findEarliestMeetingTime(schedules, duration) {
  const workStart = '09:00'
  const workEnd = '19:00'

  // Convert schedules to an array of busy time ranges for each businessman
  const busyRanges = schedules.map((personSchedule) =>
    personSchedule.map((meeting) => [meeting[0], meeting[1]])
  )

  // Loop through time slots and find earliest suitable time
  let currentSlot = workStart
  while (currentSlot <= subtractMinutes(workEnd, duration)) {
    const slotEnd = addMinutes(currentSlot, duration)
    const overlaps = busyRanges.some((personRanges) =>
      personRanges.some(
        (range) =>
          (currentSlot >= range[0] && currentSlot < range[1]) ||
          (slotEnd > range[0] && slotEnd <= range[1])
      )
    )

    if (!overlaps) {
      return currentSlot
    }

    currentSlot = addMinutes(currentSlot, 15) // Move to the next slot
  }

  return null // No suitable slot found
}

// Helper functions to work with time
function subtractMinutes(time, minutes) {
  const [hours, mins] = time.split(':').map(Number)
  const totalMinutes = hours * 60 + mins - minutes
  const newHours = Math.floor(totalMinutes / 60)
  const newMins = totalMinutes % 60
  return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`
}

function addMinutes(time, minutes) {
  const [hours, mins] = time.split(':').map(Number)
  const totalMinutes = hours * 60 + mins + minutes
  const newHours = Math.floor(totalMinutes / 60)
  const newMins = totalMinutes % 60
  return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`
}

// Example schedules
const schedules = [
  [
    ['09:00', '11:30'],
    ['13:30', '16:00'],
    ['16:00', '17:30'],
    ['17:45', '19:00'],
  ],
  [
    ['09:15', '12:00'],
    ['14:00', '16:30'],
    ['17:00', '17:30'],
  ],
  [
    ['11:30', '12:15'],
    ['15:00', '16:30'],
    ['17:45', '19:00'],
  ],
]

const duration = 60 // Meeting duration in minutes
const earliestTime = findEarliestMeetingTime(schedules, duration)
console.log(earliestTime) // Output: "12:15"

/*
Explanation:
  This implementation calculates the earliest time slot for a meeting of the given duration that fits all businessmen's schedules.
  It uses helper functions to handle time calculations and iterates through time slots with 15-minute intervals.
*/
