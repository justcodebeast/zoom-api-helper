import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
dayjs.extend(utc);
dayjs.extend(timezone);

export class ZoomHelper {
  private zoomAccountId: string;
  private zoomAccessToken: string;
  public timezone: string;
  public zoomBaseUrl: string;

  public constructor(zoomAccountId: string, zoomAccessToken: string, timezone: string = "UTC", zoomBaseUrl: string = "https://zoom.us/v2") {
    this.zoomAccountId = zoomAccountId;
    this.zoomAccessToken = zoomAccessToken;
    this.timezone = timezone;
    this.zoomBaseUrl = zoomBaseUrl;
  }

  public async generateToken() {
    try {
      const { data } = await axios.post("https://zoom.us/oauth/token", "", {
        params: {
          grant_type: "account_credentials",
          account_id: this.zoomAccountId,
        },
        headers: {
          Authorization: `Basic ${this.zoomAccessToken}`,
        },
      });

      return data;
    } catch (err) {
      throw err;
    }
  }

  public async createMeeting(userId: string, topic: string, duration: number, startTime: string) {
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

  formatDate(startTime: string) {
    return dayjs
              .tz(startTime, this.timezone)
              .format("YYYY-MM-DDThh:mm:ss")
  }

}