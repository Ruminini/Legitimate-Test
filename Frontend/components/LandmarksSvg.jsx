import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';

const LandmarksSvg = ({ landmarks }) => {
    if (!landmarks || landmarks.length === 0) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', backgroundColor: 'red', color: 'white', width: '100%' }}>No faces detected</Text>
        </View>;
    }


    const dims = landmarks[0].detection._imageDims;
    console.log(dims);
    console.log(Object.keys(landmarks));
    console.log(Object.keys(landmarks[0]));
    let positions = []
    landmarks.forEach(face => positions.push(...face.landmarks._positions));
    let boxes = []
    landmarks.forEach(face => boxes.push(face.detection._box));

    return (
        <Svg height='100%' width='100%' viewBox={`0 0 ${dims._width} ${dims._height}`}>
        {positions.map(({ _x, _y }, index) => {
            return (
                <Circle
                    key={index}
                    cx={_x}
                    cy={_y}
                    r={dims._width/200} // Radius of the circle (adjust as needed)
                    fill="red" // Circle color
                />
            );
        })}
        {
        boxes.map((box, index) => { 
            return (
                <Rect
                    key={index}
                    x={box._x}
                    y={box._y}
                    width={box._width}
                    height={box._height}
                    stroke="blue" // Line color
                    strokeWidth={dims._width/200} // Line width
                    fill="none"
                />
            );
        })}
        </Svg>
  );
};

export default LandmarksSvg;
