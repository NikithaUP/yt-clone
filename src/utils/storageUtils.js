

export const getLikedVideosFromLocalStorage = () => {
    const likedVideos = localStorage.getItem('likedVideos');
    return likedVideos ? JSON.parse(likedVideos) : [];
};

export const saveLikedVideoToLocalStorage = (video) => {
    const likedVideos = getLikedVideosFromLocalStorage();
    const updatedLikedVideos = [video, ...likedVideos.filter(v => v.id !== video.id)];
    localStorage.setItem('likedVideos', JSON.stringify(updatedLikedVideos));
};

export const removeLikedVideoFromLocalStorage = (videoId) => {
    const likedVideos = getLikedVideosFromLocalStorage();
    const updatedLikedVideos = likedVideos.filter(video => video.id !== videoId);
    localStorage.setItem('likedVideos', JSON.stringify(updatedLikedVideos));
};
