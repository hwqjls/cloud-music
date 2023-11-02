import React, { useState, memo } from 'react';
import Horizen from '../../baseUI/horizen-item';
import Scroll from './../../baseUI/scroll'
import { categoryTypes, alphaTypes, singerList } from '../../api/mock';
import { NavContainer, ListContainer, List, ListItem } from './style';
import { LazyLoadImage } from "react-lazy-load-image-component";

const renderSingerList = () => {
  return (
    <List>
      {singerList.map((item, index) => {
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

function Singer() {
  let [category, setCategory] = useState('');
  let [alpha, setAlpha] = useState('');

  let handleUpdateAlpha = (val) => {
    setAlpha(val);
  }

  let handleUpdateCategory = (val) => {
    setCategory(val);
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
          {renderSingerList()}
        </Scroll>
      </ListContainer>
    </NavContainer>
  )
}

export default memo(Singer);