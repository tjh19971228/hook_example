import React from "react";
import { BugDetail } from "./BugDetail";

export type Detail = {
  id: string;
  bugs: number;
};
type BugCounterProps = {
  [key: string]: any;
};

export class BugCounter extends React.Component<BugCounterProps> {
  state = {
    bugs: 10,
    bugList: [
      {
        id: "wxtangjiahao",
        bugs: 6,
      },
    ],
    isRenderTheNewestList: true,
  };
  handleAddBugs = () => {
    this.setState({
      bugs: this.state.bugs + 1,
      bugList: this.state.bugList.map((item) => {
        if (item.id === "wxtangjiahao") {
          return {
            ...item,
            bugs: item.bugs + 1,
          };
        }
        return item;
      }),
      isRenderTheNewestList: false,
    });
  };
  render() {
    return (
      <div>
        <h2>Bug Tracker</h2>
        <p
          style={{
            fontWeight: "bold",
          }}
        >
          ----------------总览----------------
        </p>
        <h2>Bugs: {this.state.bugs}</h2>
        <h3>
          {this.state.isRenderTheNewestList
            ? "已经渲染最新的结果辣"
            : "还没有渲染最新的结果"}
        </h3>
        <p
          style={{
            fontWeight: "bold",
          }}
        >
          ----------------详情----------------
        </p>
        <BugDetail
          bugs={this.state.bugs}
          bugsList={this.state.bugList}
          changeRender={() => {
            this.setState({
              isRenderTheNewestList: true,
            });
          }}
        />
        <p
          style={{
            fontWeight: "bold",
          }}
        >
          ----------------操作----------------
        </p>
        <button onClick={this.handleAddBugs}>增加wxtangjiahao的bug数</button>
      </div>
    );
  }
}
