import React, {useState, useEffect} from "react";
import {gql, useQuery } from '@apollo/client';


const GET_DATA = gql`
  query {
    page2: episodes(page: 2) {
      results {
        id
        name
        air_date
        episode
      }
    }
}
`;

const TO_ASSIGN = gql`
  query {
    page3: episodes(page: 3) {
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;

  function WindowSize(){
    const [size, setSize] = useState(window.innerWidth);
    useEffect(()=>{
      const handleResize = ()=> {
        setSize(window.innerWidth)
      }
      window.addEventListener("resize", handleResize)
    })
    return size;
  }

function EpisodeBlock() {

  const width = WindowSize();

  const {loading: loading1, error: error1, data: data1 } = useQuery(GET_DATA);
  const {loading: loading2, error: error2, data: data2} = useQuery(TO_ASSIGN);
  
  if (loading1 || loading2) return <p>Loading...</p>;
  if (error1 || error2) return <p>Error :(</p>;

  const allResults = [...data1.page2.results, ...data2.page3.results];
  const filteredData = allResults.filter(item => item.episode.startsWith('S04'));

  const episodesList2 = filteredData.map((item, index) => {
    const isBlueOrGreen = index%2 === 0 ? "blue" : "green";
 
    return (
        <div className="everyeplist2" key={index}>
        <span className={isBlueOrGreen}>{item.name}</span><br/>
        <span className="date">{item.air_date}</span>
        <div className={width>"1600" || index===9 ?" ": "borderCol"}></div>
        </div>
    );
  });

  return (
    <div className="eplist2">
    {episodesList2}
    </div>
  );
}

export default EpisodeBlock;
