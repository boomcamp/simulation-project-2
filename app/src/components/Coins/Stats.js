import React from "react";
import { Stats, Details, SpanDetails, Span, StatsDiv } from "./Style";
import { month } from "./Data";

export default class Stat extends React.Component {
  render() {
    const { temp, temp_c, temp_md, currency } = this.props;
    const new_date = new Date(temp ? Date.parse(temp.last_updated) : "");
    const time = new_date.getHours() > 12 ? "pm" : "am";
    let hr =
      new_date.getHours() > 12 ? new_date.getHours() - 12 : new_date.getHours();
    hr = hr < 10 ? "0" + hr : hr;
    const min =
      new_date.getHours() < 10
        ? "0" + new_date.getMinutes()
        : new_date.getMinutes();

    return (
      <Stats>
        {temp ? (
          <StatsDiv>
            <Details>
              <SpanDetails>QUICK STATS</SpanDetails>
              <SpanDetails>
                <Span>Price</Span>
                <Span>
                  {currency.unit}
                  {temp_md.current_price[temp_c]}
                </Span>
              </SpanDetails>
              <SpanDetails>
                <Span>Market Cap Rank</Span>
                <Span>#{temp_md.market_cap_rank}</Span>
              </SpanDetails>
              <SpanDetails>
                <Span>Trading Volume</Span>
                <Span>
                  {currency.unit}
                  {temp_md.total_volume[temp_c]}
                </Span>
              </SpanDetails>
              <SpanDetails>
                <Span>Circulating Supply</Span>
                <Span>
                  {temp_md.circulating_supply} / {temp_md.total_supply}
                </Span>
              </SpanDetails>
              <SpanDetails>
                <Span>24 hour low / high</Span>
                <Span>
                  {currency.unit}
                  {temp_md.low_24h[temp_c]} / {currency.unit}
                  {temp_md.high_24h[temp_c]}
                </Span>
              </SpanDetails>
              <SpanDetails>
                <Span>Coingecko Score</Span>
                <Span>{temp.coingecko_score}</Span>
              </SpanDetails>
              <SpanDetails>
                <Span>Community Score</Span>
                <Span>{temp.community_score}</Span>
              </SpanDetails>
              <SpanDetails>
                <Span>Last Updated</Span>
                <Span>
                  {month[new_date.getMonth()] +
                    ", " +
                    new_date.getDate() +
                    " " +
                    new_date.getFullYear() +
                    " @ " +
                    hr +
                    ":" +
                    min +
                    time}
                </Span>
              </SpanDetails>
            </Details>
          </StatsDiv>
        ) : (
          ""
        )}
      </Stats>
    );
  }
}
