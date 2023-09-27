import { useEffect, useState } from "react"
import "./App.css"
import { deleteJoke, getAllJokes, putJoke, saveJoke } from "./services/jokeServices"

export const App = () => {

  //useState hooks that store and update
  const [allJokes, setAllJokes] = useState([])
  const [newJoke, setNewJoke] = useState("")
  const [toldJokes, setToldJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])
  const [untoldCount, setUntoldCount] = useState(0)
  const [toldCount, setToldCount] = useState(0)
  



  //initial fetch for all jokes
  const getData = () => {
    getAllJokes().then(res => setAllJokes(res))
  }
  
  //useEffect for allJokes
  useEffect(() => {
    getData();

  }, [allJokes])

  //useEffect for toldJokes
  useEffect(() => {
    const alreadyToldJokes = allJokes.filter((joke) => joke.told === true)
    setToldJokes(alreadyToldJokes)
    //sets counter for toldJokes
    setToldCount(alreadyToldJokes.length)
  }, [allJokes])

  //useEffect for untoldJokes
  useEffect(() => {
    const notToldJokes = allJokes.filter((jokester) => jokester.told === false)
    setUntoldJokes(notToldJokes)
    //sets counter for untoldJokes
    setUntoldCount(notToldJokes.length) 
    
  }, [allJokes])



  //object that is posted when new joke is typed, similar to initializng transient state in book 4 
  const handleNewJoke = () => {
    let jokeEntry = {
      text: newJoke,
      told: false
  }

    //function responsible for posting new jokes entered
    saveJoke(jokeEntry)
      .then(response => {
        if (response.text !== null) {
          setNewJoke("")
          //have to refetch each time setNewJoke is invoked so joke entered will be rendered on the DOM
          getData()
        }
      })
  }
    
    //function responsible for putting new jokes in correct column based off button click
  const handleJokeChange = (joke) => {
    joke.told = !joke.told
    putJoke(joke)
      .then(res => res.json())
  }

  //function responsible for deleting jokes when delete button is pressed  
  const handleJokeDelete = (joke) => {
    deleteJoke(joke)
    .then(response => response.json())
  }



  return (
    <div className="app-container">
      <div className="app-heading">
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          value={newJoke}
          onChange={(event) => setNewJoke(event.target.value)}
        />
        <button className="joke-input-submit" onClick={handleNewJoke}>Add</button>
      </div>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>
            <span className="told-count">{toldCount}</span>
            Told Jokes
          </h2>
          {toldJokes.map((joke) => (

            <div className="joke-list-item" key={joke.id}>
              <input
                type="radio"
                value={joke}
                onClick={() => handleJokeChange(joke)}

              />
              <input
                type="radio"
                value={joke}
                onClick={() => handleJokeDelete(joke)}

              />{joke.text}</div>
          ))}
        </div>
        <div className="joke-list-container">
          <h2>
            <span className="untold-count">{untoldCount}</span>
            Untold Jokes
          </h2>
          {untoldJokes.map((joke) => (
            <div className="joke-list-item" key={joke.id}>
              <input
                type="radio"
                value={joke}
                onClick={() => handleJokeChange(joke)}

              />
              <input
                type="radio"
                value={joke}
                onClick={() => handleJokeDelete(joke)}

              />{joke.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}