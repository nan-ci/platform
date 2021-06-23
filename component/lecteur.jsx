import { css } from '../lib/dom.js'
import { Div, P } from './elements.jsx'
import { NavLink } from './header.jsx'
import { NaN } from './icons.jsx'
import { useEffect, useState, useRef } from 'preact/hooks'

css(`
    .lecteur {
      width:700px;
      height:400px;
      position:absolute;
      top:9%;
      left:33%;
      z-index:1;
      border-radius:0.3rem;
      transform:translate(-50%,-50%) ;
      transition:all 0.5s ease-in-out;
      border:1px solid var(--comment-darker);
    }

    .lecteur.fullscreen {
      width:100%;
      height:100%;
      top:0;
      left:0;
      border:none;
    }

    .lecteur.fullscreen button.close {
      display:none;
    }

    .lecteur button.close {
      background:transparent;
      outline:none;
      z-index:3;
      padding: 0.3rem 0.7rem;
      font-size: 1.6rem;
      border-radius: 50px;
      position:absolute;
      top:-20px;
      cursor:pointer;
      right: -15px;
      background:white;
      color:black;
    }

    .lecteur video {
      width:100%;
      height:100%;
      position:absolute;
      border-radius: 0.3rem;
      top:0;
      left:0;
      z-index:0 !important;
    }

    .lecteur header {
      width:100%;
      position:absolute;
      z-index:2;
      top:0;
      left:0;
      padding:1rem;
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:flex-start;
    }

    .lecteur .mbre {
      width:100%;
      height:100%;
      position:absolute;
      display:flex;
      top:0;
      flex-direction:column;
      justify-content:flex-end;
      z-index:2 !important;
      background:transparent;
      transition:all 0.5s ease-in-out;
    }





    .lecteur.fullscreen .mbre .controls {
      width: 700px;
      position:absolute;
      left:50%;
      right: 50%;
      bottom:3%;
      transform:translate(-50%,-50%);
      border-radius:none;
      padding: 0.6rem;
    }

    .lecteur .mbre .controls {
      width:100%;
      position:relative;
      background:#000000de;
      border-radius: 0 0 0.3rem 0.3rem;
    }

    .lecteur .mbre .controls .sub-group {
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:flex-start;
      padding:0.5rem;
    }
    .lecteur .mbre .controls .sub-group i {
      font-size: 1.2rem;
      font-weight:bolder;
      margin: 0 10px;
      cursor:pointer;
    }
    .lecteur .mbre .controls .sub-group .time-decompt {
      margin-right: 10px;
    }

    .lecteur .mbre .controls .sub-group .completed-time {
      margin-left: 10px;
    }

    .lecteur .mbre .controls .sub-group input {
      width: 400px;
      height:3px;
      cursor:pointer;
    }
    .lecteur .controls .sub-group .volume {
      margin-left: 10px;
      position:relative;
    }

    .lecteur .controls .sub-group .volume div {
      width: 100px;
      height:40px;
      transform: rotateZ(-90deg);
      position:absolute;
      bottom:60px;
      left:-30px;
      padding: 0.5rem;
      border-radius:0.3rem;
      background:black;
      display:none;
    }

    .lecteur .controls .sub-group .volume div input{
      width:100% !important;
    }

    .lecteur .controls .play {
      width: 50px;
      height: 50px;
      background: var(--comment-darker);
      color:white;
      padding: 1rem;
      position:absolute;
      z-index:2;
      right:2%;
      bottom:50%;
      border-radius:0.3rem;
      cursor:pointer;
      transform:rotateZ(45deg)
    }

    .lecteur .controls .play i {
      font-size: 1.5rem;
      margin-left: 2px;
      margin-top:-1px;
      transform: rotateZ(-45deg)
    }



    .ombreLecteur {
      width:100%;
      height:100%;
      background:black;
      position:absolute;
      top:0;
      left:0;
      z-index:0;
      opacity:0.9;
      transition:all 0.5s ease-in-out;
      transform:scale(0)
    }

    .ombreLecteur .cours-info {
      position:absolute;
      bottom:20%;
      left:50%;
      right:50%;
      width:700px;
      height: auto;
      background:var(--comment-darker);
      border-radius:1rem;
      transform:translate(-50%,-50%);
      padding:0.8rem;
    }

    .cours-info .ressources {
       display:flex;
       flex-direction:column;
       align-items:flex-start;
       justify-content:flex-start;
    }
    .cours-info .ressources .nlink {
      display:flex;
      flex-direction:row;
      align-items:center;
      padding: 0.3rem;
      justify-content:space-between;
      cursor:pointer;
      outline:none;
    }
    .cours-info .ressources .nlink i {
      color:orangered;
      font-weight:bolder;
      font-size:1.3rem;
    }

    .cours-info .ressources .nlink span {
      margin-left: 10px;
    }

`)

export const Lecteur = ({
  showLecteur,
  closeLecteur,
  link,
  ressources,
  description,
}) => {
  const [play, setPlay] = useState(false)
  const video = useRef(null)
  const [showControl, setShowControl] = useState(true)
  const [showVolume, setShowVolume] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)

  const [data, setData] = useState({
    minutes: '00',
    seconds: '00',
    min: '00',
    sec: '00',
    currentTime: 0,
    duration: 0,
    volume: 5,
  })

  const tt = useRef(null)
  const ss = useRef(null)

  const check = () => {
    clearTimeout(ss.current)
    ss.current = setTimeout(() => {
      setShowControl(false)
      showVolume && setShowVolume(false)
    }, 5000)
  }

  const minutes = (val) =>
    Math.floor(
      (val === 'd'
        ? Math.ceil(video.current.currentTime)
        : Math.ceil(video.current.duration)) / 60,
    )
  const seconds = (val) =>
    Math.floor(
      (val === 'd'
        ? Math.ceil(video.current.currentTime)
        : Math.ceil(video.current.duration)) -
        minutes(val) * 60,
    )

  const togglePlay = () => {
    setPlay(!play)
    if (play) {
      video.current.pause()
      clearInterval(tt.current)
    } else {
      video.current.play()
      decompt()
    }
  }

  const toggleVolume = (val) => {
    video.current.volume = parseInt(val) / 10
    setData((d) => {
      return { ...d, volume: val }
    })
  }

  const decompt = () => {
    tt.current = setInterval(() => {
      setData({
        minutes: minutes('d') < 10 ? '0' + minutes('d') : minutes('d'),
        seconds: seconds('d') < 10 ? '0' + seconds('d') : seconds('d'),
        min: minutes('dd') < 10 ? '0' + minutes('dd') : minutes('dd'),
        sec: seconds('dd') < 10 ? '0' + seconds('dd') : seconds('dd'),
        currentTime: Math.ceil(video.current.currentTime),
        duration: Math.ceil(video.current.duration),
      })
      if (
        Math.ceil(video.current.currentTime) ===
        Math.ceil(video.current.duration)
      ) {
        clearInterval(tt.current)
        setTimeout(() => {
          video.current.currentTime = 0
          setPlay(false)
          setData({
            minutes: '00',
            seconds: '00',
            currentTime: 0,
            duration: Math.ceil(video.current.duration),
          })
        }, 500)
      }
    }, 1000)
  }

  const goToTime = (val) => {
    video.current.currentTime = val
  }

  return (
    <>
      <Div
        class="ombreLecteur"
        style={{
          transform: showLecteur ? 'scale(1)' : 'scale(0)',
        }}
      >
        <Div class="cours-info">
          <P>{description}</P>
          <br />
          <h1>Ressources</h1>
          <Div class="ressources">
            {ressources &&
              ressources.map((res) => (
                <NavLink class="nlink" href={res.link} key={res.title}>
                  <i class="fab  fa-buffer" aria-hidden="true"></i>
                  <span> {res.name}</span>
                </NavLink>
              ))}
          </Div>
        </Div>
      </Div>

      <Div
        class={`lecteur ${fullScreen && 'fullscreen'}`}
        style={{ transform: showLecteur ? 'scale(1)' : 'scale(0)' }}
      >
        <button
          class="close"
          onClick={() => {
            closeLecteur()
            video.current.pause()
            video.current.currentTime = 0
            setPlay(false)
            setData({
              minutes: '00',
              seconds: '00',
              min: '00',
              sec: '00',
              currentTime: 0,
              duration: 0,
            })
          }}
        >
          &times;
        </button>
        <header>
          <NaN size={20} />
          &nbsp;<span>NaN-courses</span>
        </header>
        <video ref={video} preload="true" width="100%" height="100%">
          <source src={'/assets/mov_bbb.mp4'} type="video/mp4" />
        </video>
        <Div
          class="mbre"
          style={{ opacity: showControl ? '1' : '0' }}
          onMouseLeave={() => {
            setShowControl(false)
            showVolume && setShowVolume(false)
            clearTimeout(ss.current)
          }}
          onMouseMove={() => {
            !showControl && setShowControl(true)
            check()
          }}
        >
          <Div class="controls">
            <Div class="sub-group">
              <p class="time-decompt">
                {data.minutes}:{data.seconds}
              </p>
              <input
                type="range"
                min="0"
                max={data.duration}
                defaultValue={data.currentTime}
                onChange={(e) => goToTime(e.target.value)}
              />
              <p class="completed-time">
                {data.min}:{data.sec}
              </p>
              <Div class="volume">
                <Div style={{ display: showVolume ? 'block' : 'none' }}>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    defaultValue={data.volume}
                    onChange={({ target: { value } }) => toggleVolume(value)}
                  />
                </Div>
                <i
                  class="fa fa-volume-up"
                  aria-hidden="true"
                  onClick={() => setShowVolume((v) => !v)}
                ></i>
              </Div>
              <i
                class="fa fa-desktop"
                aria-hidden="true"
                style={{
                  color: fullScreen ? 'var(--comment-darker)' : 'white',
                }}
                onClick={() => setFullScreen(!fullScreen)}
              ></i>
            </Div>
            <Div class="play" onClick={() => togglePlay()}>
              <i
                class={`fa fa-${play ? 'pause' : 'play'}`}
                aria-hidden="true"
              ></i>
            </Div>
          </Div>
        </Div>
      </Div>
    </>
  )
}
