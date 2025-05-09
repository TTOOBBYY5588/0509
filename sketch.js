// Hand Pose Detection with ml5.js
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose

let video;
let handPose;
let hands = [];
let boxX, boxY, boxSize = 100;
let isDragging = false;

function preload() {
  // Initialize HandPose model with flipped video input
  handPose = ml5.handPose({ flipped: true });
}

function mousePressed() {
  console.log(hands);
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  // Start detecting hands
  handPose.detectStart(video, gotHands);

  // Initialize the box position
  boxX = width / 2 - boxSize / 2;
  boxY = height / 2 - boxSize / 2;
}

function draw() {
  image(video, 0, 0);

  // Draw the box
  fill(200, 100, 100, 150);
  noStroke();
  rect(boxX, boxY, boxSize, boxSize);

  // Ensure at least one hand is detected
  if (hands.length > 0) {
    for (let hand of hands) {
      if (hand.confidence > 0.1) {
        // Loop through keypoints and draw circles
        for (let i = 0; i < hand.keypoints.length; i++) {
          let keypoint = hand.keypoints[i];

          // Color-code based on left or right hand
          if (hand.handedness == "Left") {
            fill(255, 0, 255);
          } else {
            fill(255, 255, 0);
          }

          noStroke();
          circle(keypoint.x, keypoint.y, 16);
        }

        // Draw lines connecting keypoints
        stroke(0, 255, 0);
        strokeWeight(2);

        // Connect keypoints 0 to 4
        for (let i = 0; i < 4; i++) {
          line(hand.keypoints[i].x, hand.keypoints[i].y, hand.keypoints[i + 1].x, hand.keypoints[i + 1].y);
        }

        // Connect keypoints 5 to 8
        for (let i = 5; i < 8; i++) {
          line(hand.keypoints[i].x, hand.keypoints[i].y, hand.keypoints[i + 1].x, hand.keypoints[i + 1].y);
        }

        // Connect keypoints 9 to 12
        for (let i = 9; i < 12; i++) {
          line(hand.keypoints[i].x, hand.keypoints[i].y, hand.keypoints[i + 1].x, hand.keypoints[i + 1].y);
        }

        // Connect keypoints 13 to 16
        for (let i = 13; i < 16; i++) {
          line(hand.keypoints[i].x, hand.keypoints[i].y, hand.keypoints[i + 1].x, hand.keypoints[i + 1].y);
        }

        // Connect keypoints 17 to 20
        for (let i = 17; i < 20; i++) {
          line(hand.keypoints[i].x, hand.keypoints[i].y, hand.keypoints[i + 1].x, hand.keypoints[i + 1].y);
        }

        // Check for interaction with the box
        let indexFinger = hand.keypoints[8];
        let thumb = hand.keypoints[4];

        // Check if the index finger is touching the box
        if (
          indexFinger.x > boxX &&
          indexFinger.x < boxX + boxSize &&
          indexFinger.y > boxY &&
          indexFinger.y < boxY + boxSize
        ) {
          // Move the box with the index finger
          boxX = indexFinger.x - boxSize / 2;
          boxY = indexFinger.y - boxSize / 2;
        }

        // Check if both index finger and thumb are touching the box
        if (
          indexFinger.x > boxX &&
          indexFinger.x < boxX + boxSize &&
          indexFinger.y > boxY &&
          indexFinger.y < boxY + boxSize &&
          thumb.x > boxX &&
          thumb.x < boxX + boxSize &&
          thumb.y > boxY &&
          thumb.y < boxY + boxSize
        ) {
          // Change the box color when both fingers touch it
          fill(100, 200, 100, 150);
          rect(boxX, boxY, boxSize, boxSize);
        }
      }
    }
  }
}
