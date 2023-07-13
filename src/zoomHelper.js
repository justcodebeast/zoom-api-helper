import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
dayjs.extend(utc);
dayjs.extend(timezone);

export default class ZoomHelper {
  #zoomAccountId
  #zoomAccessToken

  constructor(zoomAccountId, zoomAccessToken, timezone = "UTC", zoomBaseUrl = "https://zoom.us/v2") {
    this.#zoomAccountId = zoomAccountId
    this.#zoomAccessToken = zoomAccessToken
    this.timezone = timezone
    this.zoomBaseUrl = zoomBaseUrl
  }

  async generateToken() {
    try {
      const { data } = await axios.post("https://zoom.us/oauth/token", "", {
        params: {
          grant_type: "account_credentials",
          account_id: this.#zoomAccountId,
        },
        headers: {
          Authorization: `Basic ${this.#zoomAccessToken}`,
        },
      });

      return data;
    } catch (err) {
      throw err;
    }
  }

  async createMeeting(userId, topic, duration, startTime) {
    try {
      const token = await this.generateToken();

      const startTimeFormatted = this.formatDate(startTime)
      
      const { data } = await axios({
        url: `${this.zoomBaseUrl}/users/${userId}/meetings`,
        method: "POST",
        data: {
          topic,
          agenda: topic,
          duration: duration ? duration : 60,
          start_time: startTimeFormatted,
          timezone: this.timezone,
          join_before_host: true,
          waiting_room: false,
          type: 2,
          pre_schedule: false,
          default_password: true,
          jbh_time: 0,
        },
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      });

      return data;
    } catch (err) {
      throw err;
    }
  }

  async getMeetings(userId, params) {
    try {
      const token = await this.generateToken();

      const options = { 
        page_size: params?.page_size || 50, 
        page_number: params?.page_number || 1,
        next_page_token: params?.next_page_token ||  "",
        from: params?.from ||  "",
        to: params?.to ||  "" 
      }

      const { data } = await axios({
        method: "GET",
        url: `${this.zoomBaseUrl}/users/${userId}/meetings`,
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
        params: options,
      });

      return data;
    } catch (err) {
      throw err;
    }
  }

  async getMeeting(meetingId) {
    try {
      if (!meetingId) throw { msg: "meetingId is required" };

      const token = await this.generateToken();

      const { data } = await axios({
        method: "GET",
        url: `${this.zoomBaseUrl}/meetings/${meetingId}`,
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      });

      return data;
    } catch (err) {
      throw err;
    }
  }

  async updateMeeting(meetingId, topic, duration, startTime) {
    try {
      const token = await this.generateToken();
      
      const startTimeFormatted = this.formatDate(startTime)

      const { data } = await axios({
        url: `${this.zoomBaseUrl}/meetings/${meetingId}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
        data: {
          topic,
          agenda: topic,
          duration: duration ? duration : 60,
          start_time: startTimeFormatted,
          timezone: this.timezone,
        },
      });

      return data;
    } catch (err) {
      throw err;
    }
  }

  formatDate(startTime) {
    return dayjs
              .tz(startTime, this.timezone)
              .format("YYYY-MM-DDThh:mm:ss")
  }

}