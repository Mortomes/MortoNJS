var cpumemory = function (spec) {
    var that = {};

    var mainMemory = [];
    for (var i = 0; i < 0x800; i++) {
        mainMemory[i] = 0;
    }

    var ioRegisters = [];
    for (var i = 0; i < 0x8; i++) {
        ioRegisters[i] = 0;
    }

    var upperMemory = [];
    for (var i = 0; i < 0x4000; i++) {
        upperMemory[i] = 0;
    }

    var prgROM = [];
    for (var i = 0; i < 0x8000; i++) {
        prgROM[i] = 0;
    }

    var get = function (i) {
        if (i < 0 || i >= 0x10000) return undefined;
        if (i < 0x800) return mainMemory[i];
        if (i < 0x2000) return mainMemory[i % 0x800];
        if (i < 0x2008) return ioRegisters[i - 0x2000];
        if (i < 0x4000) return ioRegisters[(i - 0x2000) % 8];
        if (i < 0x8000) return upperMemory[i - 0x4000];
        return prgROM[i - 0x8000];
    };
    that.get = get;

    var set = function (i, val) {
        if (i < 0 || i >= 0x10000) return;
        else if (i < 0x800) mainMemory[i] = val;
        else if (i < 0x2000) mainMemory[i % 0x800] = val;
        else if (i < 0x2008) ioRegisters[i - 0x2000] = val;
        else if (i < 0x4000) ioRegisters[(i - 0x2000) % 8] = val;
        else if (i < 0x8000) upperMemory[i - 0x4000] = val;
        else prgROM[i - 0x8000] = val;
    };
    that.set = set;

    return that;
};