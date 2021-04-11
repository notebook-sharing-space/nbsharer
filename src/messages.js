/**
 * This file is included in the notebook iframe too.
 * Any imports here will increase that bundle size. Think
 * twice before adding imports here
 */

const MESSAGE_TYPES = {
    SET_DISPLAY_OPTIONS: 1,
}

/**
 * Differentiate different message senders / receivers.
 * 
 * In particular, differentiate from the messages the iframeresizer sends.
 * 
 * https://github.com/davidjbradshaw/iframe-resizer/blob/a519ec84ad4efb8eaadf40fc072b5e523ffe45ac/js/iframeResizer.contentWindow.js#L1243
 */
const MESSAGE_ID = "[ipynb.space]";

/**
 * Setup inside notebook iframe to respond to messages
 */
const handleMessages = (event) => {
    if (String(event.data.substr(0, MESSAGE_ID.length)) !== MESSAGE_ID) {
        return;
    }
    const data = JSON.parse(event.data.substr(MESSAGE_ID.length));
    const body = document.getElementsByTagName('body')[0];
    switch (data.type) {
        case MESSAGE_TYPES.SET_DISPLAY_OPTIONS:
            const { availableDisplayOptions, selectedDisplayOptions } = data.payload;
            Object.keys(availableDisplayOptions).forEach(option => {
                if (selectedDisplayOptions.includes(option)) {
                    body.classList.add('option-' + option)
                } else {
                    body.classList.remove('option-' + option)
                }
            })
            break;
    }
}

const postMessage = (iframe, type, payload) => {
    iframe.postMessage(MESSAGE_ID + JSON.stringify({
        type: type,
        payload: payload
    }))
}

export { MESSAGE_TYPES, handleMessages, postMessage }