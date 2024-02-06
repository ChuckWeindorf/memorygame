import React, {Component} from "react";
import "./App.css"
//STRANGE BEHAVIOR OF THIS MODULE.  ConponentDidMount executes twice on start.
// array and variables after update do not appear updated in console log.  Transfer to local
// variables to allow my logic to work.  For example when the state.guessCount is pushed as 10, 
// it still remains 9 until the next pass.  However, if I test a local variable, it works.
let vbolSkipOne = true;  //global skip once variable


//Found out - react setstate is asynch and may not update quickly.  Use temp variables for all objects.

//Big question - does render wait until all asynch setstates are done?
class App extends Component {
  constructor(props){
    super(props); 
    this.state = 
        {
          baseballTeams: [{team: "pirates", color: ["rgb(39,37,31)", "rgb(253,184,39)"]},
          {team: "cubs", color: ["rgb(14, 51, 134)", "rgb(204, 52, 51)"]},
          {team: "cardinals", color: ["rgb(196, 30, 58)", "rgb(12, 35, 64)"]},
          {team: "brewers", color: ["rgb(255, 197, 47)", "rgb(18, 40, 75)"]},
          {team: "reds", color: ["rgb(198,1,31)", "rgb(255,255,255)"]},
          {team: "mets", color: ["rgb(0, 45, 114)", "rgb(252, 89, 16)"]},
          {team: "braves", color: ["rgb(206, 17, 65)", "rgb(19, 39, 79)"]},
          {team: "nationals", color: ["rgb(171,0,3)", "rgb(20,34,90)"]},
          {team: "marlins", color: ["rgb(0, 163, 224)", "rgb(239, 51, 64)"]},
          {team: "padres", color: ["rgb(47, 36, 29)", "rgb(255, 196, 37)"]}   ],
          currentTeam: -1,
          teamNew: false,
          guessCount: 0,
          seenBefore: [],
          winner: false
          }
          this.checkGuess = this.checkGuess.bind(this);
          this.newGame = this.newGame.bind(this);
  }

  componentDidMount() {this.generateOneRandomTeam()}

  generateOneRandomTeam()
    {       
      if (vbolSkipOne) {vbolSkipOne = false}
      else {
        const cint = Math.trunc((10*Math.random()));
        let varr = this.state.seenBefore;
        let vintSeen = varr.indexOf(cint);
        if (vintSeen == -1) 
            { varr.push(cint);
            //console.log("First time Temp array " + varr);
            this.setState({seenBefore: varr});
            let varr2 = this.state.seenBefore;
            //console.log(varr2);
           this.setState({teamNew: true})}
      else {
            //console.log("Second Time " + this.state.baseballTeams[cint].team);
            this.setState({teamNew: false})};
      this.setState({currentTeam: cint});
          }
    }
  
  checkGuess(event)
       {
        //console.log(event.target.id, this.state.teamNew, this.state.seenBefore);
        let vtmp = this.state.guessCount;
        if ((event.target.id == "B1" && this.state.teamNew) |
            (event.target.id == "B2" && !this.state.teamNew) )
            {
            this.setState({guessCount: 0,
                           seenBefore: []})
            }
        else 
            {
            vtmp++
            this.setState({guessCount: vtmp});
            }

        if (vtmp == 10) 
             {
              //console.log("winner")
              this.setState({winner: true});
             }
        else {this.generateOneRandomTeam()};
    }

  newGame(event)
    {
        this.setState({
          winner: false,
          guessCount: 0,
          seenBefore: [],
          currentTeam: -1
        })
        //console.log("Reset Start");
        setTimeout(() => {  this.generateOneRandomTeam(); }, 1000);
        //console.log("Reset End");       
    }

  render (){

    return ( 
      <>
      <div id="overall">
      <h1>Baseball Memory Game</h1>
      {this.state.winner && 
      <div>
      <div id="winner">You have officially won the game!</div>
      <div><button key="B3" id="B3" onClick={this.newGame}>New Game</button></div>
      </div>
      }  
      {this.state.currentTeam > -1 &&  !this.state.winner &&
      <div>
      <h2>From the start of the game, decide if you have seen the team before.</h2>
      <h3>To win, get ten correct answers in a row.</h3>
      <p id="guesses">You have {this.state.guessCount} correct in a row.</p>
      <div id="buttonCont">
         <div><button  key="B1" id="B1" onClick={this.checkGuess}>Yes</button></div>
         <div><button  key="B2" id="B2" onClick={this.checkGuess}>No</button></div>
         <div id="team">
         <div id="cwcolor1" key="cwcolor1"
             style={{backgroundColor: this.state.baseballTeams
                    [this.state.currentTeam].color[0]
                    }}>            
          <div id="cwcolor2" key="cwcolor2"            
              style={{backgroundColor: this.state.baseballTeams
                    [this.state.currentTeam].color[1]
                    }}>
            </div> 
            <img src={"./src/images/" + 
              this.state.baseballTeams
                  [this.state.currentTeam].team + ".png"} id="image">
              </img>
            </div>
          </div>               
          </div> 
      </div>
         }
      </div>
      </>
    )
  }
}

//This links to main.jsx - look within the root element of main
export default App

