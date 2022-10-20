import React from "react";

type BugReportViewProps = {
  bugs: number;
};

export class BugReportView extends React.Component<BugReportViewProps> {
  // That’s because React components will only re-render when there are changes to props or state.
  bugs = this.props.bugs;
  render() {
    return (
      <div>
        <h3>总共有{this.bugs}个bugs </h3>
        <button
          onClick={() => {
            this.bugs = this.bugs + 1;
            this.forceUpdate();
          }}
        >
          report new bug
        </button>
      </div>
    );
  }
}
