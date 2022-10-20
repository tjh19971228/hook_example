import React from "react";
import { Bug } from "./BugCounter";

type BugDetailProps = {
  bugList: Bug[];
  bugs: number;

  changeBugList: (bugList: Bug[]) => void;
  changeBugs: (bugs: number) => void;
  changeGetBugReport: () => void;
};

type BugDetailState = {
  list: Bug[];
  bugs: number;
  //   声明一个以前的bugs,保存以前的Bug值
  prevBugs: number | string;
  getTrueList: (list: Bug[]) => Bug[];
};

const excludeBugNumsList = [
  {
    name: "ArthurDon",
    bugs: 4,
  },
];

export class BugDetail extends React.Component<BugDetailProps, BugDetailState> {
  constructor(props: BugDetailProps) {
    super(props);
    this.state = {
      bugs: this.props.bugs,
      prevBugs: "",
      list: this.getTrueList(this.props.bugList),
      getTrueList: this.getTrueList,
    };
  }

  changeBugs = this.props.changeBugs;

  componentDidUpdate(
    prevProps: Readonly<BugDetailProps>,
    // react 16.3之后引入该参数
    snapshot?: any
  ): void {
    console.log("ready to do snapshot each time");
    if (
      JSON.stringify(this.props.bugList) !== JSON.stringify(prevProps.bugList)
    ) {
      this.setState({
        list: this.getTrueList(this.props.bugList),
        bugs: this.props.bugs,
      });
    }
  }

  changeGetBugReport = () => {
    this.props.changeGetBugReport();
  };

  getTrueList = (list: Bug[]) => {
    return list.map((bug) => {
      const excludeBugNums = excludeBugNumsList.find(
        (excludeBugNum) => excludeBugNum.name === bug.name
      )?.bugs;
      if (excludeBugNums) {
        return {
          ...bug,
          fakeBugs:
            bug.bugs - (excludeBugNums || 0) < 0
              ? 0
              : bug.bugs - (excludeBugNums || 0),
        };
      }
      return bug;
    });
  };

  getTrueNum = (num: number) => {
    const excludeBugNums = excludeBugNumsList.reduce((acc, cur) => {
      return acc + cur.bugs;
    }, 0);
    return num - excludeBugNums < 0 ? 0 : num - excludeBugNums;
  };

  writeBug = (bug: Bug) => {
    return () => {
      const list = this.state.list;
      const index = list.findIndex((item) => item.name === bug.name);
      if (index !== -1) {
        list[index] = {
          ...list[index],
          bugs: list[index].bugs + 1,
        };
      }
      this.props.changeBugList(list);
      this.props.changeBugs(this.props.bugs + 1);
    };
  };

  render() {
    return (
      <div>
        <h3>bug详情,共{this.state.bugs}个bug</h3>
        <button
          onClick={(e) => {
            this.setState({
              bugs: this.state.bugs + 1,
            });
          }}
        >
          增加bug
        </button>
        {this.state.list.map((bug) => {
          return (
            <div key={bug.name}>
              <h4>
                {bug.name}写了
                {bug.fakeBugs !== undefined ? bug.fakeBugs : bug.bugs}个bug
              </h4>
              <button onClick={this.writeBug(bug)}>
                {bug.name}写下了一个bug
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
