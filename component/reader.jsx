import { css } from '../lib/dom.js'
import { Div, P } from './elements.jsx'
import { NaN } from './icons.jsx'
import { Play, Pause, Expand, Reduce, Volume } from './icons.jsx'
import { useState, useRef, useEffect } from 'preact/hooks'

css(`
    .lecteur {
      width:700px;
      height:400px;
      position:absolute;
      top:9%;
      left:50%;
      right:50%;
      z-index:1;
      border-radius:0.3rem;
      transform:translate(-30%,-30%) ;
      transition:all 0.5s ease-in-out;
      background: #505f8b7d;
      outline:2px dashed var(--comment-darker);
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
      z-index:3;
      padding: 0.3rem 0.7rem;
      font-size: 1.6rem;
      border-radius: 50px;
      position:absolute;
      top:-20px;
      cursor:pointer;
      right: -15px;
      outline:2px dashed var(--comment-lighter);
      color:var(--purple-lighter);
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
      width: 100%;
      position:absolute;
      z-index:2;
      left:0;
      padding:1rem;
      display:flex;
      font-weight:bolder;
      flex-direction:row;
      align-items:center;
      justify-content:space-between;
    }
    .lecteur header .logo {
      margin-left: 10px;
    }
    .lecteur header h3{
      margin-right: 10px;
      color:white;
      font-size: 1.2rem;
      font-weight:bolder;
      transition:all 0.5s ease-in-out;
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
      display:flex;
      flex-direction:row;
      align-items:center;
      position:relative;
      background: transparent;
      border-radius: 0 0 0.3rem 0.3rem;
    }

    .lecteur.fullscreen .mbre .controls {
        outline:2px dashed  var(--comment-darker);
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
      color: white;
    }
    .lecteur .mbre .controls .sub-group .completed-time {
      margin-left: 10px;
      color: white;
    }
    .lecteur .mbre .controls .sub-group input {
      width: 370px;
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
      background: var(--comment-darker);
      display:none;
    }

    .lecteur .controls .sub-group .volume div input{
      width:100% !important;
    }

    .lecteur  .controls .control{
       display:flex;
       flex-direction:row;
       align-items:center;
       justify-content:center;
    }

    .lecteur .controls .control span {
      font-size: 1.5rem;
      margin: 0 10px;
      cursor:pointer;
    }
`)

export const Reader = ({ show, close,name,link,list, isVideo }) => {
  const [play, setPlay] = useState(false)
  const video = useRef(null)
  const embed = useRef(null);
  const [showControl, setShowControl] = useState(true)
  const [showVolume, setShowVolume] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)
  const [currentVideo,setCurrentVideo] = useState(null);


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

 const change = (type) => {
   video.current.pause();
   setPlay(false);
   video.current.currentTime = 0;
   let index = list.findIndex(v => v.link === currentVideo.link);
   let newVideo = type === "next" ? list[index+1] : list[index-1] 
   video.current.src = newVideo.link;
   video.current.play();
   setCurrentVideo(newVideo);
   setPlay(true);
   decompt();
 }


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
    setData({
      minutes: minutes('d') < 10 ? '0' + minutes('d') : minutes('d'),
      seconds: seconds('d') < 10 ? '0' + seconds('d') : seconds('d'),
      min: minutes('dd') < 10 ? '0' + minutes('dd') : minutes('dd'),
      sec: seconds('dd') < 10 ? '0' + seconds('dd') : seconds('dd'),
      currentTime: Math.ceil(video.current.currentTime),
      duration: Math.ceil(video.current.duration),
    })
  }

  useEffect(() => {
    if (link && isVideo) {
      video.current.src = link;
      video.current.play();
      setPlay(true)
      decompt()
    }else if(link && !isVideo){
       embed.src = link;
    }
    setCurrentVideo({name,link});
  }, [link,isVideo])

  return (
    <>
      <Div
        class={`lecteur ${fullScreen && 'fullscreen'}`}
        style={{ transform: show ? 'scale(1)' : 'scale(0)' }}
      >
        <button
          class="close"
          onClick={() => {
            if(isVideo){
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
            } 
            close()
          }}
        >
          &times;
        </button>
        <header style={{top: isVideo ? '0' : null,bottom: !isVideo ? '0' : null}}>
          <div class="logo">
               <NaN size={20} />
                &nbsp;<span style={{color:isVideo ? 'white' : 'black'}}>NaN-courses</span>
          </div>
          <h3 style={{ opacity: showControl ? '1' : '0',color:isVideo ? 'white': 'black' }}>{currentVideo.name}</h3>
        </header>
        {isVideo ? <>
                {link && (
          <video ref={video} autoplay preload="true" width="100%" height="100%">
            <source src={link} type="video/mp4" />
          </video>
        )}
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
                value={data.currentTime}
                onChange={(e) => goToTime(e.target.value)}
              />
              <p class="completed-time">
                {data.min ? data.min : '00'}:{data.sec ? data.sec : '00'}
              </p>
              <Div class="volume" style={{ marginLeft: '20px' }}>
                <Div style={{ display: showVolume ? 'block' : 'none' }}>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    defaultValue={data.volume}
                    onChange={({ target: { value } }) => toggleVolume(value)}
                  />
                </Div>
                <Volume
                  size={20}
                  color="white"
                  onClick={() => setShowVolume((v) => !v)}
                />
              </Div>
              <Div
                onClick={() => setFullScreen(!fullScreen)}
                style={{ cursor: 'pointer', marginLeft: '20px' }}
              >
                {fullScreen ? (
                  <Reduce size={18} color="white" />
                ) : (
                  <Expand size={18} color="white" />
                )}
              </Div>
            </Div>
            <Div class="control">
              <span onClick={() => list.findIndex(v => v.link === currentVideo.link) !== 0  && change("prev")}>⏮</span>
              <span onClick={() => togglePlay()}>
                {!play ? <>⏯</> : <>⏸</>}
              </span>
              <span onClick={() => list.findIndex(v => v.link === currentVideo.link) < list.length-1 && change("next")} >⏭</span>
            </Div>
          </Div>
        </Div>
        </> : <embed ref={embed} src={link} width="100%" height="100%">
        </embed>}
      </Div>
    </>
  )
}
