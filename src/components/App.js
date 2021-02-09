import React, { useState, useEffect } from 'react'
import axios from 'axios'
import backgroundImage from '../img/background.jpg'
import { useSelector, useDispatch } from 'react-redux'
import TaskList from './taskList/taskList'
import Clock from './clock'


const App = () => {
  const dispatch = useDispatch();

  //TODO - replace useState hooks with redux
 
  const [weather, setWeather] = useState ([])
  const [nameDay, setNameDay] = useState ([])
  const [welcomeSentence, setWelcomeSentence] = useState ('')  

  //Welcome screen (stage1)
  const Welcome = () => {
    const isStage2 = useSelector(state => state.isStage2Reducer)
    if (welcomeSentence.length === 15 && isStage2 === false) {

      //Transition from stage 1 to stage 2 
      setTimeout(() => {        
        //Class change
        var x = document.getElementById('containerWelcome')
          x.classList.remove('welcomeStage1')
          x.classList.add('welcomeStage2')
        var y = document.getElementById('welcomeAuthorStage1')
          y.id = 'welcomeAuthorStage2'
        var z = document.getElementById('taskList')
          z.classList.remove('hidden')
          z.classList.add('shown')
        dispatch ({ type: 'ISSTAGE2' })

      }, 4000)
    }

    return (
      <div>
        <img src={backgroundImage} id="backgroundImage" alt="error"/>
        <div className='welcomeStage1' id='containerWelcome'>
          <p id='welcomeAuthorStage1'>
            <WelcomeSentenceFunction />
          </p>
          <TodaysTasks />
          <Weather />
          <NameDay />
        </div>
      </div>
    ) 
  }

//Welcome screen
  const welcomeText = 'Good day, Filip'
  //Types out the welcomeText
  const welcomeSentenceFunctionInner = () => { 
    setTimeout(() => {  
      if (welcomeSentence.length < welcomeText.length) {
        setWelcomeSentence(welcomeSentence.concat(welcomeText.charAt(welcomeSentence.length)))
      }
    }, 55) 
  }  

  const WelcomeSentenceFunction = () => {
    welcomeSentenceFunctionInner()
      return (
        <>
          <span>{welcomeSentence}</span>
        </>
      )
  }
  

  //Current day
  var d = new Date();
  var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

  var n = weekday[d.getDay()];


  //Todays Tasks return
  const TodaysTasks = () => {
    var tasks = useSelector(state => state.taskReducer)
    if (tasks.length === 1) {
      return (
        <p>Today is {n} and you have <span id="numberOfTasksWelcome">{tasks.length}</span> thing to do today.</p>
      )
    } else if (tasks.length === 0) {
      return (
        <p>Congratulations, no planned tasks for today!</p>
      )
    } else {
      return (
        <p>Today is {n} and you have <span id="numberOfTasksWelcome">{tasks.length}</span> things to do today.</p>
      )
    }
  } 
  
  //Weather

  //Load weather api
  useEffect (() => {
    const params = {
      access_key: process.env.REACT_APP_WEATHER_API_KEY,
      query: 'Poprad'
    }
    axios
      .get("https://api.openweathermap.org/data/2.5/weather?q=" + params.query + "&units=metric&appid=" + params.access_key)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  const Weather = () => {
    if (weather.length !== 0) {
        return (
          <>
            <p>Current temperature: {Math.ceil(weather.main.temp)}°C</p>
          </>
        )
      //Weather array not yet loaded
    } else {
      return (
        <>
        </>
      )
    }
  }

  //Nameday 
     //api call
  useEffect (() => {
    axios
      .get("https://api.abalin.net/today?country=sk")
      .then(response => {
        setNameDay(response.data)
      })
  }, [])
     //Nameday component
  const NameDay = () => {
    if (nameDay.length !== 0) {
      return (
        <>
          <p>Nameday: {nameDay.data.namedays.sk}</p>
        </>
      )
    } else {
      return (
        <>
        </>
      )
    }
    
  }

//APP RENDER
  return (
    <>
      <Welcome />
      <Clock />
      <TaskList />          
    </>
  )
}

export default App;
