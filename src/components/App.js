import React, { useState, useEffect } from 'react'
import axios from 'axios'
import backgroundImage from '../img/background.jpg'

const App = () => {

  //TODO - replace useState hooks with redux
  const [tasks, setTasks] = useState ([])
  const [newTask, setNewTask] = useState ('')
  const [newNote, setNewNote] = useState ('')
  const [priority, setPriority] = useState ('')
  const [weather, setWeather] = useState ([])
  const [nameDay, setNameDay] = useState ([])
  const [welcomeSentence, setWelcomeSentence] = useState ('')
  const [currentStage, setCurrentStage] = useState ('stage1')
  const [currentWelcomeStage, setCurrentWelcomeStage] = useState ('welcomeStage1')
  const [currentStageGreeting, setCurrentStageGreeting] = useState ('welcomeAuthorStage1')
  

  //Load task list from local server
  useEffect(() => {
    axios
      .get('http://localhost:3001/tasks')
      .then(response => {
        setTasks(response.data)
      })
  }, [])

  //Welcome screen - stage1 + transition
  const Welcome = () => {
    if (welcomeSentence.length === 15 && currentStage === 'stage1') {
      //Transition from stage 1 to stage 2 
      setTimeout(() => {
        //Class change
        setCurrentStage(currentStage.replace('stage1', 'stage2'))
        setCurrentWelcomeStage(currentWelcomeStage.replace('welcomeStage1', 'welcomeStage2'))
        setCurrentStageGreeting(currentStageGreeting.replace('welcomeAuthorStage1', 'welcomeAuthorStage2'))
      }, 4000)
    }
    //TODO - set await for animations to complete, edit stylesheet accordingly

    return (
      <div id='containerWelcome'>
        <img src={backgroundImage} id="backgroundImage" alt="error"/>
        <div className={currentWelcomeStage} stage={currentStage}>
          <p id={currentStageGreeting}>
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
          <span stage={currentStage}>{welcomeSentence}</span>
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
      query: 'Poprad',
      query1: 'Bratislava' //For testing purposes
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

  
  //Clock
  const Clock = () => {
    const [currentTime, setCurrentTime] = useState (new Date().toLocaleTimeString())

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString())
      }, 1000)
    return () => clearInterval(interval)
    }, [])

    return (
      <div id="clock">
        {currentTime}
      </div>
    )
  }



  //Final desktop - stage2
  ////////////////////////

  //Tasklist
  const TaskList = () => {
      return (
        <div id="taskList" className={currentStage}>
          {tasks.map(task => 
          <>
            <p>{task.title}</p>
            <p>{task.note}</p>
          </> 
          )}
          <form onSubmit={addTask}>
            <input
              value={newTask}
              onChange={handleTaskChange}
              placeholder='What has to be done?'
            />
            <input 
              value={newNote}
              onChange={handleNoteChange}
              placeholder='Notes'
            />
            <select name="priority" onChange={handlePriorityChange}>
              <option value="1">High</option>
              <option value="2">Medium</option>
              <option value="3">Low</option>
            </select>
            <button type="submit">
              Save
            </button>
          </form>
        </div>  
      )
  }

  //Tasklist handlers
  const addTask = (event) => {
    event.preventDefault()
    const taskObject = {
      title: newTask,
      note: newNote,
      priority: priority
    }
    //POST task
    axios
      .post('http://localhost:3001/tasks', taskObject)
      .then(response => {
        setTasks(tasks.concat(response.data))
        //Clear data
        setNewTask('')
        setNewNote('')
        setPriority('')
      })
      console.log(tasks)
  }

  const handleTaskChange = (event) => {
    setNewTask(event.target.value)
  }
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  const handlePriorityChange = (event) => {
    setPriority(event.target.value)
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
