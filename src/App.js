import React from 'react';
import './App.css';
import Count from "./Count";
import Buttons from "./Buttons";
import Settings from "./Settings";
import {connect} from "react-redux";
import {
    incrementCountAC,
    onChangeMaxValueAC,
    onChangeMinValueAC, onClickSetAC,
    onGetToSettingsAC,
    onIncorrectValueAC,
    onResetAC
} from "./reducer";


class App extends React.Component {
    state = {
        error: false,
        // editMode: false
    };

    // componentDidMount() {
    //     this.restoreState();
    // }

    // saveState = () => {
    //     let maxStateAsString = JSON.stringify(this.state);
    //     localStorage.setItem('max', maxStateAsString);
    // };
    //
    // restoreState = () => {
    //     let state = {
    //         count: 0,
    //         startCount: 0,
    //         maxCount: 5,
    //         error: false,
    //         editMode: false
    //     };
    //     let maxStateAsString = localStorage.getItem('max');
    //     if (maxStateAsString !== null) {
    //         state = JSON.parse(maxStateAsString);
    //     }
    //     this.setState(state);
    // };
    componentDidUpdate(prevProps, prevState) {
        if (this.props.count !== prevProps.count) {
            if (this.props.count === this.props.maxCount) {
                this.setState({
                    error: true
                })
            }
        }

    }

    onPlus = () => {
        if (this.props.count < this.props.maxCount) {
            this.props.onIncrement()
            // if (this.props.count === this.props.maxCount) {
            //     this.setState({
            //         error:true
            //     })
            // }
        }
    };

    onReset = () => {
        this.props.onReset(this.props.minCount)
        this.setState({
            // count: this.state.startCount,
            error: false
        })
    };

    onMaxChange = (event) => {
        const maxValue = event.target.value;
        this.props.onChangeMaxValue(maxValue)
        this.props.onGetToSettings()
        this.setState({
            // maxCount: Number(maxValue),
            editMode: true,
            // count: "Enter values and press 'set'",
            error: true
        // }, () => {

        }, ()=>{this.incorrectValue()})
    };

    onMinChange = (event) => {
        const minValue = event.target.value;
        this.props.onChangeMinValue(minValue)
        this.props.onGetToSettings()
        this.setState({
            // minCount: Number(minValue.replace(/^0+/, '')), /*max: Number(event.currentTarget.value),*/
            editMode: true,
            // count: "Enter values and press 'set'",
            error: true,
        // }, () => {

        }, () => {this.incorrectValue()})
    };

    incorrectValue = () => {
        if (this.props.minCount >= this.props.maxCount || this.props.minCount < 0 || this.props.minCount === '') {
            this.props.onIncorrectValue()
            this.setState({
                // count: "Incorrect value!",
                error: true,
                editMode: false
            })
        }
    };

    onClickSet = () => {
        if (this.props.minCount < this.props.maxCount && this.props.minCount >= 0) {
            this.props.onClickSet(this.props.minCount)
            this.setState({
                editMode: false,
                error: false,
                // count: this.state.startCount
            })
        }
    };


    render = () => {
        // let disabled = this.props.count === this.props.maxCount;


        let redNumber = this.state.error ? 'redNumber borderCount' : 'borderCount'
        let sizeOfString = typeof (this.props.count) === 'string' ? 'sizeCount borderCount' : 'borderCount'
        let redCountInput = this.props.count === 'Incorrect value!' ? 'redInput' : ''
        return (
            <div className={"App"}>
                <div className={"settings"}>
                    <Settings onMaxChange={this.onMaxChange}
                              onMinChange={this.onMinChange}
                              minCount={this.props.minCount}
                              maxCount={this.props.maxCount}
                              onClickSet={this.onClickSet}
                              count={this.props.count}
                              editMode={this.state.editMode}
                              redCountInput={redCountInput}/>
                </div>
                <div className={"counter"}>
                    <Count incorrectValue={this.incorrectValue}
                           value={this.props.count}
                           error={this.state.error}
                           redNumber={redNumber}
                           sizeOfString={sizeOfString}/>
                    <Buttons error={this.state.error}
                             count={this.props.count}
                             onPlus={this.onPlus}
                             onReset={this.onReset}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.count,
        minCount: state.minCount,
        maxCount: state.maxCount,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onIncrement: () => {
            dispatch(incrementCountAC())
        },
        onReset: (startCount) => {
            dispatch(onResetAC(startCount))
        },
        onIncorrectValue: () => {
            dispatch(onIncorrectValueAC())
        },
        onChangeMaxValue: (maxCount) => {
            dispatch(onChangeMaxValueAC(maxCount))
        },
        onChangeMinValue: (minCount) => {
            dispatch(onChangeMinValueAC(minCount))
        },
        onGetToSettings: () => {
            dispatch(onGetToSettingsAC())
        },
        onClickSet: (minCount) => {
            dispatch(onClickSetAC(minCount))
        }
    }
}
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp;
