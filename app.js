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

function angle(cx, cy, ex, ey)
{
  const dy = ey - cy;
  const dx = ex - cx;
  let theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

function getCenter(arr)
{
  const x = arr.map(xy => xy.x);
  const y = arr.map(xy => xy.y);
  const cx = (Math.min(...x) + Math.max(...x)) / 2;
  const cy = (Math.min(...y) + Math.max(...y)) / 2;
  return { x: cx, y: cy };
}

function createRandomPoly(edges)
{
  let points = getRandomPoints(edges)
  const middle = getCenter(points)

  points = points.sort((a, b) => angle(middle.x, middle.y, a.x, a.y) - angle(middle.x, middle.y, b.x, b.y))

  // ctx.moveTo(middle.x, middle.y)
  // ctx.ellipse(middle.x, middle.y, 3, 3, Math.PI / 4, 0, 2 * Math.PI)
  // ctx.stroke()

  for (let i = 0; i < points.length; i++)
  {
    let a = points[i],
      b = points[i + 1]

    if (b)
    {
      ctx.fillStyle = 'black'
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      // ctx.ellipse(a.x, a.y, 3, 3, Math.PI / 4, 0, 2 * Math.PI)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
    }
    else
    {
      ctx.moveTo(a.x, a.y)
      // ctx.ellipse(a.x, a.y, 3, 3, Math.PI / 4, 0, 2 * Math.PI)
      ctx.lineTo(points[0].x, points[0].y)
      ctx.stroke()
    }
  }

}
createRandomPoly(4)