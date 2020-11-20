import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button, Form } from "semantic-ui-react";
import PatternListItem from "./PatternListItem";
import Pagination from "../Pagination";

const SEED = 30;

class ListPatterns extends Component {
  state = {
    page: 1,
    totalPage: null,
    searchText: ""
  };

  componentWillReceiveProps(nextProps) {
    this.calculateTotalPage(nextProps);
  }

  componentWillMount() {
    this.calculateTotalPage(this.props);
  }

  calculateTotalPage = props => {
    const { patterns } = props;
    const { searchText } = this.state;
    if (!searchText)
      this.setState({ totalPage: Math.ceil(patterns.length / SEED) });
    else {
      this.setState({
        totalPage: Math.ceil(
          patterns.filter(pattern =>
            pattern.code.toLowerCase().includes(searchText.toLowerCase())
          ).length / SEED
        )
      });
    }
  };

  setActivePage = page => this.setState({ page });

  render() {
    const { searchText } = this.state;
    let searchedPatternsList = [];
    const orderedPatterns = this.props.patterns.sort(
      (a, b) => parseInt(a.code) - parseInt(b.code)
    );

    if (searchText) {
      searchedPatternsList = orderedPatterns.filter(pattern =>
        pattern.code.toLowerCase().includes(searchText.toLowerCase())
      );
      // this.calculateTotalPage(this.props);
    } else searchedPatternsList = [...orderedPatterns];

    const patternsToShow = searchedPatternsList.filter(
      (pattern, index) =>
        index < SEED * this.state.page && index >= SEED * (this.state.page - 1)
    );
    return (
      <>
        <br></br>
        <h1>Tüm Mum Kalıpları [{this.props.patterns.length} Kalıp]</h1>
        <Form onSubmit={e => e.preventDefault()}>
          <Form.Group widths="equal">
            <Form.Input
              label="Kalıp Arama"
              placeholder="Aranacak Kelime"
              onChange={e => this.setState({ searchText: e.target.value })}
              value={searchText}
            />
          </Form.Group>
        </Form>
        <Pagination
          activePage={this.state.page}
          totalPage={this.state.totalPage}
          setActivePage={this.setActivePage}
        />
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing>Kalıp</Table.HeaderCell>
              <Table.HeaderCell className="minw-10" collapsing>Kod</Table.HeaderCell>
              <Table.HeaderCell>Taş sayısı</Table.HeaderCell>
              <Table.HeaderCell collapsing></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {patternsToShow.map((item, index) => (
              <PatternListItem key={index} index={index} item={item} />
            ))}
          </Table.Body>
        </Table>
        <Pagination
          activePage={this.state.page}
          totalPage={this.state.totalPage}
          setActivePage={this.setActivePage}
        />
        <br></br>
        <br></br>
      </>
    );
  }
}

const mapStateToProps = ({ general: { patterns } }) => ({ patterns });

export default connect(mapStateToProps)(ListPatterns);
