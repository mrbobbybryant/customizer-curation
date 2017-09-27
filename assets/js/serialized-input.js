export default function( parent, hiddenInput ) {
    const hiddenEl = parent.querySelector(hiddenInput);

    const getCurrentValue = () => {
        const value = hiddenEl.value;

        if ( value ) {
            return JSON.parse( value );
        } else {
            return [];
        }

    };

    const addValue = (value) => {
        let currentValue = getCurrentValue();
        return currentValue.concat( value );
    }

    const removeValue = (value, onRemove) => {
        const currentValue = getCurrentValue();
        return onRemove( currentValue, value );
    }

    return {
        add: function(value) {
            hiddenEl.value = JSON.stringify(addValue(value));
        },
        remove: function(value, onRemove) {
            hiddenEl.value = JSON.stringify(removeValue(value, onRemove));
        },
        update: function(values) {
            hiddenEl.value = JSON.stringify(values);
        },
        el: hiddenEl
    }
}
