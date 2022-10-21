import React from "react";
import { mockRequest } from "../mockRequest";
import { Detail } from "./BugCounter";

type BugDetailProps = {
  bugs: number;
  bugsList: Detail[];
  changeRender: () => void;
};

const excludeBugList = [
  {
    id: "wxtangjiahao",
    excludeBugs: 2,
  },
];
export class BugDetail extends React.Component<BugDetailProps> {
  state = {
    bugsList: [] as Detail[],
  };

  async componentDidMount(): Promise<void> {
    const { data = [] } = await mockRequest();
    this.setState({
      bugsList: this.props.bugsList.map((item) => {
        const excludeBug = data.find(
          (excludeItem) => excludeItem.id === item.id
        )?.bugs;
        if (excludeBug) {
          return {
            ...item,
            bugs: item.bugs - excludeBug < 0 ? 0 : item.bugs - excludeBug,
          };
        }
        return item;
      }),
    });
  }

  async componentDidUpdate(prevProps: Readonly<BugDetailProps>): Promise<void> {
    console.log("componentDidUpdate");
    if (this.props.bugsList !== prevProps.bugsList) {
      const { data = [] } = await mockRequest();
      this.setState({
        bugsList: this.props.bugsList.map((item) => {
          const excludeBug = data.find(
            (excludeItem) => excludeItem.id === item.id
          )?.bugs;
          if (excludeBug) {
            return {
              ...item,
              bugs: item.bugs - excludeBug < 0 ? 0 : item.bugs - excludeBug,
            };
          }
          return item;
        }),
      });
      this.props.changeRender();
    }
  }

  render(): React.ReactNode {
    return (
      <>
        <h3>总共有{this.props.bugs}个bug,下面是具体的统计列表</h3>
        <div>
          {this.state.bugsList.map((item) => {
            return (
              <p key={item.id}>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  {item.id}
                </span>
                的bug数量为
                <span
                  style={{
                    fontWeight: "bold",
                    color: "orange",
                  }}
                >
                  {item.bugs}
                </span>
              </p>
            );
          })}
        </div>
      </>
    );
  }
}
