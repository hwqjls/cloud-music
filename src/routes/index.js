import React from "react";
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';
import Album from '../application/Album';
import Singer from '../application/Singer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        index: true,
        element: <Navigate to='recommend' />,
      },
      {
        path: 'recommend',
        element: <Recommend />,
        key: 'recommend',
        children: [
          {
            path: ':id',
            element: <Album />
          }
        ]
      },
      {
        path: 'singers',
        element: <Singers />,
        key: 'singers',
        children: [
          {
            path: ':id',
            element: <Singer />
          }
        ]
      },
      {
        path: 'rank',
        element: <Rank />,
        key: 'rank',
        children: [
          {
            path: ':id',
            element: <Album />
          }
        ]
      }
    ]
  }
])

export default router