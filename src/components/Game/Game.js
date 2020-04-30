import React, { useEffect } from 'react';
import { useRef } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { useState } from 'react';
import pixelboy from './img/pixelboy.png';

let roomIndices = {};
let roomRectangles = [];
let playerInfo = null;
let roomData = [];

function App() {
  let [playerLocation, setPlayerLocation] = useState([NaN, NaN]);

  const canvasRef = useRef(null);

  useEffect(() => {
    axiosWithAuth().get("/adv/init/")
      .then(res => {
        console.log(res.data)
        playerInfo = res.data
        setPlayerLocation(roomRectangles[roomIndices[res.data.title]])
        makeRoomRectangles(res.data.sewer_map.rooms)
        console.log(roomIndices, roomRectangles)
        console.log(roomRectangles[roomIndices[res.data.room_id]])
        drawRectangles(roomRectangles[roomIndices[res.data.title]])
        // axiosWithAuth().get("/adv/rooms/")
        //   .then(res2 => {
        //     console.log(res2.data)
        //     makeRoomRectangles(JSON.parse(res2.data.rooms))
        //     console.log(playerInfo)
        //     drawRectangles(roomRectangles[roomIndices[playerInfo.title]])

        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  function updateCanvas(x, y, color) {
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = color
    ctx.fillRect(x * 100 + 540, y * 100 + 360, 100, 100);
  }

  function drawRectangles(playerLoc) {
    console.log(playerLoc)
    roomRectangles.map((room, index) => {
      console.log(playerLoc)
      if (room[0] == playerLoc[0] && room[1] == playerLoc[1]) {
        updateCanvas(room[0], room[1], "green")
      } else {
        console.log("i'm here")
        console.log(roomData)
        if (roomData[roomIndices[playerInfo.title]].fields.n_to == index + 1) {
          updateCanvas(room[0], room[1], "red")
        } else if (roomData[roomIndices[playerInfo.title]].fields.e_to == index + 1) {
          updateCanvas(room[0], room[1], "red")

        } else if (roomData[roomIndices[playerInfo.title]].fields.s_to == index + 1) {
          updateCanvas(room[0], room[1], "red")

        } else if (roomData[roomIndices[playerInfo.title]].fields.w_to == index + 1) {
          updateCanvas(room[0], room[1], "red")

        } else {
          updateCanvas(room[0], room[1], "black")

        }
      }
    })
  }

  function makeRoomRectangles(roomData2) {
    console.log(roomData2)
    roomRectangles = []
    roomData2.map(item => {
      roomRectangles.push(null)
    })
    roomData2.sort(function (a, b) {
      if (a.id > b.id) {
        return 1
      }
      return -1
    })

    console.log(roomData2)
    roomData = roomData2
    let queue = []
    let visited = []
    roomData.map(room => {
      visited.push(false)
    })
    console.log(roomData[0])
    queue.push([roomData[0], 0, 0])
    visited[0] = true

    console.log(queue)
    while (queue.length !== 0) {
      for (let i = 0; i < queue.length; i++) {
        let node = queue.shift()
        // console.log(node[0])
        let x = node[1]
        let y = node[2]
        let room = node[0].fields
        roomRectangles[node[0].id - 1] = [x, y]
        roomIndices[room.title] = node[0].id - 1
        if (room.n_to != 0 && !visited[room.n_to - 1]) {
          queue.push([roomData[room.n_to - 1], x, y - 1])
          visited[room.n_to - 1] = true
        }
        if (room.e_to != 0 && !visited[room.e_to - 1]) {
          queue.push([roomData[room.e_to - 1], x + 1, y])
          visited[room.e_to - 1] = true
        }
        if (room.s_to != 0 && !visited[room.s_to - 1]) {
          queue.push([roomData[room.s_to - 1], x, y + 1])
          visited[room.s_to - 1] = true
        }
        if (room.w_to != 0 && !visited[room.w_to - 1]) {
          queue.push([roomData[room.w_to - 1], x - 1, y])
          visited[room.s_to - 1] = true
        }
      }
    }
  }

  function postMove(direction) {
    axiosWithAuth().post("adv/move/", { direction: direction })
      .then(res => {
        playerInfo = res.data
        setPlayerLocation(roomRectangles[roomIndices[res.data.title]])
        drawRectangles(roomRectangles[roomIndices[res.data.title]])

      })
      .catch(err => {
        console.log(err)
      })
  }
  function NClick() {
    postMove("n")
  }
  function EClick() {
    postMove("e")
  }
  function SClick() {
    postMove("s")
  }
  function WClick() {
    postMove("w")
  }


  return (
    <>
      <h3 style={{textAlign:"center"}}>Game Controls</h3>
      <table
        style={{border: "1px solid black", margin: "2% auto", padding: "5px", backgroundColor: "#4B3C39"}}
      >
        <tr>
          <td>

          </td>
          <td>
            <button onClick={NClick}>
              N
            </button>
          </td>
          <td>

          </td>
        </tr>
        <tr>
          <td>
            <button onClick={WClick}>
              W
            </button>
          </td>
          <td>

          </td>
          <td>
            <button onClick={EClick}>
              E
            </button>
          </td>
        </tr>
        <tr>
          <td>

          </td>
          <td>
            <button onClick={SClick}>
              S
            </button>
          </td>
          <td>
          </td>
        </tr>
      </table>
      <img src={pixelboy} alt="pixel warrior boy" style={{margin: "auto", display: "block"}}/>
      <canvas
        style={{border: "5px solid black", margin: "auto", width: "50%", display: "block", backgroundColor: '#9B7653'}}
        ref={canvasRef}
        width={"1280px"}
        height={"720px"}
      />
      {playerInfo ? <div>
        <h1 style={{textAlign:"center"}}>
          You await your expedition in the {playerInfo.title}.
        </h1>
        <h3 style={{textAlign:"center"}}>
          ...And...{playerInfo.description}...
        </h3>
        <h3 style={{textAlign:"center", paddingTop: 100}}>
          Look at all the explorers in the room! There must be something big and shiny hidden in here.
        </h3>
        <div style={{display: 'flex', margin: 'auto', width: '80%', flexWrap: 'wrap', justifyContent: "space-around"}}>
          {playerInfo.players.map(player => (
            <h6 key={player} style={{textAlign:"center", marginRight: 10}}>
              {player} 
            </h6>
          ))}
        </div>
      </div> : null}
    </>

  )
}
export default App;