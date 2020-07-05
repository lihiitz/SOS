import React, { Component } from 'react';
import '../../styles/CountDown.css'

class CountDown extends Component {
  constructor(props) {
    super(props)
    this.count = this.count.bind(this)
    this.state = {
      minutes: 0,
      hours: 0,
      seconds: 0,
      time_up: ""
    }
    this.x = null
    this.startTotal = null
    this.duration = null

  }


  count() {
    // 
    const now = new Date()
    const nowH = now.getHours()
    const nowM = now.getMinutes() 
    const nowS = now.getSeconds() 
    const nowTotal = (nowH * 3600) + (nowM * 60) + nowS

    let t = this.duration - (nowTotal - this.startTotal)
    let hours = Math.trunc(t / 3600)
    t = t % 3600
    let minutes = Math.trunc(t / 60)
    t = t % 60
    let seconds = Math.trunc(t)
    this.setState({ minutes, hours, seconds })
    if (t < 0) {
      clearInterval(this.x);
      this.setState({ minutes: 0, hours: 0, seconds: 0, time_up: "Messages were sended" })
    }
  }
  componentDidMount() {
    // 
    const time = this.props.time
    const startH = time.startTime.hours 
    const startM = time.startTime.minutes
    const startS = time.startTime.seconds
    this.startTotal = (startH * 3600) + (startM * 60) + startS
    this.duration = time.duration * 3600
    this.x = setInterval(this.count, 1000)
  }

  render() {
    const { seconds, hours, minutes, time_up } = this.state
    return (
      <div>

        <h1>We will send messages in:</h1>
        <div id="clockdiv">
          <div>
            <span className="hours" id="hour">{hours}</span>
            <div className="smalltext">Hours</div>

          </div>
          <div>
            <span className="minutes" id="minute">{minutes}</span>
            <div className="smalltext">Minutes</div>

          </div>
          <div>
            <span className="seconds" id="second">{seconds}</span>
            <div className="smalltext">Seconds</div>

          </div>
        </div>

        <p id="demo">{time_up}</p>
        
      </div>
    )
  }
}

export default CountDown
