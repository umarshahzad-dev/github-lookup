export async function fetchUser(username) {
    const response = await fetch(`${CONFIG.BASE_URL}/${username}`);
    return handleResponse(response);
}

export async function fetchTopRepos(username) {
    const response = await fetch(
        `${CONFIG.REPO_SEARCH_URL}?q=user:${username}&sort=stars&order=desc&per_page=${CONFIG.TOP_REPOS_LIMIT}`
    );
    const data = await handleResponse(response);
    return data.items;
}

async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 404) {
            throw new Error("Resource not found");
        }

        if (response.status === 403) {
            throw new Error(errorData.message || "Rate limit exceeded");
        }

        throw new Error(`HTTP ${response.status}: ${errorData.message}`);
    }

    return response.json();
}
