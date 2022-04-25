const input = document.getElementById('search'),
	buttonInput = document.getElementById('buttonSearch'),
	sectioInfoProfile = document.querySelector('.section-infos-profile'),
	modeTheme = document.querySelector('.mode-theme a'),
	aviso = document.querySelector('.aviso');

async function userProfile(userName) {
	try {
		let rep = await fetch(`https://api.github.com/users/${userName}`);
		let data = await rep.json();
		if (data.message != 'Not Found') {
			sectioInfoProfile.style.display = 'block';
			aviso.classList.remove('active');

			let object = {
				avatar: data.avatar_url,
				name: `${data.name.split(' ')[0] + ' ' + data.name.split(' ')[1]}`,
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

			// maker card info
			sectioInfoProfile.querySelector('.img-avatar img').src = object.avatar;
			sectioInfoProfile.querySelector('.name-data .name-at h3').innerHTML = object.name;
			sectioInfoProfile.querySelector('.name-data .name-at a').setAttribute('href', object.url);
			sectioInfoProfile.querySelector('.name-data .name-at a').innerHTML = `@${object.user}`;
			sectioInfoProfile.querySelector(
				'.name-data .data span'
			).innerHTML = ` jonied ${object.creatData}`;
			sectioInfoProfile.querySelector('.statistics-bio .bio p').innerHTML = object.bio;
			sectioInfoProfile.querySelector('.statistics-profile #repos').innerHTML = object.repPublic;
			sectioInfoProfile.querySelector('.statistics-profile #followers').innerHTML =
				object.followers;
			sectioInfoProfile.querySelector('.statistics-profile #following').innerHTML =
				object.following;
			sectioInfoProfile.querySelector('.socias .socias-icons #location').innerHTML =
				object.location;
			sectioInfoProfile
				.querySelector('.socias .socias-icons #blog')
				.setAttribute('href', object.blog);

			sectioInfoProfile.querySelector('.socias .socias-icons #blog').innerHTML = object.blog;
			sectioInfoProfile
				.querySelector('.socias .socias-icons #company')
				.setAttribute('href', object.company);
			sectioInfoProfile.querySelector(
				'.socias .socias-icons #company'
			).innerHTML = `${object.company}`;
			sectioInfoProfile
				.querySelector('.socias .socias-icons #twitter')
				.setAttribute('href', `https://twitter.com/${object.twitter}`);
			sectioInfoProfile.querySelector(
				'.socias .socias-icons #twitter'
			).innerHTML = `@${object.twitter}`;
		} else {
			sectioInfoProfile.style.display = 'none';
			aviso.innerHTML = `Not found ${userName}`;
			aviso.classList.add('active');
		}
	} catch (error) {}
}

window.addEventListener('load', () => {
	userProfile('EnriqueSantos-dev');
	let theme = window.localStorage.getItem('theme');
	if (theme == 'light') {
		modeTheme.querySelector('span').innerHTML = 'dark';
		modeTheme.querySelector('i').classList.remove('bx-sun');
		modeTheme.querySelector('i').classList.add('bxs-moon');
	} else {
		modeTheme.querySelector('span').innerHTML = 'light';
		modeTheme.querySelector('i').classList.remove('bxs-moon');
		modeTheme.querySelector('i').classList.add('bx-sun');
	}
	document.querySelector('html').classList.add(theme);
});

input.addEventListener('keyup', event => {
	if (input.value != '') {
		if (event.key == 'Enter') {
			userProfile(input.value);
		}
	} else {
		sectioInfoProfile.style.display = 'none';
	}
});
buttonInput.addEventListener('click', () => {
	if (input.value != '') {
		userProfile(input.value);
	}
});

modeTheme.addEventListener('click', e => {
	document.querySelector('html').classList.toggle('dark');
	if (document.querySelector('html').classList.contains('dark')) {
		modeTheme.querySelector('span').innerHTML = 'light';
		modeTheme.querySelector('i').classList.remove('bxs-moon');
		modeTheme.querySelector('i').classList.add('bx-sun');
		window.localStorage.setItem('theme', 'dark');
	} else {
		modeTheme.querySelector('span').innerHTML = 'dark';
		modeTheme.querySelector('i').classList.remove('bx-sun');
		modeTheme.querySelector('i').classList.add('bxs-moon');
		window.localStorage.setItem('theme', 'light');
	}
});
