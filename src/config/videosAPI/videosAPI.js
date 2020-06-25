import { videosAPIKey } from "../config";
const videosSearchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${videosAPIKey}`;

export default videosSearchUrl;
