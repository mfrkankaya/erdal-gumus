import React, { Component } from "react";
import { Button } from "semantic-ui-react";

export default class Pagination extends Component {
  state = {
    active: true
  };

  prew = () => {
    const { activePage, setActivePage } = this.props;
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  next = () => {
    const { activePage, setActivePage, totalPage } = this.props;
    if (activePage < totalPage) {
      setActivePage(activePage + 1);
    }
  };

  render() {
    const { active } = this.state;
    return (
      <div className="flex space-between flex-row align-center">
        <Button
          disabled={this.props.activePage === 1}
          onClick={this.prew}
          basic
          primary
        >
          Önceki Sayfa
        </Button>
        <div className="flex flex-row wrap per-w-70 justify-center">
          {active
            ? Array.from({ length: this.props.totalPage }).map((_, index) => (
                <span
                  className={`pagination-number${
                    index + 1 === this.props.activePage ? " active" : ""
                  }`}
                  onClick={() => this.props.setActivePage(index + 1)}
                >
                  {index + 1}
                </span>
              ))
            : null}
          <div
            className={`pagination-toggle${active ? "" : " active"}`}
            onClick={() => this.setState({ active: !this.state.active })}
          >
            {active ? "Sayfaları Gizle" : "Sayfaları Göster"}
          </div>
        </div>
        <Button
          disabled={this.props.activePage === this.props.totalPage}
          onClick={this.next}
          basic
          primary
        >
          Sonraki Sayfa
        </Button>
      </div>
    );
  }
}
