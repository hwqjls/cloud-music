import React, { useState, memo } from 'react';
import { connect } from 'react-redux';
import { LazyLoadImage } from "react-lazy-load-image-component";
import Horizen from '../../baseUI/horizen-item';
import Scroll from './../../baseUI/scroll'
import { categoryTypes, alphaTypes } from '../../api/mock';
import { NavContainer, ListContainer, List, ListItem } from './style';
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList
} from './store/actionCreators';

const renderSingerList = (props) => {
  const { singerList } = props;
  const list = singerList ? singerList.toJS(): [];
  return (
    <List>
      {list.map((item, index) => {
        return (
          <ListItem key={item.accountId + '' + index}>
            <div className="img_wrapper">
              <LazyLoadImage src={`${item.picUrl}?param=300x300`}
                width="100%" height="100%"
                alt="singer"
              />
            </div>
            <span className="name">{item.name}</span>
          </ListItem>
        )
      })}
    </List>
  )
}

function Singer(props) {
  const { singerList } = props;
  const { updateDispatch } = props;
  let [category, setCategory] = useState('');
  let [alpha, setAlpha] = useState('');

  let handleUpdateAlpha = (val) => {
    setAlpha(val);
    updateDispatch(category, val)
  }

  let handleUpdateCategory = (val) => {
    setCategory(val);
    updateDispatch(val, alpha)
  }
  return (
    <NavContainer>
      <Horizen
        list={categoryTypes}
        title={'分类(默认热门):'}
        handleClick={handleUpdateCategory}
        oldVal={category} />
      <Horizen
        list={alphaTypes}
        title={'首字母:'}
        handleClick={handleUpdateAlpha}
        oldVal={alpha} />
      <ListContainer>
        <Scroll>
          {renderSingerList({singerList})}
        </Scroll>
      </ListContainer>
    </NavContainer>
  )
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
});
const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true));//loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category, alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0));//属于重新获取数据
      if (category === '' && alpha === '') {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(memo(Singer));