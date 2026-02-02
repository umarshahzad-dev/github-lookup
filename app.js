import { fetchUser, fetchTopRepos } from "./api.js";

function getUIElements() {
    return {
        usernameInput: document.getElementById("usernameInput"),
        searchBtn: document.getElementById("searchBtn"),
        message: document.getElementById("message"),
        avatar: document.getElementById("avatar"),
        name: document.getElementById("name"),
        bio: document.getElementById("bio"),
        followers: document.getElementById("followers"),
        profileSection: document.getElementById("profile"),
        reposSection: document.getElementById("repos"),
        repoList: document.getElementById("repoList"),
    };
}


const ui = getUIElements();



async function renderUser(username) {
    try {
        const userData = await fetchUser(username);

        ui.avatar.src = userData.avatar_url;
        ui.avatar.alt = `${username}'s avatar`;
        ui.name.textContent = userData.name || username;
        ui.bio.textContent = userData.bio || "No bio available";
        ui.followers.textContent = `Followers: ${userData.followers}`;

        ui.profileSection.hidden = false;
    } catch (error) {
        throw error;
    }
}


async function renderRepos(username) {
    ui.repoList.innerHTML = "";

    const repoData = await fetchTopRepos(username);

    repoData.forEach(repo => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        const span = document.createElement("span");

        a.href = repo.html_url;
        a.textContent = repo.name;
        a.target = "_blank";

        span.textContent = ` ⭐ ${repo.stargazers_count}`;

        li.appendChild(a);
        li.appendChild(span);
        ui.repoList.appendChild(li);
    });

    ui.reposSection.hidden = false;
}


async function handleSearch() {
    const username = ui.usernameInput.value.trim();

    if (!username) {
        ui.message.textContent = "Please enter a GitHub username";
        return;
    }

    ui.message.textContent = "Loading...";
    ui.profileSection.hidden = true;
    ui.reposSection.hidden = true;

    try {
        await renderUser(username);
        await renderRepos(username);
        ui.message.textContent = "";
    } catch (error) {
        ui.message.textContent = `Error: ${error.message}`;
    }
}

function initialize() {
    ui.searchBtn.addEventListener("click", handleSearch);
}

initialize();
