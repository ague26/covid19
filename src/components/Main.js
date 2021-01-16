import React, { useEffect, useState } from "react";
import { useRef } from "react";

function App() {
  const [data, setData] = useState([])
  const [inputState, setInputState] = useState("Select which state")

  const _MapFullNameAbbr = {"arizona":"AZ","alabama":"AL","alaska":"AK","arkansas":"AR","california":"CA","colorado":"CO","connecticut":"CT","districtofcolumbia":"DC","delaware":"DE","florida":"FL","georgia":"GA","hawaii":"HI","idaho":"ID","illinois":"IL","indiana":"IN","iowa":"IA","kansas":"KS","kentucky":"KY","louisiana":"LA","maine":"ME","maryland":"MD","massachusetts":"MA","michigan":"MI","minnesota":"MN","mississippi":"MS","missouri":"MO","montana":"MT","nebraska":"NE","nevada":"NV","newhampshire":"NH","newjersey":"NJ","newmexico":"NM","newyork":"NY","northcarolina":"NC","northdakota":"ND","ohio":"OH","oklahoma":"OK","oregon":"OR","pennsylvania":"PA","rhodeisland":"RI","southcarolina":"SC","southdakota":"SD","tennessee":"TN","texas":"TX","utah":"UT","vermont":"VT","virginia":"VA","washington":"WA","westvirginia":"WV","wisconsin":"WI","wyoming":"WY","alberta":"AB","britishcolumbia":"BC","manitoba":"MB","newbrunswick":"NB","newfoundland":"NF","northwestterritory":"NT","novascotia":"NS","nunavut":"NU","ontario":"ON","princeedwardisland":"PE","quebec":"QC","saskatchewan":"SK","yukon":"YT"}
  const refState = useRef("");

  useEffect( () => {
      const getState = async ()=>{
        const covidDataAPI= await fetch("https://api.covidtracking.com/v1/states/current.json");
        const covidDate = await covidDataAPI.json();
        return setData(covidDate)
      }
    getState();
  }, []);

  const selectedState = (()=>{
    const oneWord = refState.current.value.replace(/\s+/g, '');
    for(const state in _MapFullNameAbbr){
      const abbrState = _MapFullNameAbbr[state]
      // console.log(abbrState)
      // console.log(refState.current.value )
        if((state === oneWord) || (refState.current.value.toUpperCase() === abbrState)){
          data.map(x=>{
            if(abbrState === x.state){
              // console.log(`${abbrState} is ${x.state}`)
              return console.log(x)
            }
            return null
          })
          }else{
            console.log("error")
          }
      }
    //make map error function if input value is not a state. look at _mapfullnameabbr
  })
  return (
    <div className="App">
      <p>
        USA COVID-19 TRACKER 
      </p>
      <p>Search info by entering state </p>
      <div>
        <input ref={refState} placeholder={inputState} onChange={e=>setInputState(e.target.value)}></input>
        <button onClick={selectedState}>Submit</button>
      </div>
      <div>


      </div>
    </div>
  );
}

export default App;
