  import React, { useEffect, useState } from 'react';
  import './index.css';
  import image from "./images/image.png";
  import EpisodeBlock from './EpisodeBlock';
  import EpisodeNumber from './EpisodeNumber';

  function Header(){
    return(
      <header className="bar">LOREM IPSUM</header>
    )
  }

  function Footer(){
    return(
      <footer>
        LOREM IPSUM ©2021
      </footer>
    )
  }

  function Image(){
    return(
        <img className="image"src={image} alt="oks"/>
    )
  }

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

  function Site(){

    const width = WindowSize();

    const classforContainer = {
      row: {
        containerRow: "contentRow",
        borderRow: "borderRow",
        rightRow: "right"
      },
      column: {
        containerCol: "contentCol",
        borderCol: "borderCol",

      }
    }

    return(
      <div>
      <Header />
      <div className={(width>"1600"?classforContainer.row.containerRow:classforContainer.column.containerCol)}>
    <div className="left">
        Episodes of the <b>4th</b><br/>season of the series<br/><p className="title">Rick and Morty</p>
        <Image/>
    </div>
    <nav className={width>"1600"?classforContainer.row.rightRow:"bottompart"}>
      <EpisodeNumber/><div className={(width>"1600"?classforContainer.row.borderRow:" ")}></div><EpisodeBlock/>
    </nav>
    </div>
    <Footer/>
    </div>
  )
  }

  export default Site;



