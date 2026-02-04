import { fetchUser, fetchTopRepos } from "./api.js";

function getUIElements() {
    return {
        usernameInput: document.getElementById("usernameInput"),
        searchBtn: document.getElementById("searchBtn"),
        message: document.getElementById("message"),
        avatar: document.getElementById("avatar"),
        name: document.getElementById("name"),
        username: document.getElementById("username"),
        bio: document.getElementById("bio"),
        followers: document.getElementById("followers"),
        following: document.getElementById("following"),
        repoCount: document.getElementById("repoCount"),
        profileLink: document.getElementById("profileLink"),
        profileSection: document.getElementById("profile"),
        reposSection: document.getElementById("repos"),
        repoList: document.getElementById("repoList"),
    };
}

const ui = getUIElements();

function showMessage(text, type) {
    ui.message.textContent = text;
    ui.message.className = `status ${type}`;
    ui.message.hidden = false;
}

function hideMessage() {
    ui.message.hidden = true;
    ui.message.className = "status";
}

function renderUserData(userData, username) {
    ui.avatar.src = userData.avatar_url;
    ui.avatar.alt = `${username}'s avatar`;
    ui.name.textContent = userData.name || username;
    ui.username.textContent = `@${userData.login}`
    ui.bio.textContent = userData.bio || "No bio available";
    ui.followers.textContent = userData.followers.toLocaleString();
    ui.following.textContent = userData.following.toLocaleString();
    ui.repoCount.textContent = userData.public_repos.toLocaleString();
    ui.profileLink.href = userData.html_url;

    ui.profileSection.hidden = false;
}

function renderRepoData(repoData) {
    ui.repoList.innerHTML = "";

    repoData.forEach(repo => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        const nameSpan = document.createElement("span");
        const starSpan = document.createElement("span");

        a.href = repo.html_url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.classList.add("repo-card");

        nameSpan.textContent = repo.name;
        starSpan.textContent = `⭐ ${repo.stargazers_count.toLocaleString()}`;

        a.appendChild(nameSpan);
        a.appendChild(starSpan);
        li.appendChild(a);
        ui.repoList.appendChild(li);
    });

    ui.reposSection.hidden = false;
}

async function handleSearch() {
    const username = ui.usernameInput.value.trim();

    if (!username) {
        showMessage("Please enter a GitHub username", "error");
        return;
    }

    showMessage("Fetching profile...", "loading");

    ui.profileSection.hidden = true;
    ui.reposSection.hidden = true;
    ui.searchBtn.disabled = true;

    try {
        const [userData, repoData] = await Promise.all([
            fetchUser(username),
            fetchTopRepos(username)
        ]);

        renderUserData(userData, username);
        renderRepoData(repoData);
        hideMessage();

    } catch (error) {
        showMessage(error.message, "error");
    } finally {
        ui.searchBtn.disabled = false;
    }
}

function initialize() {
    ui.searchBtn.addEventListener("click", handleSearch);

    ui.usernameInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    });
}

initialize();
