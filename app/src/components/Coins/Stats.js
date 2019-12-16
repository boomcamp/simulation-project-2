import React from "react";
import { Stats, Details, SpanDetails, Span, StatsDiv } from "./Style";

export default class Stat extends React.Component {
  render() {
    const { temp, temp_c, temp_md, currency } = this.props;
    let new_date = "";
    let tempDate = "";
    if (temp) {
      new_date = new Date(Date.parse(temp.last_updated));
      tempDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new_date);
    }
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
                <Span>{tempDate}</Span>
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
