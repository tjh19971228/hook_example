import React from "react";
import { BugDetail } from "./BugDetail";

export type Bug = {
  name: string;
  bugs: number;
  fakeBugs?: number;
};

type BugCounterState = {
  bugs: number;
  bugList: Bug[];
  getBugReport: boolean;
};

export class BugCounter extends React.Component<{}, BugCounterState> {
  // 构造器写法
  constructor(props: {}) {
    super(props);
    this.state = {
      bugs: 6,
      bugList: [
        {
          name: "ArthurDon",
          bugs: 1,
        },
      ],
      getBugReport: false,
    };
  }

  reportNewBug() {
    this.setState({
      bugs: this.state.bugs + 1,
    });
  }

  // 获取最新的bugList
  changeBugList = (bugList: Bug[]) => {
    this.setState({
      bugList,
    });
  };

  // 获取最新的bugs
  changeBugs = (bugs: number) => {
    this.setState({
      bugs,
    });
  };

  changeGetBugReport = () => {
    this.setState({
      getBugReport: !this.state.getBugReport,
    });
  };

  // 非构造器写法

  // state = {
  //     bugs: 6
  // }
  // reportNewBug = () => {
  //     this.setState({ bugs: this.state.bugs + 1 });
  // }

  render() {
    return (
      <div>
        <h1>Bug Tracker</h1>
        <p>-------------------------总览-----------------------</p>
        {/* <BugReportView bugs={this.state.bugs} /> */}
        <h3>总共有{this.state.bugs}个bugs </h3>
        <p>-------------------------状态-----------------------</p>
        <p>是否已经接受了bugReport:{this.state.getBugReport ? "是" : "否"}</p>
        <p>-------------------------详情-----------------------</p>
        <BugDetail
          bugList={this.state.bugList}
          bugs={this.state.bugs}
          changeBugList={this.changeBugList}
          changeBugs={this.changeBugs}
          changeGetBugReport={this.changeGetBugReport}
        />
      </div>
    );
  }
}
