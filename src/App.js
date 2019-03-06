import React, { Component, Fragment } from 'react';
import dataSource from './test-data';
import TreeBeard from './components/TreeBeard/treebeard';
import JSONParser from './jsonToTreebeard';



class App extends Component {

    parseDate = (timestamp) => {

        const weekdays = {0:'Sunday', 1:'Monday', 2:'Tuesday', 3:'Wednesday', 4:'Thursday', 5:'Friday', 6:'Saturday'};
        const months = {0:'January', 1:'February', 2:'March', 3:'April', 4:'May', 5:'June', 6:'July', 7:'August',
                        8:'September', 9:'October', 10:'November', 11:'December'};
        const dateObj =  new Date(timestamp);
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const seconds = dateObj.getSeconds();
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth();
        const day = dateObj.getDay();
        const date = dateObj.getDate();

        return `${weekdays[day]}, ${months[month]} ${date}, ${year} ${hours}:${minutes}:${seconds}`;
    };

    render() {
    const leftData = JSONParser(dataSource.left.nodes);
    const rightData = JSONParser(dataSource.right.nodes);
    const leftDate = this.parseDate(dataSource.left.info.endTimestamp);
    const rightDate = this.parseDate(dataSource.right.info.endTimestamp);


    return (
        <Fragment>
            <div className='comparatorArea'>
                <div className='comparatorArea__half'>
                    <div className={'timeArea'}>{leftDate}</div>
                    <TreeBeard data={leftData}/>
                </div>
                <div className='comparatorArea__half'>
                    <div className={'timeArea'}>{rightDate}</div>
                    <TreeBeard data={rightData}/>
                </div>
            </div>
        </Fragment>
    );
    }
}

export default App;
