function angle(cx, cy, ex, ey)
{
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

function angle360(cx, cy, ex, ey)
{
  var theta = angle(cx, cy, ex, ey); // range (-180, 180]
  if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

const canvas = document.createElement("canvas")
document.querySelector("body").appendChild(canvas)
const ctx = canvas.getContext("2d")

canvas.width = canvas.height = 600
canvas.style.width = "600px"
canvas.style.height = "600px"
canvas.style.border = "1px solid black"
canvas.style.display = "block"
canvas.style.margin = "auto"

function getRandomPoints(number)
{
  let points = []

  for (let i = 0; i < number; i++)
  {

    let point = {
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * canvas.width)
    }
    points.push(point)
  }

  return points.sort((a, b) => a.x - b.x)
}

function createRandomPoly(edges)
{
  let points = getRandomPoints(edges)
  points[0] = { x: canvas.width / 2, y: canvas.height / 2 }

  for (let i = 0; i < points.length; i++)
  {
    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    ctx.lineTo(points[i].x, points[i].y)
    ctx.stroke()
  }

  points = points.sort((a, b) => angle360(canvas.width / 2, canvas.height / 2, a.x, a.y) - angle360(canvas.width / 2, canvas.height / 2, b.x, b.y))
  points = points.filter(point => angle360(canvas.width / 2, canvas.height / 2, point.x, point.y) !== 0)

  console.log(points)

  for (let i = 0; i < points.length; i++)
  {
    ctx.fillStyle = 'black'
    if (points[i + 1])
    {
      ctx.moveTo(points[i].x, points[i].y)
      ctx.lineTo(points[i + 1].x, points[i + 1].y)
    }
    ctx.stroke()
  }
}

createRandomPoly(4)

