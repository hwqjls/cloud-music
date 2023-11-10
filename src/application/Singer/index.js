import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useHref } from 'react-router';
import { CSSTransition } from "react-transition-group";
import { Container, ImgWrapper, CollectButton, BgLayer, SongListWrapper } from "./style";
import { artist } from "../../api/mock";
import Header from './../../baseUI/header/index';
import Scroll from '../../baseUI/scroll';
import SongsList from './../SongsList';

function Singer(props) {
  const [showStatus, setShowStatus] = useState(true);
  const navigate = useNavigate()
  const href = useHref()
  const collectButton = useRef();
  const imageWrapper = useRef();
  const songScrollWrapper = useRef();
  const songScroll = useRef();
  const header = useRef();
  const layer = useRef();
  // 图片初始高度
  const initialHeight = useRef(0);

  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5;

  useEffect(() => {
    let h = imageWrapper.current.offsetHeight;
    songScrollWrapper.current.style.top = `${h - OFFSET}px`;
    initialHeight.current = h;
    // 把遮罩先放在下面，以裹住歌曲列表
    layer.current.style.top = `${h - OFFSET}px`;
    songScroll.current.refresh();
  }, []);

  const goBack = () => {
    navigate('/' + href.split('/')[1])
  }

  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
  }, []);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={goBack}
    >
      <Container>
        <Header
          handleClick={setShowStatusFalse}
          title={artist.name}
          ref={header}
        ></Header>
        <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll ref={songScroll}>
            <SongsList
              songs={artist.hotSongs}
              showCollect={false}
            ></SongsList>
          </Scroll>
        </SongListWrapper>
      </Container>
    </CSSTransition>
  )
}

export default Singer;