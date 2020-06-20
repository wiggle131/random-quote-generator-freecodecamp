import React, { useState, useEffect } from "react";
import "./App.css";
import { random } from "lodash";
import QuoteMachine from "./components/QuoteMachine";
import "typeface-roboto";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  container: {
    alignItems: "center",
    height: "100vh",
    display: "flex",
  },
};

function App({ classes }) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     quote: [],
  //     selectedQuoteIndex: null,
  //   };

  //   this.quoteIndex = this.generateQuoteIndex.bind(this);
  //   this.nextQuote = this.nextQuote.bind(this);
  // }

  const [quote, setQuote] = useState([]);
  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json"
      );
      const quotes = await data.json();
      setQuote(quotes);
      setSelectedQuoteIndex(nextQuote());
    }
    fetchData();
  });

  function getSelectedQuote() {
    if (quote.length || !Number.isInteger(selectedQuoteIndex)) {
      return undefined;
    }
    return quote[selectedQuoteIndex];
  }

  function generateQuoteIndex() {
    if (quote.length) {
      return;
    }
    return random(0, quote.length - 1);
  }

  function nextQuote() {
    setSelectedQuoteIndex(generateQuoteIndex());
  }
  return (
    <Grid
      className={classes.container}
      justify="center"
      id="quote-box"
      container
    >
      <Grid xs={11} lg={8} item>
        {getSelectedQuote ? (
          <QuoteMachine
            selectedQuote={getSelectedQuote}
            nextQuote={nextQuote}
          />
        ) : null}
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(App);
