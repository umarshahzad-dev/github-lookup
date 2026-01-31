const usernameInput = document.getElementById("usernameInput");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");
const avatar = document.getElementById("avatar");
const name = document.getElementById("name");
const bio = document.getElementById("bio");
const followers = document.getElementById("followers");
const profileSection = document.getElementById("profile");
const reposSection = document.getElementById("repos");
const repoList = document.getElementById("repoList");


searchBtn.addEventListener("click", getUserProfile);

async function getUserProfile() {
    const username = usernameInput.value.trim();

    if (!username)
    {
        message.textContent = "Please enter a Github username";
        return;
    }

    message.textContent = "Loading..."
    try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);

        if (!userResponse.ok)
        {
            throw new Error("User not found");
        }

        const userData = await userResponse.json();

        message.textContent = "";
        console.log(userData);

        avatar.src = userData.avatar_url;
        avatar.alt = `${username}'s avatar`;
        name.textContent = userData.name || username;
        bio.textContent = userData.bio || "No bio available";
        followers.textContent = `Followers: ${userData.followers}`;

        profileSection.hidden = false;

        const reposResponse = await fetch(
        `https://api.github.com/search/repositories?q=user:${username}&sort=stars&order=desc&per_page=5`
        );

        const reposData = await reposResponse.json();
        const topRepos = reposData.items;

        repoList.innerHTML = "";

        topRepos.forEach(repo => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            const span = document.createElement("span");
            
            link.href = repo.html_url;
            link.textContent = repo.name;
            link.target = "_blank";
            link.className = "text-blue-400 hover:underline";
            
            span.textContent = ` ⭐ ${repo.stargazers_count}`;
            span.className = "text-sm text-gray-400 ml-2";
            
            listItem.appendChild(link);
            listItem.appendChild(span);
            repoList.appendChild(listItem);
        });
        
        reposSection.hidden = false;

    } catch (error) {
        message.textContent = `Error: ${error.message}`;
        profileSection.hidden = true;
        reposSection.hidden = true;
    }
}