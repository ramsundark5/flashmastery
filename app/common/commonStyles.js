const NAV_BAR_HEIGHT = 39;
const STATUS_BAR_HEIGHT = 20;
const HEADER_HEIGHT = NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT;

module.exports = {
    container: {
        flex: 1,
        paddingTop: HEADER_HEIGHT,
        padding: 20
    },
    containerNoPadding: {
        flex: 1,
        paddingTop: HEADER_HEIGHT,
    },
    content: {
        flex: 1,
        padding: 20
    },
    footer: {
        position: 'absolute',
        height: 100,
        bottom: 0,
        left: 0,
        right: 0
    },
    input: {
        height: 40,
        padding: 10,
        marginBottom: 10,
        borderColor: 'orange',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    label: {
        color: 'orange',
        padding: 10,
        fontWeight: "700",
        fontStyle: 'italic'
    },
    errorText: {
        backgroundColor: 'red',
        color: 'white',
        padding: 5,
        fontWeight: "700",
        fontStyle: 'italic'
    }
};