# Zoom API Helper

Zoom API Helper is a Node.js package that provides a helper for simplifies managing meet.

# Prerequesite

- Create OAuth Zoom [click here](https://developers.zoom.us/docs/integrations/create/)

## Installation

To install the package, you can use npm:

```bash
npm install zoom-api-helper
```

## The Basic

### Create Meeting
```js
import { ZoomtHelper } from "zoom-api-helper";

let zoom = new ZoomtHelper(
  "<Zoom-Account-Id>",
  "<Zoom-Access-Token>",
  "<Timezone>"
)

let userId = "test@mail.com" // The user ID or email address of the user.
let topic = "test topic" 
let duration = 60 // in minutes
let startTime = "2023-07-11 16:00"

const zoomResponse = await zoom.createMeeting(userId, topic, duration, startTime)

let meetingId = zoomResponse.id;
let meetingPassword = zoomResponse.password;
let meetingJoinUrl = zoomResponse.join_url;

console.log(meetingId, "=> meeting id");
console.log(meetingPassword, "=> meeting pass");
console.log(meetingJoinUrl, "=> meeting url");
```

### Get Meetings
```js
const zoomResponse = await zoom.getMeetings(userId)

console.log(zoomResponse, ">>> response list meeting");
```
or we can add some params
```js
let params = {
  page_size: 50, 
  page_number: 1,
  next_page_token:  "",
  from:  "",
  to:  "" 
}
// we can see the detail params here: https://developers.zoom.us/docs/api/rest/reference/zoom-api/methods/#operation/meetings

const zoomResponse = await zoom.getMeetings(userId, params)

console.log(zoomResponse, ">>> response list meeting");
```

### Get Meeting by ID
```js
const zoomResponse = await zoom.getMeeting("<Meetind-ID>")

console.log(zoomResponse, ">>> response meeting");
```

### Update Meeting 
```js
const zoomResponse = await zoom.updateMeeting("<Meetind-ID>", "<Topic>", "<Duratoin>", "<Start-Time>")

console.log(zoomResponse, ">>> response meeting");
```

### Delete Meeting
```js
const zoomResponse = await zoom.deleteMeeting("<Meetind-ID>")

console.log(zoomResponse, ">>> response meeting");
```

### Get Meeting Participant 
```js
const zoomResponse = await zoom.getMeetingParticipants("<Meetind-ID>")

console.log(zoomResponse, ">>> response meeting");
```
or we can add some params
```js
const zoomResponse = await zoom.getMeetingParticipants("<Meetind-ID>", "<Page-Size>", "<Next-Page-Token>")
```