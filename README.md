# Zoom API Helper

Zoom API Helper is a Node.js package that provides a helper for simplifies managing meet.

# Prerequesite

- Create OAuth Zoom [click here](https://developers.zoom.us/docs/integrations/create/)

## The Basic
```js
import ZoomtHelper from "zoom-api-helper";

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