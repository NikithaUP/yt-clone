import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from "./components/header/Header"
import Sidebar from "./components/sidebar/Sidebar"
import HomeScreen from "./screens/homeScreen/HomeScreen"
import "./_app.scss"
import LoginScreen from './screens/loginScreen/LoginScreen'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import WatchScreen from './screens/watchScreen/WatchScreen'
import SearchScreen from './screens/SearchScreen'
import ShortsScreen from './screens/shortsScreen/ShortsScreen'
import HistoryScreen from './screens/historyScreen/HistoryScreen'
import LikeScreen from './screens/likeScreen/LikeScreen'
import PlaylistScreen from './screens/playlistScreen/PlaylistScreen'

import VideoList from './components/videoList/VideoList'


const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSideBar = () => toggleSidebar(value => !value)

  return (
    <>
      <Header handleToggleSideBar={handleToggleSideBar} />
      <div className="app__container">
        <Sidebar
          sidebar={sidebar}
          handleToggleSideBar={handleToggleSideBar}
        />
        <Container fluid className="app__main">
              {children}
        </Container>
      </div>
    </>
  )
}

const App = () => {

  const { accessToken, loading } = useSelector(state => state.auth)
  
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !accessToken) {
      if (window.location.pathname !== '/auth' && window.location.pathname !== '/shorts' && window.location.pathname !== '/feed/history') {
        navigate('/')
      }
    }
  }, [accessToken, loading, navigate])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomeScreen />
          </Layout>
        }
      />
      <Route
        path="/auth"
        element={<LoginScreen />}
      />
      <Route
        path="/search/:query"
        element={
          <Layout>
            <SearchScreen />
          </Layout>
        }
      />
      <Route
        path="/watch/:id"
        element={
          <Layout>
            <WatchScreen />
          </Layout>
        }
      />
      <Route
        path="/shorts"
        element={
          <Layout>
            <ShortsScreen />
          </Layout>
        }
      />
      <Route
        path="/feed/history"
        element={
          <Layout>
            <HistoryScreen />
          </Layout>
        }
      />
      <Route
        path="/feed/likeVideos"
        element={
          <Layout>
            <LikeScreen />
          </Layout>
        }
      />
      <Route
        path="/feed/Playlists"
        element={
          <Layout>
            <PlaylistScreen/>
          </Layout>
        }
      />
     

<Route 
path="/category/:category" 
element={
<Layout>
<VideoList />

</Layout>
} 
/>
<Route path="/" element={<VideoList />} />
    </Routes>
  )
}

export default App

