const fallbackImageMap: { [key: string]: string } = {
    'sky1': 'https://upload.wikimedia.org/wikipedia/en/c/c4/Sky_One_-_Logo_2020_%28television_channel%29.png',
    'silver': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Silver_logo.svg/1200px-Silver_logo.svg.png',
    'hbo':'https://www.vhv.rs/dpng/d/34-348096_logo-hbo-hd-png-download.png',
    'cw':'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/The_CW_2024.svg/1200px-The_CW_2024.svg.png',
    'vox': '/logos/VOX_Logo.png',
    'history': '/logos/History_Logo.svg',
    'sixx':'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Sixx_Logo.svg/1200px-Sixx_Logo.svg.png',
    'tv2norway':'https://upload.wikimedia.org/wikipedia/commons/a/a3/Tv-2-norway.png',
    'channel5':'https://static.wikia.nocookie.net/logosfake/images/d/d2/Channel_5_2025.svg',
    'dummy_program_id': '/dummy_program_id.jpg',
}

export const getImagesWithFallback = (images: { logo: string; fallback?: string }, id: string) => {
    const defaultFallback = 'https://via.placeholder.com/150';
    return {
        logo: images.logo,
        fallback: fallbackImageMap[id] || defaultFallback
    }
}

export const dummy_program_id_video = 'https://www.youtube.com/watch?v=7rcozIVtujw';