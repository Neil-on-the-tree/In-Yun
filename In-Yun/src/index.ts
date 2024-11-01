import Matter from "matter-js";
import "matter-attractors";
Matter.use("matter-attractors");

// module aliases
var Engine = Matter.Engine,
  Events = Matter.Events,
  Body = Matter.Body,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// create an engine
var engine = Engine.create();
//update gravity
engine.world.gravity.scale = 3 * 1e-5;

// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    wireframes: false,
    showAngleIndicator: false,
  },
});

let att = 1e-8;
let wide = 20;

let profiles = [
  //#1 Ross(O-N)
  {
    x: Math.random() * (render.options.width - 200) + 100,
    y: 10,
    width: wide,
    color: "#FFB341",
    attraction: -0.5 * att,
  },
  //#2 Monica(C-A)
  {
    x: Math.random() * (render.options.width - 200) + 100,
    y: 10,
    width: wide,
    color: "#6184FF",
    attraction: 5 * att,
  },
  //#3 Chandler(N-O)
  {
    x: Math.random() * (render.options.width - 200) + 100,
    y: 10,
    width: wide,
    color: "#FF3C3C",
    attraction: -1.5 * att,
  },
  //#4 Joey(O-N)
  {
    x: Math.random() * (render.options.width - 200) + 100,
    y: 10,
    width: wide,
    color: "#DB4DFF",
    attraction: -0.5 * att,
  },
  //#5 Phoebe(O-A)
  {
    x: Math.random() * (render.options.width - 200) + 100,
    y: 10,
    width: wide,
    color: "#9BF059",
    attraction: 3 * att,
  },
  //#6 Rachel(O-E)
  {
    x: Math.random() * (render.options.width - 200) + 100,
    y: 10,
    width: wide,
    color: "#F5F931",
    attraction: 0.5 * att,
  },
  //#7 Yujia(O-C)
  {
    x: Math.random() * (render.options.width - 200) + 100,
    y: 10,
    width: wide,
    color: "#ffffff",
    attraction: 3 * att,
  },
  //#8 Fu(O-E)
  {
    x: Math.random() * (render.options.width - 200) + 100,
    y: 10,
    width: wide,
    color: "#FFC7D5",
    attraction: 0.5 * att,
  },
  //#9 Carlos(O-A)
  {
    x: Math.random() * (render.options.width - 200) + 100,
    y: 10,
    width: wide,
    color: "#000000",
    attraction: 3 * att,
  },
  // //#10
  // {
  //   x: Math.random() * (render.options.width - 200) + 100,
  //   y: 10,
  //   width: wide,
  //   color: "#ffffff",
  //   attraction: att,
  // },
  // //#11
  // {
  //   x: Math.random() * (render.options.width - 200) + 100,
  //   y: 10,
  //   width: wide,
  //   color: "#ffffff",
  //   attraction: att,
  // },
  // //#12
  // {
  //   x: Math.random() * (render.options.width - 200) + 100,
  //   y: 10,
  //   width: wide,
  //   color: "#ffffff",
  //   attraction: att,
  // },
  // //#13
  // {
  //   x: Math.random() * (render.options.width - 200) + 100,
  //   y: 10,
  //   width: wide,
  //   color: "#ffffff",
  //   attraction: att,
  // },
  // //#14
  // {
  //   x: Math.random() * (render.options.width - 200) + 100,
  //   y: 10,
  //   width: wide,
  //   color: "#ffffff",
  //   attraction: att,
  // },
];

let balls = [];

profiles.forEach(function (i) {
  var boxA = Bodies.circle(i.x, i.y, i.width, {
    render: { fillStyle: i.color },
    plugin: {
      attractors: [
        function (bodyA, bodyB) {
          return {
            x: (bodyA.position.x - bodyB.position.x) * i.attraction,
            y: (bodyA.position.y - bodyB.position.y) * i.attraction,
          };
        },
      ],
    },
  });
  balls.push(boxA);
  Composite.add(engine.world, [boxA]);
});

//add some normal people
// for (var i = 0; i < 20; i += 1) {
//   var body = Bodies.circle(
//     Matter.Common.random(0, render.options.width),
//     Matter.Common.random(0, render.options.height),
//     12
//   );

//   Composite.add(engine.world, [body]);
// }

//add some bodies that to be obsticles
for (var i = 0; i < 30; i += 1) {
  var body = Bodies.polygon(
    Math.random() * (render.options.width - 200) + 100,
    Math.random() * (render.options.height - 200) + 100,
    Matter.Common.random(3, 5),
    Matter.Common.random() > 0.7
      ? Matter.Common.random(100, 150)
      : Matter.Common.random(10, 30),
    { isStatic: true }
  );
  Composite.add(engine.world, [body]);
}

// add ground
// var ground = Bodies.rectangle(
//   render.options.width / 2,
//   render.options.height - 5,
//   render.options.width,
//   10,
//   { isStatic: true }
// );
// Composite.add(engine.world, [ground]);

// add wall1
var wall1 = Bodies.rectangle(
  render.options.width - 5,
  render.options.height / 2,
  10,
  render.options.height,
  { isStatic: true }
);
Composite.add(engine.world, [wall1]);

// add wall2
var wall2 = Bodies.rectangle(
  5,
  render.options.height / 2,
  10,
  render.options.height,
  { isStatic: true }
);
Composite.add(engine.world, [wall2]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

//update

// Events.on(engine, "afterUpdate", function () {
//   Body.translate(balls[0], {
//     x: (balls[1].position.x - balls[0].position.x) * 1e-6,
//     y: (balls[1].position.y - balls[0].position.y) * 1e-6,
//   });
// });
