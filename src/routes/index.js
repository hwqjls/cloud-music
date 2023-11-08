import React from "react";
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';
import Album from '../application/Album';

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
      },
      {
        path: 'rank',
        element: <Rank />,
      }
    ]
  }
])

export default router