const input = document.getElementById("search");
const buttonInput = document.getElementById("buttonSearch");
const sectionInfoProfile = document.querySelector(".section-infos-profile");
const modeTheme = document.querySelector(".mode-theme a");
const aviso = document.querySelector(".aviso");

async function userProfile(userName) {
  try {
    const rep = await fetch(`https://api.github.com/users/${userName}`);
    const data = await rep.json();
		
    if (rep.ok) {
      sectionInfoProfile.style.display = "block";
      aviso.classList.remove("active");

      const object = {
        avatar: data.avatar_url,
        name: `${data.name}`,
        user: data.login,
        url: data.html_url,
        creatData: data.created_at.slice(0, 10),
        bio: data.bio,
        followers: data.followers,
        following: data.following,
        repPublic: data.public_repos,
        location: data.location,
        blog: data.blog,
        twitter: data.twitter_username,
        company: data.company,
      };

      mountedUserHtml(object);
    } else {
      sectionInfoProfile.style.display = "none";

      const avisoAlreadyExists = document.querySelector(".aviso.active p");
			avisoAlreadyExists?.remove();

      const paragraph = document.createElement("p");
      const spanNameUserNotFound = document.createElement("span");

      paragraph.innerHTML = `Not Found `;
      spanNameUserNotFound.innerText = `${userName}`;

      aviso.append(paragraph);
      paragraph.appendChild(spanNameUserNotFound);
      aviso.classList.add("active");
    }
  } catch (error) {}
}

function mountedUserHtml(object) {
  // maker card info
  sectionInfoProfile.querySelector(".img-avatar img").src = object.avatar;
  sectionInfoProfile.querySelector(".name-data .name-at h3").innerHTML =
    object.name;
  sectionInfoProfile
    .querySelector(".name-data .name-at a")
    .setAttribute("href", object.url);
  sectionInfoProfile.querySelector(
    ".name-data .name-at a"
  ).innerHTML = `@${object.user}`;
  sectionInfoProfile.querySelector(
    ".name-data .data span"
  ).innerHTML = ` jonied ${object.creatData}`;
  sectionInfoProfile.querySelector(".statistics-bio .bio p").innerHTML =
    object.bio;
  sectionInfoProfile.querySelector(".statistics-profile #repos").innerHTML =
    object.repPublic;
  sectionInfoProfile.querySelector(".statistics-profile #followers").innerHTML =
    object.followers;
  sectionInfoProfile.querySelector(".statistics-profile #following").innerHTML =
    object.following;
  sectionInfoProfile.querySelector(".socias .socias-icons #location").innerHTML =
    object.location;
  sectionInfoProfile
    .querySelector(".socias .socias-icons #blog")
    .setAttribute("href", object.blog);

  sectionInfoProfile.querySelector(".socias .socias-icons #blog").innerHTML =
    object.blog;
  sectionInfoProfile
    .querySelector(".socias .socias-icons #company")
    .setAttribute("href", object.company);
  sectionInfoProfile.querySelector(
    ".socias .socias-icons #company"
  ).innerHTML = `${object.company}`;
  sectionInfoProfile
    .querySelector(".socias .socias-icons #twitter")
    .setAttribute("href", `https://twitter.com/${object.twitter}`);
  sectionInfoProfile.querySelector(
    ".socias .socias-icons #twitter"
  ).innerHTML = `@${object.twitter}`;
}

window.addEventListener("load", () => {
  userProfile("EnriqueSantos-dev");
  const theme = window.localStorage.getItem("theme");
  if (theme === "light") {
    modeTheme.querySelector("span").innerHTML = "dark";
    modeTheme.querySelector("i").classList.remove("bx-sun");
    modeTheme.querySelector("i").classList.add("bxs-moon");
  } else {
    modeTheme.querySelector("span").innerHTML = "light";
    modeTheme.querySelector("i").classList.remove("bxs-moon");
    modeTheme.querySelector("i").classList.add("bx-sun");
  }
  document.querySelector("html").classList.add(theme);
});

input.addEventListener("keyup", (event) => {
  const valueInput = event.target.value.trim();
  if (valueInput && event.key === "Enter") {
    userProfile(valueInput);
    return;
  }

  sectionInfoProfile.style.display = "none";
});

buttonInput.addEventListener("click", () => {
  if (input.value !== "") {
    userProfile(input.value);
  }
});

modeTheme.addEventListener("click", (e) => {
  document.querySelector("html").classList.toggle("dark");
  if (document.querySelector("html").classList.contains("dark")) {
    modeTheme.querySelector("span").innerHTML = "light";
    modeTheme.querySelector("i").classList.remove("bxs-moon");
    modeTheme.querySelector("i").classList.add("bx-sun");
    window.localStorage.setItem("theme", "dark");
  } else {
    modeTheme.querySelector("span").innerHTML = "dark";
    modeTheme.querySelector("i").classList.remove("bx-sun");
    modeTheme.querySelector("i").classList.add("bxs-moon");
    window.localStorage.setItem("theme", "light");
  }
});
