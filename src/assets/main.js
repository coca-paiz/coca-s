const api = 'https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PLXXAUuwytjD0sm-8yruEDHjvtg90m60p-&part=snippet&maxResults=50';

const content = null || document.getElementById("content");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'eee1e18035msha9d269f498434bcp152269jsn8e3c8495c2d1',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const videos = await fetchData(api);
        let view = `
            ${videos.items.map(video => `
                <a href="https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}" target="_blank">
                    <div class="group relative">
                        <div
                            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                        </div>
                        <div class="mt-4 flex justify-between">
                            <h3 class="text-sm text-gray-700">
                                <span aria-hidden="true" class="absolute inset-0"></span>
                                ${video.snippet.title}
                            </h3>
                        </div>
                    </div>
                </a>
        `).slice(0,15).join('')}
        `;
        content.innerHTML = view;
    } catch(error) {
        console.log(error);
    }
})();