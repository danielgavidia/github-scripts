import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

if (!GITHUB_TOKEN) {
  console.error("Error: GITHUB_TOKEN is not set in the .env file.");
  process.exit(1);
}

const getPullRequests = async () => {
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  ).toISOString();

  const response = await axios.get(`${GITHUB_API_URL}/search/issues`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
    params: {
      q: `type:pr author:${GITHUB_USERNAME} created:${startOfDay}..${endOfDay}`,
      sort: "created",
      order: "desc",
    },
  });

  return response.data.items;
};

getPullRequests()
  .then((pullRequests) => {
    console.log(pullRequests);
  })
  .catch((error) => {
    console.error("Error fetching pull requests:", error);
  });
