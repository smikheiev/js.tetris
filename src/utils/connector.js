class Connector {
    constructor() {
        this._connections = new Map();
    }

    // Public
    connect(sender, signalFunction, receiver, slotFunction) {
        if (!this._checkConnectArguments(sender, signalFunction, receiver, slotFunction)) {
            return;
        }

        let key = this._getKey(sender, signalFunction);

        let slots;
        if (!this._connections.has(key)) {
            // First time connect:
            // - create slot objects array
            slots = [];
            this._connections.set(key, slots);

            // - overwrite signal function
            this._overwriteSignalFunction(sender, signalFunction);
        } else {
            slots = this._connections.get(key);
        }

        let slot = new Slot(receiver, slotFunction.name);
        slots.push(slot);
    }

    disconnect(sender, signalFunction, receiver, slotFunction) {
        if (!this._checkConnectArguments(sender, signalFunction, receiver, slotFunction)) {
            return;
        }

        let key = this._getKey(sender, signalFunction);

        if (!this._connections.has(key)) {
            return;
        }

        let slots = this._connections.get(key);
        let index = slots.findIndex(function(slot) {
            return slot.receiver === receiver && slot.slotFunctionName === slotFunction.name;
        });
        if (index >= 0) {
            slots.splice(index, 1);
        }
    }

    // Private
    _getKey(sender, signalFunction) {
        return sender.constructor.name + '_' + signalFunction.name;
    }

    _overwriteSignalFunction(sender, signalFunction) {
        let key = this._getKey(sender, signalFunction);
        let slots = this._connections.get(key);

        // New signal function should go throw all slots
        // (that were added in 'connect' function) and
        // call slot function on each receiver
        let newSignalFunction = function() {
            let signalArguments = arguments;
            slots.forEach(function(slot) {
                slot.callSlot(signalArguments);
            }, this);
        };

        // Set signal function name to the same as it was
        Object.defineProperty(newSignalFunction, 'name', {
            value: signalFunction.name,
            writable: false
        });

        sender[signalFunction.name] = newSignalFunction;
    }

    _checkConnectArguments(sender, signalFunction, receiver, slotFunction) {
        if (!sender) {
            console.error('Can not connect: sender is not defined');
            return false;
        }
        if (!signalFunction) {
            console.error('Can not connect: signal is not defined');
            return false;
        }
        if (!receiver) {
            console.error('Can not connect: receiver is not defined');
            return false;
        }
        if (!slotFunction) {
            console.error('Can not connect: slot is not defined');
            return false;
        }
        if (!signalFunction.name) {
            console.error('Can not connect: signal can not be anonymous function');
            return false;
        }
        if (!slotFunction.name) {
            console.error('Can not connect: slot can not be anonymous function');
            return false;
        }
        if (!sender[signalFunction.name]) {
            console.error('Can not connect: signal is not member of sender');
            return false;
        }
        if (!receiver[slotFunction.name]) {
            console.error('Can not connect: slot is not member of receiver');
            return false;
        }
        return true;
    }
}

class Slot {
    constructor(receiver, slotFunctionName) {
        this._receiver = receiver;
        this._slotFunctionName = slotFunctionName;
    }

    // Get/set
    get receiver() { return this._receiver; }
    get slotFunctionName() { return this._slotFunctionName; }

    // Public
    callSlot(signalArguments) {
        this._receiver[this._slotFunctionName].apply(this._receiver, signalArguments);
    }
}

export default new Connector();
