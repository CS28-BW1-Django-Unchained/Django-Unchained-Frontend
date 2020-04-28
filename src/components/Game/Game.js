import React, { useEffect } from 'react'
import { useRef } from 'react'
import { axiosWithAuth } from '../../utils/axiosWithAuth'
import { useState } from 'react'

let roomRectangles = []

function App() {
  let [playerInfo, setPlayerInfo] = useState()
  let [playerLocation, setPlayerLocation] = useState([0, 0])
  let [roomData, setRoomData] = useState()
  const canvasRef = useRef(null)

  useEffect(() => {
    axiosWithAuth().get("https://lambda-mud-test.herokuapp.com/api/adv/init/")
      .then(res => {
        setPlayerInfo(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  let newArr = roomRectangles.slice(0)
  function updateCanvas(x, y, color) {
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillRect(x * 100 + 640, y * 100 + 360, 100, 100);
    ctx.fillStyle = color

  }
  newArr.map(room => {
    console.log(playerLocation)
    if (room[0] == playerLocation[0] && room[1] == playerLocation[1]) {
      console.log("Player is here")
      console.log(room[0], room[1])
      updateCanvas(room[0], room[1], "green")
    } else if (room[0] != playerLocation[0] && room[1] != playerLocation[1] || room[0] != playerLocation[0] && room[1] == playerLocation[1] || room[0] == playerLocation[0] && room[1] != playerLocation[1]) {
      console.log("room here")
      console.log(room[0], room[1])
      setTimeout(function () {
        updateCanvas(room[0], room[1], "black")

      }, 100)
    }

  })
  useEffect(() => {
    axiosWithAuth().get("https://lambda-mud-test.herokuapp.com/api/adv/rooms/")
      .then(res => {
        setRoomData(JSON.parse(res.data.rooms))
        makeRoomRectangles(JSON.parse(res.data.rooms))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  function makeRoomRectangles(roomData) {
    roomData.sort(function (a, b) {
      if (a.pk > b.pk) {
        return 1
      }
      return -1
    })
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
        roomRectangles.push([x, y])
        if (room.n_to != 0 && !visited[room.n_to - 1]) {
          queue.push([roomData[room.n_to - 1], x, y - 1])
          console.log(queue.slice(0))
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
        setPlayerInfo(res.data)
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
      {console.log(roomData)
      }
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
          <p>
            {player}
          </p>
        ))}
      </div> : null}
    </>

  )
}
export default App