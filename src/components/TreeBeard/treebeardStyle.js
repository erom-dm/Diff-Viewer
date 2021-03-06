

export default {
    tree: {
        base: {
            listStyle: 'none',
            backgroundColor: '#50565d',
            padding: '2px 5px',
            color: '#c6ced4',
            fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
            fontSize: '14px',
            width: '100%',
            height: '100%',
            border: '1px solid #c6ced4',
            overflow: 'auto',
            'margin-top': '5px',
            'margin-bottom': '0',
        },

        node: {
            base: {
                position: 'relative',

                div: {
                    display: 'flex',
                    cursor: 'pointer',
                }
            },
            link: {
                cursor: 'pointer',
                position: 'relative',
                padding: '0px 5px',
                display: 'block'
            },
            activeLink: {
                background: '#31363F'
            },
            toggle: {
                base: {
                    position: 'relative',
                    display: 'inline-block',
                    verticalAlign: 'center',
                    marginLeft: '0',
                    height: '15px',
                    width: '15px'
                },
                wrapper: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    margin: '-5px 0 0 -6px',
                    height: '14px'
                },
                height: 10,
                width: 10,
                arrow: {
                    fill: '#9DA5AB',
                    strokeWidth: 0
                }
            },
            header: {
                display: 'flex',
                base: {
                    display: 'inline-block',
                    verticalAlign: 'top',
                    color: '#9DA5AB'
                },
                connector: {
                    width: '2px',
                    height: '12px',
                    borderLeft: 'solid 2px black',
                    borderBottom: 'solid 2px black',
                    position: 'absolute',
                    top: '0px',
                    left: '-21px'
                },
                title: {
                    lineHeight: '24px',
                    verticalAlign: 'middle'
                }
            },
            subtree: {
                listStyle: 'none',
                paddingLeft: '19px',
            },
            loading: {
                color: '#E2C089'
            }
        }
    }
};
