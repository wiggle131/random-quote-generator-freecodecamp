import React from "react";
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
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: [],
      selectedQuoteIndex: null,
    };

    this.quoteIndex = this.generateQuoteIndex.bind(this);
    this.nextQuote = this.nextQuote.bind(this);
  }

  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json"
    )
      .then((data) => data.json())
      .then((d) => this.setState({ quote: d }, this.nextQuote));
  }

  get selectedQuote() {
    if (
      !this.state.quote.length ||
      !Number.isInteger(this.state.selectedQuoteIndex)
    ) {
      return undefined;
    }
    return this.state.quote[this.state.selectedQuoteIndex];
  }

  generateQuoteIndex() {
    if (!this.state.quote.length) {
      return;
    }
    return random(0, this.state.quote.length - 1);
  }

  nextQuote() {
    this.setState({ selectedQuoteIndex: this.generateQuoteIndex() });
  }

  render() {
    console.log(this.state.selectedQuoteIndex);
    return (
      <Grid
        className={this.props.classes.container}
        justify="center"
        id="quote-box"
        container
      >
        <Grid xs={11} lg={8} item>
          {this.selectedQuote ? (
            <QuoteMachine
              selectedQuote={this.selectedQuote}
              nextQuote={this.nextQuote}
            />
          ) : null}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
