import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { ApolloProvider, ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';
import { fontSize } from '@mui/system';
import { useFonts } from 'expo-font';


const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
}); 

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




export default function App() {
  
  const [loaded] = useFonts({
  'LatoReg': require('./assets/fonts/Lato-Regular.ttf'),
  'LatoB': require('./assets/fonts/Lato-Bold.ttf'),
});

if (!loaded) {
  return null;
}

  return (
    <ApolloProvider client={client}>
      <ScrollView contentContainerStyle={styles.container}>
        <TopBar style={styles.naviBar}/>
        <Text style={styles.textStyle}>Episodes of the<Text style={styles.textStyleBold}> 4th</Text>
        {"\n"}season of the series{"\n"}<Text style={styles.textStyleBlue}>Rick and Morty</Text></Text>
        <Image 
          style={styles.image}
          source={require("./assets/image.png")}/>
        <EpiosodeList />
        <Text style={styles.footer}>LOREM ©IPSUM</Text>
      </ScrollView>
    </ApolloProvider>
  );
};

function TopBar() {
  return(
    <Text style={styles.naviBar}>LOREM IPSUM</Text>
  )
}

function EpiosodeList() {
  const {loading: loading1, error: error1, data: data1 } = useQuery(GET_DATA);
  const {loading: loading2, error: error2, data: data2} = useQuery(TO_ASSIGN);
  
  if (loading1 || loading2) return <Text>Loading...</Text>;
  if (error1 || error2) return <Text>Error :(</Text>;

  const allResults = [...data1.page2.results, ...data2.page3.results];
  const filteredData = allResults.filter(item => item.episode.startsWith('S04'));

  let styleforBlock = styles.episodeBlock;

  const episodesLi = filteredData.map((item, index) => {
    const styleforName = index%2 === 0 ? styles.blue : styles.green;

    if(index===9) styleforBlock = styles.lastElem;
    return (
        <View style={styleforBlock} key={index}>
          <Text style={styles.episodeNum}>{item.episode}</Text>
          <Text style={styleforName}>{item.name}</Text>
          <Text style={styles.date}>{item.air_date}</Text>
        </View>
    );
  });
  return(
    <View style={styles.episodesContainer}>
      {episodesLi} 
    </View>
  );
};

const styles = StyleSheet.create({
container: {
flexDirection: "column",
backgroundColor: '#fff',
justifyContent: 'center',
alignItems: 'center',
fontFamily: 'LatoReg'
},
image: {
resizeMode: 'center',
borderRadius: 0,
marginTop: "-35%",
marginBottom: "-35%"
},
textStyle: {
fontFamily: 'LatoReg',
marginLeft: "5%",
marginRight: "5%",
marginTop: "10%",
marginBottom: "0%",
fontSize: "28%",
justifyContent: "center",
},
textStyleBold: {
fontFamily: 'LatoB',
fontSize: "28%",
},
textStyleBlue: {
fontSize: "32%",
color: "#00BDD4",
fontFamily: 'LatoB'
},
blue: {
fontSize: "14%",
color: "#00BDD4",
fontFamily: 'LatoB',
marginVertical: "1%",
flexDirection: "row",
flexWrap: "nowrap",
whiteSpace: "nowrap",
allowTextWrap: "false"
},
green: {
fontSize: "14%",
color: "#c9e140",
fontWeight: "bold",
fontFamily: 'LatoB',
marginVertical: "1%",
flexDirection: "row",
flexWrap: "nowrap",
whiteSpace: "nowrap",
allowTextWrap: "false"
},
date: {
fontSize: "14%",
color: "grey",
fontWeight: "bold",
fontFamily: 'LatoB',
paddingBottom: "5%",
paddingTop: "2%"
},
episodeNum: {
fontSize: "18%",
color: "black",
fontWeight: "bold",
fontFamily: 'LatoB',
marginVertical: "1%"
},
episodeBlock: {
flexDirection: "column",
borderBottomColor: "grey",
borderBottomWidth: 1,
marginHorizontal: "3%",
marginVertical: "2%",
allowTextWrap: "false"
},
lastElem: {
flexDirection: "column",
marginHorizontal: "3%",
marginVertical: "2%"
},
naviBar: {  
  backgroundColor: "#c9e140",
  width: "100%",
  padding: "6%",
  fontFamily: 'LatoB' ,
  fontSize: "28%",
  textAlign: "center",
},
episodesContainer: {
  flexWrap: "nowrap",
},
footer: {
  backgroundColor: "#454545",
  color: "white",
  padding: "5%",
  marginTop: "7%",
  width: "100%",
  textAlign: "center" ,
  fontWeight: "600"
}

});