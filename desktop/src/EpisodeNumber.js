import React from 'react';
import {useQuery, gql} from '@apollo/client';


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

function SeriesNum(){
  const {loading: loading1, error: error1, data: data1 } = useQuery(GET_DATA);
  const {loading: loading2, error: error2, data: data2} = useQuery(TO_ASSIGN);
  
  if (loading1 || loading2) return <p>Loading...</p>;
  if (error1 || error2) return <p>Error :(</p>;

  const allResults = [...data1.page2.results, ...data2.page3.results];
  const filteredData = allResults.filter(item => item.episode.startsWith('S04'));

  const episodesList1 = filteredData.map(item => {
    return(
        <div className="eplist1">
          {item.episode}
        </div>
    );
  });

  return(
    <div className="eplist11">
    {episodesList1}
    </div>
  );

}

export default SeriesNum;