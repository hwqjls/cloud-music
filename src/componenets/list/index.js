import React from 'react'
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  ListWrapper,
  ListItem,
  List
} from './style';
import { getCount } from '@/api/utils.js'

function RecommendList({ recommendList }) {
  const navigate = useNavigate()
  const enterDetail = (id) => {
    navigate(`/recommend/${id}`)
  }
  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {
          recommendList.map((recommend, idx) => {
            return (
              <ListItem key={idx} onClick={() => enterDetail(recommend.id)}>
                <div className="img_wrapper">
                  <div className="decorate"></div>
                  {/* 加此参数可以减小请求的图片资源大小 */}
                  <LazyLoadImage src={recommend.picUrl + "?param=300x300"}
                    width="100%" height="100%"
                    alt="music"
                  />
                  {/* placeholderSrc={'./music.png'} */}
                  <div className="play_count">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count">{getCount(recommend.playCount)}</span>
                  </div>
                </div>
              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>
  )
}

export default React.memo(RecommendList)