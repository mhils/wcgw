"use strict";
import React from "react";

export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var progressStyle = this.refs.progress.style;
        progressStyle.transition = "";
        progressStyle.width = "100%";
        setTimeout(() => {
            progressStyle.transition = "width " + (this.props.total-100) + "ms linear";
            progressStyle.width = "0%";
            console.log(progressStyle.transition);
        }, 100);
    }

    render() {
        return (
            <div className="progress">
                <div ref="progress"
                     className="progress-bar progress-bar-success"
                     role="progressbar"></div>
            </div>
        );
    }
}