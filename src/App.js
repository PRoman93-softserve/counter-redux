import React from 'react';
import './App.css';
import Count from "./Count";
import Buttons from "./Buttons";
import Settings from "./Settings";


class App extends React.Component {
    state = {
        count: 0,
        startCount: 0,
        maxCount: 5,
        error: false,
        editMode: false
    };

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        let maxStateAsString = JSON.stringify(this.state);
        localStorage.setItem('max', maxStateAsString);
    };

    restoreState = () => {
        let state = {
            count: 0,
            startCount: 0,
            maxCount: 5,
            error: false,
            editMode: false
        };
        let maxStateAsString = localStorage.getItem('max');
        if (maxStateAsString !== null){
            state = JSON.parse(maxStateAsString);
        }
        this.setState(state);
    };

    onPlus = () => {
        if (this.state.count < this.state.maxCount) {
            this.setState({
                count: this.state.count + 1
            }, () => {
                this.saveState();
                if (this.state.count === this.state.maxCount) {
                    this.setState({
                        error: true
                    }, () => {
                        this.saveState();
                    })
                }
            })
        }
    };

    onReset = () => {
        this.setState({
            count: this.state.startCount,
            error: false
        }, () => {
            this.saveState();
        })
    };

    onMaxChange = (event) => {
        const maxValue = event.target.value;
        this.setState({
            maxCount: Number(maxValue),
            editMode: true,
            count: "Enter values and press 'set'",
            error: true
        }, () => {
            this.incorrectValue()
        })
    };

    onMinChange = (event) => {
        const minValue = event.target.value;
        this.setState({
            startCount: Number(minValue.replace(/^0+/, '')), /*max: Number(event.currentTarget.value),*/
            editMode: true,
            count: "Enter values and press 'set'",
            error: true,
        }, () => {
            this.incorrectValue()
        })
    };

    incorrectValue = () => {
        if (this.state.startCount >= this.state.maxCount || this.state.startCount < 0 || this.state.startCount === '') {
            this.setState({
                count: "Incorrect value!",
                error: true,
                editMode: false
            }, () => {
                this.saveState();
            })
        }
    };

    onClickSet = () => {
        if (this.state.startCount < this.state.maxCount && this.state.startCount >= 0) {
            this.setState({
                editMode: false,
                error: false,
                count: this.state.startCount
            }, () => {
                this.saveState();
            })
        }
    };


    render = () => {
        // let disabled = this.state.count === this.state.maxCount;

        return (
            <div className={"App"}>
                <div className={"settings"}>
                    <Settings onMaxChange={this.onMaxChange}
                              onMinChange={this.onMinChange}
                              startCount={this.state.startCount}
                              maxCount={this.state.maxCount}
                              onClickSet={this.onClickSet}
                              count={this.state.count}
                              editMode={this.state.editMode}/>
                </div>
                <div className={"counter"}>
                    <Count incorrectValue={this.incorrectValue}
                           value={this.state.count}
                           error={this.state.error}/>

                    <Buttons error={this.state.error}
                             count={this.state.count}
                             onPlus={this.onPlus}
                             onReset={this.onReset}/>
                </div>
            </div>


        );
    }

}

export default App;
