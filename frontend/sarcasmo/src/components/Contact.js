import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/demo.png";
import "animate.css";
import TrackVisibility from "react-on-screen";
import axios from 'axios';

export const Contact = () => {

  //GET

  // const [data, setData] = useState({});
  // useEffect(() => {
  //   fetch("/sarcasm").then(
  //     res => res.json()
  //   ).then(
  //     data => {
  //       setData(data)
  //       console.log(data)
  //     }
  //   )
  // }, [])


  const formInitialDetails = {
    message: "",
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Check");
  const [detect, setDetect] = useState({});

  // console.log(detect)

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Checking...");

    try { 
      let result = await axios.post("http://127.0.0.1:5000/sarcasm",formDetails)
      setDetect(result.data)
      console.log(result.data)
    }
    catch (error) {
      console.log(error);
    }

    setButtonText("Done");
    setFormDetails(formInitialDetails);
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <img
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                  src={contactImg}
                  style={{ width: "500px", height: "100%" }}
                  alt="Contact Us"
                />
              )}
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Let's Try</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col size={12} className="px-1">
                        <textarea
                          rows="6"
                          value={formDetails.message}
                          placeholder="Text"
                          onChange={(e) =>
                            onFormUpdate("message", e.target.value)
                          }
                        ></textarea>
                        <button type="submit">
                          <span>{buttonText}</span>
                        </button>

                        <p></p>
                        <p>Sarcasm Detection Results</p>

                        <div style={{display: "flex"}}>
                          <div
                            className={
                              detect.Sarcastic > 0.50 ? "" : "faded"
                            }
                          >
                            <h1>😏</h1>
                            <p>Sarcastic</p> 
                          </div>
                          <div 
                            style={{marginLeft: "25px"}}
                            className={
                              detect.Sarcastic < 0.50 ? "" : "faded"
                            }
                          >
                            <h1>😐</h1>
                            <p>Non-Sarcastic</p>
                          </div>
                        </div>
                        
                        {/* {
                          (detect.Sarcastic > 0.50) ? (
                          <div>
                            <h1>😏</h1>
                            <p>Sarcastic</p> 
                          </div>
                          ) : (
                          <div>
                            <h1>😐</h1>
                            <p>Non-Sarcastic</p>
                          </div>
                          )
                        } */}
                        
                      </Col>
                    </Row>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
