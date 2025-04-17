import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = { count: 0, count2: 1 };
    console.log(this.props.name + " child constructor");
  }

  componentDidMount() {
    console.log(this.props.name + " child component did mount");
    // this.timer = setInterval(() => {
    //   console.log("Start Interval");
    // }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.count !== prevState.count) {
      console.log("count change ", this.state.count);
    }
    console.log("component did update");
  }

  componentWillUnmount() {
    // clearInterval(this.timer);
    console.log("component will unmount");
  }
  render() {
    console.log(this.props.name + " child render");
    return (
      <div>
        <h2>Count: {this.state.count}</h2>
        <h2>Count: {this.state.count2}</h2>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
              count2: this.state.count2 * 2,
            });
          }}
        >
          Add Count
        </button>
        <h2>Name: {this.props.name}</h2>
        <h3>Location: {this.props.location}</h3>
        <h4>Contact: tarun@gmail.com</h4>
      </div>
    );
  }
}

export default UserClass;
