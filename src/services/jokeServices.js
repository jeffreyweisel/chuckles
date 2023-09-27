export const getAllJokes = () => {
  return fetch('http://localhost:8088/jokes').then((response) => response.json())
}

//function that posts saved joke to database
export const saveJoke = async (joke) => {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(joke)
  }

  return await fetch("http://localhost:8088/jokes", postOptions)
}

//function that puts saved joke to either told or untold depending on button that is pressed
export const putJoke = async (joke) => {
  const putOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(joke)
  }

  return await fetch(`http://localhost:8088/jokes/${joke.id}`, putOptions)
}

//function that deletes joke from database when delete button is pressed
export const deleteJoke = async (joke) => {
  const deleteOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
    
  }
  return await fetch(`http://localhost:8088/jokes/${joke.id}`, deleteOptions)

}