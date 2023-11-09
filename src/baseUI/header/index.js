import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import style from '../../assets/global-style';

const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  width: 100%;
  height: 40px;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: ${style['font-color-light']};
  .back {
    width: 20px;
    margin-right: 5px;
    font-size: 20px;
  }
  >h1 {
    font-size: ${style['font-size-l']};
    font-weight: 700;
  }
`;

const Header = React.forwardRef((props, ref) => {
  const { title, handleClick, isMarquee } = props;
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>&#xe655;</i>
      {
        // eslint-disable-next-line 
        isMarquee ? <marquee><h1>{title}</h1></marquee> :
          <h1>{title}</h1>
      }
    </HeaderContainer>
  )
})

Header.defaultProps = {
  handleClick: () => { },
  title: '标题',
  isMarquee: false,
};

Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee: PropTypes.bool
};

export default React.memo(Header);