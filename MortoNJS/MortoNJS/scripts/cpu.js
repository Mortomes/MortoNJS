var cpu = function () {
    //private
    //registers
    var a, x, y;
    //program counter/stack pointer
    var pc, sp;
    //status bits
    var negative, overflow, inBreak, disableInterupt, zero, carry;
    var cartridge;
    var memory = cpumemory();

    var modes = {
        ZEROPAGE: 0, ZEROPAGE_INDEX: 1, ABSOLUTE: 2, ABSOLUTE_INDEX: 3,
        INDIRECT: 4, IMPLIED: 5, ACCUMULATOR: 6, IMMEDIATE: 7, RELATIVE: 8,
        INDIRECT_PRE: 9, INDIRECT_POST: 10
    };

    var instrs = {
        0: { name: "BRK", f: brk, len: 1, mode: modes[IMMEDIATE] },
        1: { name: "ORA", f: ora, len: 2, mode: modes[INDIRECT_PRE] }
        //etc.
    };

    var nmiTriggered, irqTriggered, resetTriggered;

    
    var getAddress = function(at){
        var lsb = memory.get(at);
        var msb = memory.get(at+1);
        return (msb << 8) | lsb;
    };

    var packStatus = function () {
        return (negative << 7) |
                (overflow << 6) |
                (inBreak << 4) |
                (disableInterupt << 2) |
                (zero << 1) | carry;
    };

    var unpackStatus = function (p) {
        negative = p & 0x80;
        overflow = p & 0x40;
        inBreak = p & 0x10;
        disableInterupt = p & 0x2;
        zero = p & 0x1;
    };

    var push = function (val) {
        memory.set(0x100 + sp, val);
        sp--;
    }

    var pop = function () {
        sp++;
        return memory.get(0x100 + sp);
    }

    var hiByte = function (short) {
        return (short & 0xFF00) >> 8;
    }

    var loByte = function (short) {
        return (short & 0xFF);
    }

    //public
    return {
        create: function () {

        },
        execute: function () {
            if (resetTriggered || nmiTriggered || (irqTriggered && !disableInterupt)) {
                //push pc and status register on the stack
                push(loByte(pc));
                push(hiByte(pc));
                push(packStatus());
                //disable interupts
                disableInterupt = true;
                //jump to the address specified for this type of interupt
                if (resetTriggered) pc = memory.get(getAddress(0xfffc));
                else if (nmiTriggered) pc = memory.get(getAddress(0xfffa));
                else if (irqTriggered) pc = memory.get(getAddress(0xfffe));
            }
            resetTriggered = false; nmiTriggered = false; irqTriggered = false;
            //Fetch next opcode
            var instr = instrs[memory.get(pc++)];
            if (instr.len == 1) instr.f(instr.mode);
            else if (instr.len == 2) instr.f(instr.mode, memory.get(pc++));
            else if (instr.len == 3) instr.f(instr.mode, memory.get(pc++), instr.get(pc++));

        },
        setCartridge: function (c) {
        }

    };
}();