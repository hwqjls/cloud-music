import React, { useState, memo, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { Outlet, useNavigate } from 'react-router'
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
import Loading from '../../baseUI/loading'
import { CategoryDataContext, CHANGE_ALPHA, CHANGE_CATEGORY } from './data';

const renderSingerList = (props) => {
  const { singerList, navigate } = props;
  const list = singerList ? singerList.toJS() : [];

  const enterDetail = (detail) => {
    navigate(`/singers/${detail.id}`);
  }

  return (
    <List>
      {list.map((item, index) => {
        return (
          <ListItem key={item.accountId + '' + index} onClick={() => enterDetail(item)}>
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

function Singers(props) {
  const { singerList, enterLoading, pageCount, pullUpLoading, pullDownLoading } = props;
  const { getHotSingerDispatch, updateDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch } = props;
  // let [category, setCategory] = useState('');
  // let [alpha, setAlpha] = useState('');
  const { data, dispatch } = useContext(CategoryDataContext)
  const { category, alpha } = data.toJS()
  const navigate = useNavigate()

  useEffect(() => {
    if (!singerList.size) {
      getHotSingerDispatch();
    }
    // eslint-disable-next-line
  }, []);

  let handleUpdateAlpha = (val) => {
    // setAlpha(val);
    dispatch({ type: CHANGE_ALPHA, data: val })
    updateDispatch(category, val)
  }

  let handleUpdateCategory = (val) => {
    // setCategory(val);
    dispatch({ type: CHANGE_CATEGORY, data: val })
    updateDispatch(val, alpha)
  }

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  }

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha)
  }
  return (
    <>
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
          <Scroll
            pullUp={handlePullUp}
            pullDown={handlePullDown}
            pullUpLoading={pullUpLoading}
            pullDownLoading={pullDownLoading}>
            {renderSingerList({ singerList, navigate })}
          </Scroll>
          <Loading show={enterLoading}></Loading>
        </ListContainer>
      </NavContainer>
      <Outlet />
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(memo(Singers));