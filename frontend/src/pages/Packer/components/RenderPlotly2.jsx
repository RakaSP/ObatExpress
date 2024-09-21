import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faAnglesLeft,
  faAngleRight,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons'

const RenderPlotly = ({ container }) => {
  const [plotData, setPlotData] = useState([])
  const [cam, setCam] = useState({ x: 1.5, y: 1.5, z: 0 })
  const ticks = [
    Math.floor(container.SizeX / 10),
    Math.floor(container.SizeY / 10),
    Math.floor(container.SizeZ / 10),
  ]
  const layout = {
    scene: {
      camera: {
        eye: cam,
      },
      xaxis: {
        range: [0, container.SizeX * 1.3],
        tickvals: Array.from({ length: ticks[0] }, (_, i) => i * 10),
        ticktext: Array.from({ length: ticks[0] }, (_, i) => i * 10),
        nticks: ticks[0],
        showgrid: false,
        zeroline: false,
        showline: false,
        showspikes: false,
      },
      yaxis: {
        range: [0, container.SizeY],
        tickvals: Array.from({ length: ticks[1] }, (_, i) => i * 10),
        ticktext: Array.from({ length: ticks[1] }, (_, i) => i * 10),
        nticks: ticks[1],
        showgrid: false,
        zeroline: false,
        showline: false,
        showspikes: false,
      },
      zaxis: {
        range: [0, container.SizeZ],
        tickvals: Array.from({ length: ticks[2] }, (_, i) => i * 10),
        ticktext: Array.from({ length: ticks[2] }, (_, i) => i * 10),
        nticks: ticks[2],
        showgrid: false,
        zeroline: false,
        showline: false,
        showspikes: false,
      },
    },
  }
  const [itemCount, setItemCount] = useState(1)
  const containerSize = [
    {
      SizeX: container.SizeX,
      SizeY: container.SizeY,
      SizeZ: container.SizeZ,
    },
  ]

  const packData = container.ItemList.slice(0, itemCount)
  const boxPos = [0, 0, 0]
  const boxSize = [
    containerSize[0].SizeX,
    containerSize[0].SizeY,
    containerSize[0].SizeZ,
  ]

  let itemPosList = []
  let itemSizeList = []
  let productCodeList = []
  packData.forEach((item) => {
    itemPosList.push([item.PosX, item.PosY, item.PosZ])
    itemSizeList.push([item.SizeX, item.SizeY, item.SizeZ])
    productCodeList.push(item.product_code)
  })

  function getCubeEdges(pos, size) {
    const x1 = [pos[0], pos[0] + size[0], pos[0] + size[0], pos[0]]
    const y1 = [pos[1], pos[1], pos[1] + size[1], pos[1] + size[1]]
    const z1 = [pos[2], pos[2], pos[2], pos[2]]

    const x2 = [pos[0], pos[0], pos[0], pos[0]]
    const y2 = [pos[1], pos[1], pos[1] + size[1], pos[1] + size[1]]
    const z2 = [pos[2], pos[2] + size[2], pos[2] + size[2], pos[2]]

    const x3 = [pos[0], pos[0] + size[0], pos[0] + size[0]]
    const y3 = [pos[1] + size[1], pos[1] + size[1], pos[1] + size[1]]
    const z3 = [pos[2] + size[2], pos[2] + size[2], pos[2]]

    const x4 = [pos[0] + size[0], pos[0] + size[0], pos[0] + size[0]]
    const y4 = [pos[1] + size[1], pos[1], pos[1]]
    const z4 = [pos[2] + size[2], pos[2] + size[2], pos[2]]

    const x5 = [pos[0] + size[0], pos[0]]
    const y5 = [pos[1], pos[1]]
    const z5 = [pos[2] + size[2], pos[2] + size[2]]

    return [
      x1.concat(x2, x3, x4, x5),
      y1.concat(y2, y3, y4, y5),
      z1.concat(z2, z3, z4, z5),
    ]
  }

  function getEdgesImg(pos, size, color) {
    const [boxX, boxY, boxZ] = getCubeEdges(pos, size)
    return {
      type: 'scatter3d',
      mode: 'lines',
      x: boxX,
      y: boxY,
      z: boxZ,
      line: {
        width: 6,
        color: color,
        reversescale: false,
      },
    }
  }

  function getCubeMesh(pos, size) {
    const meshX = [
      pos[0],
      pos[0],
      pos[0] + size[0],
      pos[0] + size[0],
      pos[0],
      pos[0],
      pos[0] + size[0],
      pos[0] + size[0],
    ]
    const meshY = [
      pos[1],
      pos[1] + size[1],
      pos[1] + size[1],
      pos[1],
      pos[1],
      pos[1] + size[1],
      pos[1] + size[1],
      pos[1],
    ]
    const meshZ = [
      pos[2],
      pos[2],
      pos[2],
      pos[2],
      pos[2] + size[2],
      pos[2] + size[2],
      pos[2] + size[2],
      pos[2] + size[2],
    ]
    return [meshX, meshY, meshZ]
  }

  function getMeshImg(pos, size, color) {
    const [meshX, meshY, meshZ] = getCubeMesh(pos, size)
    return {
      type: 'mesh3d',
      x: meshX,
      y: meshY,
      z: meshZ,
      i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
      j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
      k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
      color: color,
    }
  }
  function getArrowImg() {
    const shaftwidth = container.SizeY / 20
    const thickness = container.SizeZ / 30
    const shaftX = [container.SizeX * 1.15, container.SizeX * 1.3]
    const shaftY = [
      container.SizeY / 2 - shaftwidth,
      container.SizeY / 2 + shaftwidth,
    ]
    const shaftZ = [
      container.SizeZ / 2 - thickness,
      container.SizeZ / 2 + thickness,
    ]
    const shaft = {
      type: 'mesh3d',
      x: [
        shaftX[0],
        shaftX[0],
        shaftX[1],
        shaftX[1],
        shaftX[0],
        shaftX[0],
        shaftX[1],
        shaftX[1],
      ],
      y: [
        shaftY[0],
        shaftY[1],
        shaftY[1],
        shaftY[0],
        shaftY[0],
        shaftY[1],
        shaftY[1],
        shaftY[0],
      ],
      z: [
        shaftZ[0],
        shaftZ[0],
        shaftZ[0],
        shaftZ[0],
        shaftZ[1],
        shaftZ[1],
        shaftZ[1],
        shaftZ[1],
      ],

      i: [0, 0, 4, 4, 4, 4, 5, 5, 7, 7, 0, 0],
      j: [1, 2, 5, 6, 0, 3, 1, 2, 2, 6, 1, 5],
      k: [2, 3, 6, 7, 3, 7, 2, 6, 3, 2, 5, 4],
      lighting: false,
      color: 'green',
      opacity: 1,
    }

    const arrowX = [container.SizeX, shaftX[0]]
    const arrowY = [
      shaftY[0] - container.SizeY / 20,
      container.SizeY / 2,
      shaftY[1] + container.SizeY / 20,
    ]
    const arrowZ = shaftZ
    const arrowhead = {
      type: 'mesh3d',
      x: [arrowX[1], arrowX[1], arrowX[0], arrowX[1], arrowX[1], arrowX[0]],
      y: [arrowY[2], arrowY[0], arrowY[1], arrowY[2], arrowY[0], arrowY[1]],
      z: [arrowZ[0], arrowZ[0], arrowZ[0], arrowZ[1], arrowZ[1], arrowZ[1]],
      i: [0, 0, 2, 1, 2, 3, 4, 4],
      j: [1, 3, 3, 4, 4, 4, 3, 0],
      k: [2, 2, 5, 2, 5, 5, 0, 1],
      color: 'green',
    }
    return [shaft, arrowhead]
  }

  function generatePlotData() {
    const plotData = []
    plotData.push(getEdgesImg(boxPos, boxSize, 'red'))

    for (let i = 0; i < itemPosList.length; i++) {
      const color = i === itemPosList.length - 1 ? 'lightblue' : 'grey'
      const item_img = getMeshImg(itemPosList[i], itemSizeList[i], color)
      const item_edge_img = getEdgesImg(
        itemPosList[i],
        itemSizeList[i],
        'black'
      )
      plotData.push(item_img, item_edge_img)
    }

    plotData.push(...getArrowImg())

    return plotData
  }
  useEffect(() => {
    setPlotData(generatePlotData())
  }, [itemCount])

  const createGridLine = () => {
    // Create Z Axis
    const gridLines = []
    for (let i = 0; i < ticks[2]; i++) {
      if (cam.x >= 0) {
        gridLines.push({
          type: 'scatter3d',
          mode: 'lines',
          x: [0, 0],
          y: [0, container.SizeY],
          z: [i * 10, i * 10],
          line: { color: 'grey', width: 1 },
          hoverinfo: 'none',
          showlegend: false,
        })
      } else if (cam.x < 0) {
        gridLines.push({
          type: 'scatter3d',
          mode: 'lines',
          x: [container.SizeX, container.SizeX],
          y: [0, container.SizeY],
          z: [i * 10, i * 10],
          line: { color: 'grey', width: 1 },
          hoverinfo: 'none',
          showlegend: false,
        })
      }
      if (cam.y >= 0) {
        gridLines.push({
          type: 'scatter3d',
          mode: 'lines',
          x: [0, container.SizeX],
          y: [0, 0],
          z: [i * 10, i * 10],
          line: { color: 'grey', width: 1 },
          hoverinfo: 'none',
          showlegend: false,
        })
        // gridLines.push({
        //   type: "scatter3d",
        //   mode: "text",
        //   text: `${i * 10}`,
        //   x: [container.SizeX + 10],
        //   y: [0],
        //   z: [i * 10],
        //   textposition: "center",
        //   hoverinfo: "none",
        //   showlegend: false,
        // });
      } else if (cam.y < 0) {
        gridLines.push({
          type: 'scatter3d',
          mode: 'lines',
          x: [0, container.SizeX],
          y: [container.SizeY, container.SizeY],
          z: [i * 10, i * 10],
          line: { color: 'grey', width: 1 },
          hoverinfo: 'none',
          showlegend: false,
        })
      }
    }

    //Create Y Axis
    for (let i = 0; i < ticks[1]; i++) {
      if (cam.z >= 0) {
        gridLines.push({
          type: 'scatter3d',
          mode: 'lines',
          x: [0, container.SizeX],
          y: [i * 10, i * 10],
          z: [0, 0],
          line: { color: 'grey', width: 1 },
          hoverinfo: 'none',
          showlegend: false,
        })
        // gridLines.push({
        //   type: "scatter3d",
        //   mode: "text",
        //   text: `${i * 10}`,
        //   x: [container.SizeX + 10],
        //   y: [i * 10],
        //   z: [0],
        //   textposition: "center",
        //   hoverinfo: "none",
        //   showlegend: false,
        // });
      } else if (cam.z < 0) {
        gridLines.push({
          type: 'scatter3d',
          mode: 'lines',
          x: [0, container.SizeX],
          y: [i * 10, i * 10],
          z: [container.SizeZ, container.SizeZ],
          line: { color: 'grey', width: 1 },
          hoverinfo: 'none',
          showlegend: false,
        })
        // gridLines.push({
        //   type: "scatter3d",
        //   mode: "text",
        //   text: `${i * 10}`,
        //   x: [container.SizeX + 10],
        //   y: [i * 10],
        //   z: [container.SizeZ],
        //   textposition: "center",
        //   hoverinfo: "none",
        //   showlegend: false,
        // });
      }
      if (cam.x >= 0) {
        gridLines.push({
          type: 'scatter3d',
          mode: 'lines',
          x: [0, 0],
          y: [i * 10, i * 10],
          z: [0, container.SizeZ],
          line: { color: 'grey', width: 1 },
          hoverinfo: 'none',
          showlegend: false,
        })
      } else if (cam.x < 0) {
        gridLines.push({
          type: 'scatter3d',
          mode: 'lines',
          x: [container.SizeX, container.SizeX],
          y: [i * 10, i * 10],
          z: [0, container.SizeZ],
          line: { color: 'grey', width: 1 },
          hoverinfo: 'none',
          showlegend: false,
        })
      }
    }

    // Create X Axis
    for (let i = 0; i < ticks[0]; i++) {
      if (cam.z >= 0) {
        gridLines.push({
          type: 'scatter3d',
          mode: 'lines',
          x: [i * 10, i * 10],
          y: [0, container.SizeY],
          z: [0, 0],
          line: { color: 'grey', width: 1 },
          hoverinfo: 'none',
          showlegend: false,
        })
      } else if (cam.z < 0) {
        gridLines.push({
          type: 'scatter3d',
          mode: 'lines',
          x: [i * 10, i * 10],
          y: [0, container.SizeY],
          z: [container.SizeZ, container.SizeZ],
          line: { color: 'grey', width: 1 },
          hoverinfo: 'none',
          showlegend: false,
        })
      }
      if (cam.y >= 0) {
        gridLines.push({
          type: 'scatter3d',
          mode: 'lines',
          x: [i * 10, i * 10],
          y: [0, 0],
          z: [0, container.SizeZ],
          line: { color: 'grey', width: 1 },
          hoverinfo: 'none',
          showlegend: false,
        })
      } else if (cam.y < 0) {
        gridLines.push({
          type: 'scatter3d',
          mode: 'lines',
          x: [i * 10, i * 10],
          y: [container.SizeY, container.SizeY],
          z: [0, container.SizeZ],
          line: { color: 'grey', width: 1 },
          hoverinfo: 'none',
          showlegend: false,
        })
      }
    }
    return gridLines
  }
  const gridLines = [...createGridLine()]
  const handleRelayout = (eventData) => {
    const camera = eventData['scene.camera']
    if (camera && camera.eye) setCam(camera.eye)
  }
  return (
    <>
      <div className="p-[20px] w-[100vh]">
        <Plot
          data={[...plotData, ...gridLines]}
          layout={layout}
          style={{ width: '100%', height: '70vh' }}
          onRelayout={handleRelayout}
        />
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setItemCount(1)}
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
        </button>
        <button
          onClick={() => setItemCount((prev) => Math.max(1, prev - 1))}
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button
          onClick={() =>
            setItemCount((prev) =>
              Math.min(prev + 1, container.ItemList.length)
            )
          }
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <button
          onClick={() => setItemCount(container.ItemList.length)}
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          <FontAwesomeIcon icon={faAnglesRight} />
        </button>
      </div>
    </>
  )
}

export default RenderPlotly
