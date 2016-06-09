var createCpu = function () {
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
        ZEROPAGE: 0, ZEROPAGE_X: 1, ZEROPAGE_Y: 2, ABSOLUTE: 3, ABSOLUTE_X: 4, ABSOLUTE_Y: 5,
        INDIRECT: 6, IMPLIED: 7, ACCUMULATOR: 8, IMMEDIATE: 9, RELATIVE: 10,
        INDIRECT_PRE: 11, INDIRECT_POST: 12
    };

    var adc = function () {

    };

    var and = function () {

    };

    var asl = function () {

    };

    var bcc = function () {

    };

    var bcs = function () {

    };

    var beq = function () {

    };

    var bit = function () {

    };

    var bmi = function () {

    };

    var bne = function () {

    };

    var bpl = function () {

    };

    var brk = function () {

    };

    var bvc = function () {

    };

    var bvs = function () {

    };

    var clc = function () {

    };

    var cld = function () {

    };

    var cli = function () {

    };

    var clv = function () {

    };

    var cmp = function () {

    };

    var cpx = function () {

    };

    var cpy = function () {

    };

    var dec = function () {

    };

    var dex = function () {

    };

    var dey = function () {

    };

    var eor = function () {

    };

    var inc = function () {

    };

    var inx = function () {

    };

    var iny = function () {

    };

    var jmp = function () {

    };

    var jsr = function () {

    };

    var lda = function () {

    };

    var ldx = function () {

    };

    var ldy = function () {

    };

    var lsr = function () {

    };

    var nop = function () {

    };

    var ora = function () {

    };

    var pha = function () {

    };

    var php = function () {

    };

    var pla = function () {

    };

    var plp = function () {

    };

    var rol = function () {

    };

    var ror = function () {

    };

    var rti = function () {

    };

    var rts = function () {

    };

    var sbc = function () {

    };

    var sec = function () {

    };

    var sed = function () {

    };

    var sei = function () {

    };

    var sta = function () {

    };

    var stx = function () {

    };

    var sty = function () {

    };

    var tax = function () {

    };

    var tay = function () {

    };

    var tsx = function () {

    };

    var txa = function () {

    };

    var txs = function () {

    };

    var tya = function () {

    };

    var instruction = function (name, f, mode) {
        return { name:name, f:f, mode: mode};
    };

    var lengths = [2, 2, 2, 3, 3, 3, 3, 1, 1, 2, 2, 2, 2];

    //TEST CODE
    pc = 0x8000;
    memory.set(0x8000, 0x38);
    //END TEST CODE

    var instrs = {
        0x00: instruction("BRK", brk, modes.IMMEDIATE),
        0x01: instruction("ORA", ora, modes.INDIRECT_PRE ),
        0x05: instruction("ORA", ora, modes.ZERO_PAGE ),
        0x06: instruction("ASL", asl, modes.ZERO_PAGE ),
        0x08: instruction("PHP", php, modes.IMPLIED ),
        0x09: instruction("ORA", ora, modes.IMMEDIATE ),
        0x0a: instruction("ASL", asl, modes.ACCUMULATOR ),
        0x0d: instruction("ORA", ora, modes.ABSOLUTE_X ),
        0x0e: instruction("ASL", asl, modes.ABSOLUTE ),
        0x10: instruction("BPL", bpl, modes.IMMEDIATE ),
        0x11: instruction("ORA", ora, modes.INDIRECT_POST ),
        0x15: instruction("ORA", ora, modes.ZEROPAGE_X ),
        0x16: instruction("ASL", asl, modes.ZEROPAGE_X ),
        0x18: instruction("CLC", clc, modes.IMPLIED ),
        0x19: instruction("ORA", ora, modes.ABSOLUTE_Y ),
        0x1d: instruction("ORA", ora, modes.ABSOLUTE_X ),
        0x1e: instruction("ASL", asl, modes.ABSOLUTE_X ),
        0x20: instruction("JSR", jsr, modes.ABSOLUTE ),
        0x21: instruction("AND", and, modes.INDIRECT_PRE ),
        0x24: instruction("BIT", bit, modes.ZERO_PAGE ),
        0x25: instruction("AND", and, modes.ZERO_PAGE ),
        0x26: instruction("ROL", rol, modes.ZERO_PAGE ),
        0x28: instruction("PLP", plp, modes.IMPLIED ),
        0x29: instruction("AND", and, modes.IMMEDIATE ),
        0x2a: instruction('ROL', rol, modes.ACCUMULATOR ),
        0x2c: instruction("BIT", bit, modes.ABSOLUTE ),
        0x2d: instruction("AND", and, modes.ABSOLUTE),
        0x2e: instruction("ROL", rol, modes.ABSOLUTE),
        0x30: instruction("BMI", bmi, modes.IMPLIED),
        0x31: instruction("AND", and, modes.INDIRECT_POST),
        0x35: instruction("AND", and, modes.ZEROPAGE_X),
        0x36: instruction("ROL", rol, modes.ZEROPAGE_X),
        0x38: instruction("SEC", sec, modes.IMPLIED),
        0x39: instruction("AND", and, modes.INDIRECT_POST),
        0x3d: instruction("AND", and, modes.ABSOLUTE_X)
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
            var len = lengths[instr.mode];
            console.log(instr.name);
            console.log(instr);
            //Execute the instruction, return the number of CPU cycles
            if (len == 1) return instr.f(instr.mode);
            else if (len == 2) return instr.f(instr.mode, memory.get(pc++));
            else if (len == 3) return instr.f(instr.mode, memory.get(pc++), memory.get(pc++));

        },
        setCartridge: function (c) {
        }

    };
};