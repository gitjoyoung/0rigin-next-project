// /* eslint-disable react/jsx-props-no-spreading */
// import { useRef, useState } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'

// function Box(props: JSX.IntrinsicElements['mesh']) {
//    const ref = useRef()
//    const [hovered, hover] = useState(false)
//    const [clicked, click] = useState(false)
//    useFrame((state, delta) => {
//       if (ref.current) {
//          ref.current.rotation.x += delta
//       }
//    })
//    return (
//       <mesh
//          {...props}
//          ref={ref}
//          scale={clicked ? 1.5 : 1}
//          onClick={() => click(!clicked)}
//          onPointerOver={(event) => {
//             event.stopPropagation()
//             hover(true)
//          }}
//          onPointerOut={() => hover(false)}
//       >
//          <boxGeometry args={[1, 1, 1]} />
//          <meshStandardMaterial color={hovered ? 'black' : 'white'} />
//       </mesh>
//    )
// }

// export default function ThreeScene() {
//    return (
//       <Canvas>
//          <ambientLight intensity={Math.PI / 2} />
//          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
//          <Box position={[-1.2, 0, 0]} />
//          <Box position={[1.2, 0, 0]} />
//          <OrbitControls />
//       </Canvas>
//    )
// }
