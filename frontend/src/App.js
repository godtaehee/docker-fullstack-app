import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from 'axios';
function App() {

  useEffect(() => {
    axios.get('/api/values')
      .then(response => {
        console.log('response', response);
        setLists(response.data)
      })
  }, [])

  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("")

  const changeHandler = (event) => {
    setValue(event.currentTarget.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    axios.post('/api/value', {value})
      .then(response => {
        if (response.data.success) {
          console.log('response', response);
          setLists([...lists, response.data]);
          setValue("");
        } else {
          alert('값을 DB에 넣는데 실패했습니다.')
        }
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {lists && lists.map((list, index) => (
            <li key={value}>{list.value}</li>
          ))}
          <form action="" className="example" onSubmit>
            <input
              type="text"
              placeholder="입력해주세요.."
              onChange={changeHandler}
              value={value}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
