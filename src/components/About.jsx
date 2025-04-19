import React from "react";
import User from "./User";
import UserClass from "./UserClass";

class About extends React.Component {
  constructor(props) {
    super(props);
    // console.log("parent constructor");
  }

  componentDidMount() {
    // console.log("parent component did mount");
  }

  render() {
    console.log("parent render");
    return (
      <div>
        <h1>About Page</h1>
        {/* <User name={"Tarun Sharma (functional)"} location={"Noida"} /> */}
        <UserClass name={"Tarun Sharma (class)"} location={"Noida"} />
        <UserClass name={"Elon Musk"} location={"US"} />
      </div>
    );
  }
}

// const About = () => {
//   return (
//     <div>
//       <h1>About Page</h1>
//       {/* <User name={"Tarun Sharma (functional)"} location={"Noida"} /> */}
//       <UserClass name={"Tarun Sharma (class)"} location={"Noida"} />
//     </div>
//   );
// };

export default About;
