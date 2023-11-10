import { axiosInstance } from "./config";

// 获取 banner( 轮播图 ) 数据
export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
}

// 推荐歌单
export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
}

// 热门歌手
export const getHotSingerListRequest = (count=50) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
}

// 歌手分类列表
export const getSingerListRequest= (category, alpha, count) => {
  return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
}

// 所有榜单内容摘要
export const getRankListRequest = () => {
  return axiosInstance.get('/toplist/detail');
}

// 获取歌单详情
export const getAlbumDetailRequest = (id) => {
  return axiosInstance.get (`/playlist/detail?id=${id}`);
};