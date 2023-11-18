const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2YzNDEyOTBhNDBkNDI2ZTFjYzM5NjFkZDVjMjMwOCIsInN1YiI6IjY1MjIxM2U5YWI1ZTM0MDBmZTMyM2U4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-nGZKSxMxGavqgDbjRGn9tK336zF5TIWb9p3Kq_wDg4',
	},
};

export function dataFetch({
	urlType,
	filterTrending = 'day',
	selectType,
	selectId,
}) {
	const url = {
		recommended:
			'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
		discoverMovie:
			'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
		discoverTv:
			'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc',
		trending: `https://api.themoviedb.org/3/trending/all/${filterTrending}?language=en-US`,
		details: `https://api.themoviedb.org/3/${selectType}/${selectId}?language=en-US`,
		images: `https://api.themoviedb.org/3/${selectType}/${selectId}/images`,
		credits: `https://api.themoviedb.org/3/${selectType}/${selectId}/credits?language=en-US`,
		keywords: `https://api.themoviedb.org/3/${selectType}/${selectId}/keywords`,
	};
	return fetch(url[urlType], options).then((response) => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	});
}
