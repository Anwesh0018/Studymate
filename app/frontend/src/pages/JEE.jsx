import {Link} from "react-router-dom";
import Row from "../components/Row";
// import jeebg from "../../public/images/jeebg.png";

const jeeItems = [
  {
    title: 'Physics',
    image: '/images/physics.jpg',
  },
  {
    title: 'Chemistry',
    image: '/images/chemistry.jpg',
  },
  {
    title: 'Maths',
    image: '/images/maths.jpg',
  }
]

export default function JeePage(){
  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900">
        <h1 className="text-white text-3xl  rounded-b px-3 py-4 flex items-center justify-center">JEE Study Materials</h1>
        <div className="text-white">
          <Row title="Notes" items={jeeItems}></Row>
          <Row title="Pyqs" items={jeeItems}></Row>
        </div>
      </div>
  )
}