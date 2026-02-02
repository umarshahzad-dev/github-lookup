import { CONFIG } from "./config.js";

export async function fetchUser(username) {
    const response = await fetch(`${CONFIG.BASE_URL}/${username}`);

    if (!response.ok) {
        throw new Error("User not found");
    }

    return response.json();
}

export async function fetchTopRepos(username) {
    const response = await fetch(
        `${CONFIG.REPO_SEARCH_URL}?q=user:${username}&sort=stars&order=desc&per_page=${CONFIG.TOP_REPOS_LIMIT}`
    );

    if (!response.ok) {
        throw new Error("Repositories not found");
    }

    const data = await response.json();
    return data.items;
}
