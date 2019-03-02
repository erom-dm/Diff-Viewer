import React, {Component} from 'react';
import TreeView from 'react-treeview';

const dataSource = [
    ['Apple', 'Orange'],
    ['Facebook', 'Google'],
    ['Celery', 'Cheeseburger'],
];

class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {collapsedBookkeeping: dataSource.map(() => false)}
    }

    handleClick(i) {
        let [...collapsedBookkeeping] = this.state.collapsedBookkeeping;
        collapsedBookkeeping[i] = !collapsedBookkeeping[i];
        this.setState({collapsedBookkeeping: collapsedBookkeeping});
    }

    collapseAll() {
        this.setState({
            collapsedBookkeeping: this.state.collapsedBookkeeping.map(() => true),
        });
    }

    render() {
        const collapsedBookkeeping = this.state.collapsedBookkeeping;
        const collapseALL = this.collapseAll.bind(this);
        return (
            <div>
                <button onClick={collapseALL}>Collapse all</button>
                {dataSource.map((node, i) => {
                    // Let's make it so that the tree also toggles when we click the
                    // label. Controlled components make this effortless.
                    const label =
                        <span className="node" onClick={this.handleClick.bind(this, i)}>
              Type {i}
            </span>;
                    return (
                        <TreeView
                            key={i}
                            nodeLabel={label}
                            collapsed={collapsedBookkeeping[i]}
                            onClick={this.handleClick.bind(this, i)}>
                            {node.map(entry => <div className="info" key={entry}>{entry}</div>)}
                        </TreeView>
                    );
                })}
            </div>
        );
    }
}

export default Tree;