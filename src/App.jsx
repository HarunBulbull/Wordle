
import React, {useState, useEffect} from "react";

function App() {
  const [randomWord, setRandomWord] = useState("");
  const [heal, setHeal] = useState(1);
  const [word, setWord] = useState("");
  const handleWord = (e) => {
    if (e.target.value.length <= 1) {
      setWord(word + e.target.value);
      if(word.length+1 < 5){
        document.getElementById(word.length+2).focus();
      }else game();
    }
  }

  const game = () => {
    document.getElementById(heal+"1").innerHTML = document.getElementById("1").value;
    document.getElementById(heal+"2").innerHTML = document.getElementById("2").value;
    document.getElementById(heal+"3").innerHTML = document.getElementById("3").value;
    document.getElementById(heal+"4").innerHTML = document.getElementById("4").value;
    document.getElementById(heal+"5").innerHTML = document.getElementById("5").value;
    for(var i=1; i<6; i++){
      if(randomWord.toLocaleLowerCase().includes(document.getElementById(i).value.toLocaleLowerCase())){
        document.getElementById(heal+ "" +i).style.backgroundColor = "yellow";
      }
    }
    let x = 0;
    for(var i=1; i<6; i++){
      if(randomWord.toLocaleLowerCase().substring(i-1, i) == document.getElementById(i).value.toLocaleLowerCase()){
        document.getElementById(heal+ "" +i).style.backgroundColor = "lime";
        x++;
      }
    }
    if(x==5){
      alert("You won!");
      window.location.reload();
    }
    setWord("");
    document.getElementById("1").focus();
    if(heal+1 == 6){
      alert("You lose! The word is: " + randomWord);
      window.location.reload();
    }else{
      setHeal(heal + 1);
    }
  } 

  function handleKey(event) {
    if (event.key == 'Backspace') {
      setWord(word.slice(0,-1));
      if(word.length-1 > -1){
        document.getElementById(word.length).focus();
      }
    }
  }

  useEffect(() => {
    fetch('https://api.datamuse.com/words?ml=apple&max=1000')
    .then(response => response.json())
    .then(data => {
      const fiveLetterWords = data.filter(word => word.word.length === 5);
      const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
      const randomData = fiveLetterWords[randomIndex];
      document.getElementById("word").innerHTML = randomData.word;
      setRandomWord(randomData.word);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }, []);

  return (
    <>
      <p id="word" style={{display: "none"}}></p>
      <div className="fiveBoxArea">
        <p className="box" id='11'></p>
        <p className="box" id='12'></p>
        <p className="box" id='13'></p>
        <p className="box" id='14'></p>
        <p className="box" id='15'></p>
      </div>
      <div className="fiveBoxArea">
        <p className="box" id='21'></p>
        <p className="box" id='22'></p>
        <p className="box" id='23'></p>
        <p className="box" id='24'></p>
        <p className="box" id='25'></p>
      </div>
      <div className="fiveBoxArea">
        <p className="box" id='31'></p>
        <p className="box" id='32'></p>
        <p className="box" id='33'></p>
        <p className="box" id='34'></p>
        <p className="box" id='35'></p>
      </div>
      <div className="fiveBoxArea">
        <p className="box" id='41'></p>
        <p className="box" id='42'></p>
        <p className="box" id='43'></p>
        <p className="box" id='44'></p>
        <p className="box" id='45'></p>
      </div>
      <div className="fiveBoxArea">
        <p className="box" id='51'></p>
        <p className="box" id='52'></p>
        <p className="box" id='53'></p>
        <p className="box" id='54'></p>
        <p className="box" id='55'></p>
      </div>
      <div className="fiveBoxArea">
        <input className="box" id='1' value={word.substring(0,1)} onChange={handleWord} onKeyDown={handleKey} autoFocus/>
        <input className="box" id='2' value={word.substring(1,2)} onChange={handleWord} onKeyDown={handleKey}/>
        <input className="box" id='3' value={word.substring(2,3)} onChange={handleWord} onKeyDown={handleKey}/>
        <input className="box" id='4' value={word.substring(3,4)} onChange={handleWord} onKeyDown={handleKey}/>
        <input className="box" id='5' value={word.substring(4,5)} onChange={handleWord} onKeyDown={handleKey}/>
      </div>
    </>
  )
}

export default App
