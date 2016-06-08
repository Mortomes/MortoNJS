var cpu = function () {
    //private
    //registers
    var a, x, y;
    //program counter/stack pointer
    var pc, sp;
    //status bits
    var negative, overflow, brk, bcd, disableInterupt, zero, carry;
    var cartridge;
    var memory;

    //public
    return {
        create: function () {

        },
        execute: function () {
        },
        setCartridge: function (c) {
        }

    };
}();