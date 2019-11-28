import React, { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(green, yellow);
  height: 100vh;
`
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 80px;
  width: 70%;
  border: 2px solid black;
  padding: 20px;
  background: whitesmoke;
`
const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
export default function CoinDetails({ match }) {
  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState([])

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${match.params.id}`)
      .then(res => {
        console.log(res.data)
        setDetails(res.data)
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      })
  }, [])
  return (
    <>
      {loading ? (
        <Loading>loading...</Loading>
      ) : (
        <Main>
          <Container>
            <img
              style={{ margin: "20px 20px" }}
              src={details.image.large}
            ></img>
            <div>{details.description.en}</div>
          </Container>
        </Main>
      )}
    </>
  )
}
