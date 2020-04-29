import React, { useEffect } from 'react'
import { useRef } from 'react'
import { axiosWithAuth } from '../../utils/axiosWithAuth'
import { useState } from 'react'


let roomIndices = {}
let roomRectangles = []
let playerInfo = null
let roomData = []
function App() {
  let [playerLocation, setPlayerLocation] = useState([NaN, NaN])

  const canvasRef = useRef(null)

  useEffect(() => {
    axiosWithAuth().get("https://lambda-mud-test.herokuapp.com/api/adv/init/")
      .then(res => {
        playerInfo = res.data
        setPlayerLocation(roomRectangles[roomIndices[res.data.title]])
        axiosWithAuth().get("https://lambda-mud-test.herokuapp.com/api/adv/rooms/")
          .then(res2 => {
            makeRoomRectangles(JSON.parse(res2.data.rooms))
            console.log(playerInfo)
            drawRectangles(roomRectangles[roomIndices[playerInfo.title]])

          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  function updateCanvas(x, y, color) {
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = color
    ctx.fillRect(x * 100 + 640, y * 100 + 360, 100, 100);
  }
  function drawRectangles(playerLoc) {
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
    roomRectangles = []
    roomData2.map(item => {
      roomRectangles.push(null)
    })
    roomData2.sort(function (a, b) {
      if (a.pk > b.pk) {
        return 1
      }
      return -1
    })
    roomData = roomData2
    let queue = []
    let visited = []
    roomData.map(room => {
      visited.push(false)
    })
    queue.push([roomData[0], 0, 0])
    visited[0] = true
    while (queue.length !== 0) {
      for (let i = 0; i < queue.length; i++) {
        var node = queue.shift()
        let x = node[1]
        let y = node[2]
        let room = node[0].fields
        roomRectangles[node[0].pk - 1] = [x, y]
        roomIndices[room.title] = node[0].pk - 1
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
    axiosWithAuth().post("https://lambda-mud-test.herokuapp.com/api/adv/move/", { direction: direction })
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
      <table>
        <tr>
          <td>

          </td>
          <td>
            <button onClick={NClick}>
              ^
            </button>
          </td>
          <td>

          </td>
        </tr>
        <tr>
          <td>
            <button onClick={WClick}>
              &lt;
            </button>
          </td>
          <td>

          </td>
          <td>
            <button onClick={EClick}>
              &gt;
            </button>
          </td>
        </tr>
        <tr>
          <td>

          </td>
          <td>
            <button onClick={SClick}>
              v
            </button>
          </td>
          <td>

          </td>
        </tr>

      </table>
      <canvas
        style={{ border: "1px solid red", margin: "auto", width: "50%", display: "block" }}
        ref={canvasRef}
        width={"1280px"}
        height={"720px"}
      />
      {playerInfo ? <div>
        <h1>
          {playerInfo.title}
        </h1>
        <h3>
          {playerInfo.description}
        </h3>
        <h1>
          Players in the room
      </h1>
        {playerInfo.players.map(player => (
          <p key={player}>
            {player}
          </p>
        ))}
      </div> : null}
    </>

  )
}
export default App